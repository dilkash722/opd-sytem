import { CalendarCheck, Clock, Activity } from "lucide-react";

const features = [
  {
    icon: CalendarCheck,
    title: "Smart OPD Appointment",
    desc: "Book OPD appointments digitally with proper scheduling for a smooth clinic visit.",
  },
  {
    icon: Activity,
    title: "Live OPD Token System",
    desc: "Track patient tokens in real time and reduce crowd inside the clinic.",
  },
  {
    icon: Clock,
    title: "Reduced Waiting Time",
    desc: "Patients arrive only near their turn, saving time for both doctors and patients.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* ===== BACKGROUND GLOW ===== */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-[360px] w-[360px] rounded-full bg-neutral-800/30 blur-[140px]" />
        <div className="absolute top-1/3 -right-32 h-[320px] w-[320px] rounded-full bg-neutral-700/30 blur-[160px]" />
        <div className="absolute bottom-0 left-1/4 h-[300px] w-[300px] rounded-full bg-neutral-900 blur-[180px]" />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 space-y-10">
        {/* ===== SECTION HEADING ===== */}
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            OPD Appointment & Token System
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-400">
            A modern OPD system designed to help doctors manage appointments,
            reduce crowd, and save patient time.
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
                bg-neutral-900/40
                px-6 py-7
                space-y-3
                transition
                hover:border-neutral-600
                shadow-[inset_0_1px_1px_rgba(255,255,255,0.04),inset_0_-10px_28px_rgba(0,0,0,0.9)]
              "
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center rounded-lg bg-white/5 p-2">
                <f.icon className="h-6 w-6 text-neutral-300" />
              </div>

              {/* Title */}
              <h4 className="text-base sm:text-lg font-semibold tracking-tight text-white">
                {f.title}
              </h4>

              {/* Description */}
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
