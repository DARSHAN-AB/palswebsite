/**
 * registration.ts
 * Reusable Google Apps Script integration layer.
 * To add a new event, just create a new config and pass it to the functions.
 *
 * SETUP:
 *   1. Deploy your Apps Script Web App (see DEPLOYMENT.md).
 *   2. Add the URL to .env.local:
 *        NEXT_PUBLIC_IPL_SCRIPT_URL=https://script.google.com/macros/s/.../exec
 *   3. Call getSeatAvailability() and submitRegistration() from your page.
 */

// ─── Types ────────────────────────────────────────────────────────────────

export interface SeatAvailability {
  totalSeats:     number;
  filledSeats:    number;
  remainingSeats: number;
}

export interface RegistrationPayload {
  teamName: string;
  fullName: string;
  semester: string;
  usn:      string;
  branch:   string;
  email:    string;
  phone:    string;
}

export interface RegistrationResult {
  success:  boolean;
  message:  string;
  id?:      string;   // e.g. "IPL-007"
}

// ─── Event config ─────────────────────────────────────────────────────────
// Add a new entry here for each event. The scriptUrl comes from the Apps
// Script Web App deployment URL for that event's sheet.

export const EVENT_CONFIGS = {
  IPL: {
    scriptUrl:  process.env.NEXT_PUBLIC_IPL_SCRIPT_URL ?? "",
    totalSeats: 120,
  },
  // HACKATHON: { scriptUrl: process.env.NEXT_PUBLIC_HACKATHON_SCRIPT_URL ?? "", totalSeats: 80 },
} as const;

export type EventKey = keyof typeof EVENT_CONFIGS;

// ─── Fetch seat availability ──────────────────────────────────────────────

export async function getSeatAvailability(
  event: EventKey
): Promise<SeatAvailability> {
  const { scriptUrl, totalSeats } = EVENT_CONFIGS[event];

  if (!scriptUrl) {
    // Fallback when env var is not set (dev/preview)
    return { totalSeats, filledSeats: 0, remainingSeats: totalSeats };
  }

  const res = await fetch(`${scriptUrl}?action=seats`, {
    method:  "GET",
    // No-store so every page load gets fresh data
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Seats fetch failed: ${res.status}`);
  return res.json() as Promise<SeatAvailability>;
}

// ─── Submit registration ──────────────────────────────────────────────────

export async function submitRegistration(
  event: EventKey,
  payload: RegistrationPayload
): Promise<RegistrationResult> {
  const { scriptUrl } = EVENT_CONFIGS[event];

  if (!scriptUrl) {
    // Fallback — log to console during development
    console.warn("Apps Script URL not configured. Logging payload:", payload);
    return { success: true, message: "Dev mode: logged to console.", id: "DEV-001" };
  }

  const res = await fetch(scriptUrl, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ action: "register", ...payload }),
  });

  if (!res.ok) throw new Error(`Registration submit failed: ${res.status}`);
  return res.json() as Promise<RegistrationResult>;
}
