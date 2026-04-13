import Footer from "@/components/layout/footer";
import Nav from "@/components/layout/nav";
import Marquee from "@/components/marquee";
import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import Hero from "@/components/sections/hero";
import Process from "@/components/sections/process";
import Work from "@/components/sections/work";

const STACK_TICKER = [
  "Next.js 15",
  "TypeScript",
  "GSAP",
  "Tailwind v4",
  "Lenis",
  "Framer Motion",
  "React 19",
  "Figma",
  "Prisma",
  "tRPC",
  "Vercel",
  "Node.js",
] as const;

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />

      {/* Editorial section break — scrolling tech ticker */}
      <Marquee items={STACK_TICKER} speed={30} />

      <Work />

      {/* Reversed ticker between Work and Process */}
      <Marquee
        items={[
          "Design Systems",
          "Motion Design",
          "API Architecture",
          "Performance",
          "Accessibility",
          "Open Source",
        ]}
        reverse
        separator="—"
        speed={22}
      />

      <Process />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
