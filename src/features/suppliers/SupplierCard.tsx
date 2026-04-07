import { Mail, Phone, MapPin, Edit, Trash2 } from "lucide-react";
import { type Supplier } from "../../types/supplier";

interface Props {
  supplier: Supplier;
  onDelete: (id: string) => void;
  onEdit: (supplier: Supplier) => void;
}

const SupplierCard = ({ supplier, onDelete, onEdit }: Props) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:bg-gray-50 transition-all duration-200">

      {/* HEADER */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {supplier.name}
          </h2>
          <p className="text-sm text-gray-500">
            Contact: {supplier.contact}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(supplier)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
          >
            <Edit className="w-4 h-4" />
          </button>

          <button
            onClick={() => onDelete(supplier.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* INFO */}
      <div className="space-y-2 text-sm text-gray-600">

        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          <span>{supplier.email}</span>
        </div>

        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          <span>{supplier.phone}</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>{supplier.address}</span>
        </div>

      </div>

    </div>
  );
};

export default SupplierCard;