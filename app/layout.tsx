import type { Metadata } from "next";
import "./globals.css";

import { SmoothScrolling } from "@/components/ui/SmoothScrolling";

export const metadata: Metadata = {
  title: "Alloyed",
  description: "Next Gen Software Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative min-h-screen bg-[#0B0F17] text-white antialiased">

        {/* Wrap everything in the Lenis Provider */}
        <SmoothScrolling>



          {/* 2. Your Content (Relative position, scrolls smoothly) */}
          <div className="relative z-10">
            {children}
          </div>

        </SmoothScrolling>
      </body>
    </html>
  );
}