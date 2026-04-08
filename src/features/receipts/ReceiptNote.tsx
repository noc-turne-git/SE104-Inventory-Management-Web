import React from 'react';
import { type Receipt } from '../../types/receipt';
import { Edit, Package, Calendar, ClipboardList, FileDown} from 'lucide-react';

interface Props {
  receipt: Receipt;
  onOpenEditModal: (receipt: Receipt) => void;
  //onDelete: (id: string) => void;
}

interface ItemProps {
  ordered: string;
  received: string;
  defective: string;
  product : string;
  //index: number
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

const ReceiptItem = ({ordered, received, defective, product} : ItemProps) => {
  return (
  <div className="bg-gray-50 rounded-lg p-3 flex justify-between items-center shadow-sm">
    <div className="items-center justify-start mb-2">
        <span className="font-medium text-gray-900">{product}</span>
    </div>
    <div className="grid grid-cols-3 gap-4 text-sm">
      <div>
        <span className="text-gray-600">Ordered:</span>
        <span className="ml-2 font-medium text-gray-900">{ordered}</span>
      </div>
      <div>
        <span className="text-gray-600">Received:</span>
        <span className="ml-2 font-medium text-green-700">{received}</span>
      </div>
      <div>
        <span className="text-gray-600">Defective:</span>
        <span className="ml-2 font-medium text-red-700">{defective}</span>
      </div>
    </div>
  </div>
  );
}

export const ReceiptNote = ({receipt, onOpenEditModal} : Props) => {
  return (
    <div key={receipt.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-green-50 rounded-lg">
            <ClipboardList className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{receipt.receiptNumber}</h3>
            <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {receipt.dateCreated}
              </div>
              <span>Inspector: {receipt.inspector}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 text-sm rounded-full capitalize ${getStatusColor(receipt.status)}`}>
            {receipt.status}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Supplier:</p>
        <p className="font-medium text-gray-900">{receipt.supplier}</p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-3">Items Quality Check:</p>
        <div className="space-y-3">
          {receipt.items.map((item) => (
            <ReceiptItem
              ordered={item.ordered.toString()} 
              product={item.product}
              received={item.received.toString()}
              defective={item.defective.toString()}
            />  
            ))
          }
        </div>
      </div>    
      
      <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
        <button
          // onClick={}
          className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <FileDown className="w-4 h-4" />
          Export PDF
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => onOpenEditModal(receipt)}>
          <Edit className="w-4 h-4" />
            Edit
          </button>
      </div>      
    </div>
  );
}