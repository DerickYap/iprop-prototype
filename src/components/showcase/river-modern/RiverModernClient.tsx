"use client";

import dynamic from "next/dynamic";
import riverModern from "@/content/river-modern";

// WebGL must never run on the server → load the experience client-only.
const Experience = dynamic(() => import("./RiverModernExperience"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0" style={{ background: riverModern.palette.bg }} />
  ),
});

export default function RiverModernClient() {
  return <Experience />;
}
