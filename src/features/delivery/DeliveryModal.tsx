import { Plus, Trash2 } from 'lucide-react';
import Modal from '../../components/common/Modal.tsx';
import { CancelButton, ConfirmButton } from '../../components/common/button/ModalButton.tsx';
import { type Delivery, type DeliveryFormData } from '../../types/delivery.ts';
import { useState, useEffect } from 'react';


interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DeliveryFormData) => void;
  initialData: Delivery | null;
}

const DEFAULT_FORM: DeliveryFormData = {
  dateCreated: new Date().toISOString().split('T')[0],
  destination: '',
  items: [{ product: '', quantity: 1 }],
  status: 'new',
  picker: '',
};

const DeliveryModal = ({ isOpen, onClose, onSubmit, initialData }: Props) => {
  const [formData, setFormData] = useState<DeliveryFormData>(DEFAULT_FORM);

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    } else {
      setFormData(DEFAULT_FORM);
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { product: '', quantity: 1 }]
    });
  };

  const removeItem = (index: number) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Update Delivery' : 'Create New Delivery'}
      size='lg'
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className='bg-gray-50 p-4 rounded-xl border border-gray-100'>
          <div className="mb-4">
            <label className='block text-xs font-semibold text-gray-500 uppercase mb-1'>Destination *</label>
            <input
              className='modal-input w-full'
              placeholder='Delivery address'
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              required
            />
          </div>
          <div className='grid grid-cols-3 gap-4'>
          <div>
            <label className='block text-xs font-semibold text-gray-500 uppercase mb-1'>Picker *</label>
            <input
              className='modal-input w-full'
              placeholder='Staff name'
              value={formData.picker}
              onChange={(e) => setFormData({ ...formData, picker: e.target.value })}
              required
            />
          </div>

          <div>
            <label className='block text-xs font-semibold text-gray-500 uppercase mb-1'>Date *</label>
            <input
              type="date"
              className='modal-input w-full'
              value={formData.dateCreated}
              onChange={(e) => setFormData({ ...formData, dateCreated: e.target.value })}
              required
            />
          </div>

          <div>
            <label className='block text-xs font-semibold text-gray-500 uppercase mb-1'>Status *</label>
            <select
              //type="date"
              className='modal-input w-full'
               onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
            >
              <option value="new">New</option>
              <option value="in process">In Process</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          </div>
        </div>

        {/* Phần danh sách Items */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
              <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
              Delivery Items
            </h3>
            <button 
              type="button" 
              onClick={addItem}
              className="flex items-center gap-2 text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Plus size={18} /> Add Product
            </button>
          </div>

          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {/* Header cho danh sách item */}
            <div className="grid grid-cols-12 gap-3 px-2 mb-1">
              <div className="col-span-8 text-xs font-bold text-gray-400 uppercase">Product Name</div>
              <div className="col-span-3 text-xs font-bold text-gray-400 uppercase text-center">Quantity</div>
              <div className="col-span-1"></div>
            </div>

            {formData.items.map((item, index) => (
              <div 
                key={index} 
                className="grid grid-cols-12 gap-3 items-center bg-white p-3 rounded-xl shadow-blue-100 shadow-sm transition-all group border border-transparent hover:border-blue-100"
              >
                <div className="col-span-8">
                  <input
                    className="modal-input !border-none w-full focus:bg-white"
                    placeholder="E.g. Slim-fit T-Shirt..."
                    value={item.product}
                    onChange={(e) => handleItemChange(index, 'product', e.target.value)}
                    required
                  />
                </div>
                <div className="col-span-3">
                  <input
                    type="number"
                    min="1"
                    className="modal-input !border-none w-full text-center font-semibold"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                    required
                  />
                </div>
                <div className="col-span-1 flex justify-center">
                  <button 
                    type="button" 
                    onClick={() => removeItem(index)}
                    disabled={formData.items.length === 1}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors disabled:opacity-0"
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nút điều khiển */}
        <div className='pt-6 border-t border-gray-100 grid grid-cols-2 gap-4'>
          <CancelButton onClick={onClose} label='Cancel' />
          <ConfirmButton 
            type="submit" 
            label={initialData ? 'Update Delivery' : 'Create Delivery'} 
          />
        </div>
      </form>
    </Modal>
  );
};

export default DeliveryModal;