import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * shadcn/ui utility
 * used by button, card, badge, etc.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* ---------------------------------- */
/* OPD / Doctor specific utils        */
/* ---------------------------------- */

import { storage } from "./storage";
import { Doctor } from "./types";

/**
 * Seed default doctor / clinic
 * Runs only once (when no doctor exists)
 * Used for demo / first-time setup
 */
export function seedDoctorsIfNeeded() {
  // ✅ already seeded → do nothing
  if (storage.getDoctors().length > 0) return;

  const data: Doctor[] = [
    {
      id: "doctor_1",

      /* ===== BASIC INFO ===== */
      doctorName: "Dr. Anil Kumar",
      clinicName: "City Health Clinic",

      /* ===== PROFILE DETAILS ===== */
      degree: "MBBS, MD (General Medicine)",
      education: "AIIMS, New Delhi",
      experience: 12,
      avatar:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop",

      /* ===== CONTACT ===== */
      phone: "9876543210",
      whatsapp: "9876543210",

      /* ===== CLINIC ===== */
      address: "12 Market Road",

      /* ===== SYSTEM ===== */
      paid: true,
      status: "open",
    },
  ];

  storage.saveDoctors(data);
}
