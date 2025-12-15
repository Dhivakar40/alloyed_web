"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    designation: string;
    image: string;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <>
      {items.map((item) => {
        if (!item.image || item.image.trim() === "") return null;

        return (
          <div
            // CHANGE: Added 'mb-4' for vertical spacing when they wrap
            // Kept '-mr-4' for the horizontal overlap effect
            className="relative group -mr-4 mb-6" 
            key={item.id}
            onMouseEnter={() => setHoveredIndex(item.id)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence mode="popLayout">
              {hoveredIndex === item.id && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.6 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { type: "spring", stiffness: 260, damping: 10 },
                  }}
                  exit={{ opacity: 0, y: 20, scale: 0.6 }}
                  style={{
                    translateX: translateX,
                    rotate: rotate,
                    whiteSpace: "nowrap",
                  }}
                  className="absolute -top-24 left-1/2 -translate-x-1/2 flex text-xs flex-col items-center justify-center rounded-md bg-black/80 backdrop-blur-md z-50 shadow-xl px-4 py-2 border border-white/10"
                >
                  <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px " />
                  <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
                  <div className="font-bold text-white relative z-30 text-base">
                    {item.name}
                  </div>
                  <div className="text-white/60 text-xs">{item.designation}</div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <Image
              onMouseMove={handleMouseMove}
              height={150}
              width={150}
              src={item.image.trim()}
              alt={item.name}
              // Increased size to h-32 w-32 (128px)
              className="object-cover !m-0 !p-0 object-top rounded-full h-32 w-32 border-2 group-hover:scale-105 group-hover:z-30 border-white/10 bg-slate-800 relative transition duration-500"
            />
          </div>
        );
      })}
    </>
  );
};