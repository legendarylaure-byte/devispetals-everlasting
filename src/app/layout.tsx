import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Devis Petals | Handmade Everlasting Flowers Kathmandu",
  description: "Handmade everlasting flowers crafted with love in Kathmandu. Pre-order your custom boutique bouquet today. World-class floral designs for special moments.",
  keywords: ["everlasting flowers", "handmade flowers", "Kathmandu florists", "custom bouquets", "Devis Petals"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>{children}</body>
    </html>
  );
}
