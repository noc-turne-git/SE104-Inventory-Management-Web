import React, { useState } from 'react';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Package } from 'lucide-react';
import { topProductsData } from '../../../data/dashboard/MOCK__MANAGER_DASHBOARD';

const TopProducts = () => {
  const [selectedYear, setSelectedYear] = useState<number>(topProductsData[topProductsData.length - 1].year);
  const yearData = topProductsData.find(d => d.year === selectedYear);
  const [selectedMonth, setSelectedMonth] = useState<number>(yearData?.months[yearData.months.length - 1].month || 1);

  const currentMonthData = yearData?.months.find(m => m.month === selectedMonth);
  const topProducts = currentMonthData?.topProducts || [];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalEntries = topProducts.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = topProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col min-h-[500px] overflow-hidden">
      <div className="p-6 flex-1">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">Top Selling Products</h3>
            <div className="flex gap-3 mt-2">
              <select 
                className="text-lg border border-gray-300 rounded-xl px-2 p-1" 
                value={selectedYear} 
                onChange={(e) => {
                  setSelectedYear(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                {topProductsData.map(item => <option key={item.year} value={item.year}>Year {item.year}</option>)}
              </select>
              <select 
                className="text-lg border border-gray-300 rounded-xl px-2 p-1" 
                value={selectedMonth} 
                onChange={(e) => {
                  setSelectedMonth(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                {[1,2,3,4,5,6,7,8,9,10,11,12].map(m => <option key={m} value={m}>Month {m}</option>)}
              </select>
            </div>
          </div>
          <TrendingUp className="w-5 h-5 text-gray-400" />
        </div>

        <div className="space-y-4">
          {currentItems.length > 0 ? (
            currentItems.map((p, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <p className="text-lg font-medium text-gray-900">{p.product}</p>
                  <p className="text-md text-gray-500">{p.sales} units sold</p>
                </div>
                <div className="text-lg text-right mr-4 font-semibold text-gray-900">{p.revenue}</div>
                {p.trend === 'up' ? <ArrowUpRight className="text-green-500" /> : <ArrowDownRight className="text-red-500" />}
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-400">
               <Package className="w-10 h-10 mx-auto opacity-20" />
               <p>No data available</p>
            </div>
          )}
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

export default TopProducts;