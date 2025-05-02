import type { Metadata } from "next";
import { Cabin } from "next/font/google";
import "./globals.css";

import { Navbar, Footer } from "@/components/layout";

const cabinSans = Cabin({
  variable: "--font-cabin-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Event Management System",
  description: "Event Management System application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cabinSans.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
