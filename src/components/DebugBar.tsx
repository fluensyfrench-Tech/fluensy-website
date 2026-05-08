"use client";

import { useEffect, useState } from "react";

interface Props {
  courseType: string | null;
}

export default function DebugBar({ courseType }: Props) {
  const [ua, setUa] = useState(""); // empty on server → no hydration mismatch
  const [taps, setTaps] = useState(0);

  useEffect(() => {
    // only runs on the client, after hydration
    setUa(navigator.userAgent.slice(0, 70));
  }, []);

  return (
    <div
      style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "#111", color: "#0f0", fontSize: "13px",
        fontFamily: "monospace", padding: "8px 12px", zIndex: 99999,
        display: "flex", flexDirection: "column", gap: "4px",
      }}
    >
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <span>courseType: <strong style={{ color: "#ff0" }}>{courseType ?? "null"}</strong></span>
        {/* tap this div — if the counter goes up, React is hydrated and JS works */}
        <span
          onClick={() => setTaps((t) => t + 1)}
          style={{
            background: "#333", border: "1px solid #555",
            padding: "2px 10px", cursor: "pointer", borderRadius: "4px",
          }}
        >
          TAP ME ({taps})
        </span>
      </div>
      {ua && <div style={{ color: "#888", fontSize: "11px" }}>{ua}</div>}
    </div>
  );
}
