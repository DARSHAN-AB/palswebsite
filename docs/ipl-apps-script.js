/**
 * Google Apps Script — Impromptu Prompt League Registration System
 * ─────────────────────────────────────────────────────────────────
 * Paste this entire file into the Apps Script editor.
 * Deploy as a Web App (see DEPLOYMENT.md for step-by-step guide).
 *
 * Sheet structure (Row 1 = header, ignored during counting):
 *   A: ID | B: Team Name | C: Full Name | D: Semester | E: USN
 *   F: Branch | G: Email | H: Phone
 */

// ─── Configuration ───────────────────────────────────────────────────────
const SHEET_NAME  = "Registrations";   // Tab name inside the spreadsheet
const TOTAL_SEATS = 120;               // Maximum capacity
const ID_PREFIX   = "IPL";            // ID prefix — change per event

// ─── Entry point: GET ────────────────────────────────────────────────────
/**
 * Handles GET requests.
 * ?action=seats  →  returns seat availability JSON
 */
function doGet(e) {
  const action = e.parameter.action;

  if (action === "seats") {
    return buildResponse(getSeatData());
  }

  return buildResponse({ error: "Unknown action. Use ?action=seats" }, 400);
}

// ─── Entry point: POST ───────────────────────────────────────────────────
/**
 * Handles POST requests.
 * Body: { action:"register", teamName, fullName, semester, usn, branch, email, phone }
 */
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);

    if (body.action === "register") {
      return buildResponse(registerParticipant(body));
    }

    return buildResponse({ error: "Unknown action." }, 400);
  } catch (err) {
    return buildResponse({ error: "Invalid request body: " + err.message }, 400);
  }
}

// ─── getSeatData ─────────────────────────────────────────────────────────
/**
 * Counts all registration rows (ignores header row 1).
 * Returns { totalSeats, filledSeats, remainingSeats }
 */
function getSeatData() {
  const sheet      = getSheet();
  const lastRow    = sheet.getLastRow();
  // Row 1 = header, so registrations start at row 2
  const filledSeats = Math.max(0, lastRow - 1);
  const remaining  = Math.max(0, TOTAL_SEATS - filledSeats);

  return {
    totalSeats:     TOTAL_SEATS,
    filledSeats:    filledSeats,
    remainingSeats: remaining,
  };
}

// ─── registerParticipant ─────────────────────────────────────────────────
/**
 * Validates and inserts a new registration row.
 * Returns { success, message, id? }
 */
function registerParticipant(data) {
  // 1. Validate required fields
  const required = ["teamName","fullName","semester","usn","branch","email","phone"];
  for (const field of required) {
    if (!data[field] || String(data[field]).trim() === "") {
      return { success: false, message: "Missing required field: " + field };
    }
  }

  const sheet   = getSheet();
  const lastRow = sheet.getLastRow();

  // 2. Check seat capacity
  const filledSeats = Math.max(0, lastRow - 1);
  if (filledSeats >= TOTAL_SEATS) {
    return { success: false, message: "Registrations Closed — all seats are filled." };
  }

  // 3. Check for duplicate USN or Email (case-insensitive)
  if (lastRow > 1) {
    // Columns E (USN=5) and G (Email=7)
    const usnCol   = sheet.getRange(2, 5, lastRow - 1, 1).getValues().flat();
    const emailCol = sheet.getRange(2, 7, lastRow - 1, 1).getValues().flat();

    const submittedUsn   = data.usn.trim().toUpperCase();
    const submittedEmail = data.email.trim().toLowerCase();

    if (usnCol.some(v => String(v).trim().toUpperCase() === submittedUsn)) {
      return { success: false, message: "This USN is already registered." };
    }
    if (emailCol.some(v => String(v).trim().toLowerCase() === submittedEmail)) {
      return { success: false, message: "This email is already registered." };
    }
  }

  // 4. Generate next ID  e.g. IPL-007
  const nextNumber = filledSeats + 1;                       // 1-based
  const id = ID_PREFIX + "-" + String(nextNumber).padStart(3, "0");

  // 5. Append row
  sheet.appendRow([
    id,
    data.teamName.trim(),
    data.fullName.trim(),
    data.semester.trim(),
    data.usn.trim().toUpperCase(),
    data.branch.trim(),
    data.email.trim().toLowerCase(),
    data.phone.trim(),
  ]);

  return { success: true, message: "Registration successful!", id: id };
}

// ─── Helpers ─────────────────────────────────────────────────────────────

/** Returns the target sheet tab, throws if not found. */
function getSheet() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error("Sheet '" + SHEET_NAME + "' not found.");
  return sheet;
}

/**
 * Wraps any JS object as a JSON ContentService response.
 * Adds CORS headers so the website can call it from any origin.
 */
function buildResponse(data, statusCode) {
  const payload = JSON.stringify(data);
  return ContentService
    .createTextOutput(payload)
    .setMimeType(ContentService.MimeType.JSON);
  // Note: Apps Script Web Apps set Access-Control-Allow-Origin: *
  // automatically when deployed with "Anyone" access.
}
