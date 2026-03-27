import {CancelButton, ConfirmButton} from '../../components/common/button/ModalButton';
import Modal from '../../components/common/Modal';
import {ShiftTimes, type Shift, type ShiftFormData} from '../../types/shift'
import { MOCK_STAFF } from '../../data/MOCK_STAFF';
import { type Staff } from '../../types/staff';
import { useState, useEffect} from 'react';
import '../../components/common/modal.css';

interface Props {
  isOpen : boolean;
  onClose : () => void;
  onSubmit: (formData: ShiftFormData) => void;
  initialData: Shift | null;
}

// CHINH SUA SAU
const getAvailableStaff = (staffList: Staff[], position: string) => {
    return staffList.filter(s => 
        s.accountStatus === 'Active' &&
        s.availability === 'Available' &&
        s.position === position
    );
}

const DEFAULT_FORM = {
  date: '',
  startTime: '',
  endTime: '',
  position: '',
  assignedTo: '',
  shiftType: '',
  notes: '',
  repeatWeekly: false,
  repeatCount: '1',
}

export const ShiftsModal = ({isOpen, onClose, onSubmit, initialData}: Props) => {
    // do formData ko có dữ liệu id nên lưu id trong editingItem để biết dang editing Shift nèo
    const [formData, setFormData] = useState<ShiftFormData>(DEFAULT_FORM);

    const resetForm = () => {
      setFormData({
        date: '',
        startTime: '',
        endTime: '',
        position: '',
        assignedTo: '',
        shiftType: '',
        notes: '',
        repeatWeekly: false,
        repeatCount: '1',
      });
    };

    useEffect(() => {
      if (initialData) {
        setFormData({
          date: initialData.date,
          startTime: initialData.startTime,
          endTime: initialData.endTime,
          position: initialData.position,
          assignedTo: initialData.assignedTo || '',
          shiftType: initialData.shiftType,
          notes: initialData.notes,
          repeatWeekly: false,
          repeatCount: '1',
        });
      } else {
        setFormData(DEFAULT_FORM);
      }
    }, [initialData, isOpen]);

    const handleCloseAddModal = () => {
      //resetForm();
    }

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
    }

    const handleShiftTypeSelect = (type: string) => {
        if (ShiftTimes[type]) {
            setFormData({
                ...formData,
                shiftType: type,
                startTime: ShiftTimes[type].start,
                endTime: ShiftTimes[type].end,
          });
        }
    };    

    const availableStaff = getAvailableStaff(MOCK_STAFF, formData.position);

    return (
    <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={initialData ? 'Edit Shift' : 'Add New Shift'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Shift Type Quick Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Quick Select Shift Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {Object.keys(ShiftTimes).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleShiftTypeSelect(type)}
                  className={`px-4 py-2.5 rounded-lg border-2 transition-all ${
                        formData.shiftType === type
                        ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="modal-label">
                  Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="modal-input"
                  required
                />
              </div>

              <div>
                <label className="modal-label">
                  Position *
                </label>
                <select
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="modal-input"
                  required
                >
                  <option value="">Select Position</option>
                  <option value="Warehouse Supervisor">Warehouse Supervisor</option>
                  <option value="Inventory Clerk">Inventory Clerk</option>
                  <option value="Delivery Coordinator">Delivery Coordinator</option>
                  <option value="Night Guard">Night Guard</option>
                  <option value="Loading Staff">Loading Staff</option>
                  <option value="Quality Inspector">Quality Inspector</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="modal-label">
                  Start Time *
                </label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="modal-input"
                  required
                />
              </div>

              <div>
                <label className="modal-label">
                  End Time *
                </label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="modal-input"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="modal-label">
                Assign To
              </label>
              <select
                value={formData.assignedTo}
                onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                className="modal-input"
              >
                <option value="">Unassigned</option>
                {availableStaff.map((staff) => (
                                <option key={staff.id} value={staff.name}>
                                    {staff.name}
                                </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">Select employee or leave unassigned</p>
            </div>

            <div className="mb-4">
              <label className="modal-label">
                Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={2}
                placeholder="Add any additional notes or instructions..."
                className="modal-input"
              />
            </div>

            {!initialData && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <input
                    type="checkbox"
                    id="repeatWeekly"
                    checked={formData.repeatWeekly}
                    onChange={(e) => setFormData({ ...formData, repeatWeekly: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="repeatWeekly" className="text-sm font-medium text-gray-700">
                    Repeat weekly
                  </label>
                </div>
                {formData.repeatWeekly && (
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Number of weeks
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="52"
                      value={formData.repeatCount}
                      onChange={(e) => setFormData({ ...formData, repeatCount: e.target.value })}
                      className="modal-input"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <CancelButton
              type="button"
              label='Cancel'>
            </CancelButton>
            <ConfirmButton
              type="submit"
              label={initialData? 'Update Shift' : 'Create Shift'}>
            </ConfirmButton>
          </div>
        </form>
      </Modal>
    );
}