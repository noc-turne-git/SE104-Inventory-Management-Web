import React, { useState } from 'react';
import { type Product } from '../../types/product';
import { Edit, Trash2, Package} from 'lucide-react'; // Sử dụng lucide-react cho icon
import ListSupplierModal from './ListSupplierModal';

interface ProductRowProps {
  product: Product;
  onOpenEditModal: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductRow: React.FC<ProductRowProps> = ({product, onDelete, onOpenEditModal}) => {

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'in stock': return 'bg-green-100 text-green-600';
      case 'low stock': return 'bg-yellow-100 text-yellow-600';
      case 'out of stock': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const [isOpenListSupplierModal, setIsOpenListSupplierModal] = useState(false);

  return (
    <tr className="hover:bg-gray-50"
        onDoubleClick={() => setIsOpenListSupplierModal(true)}>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-20 h-20 rounded-lg flex overflow-hidden items-center justify-center">
              {//overflow-hidden : tràn thì giấu
              }
            {product.image? (<img src={product.image} alt={product.name} className='w-full h-full'/>) :
            (<Package className="w-20 h-20 text-gray-400" />)}
          </div>
          <div>
            <p className="font-medium text-grey-900">{product.name}</p>
            <p className="text-sm text-gray-500">{product.category}</p>
          </div>
          </div>
            </td>
            <td className="px-6 py-4 text-sm text-gray-600">{product.sku}</td>
            <td className="px-6 py-4 text-sm text-gray-600">{product.description}</td>
            <td className="px-6 py-4 text-sm font-medium text-gray-900">${product.sellPrice}</td>
            <td className="px-6 py-4 text-sm text-gray-600">{product.stockQuantity}</td>
            <td className="px-6 py-4 text-sm text-gray-600">{product.defectiveQuantity}</td>
            <td className="px-6 py-4 text-sm text-gray-600">{product.damagedQuantity}</td>
            <td className="px-6 py-4">
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusStyle(product.status)}`}>
                {product.status}
              </span>
            </td>
            <td className="px-6 py-4">
          <div className="flex items-center justify-end gap-2">
          <button 
            onClick={() => onOpenEditModal(product)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>

      <ListSupplierModal 
        isOpen={isOpenListSupplierModal} 
        onClose={() => setIsOpenListSupplierModal(false)}
        product={product}
      >

        </ListSupplierModal>
    </tr>
  );
}

export default ProductRow;