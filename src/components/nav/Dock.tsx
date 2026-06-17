"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

type DockItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
  /** Returns true when the current path belongs to this item. */
  match: (path: string) => boolean;
};

const items: DockItem[] = [
  {
    href: "/",
    label: "Home",
    match: (p) => p === "/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <path
          d="M3 10.5 12 4l9 6.5M5.5 9.5V19a1 1 0 0 0 1 1H10v-5h4v5h3.5a1 1 0 0 0 1-1V9.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/map",
    label: "Explore",
    match: (p) => p.startsWith("/map"),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <path
          d="M12 21s6.5-5.7 6.5-10.5A6.5 6.5 0 0 0 5.5 10.5C5.5 15.3 12 21 12 21Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="10.5" r="2.3" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    href: "/articles",
    label: "Journal",
    match: (p) => p.startsWith("/articles"),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <rect
          x="4"
          y="4.5"
          width="16"
          height="15"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M7.5 8.5h9M7.5 12h9M7.5 15.5h5.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export function Dock() {
  const pathname = usePathname() || "/";
  // Start hidden; reveal only on the top-level window so the dock never appears
  // inside the Home map-teaser iframe (which loads /map).
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(window.self === window.top);
  }, []);

  if (!show) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Primary"
      className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
    >
      <ul className="flex items-end gap-1 rounded-[22px] border border-white/12 bg-[#0f0d20]/70 p-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.85)] backdrop-blur-xl">
        {items.map((item) => {
          const active = item.match(pathname);
          return (
            <li key={item.href}>
              <motion.div whileHover={{ y: -8, scale: 1.06 }} whileTap={{ scale: 0.96 }}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex w-[68px] flex-col items-center gap-1 rounded-2xl px-2 py-2.5 transition-colors ${
                    active
                      ? "bg-white/10 text-[#f5c66b]"
                      : "text-white/65 hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span className="text-[11px] font-medium tracking-wide">
                    {item.label}
                  </span>
                  <span
                    aria-hidden
                    className={`h-1 w-1 rounded-full transition-colors ${
                      active ? "bg-[#f5c66b]" : "bg-transparent"
                    }`}
                  />
                </Link>
              </motion.div>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
