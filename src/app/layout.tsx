import type { Metadata } from "next";
import {  Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sinema APP",
  description: "The Simean Applications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={tajawal.variable}>
      <body
      
        className={` font-tajawal antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
