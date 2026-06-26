import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://www.fluxbase.pl";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FluxBase - strony internetowe i systemy webowe",
    template: "%s | FluxBase",
  },
  description:
    "FluxBase Julian Rutkowski tworzy nowoczesne strony internetowe, landing page, portfolio i systemy webowe dla firm.",
  keywords: [
    "FluxBase",
    "strony internetowe",
    "tworzenie stron internetowych",
    "projektowanie stron",
    "landing page",
    "portfolio",
    "systemy webowe",
    "Next.js",
    "Pabianice",
  ],
  authors: [{ name: "FluxBase Julian Rutkowski" }],
  creator: "FluxBase",
  publisher: "FluxBase",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.png?v=fluxbase2", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "512x512" }],
  },
  openGraph: {
    title: "FluxBase - strony internetowe i systemy webowe",
    description:
      "Nowoczesne strony internetowe, portfolio, landing page i systemy webowe z dopracowanym designem.",
    url: siteUrl,
    siteName: "FluxBase",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "FluxBase logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FluxBase - strony internetowe i systemy webowe",
    description:
      "Projektowanie i wdrażanie nowoczesnych stron internetowych oraz systemów webowych.",
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
