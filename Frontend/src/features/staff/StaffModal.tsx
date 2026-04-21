import Modal from '../../components/common/Modal';
import { CancelButton, ConfirmButton } from '../../components/common/button/ModalButton';
import { useState, useEffect } from 'react';
import { type Staff } from '../../types/staff';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: StaffInput) => void;
  initialData: Staff | null;
}

type StaffInput = Omit<Staff, 'id'| 'infractions'>;

const DEFAULT_FORM: StaffInput = {
  name: '',
  email: '',
  role: 'Staff',
  accountStatus: 'Active',
  //availability: 'Available',
  salary: 0,
  hireDate: '',
};

const StaffModal = ({ isOpen, onClose, onSubmit, initialData }: Props) => {
  const [formData, setFormData] = useState<StaffInput>(DEFAULT_FORM);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(DEFAULT_FORM);
    }
  }, [initialData, isOpen]);

  const handleChange = (key: keyof StaffInput, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Update Staff' : 'Add New Staff'}
      size="lg"
    >
      <form onSubmit={handleSubmit}>

        {/* NAME + EMAIL */}
        <div className="grid grid-cols-2 gap-4 my-5">
          <div>
            <label className="modal-label">Full Name*</label>
            <input
              className="modal-input"
              placeholder="e.g., John Doe"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>

          <div>
            <label className="modal-label">Email*</label>
            <input
              className="modal-input"
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>
        </div>

        {/* ROLE + POSITION */}
        <div className="grid grid-cols-2 gap-4 my-5">
          <div>
            <label className="modal-label">Role*</label>
            <select
              className="modal-input"
              value={formData.role}
              onChange={(e) => handleChange('role', e.target.value)}
            >
              <option value="Manager">Manager</option>
              <option value="Staff">Staff</option>
            </select>
          </div>

          <div>
            <label className="modal-label">Status*</label>
            <select
              className="modal-input"
              value={formData.accountStatus}
              onChange={(e) => handleChange('accountStatus', e.target.value as 'Active' | 'Inactive')}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* STATUS + AVAILABILITY */}
        {/*<div className="grid grid-cols-2 gap-4 my-5">
          <div>
            <label className="modal-label">Availability</label>
            <select
              className="modal-input"
              value={formData.availability}
              onChange={(e) => handleChange('availability', e.target.value)}
            >
              <option value="Available">Available</option>
              <option value="Busy">Busy</option>
              <option value="On Leave">On Leave</option>
            </select>
          </div>
        </div> */}

        {/* SALARY + DATE */}
        <div className="grid grid-cols-2 gap-4 my-5">
          <div>
            <label className="modal-label">Salary*</label>
            <input
              type="number"
              className="modal-input"
              placeholder="$ 50000"
              value={formData.salary}
              onChange={(e) => handleChange('salary', Number(e.target.value))}
            />
          </div>

          <div>
            <label className="modal-label">Hire Date*</label>
            <input
              type="date"
              className="modal-input"
              value={formData.hireDate}
              onChange={(e) => handleChange('hireDate', e.target.value)}
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-10 grid grid-cols-2 gap-3">
          <CancelButton label="Cancel" onClick={onClose} />
          <ConfirmButton
            type="submit"
            label={initialData ? 'Update' : 'Create'}
          />
        </div>

      </form>
    </Modal>
  );
};

export default StaffModal;