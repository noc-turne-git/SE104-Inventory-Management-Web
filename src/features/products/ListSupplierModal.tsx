import { useState } from "react";
import { X, Mail, Phone, MapPin, Plus, Trash2 } from "lucide-react";

interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  price: string;
  type: "PRIMARY" | "SECONDARY"
}

const mockSuppliers: Supplier[] = [
  {
    id: "1",
    name: "Global Logistics Partners",
    email: "contact@globallogistics.com",
    phone: "+1 (555) 012-3456",
    address: "1200 Commerce Way, San Francisco, CA",
    price: "$4,250.00 / mo",
    type: "PRIMARY",
  },
  {
    id: "2",
    name: "Precision Core Tech",
    email: "support@precisioncore.tech",
    phone: "+1 (555) 987-6543",
    address: "88 Industrial Ave, Austin, TX",
    price: "$12,800.00 / mo",
    type: "SECONDARY",
  },
  {
    id: "3",
    name: "Apex Supply Chain",
    email: "orders@apexsupply.io",
    phone: "+1 (555) 246-8101",
    address: "45 West Side Drive, Chicago, IL",
    price: "$2,100.00 / mo",
    type: "SECONDARY",
  },
];

const tierColor = {
  "SECONDARY" : "bg-green-100 text-green-700",
  "PRIMARY" : "bg-orange-100 text-orange-700",
};

export default function SuppliersModal({ isOpen, onClose }: any) {
  const [editMode, setEditMode] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 ">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">Suppliers</h2>
            <button
                onClick={() => setEditMode(!editMode)}
                className={`
                    text-sm ml-5 px-5 py-2.5 rounded-full transition-all font-medium
                    ${!editMode 
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-red-200 text-gray-700 hover:bg-red-300"
                    }
                    `}
                >   
                {editMode ? "Edit Mode" : "View Mode"}
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
        <div className="p-6 overflow-y-auto space-y-4 bg-gray-100">
          {mockSuppliers.map((s) => (
            <div
              key={s.id}
              className="flex bg-white items-start justify-between p-4 rounded-xl shadow-md transition"
            >
              <div className="flex gap-4">
                <div className="w-15 h-15 bg-gray-200 rounded-lg self-center">
                    {/* {mockSuppliers.image? (<img src={product.image} alt={product.name} className='w-full h-full'/>) :
                    (<Package className="w-20 h-20 text-gray-400" />)} */}
                </div>
                <div>
                  {editMode ? (
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={s.name}
                            className="modal-input text-center font-semibold"
                            >
                        </input>    
                        <button 
                          className={`text-xs px-2 py-1 rounded-full ${tierColor[s.type]}`}
                          //onClick={}
                        >
                            {s.type}
                        </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{s.name}</h3>
                        <span
                         className={`text-xs px-2 py-1 rounded-full ${tierColor[s.type]}`}
                        >
                            {s.type}
                        </span>
                    </div>
                  )}

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

              <div className="justify-between items-end">
                {editMode ? (
                    <div className="">
                        <input
                            type="text"
                            className="modal-input text-center font-semibold"
                            value={s.price}
                        ></input>
                        <Trash2 className="ml-35 mt-10" size={30} color="#df3030" ></Trash2>
                    </div>
                ) : (
                    <p className="flex text-blue-600 font-semibold mb-10">{s.price}</p>
                )}
              </div>
            </div>
          ))}

          {editMode && 
            <div className="px-30 py-5 flex flex-col bg-gray-200 rounded-xl items-center justify-center border border-gray-300">
                <div className="p-1 bg-gray-400 rounded-full">
                    <Plus size={30} color='#000'></Plus>
                </div>
                <label className="text-gray-500"> Click to add more supplier</label>
            </div>
        }
        </div>

        {/* Footer */}
        <div className="p-6 ">
        </div>
      </div>
    </div>
  );
}
