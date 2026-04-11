import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icons } from "./iconWareHouse";

interface CreateWareHouseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, address: string) => void;
}

export const CreateWareHouseModal: React.FC<CreateWareHouseModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [name, setName] = React.useState("");
  const [city, setCity] = React.useState("");
  const [country, setCountry] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && city && country) {
      onCreate(name, `${city}, ${country}`);
      setName("");
      setCity("");
      setCountry("");
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-8">
              <h2 className="text-3xl font-headline font-extrabold text-inverse-surface mb-2">New Warehouse</h2>
              <p className="text-on-surface-variant mb-8">Initialize a new logistics node within the Stokify network.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-inverse-surface mb-2">Warehouse Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. North Hub Alpha"
                      className="w-full px-4 py-3 bg-[#F8FAFC] border-none rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none placeholder:text-slate-600 font-headline transition-all"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-inverse-surface mb-2">City</label>
                      <div className="relative">
                        <Icons.MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Chicago"
                          className="w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border-none rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none placeholder:text-slate-600 font-headline transition-all"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-inverse-surface mb-2">Country</label>
                      <div className="relative">
                        <Icons.MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                        <input
                          type="text"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          placeholder="United States"
                          className="w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border-none rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none placeholder:text-slate-600 font-headline transition-all"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-inverse-surface mb-2">Warehouse Photo</label>
                    <div className="border-2 border-dashed border-[#e5e7eb] rounded-xl p-8 flex flex-col items-center justify-center bg-[#F8FAFC] hover:bg-white hover:border-[#1E3A8A] transition-colors cursor-pointer group">
                      <Icons.Plus className="w-8 h-8 text-primary mb-2" />
                      <p className="text-sm font-bold text-inverse-surface">Click to upload photo</p>
                      <p className="text-xs text-on-surface-variant mt-1">SVG, PNG, JPG (MAX. 800x400px)</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-4 pt-6 border-t border-outline-variant/15">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2.5 text-sm font-bold text-on-surface-variant hover:text-inverse-surface transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-2.5 bg-[#1E3A8A] text-white text-sm font-bold rounded-lg hover:bg-[#2563EB] transition-all shadow-md active:scale-95 font-headline"
                  >
                    Create Warehouse
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};