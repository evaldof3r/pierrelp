import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[var(--color-primary-background)]">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
    </main>
  );
}
