import type { Metadata, Viewport } from "next";
import { Archivo_Black, Space_Grotesk, Playfair_Display } from "next/font/google";
import "./globals.css";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PORTFOLIO // Editorial Creative Developer & Engineer",
  description: "Senior full-stack developer portfolio crafted in a bold, minimal, editorial design style.",
  keywords: ["Full Stack Developer", "Portfolio", "Next.js", "TypeScript", "Tailwind CSS", "Creative Developer"],
  authors: [{ name: "Developer Portfolio" }],
  openGraph: {
    title: "PORTFOLIO // Editorial Creative Developer & Engineer",
    description: "Senior full-stack developer portfolio crafted in a bold, minimal, editorial design style.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFBEA",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${archivoBlack.variable} ${spaceGrotesk.variable} ${playfairDisplay.variable} scroll-smooth`}
    >
      <body className="bg-[#FFFBEA] text-[#111111] antialiased min-h-screen flex flex-col font-sans selection:bg-[#83E52B] selection:text-[#111111]">
        {/* Subtle Paper-Grain Background Texture */}
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
