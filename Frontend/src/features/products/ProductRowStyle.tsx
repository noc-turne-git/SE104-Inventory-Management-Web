import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { type Product } from '../../types/product';
import { Edit, Package, Trash2 } from 'lucide-react';
import ListSupplierModal from './ListSupplierModal';

interface ProductRowProps {
  product: Product;
  onOpenEditModal: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductRow: React.FC<ProductRowProps> = ({ product, onDelete, onOpenEditModal }) => {
  const [isOpenListSupplierModal, setIsOpenListSupplierModal] = useState(false);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'in stock':
        return 'bg-green-100 text-green-700 border border-green-200';
      case 'low stock':
        return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
      case 'out of stock':
        return 'bg-red-100 text-red-700 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  return (
    <>
      <tr
        className="hover:bg-gray-100 transition-colors"
        onDoubleClick={() => setIsOpenListSupplierModal(true)}
      >
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-100 shadow-sm flex overflow-hidden items-center justify-center shrink-0">
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <Package className="w-8 h-8 text-blue-500" />
              )}
            </div>
            <div>
              <p className="font-medium text-gray-900">{product.name}</p>
              <p className="text-md text-gray-500">{product.category}</p>
            </div>
          </div>
        </td>

        <td className="px-6 py-4 text-md text-gray-600">{product.sku}</td>
        <td className="px-6 py-4 text-md text-gray-600 max-w-[220px] truncate">
          {product.description}
        </td>
        <td className="px-6 py-4 text-md font-medium text-gray-900">${product.sellPrice}</td>
        <td className="px-6 py-4 text-md text-gray-600">{product.stockQuantity}</td>
        <td className="px-6 py-4 text-md text-gray-600">{product.defectiveQuantity}</td>
        <td className="px-6 py-4 text-md text-gray-600">{product.damagedQuantity}</td>
        <td className="px-6 py-4">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(product.status)}`}>
            {product.status}
          </span>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center justify-end gap-5">
            <button onClick={() => onOpenEditModal(product)}>
              <Edit className="w-5 h-5 text-blue-600" />
            </button>
            <button onClick={() => onDelete(product.id)}>
              <Trash2 className="w-5 h-5 text-red-600" />
            </button>
          </div>
        </td>
      </tr>

      {isOpenListSupplierModal &&
        createPortal(
          <ListSupplierModal
            isOpen={isOpenListSupplierModal}
            onClose={() => setIsOpenListSupplierModal(false)}
            product={product}
          />,
          document.body,
        )}
    </>
  );
};

export default ProductRow;
