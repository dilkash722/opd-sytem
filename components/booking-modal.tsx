"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { storage } from "@/lib/storage";
import { Doctor, Appointment } from "@/lib/types";

import {
  Stethoscope,
  User,
  Phone,
  Calendar,
  Clock,
  Hash,
  CheckCircle2,
  Hospital,
  Timer,
  MapPin,
} from "lucide-react";

export function BookingModal({
  open,
  onClose,
  doctor,
}: {
  open: boolean;
  onClose: () => void;
  doctor: Doctor;
}) {
  const [success, setSuccess] = useState<Appointment | null>(null);
  const [liveAppointment, setLiveAppointment] = useState<Appointment | null>(
    null
  );

  /* ---------------- SUBMIT APPOINTMENT ---------------- */

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const active = storage
      .getAppointments()
      .filter((a) => a.status !== "completed");

    const token = active.length + 1;

    const appointment: Appointment = {
      id: "A" + Date.now(),
      doctorId: doctor.id,

      patientName: form.get("name") as string,
      mobile: form.get("mobile") as string,
      address: form.get("address") as string, // ✅ ADDRESS SAVED

      date: form.get("date") as string,
      time: form.get("time") as string,

      status: "waiting",
      token,
      createdAt: Date.now(),
    };

    storage.saveAppointments([...storage.getAppointments(), appointment]);
    setSuccess(appointment);
  }

  /* ---------------- LIVE STATUS UPDATE ---------------- */

  useEffect(() => {
    if (!success) return;

    const interval = setInterval(() => {
      const latest = storage.getAppointments().find((a) => a.id === success.id);

      if (latest) setLiveAppointment(latest);
    }, 2000);

    return () => clearInterval(interval);
  }, [success]);

  const current = liveAppointment ?? success;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-neutral-950 border-neutral-800 text-neutral-100">
        {!success ? (
          <>
            {/* ===== HEADER ===== */}
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-neutral-800">
                  <Stethoscope className="h-5 w-5" />
                </div>

                <div>
                  <DialogTitle className="text-lg font-bold">
                    Book OPD Appointment
                  </DialogTitle>
                  <p className="text-sm text-neutral-400 flex items-center gap-1">
                    <Hospital className="h-3.5 w-3.5" />
                    {doctor.clinicName}
                  </p>
                </div>
              </div>
            </DialogHeader>

            {/* ===== FORM ===== */}
            <form onSubmit={submit} className="space-y-4 pt-4">
              <Field
                label="Patient Name"
                name="name"
                icon={User}
                placeholder="Enter patient full name"
              />

              <Field
                label="Mobile Number"
                name="mobile"
                icon={Phone}
                placeholder="Enter mobile number"
              />

              {/*  ADDRESS FIELD */}
              <Field
                label="Patient Address"
                name="address"
                icon={MapPin}
                placeholder="Enter patient address"
              />

              <Field
                label="Appointment Date"
                name="date"
                type="date"
                icon={Calendar}
              />

              <Field
                label="Preferred Time"
                name="time"
                type="time"
                icon={Clock}
              />

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="bg-white text-neutral-900"
                  onClick={onClose}
                >
                  Cancel
                </Button>

                <Button type="submit" className="bg-neutral-900">
                  Confirm Appointment
                </Button>
              </div>
            </form>
          </>
        ) : (
          /* ===== SUCCESS / OPD TRACKING ===== */
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-green-500">
                Thank you, {success.patientName}!
              </h3>

              <p className="text-sm text-neutral-400">
                Appointment confirmed. Please wait for your turn.
              </p>
            </div>

            {/* ===== TRACKING CARD ===== */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 space-y-3 text-sm">
              <TrackRow icon={Hash} label="Appointment ID" value={success.id} />

              <TrackRow
                icon={User}
                label="Patient"
                value={success.patientName}
              />
              <TrackRow icon={Phone} label="Mobile" value={success.mobile} />

              <TrackRow
                icon={Timer}
                label="OPD Token"
                value={`#${success.token}`}
                highlight
              />
              <TrackRow
                icon={Clock}
                label="Current Status"
                value={
                  current?.status === "processing"
                    ? "In Consultation"
                    : "Waiting"
                }
                status
              />
              <TrackRow icon={MapPin} label="Address" value={success.address} />
            </div>

            <p className="text-xs text-neutral-500">
              Please take a screenshot and keep checking your status.
            </p>

            <Button
              onClick={onClose}
              className="w-full bg-white text-neutral-900 hover:text-neutral-100"
            >
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ===== REUSABLE FIELD ===== */

function Field({
  label,
  icon: Icon,
  ...props
}: {
  label: string;
  icon: React.ElementType;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs uppercase text-neutral-400">{label}</Label>
      <div className="relative">
        <Icon className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
        <Input
          {...props}
          required
          className="pl-9 bg-neutral-900 border-neutral-800 text-neutral-100"
        />
      </div>
    </div>
  );
}

/* ===== TRACK ROW ===== */

function TrackRow({
  icon: Icon,
  label,
  value,
  highlight,
  status,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  highlight?: boolean;
  status?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-neutral-400">
        <Icon className="h-4 w-4" />
        {label}
      </div>

      <span
        className={
          highlight
            ? "font-bold text-green-400"
            : status
            ? "rounded-full bg-yellow-500/10 px-3 py-0.5 text-yellow-400 text-xs"
            : "text-neutral-100"
        }
      >
        {value}
      </span>
    </div>
  );
}
