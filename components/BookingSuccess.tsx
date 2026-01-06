"use client";

import { useRef } from "react";
import { Appointment } from "@/lib/types";
import {
  Hash,
  User,
  Phone,
  Timer,
  Clock,
  MapPin,
  CheckCircle2,
  Printer,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function BookingSuccess({
  appointment,
  current,
  onDone,
}: {
  appointment: Appointment;
  current?: Appointment | null;
  onDone: () => void;
}) {
  const receiptRef = useRef<HTMLDivElement>(null);

  /* -------- PRINT RECEIPT (SAME AS CARD) -------- */

  function printReceipt() {
    if (!receiptRef.current) return;

    const content = receiptRef.current.outerHTML;

    const win = window.open("", "_blank");
    if (!win) return;

    win.document.write(`
      <html>
        <head>
          <title>OPD Receipt</title>
          <style>
            * {
              box-sizing: border-box;
              font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            }
            body {
              margin: 0;
              padding: 24px;
              background: #0a0a0a;
              color: #e5e5e5;
            }
            .print-wrapper {
              max-width: 420px;
              margin: auto;
              text-align: center; 
            }
            .rounded-xl {
              border-radius: 12px;
            }
            .border {
              border: 1px solid #262626;
            }
            .bg-neutral-900 {
              background: #171717;
            }
            .text-neutral-400 {
              color: #a3a3a3;
            }
            .text-neutral-100 {
              color: #f5f5f5;
            }
            .text-green-500 {
              color: #22c55e;
            }
            .text-green-400 {
              color: #4ade80;
            }
            .bg-green-500\\/10 {
              background: rgba(34,197,94,0.1);
            }
            .bg-yellow-500\\/10 {
              background: rgba(234,179,8,0.1);
            }
            .text-yellow-400 {
              color: #facc15;
            }
            .font-bold {
              font-weight: 700;
            }
            .text-sm {
              font-size: 14px;
            }
            .text-xs {
              font-size: 12px;
            }
            .space-y-3 > * + * {
              margin-top: 12px;
            }
            .space-y-6 > * + * {
              margin-top: 24px;
            }
            .flex {
              display: flex;
            }
            .items-center {
              align-items: center;
            }
            .justify-between {
              justify-content: space-between;
            }
            .justify-center {
              justify-content: center;
            }
            .gap-2 {
              gap: 8px;
            }
            .h-14 {
              height: 56px;
            }
            .w-14 {
              width: 56px;
            }
            .h-8 {
              height: 32px;
            }
            .w-8 {
              width: 32px;
            }
            .p-4 {
              padding: 16px;
            }
            .rounded-full {
              border-radius: 9999px;
            }
          </style>
        </head>
        <body>
          <div class="print-wrapper">
            ${content}
          </div>

          <script>
            window.onload = () => {
              window.print();
            };
          </script>
        </body>
      </html>
    `);

    win.document.close();
  }

  return (
    <div className="space-y-6 text-center">
      {/* ===== RECEIPT CARD (SOURCE OF TRUTH) ===== */}
      <div ref={receiptRef} className="space-y-6">
        <div className="flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle2 className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-bold text-green-500">
            Thank you, {appointment.patientName}!
          </h3>
          <p className="text-sm text-neutral-400">
            Appointment confirmed. Please wait for your turn.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 space-y-3 text-sm">
          <TrackRow icon={Hash} label="Appointment ID" value={appointment.id} />
          <TrackRow
            icon={User}
            label="Patient"
            value={appointment.patientName}
          />
          <TrackRow icon={Phone} label="Mobile" value={appointment.mobile} />
          <TrackRow
            icon={Timer}
            label="OPD Token"
            value={`#${appointment.token}`}
            highlight
          />
          <TrackRow
            icon={Clock}
            label="Current Status"
            value={
              current?.status === "processing" ? "In Consultation" : "Waiting"
            }
            status
          />
          <TrackRow icon={MapPin} label="Address" value={appointment.address} />
        </div>
      </div>

      <p className="text-xs text-neutral-500">
        Please keep this receipt for status tracking.
      </p>

      {/* ===== ACTION BUTTONS (DOCTOR STYLE) ===== */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={printReceipt}
          className="bg-neutral-900 border border-neutral-700 text-neutral-100 hover:bg-neutral-800 flex items-center gap-2"
        >
          <Printer className="h-4 w-4" />
          Print Receipt
        </Button>

        <Button
          onClick={onDone}
          className="bg-white text-neutral-900 hover:bg-neutral-200"
        >
          Done
        </Button>
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
