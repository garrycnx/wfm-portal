export default function AboutPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        padding: "60px 40px",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          background: "#0b1c2d",
          padding: "40px",
          borderRadius: "12px",
          boxShadow:
            "inset 0 1px 2px rgba(255,255,255,0.08), inset 0 -2px 4px rgba(0,0,0,0.6), 0 20px 40px rgba(0,0,0,0.35)",
          color: "#e5e7eb",
        }}
      >
        <h1
          style={{
            marginBottom: "20px",
            fontSize: "28px",
            fontWeight: 700,
            color: "#ffffff",
          }}
        >
          About the Founder
        </h1>

        <p style={{ lineHeight: 1.7, marginBottom: "16px", color: "#cbd5e1" }}>
          I am a Workforce Management professional and product builder with 15+
          years of experience delivering forecasting, scheduling, and capacity
          planning solutions at scale for global enterprises, including Fidelity
          Information Services (FIS), TaskUs, Capgemini, Concentrix, and other
          industry leaders.
        </p>

        <p style={{ lineHeight: 1.7, color: "#cbd5e1" }}>
          After years of working inside large operations, I saw how traditional
          workforce tools often fail to keep up with real business complexity.
          That experience led me to design AI-driven workforce solutions focused
          on accuracy, speed, and usability. My work blends deep WFM domain
          expertise with a SaaS-first mindset, helping teams reduce manual effort,
          improve planning accuracy, and make faster, more confident workforce
          decisions.
        </p>
      </div>
    </div>
  );
}
