import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ctrl-build.com'),
  title: {
    default: "CTRL — BUILD | AI Text Refinement Engine",
    template: "%s | CTRL — BUILD"
  },
  description: "Advanced AI-powered text refinement engine that humanizes AI-generated content. Restore natural cadence, burstiness, and nuance to your writing with semantic restructuring and adversarial resilience.",
  keywords: [
    "AI text refinement",
    "humanize AI text",
    "text humanization",
    "AI writing tool",
    "content refinement",
    "text cadence",
    "semantic restructuring",
    "AI detection bypass",
    "natural language processing",
    "text variance",
    "writing enhancement",
    "AI content tool"
  ],
  authors: [{ name: "Sequence Labs" }],
  creator: "Sequence Labs",
  publisher: "Sequence Labs",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "CTRL — BUILD",
    title: "CTRL — BUILD | AI Text Refinement Engine",
    description: "Advanced AI-powered text refinement engine that humanizes AI-generated content. Restore natural cadence and nuance to your writing.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "CTRL — BUILD AI Text Refinement Engine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CTRL — BUILD | AI Text Refinement Engine",
    description: "Advanced AI-powered text refinement engine that humanizes AI-generated content.",
    images: ["/images/og-image.png"],
    creator: "@ctrlbuild",
  },
  alternates: {
    canonical: "/",
  },
  category: "Technology",
  classification: "AI Text Processing Tool",
  manifest: "/manifest.json",
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CTRL — BUILD",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navigation />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
