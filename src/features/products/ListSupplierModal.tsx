import { useState, useMemo } from "react";
import { X, Mail, Phone, MapPin, Plus, Trash2 } from "lucide-react";
import { useProductSuppliers } from "../../hooks/useProductSupplier";
import { MOCK_SUPPLIERS } from "../../data/MOCK_SUPPLIERS";
import { MOCK_PRODUCT_SUPPLIERS } from "../../data/MOCK_PRODUCT_SUPPLIERS";
import type { ProductSupplier } from "../../types/product";
import { toast } from "sonner";

const getSupplierTypeColor = {
  SECONDARY: "bg-green-100 text-green-700",
  PRIMARY: "bg-orange-100 text-orange-700",
};

interface ProductSupplierDetail {
  supplier: string;
  product: string;
  type: "PRIMARY" | "SECONDARY";
  price: number;
  email: string;
  phone: string;
  address: string;
}

export default function SuppliersModal({ isOpen, onClose, product }: any) {
  const [editMode, setEditMode] = useState(false);

  // 1. Hook quản lý logic
  const {
    productSuppliers,
    addSupplierToProduct,
    toggleSupplierType,
    updateProductSupplier,
    removeSupplierFromProduct,
  } = useProductSuppliers(MOCK_PRODUCT_SUPPLIERS);

  // 2. Gom thông tin đầy đủ của các supplier (Không dùng isAdding bên trong này để tránh loop)
  const displaySuppliers = useMemo<ProductSupplierDetail[]>(() => {
    if (!product) return [];
    
    const relatedSupplier = productSuppliers.filter(
      (ps: ProductSupplier) => ps.product === product.name
    );

    return relatedSupplier.map((rel: any) => {
      const detail = MOCK_SUPPLIERS.find((s) => s.name === rel.supplier);
      return {
        supplier: rel.supplier,
        product: rel.product,
        type: rel.type,
        price: rel.price,
        email: detail?.email || "Undefined email",
        phone: detail?.phone || "Undefined phone",
        address: detail?.address || "Undefined address",
      };
    });
  }, [productSuppliers, product]);

  // 3. Xử lý nút Add New Supplier
  const handleAddNew = () => {
    const newSupplierName = `New Supplier ${displaySuppliers.length + 1}`;
    const newEntry: ProductSupplier = {
      supplier: newSupplierName,
      product: product.name,
      type: "SECONDARY",
      price: 0,
    };
    addSupplierToProduct(newEntry);
  };

  // 4. Xử lý nút Save Changes
  const handleSave = () => {
    setEditMode(false);
    toast.success("Changes saved successfully!");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">Suppliers for {product?.name}</h2>
            <button
              onClick={editMode ? handleSave : () => setEditMode(true)}
              className={`text-md ml-5 px-5 py-2.5 rounded-full transition-all font-medium ${
                !editMode
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}
            >
              {editMode ? "Save Changes" : "Edit Mode"}
            </button>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
            <X />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 bg-gray-50 flex-1">
          {displaySuppliers.map((s: ProductSupplierDetail) => (
            <div
              key={s.supplier}
              className="flex bg-white items-start justify-between p-5 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md"
            >
              <div className="flex gap-4 flex-1">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">
                  {s.supplier?.charAt(0)}
                </div>

                <div className="flex-1">
                  {editMode ? (
                    <div className="flex items-center gap-4 mb-2">
                      <input
                        type="text"
                        value={s.supplier}
                        onChange={(e) =>
                          updateProductSupplier(s.supplier, product.name, {
                            supplier: e.target.value,
                          })
                        }
                        className="border-b-2 border-blue-300 focus:border-blue-500 outline-none px-1 font-semibold text-gray-900 bg-transparent"
                      />
                      <button
                        onClick={() => toggleSupplierType(s.supplier, product.name)}
                        className={`text-sm px-2 py-1 rounded-full font-bold transition-transform active:scale-90 ${getSupplierTypeColor[s.type]}`}
                      >
                        {s.type} 🔄
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{s.supplier}</h3>
                      <span className={`text-sm px-2 py-1 rounded-full font-bold ${getSupplierTypeColor[s.type]}`}>
                        {s.type}
                      </span>
                    </div>
                  )}

                  {/* Thông tin liên hệ */}
                  <div className={`text-md text-gray-500 space-y-1 transition-opacity ${editMode ? "opacity-50" : "opacity-100"}`}>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5" /> {s.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5" /> {s.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5" /> {s.address}
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="flex flex-col items-end justify-between">
                {editMode ? (
                  <div className="flex flex-col items-end gap-4">
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px] text-gray-400 font-bold uppercase">Price</span>
                      <input
                        type="number"
                        className="text-right font-bold text-blue-600 bg-blue-50 rounded px-2 py-1 w-24 outline-none focus:ring-1 focus:ring-blue-400"
                        value={s.price}
                        onChange={(e) =>
                          updateProductSupplier(s.supplier, product.name, {
                            price: Number(e.target.value),
                          })
                        }
                      />
                    </div>
                    <button
                      onClick={() => removeSupplierFromProduct(s.supplier, product.name)}
                      className="p-2 hover:bg-red-50 rounded-full group transition-colors"
                    >
                      <Trash2 size={20} className="text-red-400 mt-1 group-hover:text-red-600" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-gray-400 font-bold uppercase">Price</span>
                    <p className="text-blue-600 font-bold text-lg">${s.price.toLocaleString()}</p>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Add More Button */}
          {editMode && (
            <button
              onClick={handleAddNew}
              className="w-full py-4 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all"
            >
              <div className="p-2 bg-gray-200 rounded-full mb-1">
                <Plus size={24} />
              </div>
              <span className="text-md font-medium">Add New Supplier</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}