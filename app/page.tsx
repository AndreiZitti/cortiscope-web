import Hero from "@/components/sections/Hero";
import ProblemToSolution from "@/components/sections/ProblemToSolution";
import WhyDifferent from "@/components/sections/WhyDifferent";
import Transparency from "@/components/sections/Transparency";
import BuiltForYou from "@/components/sections/BuiltForYou";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemToSolution />
      <WhyDifferent />
      <Transparency />
      <BuiltForYou />
      <CTA />
    </>
  );
}
