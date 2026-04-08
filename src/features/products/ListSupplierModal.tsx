import { useState, useMemo } from "react";
import { X, Mail, Phone, MapPin, Plus, Trash2, Save, Edit3 } from "lucide-react";
import { useProductSuppliers } from "../hooks/useProductSupplier";
import { MOCK_SUPPLIERS } from "../../data/MOCK_SUPPLIERS";
import { MOCK_PRODUCT_SUPPLIERS } from "../../data/MOCK_PRODUCT_SUPPLIERS";
import type { ProductSupplier } from "../../types/product";
import { toast } from "sonner";

const getSupplierTypeColor = {
  SECONDARY: "bg-green-100 text-green-700",
  PRIMARY: "bg-orange-100 text-orange-700",
};

interface ProductSupplierDetail extends ProductSupplier {
  email?: string;
  phone?: string;
  address?: string;
}

export default function SuppliersModal({ isOpen, onClose, product }: any) {
  const [editMode, setEditMode] = useState(false);

  // 1. Sử dụng Hook quản lý dữ liệu
  const {
    productSuppliers,
    addSupplierToProduct,
    toggleSupplierType,
    updateProductSupplier,
    removeSupplierFromProduct,
  } = useProductSuppliers(MOCK_PRODUCT_SUPPLIERS);

  // 2. Gom thông tin chi tiết từ danh bạ Supplier
  const displaySuppliers = useMemo<ProductSupplierDetail[]>(() => {
    if (!product) return [];

    const related = productSuppliers.filter(
      (ps: ProductSupplier) => ps.product === product.name
    );

    return related.map((rel) => {
      const detail = MOCK_SUPPLIERS.find((s) => s.name === rel.supplier);
      return {
        ...rel,
        email: detail?.email || "No email",
        phone: detail?.phone || "No phone",
        address: detail?.address || "No address",
      };
    });
  }, [productSuppliers, product]);

  // 3. Xử lý thêm mới Supplier
  const handleAddNew = () => {
    const newEntry: ProductSupplier = {
      supplier: `New Supplier ${displaySuppliers.length + 1}`,
      product: product.name,
      type: "SECONDARY",
      price: 0,
    };
    addSupplierToProduct(newEntry);
  };

  // 4. Xử lý lưu thay đổi
  const handleSave = () => {
    setEditMode(false);
    toast.success("Changes saved successfully!");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-white">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Suppliers</h2>
              <p className="text-sm text-gray-500">Managing for {product?.name}</p>
            </div>
            
            <button
              onClick={editMode ? handleSave : () => setEditMode(true)}
              className={`flex items-center gap-2 text-sm ml-4 px-4 py-2 rounded-lg transition-all font-semibold ${
                editMode
                  ? "bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-100"
                  : "bg-blue-50 text-blue-600 hover:bg-blue-100"
              }`}
            >
              {editMode ? (
                <><Save size={16} /> Save Changes</>
              ) : (
                <><Edit3 size={16} /> Edit Mode</>
              )}
            </button>
          </div>
          
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        {/* Content List */}
        <div className="p-6 overflow-y-auto space-y-4 bg-gray-50/50 flex-1">
          {displaySuppliers.length > 0 ? (
            displaySuppliers.map((s) => (
              <div
                key={s.supplier}
                className={`flex bg-white items-center justify-between p-5 rounded-xl border transition-all ${
                  editMode ? "border-blue-200 ring-2 ring-blue-50" : "border-gray-100 hover:shadow-md"
                }`}
              >
                <div className="flex gap-4 flex-1">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-sm">
                    {s.supplier?.charAt(0)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      {editMode ? (
                        <input
                          type="text"
                          value={s.supplier}
                          onChange={(e) => updateProductSupplier(s.supplier, product.name, { supplier: e.target.value })}
                          className="font-bold text-gray-800 border-b-2 border-blue-400 outline-none bg-transparent"
                        />
                      ) : (
                        <h3 className="font-bold text-gray-800">{s.supplier}</h3>
                      )}
                      
                      <button
                        disabled={!editMode}
                        onClick={() => toggleSupplierType(s.supplier, product.name)}
                        className={`text-[10px] px-2 py-0.5 rounded-md font-bold transition-all ${
                          getSupplierTypeColor[s.type]
                        } ${editMode ? "cursor-pointer hover:scale-105" : "cursor-default"}`}
                      >
                        {s.type} {editMode && "🔄"}
                      </button>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1.5"><Mail size={12} /> {s.email}</span>
                      <span className="flex items-center gap-1.5"><Phone size={12} /> {s.phone}</span>
                      {!editMode && <span className="flex items-center gap-1.5"><MapPin size={12} /> {s.address}</span>}
                    </div>
                  </div>
                </div>

                {/* Price & Trash */}
                <div className="flex flex-col items-end gap-2 ml-4">
                  {editMode ? (
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Price</span>
                        <input
                          type="number"
                          className="text-right font-bold text-blue-600 bg-blue-50 rounded px-2 py-1 w-24 outline-none focus:ring-1 focus:ring-blue-400"
                          value={s.price}
                          onChange={(e) => updateProductSupplier(s.supplier, product.name, { price: Number(e.target.value) })}
                        />
                      </div>
                      <button 
                        onClick={() => removeSupplierFromProduct(s.supplier, product.name)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ) : (
                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 font-bold block uppercase">Supply Price</span>
                      <span className="text-lg font-black text-gray-800">${s.price.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-400 bg-white rounded-xl border-2 border-dashed">
              No suppliers linked to this product.
            </div>
          )}

          {/* Add More Button */}
          {editMode && (
            <button 
              onClick={handleAddNew}
              className="w-full py-4 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all group"
            >
              <div className="p-2 bg-gray-100 rounded-full mb-2 group-hover:bg-blue-100 transition-colors">
                <Plus size={20} />
              </div>
              <span className="text-sm font-bold">Add New Supplier Link</span>
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 text-sm font-bold text-gray-600 hover:text-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}