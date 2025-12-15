"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IntroLoader } from "@/components/features/IntroLoader";
import { Hero } from "@/components/sections/Hero";
import { Navbar } from "@/components/ui/Navbar";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";

import { Process } from "@/components/sections/Process";
import { FAQ } from "@/components/sections/FAQ";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <main className="relative min-h-screen bg-transparent text-slate-200">
      <AnimatePresence>
        {!introComplete && (
          <IntroLoader key="intro" onComplete={() => setIntroComplete(true)} />
        )}
      </AnimatePresence>

      {introComplete && (
        <>
          <Navbar />
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Hero />
            <Services />
            <About />
            <WhyUs />
            <Process />
            <Projects />
            <FAQ />
            <Contact />
          </motion.div>
        </>
      )}
    </main>
  );
}
