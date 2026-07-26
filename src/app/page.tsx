import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { EducationExperience } from "@/components/site/education-experience";
import { Projects } from "@/components/site/projects";
import { TechStack } from "@/components/site/tech-stack";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <EducationExperience />
        <Projects />
        <TechStack />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
