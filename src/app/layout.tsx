import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "./providers";
import WFMChatbot from "@/components/WFMChatbot";
import Script from "next/script";


export const metadata: Metadata = {
  title: "WFM Clubs – AI Workforce Management Platform",
  description:
    "Smarter forecasting, intelligent scheduling, and data-driven workforce decisions powered by AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-EJSVXJK0Y5"
        strategy="afterInteractive"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-EJSVXJK0Y5');
        `}
      </Script>

      <body className="antialiased bg-white text-gray-900 flex flex-col min-h-screen">
        <Providers>
          <Navbar />
          <main className="flex-1 pt-[70px]">{children}</main>
          <Footer />
          <WFMChatbot />
        </Providers>
      </body>
    </html>
  );
}