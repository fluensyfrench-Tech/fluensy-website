"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { Suspense } from "react";

function DebugBarInner() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const type = searchParams.get("type");

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#000",
        color: "#0f0",
        fontSize: "13px",
        fontFamily: "monospace",
        padding: "6px 12px",
        zIndex: 99999,
        display: "flex",
        gap: "16px",
        flexWrap: "wrap",
      }}
    >
      <span>path: {pathname}</span>
      <span>type: {type ?? "null"}</span>
      <span>ua: {typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 60) : "?"}</span>
    </div>
  );
}

export default function DebugBar() {
  return (
    <Suspense fallback={null}>
      <DebugBarInner />
    </Suspense>
  );
}
