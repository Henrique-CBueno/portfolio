import { useState } from "react";
import { motion } from "framer-motion";

type CursorType = "ribbon" | "liquid" | "pixel" | "none";

const CURSORS: Record<CursorType, { label: string }> = {
  ribbon: { label: "Ribbon" },
  liquid: { label: "Liquid" },
  pixel: { label: "Pixel" },
  none: { label: "None" },
};

const CURSOR_ORDER: CursorType[] = ["none", "ribbon", "liquid", "pixel"];

export default function Selector({cursor, setCursor}: {cursor: any, setCursor: any}) {
  const [currentIndex, setCurrentIndex] = useState(cursor);
  const current = CURSOR_ORDER[currentIndex];

  const handleClick = () => {
    if(cursor == 3) {
        setCurrentIndex(0)
        setCursor(0)
        return 
    }
    const newCursor = cursor +=1
    setCurrentIndex(newCursor)
    setCursor(newCursor)
  };

  return (
    <div className="relative flex items-center justify-center">
      <motion.button
        onClick={handleClick}
        whileHover={{ opacity: 0.8 }}
        whileTap={{ scale: 0.98 }}
        className="cursor-pointer relative px-4 py-2 rounded-full backdrop-blur-sm bg-white/5 border border-white/10 text-white/70 text-sm font-light tracking-wide"
      >
        <motion.span
          key={current}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {CURSORS[current].label}
        </motion.span>
      </motion.button>


    </div>
  );
}