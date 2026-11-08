import type { Metadata } from "next";
import { Noto_Serif_Sinhala, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const notoSerifSinhala = Noto_Serif_Sinhala({
  subsets: ["sinhala"],
  variable: "--font-sinhala",
  weight: ["400", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "තිලිණි සහ දිල්ෂාන් - විවාහ ආරාධනාව | Thilini & Dilshan - Wedding Invitation",
  description: "ප්‍රේමෙන් යෙදෙන සද සිනාදෙන දිනයේ ඔබව ආරාධනා කිරීමට සන්තෝෂයෙන් ඇරියුමු! 2026 ඔක්තෝබර් 21 - Hotel Golden River - Holiday Resort, වෙන්නප්පුව",
  keywords: ["wedding invitation", "Sinhala wedding", "Thilini", "Dilshan", "Hotel Golden River", "Wennappuwa"],
  openGraph: {
    title: "තිලිණි සහ දිල්ෂාන් - විවාහ ආරාධනාව",
    description: "2026 ඔක්තෝබර් 21 - Hotel Golden River - Holiday Resort, වෙන්නප්පුව",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="si" className={`${notoSerifSinhala.variable} ${playfair.variable} ${cormorant.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
