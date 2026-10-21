import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

export function ogImage(title: string, subtitle: string, kicker: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#09090b",
          color: "#fafafa",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#8b93ff" }}>{kicker}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2 }}>{title}</div>
          <div style={{ marginTop: 24, fontSize: 32, lineHeight: 1.35, color: "#a1a1aa", maxWidth: 1000 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#a1a1aa" }}>Day Nguyen · Forward Deployed & Product Engineer</div>
      </div>
    ),
    ogSize,
  );
}
