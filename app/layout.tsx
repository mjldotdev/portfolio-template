import type { Metadata, Viewport } from "next";
import { Barlow, Cormorant_Garamond, Space_Mono } from "next/font/google";
import Cursor from "@/components/cursor";
import Grain from "@/components/grain";
import ScrollProvider from "@/components/providers/scroll-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

/* ─── Fonts ─── */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  variable: "--font-barlow",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
  display: "swap",
});

/* ─── Viewport ─── */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  userScalable: false,
};

/* ─── Metadata ─── */
export const metadata: Metadata = {
  title: {
    template: "%s | Portfolio",
    default: "Portfolio — Creative Developer",
  },
  description:
    "Full-stack developer & designer crafting premium, motion-driven web experiences.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      className={`${cormorant.variable} ${barlow.variable} ${spaceMono.variable} scroll-smooth`}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        {/* Diamond emoji favicon */}
        <link
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>◆</text></svg>"
          rel="icon"
        />
      </head>
      <body className="overflow-x-hidden bg-[var(--bg)] text-[var(--text)] antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
          enableSystem={false}
        >
          <ScrollProvider>
            <Grain />
            <Cursor />
            {children}
          </ScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
