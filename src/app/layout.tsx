import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BlissOven — Luxury Handcrafted Desserts & Artisan Cakes",
  description:
    "BlissOven by Komal Agarwal — Where cakes become art. Premium handcrafted desserts, celebration cakes, brownies, cheesecakes & chocolates made with love. Order now.",
  keywords:
    "luxury bakery, handcrafted cakes, artisan desserts, celebration cakes, brownies, cheesecakes, chocolates, BlissOven, Komal Agarwal",
  openGraph: {
    title: "BlissOven — Luxury Handcrafted Desserts",
    description: "Crafted for Celebrations. Luxury Desserts. Handmade Memories.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
