import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { lowStockItemsData } from '../../data/dashboard/MOCK__MANAGER_DASHBOARD';

const LowStockAlert: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalEntries = lowStockItemsData.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = lowStockItemsData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col min-h-[500px] overflow-hidden">
      <div className="p-6 flex-1">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">Low Stock Alert</h3>
            <p className="text-md text-gray-500">Items requiring reorder</p>
          </div>
          <AlertTriangle className="w-5 h-5 text-red-500" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-lg font-medium text-gray-500 uppercase pb-3">Product</th>
                <th className="text-lg font-medium text-gray-500 uppercase pb-3">SKU</th>
                <th className="text-right text-lg font-medium text-gray-500 uppercase pb-3">Stock</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-100 transition-colors">
                  <td className="py-3 text-lg text-gray-900 font-medium">{item.name}</td>
                  <td className="py-3 text-lg text-gray-500">{item.sku}</td>
                  <td className="py-3 text-lg text-right">
                    <span className={`px-2 py-1 rounded-full text-lg font-bold ${
                      item.status === 'critical' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.current}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="sticky bottom-0 mt-auto px-6 py-4 bg-gray-100 border-t border-gray-100 flex justify-between items-center">
        <p className="text-md text-gray-500">
          Showing {totalEntries === 0 ? 0 : indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalEntries)} of {totalEntries} entries
        </p>

        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-3 py-1 text-md font-medium transition-colors ${
              currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 flex items-center justify-center rounded-md text-md font-bold transition-colors ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`px-3 py-1 text-md font-medium transition-colors ${
              currentPage === totalPages || totalPages === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default LowStockAlert;