import React from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-2xl' }: ModalProps) => {
  if (!isOpen) return null;
  const {user} = useAuth();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#1e293b]/40 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className={`relative w-full ${maxWidth} bg-white rounded-2xl shadow-2xl overflow-hidden`}
      >
        <div className={`relative w-full ${maxWidth} bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col`}></div>
        <div className="flex justify-between items-center p-6 border-b border-[#f1f5f9]">
          <h2 className="text-xl font-bold text-[#1e293b]">{title}</h2>
          <button 
            onClick={onClose}
            className="text-[#94a3b8] hover:text-[#64748b] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[80vh] custom-scrollbar">
          {children}
        </div>
      </motion.div>
    </div>
  );
};