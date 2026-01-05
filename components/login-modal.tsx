"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { storage } from "@/lib/storage";
import { Session } from "@/lib/types";
import { useRouter } from "next/navigation";

import { Stethoscope, User, Lock } from "lucide-react";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  role: "admin"; // doctor only
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();

    // Demo / local session (doctor login)
    storage.setSession({ role: "admin" });

    onClose();
    router.push("/admin/dashboard");
  }

  function resetAndClose() {
    setUsername("");
    setPassword("");
    onClose();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) resetAndClose();
      }}
    >
      <DialogContent className="sm:max-w-md bg-neutral-950 border-neutral-800 text-neutral-100">
        {/* ===== HEADER ===== */}
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-neutral-800 text-neutral-200">
              <Stethoscope className="h-5 w-5" />
            </div>

            <div>
              <DialogTitle className="text-lg font-bold tracking-tight">
                Doctor Login
              </DialogTitle>
              <p className="text-sm text-neutral-400">
                Secure access · OPD dashboard
              </p>
            </div>
          </div>
        </DialogHeader>

        {/* ===== FORM ===== */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {/* Username */}
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wide text-neutral-400">
              Username
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="pl-9 bg-neutral-900 border-neutral-800 text-neutral-100 placeholder:text-neutral-500"
                placeholder="Doctor username"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wide text-neutral-400">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-9 bg-neutral-900 border-neutral-800 text-neutral-100 placeholder:text-neutral-500"
                placeholder="Enter password"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              className="bg-white text-neutral-900 hover:bg-neutral-200 font-semibold"
              onClick={resetAndClose}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-neutral-900 text-neutral-100 hover:bg-neutral-800 font-semibold"
            >
              Login
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
