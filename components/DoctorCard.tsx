"use client";

import { Doctor } from "@/lib/types";
import {
  Phone,
  MessageCircle,
  Stethoscope,
  GraduationCap,
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  const isOpen = doctor.status === "open";

  return (
    <section className="relative w-full overflow-hidden bg-black text-white">
      {/* ===== SUBTLE BACKGROUND GLOW ===== */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-[280px] w-[280px] rounded-full bg-neutral-800/30 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[240px] w-[240px] rounded-full bg-neutral-900/40 blur-[140px]" />
      </div>

      {/* ===== CARD ===== */}
      <div
        className="
          relative z-10 w-full
          rounded-2xl
          border border-white/10
          bg-transparent
          px-5 py-6
          sm:px-8 sm:py-8
          shadow-[inset_0_1px_1px_rgba(255,255,255,0.04),inset_0_-10px_28px_rgba(0,0,0,0.85)]
        "
      >
        {/* ===== HEADER ===== */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="h-20 w-20 overflow-hidden rounded-full border border-white/10">
              <img
                src={
                  doctor.avatar ??
                  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop"
                }
                alt={doctor.doctorName}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Name */}
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                {doctor.doctorName}
              </h1>
              <p className="mt-0.5 text-sm text-neutral-400">
                {doctor.degree || "MBBS, MD"}
              </p>
              <p className="mt-1 flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
                <Stethoscope className="h-4 w-4" />
                {doctor.clinicName}
              </p>
            </div>
          </div>

          {/* OPD STATUS */}
          <span
            className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium border
              ${
                isOpen
                  ? "border-green-500/40 bg-green-500/10 text-green-400"
                  : "border-red-500/40 bg-red-500/10 text-red-400"
              }`}
          >
            {isOpen ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
            {isOpen ? "OPD Open" : "OPD Closed"}
          </span>
        </div>

        {/* ===== BODY ===== */}
        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* ABOUT */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
              About Doctor
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-400">
              Patient-first consultation with a modern OPD system focused on
              reduced waiting time and smooth appointment handling.
            </p>
          </div>

          {/* DETAILS */}
          <div className="space-y-4">
            <InfoRow
              icon={GraduationCap}
              label="Education"
              value={doctor.education || "Recognized Medical University"}
            />
            <InfoRow
              icon={Briefcase}
              label="Experience"
              value={
                doctor.experience ? `${doctor.experience} Years` : "10+ Years"
              }
            />
            <InfoRow
              icon={MapPin}
              label="Clinic Address"
              value={doctor.address || "Clinic Address"}
            />
            <InfoRow
              icon={Clock}
              label="OPD Timings"
              value="Mon – Sat · 10:00 AM – 5:00 PM"
            />
          </div>

          {/* CONTACT */}
          <div className="flex flex-col justify-between gap-5">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                Contact
              </h3>
              <p className="mt-2 text-xs text-neutral-400">
                Please contact during OPD hours only.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={doctor.phone ? `tel:${doctor.phone}` : "#"}
                className="
                  flex items-center justify-center gap-2
                  rounded-xl bg-white px-5 py-2.5
                  text-sm font-semibold text-black
                  hover:bg-neutral-200 transition
                "
              >
                <Phone className="h-4 w-4" />
                Call Doctor
              </a>

              <a
                href={
                  doctor.whatsapp ? `https://wa.me/${doctor.whatsapp}` : "#"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center justify-center gap-2
                  rounded-xl border border-green-500/40
                  bg-green-500/10 px-5 py-2.5
                  text-sm font-semibold text-green-400
                  hover:bg-green-500/20 transition
                "
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== INFO ROW ===== */

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-1 h-4 w-4 text-neutral-400" />
      <div>
        <p className="text-[11px] uppercase tracking-wide text-neutral-500">
          {label}
        </p>
        <p className="text-sm text-neutral-200">{value}</p>
      </div>
    </div>
  );
}
