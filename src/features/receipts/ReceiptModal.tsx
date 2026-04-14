import { Plus, Trash2 } from 'lucide-react';
import Modal from '../../components/common/Modal';
import { CancelButton, ConfirmButton } from '../../components/common/button/ModalButton';
import { type Receipt, type ReceiptFormData } from '../../types/note';
import { useState, useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ReceiptFormData) => void;
  initialData: Receipt | null;
}

const DEFAULT_FORM: ReceiptFormData = {
  dateCreated: new Date().toISOString().split('T')[0],
  supplier: '',
  items: [{ product: '', ordered: 0, received: 0, defective: 0 }],
  status: 'new',
  //operator: '',
};

const ReceiptModal = ({ isOpen, onClose, onSubmit, initialData }: Props) => {
  const [formData, setFormData] = useState<ReceiptFormData>(DEFAULT_FORM);

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
      items: [...formData.items, { product: '', ordered: 0, received: 0, defective: 0 }]
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
      title={initialData ? 'Update Receipt' : 'Create New Receipt'}
      size='xl' // Tăng size modal lên xl để hàng ngang 4 cột không bị chật
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Hàng thông tin chung: Chia 2 cột */}
        <div className='grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100'>
          <div>
            <label className='block text-sm font-semibold text-gray-500 uppercase mb-1'>Supplier *</label>
            <input
              className='modal-input w-full'
              placeholder='Supplier name'
              value={formData.supplier}
              onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
              required
            />
          </div>
          {/* <div>
            <label className='block text-sm font-semibold text-gray-500 uppercase mb-1'>operator *</label>
            <input
              className='modal-input w-full'
              placeholder='Name'
              value={formData.operator}
              onChange={(e) => setFormData({ ...formData, operator: e.target.value })}
              required
            />
          </div> */}
          <div>
            <label className='block text-sm font-semibold text-gray-500 uppercase mb-1'>Date *</label>
            <input
              type="date"
              className='modal-input w-full'
              value={formData.dateCreated}
              onChange={(e) => setFormData({ ...formData, dateCreated: e.target.value })}
              required
            />
          </div>
          <div>
            <label className='block text-sm font-semibold text-gray-500 uppercase mb-1'>Status *</label>
            <select
              className='modal-input w-full'
              value={formData.status}
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

        {/* Phần danh sách Items */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
              <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
              Product Items
            </h3>
            <button 
              type="button" 
              onClick={addItem}
              className="flex items-center gap-2 text-md bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Plus size={18} /> Add New Item
            </button>
          </div>

          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {/* Header giả cho danh sách item để nhìn chuyên nghiệp hơn */}
            <div className="grid grid-cols-12 gap-3 px-2 mb-1">
              <div className="col-span-5 text-sm font-bold text-gray-400 uppercase">Product </div>
              <div className="col-span-2 text-sm font-bold text-gray-400 uppercase text-center">Ordered</div>
              <div className="col-span-2 text-sm font-bold text-gray-400 uppercase text-center">Received</div>
              <div className="col-span-2 text-sm font-bold text-gray-400 uppercase text-center">Defective</div>
              <div className="col-span-1"></div>
            </div>

            {formData.items.map((item, index) => (
              <div 
                key={index} 
                className="grid grid-cols-12 gap-3 items-center bg-white p-3 rounded-xl shadow-blue-100 shadow-sm transition-all group"
              >
                <div className="col-span-5">
                  <input
                    className="modal-input !border-none w-full focus:bg-white"
                    placeholder="Search or enter product..."
                    value={item.product}
                    onChange={(e) => handleItemChange(index, 'product', e.target.value)}
                    required
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    className="modal-input !border-none w-full text-center"
                    value={item.ordered}
                    onChange={(e) => handleItemChange(index, 'ordered', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    className="modal-input !border-none w-full text-center"
                    value={item.received}
                    onChange={(e) => handleItemChange(index, 'received', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    className="modal-input w-full !border-none text-center text-red-600 font-medium"
                    value={item.defective} 
                    onChange={(e) => handleItemChange(index, 'defective', parseInt(e.target.value) || 0)}
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
          <ConfirmButton type="submit" label={initialData ? 'Update Receipt' : 'Create Receipt'} />
        </div>
      </form>
    </Modal>
  );
};

export default ReceiptModal;