import type { Metadata } from "next";
import API from '@/components/API';

export const metadata: Metadata = {
  title: "API Documentation | Developer Console",
  description: "Complete API documentation for CTRL — BUILD text refinement engine. Integrate our AI-powered text humanization API with cURL, Python, Node.js, and Go. Real-time text refinement endpoints with authentication.",
  keywords: [
    "CTRL BUILD API",
    "text refinement API",
    "AI text API",
    "API documentation",
    "text humanization API",
    "REST API",
    "developer tools",
    "API integration"
  ],
  openGraph: {
    title: "API Documentation | CTRL — BUILD",
    description: "Complete API documentation for CTRL — BUILD text refinement engine. Integrate with cURL, Python, Node.js, and Go.",
    url: "/api",
    type: "website",
  },
  alternates: {
    canonical: "/api",
  },
};

export default function APIPage() {
  return <API />;
}
