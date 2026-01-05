"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import LoginModal from "@/components/login-modal";
import { storage } from "@/lib/storage";
import { Session } from "@/lib/types";

import { Stethoscope, LogIn, LogOut, Menu, X, Shield } from "lucide-react";

export default function Header() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(storage.getSession());
  }, []);

  function handleLogout() {
    storage.clearSession();
    setSession(null);
    setMenuOpen(false);
    router.push("/");
  }

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="w-full border-b border-neutral-800 bg-neutral-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          {/* Branding */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800 text-neutral-100">
              <Stethoscope className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <h1 className="text-lg font-semibold text-neutral-100">
                OPD Management
              </h1>
              <p className="text-xs text-neutral-400">
                Doctor Appointment System
              </p>
            </div>
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            {!session && (
              <Button
                className="
                  bg-neutral-100 text-neutral-900
                  hover:bg-neutral-300
                  transition-colors
                "
                onClick={() => setOpen(true)}
              >
                <Shield className="mr-2 h-4 w-4" />
                Doctor Login
              </Button>
            )}

            {session && (
              <Button
                variant="outline"
                className="border-neutral-700 bg-neutral-900 text-neutral-200"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden rounded-md p-2 text-neutral-200 hover:bg-neutral-800"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/50"
        />
      )}

      {/* ================= MOBILE DRAWER ================= */}
      <div
        className={`
          fixed right-0 top-0 z-50 h-full
          w-3/4 max-w-sm
          bg-neutral-950 border-l border-neutral-800
          transform transition-transform duration-300 ease-in-out
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-neutral-800 text-neutral-100">
              <Stethoscope className="h-4 w-4" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-neutral-100">
                OPD Management
              </p>
              <p className="text-[11px] text-neutral-400">Doctor System</p>
            </div>
          </div>

          <button
            onClick={() => setMenuOpen(false)}
            className="rounded-md p-2 hover:bg-neutral-800"
          >
            <X className="h-5 w-5 text-neutral-300" />
          </button>
        </div>

        {/* Drawer content */}
        <div className="px-4 py-5 space-y-6">
          {!session && (
            <button
              onClick={() => {
                setOpen(true);
                setMenuOpen(false);
              }}
              className="
                w-full flex items-center gap-3
                rounded-md bg-neutral-100
                px-3 py-2.5
                text-sm font-medium text-neutral-900
                hover:bg-neutral-300
                active:scale-[0.97]
                transition-all
              "
            >
              <LogIn className="h-4 w-4" />
              Doctor Login
            </button>
          )}

          {session && (
            <button
              onClick={handleLogout}
              className="
                w-full flex items-center gap-3
                rounded-md border border-red-900/40
                bg-red-950/40
                px-3 py-2.5
                text-sm text-red-300
                hover:bg-red-900/40
                active:scale-[0.97]
                transition-all
              "
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Login modal */}
      <LoginModal
        open={open}
        role="admin"
        onClose={() => {
          setOpen(false);
          setSession(storage.getSession());
        }}
      />
    </>
  );
}
