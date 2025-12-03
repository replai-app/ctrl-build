import type { Metadata } from "next";
import Privacy from '@/components/Privacy';

export const metadata: Metadata = {
  title: "Privacy Policy | Data Vault",
  description: "Privacy Policy for CTRL — BUILD. Learn about our zero-log guarantee, data collection practices, no-training pact, encryption standards, and user rights. Ephemeral processing with RAM-only storage.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Privacy Policy | CTRL — BUILD",
    description: "Privacy Policy for CTRL — BUILD. Learn about our zero-log guarantee and data protection practices.",
    url: "/privacy",
    type: "website",
  },
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return <Privacy />;
}
