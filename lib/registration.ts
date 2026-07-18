/**
 * registration.ts
 * Google Apps Script integration
 */

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

export interface SeatAvailability {
  totalSeats: number;
  filledSeats: number;
  remainingSeats: number;
}

export interface RegistrationPayload {
  teamName: string;
  fullName: string;
  semester: string;
  usn: string;
  branch: string;
  email: string;
  phone: string;
}

export interface RegistrationResult {
  success: boolean;
  message: string;
  id?: string;
}

// ─────────────────────────────────────────────────────────────
// Event Config
// ─────────────────────────────────────────────────────────────

export const EVENT_CONFIGS = {
  IPL: {
    scriptUrl: process.env.NEXT_PUBLIC_IPL_SCRIPT_URL ?? "",
    totalSeats: 120,
  },
} as const;

export type EventKey = keyof typeof EVENT_CONFIGS;

// ─────────────────────────────────────────────────────────────
// Get Seats
// ─────────────────────────────────────────────────────────────

export async function getSeatAvailability(
  event: EventKey
): Promise<SeatAvailability> {
  const { scriptUrl, totalSeats } = EVENT_CONFIGS[event];

  if (!scriptUrl) {
    return {
      totalSeats,
      filledSeats: 0,
      remainingSeats: totalSeats,
    };
  }

  const response = await fetch(`${scriptUrl}?action=seats`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Seat fetch failed (${response.status})`);
  }

  return response.json();
}

// ─────────────────────────────────────────────────────────────
// Submit Registration
// ─────────────────────────────────────────────────────────────

export async function submitRegistration(
  event: EventKey,
  payload: RegistrationPayload
): Promise<RegistrationResult> {
  const { scriptUrl } = EVENT_CONFIGS[event];

  if (!scriptUrl) {
    console.warn("Apps Script URL missing.", payload);

    return {
      success: true,
      message: "Development mode",
      id: "DEV-001",
    };
  }

  // Build form data
  const body = new URLSearchParams();

  body.append("action", "register");
  body.append("teamName", payload.teamName);
  body.append("fullName", payload.fullName);
  body.append("semester", payload.semester);
  body.append("usn", payload.usn);
  body.append("branch", payload.branch);
  body.append("email", payload.email);
  body.append("phone", payload.phone);

  const response = await fetch(scriptUrl, {
    method: "POST",
    body,
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  const text = await response.text();
  let data: RegistrationResult;

  try {
    data = JSON.parse(text) as RegistrationResult;
  } catch {
    throw new Error(`Registration failed (${response.status}): ${text}`);
  }

  if (!response.ok) {
    throw new Error(data.message || `Registration failed (${response.status})`);
  }

  return data;
}