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
        className="table-row"
        onDoubleClick={() => setIsOpenListSupplierModal(true)}
      >
        <td className="table-td-left">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 shadow-sm flex overflow-hidden items-center justify-center shrink-0">
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <Package className="w-6 h-6 text-blue-500" />
              )}
            </div>
            <div>
              <p className="text-base font-medium text-gray-900">{product.name}</p>
              <p className="text-sm text-gray-500">{product.category}</p>
            </div>
          </div>
        </td>

        <td className="table-td-center">{product.sku}</td>
        <td className="table-td-left max-w-[220px] truncate">
          {product.description}
        </td>
        <td className="table-td-center table-money">${product.sellPrice}</td>
        <td className="table-td-center">{product.stockQuantity}</td>
        <td className="table-td-center">{product.defectiveQuantity}</td>
        <td className="table-td-center">{product.damagedQuantity}</td>
        <td className="table-td-center">
          <span className={`table-status-badge ${getStatusStyle(product.status)}`}>
            {product.status}
          </span>
        </td>
        <td className="table-td-center">
          <div className="flex items-center justify-center gap-4">
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
