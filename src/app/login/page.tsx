"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#020617] px-6 py-16">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 text-center">
        <div className="text-4xl mb-4">🎯</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to WFM Portal</h1>
        <p className="text-gray-500 text-sm mb-8">
          Sign in with your Google account to access tools, dashboards, and resources.
        </p>

        <button
          onClick={() => signIn("google")}
          className="flex items-center justify-center gap-3 w-full py-3 px-6 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium text-sm shadow-sm transition-all hover:shadow-md cursor-pointer"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <p className="text-xs text-gray-400 mt-6">
          🔒 Secure login · No password required · Google OAuth
        </p>
      </div>
    </div>
  );
}
