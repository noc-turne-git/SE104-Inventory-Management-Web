import {
  CheckCircle2,
  XCircle,
  Clock,
  ClipboardCheck,
  ChevronRight,
  Truck,
  FileText,
} from 'lucide-react';
import { type WarehouseNote } from '../../types/note';
import { getNoteIconColor, getStatusColor } from './noteAuthorizationUtils';

interface NoteAuthorizationCardProps {
  note: WarehouseNote;
  onApprove: () => void;
  onReject: () => void;
}

const getNoteIcon = (type: string) => {
  if (type === 'INVENTORY_CHECK') return <ClipboardCheck className="w-5 h-5" />;
  if (type === 'DELIVERY') return <Truck className="w-5 h-5" />;
  return <FileText className="w-5 h-5" />;
};

const renderNoteTableHead = (note: WarehouseNote) => {
  if (note.type === 'RECEIPT') {
    return (
      <>
        <th className="pb-3 px-2 text-center">Ordered</th>
        <th className="pb-3 px-2 text-center">Received</th>
        <th className="pb-3 px-2 text-right">Defective</th>
      </>
    );
  }

  if (note.type === 'INVENTORY_CHECK') {
    return (
      <>
        <th className="pb-3 px-2 text-center">Stock Qty</th>
        <th className="pb-3 px-2 text-right">Reason</th>
      </>
    );
  }

  return <th className="pb-3 px-2 text-right">Quantity</th>;
};

const renderNoteRows = (note: WarehouseNote) => {
  switch (note.type) {
    case 'RECEIPT':
      return note.items.map((item, idx) => (
        <tr key={idx} className="text-base">
          <td className="py-3 px-2 font-medium text-gray-800">{item.product}</td>
          <td className="py-3 px-2 text-center text-gray-600">{item.ordered}</td>
          <td className="py-3 px-2 text-center text-blue-600 font-semibold">{item.received}</td>
          <td className={`py-3 px-2 text-right font-semibold ${item.defective > 0 ? 'text-red-500' : 'text-gray-400'}`}>
            {item.defective}
          </td>
        </tr>
      ));

    case 'INVENTORY_CHECK':
      return note.items.map((item, idx) => (
        <tr key={idx} className="text-base">
          <td className="py-3 px-2 font-medium text-gray-800">{item.product}</td>
          <td className="py-3 px-2 text-center text-gray-600">{item.stockQuantity}</td>
          <td className="py-3 px-2 text-right text-gray-600">{item.reason || 'N/A'}</td>
        </tr>
      ));

    case 'DELIVERY':
      return note.items.map((item, idx) => (
        <tr key={idx} className="text-base">
          <td className="py-3 px-2 font-medium text-gray-800">{item.product}</td>
          <td className="py-3 px-2 text-right font-semibold text-gray-700">{item.quantity}</td>
        </tr>
      ));
  }
};

const NoteAuthorizationCard = ({
  note,
  onApprove,
  onReject,
}: NoteAuthorizationCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${getNoteIconColor(note.type)}`}>
            {getNoteIcon(note.type)}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-base text-gray-900">{note.noteNumber}</h3>
              <ChevronRight size={14} className="text-gray-300" />
              <span className="text-blue-600 uppercase text-sm tracking-wider">{note.operator}</span>
              <span className={`capitalize w-fit px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(note.status)}`}>
                {note.status}
              </span>
            </div>

            {note.type === 'DELIVERY' && (
              <p className="mt-1 text-sm text-gray-500">To: {note.destination}</p>
            )}
          </div>
        </div>

        <span className="flex items-center text-sm text-gray-500 gap-1">
          <Clock size={14} /> {note.dateCreated}
        </span>
      </div>

      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                <th className="pb-3 px-2">Product Name</th>
                {renderNoteTableHead(note)}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">{renderNoteRows(note)}</tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          {note.status !== 'rejected' && note.status !== 'in process' && note.status !== 'new' && (
            <button
              onClick={onReject}
              className="flex items-center gap-2 px-4 py-2 text-red-600 font-semibold text-base hover:bg-red-50 rounded-lg transition-all"
            >
              <XCircle size={16} /> Reject
            </button>
          )}

          {note.status !== 'approved' && note.status !== 'in process' && note.status !== 'new' && (
            <button
              onClick={onApprove}
              className="flex items-center gap-2 px-5 py-2 bg-slate-900 text-white font-semibold text-base rounded-lg hover:bg-blue-600 transition-all shadow-sm"
            >
              <CheckCircle2 size={16} /> Approve & Sync
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteAuthorizationCard;
