import React, { useState } from 'react';
import { 
  CheckCircle2, XCircle, User, Clock, Package, 
  ClipboardCheck, AlertCircle, Search, ChevronRight, Truck, FileText
} from 'lucide-react';
import { useNotes } from '../../context/NoteContext';
import { type WarehouseNote, type statusNote} from '../../types/note';
import SearchBar from '../../components/common/searchBar';

const NoteAuthorizationScreen: React.FC = () => {
  const {allNotes, updateStatus } = useNotes();
  const [rejectionRemarks, setRejectionRemarks] = useState<{ [key: string]: string }>({});
  const [activeTab, setActiveTab] = useState<statusNote | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAction = (id: string, status: statusNote) => {
    if (status === 'rejected' && !rejectionRemarks[id]) {
      alert("Please provide a reason for rejection.");
      return;
    }
    updateStatus(id, status, rejectionRemarks[id]);
  };

    const getStatusColor = (status: string): string => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700 border border-green-200';
      case 'in process':
        return 'bg-blue-100 text-blue-700 border border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border border-red-200';
      case 'new':
        return 'bg-purple-100 text-purple-700 border border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  const noteToDisplay = allNotes.filter(n => {
    const filterResult = activeTab === 'ALL' ? true : n.status.toLowerCase() === activeTab.toLowerCase();
    const searchResult = n.noteNumber.toLowerCase().includes(searchTerm.toLowerCase()) || n.operator.toLowerCase().includes(searchTerm.toLowerCase());
    return filterResult && searchResult;  
    }
  );

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans text-gray-900">
      <main className="flex-grow flex flex-col h-screen overflow-hidden">
        
        <div className="pt-8 px-6 md:px-10 pb-6 space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Note Authorization</h1>
            <p className="text-gray-600 mt-1">Review and authorize warehouse documents</p>
          </div>

          <div className='justify-between'>
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
                {['ALL', 'PENDING', 'APPROVED', 'REJECTED', 'IN PROCESS', 'NEW'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-6 py-2 rounded-lg text-md font-bold transition-all whitespace-nowrap ${
                      activeTab === tab ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className='mr-10 text w-100'>
                <SearchBar label="Find notes by note number or operator" onChange={(e) => setSearchTerm(e.target.value)}/>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto px-6 md:px-10 pb-10 space-y-6">
          {noteToDisplay.map((n) => (
            <div key={n.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all">
              
              {/* Header: Hiển thị icon theo loại phiếu */}
              <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    n.type === 'INVENTORY_CHECK' ? 'bg-amber-100 text-amber-600' : 
                    n.type === 'DELIVERY' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'
                  }`}>
                    {n.type === 'INVENTORY_CHECK' ? <ClipboardCheck /> : n.type === 'DELIVERY' ? <Truck /> : <FileText />}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                      {n.noteNumber} 
                      <ChevronRight size={14} className="text-gray-300" />
                      {/* <span className="text-blue-600 uppercase text-md tracking-widest">{n.type.replace('_', ' ')}</span> */}
                      <span className="text-blue-600 uppercase text-md tracking-widest">{n.operator}</span>
                      <div className={`capitalize ml-10 w-fit px-3 py-1 rounded-full ${getStatusColor(n.status)} text-sm font-bold bg-blue-200`}>{n.status}</div>
                    </h3>
                    <div className="flex items-center gap-4 mt-1 text-md text-gray-500">
                      {n.type === 'DELIVERY' && <span className="text-gray-400">To: {n.destination}</span>}
                    </div>
                  </div>
                </div>
                <div>
                  
                  <span className="flex items-center text-md gap-1"><Clock size={14} /> {n.dateCreated}</span>
                </div>
              </div>

              {/* Table: Nội dung thay đổi theo Type */}
              <div className="p-6">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-md font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                      <th className="pb-3 px-2">Product Name</th>
                      {n.type === 'RECEIPT' ? (
                        <>
                          <th className="pb-3 px-2 text-center">Ordered</th>
                          <th className="pb-3 px-2 text-center">Received</th>
                          <th className="pb-3 px-2 text-right">Defective</th>
                        </>
                      ) : n.type === 'INVENTORY_CHECK' ? (
                        <>
                          <th className="pb-3 px-2 text-center">System Qty</th>
                          <th className="pb-3 px-2 text-right">Actual Qty</th>
                        </>
                      ) : (
                        <th className="pb-3 px-2 text-right">Quantity</th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {n.items.map((item: any, idx) => (
                      <tr key={idx} className="text-lg">
                        <td className="py-3 px-2 font-medium text-gray-800">{item.product}</td>
                        
                        {/* Render dữ liệu đặc thù cho Receipt */}
                        {n.type === 'RECEIPT' && (
                          <>
                            <td className="py-3 px-2 text-center text-gray-600">{item.ordered}</td>
                            <td className="py-3 px-2 text-center text-blue-600 font-bold">{item.received}</td>
                            <td className={`py-3 px-2 text-right font-bold ${item.defective > 0 ? 'text-red-500' : 'text-gray-400'}`}>
                              {item.defective}
                            </td>
                          </>
                        )}

                        {/* Render dữ liệu đặc thù cho Inventory Check */}
                        {n.type === 'INVENTORY_CHECK' && (
                          <>
                            <td className="py-3 px-2 text-center text-gray-600">{item.stockQuantity}</td>
                            <td className={`py-3 px-2 text-right font-bold ${item.stockQuantity !== item.stockQuantity ? 'text-orange-500' : 'text-emerald-600'}`}>
                              {item.stockQuantity} 
                            </td>
                          </>
                        )}

                        {/* Render dữ liệu đặc thù cho Delivery */}
                        {n.type === 'DELIVERY' && (
                          <td className="py-3 px-2 text-right font-bold text-gray-700">{item.quantity}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Phần ghi chú từ chối */}
                <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-md font-bold text-slate-500 uppercase mb-2">Rejection Remarks</p>
                  <textarea 
                    className="w-full p-3 bg-white border border-gray-200 rounded-lg text-md focus:ring-2 focus:ring-red-400 outline-none"
                    placeholder="Reason for rejection..."
                    rows={2}
                    value={rejectionRemarks[n.id] || ""}
                    onChange={(e) => setRejectionRemarks({...rejectionRemarks, [n.id]: e.target.value})}
                  />
                </div>

                {/* Nút hành động */}
                <div className="mt-6 flex justify-end gap-3">
                  { n.status !== 'rejected' && n.status !== 'in process' && n.status !== 'new' &&
                    <button 
                      onClick={() => handleAction(n.id, 'rejected')}
                      className="flex items-center gap-2 px-5 py-2 text-red-600 font-bold text-lg hover:bg-red-50 rounded-lg transition-all"
                    >
                      <XCircle size={16} /> Reject
                    </button>
                  } 
                  { n.status !== 'approved' && n.status !== 'in process' && n.status !== 'new' &&
                    <button 
                      onClick={() => handleAction(n.id, 'approved')}
                      className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white font-bold text-lg rounded-lg hover:bg-blue-600 transition-all shadow-md"
                    >
                      <CheckCircle2 size={16} /> Approve & Sync
                    </button>
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default NoteAuthorizationScreen;