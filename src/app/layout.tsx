import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/lib/auth";

export const metadata: Metadata = {
  title: {
    default: "BilMatch - Danmarks største markedsplads for biler",
    template: "%s | BilMatch",
  },
  description:
    "Find din næste bil på BilMatch. Danmarks største markedsplads for køb og salg af brugte og nye biler. Søg blandt tusindvis af annoncer.",
  keywords: ["brugte biler", "nye biler", "bilsalg", "bilmarkedsplads", "Danmark", "køb bil", "sælg bil"],
  openGraph: {
    type: "website",
    locale: "da_DK",
    siteName: "BilMatch",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
