"use client";

import { Appointment } from "@/lib/types";
import { Button } from "@/components/ui/button";

import {
  User,
  Phone,
  Calendar,
  Clock,
  MapPin,
  Hash,
  Stethoscope,
  Hourglass,
  Activity,
  CheckCircle2,
} from "lucide-react";

type Props = {
  bookings: Appointment[];
  onNext: (id: string) => void;
};

export default function BookingTable({ bookings, onNext }: Props) {
  if (bookings.length === 0) {
    return (
      <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6 text-center text-neutral-400">
        No appointments today
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {bookings.map((b) => (
        <div
          key={b.id}
          className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 space-y-3"
        >
          {/* ================= HEADER ================= */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-lg font-semibold text-white">
                {b.patientName}
              </p>

              <p className="text-xs text-neutral-400 flex items-center gap-1 mt-0.5">
                <Hash className="h-3 w-3" />
                {b.id} {/* ✅ BOOKING / APPOINTMENT ID */}
              </p>

              <p className="text-xs text-neutral-400">Token #{b.token}</p>
            </div>

            <StatusBadge status={b.status} />
          </div>

          {/* ================= DETAILS ================= */}
          <div className="space-y-2 text-sm text-neutral-300">
            <InfoRow icon={Phone} value={b.mobile} />
            <InfoRow icon={Calendar} value={b.date} />
            <InfoRow icon={Clock} value={b.time} />
            <InfoRow icon={MapPin} value={b.address} />
          </div>

          {/* ================= ACTION ================= */}
          {(b.status === "waiting" || b.status === "processing") && (
            <Button
              size="sm"
              onClick={() => onNext(b.id)}
              className="w-full bg-neutral-800 hover:bg-neutral-700"
            >
              Next Patient
            </Button>
          )}

          {/* ================= FOOTER ================= */}
          <div className="pt-2 border-t border-neutral-800 flex items-center gap-2 text-xs text-neutral-400">
            <Stethoscope className="h-3.5 w-3.5" />
            OPD Queue
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- HELPERS ---------- */

function InfoRow({
  icon: Icon,
  value,
}: {
  icon: React.ElementType;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-neutral-400" />
      <span>{value}</span>
    </div>
  );
}

/* ---------- STATUS BADGE ---------- */

function StatusBadge({ status }: { status: Appointment["status"] }) {
  const base =
    "inline-flex h-7 min-w-[110px] items-center justify-center gap-1 rounded-lg border bg-neutral-900 px-2 text-xs font-medium";

  if (status === "waiting") {
    return (
      <span className={`${base} border-yellow-500/30 text-yellow-400`}>
        <Hourglass className="h-3 w-3" />
        Waiting
      </span>
    );
  }

  if (status === "processing") {
    return (
      <span className={`${base} border-blue-500/30 text-blue-400`}>
        <Activity className="h-3 w-3" />
        In Consultation
      </span>
    );
  }

  return (
    <span className={`${base} border-green-500/30 text-green-400`}>
      <CheckCircle2 className="h-3 w-3" />
      Done
    </span>
  );
}
