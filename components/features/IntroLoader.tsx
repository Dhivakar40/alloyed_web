"use client";

import { motion, useAnimation, Variants, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// --- PATH DEFINITIONS ---
const LEFT_BRACE_D = 
    "M 90 10 C 50 10 40 60 40 85 C 40 95 10 100 0 100 C 10 100 40 105 40 115 C 40 140 50 190 90 190";
const LEFT_CIRCLE_D = "M 100 10 C 0 10 0 190 100 190";

const RIGHT_BRACE_D = 
    "M 10 10 C 50 10 60 60 60 85 C 60 95 90 100 100 100 C 90 100 60 105 60 115 C 60 140 50 190 10 190";
const RIGHT_CIRCLE_D = "M 0 10 C 100 10 100 190 0 190";

export function IntroLoader({ onComplete }: { onComplete: () => void }) {
    const controls = useAnimation();
    const [step, setStep] = useState<"drop" | "split" | "crush" | "morph" | "fuse" | "exit">("drop");

    useEffect(() => {
        const sequence = async () => {
            // 1. Drop
            await controls.start("drop");
            await controls.start("shake");

            // 2. Split
            setStep("split");
            await controls.start("split");

            await new Promise(r => setTimeout(r, 1500));

            // 3. Crush
            setStep("crush");
            await controls.start("crush");

            // 4. Morph
            setStep("morph");
            await controls.start("morph");

            // 5. Fusion
            setStep("fuse");
            await controls.start("fuse");

            await new Promise(r => setTimeout(r, 800));

            // 6. Exit
            setStep("exit");
            await controls.start("exit");

            onComplete();
        };
        sequence();
    }, [controls, onComplete]);

    // Container Shake
    const containerShake: Variants = {
        shake: {
            x: [0, -10, 10, -5, 5, 0],
            y: [0, 5, -5, 2, -2, 0],
            transition: { duration: 0.3, ease: "linear" }
        },
        exit: { opacity: 0, transition: { duration: 0.5 } }
    };

    // Left Brace Wrapper
    const leftWrapperVariants: Variants = {
        drop: { y: 0, x: -20, scale: 1, transition: { type: "spring", stiffness: 120, damping: 12 } },
        split: { x: -220, scale: 1, transition: { duration: 0.6, ease: "backOut" } },
        crush: { x: -2, scale: 1, transition: { duration: 0.4, ease: "circIn" } },
        morph: { x: 0, scale: 1, transition: { duration: 0.6, ease: "easeInOut" } },
        // CHANGED: Reduced y from 12 to 4. This is the sweet spot.
        fuse: { x: 15, y: 4, scale: 0.34, transition: { duration: 0.4, ease: "backOut" } } 
    };

    // Right Brace Wrapper
    const rightWrapperVariants: Variants = {
        drop: { y: 0, x: 20, scale: 1, transition: { type: "spring", stiffness: 120, damping: 12 } },
        split: { x: 220, scale: 1, transition: { duration: 0.6, ease: "backOut" } },
        crush: { x: 2, scale: 1, transition: { duration: 0.4, ease: "circIn" } },
        morph: { x: 0, scale: 1, transition: { duration: 0.6, ease: "easeInOut" } },
        // CHANGED: Reduced y from 12 to 4.
        fuse: { x: -15, y: 4, scale: 0.34, transition: { duration: 0.4, ease: "backOut" } } 
    };

    // SVG Path Morphing
    const leftPathVariants: Variants = {
        drop: { d: LEFT_BRACE_D, strokeWidth: 16 },
        split: { d: LEFT_BRACE_D, strokeWidth: 16 },
        crush: { d: LEFT_BRACE_D, strokeWidth: 16 },
        morph: { d: LEFT_CIRCLE_D, strokeWidth: 16, transition: { duration: 0.6, ease: "easeInOut" } },
        fuse: { 
            d: LEFT_CIRCLE_D, 
            strokeWidth: 28, 
            transition: { duration: 0.4, ease: "backOut" } 
        }
    };

    const rightPathVariants: Variants = {
        drop: { d: RIGHT_BRACE_D, strokeWidth: 16 },
        split: { d: RIGHT_BRACE_D, strokeWidth: 16 },
        crush: { d: RIGHT_BRACE_D, strokeWidth: 16 },
        morph: { d: RIGHT_CIRCLE_D, strokeWidth: 16, transition: { duration: 0.6, ease: "easeInOut" } },
        fuse: { 
            d: RIGHT_CIRCLE_D, 
            strokeWidth: 28, 
            transition: { duration: 0.4, ease: "backOut" } 
        }
    };

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B0F17] overflow-hidden"
            variants={containerShake}
            animate={controls}
            exit={{ opacity: 0 }}
        >
            {/* LAYER 1: THE TEXT */}
            <AnimatePresence>
                {step === "split" && (
                    <motion.div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 text-center"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0, 1, 0.2, 1, 0, 1],
                            scale: [0.9, 1.1, 1, 1.05],
                            filter: ["blur(10px)", "blur(0px)"]
                        }}
                        exit={{ scaleX: 0, opacity: 0, filter: "blur(20px)" }}
                        transition={{ duration: 0.8, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }}
                    >
                        <h1 className="text-5xl font-bold text-white whitespace-nowrap tracking-widest">
                            MIXED MINDS
                        </h1>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* LAYER 2: BRANDING TEXT LEFT */}
            <motion.div
                // CHANGED: Removed 'pb-2' to restore true vertical centering
                className="absolute top-1/2 -translate-y-1/2 z-20 text-6xl md:text-8xl font-bold tracking-tighter text-white"
                initial={{ opacity: 0, x: 50 }}
                style={{ right: "50%", marginRight: "55px" }} 
                animate={step === "fuse" || step === "exit" ? { opacity: 1, x: 0 } : { opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                ALL
            </motion.div>

            {/* LAYER 3: LEFT BRACE WRAPPER */}
            <motion.div
                className="relative z-10 w-[100px] h-[200px]"
                initial={{ y: "-100vh" }}
                variants={leftWrapperVariants}
                animate={controls}
            >
                <svg width="100" height="200" viewBox="0 0 100 200" className="overflow-visible">
                    <motion.path
                        fill="none"
                        stroke="#3b82f6"
                        strokeLinecap="square"
                        variants={leftPathVariants}
                        initial="drop"
                        animate={controls}
                    />
                </svg>
            </motion.div>

            {/* LAYER 4: RIGHT BRACE WRAPPER */}
            <motion.div
                className="relative z-10 w-[100px] h-[200px]"
                initial={{ y: "-100vh" }}
                variants={rightWrapperVariants}
                animate={controls}
            >
                <svg width="100" height="200" viewBox="0 0 100 200" className="overflow-visible">
                    <motion.path
                        fill="none"
                        stroke="#3b82f6"
                        strokeLinecap="square"
                        variants={rightPathVariants}
                        initial="drop"
                        animate={controls}
                    />
                </svg>
            </motion.div>

            {/* LAYER 5: BRANDING TEXT RIGHT */}
            <motion.div
                // CHANGED: Removed 'pb-2' here as well
                className="absolute top-1/2 -translate-y-1/2 z-20 text-6xl md:text-8xl font-bold tracking-tighter text-white"
                initial={{ opacity: 0, x: -50 }}
                style={{ left: "50%", marginLeft: "55px" }} 
                animate={step === "fuse" || step === "exit" ? { opacity: 1, x: 0 } : { opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                YED
            </motion.div>

        </motion.div>
    );
}