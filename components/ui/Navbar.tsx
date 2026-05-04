"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ConsultationModal } from "../ui/ConsultationModal";

const NAV_LINKS = ["Services", "About", "Work", "Contact"];

export function Navbar() {
    const pathname = usePathname();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (pathname === "/") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
        setIsMobileMenuOpen(false);
    };

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id.toLowerCase());
        section?.scrollIntoView({ behavior: "smooth" });
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            {/* Consultation Modal */}
            <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* ─── DESKTOP / SHARED HEADER ─── */}
            <motion.header
                className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-2 border-b border-white/10 bg-[#0B0F17]/50 backdrop-blur-md"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                {/* LEFT: Logo */}
                <div className="flex items-center gap-2 z-10">
                    <Link href="/" onClick={handleLogoClick}>
                        <motion.div
                            layoutId="logo-container"
                            className="flex items-center cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <img
                                src="/Alloyed_logo.png"
                                alt="ALLOYED Logo"
                                width={180}
                                height={65}
                                className="object-contain h-14 sm:h-16 w-auto"
                            />
                        </motion.div>
                    </Link>
                </div>

                {/* CENTER: Desktop Nav Links */}
                <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8 text-base font-medium text-slate-300">
                    {NAV_LINKS.map((item) => (
                        <motion.a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="cursor-pointer hover:text-white transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection(item.toLowerCase());
                            }}
                        >
                            {item}
                        </motion.a>
                    ))}
                </nav>

                {/* RIGHT: Desktop CTA */}
                <div className="hidden md:flex items-center gap-4 z-10">
                    <motion.button
                        onClick={() => setIsModalOpen(true)}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="
                            cursor-pointer
                            bg-white text-black
                            px-5 py-2.5
                            rounded-full
                            font-bold text-xs tracking-wider
                            transition-all duration-300
                            border border-transparent
                            hover:bg-gradient-to-r hover:from-[#5227FF] hover:to-[#FF9FFC]
                            hover:text-white
                            hover:border-[#FF9FFC]
                            shadow-[0_0_10px_rgba(255,255,255,0.2)]
                            hover:shadow-[0_0_20px_rgba(82,39,255,0.6)]
                        "
                    >
                        BOOK A FREE CONSULTATION
                    </motion.button>
                </div>

                {/* RIGHT: Mobile Hamburger */}
                <motion.button
                    className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-white z-10"
                    onClick={() => setIsMobileMenuOpen(true)}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Open menu"
                >
                    <Menu size={24} />
                </motion.button>
            </motion.header>

            {/* ─── MOBILE SLIDE-OUT MENU ─── */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Slide-in Panel */}
                        <motion.div
                            key="mobile-menu"
                            className="fixed top-0 right-0 h-full w-4/5 max-w-sm z-[70] bg-zinc-950/95 backdrop-blur-md border-l border-white/10 flex flex-col md:hidden"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            {/* Close button */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                                <img
                                    src="/Alloyed_logo.png"
                                    alt="ALLOYED Logo"
                                    className="h-10 w-auto object-contain"
                                />
                                <motion.button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    whileTap={{ scale: 0.9 }}
                                    className="flex items-center justify-center w-10 h-10 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                                    aria-label="Close menu"
                                >
                                    <X size={22} />
                                </motion.button>
                            </div>

                            {/* Nav Links */}
                            <nav className="flex flex-col items-center justify-center flex-1 gap-2 px-6">
                                {NAV_LINKS.map((item, i) => (
                                    <motion.a
                                        key={item}
                                        href={`#${item.toLowerCase()}`}
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.07, duration: 0.3 }}
                                        className="w-full text-center text-2xl font-semibold text-slate-300 hover:text-white py-4 border-b border-white/5 transition-colors"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToSection(item.toLowerCase());
                                        }}
                                    >
                                        {item}
                                    </motion.a>
                                ))}
                            </nav>

                            {/* Mobile CTA */}
                            <div className="px-6 pb-10">
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.35 }}
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setIsModalOpen(true);
                                    }}
                                    className="
                                        w-full cursor-pointer
                                        bg-white text-black
                                        px-5 py-3.5
                                        rounded-full
                                        font-bold text-sm tracking-wider
                                        transition-all duration-300
                                        border border-transparent
                                        hover:bg-gradient-to-r hover:from-[#5227FF] hover:to-[#FF9FFC]
                                        hover:text-white hover:border-[#FF9FFC]
                                        shadow-[0_0_20px_rgba(255,255,255,0.15)]
                                    "
                                >
                                    BOOK A FREE CONSULTATION
                                </motion.button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}