"use client";

import { motion } from "framer-motion";
import { Section } from "../ui/Section";
import { FileSearch, PenTool, Hammer, Rocket } from "lucide-react";

export function Process() {
    const steps = [
        {
            id: "01",
            title: "Blueprint",
            subtitle: "Discovery & Strategy",
            description: "We dissect your vision. Through deep-dive consultations, we map out requirements, user flows, and technical architecture.",
            icon: <FileSearch size={28} />,
        },
        {
            id: "02",
            title: "Molten Design",
            subtitle: "UI/UX & Prototyping",
            description: "We shape the user experience. Our team forges high-fidelity prototypes, ensuring the interface is intuitive and aligned with your brand.",
            icon: <PenTool size={28} />,
        },
        {
            id: "03",
            title: "The Forge",
            subtitle: "Development & Code",
            description: "The heavy lifting. Our engineers write clean, scalable code in iterative sprints, transforming the design into a functioning product.",
            icon: <Hammer size={28} />,
        },
        {
            id: "04",
            title: "Launch",
            subtitle: "Testing & Deployment",
            description: "Rigorous testing ensures no bugs survive. We handle the cloud deployment and provide post-launch support for seamless scaling.",
            icon: <Rocket size={28} />,
        }
    ];

    return (
        <Section id="process" className="flex min-h-[80vh] items-center justify-center bg-transparent px-4 py-24">
            <div className="w-full max-w-[95%] xl:max-w-7xl mx-auto relative z-10">
                
                <div className="text-center mb-20">
                    <motion.h2 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-base font-bold uppercase tracking-[0.2em] text-blue-500 mb-4"
                    >
                        Workflow
                    </motion.h2>
                    <motion.h3 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-white"
                    >
                        How We Work
                    </motion.h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {steps.map((step, index) => {
                        const isLast = index === steps.length - 1;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, duration: 0.5 }}
                                className="relative flex flex-col h-full"
                            >
                                {!isLast && (
                                    <div className="hidden lg:block absolute top-12 -right-10 w-12 h-[3px] bg-white/10 z-0">
                                        <div className="absolute inset-0 bg-blue-500/50 w-1/2 animate-pulse" />
                                    </div>
                                )}

                                <motion.div 
                                    whileHover={{ 
                                        y: -8,
                                        scale: 1.02,
                                        borderColor: "rgba(59, 130, 246, 0.5)",
                                        backgroundColor: "rgba(30, 41, 59, 1)", 
                                        boxShadow: "0px 20px 40px -10px rgba(59, 130, 246, 0.2)"
                                    }}
                                    className="group relative flex-grow overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F17] p-8 backdrop-blur-sm cursor-default z-20"
                                >
                                    {/* Watermark: Increased opacity for visibility */}
                                    <div className="absolute -top-4 -right-2 text-8xl font-black text-white opacity-[0.05] select-none group-hover:opacity-[0.1] transition-opacity">
                                        {step.id}
                                    </div>

                                    <div className="flex items-center gap-4 mb-6 relative z-10">
                                        <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20 group-hover:border-blue-500 transition-colors">
                                            {step.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-white leading-none mb-1.5">{step.title}</h4>
                                            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">{step.subtitle}</span>
                                        </div>
                                    </div>

                                    {/* TEXT UPDATE: Larger and Brighter */}
                                    <p className="text-slate-300 text-base leading-relaxed relative z-10 font-medium">
                                        {step.description}
                                    </p>

                                    <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                </motion.div>

                                {!isLast && (
                                    <div className="lg:hidden absolute left-1/2 -bottom-8 w-[2px] h-8 bg-white/10 -translate-x-1/2" />
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </Section>
    );
}