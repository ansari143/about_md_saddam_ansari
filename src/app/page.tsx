import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { ScrollToTop } from "@/components/ScrollToTop";
import { About } from "@/components/sections/About";
import { Architecture } from "@/components/sections/Architecture";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Expertise } from "@/components/sections/Expertise";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Resume } from "@/components/sections/Resume";
import { profile } from "@/data/site";
import { publicFileExists } from "@/lib/assets";

export default function HomePage() {
  const hasResume = publicFileExists(profile.resumePath);
  const hasPhoto = publicFileExists(profile.photoPath);

  return (
    <>
      <JsonLd hasPhoto={hasPhoto} />
      <Header />
      <main id="main">
        <Hero hasResume={hasResume} />
        <About hasPhoto={hasPhoto} />
        <Experience />
        <Expertise />
        <Projects />
        <Architecture />
        <Certifications />
        <Resume hasResume={hasResume} />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
