import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { AuthProvider } from "@/context/auth-context";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/providers/theme-provider";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "FixItNow — Home Services Marketplace",
  description: "Book trusted technicians for plumbing, electrical, cleaning, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} flex min-h-screen flex-col font-sans`}>
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
    <QueryProvider>
      <AuthProvider>
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
        <Toaster richColors position="top-center" />
      </AuthProvider>
    </QueryProvider>
  </ThemeProvider>
</body>
    </html>
  );
}