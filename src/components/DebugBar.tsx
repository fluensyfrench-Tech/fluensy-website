"use client";

import { useEffect, useState } from "react";

interface Props {
  courseType: string | null;
}

export default function DebugBar({ courseType }: Props) {
  const [taps, setTaps] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [jsError, setJsError] = useState("");
  const [ua, setUa] = useState("");

  useEffect(() => {
    setHydrated(true);
    setUa(navigator.userAgent.slice(0, 80));
    const handler = (e: ErrorEvent) => setJsError(e.message.slice(0, 100));
    window.addEventListener("error", handler);
    return () => window.removeEventListener("error", handler);
  }, []);

  return (
    <div
      style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "#111", color: "#0f0", fontSize: "12px",
        fontFamily: "monospace", padding: "6px 10px", zIndex: 99999,
        display: "flex", flexDirection: "column", gap: "3px",
      }}
    >
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
        <span>type: <strong style={{ color: "#ff0" }}>{courseType ?? "null"}</strong></span>
        <span>hydrated: <strong style={{ color: hydrated ? "#0f0" : "#f55" }}>{hydrated ? "YES" : "NO"}</strong></span>
        {/* button is always interactive on iOS — span/div are not */}
        <button
          onClick={() => setTaps((t) => t + 1)}
          style={{
            background: "#333", color: "#0f0", border: "1px solid #555",
            padding: "2px 10px", cursor: "pointer", borderRadius: "4px",
            fontSize: "12px", fontFamily: "monospace",
          }}
        >
          TAP({taps})
        </button>
      </div>
      {ua && <div style={{ color: "#888", fontSize: "10px" }}>{ua}</div>}
      {jsError && <div style={{ color: "#f55" }}>ERR: {jsError}</div>}
    </div>
  );
}
