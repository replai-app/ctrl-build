import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Capabilities from "@/components/Capabilities";
import Manifesto from "@/components/Manifesto";
import Ledger from "@/components/Ledger";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AI Text Refinement Engine | Humanize AI-Generated Content",
  description: "Transform AI-generated text into natural, human-like content. Our advanced cadence engine restores nuance, burstiness, and authentic writing patterns. Break free from the average with semantic restructuring and adversarial resilience.",
  keywords: [
    "AI text humanization",
    "humanize AI text",
    "AI text refinement",
    "natural language processing",
    "text cadence engine",
    "semantic restructuring",
    "AI writing tool",
    "content humanization",
    "text variance",
    "writing enhancement"
  ],
  openGraph: {
    title: "CTRL — BUILD | AI Text Refinement Engine",
    description: "Transform AI-generated text into natural, human-like content. Restore nuance and authentic writing patterns.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CTRL — BUILD | AI Text Refinement Engine",
    description: "Transform AI-generated text into natural, human-like content.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CTRL — BUILD",
    "applicationCategory": "TextEditor",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "12.00",
      "priceCurrency": "USD",
      "priceValidUntil": "2025-12-31"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "127"
    },
    "description": "Advanced AI-powered text refinement engine that humanizes AI-generated content by restoring natural cadence, burstiness, and nuance.",
    "featureList": [
      "Semantic Restructuring",
      "Burstiness & Cadence Engine",
      "Adversarial Resilience",
      "Real-time Text Refinement",
      "Multiple Tone Modes (Standard, Academic, Executive)"
    ],
    "screenshot": "/images/logo.png",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://ctrl-build.com"
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Sequence Labs",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://ctrl-build.com",
    "logo": `${process.env.NEXT_PUBLIC_SITE_URL || "https://ctrl-build.com"}/images/logo.png`,
    "sameAs": [
      "https://twitter.com/ctrlbuild",
      "https://github.com/ctrl-build"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "contact@ctrl-build.com",
      "contactType": "Customer Service"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Hero />
      <Ticker />
      <Capabilities />
      <Manifesto />
      <Ledger />
      <Footer />
    </>
  );
}
