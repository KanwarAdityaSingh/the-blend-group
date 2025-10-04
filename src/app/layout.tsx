import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/theme/ThemeContext";
import { RouteTransitionProvider } from "@/theme/RouteTransition";
import { LenisProvider } from "@/theme/LenisProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Blend Group — Where AI and Aesthetics Converge",
  description: "A luxurious, intelligent experience blending art, AI, and elegance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${poppins.variable} antialiased`}>
        <ThemeProvider>
          <LenisProvider>
            <RouteTransitionProvider>
              {children}
            </RouteTransitionProvider>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
