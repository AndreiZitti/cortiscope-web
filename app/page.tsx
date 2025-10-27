import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Comparison from "@/components/sections/Comparison";
import BiologicallyAware from "@/components/sections/BiologicallyAware";
import Technology from "@/components/sections/Technology";
import UseCases from "@/components/sections/UseCases";
import Stats from "@/components/sections/Stats";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Comparison />
      <BiologicallyAware />
      <Technology />
      <UseCases />
      <Stats />
      <CTA />
    </>
  );
}
