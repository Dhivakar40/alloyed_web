"use client";

import { motion } from "framer-motion";
import { Section } from "../ui/Section";

export function WhyUs() {
    return (
        <Section id="why-us" className="flex min-h-screen flex-col items-center justify-center bg-transparent px-6 py-20">
            
            <div className="w-full max-w-6xl mx-auto relative z-10">
                
                {/* --- HEADER SECTION --- */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-6xl font-black text-white mb-8"
                    >
                        Why Alloyed ?
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-4xl mx-auto"
                    >
                        Quality development forms the foundation of every partnership. Our initial operation has established a sophisticated command of the field, enabling us to deliver solutions with refined technical excellence. Every project receives our complete focus until completion. This company thrives when collaborating with businesses that prioritize lasting quality and mutual respect.
                    </motion.p>
                </div>

                {/* --- SPLIT GRID SECTION --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* --- OUR MOTO --- */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        
                        // --- NEW HOVER LOGIC (Matches Services) ---
                        whileHover={{ 
                            y: -8,
                            scale: 1.02,
                            borderColor: "rgba(59, 130, 246, 0.5)",
                            backgroundColor: "rgba(30, 41, 59, 1)", // Lighter Slate on Hover
                            boxShadow: "0px 20px 40px -10px rgba(59, 130, 246, 0.2)"
                        }}
                        
                        className="relative z-20 overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F17] p-10 backdrop-blur-sm flex flex-col items-center justify-center text-center group cursor-default"
                    >
                        <h3 className="text-2xl font-bold text-blue-400 mb-6 uppercase tracking-wider">
                            Our Moto
                        </h3>
                        <div className="flex flex-col gap-3 text-2xl md:text-3xl font-semibold text-white">
                            <span>Refined Quality.</span>
                            <span className="text-slate-400">Earned Trust.</span>
                            <span>Client Success.</span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </motion.div>

                    {/* --- OUR VISION --- */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        
                        // --- NEW HOVER LOGIC (Matches Services) ---
                        whileHover={{ 
                            y: -8,
                            scale: 1.02,
                            borderColor: "rgba(59, 130, 246, 0.5)",
                            backgroundColor: "rgba(30, 41, 59, 1)", 
                            boxShadow: "0px 20px 40px -10px rgba(59, 130, 246, 0.2)"
                        }}

                        className="relative z-20 overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F17] p-10 backdrop-blur-sm flex flex-col items-center justify-center group cursor-default"
                    >
                        <h3 className="text-2xl font-bold text-blue-400 mb-6 uppercase tracking-wider text-center">
                            Our Vision
                        </h3>
                        <p className="text-lg text-slate-300 leading-relaxed text-center md:text-left">
                            To evolve ambitious ideas into indispensable, high-performing digital resources. This firm finds its greatest accomplishment when helping partners realize the highest potential of custom technology solutions.
                        </p>
                        <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </motion.div>

                </div>

            </div>
        </Section>
    );
}