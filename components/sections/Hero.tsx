"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import LiquidEther from "../LiquidEther"; 

// --- CONFIGURATION ---
const SLIDE_DURATION = 3000;

const SLIDES = [
    { id: 1, src: "/slides/Image1.jpeg", alt: "Image 1" },
    { id: 2, src: "/slides/Image2.jpeg", alt: "Image 2" },
    { id: 3, src: "/slides/Image3.jpeg", alt: "Image 3" },
    { id: 4, src: "/slides/Image4.jpeg", alt: "Image 4" },
];

const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
    })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

export function Hero() {
    const [[page, direction], setPage] = useState([0, 0]);
    const imageIndex = Math.abs(page % SLIDES.length);

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    // --- NEW: SCROLL HANDLER ---
    const handleExploreClick = () => {
        // Look for the element with id="services"
        const servicesSection = document.getElementById("services");
        
        if (servicesSection) {
            // "smooth" behavior creates the buttery slide effect
            servicesSection.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
            console.warn("Services section ID not found!");
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            paginate(1);
        }, SLIDE_DURATION);
        return () => clearInterval(timer);
    }, [page]);

    return (
        <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 pt-24 pb-12 lg:px-12">
            
            <div className="absolute inset-0 z-0">
                <LiquidEther
                    colors={['#5227FF', '#FF9FFC', '#B19EEF']}
                    mouseForce={30}
                    isViscous={true}
                />
            </div>

            <div className="container mx-auto grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center relative z-10">
                
                {/* --- LEFT COLUMN --- */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="flex flex-col items-start text-left"
                >
                    <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-[1.1]">
                        Scalable Digital Products <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            Tailored to Your Vision
                        </span>
                    </h1>

                    <p className="mb-10 max-w-2xl text-lg text-slate-300 leading-relaxed sm:text-xl drop-shadow-md">
                        At ALLOYED, we design, develop, test, and deliver exceptional digital solutions — from mobile apps and web platforms to enterprise software across all domains. With end-to-end quality assurance, innovation, and precision at our core, we empower businesses to evolve in a connected world, forging technology that’s strong, scalable, and perfectly aligned with your vision.
                    </p>

                    {/* --- BUTTON WITH CLICK HANDLER --- */}
                    <motion.button
                        onClick={handleExploreClick} // <--- Added logic here
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-blue-600 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] cursor-pointer"
                    >
                        <span className="relative z-10">EXPLORE</span>
                        <ArrowRight className="relative z-10 transition-transform group-hover:translate-x-1" />
                        <div className="absolute inset-0 -z-10 translate-y-[100%] bg-white opacity-20 transition-transform duration-300 group-hover:translate-y-0" />
                    </motion.button>
                </motion.div>

                {/* --- RIGHT COLUMN --- */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                    className="relative flex justify-center lg:justify-end w-full"
                >
                    <div className="relative w-full max-w-2xl aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm">
                        
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.img
                                key={page}
                                src={SLIDES[imageIndex].src}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={1}
                                onDragEnd={(e, { offset, velocity }) => {
                                    const swipe = swipePower(offset.x, velocity.x);
                                    if (swipe < -swipeConfidenceThreshold) {
                                        paginate(1);
                                    } else if (swipe > swipeConfidenceThreshold) {
                                        paginate(-1);
                                    }
                                }}
                                className="absolute inset-0 w-full h-full object-cover cursor-grab active:cursor-grabbing"
                                alt={SLIDES[imageIndex].alt}
                            />
                        </AnimatePresence>

                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                            {SLIDES.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        const direction = idx > imageIndex ? 1 : -1;
                                        setPage([page + (idx - imageIndex), direction]);
                                    }}
                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 shadow-sm ${
                                        idx === imageIndex 
                                            ? "bg-white w-8" 
                                            : "bg-white/40 hover:bg-white/70"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}