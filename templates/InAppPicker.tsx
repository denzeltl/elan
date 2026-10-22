"use client";

/**
 * elan in-app variant picker (dev only).
 *
 * Usage, at the place the component renders:
 *
 *   <InAppPicker
 *     id="suspect-card"
 *     variants={{
 *       current: <SuspectCard {...props} />,
 *       a: <SuspectCardA {...props} />,
 *       b: <SuspectCardB {...props} />,
 *     }}
 *   />
 *
 * Variants receive the real props and data. The floating bar switches between them
 * (keys 1–9 too) and remembers the choice per id. In production it renders `current` only.
 * Remove the picker and the losing variants once the user has chosen.
 */

import { useEffect, useState, type ReactNode } from "react";

type Props = { id: string; variants: Record<string, ReactNode> };

export function InAppPicker({ id, variants }: Props) {
  const keys = Object.keys(variants);
  const storageKey = `elan-picker:${id}`;
  const [active, setActive] = useState(keys[0]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved && saved in variants) setActive(saved);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && e.target.closest("input, textarea, [contenteditable]")) return;
      const n = Number(e.key);
      if (n >= 1 && n <= keys.length) choose(keys[n - 1]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function choose(k: string) {
    setActive(k);
    try { localStorage.setItem(storageKey, k); } catch {}
  }

  if (process.env.NODE_ENV === "production") return <>{variants[keys[0]]}</>;

  return (
    <>
      {variants[active]}
      <div
        role="toolbar"
        aria-label={`Variants for ${id}`}
        style={{
          position: "fixed", bottom: 16, left: "50%", transform: "translateX(-50%)", zIndex: 2147483647,
          display: "flex", gap: 4, padding: 4, borderRadius: 999, background: "rgba(20,20,22,.92)",
          boxShadow: "0 6px 24px rgba(0,0,0,.3)", font: "500 13px/1 system-ui, sans-serif",
        }}
      >
        <span style={{ color: "#aaa", padding: "8px 10px" }}>{id}</span>
        {keys.map((k, i) => (
          <button
            key={k}
            onClick={() => choose(k)}
            aria-pressed={k === active}
            title={`Press ${i + 1}`}
            style={{
              cursor: "pointer", border: 0, borderRadius: 999, padding: "8px 12px",
              background: k === active ? "#fff" : "transparent", color: k === active ? "#111" : "#eee",
            }}
          >
            {k}
          </button>
        ))}
      </div>
    </>
  );
}
