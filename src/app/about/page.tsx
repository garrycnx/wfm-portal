import Image from "next/image";

export default function AboutPage() {
  return (
    <div style={{ padding: "60px" }}>
      <h1 style={{ marginBottom: "10px", textAlign: "left", marginTop: "60px" , width: "100%", marginInline: "auto",marginLeft: "400px"}}>About the Founder</h1>

      <div
        style={{
          display: "flex",
          gap: "40px",
          alignItems: "center",
        }}
      >
        {/* LEFT: About Text Box */}
        <div
          style={{
            flex: 1,
            padding: "30px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
            borderRadius: "12px",
            background: "#fff",
          }}
        >
          <p style={{ lineHeight: "1.7", fontSize: "16px" }}>
            I am a Workforce Management professional with 15+ years of experience
            delivering forecasting, scheduling, and capacity planning solutions
            at scale for global enterprises, including Fidelity Information
            Services (FIS), TaskUs, Capgemini, Concentrix, and other industry
            leaders.
            <br />
            <br />
            After years of working inside large operations, I saw how traditional
            workforce tools struggle with real-world complexity. That experience
            drives my focus on practical, scalable, and data-driven workforce
            solutions that help teams plan better and move faster.
          </p>
        </div>

        {/* RIGHT: Founder Image */}
        <div style={{ flex: 0.6, textAlign: "center" }}>
          <Image
            src="/founder.jpg"
            alt="Founder"
            width={380}
            height={520}
            style={{
              borderRadius: "28px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </div>
  );
}