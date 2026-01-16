import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "JD for Jeff - Accelerating TruStage's Technology Future";
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
            fontSize: 64,
            fontWeight: 600,
            color: "#1a1a1a",
            fontFamily: "Georgia, serif",
            marginBottom: 24,
          }}
        >
          Accelerating TruStage's Technology Future
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 32,
            color: "#4a5568",
            marginBottom: 8,
          }}
        >
          Let&apos;s Discover
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#4a5568",
            marginBottom: 40,
          }}
        >
          New Opportunities
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 18,
            color: "#718096",
            letterSpacing: "0.1em",
            fontFamily: "monospace",
          }}
        >
          Director of Research & Development
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
