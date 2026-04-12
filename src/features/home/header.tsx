import React from 'react';
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  themeColor?: string;
}

export const Header: React.FC<HeaderProps> = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-center bg-[#0a0e14]/85 backdrop-blur-3xl border-b border-white/10 px-6 py-4 md:px-10 md:py-5 shadow-2xl transition-all duration-500 hover:bg-[#0a0e14]/95 w-full">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-10">
            <button className="flex items-center justify-center text-slate-400 hover:text-slate-100 transition-colors shrink-0 cursor-pointer">
              <Menu className="w-7 h-7 md:w-8 md:h-8" />
            </button>
            <span className="text-4xl sm:text-4xl md:text-4xl font-black tracking-tighter bg-clip-text text-transparent bg-linear-to-r from-[#afc6ff] to-[#1f6feb] whitespace-nowrap">
              Stockify
            </span>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6 md:gap-10">
            <button className="text-slate-400 font-bold hover:text-slate-100 transition-colors text-sm sm:text-base md:text-lg cursor-pointer"
              onClick={() => navigate('/signin', {replace: false})}
              >
              Sign In
            </button>
            
            <button 
              className="bg-linear-to-r from-[#afc6ff] to-[#1f6feb] text-[#002d6d] px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 md:py-3.5 rounded-full font-black text-sm sm:text-base md:text-lg hover:opacity-90 transition-all shadow-xl shadow-[#1f6feb]/20 whitespace-nowrap shrink-0 cursor-pointer"
              onClick={() => navigate('/signin', {replace: false})}
            >
              Sign up
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};