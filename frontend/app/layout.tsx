import React from "react";
import type { Metadata } from "https://esm.sh/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Integrity Hub | Tilburg University",
  description: "Learn to recognize and prevent AI hallucinations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="bg-[#0c2340] text-white py-6">
          <div className="tiu-container flex justify-between items-center">
            <div className="text-xl font-bold tracking-tight">
              Tilburg University <span className="font-normal opacity-80 ml-2">| AI Integrity Hub</span>
            </div>
          </div>
        </header>
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-gray-50 border-t border-gray-200 py-12">
          <div className="tiu-container text-sm text-gray-600">
            <p>© {new Date().getFullYear()} Tilburg University. All rights reserved.</p>
            <p className="mt-2 text-xs">Designed for academic integrity and digital literacy.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}