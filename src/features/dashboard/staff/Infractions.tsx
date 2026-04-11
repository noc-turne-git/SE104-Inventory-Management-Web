import React, { useState } from 'react';
import { ShieldAlert, Calendar } from 'lucide-react';
import { infractionsData } from '../../../data/dashboard/MOCK_STAFF_DASHBOARD';

const Infractions: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalEntries = infractionsData.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = infractionsData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col min-h-[500px] overflow-hidden">
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <ShieldAlert className="w-7 h-7 text-orange-500" /> Infractions
        </h3>
        <div className="space-y-4">
          {currentItems.map((inf) => (
            <div key={inf.id} className="flex justify-between items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
              <div>
                <p className="text-lg font-medium text-gray-900">{inf.reason}</p>
                <p className="text-md text-gray-500 flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {inf.date}
                </p>
              </div>
              <span className="text-lg font-bold text-red-600">-{inf.moneyPenalty}</span>
            </div>
          ))}
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

export default Infractions;