import { Plus, Trash2 } from 'lucide-react';
import Modal from '../../components/common/Modal';
import { CancelButton, ConfirmButton } from '../../components/common/button/ModalButton';
import { type InventoryCheckFormData } from '../../types/note';
import { type Product } from '../../types/product';
import { useState, useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: InventoryCheckFormData) => Promise<boolean | void> | boolean | void;
  products: Product[];
  //initialData: InventoryCheck | null;
}

const DEFAULT_FORM: InventoryCheckFormData = {
  warehouseId: '',
  dateCreated: new Date().toISOString().split('T')[0],
  status: 'pending',
  items: [
    {
      product: '',
      stockQuantity: 0,
      reason: '',
    }
  ]
};

const InventoryCheckModal = ({ isOpen, onClose, onSubmit, products}: Props) => {
  const [formData, setFormData] = useState<any>(DEFAULT_FORM);
  //const [isMismatch, setIsMismatch] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(DEFAULT_FORM);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await onSubmit(formData);
    if (ok !== false) {
      onClose();
    }
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...formData.items]; // lấy tất cả các item
    newItems[index] = { ...newItems[index], [field]: value };  // sửa trường của item đang update
    setFormData({ ...formData, items: newItems });
  };

  const handleProductChange = (index: number, productId: string) => {
    const selected = products.find((product) => product.id === productId);
    const newItems = [...formData.items];
    newItems[index] = {
      ...newItems[index],
      productId: selected ? Number(selected.id) : undefined,
      product: selected?.name ?? '',
    };
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { product: '', productId: undefined, stockQuantity: 0, reason: '', expectedQuantity: 0 }]
    });
  };

  const removeItem = (index: number) => {
    const newItems = formData.items.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='Inventory Check'
      size='lg'
    >
      <form onSubmit={handleSubmit} className="space-y-8">

        <div className='bg-gray-50 p-4 rounded-xl border border-gray-100'>
          <div className='grid grid-cols-2 gap-4'>
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
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="in process">In Process</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Items */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
              <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
              Items
            </h3>
            <button
              type="button"
              onClick={addItem}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              <Plus size={18} /> Add Product
            </button>
          </div>

          <div className="space-y-3 max-h-100 overflow-y-auto pr-2 custom-scrollbar">
            <div className="grid grid-cols-12 gap-3 px-2 mb-1">
              <div className="col-span-7 text-sm font-bold text-gray-400 uppercase">Product Name</div>
              <div className="col-span-2 text-sm font-bold text-gray-400 uppercase text-center">Quantity</div>
              <div className="col-span-2 text-sm font-bold text-gray-400 uppercase text-center">Expected Quantity</div>
              <div className="col-span-1"></div>
            </div>

            {formData.items.map((item: any, index: number) => {
              const originalProduct = products.find(
                (p) => String(p.id) === String(item.productId)
                  || p.name.toLowerCase() === item.product?.toLowerCase().trim()
              );
  
              const isMismatch = originalProduct && item.stockQuantity !== 0 &&
                                        item.stockQuantity !== originalProduct.stockQuantity;

              const expectedQuantity = (originalProduct?.stockQuantity || 0).toString();

              return (
                <div key={index} className="grid grid-cols-12 gap-3 items-center bg-white p-3 rounded-xl shadow-blue-100 shadow-sm transition-all group border border-transparent hover:border-blue-100">

                  {/* Product */}
                  <div className="col-span-7">
                    <select
                      className="modal-input border-none! w-full focus:bg-white"
                      value={item.productId ?? ''}
                      onChange={(e) => handleProductChange(index, e.target.value)}
                      required
                    >
                      <option value="">Select product</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Actual */}
                  <div className="col-span-2">
                    <input
                      type="number"
                      className="modal-input border-none! w-full text-center font-semibold"
                      value={item.stockQuantity}
                      onChange={(e) => {
                        handleItemChange(index, 'stockQuantity', parseInt(e.target.value) || 0);
                      }}
                      required
                    />
                  </div>

                  <div className="col-span-2 modal-input text-center bg-gray-200  border-none! w-full">
                    <label className="font-semibold">
                    {expectedQuantity}
                    </label>
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

                  {isMismatch && (
                    <div className="col-span-12 border border-red-300 rounded-lg">
                      {/* <div className="text-sm font-bold text-gray-400 uppercase">Reason</div> */}
                      <textarea
                        className="modal-input border-none! w-full focus:bg-white custom-scrollbar" 
                        placeholder="Enter reason of discrepancy"
                        rows={3}
                        value={item.reason}  
                        onChange={(e) => handleItemChange(index, 'reason', e.target.value)}
                        required
                      />
                    </div>
                  )
                  }
                </div>
              );
            })}
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <CancelButton onClick={onClose} label='Cancel' />
          <ConfirmButton
            type="submit"
            label="Send to manager"
          />
        </div>

      </form>
    </Modal>
  );
};

export default InventoryCheckModal;
