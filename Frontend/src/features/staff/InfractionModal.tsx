import { useState } from "react";
import Modal from "../../components/common/Modal";
import type { Staff } from "../../types/staff";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  staff: Staff | null;
  onAdd: (id: string, data: any) => void;
}

const InfractionModal = ({ isOpen, onClose, staff, onAdd }: Props) => {
  const [showForm, setShowForm] = useState(false);
  const [reason, setReason] = useState("");
  const [penalty, setPenalty] = useState("");

  if (!staff) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Violation">

      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <p>Total: {staff.infractions.length}</p>

        <button
          onClick={() => setShowForm(true)}
          className="w-8 h-8 flex items-center justify-center rounded bg-blue-500 text-white"
        >
          +
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg space-y-3">
          <input
            placeholder="Reason"
            className="modal-input mb-2"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                document.getElementById("penalty-input")?.focus();
              }
            }}
          />

          <input
            placeholder="Penalty"
            className="modal-input mb-2"
            value={penalty}
            onChange={(e) => setPenalty(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                
                onAdd(staff.id, {
                datetime: new Date().toLocaleString('vi-VN'),
                reason,
                penalty: Number(penalty)
                });
                setShowForm(false);
                setReason("");
                setPenalty("");
              }
            }}
          />

          <button
            onClick={() => {
              onAdd(staff.id, {
                datetime: new Date().toLocaleString(),
                reason,
                penalty: Number(penalty)
              });

              setShowForm(false);
              setReason("");
              setPenalty("");
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      )}

      {/* TABLE */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 w-[35%]">Date & Time</th>
              <th className="text-left py-3 px-4 w-[45%]">Reason</th>
              <th className="text-left py-3 px-4 w-[20%]">Penalty</th>
            </tr>
          </thead>

          <tbody>
            {staff.infractions.map(i => (
              <tr key={i.id} className="border-t border-gray-100">
                <td className="px-4 py-3">
                  {new Date (i.datetime).toLocaleString('vi-VN')}</td>
                <td className="px-4 py-3">
                  {i.reason}</td>
                <td className="px-4 py-3 text-red-600 font-medium">
                  ${i.penalty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </Modal>
  );
};

export default InfractionModal;