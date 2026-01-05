import { CalendarCheck, Clock, Activity } from "lucide-react";

const features = [
  {
    icon: CalendarCheck,
    title: "Easy Appointment Booking",
    desc: "Book your OPD appointment online in seconds.",
  },
  {
    icon: Activity,
    title: "Live OPD Token System",
    desc: "Track your turn in real time without waiting.",
  },
  {
    icon: Clock,
    title: "Save Waiting Time",
    desc: "Visit clinic only when your turn comes.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* ===== HERO-LIKE DARK BACKGROUND ===== */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-[360px] w-[360px] rounded-full bg-neutral-800/30 blur-[140px] animate-pulse" />
        <div className="absolute top-1/3 -right-32 h-[320px] w-[320px] rounded-full bg-neutral-700/30 blur-[160px] animate-pulse delay-700" />
        <div className="absolute bottom-0 left-1/4 h-[300px] w-[300px] rounded-full bg-neutral-900 blur-[180px]" />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 space-y-10">
        {/* ===== SECTION HEADING (LEFT, HERO STYLE) ===== */}
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            OPD Appointment & Token System
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-400">
            A modern OPD system designed to save patient time and help doctors
            manage daily appointments smoothly.
          </p>
        </div>

        {/* ===== FEATURE CARDS ===== */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="
                rounded-2xl
                border border-white/10
                bg-transparent
                px-6 py-7
                space-y-3
                shadow-[inset_0_1px_1px_rgba(255,255,255,0.04),inset_0_-10px_28px_rgba(0,0,0,0.9)]
              "
            >
              <f.icon className="h-6 w-6 text-neutral-300" />

              <h4 className="text-lg font-semibold tracking-tight text-white">
                {f.title}
              </h4>

              <p className="text-sm leading-relaxed text-neutral-400">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
