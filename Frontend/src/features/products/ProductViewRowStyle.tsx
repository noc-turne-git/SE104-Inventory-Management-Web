import React from 'react';
import { Package } from 'lucide-react';
import { type Product } from '../../types/product';

interface Props {
  product: Product;
}

const ProductViewRow: React.FC<Props> = ({ product }) => {
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
    <tr className="table-row">
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
      <td className="table-td-left max-w-[220px] truncate">{product.description}</td>
      <td className="table-td-center table-money">${product.sellPrice}</td>
      <td className="table-td-center">{product.stockQuantity}</td>
      <td className="table-td-center">{product.defectiveQuantity}</td>
      <td className="table-td-center">{product.damagedQuantity}</td>
      <td className="table-td-center">
        <span className={`table-status-badge ${getStatusStyle(product.status)}`}>
          {product.status}
        </span>
      </td>
    </tr>
  );
};

export default ProductViewRow;
