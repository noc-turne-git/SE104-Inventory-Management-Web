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
        return 'bg-green-100 text-green-600';
      case 'low stock':
        return 'bg-yellow-100 text-yellow-600';
      case 'out of stock':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-20 h-20 rounded-lg flex overflow-hidden items-center justify-center">
            {product.image ? (
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <Package className="w-20 h-20 text-gray-400" />
            )}
          </div>
          <div>
            <p className="font-medium text-grey-900">{product.name}</p>
            <p className="text-md text-gray-500">{product.category}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-md text-gray-600">{product.sku}</td>
      <td className="px-6 py-4 text-md text-gray-600">{product.description}</td>
      <td className="px-6 py-4 text-md font-medium text-gray-900">${product.sellPrice}</td>
      <td className="px-6 py-4 text-md text-gray-600">{product.stockQuantity}</td>
      <td className="px-6 py-4 text-md text-gray-600">{product.defectiveQuantity}</td>
      <td className="px-6 py-4 text-md text-gray-600">{product.damagedQuantity}</td>
      <td className="px-6 py-4">
        <span className={`px-2 py-1 text-sm rounded-full ${getStatusStyle(product.status)}`}>
          {product.status}
        </span>
      </td>
    </tr>
  );
};

export default ProductViewRow;
