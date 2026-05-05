"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Section } from "../ui/Section";
import { Plus, Minus } from "lucide-react";

export function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: "How long does a typical project take?",
            answer: "It depends on the scope. A standard high-performance landing page takes 2-4 weeks. A full-stack mobile app or SaaS platform typically ranges from 3-6 months. During our 'Blueprint' phase, we provide a precise timeline so you are never left guessing."
        },
        {
            question: "What is your pricing model?",
            answer: "We value transparency. For defined projects, we offer fixed-price contracts so you know exactly what you're paying. For ongoing evolution and scaling, we offer retainer partnerships. We don't do 'hidden fees'—everything is alloyed into the contract."
        },
        {
            question: "Do you provide support after launch?",
            answer: "Absolutely. We don't just launch and leave. We offer post-launch support packages that include server monitoring, bug fixes, and feature updates. Think of us as your long-term technical partners."
        },
        {
            question: "Who owns the code?",
            answer: "You do. Once the final payment is settled, 100% of the intellectual property, source code, and assets belong to you. We build it, but it is your empire."
        },
        {
            question: "Can you work with our existing team?",
            answer: "Yes. We are modular by design. We can act as your entire product team, or we can augment your existing engineering staff to tackle specific challenges like Blockchain integration or UI/UX overhauls."
        }
    ];

    const headingVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.05, duration: 0.6, ease: "easeOut" }
        })
    };

    const headingText = "Frequently Asked to us";

    return (
        <Section id="faq" className="py-16 md:py-24 bg-transparent relative overflow-hidden">
            
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-blue-500/5 blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16 relative z-10">
                
                <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
                    <p className="text-sm font-bold tracking-widest text-blue-400 uppercase mb-2">Clarification</p>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 flex flex-wrap justify-center gap-x-1 overflow-hidden">
                        {headingText.split("").map((char, i) => (
                            <motion.span
                                key={i}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                                variants={headingVariants}
                                className={char === " " ? "w-3" : ""}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl">Everything you need to know before we forge ahead.</p>
                </div>

                <div className="flex flex-col gap-5">
                    {faqs.map((faq, index) => {
                        const isOpen = activeIndex === index;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setActiveIndex(isOpen ? null : index)}
                                whileHover={{ 
                                    y: -2,
                                    scale: 1.01,
                                    borderColor: "rgba(59, 130, 246, 0.5)",
                                    backgroundColor: "rgba(30, 41, 59, 1)", 
                                }}
                                className={`
                                    group relative overflow-hidden rounded-2xl border p-5 md:p-8 cursor-pointer transition-all duration-500 z-20
                                    ${isOpen 
                                        ? "bg-[#0B0F17] border-blue-500/50 shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]" 
                                        : "bg-[#0B0F17] border-white/10"
                                    }
                                `}
                            >
                                {isOpen && (
                                    <motion.div 
                                        layoutId="active-glow"
                                        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 opacity-100" 
                                    />
                                )}

                                <div className="relative z-10 flex items-center justify-between gap-6">
                                    <h3 className={`text-base md:text-xl font-bold transition-colors duration-300 ${isOpen ? "text-white" : "text-slate-200 group-hover:text-white"}`}>
                                        {faq.question}
                                    </h3>
                                    
                                    <div className={`
                                        flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300
                                        ${isOpen ? "bg-blue-500 border-blue-500 rotate-180" : "bg-white/5 border-white/10 group-hover:border-white/30"}
                                    `}>
                                        {isOpen ? <Minus size={18} className="text-white" /> : <Plus size={18} className="text-slate-400" />}
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <p className="pt-6 text-base text-slate-400 leading-relaxed relative z-10 max-w-3xl">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </Section>
    );
}