import Modal from '../../components/common/Modal.tsx';
import { CancelButton, ConfirmButton } from '../../components/common/button/ModalButton.tsx';
import { type Supplier } from '../../types/supplier.ts';
import { useState, useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SupplierInput) => void;
  initialData: Supplier | null;
}

type SupplierInput = {
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
};

const DEFAULT_FORM: SupplierInput = {
  name: '',
  contact: '',
  email: '',
  phone: '',
  address: '',
};

const SupplierModal = ({ isOpen, onClose, onSubmit, initialData }: Props) => {
  const [formData, setFormData] = useState<SupplierInput>(DEFAULT_FORM);

  // load data khi edit
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        contact: initialData.contact,
        email: initialData.email,
        phone: initialData.phone,
        address: initialData.address,
      });
    } else {
      setFormData(DEFAULT_FORM);
    }
  }, [initialData, isOpen]);

  // handle change gọn hơn
  const handleChange = (key: keyof SupplierInput, value: string) => {
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
      title={initialData ? 'Update Supplier' : 'Add New Supplier'}
      size="lg"
    >
      <form onSubmit={handleSubmit}>
        
        {/* Row 1 */}
        <div className='grid grid-cols-2 gap-4 my-5'>
          <div>
            <label className='modal-label'>Company Name *</label>
            <input
              className='modal-input'
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          <div>
            <label className='modal-label'>Contact Person *</label>
            <input
              className='modal-input'
              value={formData.contact}
              onChange={(e) => handleChange("contact", e.target.value)}
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className='grid grid-cols-2 gap-4 my-5'>
          <div>
            <label className='modal-label'>Email *</label>
            <input
              className='modal-input'
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div>
            <label className='modal-label'>Phone *</label>
            <input
              className='modal-input'
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className='modal-label'>Address *</label>
          <textarea
            className='modal-input h-18'
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className='mt-10 grid grid-cols-2 gap-3'>
          <CancelButton type="button" label='Cancel' onClick={onClose} />
          <ConfirmButton
            type="submit"
            label={initialData ? 'Update' : 'Create'}
          />
        </div>

      </form>
    </Modal>
  );
};

export default SupplierModal;