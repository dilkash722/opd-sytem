"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { storage } from "@/lib/storage";
import { Appointment } from "@/lib/types";

import {
  Search,
  Hash,
  Hourglass,
  Activity,
  CheckCircle2,
  Users,
  AlertCircle,
  User,
  Stethoscope,
  MapPin,
  Phone,
} from "lucide-react";

export default function TrackBooking() {
  const [appointmentId, setAppointmentId] = useState("");
  const [result, setResult] = useState<null | {
    appointment: Appointment;
    currentToken: number;
    currentName: string;
    ahead: number;
  }>(null);
  const [error, setError] = useState("");

  const [message, setMessage] = useState<{
    type: "error" | "info" | "success";
    text: string;
  } | null>(null);

  const [lastTrackedId, setLastTrackedId] = useState<string | null>(null);

  function track() {
    setError("");
    setResult(null);

    if (!appointmentId.trim()) {
      setError("Please enter your Appointment ID");
      return;
    }

    // ✅ CORRECT STORAGE
    const all = storage.getAppointments();

    const appointment = all.find((a) => a.id === appointmentId.trim());

    if (!appointment) {
      setError("Appointment not found. Please check your Appointment ID.");
      return;
    }

    // All appointments of same doctor
    const doctorAppointments = all
      .filter((a) => a.doctorId === appointment.doctorId)
      .sort((a, b) => a.token - b.token);

    // Current consultation
    const current =
      doctorAppointments.find((a) => a.status === "processing") ??
      doctorAppointments.find((a) => a.status === "waiting") ??
      appointment;

    // Patients ahead
    const ahead = doctorAppointments.filter(
      (a) => a.status === "waiting" && a.token < appointment.token
    ).length;

    setResult({
      appointment,
      currentToken: current.token,
      currentName: current.patientName,
      ahead,
    });
  }

  return (
    <section className="mt-12">
      <Card className="bg-neutral-950 border-neutral-800">
        <CardContent className="p-6 space-y-5">
          {/* HEADER */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-neutral-800">
              <Search className="h-5 w-5 text-neutral-200" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-neutral-100">
                Track Your Appointment
              </h2>
              <p className="text-sm text-neutral-400">
                Enter your Appointment ID to check OPD status
              </p>
            </div>
          </div>

          {/* INPUT */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Hash className="absolute left-3 top-3.5 h-4 w-4 text-neutral-500" />
              <Input
                value={appointmentId}
                onChange={(e) => setAppointmentId(e.target.value)}
                placeholder="Enter Appointment ID (e.g. A1700000)"
                className="pl-9 bg-neutral-900 border-neutral-800 text-neutral-100"
              />
            </div>

            <Button
              onClick={track}
              className="bg-white text-neutral-900 hover:bg-neutral-200"
            >
              Track
            </Button>
          </div>

          {/* ERROR */}
          {error && (
            <div className="flex items-center gap-2 text-sm text-red-400">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          {/* RESULT */}
          {result && (
            <div className="mt-4 rounded-xl border border-neutral-800 bg-neutral-900 overflow-hidden">
              {/* TOP BAR */}
              <div className="flex items-center gap-3 px-4 py-3 bg-neutral-950 border-b border-neutral-800">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-neutral-800">
                  <Stethoscope className="h-5 w-5 text-neutral-200" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-100">
                    OPD Queue Status
                  </p>
                  <p className="text-xs text-neutral-400">
                    Live token tracking
                  </p>
                </div>
              </div>

              {/* DETAILS */}
              <div className="p-4 space-y-3">
                <ResultRow
                  icon={Hash}
                  label="Appointment ID"
                  value={result.appointment.id}
                />

                <ResultRow
                  icon={User}
                  label="Patient Name"
                  value={result.appointment.patientName}
                />
                <ResultRow
                  icon={Phone}
                  label="Mobile"
                  value={result.appointment.mobile}
                />

                <ResultRow
                  icon={Users}
                  label="Your Token"
                  value={`#${result.appointment.token}`}
                />

                <ResultRow
                  icon={Activity}
                  label="In Consultation"
                  value={`#${result.currentToken} (${result.currentName})`}
                />

                <ResultRow
                  icon={Hourglass}
                  label="Patients Ahead"
                  value={String(result.ahead)}
                />

                <ResultRow
                  icon={MapPin}
                  label="Address"
                  value={result.appointment.address}
                />
              </div>

              {/* STATUS */}
              <div className="px-4 py-3 bg-neutral-950 border-t border-neutral-800">
                <StatusLine status={result.appointment.status} />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}

/* ---------- HELPERS ---------- */

function ResultRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <Icon className="h-4 w-4 text-neutral-400" />
      <span className="w-40 text-neutral-400">{label}</span>
      <span className="font-medium text-neutral-100">{value}</span>
    </div>
  );
}

function StatusLine({ status }: { status: Appointment["status"] }) {
  if (status === "waiting") {
    return (
      <p className="flex items-center gap-2 text-sm text-yellow-400">
        <Hourglass className="h-4 w-4" />
        Waiting for consultation
      </p>
    );
  }

  if (status === "processing") {
    return (
      <p className="flex items-center gap-2 text-sm text-blue-400">
        <Activity className="h-4 w-4" />
        Consultation in progress
      </p>
    );
  }

  if (status === "completed") {
    return (
      <p className="flex items-center gap-2 text-sm text-green-400">
        <CheckCircle2 className="h-4 w-4" />
        Consultation completed
      </p>
    );
  }

  return (
    <p className="flex items-center gap-2 text-sm text-red-400">
      <AlertCircle className="h-4 w-4" />
      Appointment closed
    </p>
  );
}
