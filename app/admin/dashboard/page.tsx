"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Appointment, AppointmentStatus, Doctor } from "@/lib/types";

import StatusCards from "@/components/status-cards";
import BookingTable from "@/components/booking-cards";

import { storage } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Stethoscope } from "lucide-react";

type OpdStatus = "open" | "closed";

export default function DoctorDashboardPage() {
  const router = useRouter();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [status, setStatus] = useState<OpdStatus>("open");
  const [statusMsg, setStatusMsg] = useState("");
  const [loading, setLoading] = useState(true);

  /* ---------------- INIT ---------------- */

  useEffect(() => {
    const session = storage.getSession();

    // 🔐 Auth guard
    if (!session || session.role !== "admin") {
      router.replace("/");
      return;
    }

    // 👨‍⚕️ Single doctor OPD (first doctor)
    const doctors = storage.getDoctors();

    if (doctors.length === 0) {
      router.replace("/");
      return;
    }

    const d = doctors[0]; // personal OPD
    setDoctor(d);
    setStatus(d.status);

    const all = storage
      .getAppointments()
      .sort((a, b) => a.createdAt - b.createdAt);

    setAppointments(all);
    setLoading(false);
  }, [router]);

  /* ---------------- UPDATE OPD STATUS ---------------- */

  function updateStatus(nextStatus: OpdStatus) {
    if (!doctor) return;

    const updatedDoctor = { ...doctor, status: nextStatus };
    storage.saveDoctors([updatedDoctor]);

    setDoctor(updatedDoctor);
    setStatus(nextStatus);

    setStatusMsg(
      nextStatus === "open"
        ? "OPD is open. Patients can book appointments."
        : "OPD is closed. Appointment booking is stopped."
    );
  }

  /* ---------------- NEXT PATIENT ---------------- */

  function nextPatient(appointmentId: string) {
    const updated = storage.getAppointments().map((a) => {
      if (a.id !== appointmentId) return a;

      if (a.status === "waiting") {
        return { ...a, status: "processing" as AppointmentStatus };
      }

      if (a.status === "processing") {
        return { ...a, status: "completed" as AppointmentStatus };
      }

      return a;
    });

    storage.saveAppointments(updated);
    setAppointments(updated);
  }

  /* ---------------- LOGOUT ---------------- */

  function logout() {
    storage.clearSession();
    router.replace("/");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-neutral-400">
        Loading OPD dashboard…
      </div>
    );
  }

  if (!doctor) return null;

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="container mx-auto p-6 space-y-6">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900 border border-neutral-800">
              <Stethoscope className="h-6 w-6 text-neutral-200" />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {doctor.clinicName}
              </h1>
              <p className="text-sm text-neutral-400">
                Doctor: {doctor.doctorName}
              </p>
            </div>
          </div>
        </div>

        {/* ================= OPD STATUS ================= */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => updateStatus("open")}
              variant="outline"
              className={`h-9 rounded-lg transition
      ${
        status === "open"
          ? "bg-white text-neutral-900 border-white"
          : "bg-transparent border-neutral-700 text-neutral-40"
      }
    `}
            >
              OPD Open
            </Button>

            <Button
              onClick={() => updateStatus("closed")}
              variant="outline"
              className={`h-9 rounded-lg transition
      ${
        status === "closed"
          ? "bg-white text-neutral-900 border-white"
          : "bg-transparent border-neutral-700 text-neutral-400"
      }
    `}
            >
              OPD Closed
            </Button>
          </div>

          {statusMsg && <p className="text-sm text-neutral-500">{statusMsg}</p>}
        </div>

        {/* ================= STATUS CARDS ================= */}
        <StatusCards bookings={appointments} />

        {/* ================= APPOINTMENTS ================= */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold tracking-wide">
            Today’s Appointments
          </h2>

          <BookingTable bookings={appointments} onNext={nextPatient} />
        </div>
      </div>
    </main>
  );
}
