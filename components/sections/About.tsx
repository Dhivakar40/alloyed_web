"use client";

import { motion } from "framer-motion";
import { Section } from "../ui/Section";

export function About() {
    const heroLine = "Forging the Future";
    const heroWords = heroLine.split(" ");

    return (
        // 1. SECTION: Transparent to reveal global DarkVeil background
        <Section id="about" className="flex min-h-[80vh] items-center justify-center p-10 bg-transparent">
            
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                
                {/* --- LEFT COLUMN: TEXT CONTENT --- */}
                <div className="max-w-2xl">
                    <motion.h2 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-bold uppercase tracking-widest text-blue-500 mb-6"
                    >
                        About Us
                    </motion.h2>

                    {/* Animated Hero Title */}
                    <div className="flex flex-wrap gap-x-3 mb-8 text-5xl md:text-7xl font-black leading-tight text-white">
                        {heroWords.map((word, i) => (
                            <span key={i} className="relative overflow-hidden inline-block">
                                <motion.span
                                    initial={{ y: "100%" }}
                                    whileInView={{ y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1, ease: "backOut" }}
                                    className="inline-block"
                                >
                                    {word}
                                </motion.span>
                            </span>
                        ))}
                    </div>

                    {/* UPDATED BODY TEXT: Brighter (slate-300) & Larger */}
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-slate-300 text-lg md:text-xl leading-relaxed font-medium"
                    >
                        An alloy is stronger than its individual parts—and so are we. <strong className="text-white">ALLOYED</strong> brings together the sharpest minds in full-stack development, blockchain innovation, and experience design to create software that withstands the test of time. 
                        <br /><br />
                        We believe in building digital products that are as beautiful as they are unbreakable. By blending cutting-edge tech stacks with user-centric strategies, we help startups and global brands alike forge deeper connections with their audience. We build the tools that build your business.
                    </motion.p>
                </div>

                {/* --- RIGHT COLUMN: IMAGE CONTAINER --- */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    
                    // --- NEW HOVER LOGIC (Matches Services/Process Cards) ---
                    whileHover={{ 
                        y: -8,
                        scale: 1.02,
                        borderColor: "rgba(59, 130, 246, 0.5)",
                        backgroundColor: "rgba(30, 41, 59, 1)", 
                        boxShadow: "0px 20px 40px -10px rgba(59, 130, 246, 0.2)"
                    }}

                    // STYLE: Solid Dark Background (bg-[#0B0F17]) instead of transparent
                    className="relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-[#0B0F17] group cursor-default"
                >
                    {/* PLACEHOLDER / IMAGE SLOT */}
                    {/* Once you have an image: <img src="..." className="object-cover w-full h-full" /> */}
                    
                    <div className="flex flex-col items-center justify-center w-full h-full text-slate-500 relative z-10">
                        <span className="text-lg font-medium border-2 border-dashed border-slate-700 p-6 rounded-xl group-hover:border-blue-500/50 group-hover:text-blue-400 transition-colors">
                            Add Image Here
                        </span>
                    </div>

                    {/* Decorative Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent opacity-60 pointer-events-none" />
                </motion.div>

            </div>
        </Section>
    );
}