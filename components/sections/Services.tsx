"use client";

import { motion, Variants } from "framer-motion";
import { Section } from "../ui/Section";
import { Monitor, Smartphone, Cpu, Handshake, PenTool, LockIcon, Palette } from "lucide-react";

export function Services() {

    const services = [
        {
            title: "Mobile App Development",
            description: "Transform your vision into a robust handheld reality. We engineer custom mobile applications designed for durability and high engagement using Flutter, .NET MAUI, and React Native.",
            icon: <Smartphone size={48} />,
        },
        {
            title: "Web Development",
            description: "Build a digital foundation alloyed for strength and flexibility. Our experts architect secure, scalable web platforms using modern stacks like React, Angular, and ASP.NET Core.",
            icon: <Monitor size={48} />,
        },
        {
            title: "Q/A and Software Testing",
            description: "Software Testing is the rigorous, tactical validation of the finished code. It involves executing systematic tests—both manual and automated—to identify defects before launch.",
            icon: <Cpu size={48} />,
        },
        {
            title: "UI/UX Designing",
            description: "Great software begins with a precise blueprint. Our UI/UX design team fuses aesthetics with functionality, creating intuitive interfaces that engage users instantly from wireframe to prototype.",
            icon: <Palette size={48} />,
        },
        {
            title: "Blockchain Development",
            description: "Build decentralized, secure applications on an immutable ledger. We engineer custom blockchain solutions utilizing smart contracts and distributed ledger technology (DLT).",
            icon: <LockIcon size={48} />,
        },
        {
            title: "Free Consultation",
            description: "Experience our commitment to transparent partnership. We offer a free initial consultation focused entirely on our methodologies, communication channels, and collaboration models.",
            icon: <Handshake size={48} />,
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

    const headingText = "Services We Provide";

    return (
        <Section id="services" className="py-16 md:py-24 bg-transparent">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">

            <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
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
                <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "120px" }}
                    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="h-1.5 bg-blue-500 mt-6 rounded-full mx-auto"
                />
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 relative z-10">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                        transition={{ delay: index * 0.1, duration: 0.5, type: "tween" }}
                        whileHover={{ 
                            y: -8,
                            scale: 1.02,
                            borderColor: "rgba(59, 130, 246, 0.5)",
                            backgroundColor: "rgba(30, 41, 59, 1)", 
                            boxShadow: "0px 20px 40px -10px rgba(59, 130, 246, 0.2)"
                        }}
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F17] p-6 md:p-8 backdrop-blur-sm flex flex-col h-full cursor-default z-20"
                    >
                        <div className="mb-6 text-blue-500 transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-400">
                            {service.icon}
                        </div>
                        
                        <h3 className="text-2xl font-bold text-slate-100 mb-3">{service.title}</h3>
                        
                        <p className="text-base text-slate-400 leading-relaxed flex-grow">
                            {service.description}
                        </p>
                        
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </motion.div>
                ))}
            </div>

            </div>
        </Section>
    );
}