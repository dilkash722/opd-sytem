"use client";

import { Stethoscope } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-24 w-full overflow-hidden bg-black">
      {/* ===== HERO-LIKE DARK BACKGROUND ===== */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-[280px] w-[280px] rounded-full bg-neutral-800/30 blur-[140px] animate-pulse" />
        <div className="absolute top-1/2 -right-24 h-[260px] w-[260px] rounded-full bg-neutral-700/30 blur-[160px] animate-pulse delay-700" />
        <div className="absolute bottom-0 left-1/3 h-[240px] w-[240px] rounded-full bg-neutral-900 blur-[180px]" />
      </div>

      {/* ===== TOP BORDER ===== */}
      <div className="relative z-10 border-t border-white/10">
        <div className="w-full px-4 sm:px-6 lg:px-16 py-10">
          <div className="flex flex-col items-center gap-4 text-center">
            {/* Icon */}
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-transparent shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]">
              <Stethoscope className="h-4 w-4 text-neutral-300" />
            </div>

            {/* Main Text */}
            <p className="text-sm text-neutral-400">
              Designed &amp; Developed by{" "}
              <span className="font-semibold text-neutral-200">Md Dilkash</span>
            </p>

            {/* Sub Text */}
            <p className="text-xs tracking-widest text-neutral-500">
              OPD APPOINTMENT MANAGEMENT SYSTEM
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
