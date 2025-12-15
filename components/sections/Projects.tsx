"use client";

import { motion } from "framer-motion";
import { Section } from "../ui/Section";

export function Projects() {
    const projects = [1, 2, 3];

    return (
        <Section id="work" className="min-h-screen bg-transparent px-6 py-24">
            <div className="mx-auto max-w-6xl">
                <h2 className="mb-16 text-4xl font-bold text-white">Selected Work</h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-zinc-900 cursor-pointer"
                        >
                            {/* Placeholder Image Effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <div className="absolute inset-0 bg-slate-800 transition-transform duration-700 group-hover:scale-110" />

                            <div className="absolute bottom-0 p-8">
                                <h3 className="text-2xl font-bold text-white mb-2">Project {i}</h3>
                                <p className="text-slate-400">Case Study Coming Soon</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
