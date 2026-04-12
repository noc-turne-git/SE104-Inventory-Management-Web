import React from 'react';
import { Eye, MoreVertical, ClipboardCheck, Truck, Package } from 'lucide-react';
import { useState } from 'react';
// 1. Định nghĩa Kiểu dữ liệu
type NoteStatus = 'COMPLETED' | 'PENDING' | 'REJECTED';

interface NoteEntry {
  id: number;
  noteNumber: string;
  type: 'Inventory Check' | 'Delivery Note' | 'Good Receipts';
  createdDate: string;
  status: NoteStatus;
  reason?: string; // Chỉ hiển thị khi REJECTED
}

// 2. Dữ liệu mẫu (Mock Data)
const noteTableData: NoteEntry[] = [
  { id: 1, noteNumber: 'GR-2024-001', type: 'Good Receipts', createdDate: 'Oct 24, 2023 • 09:45 AM', status: 'COMPLETED' },
  { id: 2, noteNumber:'DN-2024-042', type: 'Delivery Note', createdDate: 'Oct 23, 2023 • 02:15 PM', status: 'PENDING' },
  { id: 3, noteNumber: 'IC-2024-058', type: 'Inventory Check', createdDate: 'Oct 22, 2023 • 11:30 AM', status: 'REJECTED', reason: 'Missing signature from supervisor' },
  { id: 4, noteNumber: 'IC-2024-058', type: 'Inventory Check', createdDate: 'Oct 22, 2023 • 11:30 AM', status: 'REJECTED', reason: 'Missing signature from supervisor' },
  { id: 5, noteNumber: 'GR-2024-089', type: 'Good Receipts', createdDate: 'Oct 22, 2023 • 08:10 AM', status: 'COMPLETED' },
];

const NoteTable: React.FC = () => {
  // Hàm render icon tương ứng với loại note
  const renderIcon = (type: string) => {
    switch (type) {
      case 'Inventory Check': return <ClipboardCheck className="w-5 h-5 text-emerald-600" />;
      case 'Delivery Note': return <Truck className="w-5 h-5 text-blue-600" />;
      case 'Good Receipts': return <Package className="w-5 h-5 text-orange-600" />;
      default: return null;
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalEntries = noteTableData.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage);

  // 2. Logic to "Slice" your data
  // Note: In a real app, you'd fetch specific pages from a backend.
  // For local mock data:
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = noteTableData.slice(indexOfFirstItem, indexOfLastItem);

  // 3. Handlers
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col min-h-[500px] overflow-hidden">
      <div className="flex p-6 items-center justify-between">
        <div>
          <h3 className="text-4xl font-semibold text-gray-900">Note Status</h3>
          <p className="text-md text-gray-500">Recheck rejected note soon</p>
        </div>
        {/* <AlertTriangle className="w-5 h-5 text-red-500" /> */}
      </div>
  
      <table className=" p-6 w-full text-left">
        <thead>
          <tr className="text-xl font-medium text-gray-500 uppercase">
            <th className="px-6 py-2">Note Type</th>
            <th className="px-6 py-2">Created Date</th>
            <th className="px-6 py-2">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {currentItems.map((item) => (
            <tr key={item.id} className="hover:bg-gray-100 transition-colors">
              {/* Cột Note Type */}
              <td className="px-6 py-5">
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-lg ${
                    item.type === 'Inventory Check' ? 'bg-emerald-50' : 
                    item.type === 'Delivery Note' ? 'bg-blue-50' : 'bg-orange-50'
                  }`}>
                    {renderIcon(item.type)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{item.type}</p>
                    <p className="text-md text-gray-500 font-medium">ID: {item.noteNumber}</p>
                  </div>
                </div>
              </td>

              {/* Cột Date */}
              <td className="px-6 py-5 text-md text-gray-600 font-medium">
                {item.createdDate}
              </td>

              {/* Cột Status & Reason */}
              <td className="px-6 py-5">
                <div className="flex flex-col gap-1">
                  <span className={`w-fit px-3 py-1 rounded-full text-md font-bold tracking-wider ${
                    item.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' :
                    item.status === 'PENDING' ? 'bg-blue-100 text-blue-700' : 
                    'bg-red-100 text-red-700'
                  }`}>
                    {item.status}
                  </span>
                  {item.status === 'REJECTED' && item.reason && (
                    <p className="text-md text-red-500 italic max-w-[200px]">
                      Reason: {item.reason}
                    </p>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Footer giống ảnh mẫu */}
      <div className="sticky bottom-0 mt-auto px-6 py-4 bg-gray-100 border-t border-gray-100 flex justify-between items-center">
        <p className="text-md text-gray-500">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalEntries)} of {totalEntries} entries
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

          {/* Dynamic Page Numbers */}
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
            disabled={currentPage === totalPages}
            className={`px-3 py-1 text-md font-medium transition-colors ${
              currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-blue-600'
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