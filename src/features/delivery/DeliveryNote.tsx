import React from 'react';
import { type Delivery } from '../../types/note';
import { Edit, Package, Calendar, Truck, FileDown } from 'lucide-react';

interface Props {
  delivery: Delivery;
  onOpenEditModal: (delivery: Delivery) => void;
}

interface ItemProps {
  product: string;
  quantity: number;
}

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'approved':
      return 'bg-green-100 text-green-700 border border-green-200';
    case 'in process':
      return 'bg-blue-100 text-blue-700 border border-blue-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
    case 'rejected':
      return 'bg-red-100 text-red-700 border border-red-200';
    case 'new':
      return 'bg-purple-100 text-purple-700 border border-purple-200';
    default:
      return 'bg-gray-100 text-gray-700 border border-gray-200';
  }
};

const DeliveryItem = ({ product, quantity }: ItemProps) => {
  return (
    <div className="bg-gray-50 rounded-lg p-3 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-2">
        <Package className="w-4 h-4 text-gray-400" />
        <span className="font-medium text-gray-900">{product}</span>
      </div>
      <div className="text-md">
        <span className="text-gray-600">Quantity:</span>
        <span className="ml-2 font-bold text-gray-900">{quantity}</span>
      </div>
    </div>
  );
}

export const DeliveryNote = ({ delivery, onOpenEditModal }: Props) => {
  return (
    <div key={delivery.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <Truck className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{delivery.noteNumber}</h3>
            <div className="flex items-center gap-4 mt-1 text-md text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(delivery.dateCreated).toLocaleDateString()}
              </div>
              <span className="flex items-center gap-1">
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                operator: {delivery.operator}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 text-sm font-bold rounded-full capitalize ${getStatusColor(delivery.status)}`}>
            {delivery.status}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm font-bold text-gray-400 uppercase mb-1">Destination:</p>
        <p className="font-medium text-gray-900">{delivery.destination}</p>
      </div>

      <div className="mb-4">
        <p className="text-sm font-bold text-gray-400 uppercase mb-3">Package Items:</p>
        <div className="space-y-2">
          {delivery.items.map((item, index) => (
            <DeliveryItem
              key={index}
              product={item.product}
              quantity={item.quantity}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 pt-4 border-gray-200">
        <button
          className="flex items-center gap-2 px-4 py-2 text-md font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <FileDown className="w-4 h-4" />
          Export Waybill
        </button>
        <button 
          className="flex items-center gap-2 px-4 py-2 text-md font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          onClick={() => onOpenEditModal(delivery)}
        >
          <Edit className="w-4 h-4" />
          Edit Order
        </button>
      </div>
    </div>
  );
}