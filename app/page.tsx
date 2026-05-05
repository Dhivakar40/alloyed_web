"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic"; // 1. ADDED THIS IMPORT

// Keep these as normal imports because they are at the very top of the page
import { IntroLoader } from "@/components/features/IntroLoader";
import { Hero } from "@/components/sections/Hero";
import { Navbar } from "@/components/ui/Navbar";

// 2. LAZY LOAD EVERYTHING BELOW THE HERO
// This forces the browser to prioritize loading the top of the page first, killing the lag.
const Services = dynamic(() => import("@/components/sections/Services").then(mod => mod.Services));
const About = dynamic(() => import("@/components/sections/About").then(mod => mod.About));
const WhyUs = dynamic(() => import("@/components/sections/WhyUs").then(mod => mod.WhyUs));
const Projects = dynamic(() => import("@/components/sections/Projects").then(mod => mod.Projects));
const Contact = dynamic(() => import("@/components/sections/Contact").then(mod => mod.Contact));
const Process = dynamic(() => import("@/components/sections/Process").then(mod => mod.Process));
const FAQ = dynamic(() => import("@/components/sections/FAQ").then(mod => mod.FAQ));

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
            {/* The layout remains exactly the same! */}
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