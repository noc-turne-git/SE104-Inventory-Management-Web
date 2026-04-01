import { useState } from 'react';
import ProductRow from '../features/products/ProductRowStyle.tsx';
import AddButton from '../components/common/button/ModalButton.tsx';
import SearchBar from '../components/common/searchBar.tsx';
import { MOCK_PRODUCTS } from '../data/MOCK_PRODUCTS.ts';
import { toast } from 'sonner';
import { type Product, type ProductFormData } from '../types/product.ts';
import '../components/common/modal.css'
import ProductModal from '../features/products/ProductModal.tsx';
import { useProducts } from '../features/hooks/useProducts.tsx';

const ProductScreen = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts(MOCK_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Product | null>(null);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
    //p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (formData : ProductFormData) => {
    if(editingItem) {
      updateProduct(editingItem.id, formData)
    } else {
      addProduct(formData)
    }
    handleCloseModal();
  }

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setShowAddModal(true)
  }

  const handleCloseModal = () => {
    setEditingItem(null); 
    setShowAddModal(false);
  }

  return(
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600 mt-1">Manage your product catalog</p>
        </div>
        <AddButton label="Add Product" onClick={() => handleOpenAddModal()}></AddButton>
      </div>
    
      <SearchBar label="Search Product's Name ...."  onChange={() => alert('Changed')}></SearchBar>
          
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="table-header">Product</th>
                    <th className="table-header">SKU</th>
                    <th className="table-header">Description</th>
                    <th className="table-header">Sell Price</th>
                    <th className="table-header">Stock</th>
                    <th className="table-header">Defective</th>
                    <th className="table-header">Damage</th>
                    <th className="table-header">Status</th>
                    <th className="table-header">Actions</th>
                  </tr>
              </thead>
              <tbody>
                {filteredProducts.map(p => ( 
                  <ProductRow key={p.id} product={p} 
                    onDelete={deleteProduct} onOpenEditModal={(prod) => {setEditingItem(prod); setShowAddModal(true);}} >
                  </ProductRow>
                ))}
              </tbody>
              </table>
            </div>
          </div>
          
          <ProductModal 
            isOpen={showAddModal} 
            onClose={() => handleCloseModal()}
            initialData={editingItem}
            onSubmit={handleSubmit}
          />
        </div>
    );
}

export default ProductScreen;