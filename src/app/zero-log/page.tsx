import type { Metadata } from "next";
import ZeroLog from '@/components/ZeroLog';

export const metadata: Metadata = {
  title: "Zero-Log Guarantee | Clean Room Processing",
  description: "CTRL — BUILD's Zero-Log Guarantee: RAM-only processing, ephemeral data storage, AES-256 encryption, and warrant canary. Your text is processed and immediately deleted with zero persistence.",
  keywords: [
    "zero-log guarantee",
    "privacy policy",
    "data protection",
    "ephemeral processing",
    "RAM-only storage",
    "no data retention",
    "privacy-first AI"
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Zero-Log Guarantee | CTRL — BUILD",
    description: "RAM-only processing with zero data persistence. Your text is processed and immediately deleted.",
    url: "/zero-log",
    type: "website",
  },
  alternates: {
    canonical: "/zero-log",
  },
};

export default function ZeroLogPage() {
  return <ZeroLog />;
}
