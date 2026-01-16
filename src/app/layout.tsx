import type { Metadata } from "next";
import { IBM_Plex_Serif, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";

const ibmPlexSerif = IBM_Plex_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JD for Jeff | Accelerating TruStage's Technology Future",
  description: "A proposal for building Data & Technology as a Service at TruStage",
  openGraph: {
    title: "JD for Jeff",
    description: "Accelerating TruStage's Technology Future - Data & Technology as a Service",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JD for Jeff",
    description: "Accelerating TruStage's Technology Future",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ibmPlexSerif.variable} ${ibmPlexMono.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
