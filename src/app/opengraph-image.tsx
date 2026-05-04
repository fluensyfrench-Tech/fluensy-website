import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          background: "#08081a",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* Purple glow — bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: "-220px",
            left: "-160px",
            width: "680px",
            height: "680px",
            borderRadius: "50%",
            background: "rgba(79, 70, 229, 0.22)",
            display: "flex",
          }}
        />

        {/* Soft indigo glow — top center */}
        <div
          style={{
            position: "absolute",
            top: "-160px",
            left: "350px",
            width: "460px",
            height: "460px",
            borderRadius: "50%",
            background: "rgba(99, 102, 241, 0.1)",
            display: "flex",
          }}
        />

        {/* French flag strips — right edge */}
        <div
          style={{
            position: "absolute",
            right: "0",
            top: "0",
            bottom: "0",
            width: "300px",
            display: "flex",
          }}
        >
          <div
            style={{
              flex: 1,
              background: "#002395",
              opacity: 0.6,
              display: "flex",
            }}
          />
          <div
            style={{
              flex: 1,
              background: "#ffffff",
              opacity: 0.07,
              display: "flex",
            }}
          />
          <div
            style={{
              flex: 1,
              background: "#ED2939",
              opacity: 0.6,
              display: "flex",
            }}
          />
        </div>

        {/* Gradient mask: blends flag into dark background */}
        <div
          style={{
            position: "absolute",
            right: "0",
            top: "0",
            bottom: "0",
            width: "480px",
            background:
              "linear-gradient(90deg, #08081a 0%, #08081a 25%, transparent 100%)",
            display: "flex",
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "680px",
            height: "3px",
            background:
              "linear-gradient(90deg, #4f46e5 0%, #818cf8 55%, transparent 100%)",
            display: "flex",
          }}
        />

        {/* Left border accent */}
        <div
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            bottom: "0",
            width: "3px",
            background:
              "linear-gradient(180deg, #4f46e5 0%, rgba(79,70,229,0.15) 65%, transparent 100%)",
            display: "flex",
          }}
        />

        {/* Decorative dot grid — top right corner */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: "40px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            opacity: 0.25,
          }}
        >
          {[0, 1, 2, 3].map((row) => (
            <div key={row} style={{ display: "flex", gap: "10px" }}>
              {[0, 1, 2, 3, 4].map((col) => (
                <div
                  key={col}
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: "#818cf8",
                    display: "flex",
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "64px 80px",
            width: "780px",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "flex",
              background: "rgba(79, 70, 229, 0.18)",
              border: "1px solid rgba(99, 102, 241, 0.38)",
              borderRadius: "100px",
              padding: "7px 22px",
              marginBottom: "38px",
              alignSelf: "flex-start",
            }}
          >
            <span
              style={{
                color: "#a5b4fc",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
              }}
            >
              French Language Learning
            </span>
          </div>

          {/* Title */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "30px",
            }}
          >
            <span
              style={{
                fontSize: "90px",
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "-3px",
                lineHeight: 1,
              }}
            >
              Fluensy
            </span>
            <span
              style={{
                fontSize: "90px",
                fontWeight: 800,
                color: "#818cf8",
                letterSpacing: "-3px",
                lineHeight: 1,
              }}
            >
              French.
            </span>
          </div>

          {/* Tagline line 1 */}
          <span
            style={{
              fontSize: "21px",
              color: "#94a3b8",
              lineHeight: 1.6,
              marginBottom: "6px",
            }}
          >
            AI-powered online French courses for adults & kids.
          </span>
          {/* Tagline line 2 */}
          <span
            style={{
              fontSize: "21px",
              color: "#94a3b8",
              lineHeight: 1.6,
              marginBottom: "46px",
            }}
          >
            From complete beginner to confident speaker — at your own pace.
          </span>

          {/* CEFR Level pills */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "54px" }}>
            {[
              { label: "A1", name: "Beginner" },
              { label: "A2", name: "Elementary" },
              { label: "B1", name: "Intermediate" },
              { label: "B2", name: "Advanced" },
            ].map(({ label, name }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "10px",
                  padding: "10px 22px",
                }}
              >
                <span
                  style={{
                    color: "#a5b4fc",
                    fontSize: "18px",
                    fontWeight: 800,
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    color: "#475569",
                    fontSize: "12px",
                    marginTop: "3px",
                  }}
                >
                  {name}
                </span>
              </div>
            ))}
          </div>

          {/* Domain */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#10b981",
                display: "flex",
              }}
            />
            <span style={{ color: "#475569", fontSize: "18px", fontWeight: 500 }}>
              fluensyfrench.com
            </span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
