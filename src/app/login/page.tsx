"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // ✅ Redirect logged-in users
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") return null;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome to WFM Portal</h1>
        <p style={styles.subtitle}>
          Sign in with your Gmail Account
        </p>

        <button
          style={styles.googleBtn}
          onClick={() => signIn("google")}
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            style={styles.googleIcon}
          />
          Continue with Google
        </button>

        <p style={styles.footerText}>
          Secure login • No password required
        </p>
      </div>
    </div>
  );
}

/* ---------- STYLES (UNCHANGED) ---------- */

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #0f172a, #020617)",
  },

  card: {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "420px",
    textAlign: "center" as const,
    boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
  },

  title: {
    fontSize: "26px",
    fontWeight: "700",
    marginBottom: "10px",
  },

  subtitle: {
    color: "#555",
    marginBottom: "30px",
  },

  googleBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },

  googleIcon: {
    width: "20px",
    height: "20px",
  },

  footerText: {
    marginTop: "20px",
    fontSize: "12px",
    color: "#777",
  },
};
