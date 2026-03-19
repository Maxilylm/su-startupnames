import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NameForge — AI Startup Name Generator",
  description:
    "Generate creative, memorable startup names with AI. Enter your idea and get 10 unique names with taglines, domain suggestions, and explanations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-gray-100`}
      >
        {children}
              <script src="https://78slopads.vercel.app/api/promo.js" defer></script>
      </body>
    </html>
  );
}
