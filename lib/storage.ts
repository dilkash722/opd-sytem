import { Doctor, Appointment, Session } from "./types";

/**
 * OPD / Doctor based local storage
 * Personal OPD system (single or multiple doctors future-ready)
 */

const DOCTORS_KEY = "opd_doctors_v1";
const APPOINTMENTS_KEY = "opd_appointments_v1";
const SESSION_KEY = "opd_session_v1";

export const storage = {
  /* ================= DOCTORS / CLINIC ================= */

  getDoctors(): Doctor[] {
    return JSON.parse(localStorage.getItem(DOCTORS_KEY) || "[]");
  },

  saveDoctors(data: Doctor[]) {
    localStorage.setItem(DOCTORS_KEY, JSON.stringify(data));
  },

  /* ================= APPOINTMENTS ================= */

  getAppointments(): Appointment[] {
    return JSON.parse(localStorage.getItem(APPOINTMENTS_KEY) || "[]");
  },

  saveAppointments(data: Appointment[]) {
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(data));
  },

  /* ================= SESSION ================= */

  getSession(): Session | null {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  },

  setSession(v: Session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(v));
  },

  clearSession() {
    localStorage.removeItem(SESSION_KEY);
  },
};
