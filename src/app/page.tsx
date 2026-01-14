export default function Home() {
  return (
    <div>
      {/* HERO SECTION */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>
          AI Workforce Optimization Platform
        </h1>
        <p style={styles.heroSubtitle}>
          Smarter forecasting, intelligent scheduling, and data-driven
          workforce decisions — powered by AI.
        </p>

        <div style={styles.heroActions}>
          <a href="/login" style={styles.primaryBtn}>
            Get Started
          </a>
          <a href="/about" style={styles.secondaryBtn}>
            Learn More
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section style={styles.features}>
        <div style={styles.featureCard}>
          <h3>📊 AI Forecasting</h3>
          <p>
            Accurate demand forecasting using advanced statistical and AI
            models.
          </p>
        </div>

        <div style={styles.featureCard}>
          <h3>🗓 Intelligent Scheduling</h3>
          <p>
            Automatically generate optimized rosters with SLA and shrinkage
            constraints.
          </p>
        </div>

        <div style={styles.featureCard}>
          <h3>⚡ Real-time Optimization</h3>
          <p>
            Adjust staffing dynamically to reduce abandon rates and improve
            occupancy.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section style={styles.cta}>
        <h2>Ready to transform your WFM operations?</h2>
        <a href="/tools" style={styles.primaryBtn}>
          Explore AI Tools
        </a>
      </section>
    </div>
  );
}

/* ---------- STYLES ---------- */

const styles: { [key: string]: React.CSSProperties } = {
  hero: {
    padding: "100px 40px",
    textAlign: "center",
    background: "linear-gradient(135deg, #0b1c2d, #123b63)",
    color: "white",
  },
  heroTitle: {
    fontSize: "48px",
    fontWeight: 700,
    marginBottom: "20px",
  },
  heroSubtitle: {
    fontSize: "18px",
    maxWidth: "700px",
    margin: "0 auto 40px",
    lineHeight: 1.6,
    opacity: 0.9,
  },
  heroActions: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  primaryBtn: {
    padding: "14px 28px",
    background: "#00b4ff",
    color: "#fff",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: 600,
  },
  secondaryBtn: {
    padding: "14px 28px",
    background: "transparent",
    color: "#fff",
    border: "1px solid #fff",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: 500,
  },
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "30px",
    padding: "80px 60px",
    background: "#f4f6f8",
  },
  featureCard: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  cta: {
    padding: "80px 40px",
    textAlign: "center",
    background: "#0b1c2d",
    color: "white",
  },
};
