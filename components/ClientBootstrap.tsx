"use client";

import { useEffect } from "react";
import { seedDoctorsIfNeeded } from "@/lib/utils";

export default function ClientBootstrap() {
  useEffect(() => {
    seedDoctorsIfNeeded();
  }, []);

  return null;
}
