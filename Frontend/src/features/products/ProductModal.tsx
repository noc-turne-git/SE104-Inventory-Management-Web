import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import Modal from '../../components/common/Modal';
import { CancelButton, ConfirmButton } from '../../components/common/button/ModalButton';
import { type Product, type ProductFormData } from '../../types/product';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => boolean | void | Promise<boolean | void>;
  initialData: Product | null;
  categoryOptions?: string[];
}

const DEFAULT_FORM: ProductFormData = {
  image: '',
  imageFile: null,
  name: '',
  sku: '',
  sellPrice: '',
  description: '',
  category: ''
};

const ProductModal = ({ isOpen, onClose, onSubmit, initialData, categoryOptions = [] }: Props) => {
  const [formData, setFormData] = useState<ProductFormData>(DEFAULT_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        imageFile: null,
        sellPrice: initialData.sellPrice.toString(),
      });
    } else {
      setFormData(DEFAULT_FORM);
    }
  }, [initialData, isOpen]);

  useEffect(() => {
    if (formData.imageFile) {
      const url = URL.createObjectURL(formData.imageFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }

    setPreviewUrl(formData.image ?? '');
  }, [formData.image, formData.imageFile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    try {
      const ok = await onSubmit(formData);
      if (ok !== false) onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Update Product' : 'Add New Product'}
      size="lg"
    >
      <form onSubmit={handleSubmit}>
        <div className="">
          <div className="">
            <label className="bg-gray-200 rounded-lg w-30 h-30 flex overflow-hidden items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer">
              {previewUrl ? (
                <img src={previewUrl} alt="Product preview" className="w-full h-full object-cover" />
              ) : (
                <Plus className="w-10 h-10 text-gray-500" />
              )}
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
                className="hidden"
                onChange={(e) => setFormData({ ...formData, imageFile: e.target.files?.[0] ?? null })}
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 my-5">
          <div className="">
            <label className="modal-label">Product Name *</label>
            <input
              className="modal-input"
              placeholder="e.g. Basic White T-Shirt"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="">
            <label className="modal-label">SKU *</label>
            <input
              className="modal-input"
              placeholder="e.g. T-Shirt-001"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 my-5">
          <div className="">
            <label className="modal-label">Price ($) *</label>
            <input
              className="modal-input"
              placeholder="e.g. 3"
              value={formData.sellPrice}
              onChange={(e) => setFormData({ ...formData, sellPrice: e.target.value })}
            />
          </div>
          <div className="">
            <label className="modal-label">Category *</label>
            <input
              className="modal-input"
              list="product-category-options"
              placeholder="Select or enter category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
            <datalist id="product-category-options">
              {categoryOptions.map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
          </div>
        </div>

        <div className="">
          <label className="modal-label">Description *</label>
          <textarea
            className="h-18 modal-input"
            placeholder="e.g. Áo thun trắng basic cotton thoáng mát..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
          />
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3">
          <CancelButton onClick={onClose} label="Cancel" />
          <ConfirmButton type="submit" label={submitting ? 'Saving...' : initialData ? 'Update' : 'Create'} />
        </div>
      </form>
    </Modal>
  );
};

export default ProductModal;

