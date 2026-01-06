"use client";

import { useEffect, useState } from "react";
import { storage } from "@/lib/storage";
import { Doctor } from "@/lib/types";

import HeroSection from "@/components/HeroSection";
import DoctorCard from "@/components/DoctorCard";
import FeaturesSection from "@/components/FeaturesSection";
import TrackBooking from "@/components/TrackBooking";
import Footer from "@/components/Footer";

export default function HomePage() {
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    const docs = storage.getDoctors();
    if (docs.length > 0) {
      setDoctor(docs[0]); // single-doctor OPD
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-neutral-100 flex flex-col">
      {/* ===== GLOBAL DARK ANIMATED BACKGROUND ===== */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-neutral-800/40 blur-[160px] animate-pulse" />
        <div className="absolute top-1/3 -right-40 h-[460px] w-[460px] rounded-full bg-neutral-700/30 blur-[180px] animate-pulse delay-700" />
        <div className="absolute bottom-0 left-1/4 h-[420px] w-[420px] rounded-full bg-neutral-900 blur-[200px]" />
      </div>

      {/* ===== HERO ===== */}
      <HeroSection />

      {/* ===== MAIN CONTENT ===== */}
      <main className="relative z-10 flex-1 w-full">
        {/* ===== DOCTOR PROFILE ===== */}
        {doctor && (
          <section className="relative z-20 w-full px-4 sm:px-6 lg:px-16 -mt-12 sm:-mt-20">
            <DoctorCard doctor={doctor} />
          </section>
        )}

        {/* ===== FEATURES ===== */}
        <section className="w-full px-4 sm:px-6 lg:px-16 mt-10 sm:mt-14">
          <FeaturesSection />
        </section>

        {/* ===== TRACK APPOINTMENT ===== */}
        <section className="w-full px-4 sm:px-6 lg:px-16 mt-10 sm:mt-14">
          <TrackBooking />
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <Footer />
    </div>
  );
}
