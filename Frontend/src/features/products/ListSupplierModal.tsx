import { useEffect, useMemo, useState } from "react";
import { X, Mail, Phone, MapPin, Plus, Trash2 } from "lucide-react";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import supplierApi from "../../api/SupplierAPI";
import { useProductSuppliers } from "../../hooks/useProductSupplier";
import { useWarehouseContext } from "../../context/WarehouseContext";
import type { Product, ProductSupplier } from "../../types/product";
import type { Supplier, SupplierApiResponse } from "../../types/supplier";

const getSupplierTypeColor = {
  SECONDARY: "bg-green-100 text-green-700",
  PRIMARY: "bg-orange-100 text-orange-700",
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

type ProductSupplierDraft = ProductSupplier & {
  supplierId: number;
  productId: number;
};

const mapApiSupplierToSupplier = (data: SupplierApiResponse): Supplier => ({
  id: Number(data.supplierId ?? data.id ?? 0),
  name: data.name ?? "",
  contact: data.contact ?? "",
  email: data.email ?? "",
  phone: data.phone ?? "",
  address: data.address ?? "",
});

const getErrorMessage = (err: unknown, fallback: string) => {
  if (!isAxiosError(err)) return fallback;
  if (!err.response) return "Cannot connect to server. Please check your network.";
  return err.response.data?.message || fallback;
};

export default function SuppliersModal({ isOpen, onClose, product }: Props) {
  const { warehouseId } = useWarehouseContext();
  const [editMode, setEditMode] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [supplierLoading, setSupplierLoading] = useState(false);
  const [drafts, setDrafts] = useState<ProductSupplierDraft[]>([]);
  const [newSupplierId, setNewSupplierId] = useState("");
  const [newType, setNewType] = useState<ProductSupplier["type"]>("SECONDARY");
  const [newPrice, setNewPrice] = useState(0);

  const {
    productSuppliers,
    loading,
    upsertProductSupplier,
    removeSupplierFromProduct,
  } = useProductSuppliers(warehouseId, product?.id ?? null);

  useEffect(() => {
    if (!isOpen || !warehouseId) return;

    const loadSuppliers = async () => {
      setSupplierLoading(true);
      try {
        const res = await supplierApi.getAll(warehouseId);
        setSuppliers((res.data || []).map(mapApiSupplierToSupplier));
      } catch (err: unknown) {
        toast.error(getErrorMessage(err, "Failed to fetch suppliers"));
      } finally {
        setSupplierLoading(false);
      }
    };

    void loadSuppliers();
  }, [isOpen, warehouseId]);

  useEffect(() => {
    setDrafts(
      productSuppliers
        .filter((item) => item.supplierId && item.productId)
        .map((item) => ({
          ...item,
          supplierId: item.supplierId!,
          productId: item.productId!,
        })),
    );
  }, [productSuppliers]);

  const availableSuppliers = useMemo(
    () => suppliers.filter((supplier) => !drafts.some((draft) => draft.supplierId === supplier.id)),
    [drafts, suppliers],
  );

  const updateDraft = (supplierId: number, data: Partial<ProductSupplierDraft>) => {
    setDrafts((prev) =>
      prev.map((draft) => (draft.supplierId === supplierId ? { ...draft, ...data } : draft)),
    );
  };

  const handleSave = async () => {
    const results = await Promise.all(
      drafts.map((draft) => upsertProductSupplier(draft.supplierId, draft.type, draft.price)),
    );

    if (results.every(Boolean)) {
      setEditMode(false);
    }
  };

  const handleAddNew = async () => {
    const supplierId = Number(newSupplierId);
    if (!Number.isInteger(supplierId)) {
      toast.error("Please select a supplier");
      return;
    }

    const ok = await upsertProductSupplier(supplierId, newType, newPrice);
    if (ok) {
      setNewSupplierId("");
      setNewType("SECONDARY");
      setNewPrice(0);
    }
  };

  if (!isOpen) return null;

  const busy = loading || supplierLoading;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">Suppliers for {product?.name}</h2>
            <button
              onClick={editMode ? handleSave : () => setEditMode(true)}
              disabled={busy}
              className={`text-md ml-5 px-5 py-2.5 rounded-full transition-all font-medium disabled:opacity-50 ${
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

        <div className="p-5 overflow-y-auto space-y-4 bg-gray-50 flex-1">
          {busy && <div className="text-gray-500">Loading suppliers...</div>}

          {!busy && drafts.length === 0 && (
            <div className="text-center py-8 text-gray-400">No suppliers linked to this product.</div>
          )}

          {drafts.map((item) => {
            const detail = suppliers.find((supplier) => supplier.id === item.supplierId);
            const supplierName = detail?.name || item.supplier;

            return (
              <div
                key={item.supplierId}
                className="flex bg-white items-start justify-between p-5 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md"
              >
                <div className="flex gap-4 flex-1">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">
                    {supplierName.charAt(0)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{supplierName}</h3>
                      {editMode ? (
                        <select
                          value={item.type}
                          onChange={(e) =>
                            updateDraft(item.supplierId, { type: e.target.value as ProductSupplier["type"] })
                          }
                          className="text-sm px-2 py-1 rounded-full font-bold border border-gray-200"
                        >
                          <option value="PRIMARY">PRIMARY</option>
                          <option value="SECONDARY">SECONDARY</option>
                        </select>
                      ) : (
                        <span className={`text-sm px-2 py-1 rounded-full font-bold ${getSupplierTypeColor[item.type]}`}>
                          {item.type}
                        </span>
                      )}
                    </div>

                    <div className={`text-md text-gray-500 space-y-1 transition-opacity ${editMode ? "opacity-60" : "opacity-100"}`}>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5" /> {detail?.email || "Undefined email"}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5" /> {detail?.phone || "Undefined phone"}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5" /> {detail?.address || "Undefined address"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-4">
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] text-gray-400 font-bold uppercase">Price</span>
                    {editMode ? (
                      <input
                        type="number"
                        className="text-right font-bold text-blue-600 bg-blue-50 rounded px-2 py-1 w-24 outline-none focus:ring-1 focus:ring-blue-400"
                        value={item.price}
                        onChange={(e) => updateDraft(item.supplierId, { price: Number(e.target.value) })}
                      />
                    ) : (
                      <p className="text-blue-600 font-bold text-lg">${item.price.toLocaleString()}</p>
                    )}
                  </div>

                  {editMode && (
                    <button
                      onClick={() => void removeSupplierFromProduct(item.supplierId)}
                      className="p-2 hover:bg-red-50 rounded-full group transition-colors"
                    >
                      <Trash2 size={20} className="text-red-400 group-hover:text-red-600" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {editMode && (
            <div className="bg-white p-5 rounded-xl shadow-sm border border-dashed border-gray-300 space-y-3">
              <div className="grid grid-cols-[1fr_140px_120px] gap-3">
                <select
                  value={newSupplierId}
                  onChange={(e) => setNewSupplierId(e.target.value)}
                  className="modal-input"
                >
                  <option value="">Select supplier</option>
                  {availableSuppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>

                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as ProductSupplier["type"])}
                  className="modal-input"
                >
                  <option value="PRIMARY">PRIMARY</option>
                  <option value="SECONDARY">SECONDARY</option>
                </select>

                <input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  className="modal-input"
                  placeholder="Price"
                />
              </div>

              <button
                onClick={handleAddNew}
                type="button"
                className="w-full py-3 flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all"
              >
                <Plus size={20} />
                <span className="text-md font-medium">Add Supplier</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
