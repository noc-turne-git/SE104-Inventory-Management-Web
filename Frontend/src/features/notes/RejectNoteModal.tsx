import { useState } from 'react';
import Modal from '../../components/common/Modal';

interface RejectNoteModalProps {
  isOpen: boolean;
  noteNumber?: string;
  onClose: () => void;
  onConfirm: (reason: string) => boolean | Promise<boolean>;
}

const RejectNoteModal = ({ isOpen, noteNumber, onClose, onConfirm }: RejectNoteModalProps) => {
  const [reason, setReason] = useState('');

  const handleClose = () => {
    setReason('');
    onClose();
  };

  const handleConfirm = async () => {
    const ok = await onConfirm(reason);
    if (ok) setReason('');
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Reject Note" size="sm">
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Note</p>
          <p className="text-base font-semibold text-gray-900">{noteNumber || 'Selected note'}</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Rejection reason
          </label>
          <textarea
            className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-400 outline-none"
            placeholder="Reason for rejection..."
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-gray-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-5 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            Reject
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RejectNoteModal;
