"use client";

import { useState, useEffect, useCallback } from "react";
import { getSeatAvailability } from "./registration";
import type { EventKey, SeatAvailability } from "./registration";

export type SeatStatus = "loading" | "available" | "full" | "error";

export interface UseSeatAvailabilityResult {
  /** Raw data from the API — null while loading or on error */
  seats:             SeatAvailability | null;
  /** Derived status for driving button/UI state */
  status:            SeatStatus;
  /** Convenience flags */
  loading:           boolean;
  canRegister:       boolean;
  remainingSeats:    number;
  totalSeats:        number;
  /** Re-fetches from the API (called on button click before opening popup) */
  refreshAvailability: () => Promise<boolean>; // resolves to canRegister
}

/**
 * useSeatAvailability
 * ─────────────────────────────────────────────────────────────────────────
 * Fetches seat availability from the Google Apps Script endpoint on mount.
 * Call `refreshAvailability()` again when the user clicks Register to
 * perform a live re-check before opening the popup.
 *
 * Usage:
 *   const { loading, canRegister, remainingSeats, refreshAvailability } =
 *     useSeatAvailability("IPL");
 */
export function useSeatAvailability(
  event: EventKey,
  fallbackTotal = 120
): UseSeatAvailabilityResult {
  const [seats,  setSeats]  = useState<SeatAvailability | null>(null);
  const [status, setStatus] = useState<SeatStatus>("loading");

  const fetchSeats = useCallback(async (): Promise<boolean> => {
    setStatus("loading");
    try {
      const data = await getSeatAvailability(event);
      setSeats(data);
      const open = data.remainingSeats > 0;
      setStatus(open ? "available" : "full");
      return open;
    } catch {
      setStatus("error");
      return false;
    }
  }, [event]);

  // Fetch on mount
  useEffect(() => { fetchSeats(); }, [fetchSeats]);

  const remaining = seats?.remainingSeats ?? fallbackTotal;
  const total     = seats?.totalSeats     ?? fallbackTotal;

  return {
    seats,
    status,
    loading:             status === "loading",
    canRegister:         status === "available",
    remainingSeats:      remaining,
    totalSeats:          total,
    refreshAvailability: fetchSeats,
  };
}
