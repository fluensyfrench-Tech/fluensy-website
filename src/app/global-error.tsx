"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Global Error]", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "Space Grotesk, sans-serif",
          margin: 0,
          backgroundColor: "#fff",
          color: "#181A25",
        }}
      >
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              backgroundColor: "#F3F0FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.5rem",
              fontSize: "1.75rem",
            }}
          >
            ⚠
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            Something went wrong
          </h1>
          <p style={{ color: "#3A3D44", marginBottom: "2rem", maxWidth: 360 }}>
            A critical error occurred. Please refresh the page or try again.
          </p>
          <button
            onClick={reset}
            style={{
              padding: "0.75rem 2rem",
              backgroundColor: "#643BD8",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              fontSize: "1rem",
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
