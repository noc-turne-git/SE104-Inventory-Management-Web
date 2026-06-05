import React, { useState } from 'react';
import { ClipboardCheck, Package, Truck } from 'lucide-react';
import { type NoteEntry } from '../../../types/dashboard/staff';

type NoteTableProps = {
  notes: NoteEntry[];
};

const NoteTable: React.FC<NoteTableProps> = ({ notes }) => {
  const renderIcon = (type: string) => {
    switch (type) {
      case 'Inventory Check':
        return <ClipboardCheck className="w-5 h-5 text-emerald-600" />;
      case 'Delivery Note':
        return <Truck className="w-5 h-5 text-blue-600" />;
      case 'Good Receipts':
        return <Package className="w-5 h-5 text-orange-600" />;
      default:
        return null;
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalEntries = notes.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = notes.slice(indexOfFirstItem, indexOfLastItem);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col min-h-[500px] overflow-hidden">
      <div className="flex p-6 items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Note Status</h3>
          <p className="text-sm text-gray-500">Recheck rejected note soon</p>
        </div>
      </div>

      <table className="p-6 w-full text-left">
        <thead>
          <tr className="text-sm font-medium text-gray-500 uppercase">
            <th className="px-6 py-2">Note Type</th>
            <th className="px-6 py-2">Created Date</th>
            <th className="px-6 py-2">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2.5 rounded-lg ${
                        item.type === 'Inventory Check'
                          ? 'bg-emerald-50'
                          : item.type === 'Delivery Note'
                            ? 'bg-blue-50'
                            : 'bg-orange-50'
                      }`}
                    >
                      {renderIcon(item.type)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-base">{item.type}</p>
                      <p className="text-sm text-gray-500">ID: {item.noteNumber}</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5 text-sm text-gray-600 font-medium">{item.createdDate}</td>

                <td className="px-6 py-5">
                  <div className="flex flex-col gap-1">
                    <span
                      className={`w-fit px-3 py-1 rounded-full text-sm font-bold tracking-wider ${
                        item.status === 'COMPLETED'
                          ? 'bg-emerald-100 text-emerald-700'
                          : item.status === 'PENDING'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {item.status}
                    </span>
                    {item.status === 'REJECTED' && item.reason && (
                      <p className="text-sm text-red-500 italic max-w-[200px]">Reason: {item.reason}</p>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="py-10 text-center text-lg text-gray-400">
                No notes yet
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="sticky bottom-0 mt-auto px-6 py-4 bg-gray-100 border-t border-gray-100 flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Showing {totalEntries === 0 ? 0 : indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalEntries)} of{' '}
          {totalEntries} entries
        </p>

        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-1 py-1 text-sm font-medium transition-colors ${
              currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-bold transition-colors ${
                currentPage === i + 1 ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`px-1 py-1 text-sm font-medium transition-colors ${
              currentPage === totalPages || totalPages === 0
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteTable;
