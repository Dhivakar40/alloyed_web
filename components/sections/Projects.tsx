"use client";

import { motion } from "framer-motion";
import { Section } from "../ui/Section";

export function Projects() {
    // Structured data for easy maintenance
    const projects = [
        {
            id: "portfolio",
            title: "Developer Portfolio",
            category: "Creative Portfolio",
            description: "A highly interactive, performance-optimized personal portfolio.",
            link: "https://praveenkdev.vercel.app",
            media: "/images/portfolio.png", // Add this image to your public folder
            type: "link"
        },
        {
            id: "pure-petal",
            title: "Pure Petal",
            category: "Corporate Platform",
            description: "A modern, professional company landing page designed for conversion.",
            link: "https://pure-petal.vercel.app/",
            media: "/images/pure-petal.png", // Add this image to your public folder
            type: "link"
        },
        {
            id: "ims-web",
            title: "IMS Web",
            category: "Corporate Platform",
            description: "Scalable enterprise web application focused on seamless user experience.",
            link: "https://imsweb.vercel.app/",
            media: "/images/imsweb.png", // Add this image to your public folder
            type: "link"
        },
        {
            id: "mobile-app",
            title: "Mobile App Demo",
            category: "Mobile Application",
            description: "Fluid, native mobile experience demonstrating our cross-platform capabilities.",
            link: null,
            media: "/videos/mobile-demo.mp4", // Add your video to public/videos/
            type: "video"
        }
    ];

    return (
        <Section id="work" className="py-24 bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
                <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
                    <p className="text-sm font-bold tracking-widest text-blue-400 uppercase mb-2">Portfolio</p>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Our Works</h2>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 mb-16">
                    {projects.map((project, index) => {
                        // Dynamically choose wrapper based on if it's a link or just a video display
                        const Wrapper = project.type === "link" ? "a" : "div";
                        const wrapperProps = project.type === "link" ? {
                            href: project.link,
                            target: "_blank",
                            rel: "noopener noreferrer"
                        } : {};

                        return (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                className="group relative aspect-video overflow-hidden rounded-lg bg-zinc-900 cursor-pointer"
                            >
                                <Wrapper {...wrapperProps} className="block w-full h-full">

                                    {/* Media Layer (Image or Video) */}
                                    {project.type === "video" ? (
                                        <video
                                            src={project.media}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            // CHANGED: object-cover to object-contain
                                            className="absolute inset-0 h-full w-full object-contain bg-zinc-900 transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div
                                            className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                                            style={{
                                                backgroundImage: `url(${project.media})`,
                                                // CHANGED: "cover" to "contain" so the whole image fits
                                                backgroundSize: "contain",
                                                backgroundPosition: "center",
                                                // ADDED: Prevents the image from tiling to fill empty space
                                                backgroundRepeat: "no-repeat",
                                                backgroundColor: "#18181b" // Matches tailwind zinc-900
                                            }}
                                        />
                                    )}

                                    {/* Gradient Overlay for Text Readability */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent transition-opacity duration-500" />

                                    {/* Text Content */}
                                    <div className="absolute bottom-0 p-8 w-full transition-transform duration-500 group-hover:-translate-y-2">
                                        <p className="text-sm font-bold tracking-widest text-blue-400 uppercase mb-2">
                                            {project.category}
                                        </p>

                                        <h3 className="text-2xl font-bold text-slate-100 mb-3 flex items-center gap-2">
                                            {project.title}
                                            {project.type === "link" && (
                                                <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            )}
                                        </h3>

                                        <p className="text-base text-slate-400 leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>
                                </Wrapper>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </Section>
    );
}