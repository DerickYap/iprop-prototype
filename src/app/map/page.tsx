import type { Metadata } from "next";
import { SingaporeMap } from "@/components/map/SingaporeMap";

export const metadata: Metadata = {
  title: "Explore — Singapore New Launches in 3D | iProp",
  description:
    "Pan, tilt and zoom across Singapore's new launch condominiums on an interactive 3D twilight map.",
  // Also embedded as the Home teaser iframe; no need to index the bare map.
  robots: { index: false },
};

export default function MapPage() {
  return (
    <main className="h-dvh w-full overflow-hidden">
      <SingaporeMap />
    </main>
  );
}
