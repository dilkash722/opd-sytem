/* ===================================================== */
/* ================= OPD / DOCTOR ====================== */
/* ===================================================== */

/**
 * OPD status – clinic open or closed
 */
export type DoctorStatus = "open" | "closed";

/**
 * Doctor / Clinic (Admin)
 * Personal OPD system (single doctor, future-ready for multiple)
 */
export type Doctor = {
  /* ===== SYSTEM / OPD ===== */
  id: string;
  clinicName: string;
  doctorName: string;
  address: string;
  paid: boolean;
  status: DoctorStatus;

  /* ===== CONTACT ===== */
  phone?: string; // Call number
  whatsapp?: string; // WhatsApp number (without +)

  /* ===== PROFILE (UI / TRUST) ===== */
  degree?: string; // e.g. MBBS, MD
  education?: string; // e.g. AIIMS Delhi
  experience?: number; // years of experience
  avatar?: string; // profile photo URL
};

/* ===================================================== */
/* ================= OPD / APPOINTMENT ================= */
/* ===================================================== */

/**
 * OPD appointment status
 */
export type AppointmentStatus =
  | "waiting" // patient waiting
  | "processing" // in consultation
  | "completed" // consultation done
  | "skipped"; // no-show

/**
 * Patient appointment (OPD token based)
 */
export type Appointment = {
  id: string; // Appointment ID (A1700...)
  doctorId: string; // Linked doctor

  patientName: string;
  mobile: string;
  address: string;

  date: string;
  time: string;

  /* ===== OPD QUEUE ===== */
  token: number; // Token number (#1, #2, #3…)

  status: AppointmentStatus;
  createdAt: number;
};
/* ===================================================== */
/* ================= SESSION ============================ */
/* ===================================================== */

/**
 * Only doctor/admin login (personal OPD)
 */
export type Session = {
  role: "admin"; // doctor is admin
};
