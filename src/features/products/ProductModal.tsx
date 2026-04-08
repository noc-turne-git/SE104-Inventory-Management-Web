import { Plus } from 'lucide-react';
import Modal from '../../components/common/Modal';
import { CancelButton, ConfirmButton } from '../../components/common/button/ModalButton';
import { type ProductFormData, type Product } from '../../types/product';
import { useState, useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => void;
  initialData: Product | null;
}

const DEFAULT_FORM: ProductFormData = {
    image: '',
    name:'',
    sku:'',
    sellPrice:'',
    description:'',
    category:''
}

const ProductModal = ({ isOpen, onClose, onSubmit, initialData}: Props) => {
    const [formData, setFormData] = useState<ProductFormData>(DEFAULT_FORM);

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                sellPrice: initialData.sellPrice.toString(),
                //stock: initialData.stock.toString(),
            });
        } else {
            setFormData(DEFAULT_FORM);
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // chặn trình duyệt load lại trang.
        onSubmit(formData);
        onClose();
    };

    return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Update Product' : 'Add New Product'}
      size='lg'
    >
      <form onSubmit={handleSubmit}>
        <div className=''>
          <div className=''>
            <button type="button" className='bg-gray-200 rounded-lg w-30 h-30 flex items-center justify-center hover:bg-gray-300 transition-colors'>
              <Plus className='w-10 h-10 text-gray-500' />
            </button>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4 my-5'>
          <div className=''>
            <label className='modal-label'>Product Name *</label>
            <input
              className='modal-input'
              placeholder='e.g. Basic White T-Shirt'
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className=''>
            <label className='modal-label'>SKU *</label>
            <input
              className='modal-input'
              placeholder='e.g. T-Shirt-001'
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
            />
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4 my-5'>
          <div className=''>
            <label className='modal-label'>Price ($) *</label>
            <input
              className='modal-input'
              placeholder='e.g. 3'
              value={formData.sellPrice}
              onChange={(e) => setFormData({ ...formData, sellPrice: e.target.value })}
            />
          </div>
          <div className=''>
            <label className='modal-label'>Category *</label>
            <select
              className={`modal-input ${formData.category === "" ? "text-gray-400" : "text-black"}`}
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="" disabled>Select a category</option>
              <option value='T-Shirt'>T-Shirt</option>
              <option value='Jeans'>Jeans</option>
              <option value='Shoes'>Shoes</option>
              <option value='Jacket'>Jacket</option>
              <option value='Hoodie'>Hoodie</option>
              <option value='Boot'>Boot</option>
            </select>
          </div>
        </div>

        <div className=''>
          <label className='modal-label'>Description *</label>
          <textarea
            className='h-18 modal-input'
            placeholder='e.g. Áo thun trắng basic cotton thoáng mát...'
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
          />
        </div>

        <div className='mt-10 grid grid-cols-2 gap-3'>
          <CancelButton onClick={onClose} label='Cancel' />
          <ConfirmButton type="submit" label={initialData ? 'Update' : 'Create'} />
        </div>
      </form>
    </Modal>
  );
};

export default ProductModal;