import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ImageSliderProps {
  images: string[];
  themeColor: string;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ images, themeColor }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] border-12 border-[#1c2026] bg-[#0a0e14]">
      {/* Screen Content */}
      <div className="relative w-full h-full bg-[#0a0e14] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Warehouse Preview ${currentIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
        
        {/* Status Indicators */}
        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
          <div className="bg-[#1c2026]/90 backdrop-blur-md p-3 rounded-xl border border-white/10 max-w-45">
            <p className="text-[8px] uppercase tracking-widest text-primary font-bold mb-1" style={{ color: themeColor }}>Live Feed</p>
            <p className="text-[10px] text-slate-400 leading-tight">Gate 4: Dispatch in progress for SKU-8829</p>
          </div>
          <div className="flex gap-1.5">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                  index === currentIndex ? 'bg-emerald-500 scale-125' : 'bg-white/20'
                }`}
                style={{ 
                  backgroundColor: index === currentIndex ? '#10b981' : 'rgba(255,255,255,0.2)',
                  boxShadow: index === currentIndex ? '0 0 8px rgba(16,185,129,0.6)' : 'none'
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Monitor Stand Shadow Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-white/5 blur-sm"></div>
    </div>
  );
};