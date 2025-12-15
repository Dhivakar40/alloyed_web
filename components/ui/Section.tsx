"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface SectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export function Section({ children, className = "", id }: SectionProps) {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]) as MotionValue<number>;
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]) as MotionValue<number>;
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]) as MotionValue<string>;

    return (
        <section ref={containerRef} id={id} className={`relative min-h-screen w-full [perspective:1000px] ${className}`}>
            <motion.div
                style={{ scale, opacity, y }}
                className="w-full h-full"
            >
                {children}
            </motion.div>
        </section>
    );
}
