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
const SHEET_NAME     = "Registrations";   // Tab name inside the spreadsheet
const SPREADSHEET_ID = "";               // Optional: use openById for standalone script projects
const TOTAL_SEATS    = 120;               // Maximum capacity
const ID_PREFIX      = "IPL";            // ID prefix — change per event
const EVENT_NAME     = "Impromptu Prompt League";
const EVENT_DATE     = "August 20, 2026";
const EVENT_TIME     = "09:00 AM – 6:00 PM";
const EVENT_VENUE    = "Seminar Hall 2nd Floor, Academic Block";
const QR_EVENT_CODE  = "IPL2026";
const SENDER_EMAIL   = "darshandarshu20062006@gmail.com";
const SENDER_NAME    = "PALS Club";

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
    const body = parseRequestBody(e);

    if (body.action === "register") {
      return buildResponse(registerParticipant(body));
    }

    return buildResponse({ success: false, message: "Unknown action." }, 400);
  } catch (err) {
    const message = err && err.message ? err.message : String(err);
    return buildResponse({ success: false, message: "Invalid request body: " + message }, 400);
  }
}

/**
 * Parses payloads sent as JSON or as form-encoded data.
 */
function parseRequestBody(e) {
  if (e.postData && e.postData.contents) {
    const contentType = (e.postData.type || "").toLowerCase();
    if (contentType.indexOf("application/json") !== -1) {
      return JSON.parse(e.postData.contents);
    }
    if (contentType.indexOf("application/x-www-form-urlencoded") !== -1) {
      return Object.assign({}, e.parameter);
    }
  }

  if (e.parameter && Object.keys(e.parameter).length > 0) {
    return Object.assign({}, e.parameter);
  }

  throw new Error("Unsupported request format. Expected JSON or form-encoded POST data.");
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
  const id = generateRegistrationId(sheet);

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

  // 6. Send confirmation email after a successful sheet write.
  let emailSent = false;
  let warning = null;
  try {
    sendConfirmationEmailForRegistration(data, id);
    emailSent = true;
  } catch (err) {
    Logger.log("Registration saved, but email failed: %s", err.message || err);
    warning = "Registration saved, but confirmation email failed to send.";
  }

  const response = {
    success: true,
    message: "Registration successful!",
    id: id,
    emailSent: emailSent,
  };
  if (warning) {
    response.warning = warning;
  }

  return response;
}

// ─── Helpers ─────────────────────────────────────────────────────────────

/** Returns the target sheet tab, throws if not found. */
function getSheet() {
  const ss = SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();

  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error("Sheet '" + SHEET_NAME + "' not found.");
  return sheet;
}

/**
 * Generates the next registration ID using the existing ID column.
 * Keeps format IPL-001, IPL-002, etc. even if rows were removed.
 */
function generateRegistrationId(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    return ID_PREFIX + "-001";
  }

  const idValues = sheet.getRange(2, 1, lastRow - 1, 1).getValues().flat();
  const highest = idValues.reduce((max, raw) => {
    const value = String(raw).trim();
    const match = value.match(new RegExp('^' + ID_PREFIX + '-(\\d{3})$'));
    if (!match) return max;
    return Math.max(max, Number(match[1]));
  }, 0);

  return ID_PREFIX + "-" + String(highest + 1).padStart(3, "0");
}

/**
 * Builds the QR payload for a registration.
 * This is intentionally structured so future scan logic can parse event and ID values.
 */
function createQrPayload(registrationId) {
  return [
    "EVENT=" + QR_EVENT_CODE,
    "ID=" + registrationId,
  ].join("\n");
}

/**
 * Generates a standard HTTPS QR code image URL using Google Chart API.
 */
function generateQRCode(registrationId) {
  const payload = createQrPayload(registrationId);

  return (
    "https://chart.googleapis.com/chart?chs=280x280" +
    "&cht=qr" +
    "&chl=" + encodeURIComponent(payload) +
    "&choe=UTF-8" +
    "&chld=L|2"
  );
}

/**
 * Converts HTML into a plain-text fallback body.
 */
function stripHtml(html) {
  return String(html)
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/**
 * Builds the email body from the HTML template.
 */
function buildConfirmationEmail(data, qrImage) {
  const template = HtmlService.createTemplateFromFile("EmailTemplate");
  template.name = data.fullName;
  template.email = data.email;
  template.semester = data.semester;
  template.branch = data.branch;
  template.eventName = EVENT_NAME;
  template.date = EVENT_DATE;
  template.time = EVENT_TIME;
  template.venue = EVENT_VENUE;
  template.registrationId = data.id;
  template.qrImage = qrImage;
  template.year = new Date().getFullYear();
  return template.evaluate().getContent();
}

/**
 * Sends an HTML confirmation email to the participant.
 */
function sendConfirmationEmail(recipient, subject, htmlBody) {
  MailApp.sendEmail({
    to: recipient,
    subject: subject,
    htmlBody: htmlBody,
    body: stripHtml(htmlBody),
    name: SENDER_NAME,
    replyTo: SENDER_EMAIL,
    noReply: true,
  });
}

/**
 * Orchestrates QR generation and email sending for a saved registration.
 */
function sendConfirmationEmailForRegistration(data, registrationId) {
  const qrImage = generateQRCode(registrationId);
  const htmlBody = buildConfirmationEmail({
    fullName: data.fullName.trim(),
    email: data.email.trim().toLowerCase(),
    semester: data.semester.trim(),
    branch: data.branch.trim(),
    id: registrationId,
  }, qrImage);

  const subject = "🎉 Registration Confirmed – IPL Hackathon 2026";
  sendConfirmationEmail(data.email.trim().toLowerCase(), subject, htmlBody);
}

/**
 * Wraps any JS object as a JSON ContentService response.
 * Adds CORS headers so the website can call it from any origin.
 */
function buildResponse(data, statusCode) {
  const payload = JSON.stringify(data);
  const output = ContentService
    .createTextOutput(payload)
    .setMimeType(ContentService.MimeType.JSON);

  if (statusCode) {
    output.setResponseCode(statusCode);
  }

  return output;
}
