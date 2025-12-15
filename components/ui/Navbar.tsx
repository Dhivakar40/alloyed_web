"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react"; // 1. Import useState
import { ConsultationModal } from "../ui/ConsultationModal"; // 2. Import the Modal

export function Navbar() {
    const pathname = usePathname();
    const [isModalOpen, setIsModalOpen] = useState(false); // 3. State for visibility

    const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (pathname === "/") {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    return (
        <>
            {/* 4. RENDER THE MODAL (It sits outside the header z-index stack) */}
            <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <motion.header
                className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-2 border-b border-white/10 bg-[#0B0F17]/50 backdrop-blur-md"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                {/* --- LEFT: LOGO --- */}
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
                                className="object-contain h-16 w-auto"
                            />
                        </motion.div>
                    </Link>
                </div>

                {/* --- CENTER: NAVIGATION LINKS --- */}
                <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8 text-base font-medium text-slate-300">
                    {["Services", "About", "Work", "Contact"].map((item) => (
                        <motion.a 
                            key={item} 
                            href={`#${item.toLowerCase()}`} 
                            className="cursor-pointer hover:text-white transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                                e.preventDefault();
                                const section = document.getElementById(item.toLowerCase());
                                section?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            {item}
                        </motion.a>
                    ))}
                </nav>

                {/* --- RIGHT: CTA BUTTON --- */}
                <div className="hidden md:flex items-center gap-4 z-10">
                    <motion.button
                        // 5. CLICK HANDLER: Opens the modal
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

                {/* MOBILE MENU BUTTON */}
                <button className="md:hidden text-white text-base font-medium z-10">
                    Menu
                </button>
            </motion.header>
        </>
    );
}