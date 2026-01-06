"use client";

import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import {
  Stethoscope,
  Clock,
  CalendarCheck,
  PhoneCall,
  CalendarPlus,
  Lock,
} from "lucide-react";

import { storage } from "@/lib/storage";
import { Doctor } from "@/lib/types";
import { BookingModal } from "@/components/booking-modal";

export default function HeroSection() {
  const [openBooking, setOpenBooking] = useState(false);
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    const docs = storage.getDoctors();
    if (docs.length > 0) setDoctor(docs[0]);
  }, []);

  const isOpen = doctor?.status === "open";

  return (
    <section className="relative min-h-[80vh] sm:min-h-[85vh] lg:min-h-[90vh] w-full overflow-hidden bg-black text-white pb-20 sm:pb-28 lg:pb-36">
      {/* ===== BACKGROUND GLOW ===== */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-neutral-800/40 blur-[140px]" />
        <div className="absolute top-1/3 -right-40 h-[360px] w-[360px] rounded-full bg-neutral-700/30 blur-[160px]" />
        <div className="absolute bottom-0 left-1/4 h-[320px] w-[320px] rounded-full bg-neutral-900 blur-[180px]" />
      </div>

      {/* ===== DARK OVERLAY ===== */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />

      {/* ===== CONTENT (TOP ALIGNED) ===== */}
      <div className="relative z-10">
        <div className="w-full px-4 sm:px-6 lg:px-20 pt-8 sm:pt-16">
          <div className="max-w-3xl space-y-7">
            {/* HEADING */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.05]">
              OPD Appointment
              <span className="block mt-4 text-neutral-400 text-2xl sm:text-3xl font-medium min-h-[1.4em]">
                <Typewriter
                  words={[
                    "Book OPD online",
                    "Track token live",
                    "Visit on your turn",
                    "Smart OPD system",
                  ]}
                  loop={0}
                  cursor
                  typeSpeed={48}
                  deleteSpeed={28}
                  delaySpeed={1600}
                />
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p className="max-w-xl text-base sm:text-lg leading-relaxed text-neutral-400">
              Book OPD appointments, get a token, and visit the clinic exactly
              when your turn comes — no queues, no crowd, no stress.
            </p>

            {/* FEATURES */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-neutral-300">
              <Feature icon={CalendarCheck} text="Quick Appointment" />
              <Feature icon={Clock} text="Live Token Tracking" />
              <Feature icon={Stethoscope} text="Doctor Managed OPD" />
            </div>

            {/* CTA BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 pt-3">
              {/* BOOK APPOINTMENT */}
              <button
                disabled={!isOpen}
                onClick={() => {
                  if (isOpen) setOpenBooking(true);
                }}
                className={`
                  inline-flex items-center justify-center gap-2
                  rounded-xl px-7 py-3 text-sm font-semibold transition
                  ${
                    isOpen
                      ? "bg-white text-black hover:bg-neutral-200"
                      : "bg-neutral-800 text-neutral-400 cursor-not-allowed"
                  }
                `}
              >
                {isOpen ? (
                  <>
                    <CalendarPlus className="h-5 w-5" />
                    Book Appointment
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5" />
                    OPD Closed
                  </>
                )}
              </button>

              {/* CALL NOW */}
              {doctor?.phone && (
                <a
                  href={`tel:${doctor.phone}`}
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-xl border border-neutral-700
                    bg-neutral-900/70 px-7 py-3
                    text-sm font-semibold text-neutral-100
                    hover:bg-neutral-800 transition
                  "
                >
                  <PhoneCall className="h-5 w-5" />
                  Call Now
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ===== BOOKING MODAL ===== */}
      {doctor && isOpen && (
        <BookingModal
          open={openBooking}
          onClose={() => setOpenBooking(false)}
          doctor={doctor}
        />
      )}

      {/* ===== BOTTOM FADE (SMALL) ===== */}
      <div className="absolute bottom-0 h-16 sm:h-32 w-full bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}

/* ===== FEATURE ITEM ===== */
function Feature({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-neutral-400" />
      <span>{text}</span>
    </div>
  );
}
