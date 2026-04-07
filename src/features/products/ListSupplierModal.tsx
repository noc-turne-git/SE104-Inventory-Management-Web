import { useState } from "react";
import { X, Mail, Phone, MapPin, Plus } from "lucide-react";

interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  price: string;
  tier: "PREMIUM" | "TIER 1" | "STANDARD";
}

const mockSuppliers: Supplier[] = [
  {
    id: "1",
    name: "Global Logistics Partners",
    email: "contact@globallogistics.com",
    phone: "+1 (555) 012-3456",
    address: "1200 Commerce Way, San Francisco, CA",
    price: "$4,250.00 / mo",
    tier: "PREMIUM",
  },
  {
    id: "2",
    name: "Precision Core Tech",
    email: "support@precisioncore.tech",
    phone: "+1 (555) 987-6543",
    address: "88 Industrial Ave, Austin, TX",
    price: "$12,800.00 / mo",
    tier: "TIER 1",
  },
  {
    id: "3",
    name: "Apex Supply Chain",
    email: "orders@apexsupply.io",
    phone: "+1 (555) 246-8101",
    address: "45 West Side Drive, Chicago, IL",
    price: "$2,100.00 / mo",
    tier: "STANDARD",
  },
];

const tierColor = {
  PREMIUM: "bg-green-100 text-green-700",
  "TIER 1": "bg-blue-100 text-blue-700",
  STANDARD: "bg-orange-100 text-orange-700",
};

export default function SuppliersModal({ isOpen, onClose }: any) {
  const [editMode, setEditMode] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">Suppliers</h2>
            <button
              onClick={() => setEditMode(!editMode)}
              className="text-sm px-3 py-1 rounded-full border hover:bg-gray-100"
            >
              {editMode ? "View Mode" : "Edit Mode"}
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {mockSuppliers.map((s) => (
            <div
              key={s.id}
              className="flex items-start justify-between p-4 rounded-xl border hover:shadow-sm transition"
            >
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg" />

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{s.name}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${tierColor[s.tier]}`}
                    >
                      {s.tier}
                    </span>
                  </div>

                  <div className="text-sm text-gray-600 mt-2 space-y-1">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" /> {s.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" /> {s.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> {s.address}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="text-blue-600 font-semibold">{s.price}</p>
                {editMode && (
                  <button className="mt-2 text-sm text-red-500 hover:underline">
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 flex justify-end border-t">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700">
            <Plus className="w-4 h-4" /> Add Supplier
          </button>
        </div>
      </div>
    </div>
  );
}
