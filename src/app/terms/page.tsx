import type { Metadata } from "next";
import Terms from '@/components/Terms';

export const metadata: Metadata = {
  title: "Terms of Service | System Protocols",
  description: "Terms of Service for CTRL — BUILD. Read our system protocols, user conduct guidelines, AI limitations, payment terms, and termination policies.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Terms of Service | CTRL — BUILD",
    description: "Terms of Service for CTRL — BUILD. Read our system protocols and user conduct guidelines.",
    url: "/terms",
    type: "website",
  },
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return <Terms />;
}
