import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, Shield, Save, CheckCircle2, Plus } from 'lucide-react';
import { Modal } from './ProfileModal';

interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast = ({ message, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed top-6 right-6 z-50"
    >
      <div className="bg-[#ecfdf5] border border-[#10b981]/20 rounded-xl px-6 py-4 shadow-lg flex items-center gap-3 min-w-[320px]">
        <div className="bg-[#10b981] rounded-full p-1">
          <CheckCircle2 className="w-5 h-5 text-white" />
        </div>
        <p className="text-[#065f46] font-medium text-lg">
          {message}
        </p>
      </div>
    </motion.div>
  );
};

export function ProfileFeature() {
  const [showToast, setShowToast] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'Sarah Keeper',
    email: 'warehouse@example.com',
    role: 'Warehouse Keeper'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
  };

  const ProfileForm = () => (
    <div className="p-8">
      <div className="flex items-center gap-6 mb-10">
        <button 
          onClick={() => setIsAvatarModalOpen(true)}
          className="w-20 h-20 bg-[#4f46e5] rounded-full flex items-center justify-center text-white text-3xl font-semibold shadow-inner hover:opacity-90 transition-opacity cursor-pointer group relative"
        >
          S
          <div className="absolute inset-0 bg-black/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Plus className="w-6 h-6 text-white/80" />
          </div>
        </button>
        <div>
          <h2 className="text-2xl font-bold text-[#1e293b]">{formData.fullName}</h2>
          <p className="text-[#64748b] text-lg">{formData.role}</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[#475569] font-medium text-sm ml-1">
            <User className="w-4 h-4" />
            Full Name
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/20 focus:border-[#4f46e5] transition-all text-[#1e293b] text-lg"
            placeholder="Enter your full name"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[#475569] font-medium text-sm ml-1">
            <Mail className="w-4 h-4" />
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/20 focus:border-[#4f46e5] transition-all text-[#1e293b] text-lg"
            placeholder="Enter your email"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[#475569] font-medium text-sm ml-1">
            <Shield className="w-4 h-4" />
            Role
          </label>
          <input
            type="text"
            value={formData.role}
            readOnly
            className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] text-[#94a3b8] text-lg cursor-not-allowed"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-[#4f46e5]/20 active:scale-[0.98]"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <>
      <AnimatePresence>
        {showToast && (
          <Toast 
            message="Profile updated successfully!" 
            onClose={() => setShowToast(false)} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAvatarModalOpen && (
          <Modal 
            isOpen={isAvatarModalOpen} 
            onClose={() => setIsAvatarModalOpen(false)}
            title="Add Your Picture"
            maxWidth="max-w-md"
          >
            <div className="space-y-6">
              {/* Image Upload Area */}
              <div className="w-40 h-40 bg-[#f1f5f9] rounded-xl flex items-center justify-center cursor-pointer hover:bg-[#e2e8f0] transition-colors group mx-auto">
                <Plus className="w-12 h-12 text-[#94a3b8] group-hover:text-[#64748b]" />
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-center gap-3 pt-6 border-t border-[#f1f5f9]">
                <button
                  onClick={() => setIsAvatarModalOpen(false)}
                  className="flex-1 py-3 rounded-xl font-bold text-[#1e293b] border border-[#e2e8f0] hover:bg-[#f8fafc] transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsAvatarModalOpen(false)}
                  className="flex-1 py-3 rounded-xl font-bold text-white bg-[#4f46e5] hover:bg-[#4338ca] transition-all shadow-lg shadow-[#4f46e5]/20"
                >
                  Add
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1e293b]">Profile Settings</h1>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-[#e2e8f0] overflow-hidden"
      >
        <ProfileForm />
      </motion.div>
    </>
  );
}