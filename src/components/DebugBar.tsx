"use client";

interface Props {
  courseType: string | null;
}

export default function DebugBar({ courseType }: Props) {
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "ssr";

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#000",
        color: "#0f0",
        fontSize: "12px",
        fontFamily: "monospace",
        padding: "6px 10px",
        zIndex: 99999,
        lineHeight: "1.4",
      }}
    >
      <div>courseType: <strong style={{ color: "#ff0" }}>{courseType ?? "null"}</strong></div>
      <div style={{ color: "#aaa", fontSize: "11px" }}>{ua.slice(0, 80)}</div>
    </div>
  );
}
