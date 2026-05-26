import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icons } from "./iconWareHouse";
import type { Warehouse } from "../../types/warehouse";

interface CreateWareHouseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, address: string, imageFile?: File | null) => void | Promise<void>;
  onUpdate?: (id: string | number, name: string, address: string, imageFile?: File | null) => void | Promise<void>;
  warehouse?: Warehouse | null;
}

export const CreateWareHouseModal: React.FC<CreateWareHouseModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  onUpdate,
  warehouse,
}) => {
  const [name, setName] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const isEditing = Boolean(warehouse);

  React.useEffect(() => {
    if (!isOpen) return;

    setName(warehouse?.name ?? "");
    setLocation(warehouse?.location ?? warehouse?.address ?? "");
    setImageFile(null);
    setPreviewUrl(warehouse?.imageUrl ?? "");
  }, [isOpen, warehouse]);

  React.useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(warehouse?.imageUrl ?? "");
      return;
    }

    const url = URL.createObjectURL(imageFile); //Browser tạo URL tạm cho file local.
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile, warehouse]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    if (name && location) {
      setSubmitting(true);
      try {
        if (warehouse && onUpdate) {
          await onUpdate(warehouse.warehouseId, name, location, imageFile);
        } else {
          await onCreate(name, location, imageFile);
        }
      } finally {
        setSubmitting(false);
      }
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
              <h2 className="text-4xl font-headline font-extrabold text-inverse-surface mb-2">
                {isEditing ? "Edit Warehouse" : "New Warehouse"}
              </h2>
              <p className="text-on-surface-variant mb-8">
                {isEditing ? "Update warehouse information and photo." : "Initialize a new logistics node within the Stokify network."}
              </p>

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
                  
                  <div>
                    <label className="block text-sm font-bold text-inverse-surface mb-2">Location</label>
                    <div className="relative">
                      <Icons.MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Chicago, United States"
                        className="w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border-none rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none placeholder:text-slate-600 font-headline transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-inverse-surface mb-2">Warehouse Photo</label>
                    <label className="border-2 border-dashed border-[#e5e7eb] rounded-xl p-4 min-h-48 flex flex-col items-center justify-center bg-[#F8FAFC] hover:bg-white hover:border-[#1E3A8A] transition-colors cursor-pointer group overflow-hidden">
                      {previewUrl ? (
                        <img src={previewUrl} alt="Warehouse preview" className="w-full h-44 object-cover rounded-lg" />
                      ) : (
                        <>
                          <Icons.Plus className="w-8 h-8 text-primary mb-2" />
                          <p className="text-sm font-bold text-inverse-surface">Click to upload photo</p>
                          <p className="text-xs text-on-surface-variant mt-1">PNG, JPG, WEBP</p>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
                        className="hidden"
                        onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                      />
                    </label>
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
                    disabled={submitting}
                    className="px-8 py-2.5 bg-[#1E3A8A] text-white text-sm font-bold rounded-lg hover:bg-[#2563EB] transition-all shadow-md active:scale-95 font-headline"
                  >
                    {submitting ? "Saving..." : isEditing ? "Save Changes" : "Create Warehouse"}
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
