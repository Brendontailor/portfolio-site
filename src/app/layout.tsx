import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/data/site";
import "./globals.css";

const plex = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? site.url,
  ),
  title: {
    default: "Brendon Tailor — Sistemas que resolvem problemas reais",
    template: "%s — Brendon Tailor",
  },
  description: site.description,
  applicationName: "Brendon Tailor",
  authors: [{ name: site.name, url: site.github }],
  creator: site.name,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Brendon Tailor",
    "desenvolvedor full-stack",
    "portfólio",
    "SaaS",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
    "Monky Soluções",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: "Brendon Tailor",
    title: "Brendon Tailor — Sistemas que resolvem problemas reais",
    description: site.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Brendon Tailor — sistemas que resolvem problemas reais",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brendon Tailor — Sistemas que resolvem problemas reais",
    description: site.description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#08090a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${plex.variable} ${jetbrains.variable}`}
    >
      <body>
        <a className="skip-link" href="#main">
          Pular para o conteúdo
        </a>
        <div className="page-grid" aria-hidden="true" />
        <SiteHeader />
        {children}
        <SiteFooter />
        <noscript>
          <style>{".reveal{opacity:1;transform:none}"}</style>
        </noscript>
      </body>
    </html>
  );
}
