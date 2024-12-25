import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRightCircle } from "lucide-react";

export const HoverEffect = ({ items, className, onClick }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-5", className)}>
        {items.map((item, idx) => (
          <button
            key={item.id}
            className="relative group block p-3 h-full w-full focus:outline-none"
            onClick={() => onClick(item)}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.div
                  className={cn(
                    "absolute inset-0 h-full w-full rounded-3xl",
                    item.hoverColor || "bg-neutral-200"
                  )}
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>

            <div
              className={cn(
                "relative z-20 rounded-2xl h-full w-full p-6 flex flex-col justify-between",
                item.backgroundColor || "bg-black"
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-bold text-lg tracking-wide">
                    {item.title}
                  </h4>
                  <p className="text-violet-50 mt-2">{item.description}</p>
                </div>
                <item.icon className="text-white w-10 h-10" />
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-white text-3xl font-bold">{item.count}</span>
                <ArrowRightCircle className="text-white w-6 h-6" />
              </div>
            </div>
          </button>
        ))}
      </div>
    );
  };
