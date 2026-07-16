# Google Apps Script — Deployment Guide
## Impromptu Prompt League Registration System

---

## Step 1 — Prepare the Google Sheet

1. Open [Google Sheets](https://sheets.google.com) and create a new spreadsheet.
2. Name the spreadsheet anything you like (e.g. `IPL Registrations`).
3. Rename the first tab (bottom of screen) to exactly: **`Registrations`**
4. In Row 1, add these headers in order across columns A–H:

   | A  | B         | C         | D        | E   | F      | G     | H     |
   |----|-----------|-----------|----------|-----|--------|-------|-------|
   | ID | Team Name | Full Name | Semester | USN | Branch | Email | Phone |

5. Keep this tab open — you'll need the **Spreadsheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/ **SPREADSHEET_ID** /edit
   ```

---

## Step 2 — Create the Apps Script Project

1. In the spreadsheet, click **Extensions → Apps Script**.
2. The Apps Script editor opens in a new tab.
3. Delete all existing code in the editor (the default `myFunction` stub).

---

## Step 3 — Paste the Script

1. Open the file `docs/ipl-apps-script.js` from this repository.
2. Copy the **entire contents**.
3. Paste it into the Apps Script editor.
4. At the top of the file, confirm these config values match your sheet:
   ```js
   const SHEET_NAME  = "Registrations";  // must match tab name exactly
   const TOTAL_SEATS = 120;
   const ID_PREFIX   = "IPL";
   ```
5. Click **Save** (Ctrl+S / Cmd+S). Name the project `IPL Registration`.

---

## Step 4 — Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Click the ⚙️ gear icon next to **Type** and select **Web App**.
3. Fill in the settings:
   - **Description**: `IPL Registration v1`
   - **Execute as**: `Me (your Google account)`
   - **Who has access**: `Anyone`  ← **This is required** so the website can call it without OAuth
4. Click **Deploy**.
5. Google will ask you to **Authorize** the script — click **Authorize access** and follow the prompts.
6. After authorization, you will see a **Web App URL** like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```
7. **Copy this URL** — you will need it in the next step.

---

## Step 5 — Add the URL to the Website

1. In the root of the project, open (or create) the file **`.env.local`**:
   ```
   d:\hack2skill\innovation-platform-demo\.env.local
   ```
2. Add the following line:
   ```
   NEXT_PUBLIC_IPL_SCRIPT_URL=https://script.google.com/macros/s/AKfycb.../exec
   ```
   Replace the URL with the one you copied in Step 4.
3. Save the file.
4. Restart the dev server (`npm run dev`) so Next.js picks up the new env var.

---

## Step 6 — Test the GET Endpoint (Seat Availability)

Open this URL in your browser (replace with your actual URL):
```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=seats
```

Expected response (when the sheet is empty):
```json
{
  "totalSeats": 120,
  "filledSeats": 0,
  "remainingSeats": 120
}
```

---

## Step 7 — Test the POST Endpoint (Registration)

Use a tool like [Hoppscotch](https://hoppscotch.io) or `curl`:

```bash
curl -X POST \
  "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "register",
    "teamName": "Team Alpha",
    "fullName": "Test User",
    "semester": "Semester 4",
    "usn": "1BY22AI001",
    "branch": "Artificial Intelligence & Machine Learning",
    "email": "test@bmsit.in",
    "phone": "9876543210"
  }'
```

Expected success response:
```json
{
  "success": true,
  "message": "Registration successful!",
  "id": "IPL-001"
}
```

Verify in the Sheet: a new row should appear with `IPL-001` in column A.

---

## Step 8 — Test Duplicate Handling

Submit the same USN or Email again. Expected response:
```json
{
  "success": false,
  "message": "This USN is already registered."
}
```

No new row should appear in the sheet.

---

## Step 9 — Test on the Live Website

1. Open the event page: `/events/impromptu-prompt-league`
2. The **Seats Left** progress bar should load and show live data.
3. Click **Click to Register**.
4. Fill in the form and click **Submit Registration**.
5. A success message should appear with the participant's name.
6. Check the Google Sheet — a new row should have been inserted.
7. Reload the page — the seat count should have decreased by 1.

---

## Step 10 — Redeploy After Code Changes

If you update the Apps Script code:

1. Click **Deploy → Manage deployments**.
2. Find your existing deployment and click the ✏️ pencil/edit icon.
3. Under **Version**, select **New version**.
4. Click **Deploy**.
5. The Web App URL stays the same — no frontend changes needed.

---

## Adding a New Event

To add another event (e.g. Hackathon 2027):

1. Create a new Google Sheet with a `Registrations` tab.
2. Duplicate `ipl-apps-script.js` and update:
   ```js
   const TOTAL_SEATS = 80;
   const ID_PREFIX   = "HACK";
   ```
3. Deploy the new script and get its URL.
4. Add to `.env.local`:
   ```
   NEXT_PUBLIC_HACKATHON_SCRIPT_URL=https://script.google.com/macros/s/NEW_ID/exec
   ```
5. Uncomment the `HACKATHON` entry in `lib/registration.ts`:
   ```ts
   HACKATHON: {
     scriptUrl:  process.env.NEXT_PUBLIC_HACKATHON_SCRIPT_URL ?? "",
     totalSeats: 80,
   },
   ```
6. Use `getSeatAvailability("HACKATHON")` and `submitRegistration("HACKATHON", payload)` on the new event page.

---

## Architecture Summary

```
User Browser
    │
    ├── GET  /exec?action=seats  ──►  Apps Script doGet()
    │                                    └── getSeatData() → JSON
    │
    └── POST /exec               ──►  Apps Script doPost()
             body: {action:"register", ...fields}
                 └── registerParticipant()
                         ├── validate fields
                         ├── check seat capacity
                         ├── check duplicate USN/Email
                         ├── generate ID (IPL-001, IPL-002, …)
                         └── appendRow() → Google Sheet
```

All data lives in Google Sheets. No server required beyond Apps Script.
