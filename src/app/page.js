import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  Hero,
  About,
  Timeline,
  HowIWork,
  Expertise,
  CaseStudies,
  Ventures,
  Faq,
  Elsewhere,
} from "@/components/home";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Timeline />
        <HowIWork />
        <Expertise />
        <CaseStudies />
        <Ventures />
        <Faq />
        <Elsewhere />
      </main>
      <Footer />
    </div>
  );
}
