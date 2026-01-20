import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "I skipped the pitch deck. Here's how I think instead.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(135deg, #fafaf9 0%, #eff6ff 100%)",
          padding: "60px 80px",
          position: "relative",
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 8,
            height: "100%",
            background: "linear-gradient(180deg, #2563eb 0%, #7c3aed 100%)",
          }}
        />

        {/* JD Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: 12,
            backgroundColor: "#2563eb",
            marginBottom: 40,
          }}
        >
          <span
            style={{
              fontSize: 40,
              fontWeight: 600,
              color: "white",
              fontFamily: "Georgia, serif",
            }}
          >
            JD
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 300,
            color: "#9ca3af",
            fontFamily: "Georgia, serif",
            marginBottom: 8,
          }}
        >
          I skipped the pitch deck.
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#1a1a1a",
            marginBottom: 32,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
          }}
        >
          Here&apos;s how I think.
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: "#6b7280",
            fontFamily: "monospace",
            marginBottom: 40,
          }}
        >
          An R&D methodology for TruStage
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 18,
            color: "#9ca3af",
            letterSpacing: "0.15em",
            fontFamily: "monospace",
            textTransform: "uppercase",
          }}
        >
          JD Fiscus · Detroit
        </div>

        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            right: 100,
            top: 100,
            width: 200,
            height: 200,
            borderRadius: "50%",
            border: "1px solid rgba(37, 99, 235, 0.2)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 150,
            top: 150,
            width: 120,
            height: 120,
            borderRadius: "50%",
            border: "1px solid rgba(124, 58, 237, 0.2)",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
