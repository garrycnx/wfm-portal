"use client";

import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] flex items-center justify-center py-16 px-6">
      <div className="w-full max-w-lg">
        <h1 className="text-4xl font-bold text-[#0b1c2d] mb-2 text-center">Contact Us</h1>
        <p className="text-gray-500 text-center mb-8">
          Have a question or feedback? We would love to hear from you.
        </p>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {status === "success" && (
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 mb-6 text-sm font-medium">
              ✅ Thanks! We will get back to you soon.
            </div>
          )}

          {status === "error" && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 mb-6 text-sm font-medium">
              ❌ Something went wrong. Please try again.
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#00b4ff] focus:ring-2 focus:ring-[#00b4ff]/20 transition"
            />

            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#00b4ff] focus:ring-2 focus:ring-[#00b4ff]/20 transition"
            />

            <textarea
              placeholder="Your Query"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#00b4ff] focus:ring-2 focus:ring-[#00b4ff]/20 transition resize-none"
            />

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 bg-[#00b4ff] text-white font-semibold rounded-lg hover:bg-[#0095d8] disabled:opacity-60 transition-colors"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Quick Connect */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <a
            href="https://chat.whatsapp.com/Jwc6CHZsRyR2l7uP6x1N6n"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-white rounded-xl py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-green-50 hover:text-green-700 transition-colors border border-gray-100"
          >
            📱 WhatsApp Group
          </a>
          <a
            href="https://www.linkedin.com/in/gurpreetgarry/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-white rounded-xl py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-blue-50 hover:text-blue-700 transition-colors border border-gray-100"
          >
            💼 LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
