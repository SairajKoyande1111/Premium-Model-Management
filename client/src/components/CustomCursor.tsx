import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener("mousemove", mMove);
      document.addEventListener("mousedown", mDown);
      document.addEventListener("mouseup", mUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", mMove);
      document.removeEventListener("mousedown", mDown);
      document.removeEventListener("mouseup", mUp);
    };

    const mMove = (el: any) => {
      setPosition({ x: el.clientX, y: el.clientY });
      
      // Check if hovering over clickable element
      const target = el.target as HTMLElement;
      const isClickable = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer');
      
      setLinkHovered(!!isClickable);
    };

    const mDown = () => setClicked(true);
    const mUp = () => setClicked(false);

    addEventListeners();
    return () => removeEventListeners();
  }, []);

  return (
    <>
      <motion.div
        className="cursor-dot hidden md:block pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-primary mix-blend-difference"
        style={{
          x: position.x,
          y: position.y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: clicked ? 0.5 : linkHovered ? 1.5 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className="cursor-outline hidden md:block pointer-events-none fixed top-0 left-0 z-[9998] rounded-full border border-primary/40"
        style={{
          x: position.x,
          y: position.y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: linkHovered ? 60 : 40,
          height: linkHovered ? 60 : 40,
          scale: clicked ? 0.8 : 1,
          opacity: 1,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
    </>
  );
}
