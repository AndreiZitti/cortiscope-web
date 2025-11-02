import Hero from "@/components/sections/Hero";
import ProblemToSolution from "@/components/sections/ProblemToSolution";
import BiologicallyAware from "@/components/sections/BiologicallyAware";
import TransparencyViz from "@/components/sections/TransparencyViz";
import UseCases from "@/components/sections/UseCases";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemToSolution />
      <BiologicallyAware />
      <TransparencyViz />
      <UseCases />
      <CTA />
    </>
  );
}
