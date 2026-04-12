import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, Shield, Save, Calendar, Phone, MapPin, Plus, CheckCircle2 } from 'lucide-react';
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

interface ProfileFeatureProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileFeature({ isOpen, onClose }: ProfileFeatureProps) {
  const [showToast, setShowToast] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'John Manager',
    dob: '1995-05-20', 
    phone: '+1 234 567 890', 
    address: '123 Warehouse St, NY', 
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
          className="w-20 h-20 bg-[#4f46e5] rounded-full flex items-center justify-center text-white text-4xl font-semibold shadow-inner hover:opacity-90 transition-opacity cursor-pointer group relative"
        >
          S
          <div className="absolute inset-0 bg-black/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Plus className="w-6 h-6 text-white/80" />
          </div>
        </button>
        <div>
          <h2 className="text-4xl font-bold text-[#1e293b]">{formData.fullName}</h2>
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
            <Calendar className="w-4 h-4" />
            Date of Birth
          </label>
          <input
            type="date"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/20 focus:border-[#4f46e5] transition-all text-[#1e293b] text-lg"
          />
        </div>

        <div className="space-y-2">
            <label className="flex items-center gap-2 text-[#475569] font-medium text-sm ml-1">
              <Phone className="w-4 h-4" />
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/20 focus:border-[#4f46e5] transition-all text-[#1e293b] text-lg"
              placeholder="Enter your phone number"
            />
        </div>

        <div className="space-y-2">
            <label className="flex items-center gap-2 text-[#475569] font-medium text-sm ml-1">
              <MapPin className="w-4 h-4" />
              Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/20 focus:border-[#4f46e5] transition-all text-[#1e293b] text-lg"
              placeholder="Enter your address"
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
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Profile Settings" 
      maxWidth="max-w-3xl"
    >
      <AnimatePresence>
        {showToast && (
          <Toast 
            message="Profile updated successfully!" 
            onClose={() => setShowToast(false)} 
          />
        )}
      </AnimatePresence>
      <div className="relative">
          <ProfileForm />
       </div>
      </Modal>
    </>
  );
}