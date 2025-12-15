"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Section } from "../ui/Section";
import { Send, Sparkles, CheckCircle2, Loader2, Linkedin, Instagram, MessageCircle, Mail } from "lucide-react";
import { useState, FormEvent } from "react";
import LogoLoop, { LogoItem } from "../ui/LogoLoop"; 

// --- 1. IMPORT REACT ICONS ---
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFlutter, SiPostgresql, SiGraphql } from 'react-icons/si';

export function Contact() {
    const [formState, setFormState] = useState({ name: "", email: "", request: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    // --- 2. DEFINE YOUR TECH LOGOS ---
    const techLogos: LogoItem[] = [
        { node: <SiReact className="text-[#61DAFB]" />, title: "React", href: "https://react.dev" },
        { node: <SiNextdotjs className="text-white" />, title: "Next.js", href: "https://nextjs.org" },
        { node: <SiTypescript className="text-[#3178C6]" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
        { node: <SiTailwindcss className="text-[#06B6D4]" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
        { node: <SiFlutter className="text-[#02569B]" />, title: "Flutter", href: "https://flutter.dev" },
        { node: <SiPostgresql className="text-[#4169E1]" />, title: "PostgreSQL", href: "https://www.postgresql.org" },
        { node: <SiGraphql className="text-[#E10098]" />, title: "GraphQL", href: "https://graphql.org" },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formState,
                    type: "contact" 
                }),
            });
            if (response.ok) {
                setStatus("success");
                setFormState({ name: "", email: "", request: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    const inputVariants = {
        rest: { scale: 1, borderColor: "rgba(255, 255, 255, 0.1)" },
        focus: { 
            scale: 1.02, 
            borderColor: "rgba(59, 130, 246, 0.8)",
            boxShadow: "0px 0px 15px rgba(59, 130, 246, 0.3)",
            transition: { duration: 0.3 }
        }
    };

    return (
        <div className="bg-[#0B0F17] overflow-hidden relative">
            
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

            <Section id="contact" className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-24 relative z-10">
                {/* --- HEADER --- */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold uppercase tracking-widest mb-6"
                    >
                        <Sparkles size={14} />
                        <span>Start The Conversation</span>
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-white leading-tight mb-4"
                    >
                        Ready to separate yourself <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            from the noise?
                        </span>
                    </motion.h2>
                </div>

                {/* --- FORM CARD --- */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-xl mx-auto bg-[#0B0F17] border border-white/10 p-10 rounded-3xl shadow-2xl relative overflow-hidden z-20"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-50" />

                    <AnimatePresence mode="wait">
                        {status === "success" ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="flex flex-col items-center text-center py-10"
                            >
                                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 text-green-400">
                                    <CheckCircle2 size={40} />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4">Request Received!</h3>
                                <p className="text-slate-300 text-lg mb-8 max-w-sm">
                                    Thank you, {formState.name}. We have sent a confirmation email to your inbox.
                                </p>
                                <button 
                                    onClick={() => setStatus("idle")}
                                    className="text-blue-400 hover:text-blue-300 font-bold text-base transition-colors"
                                >
                                    Send another request
                                </button>
                            </motion.div>
                        ) : (
                            <motion.form 
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-8"
                                onSubmit={handleSubmit}
                            >
                                <div>
                                    <label className="block text-base font-semibold text-slate-300 mb-2 ml-1">Name</label>
                                    <motion.input 
                                        required 
                                        name="name" 
                                        value={formState.name} 
                                        onChange={handleChange} 
                                        type="text" 
                                        placeholder="John Doe" 
                                        variants={inputVariants} 
                                        initial="rest" 
                                        whileFocus="focus" 
                                        className="w-full bg-[#1A1F2E] border border-white/10 rounded-xl p-4 text-white text-lg placeholder-slate-500 focus:outline-none transition-colors" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-base font-semibold text-slate-300 mb-2 ml-1">Email Address</label>
                                    <motion.input 
                                        required 
                                        name="email" 
                                        value={formState.email} 
                                        onChange={handleChange} 
                                        type="email" 
                                        placeholder="eg : alloyedtech@gmail.com" 
                                        variants={inputVariants} 
                                        initial="rest" 
                                        whileFocus="focus" 
                                        className="w-full bg-[#1A1F2E] border border-white/10 rounded-xl p-4 text-white text-lg placeholder-slate-500 focus:outline-none transition-colors" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-base font-semibold text-slate-300 mb-2 ml-1">How can we help?</label>
                                    <motion.textarea 
                                        required 
                                        name="request" 
                                        value={formState.request} 
                                        onChange={handleChange} 
                                        rows={4} 
                                        placeholder="Tell us about your goals..." 
                                        variants={inputVariants} 
                                        initial="rest" 
                                        whileFocus="focus" 
                                        className="w-full bg-[#1A1F2E] border border-white/10 rounded-xl p-4 text-white text-lg placeholder-slate-500 focus:outline-none transition-colors resize-none" 
                                    />
                                </div>
                                <motion.button 
                                    disabled={status === "loading"} 
                                    whileHover={{ scale: 1.02 }} 
                                    whileTap={{ scale: 0.98 }} 
                                    className="group w-full relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 p-5 font-bold text-white text-lg shadow-lg transition-all hover:shadow-blue-500/25 disabled:opacity-50"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        {status === "loading" ? (
                                            <>
                                                <Loader2 size={20} className="animate-spin" /> Sending...
                                            </>
                                        ) : (
                                            <>
                                                <span className="mr-1">Send Request</span> 
                                                <Send size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                            </>
                                        )}
                                    </span>
                                    <div className="absolute inset-0 -z-0 translate-y-[100%] bg-white/20 transition-transform duration-300 group-hover:translate-y-0" />
                                </motion.button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </motion.div>
            </Section>

            {/* ======================= */}
            {/* FOOTER START HERE       */}
            {/* ======================= */}
            <footer className="relative border-t border-white/5 bg-[#0B0F17] pt-16 pb-12 overflow-hidden">
                
                {/* 1. INFINITE TECH STACK LOOP */}
                <div className="mb-20 opacity-100">
                    <LogoLoop
                        logos={techLogos}
                        speed={100}
                        direction="left"
                        logoHeight={48}
                        gap={60}
                        pauseOnHover={true}
                        fadeOut={true}
                        fadeOutColor="#0B0F17" 
                        scaleOnHover={true}
                    />
                </div>

                {/* 2. SOCIAL LINKS */}
                <div className="flex flex-col items-center justify-center gap-10 relative z-20">
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-blue-500">
                        Follow Us On
                    </h3>
                    
                    <div className="flex gap-8">
                        {/* Instagram */}
                        <a href="https://instagram.com/alloyedtech" target="_blank" rel="noopener noreferrer" className="group relative flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-pink-500/50 hover:bg-pink-500/10 hover:text-pink-500 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                            <Instagram size={28} />
                        </a>

                        {/* LinkedIn */}
                        <a href="https://www.linkedin.com/in/alloyed-tech-722668393" target="_blank" rel="noopener noreferrer" className="group relative flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-500 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                            <Linkedin size={28} />
                        </a>

                        {/* WhatsApp */}
                        <a href="https://wa.me/918072353262" target="_blank" rel="noopener noreferrer" className="group relative flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-green-500/50 hover:bg-green-500/10 hover:text-green-500 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                            <MessageCircle size={28} />
                        </a>

                        {/* Email */}
                        <a href="mailto:alloyedtech@gmail.com" className="group relative flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-purple-500 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                            <Mail size={28} />
                        </a>
                    </div>
                </div>

                <div className="mt-20 text-center text-sm font-medium text-slate-500">
                    <p>&copy; 2025 Alloyed Agency. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}