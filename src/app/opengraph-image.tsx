import { ImageResponse } from "next/og";

export const alt = "TIM — An Interactive Tribute to Avicii";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#11120D",
          color: "#EFEDE3",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, letterSpacing: 8, color: "#a9aaad" }}>TIM</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", fontSize: 92, letterSpacing: -4, lineHeight: 1 }}>Before Avicii, there was Tim.</div>
          <div style={{ display: "flex", fontSize: 32, color: "#c9c8be", letterSpacing: -1 }}>
            An interactive tribute to Tim Bergling and his enduring legacy.
          </div>
        </div>
        <div style={{ display: "flex", height: 1, width: "100%", background: "#5a5b55" }} />
      </div>
    ),
    size,
  );
}
