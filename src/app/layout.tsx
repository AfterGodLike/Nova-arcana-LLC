import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nova Arcana LLC — Digital Insight Services",
  description:
    "Nova Arcana LLC is a US-registered digital services company providing spiritual guidance content, personal insight experiences, and entertainment-based consulting. Available worldwide.",
  keywords: [
    "Nova Arcana",
    "digital services",
    "personal insight",
    "spiritual guidance",
    "entertainment consulting",
    "digital reports",
    "online sessions",
  ],
  authors: [{ name: "Nova Arcana LLC" }],
  icons: {
    icon: "/nova-arcana-logo.png",
  },
  openGraph: {
    title: "Nova Arcana LLC — Digital Insight Services",
    description:
      "Professional digital services for personal insight, spiritual guidance content, and entertainment-based consulting.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
