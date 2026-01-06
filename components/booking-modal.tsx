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
  Hospital,
  MapPin,
} from "lucide-react";

import { BookingSuccess } from "./BookingSuccess";

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

  /* ---------------- SUBMIT ---------------- */

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const active = storage
      .getAppointments()
      .filter((a) => a.status !== "completed");

    const appointment: Appointment = {
      id: "A" + Date.now(),
      doctorId: doctor.id,
      patientName: form.get("name") as string,
      mobile: form.get("mobile") as string,
      address: form.get("address") as string,
      date: form.get("date") as string,
      time: form.get("time") as string,
      status: "waiting",
      token: active.length + 1,
      createdAt: Date.now(),
    };

    storage.saveAppointments([...storage.getAppointments(), appointment]);
    setSuccess(appointment);
  }

  /* ---------------- LIVE STATUS ---------------- */

  useEffect(() => {
    if (!success) return;

    const i = setInterval(() => {
      const latest = storage.getAppointments().find((a) => a.id === success.id);
      if (latest) setLiveAppointment(latest);
    }, 2000);

    return () => clearInterval(i);
  }, [success]);

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

              <Field
                label="Address"
                name="address"
                icon={MapPin}
                placeholder="Enter patient address"
              />

              <Field
                label="Date"
                name="date"
                type="date"
                icon={Calendar}
                placeholder="Select date"
              />

              <Field
                label="Time"
                name="time"
                type="time"
                icon={Clock}
                placeholder="Select time"
              />

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">Confirm Appointment</Button>
              </div>
            </form>
          </>
        ) : (
          <BookingSuccess
            appointment={success}
            current={liveAppointment}
            onDone={onClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ===== FIELD ===== */

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
          className="
            pl-9
            bg-neutral-900
            border-neutral-800
            text-neutral-100
            placeholder:text-neutral-500
          "
        />
      </div>
    </div>
  );
}
