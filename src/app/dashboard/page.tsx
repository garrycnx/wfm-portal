import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.header}>
          <img
            src={session.user?.image || "/user.png"}
            alt="User"
            style={styles.avatar}
          />

          <div>
            <h2 style={styles.name}>{session.user?.name}</h2>
            <p style={styles.email}>{session.user?.email}</p>
          </div>
        </div>

        <hr style={styles.divider} />

        <div style={styles.content}>
          <h3 style={styles.sectionTitle}>Welcome to WFM Portal 🎯</h3>
          <p style={styles.text}>
            You are successfully logged in. From here you can access tools,
            dashboards, and analytics.
          </p>

          <div style={styles.stats}>
            <div style={styles.statBox}>
              <h4>AI Tools</h4>
              <p>3 Available</p>
            </div>

            <div style={styles.statBox}>
              <h4>Templates</h4>
              <p>1 Ready</p>
            </div>

            <div style={styles.statBox}>
              <h4>Status</h4>
              <p style={{ color: "#22c55e" }}>Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #020617)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
  },

  card: {
    background: "#fff",
    width: "100%",
    maxWidth: "850px",
    borderRadius: "14px",
    padding: "30px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  avatar: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    border: "3px solid #0f172a",
  },

  name: {
    fontSize: "22px",
    fontWeight: "700",
  },

  email: {
    color: "#555",
    fontSize: "14px",
  },

  divider: {
    margin: "25px 0",
    border: "1px solid #eee",
  },

  content: {
    marginTop: "10px",
  },

  sectionTitle: {
    fontSize: "20px",
    marginBottom: "10px",
  },

  text: {
    color: "#444",
    marginBottom: "25px",
  },

  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "20px",
  },

  statBox: {
    background: "#f8fafc",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center" as const,
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
  },
};
