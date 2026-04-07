import { useState } from 'react';
import ProductViewRow from '../../features/products/ProductViewRowStyle.tsx';
import AddButton from '../../components/common/button/ModalButton.tsx';
import SearchBar from '../../components/common/searchBar.tsx';
//import { MOCK_INVENTORY_CHECKS } from '../../data/MOCK_INVENTORY_CHECK.ts';
import { MOCK_PRODUCTS } from '../../data/MOCK_PRODUCTS.ts';
import { toast } from 'sonner';
import { type Product } from '../../types/product.ts';
import { type InventoryCheckFormData } from '../../types/inventory_check.ts';
import InventoryCheckModal from '../../features/products/InventoryCheckModal.tsx';


import { useProducts } from '../../features/hooks/useProducts.tsx';

const ProductViewScreen = () => {
  const { products, addProduct, updateProduct, deleteProduct, filteredProducts } = useProducts(MOCK_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Product | null>(null);

  const sendToManager = () => {

  }

  const handleSubmit = (formData : InventoryCheckFormData) => {
    sendToManager();
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
        <AddButton label="Check Inventory" onClick={() => handleOpenAddModal()}></AddButton>
      </div>
    
      <SearchBar label="Search Product's Name ...."  onChange={(e) => setSearchTerm(e.target.value)}></SearchBar>
          
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
                {filteredProducts(searchTerm).map(p => ( 
                  <ProductViewRow key={p.id} product={p} 
                    onDelete={deleteProduct} onOpenEditModal={(prod) => {setEditingItem(prod); setShowAddModal(true);}} >
                  </ProductViewRow>
                ))}
              </tbody>
              </table>
            </div>
          </div>
          
          <InventoryCheckModal
            isOpen={showAddModal} 
            onClose={() => handleCloseModal()}
            onSubmit={handleSubmit}
          />
        </div>
    );
}

export default ProductViewScreen;