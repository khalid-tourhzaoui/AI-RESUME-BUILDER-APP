"use client";

import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className,
    documentId
}) => {
    const containerRef = React.useRef(null);
    const scrollerRef = React.useRef(null);

    useEffect(() => {
        addAnimation();
    }, []);

    const [start, setStart] = useState(false);

    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            getDirection();
            getSpeed();
            setStart(true);
        }
    }

    const getDirection = () => {
        if (containerRef.current) {
            if (direction === "left") {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "forwards"
                );
            } else {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "reverse"
                );
            }
        }
    };

    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty(
                    "--animation-duration",
                    "20s"
                );
            } else if (speed === "normal") {
                containerRef.current.style.setProperty(
                    "--animation-duration",
                    "20s"
                );
            } else {
                containerRef.current.style.setProperty(
                    "--animation-duration",
                    "20s"
                );
            }
        }
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
                className
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
                    start && "animate-scroll",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
            >
                {items.map((item, idx) => (
                    <Link  href={route('documents.UpdateThemeColor', {
                        id: documentId,
                        themeColor: item.hex
                    })} >
                        <li
                            key={item.color}
                            className="flex flex-col items-center justify-center w-28 h-10 max-w-full relative rounded-lg
                            shadow-lg border-4 flex-shrink-0"
                            style={{
                                background: `linear-gradient(to bottom right, ${item.color}, white)`,
                                borderColor: item.color,
                            }}
                        >
                            <span className="text-xl">{item.color}  {item.icon}</span>
                            {/* <span className="text-white font-bold mt-2">
                                {item.color}
                            </span> */}
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};
