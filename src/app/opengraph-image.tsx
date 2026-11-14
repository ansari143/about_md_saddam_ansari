import { ImageResponse } from "next/og";
import { profile } from "@/data/site";

export const dynamic = "force-static";

export const alt = `${profile.displayName} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #0a0f1c 0%, #121a2c 60%, #1a1838 100%)",
          color: "#e7ecf5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, color: "#5cd6ea", letterSpacing: 4 }}>
          ENTERPRISE AI · GENAI · AGENTIC AI
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700 }}>{profile.displayName}</div>
          <div
            style={{
              fontSize: 44,
              marginTop: 12,
              backgroundImage: "linear-gradient(90deg, #5cd6ea, #a48bfa)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {profile.title}
          </div>
          <div style={{ display: "flex", fontSize: 26, marginTop: 28, color: "#a3afc5" }}>
            {`${profile.yearsExperience} years · RAG · LangGraph · MCP · Azure · DevSecOps`}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#8090ab" }}>{profile.location}</div>
      </div>
    ),
    size,
  );
}
