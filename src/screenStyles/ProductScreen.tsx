import React, { useState } from 'react';
import ProductRow from '../assets/components/ProductrowStyle.tsx';
import AddButton, {CancelButton, ConfirmButton} from '../assets/components/buttonStyle.tsx';
import SearchBar from '../assets/components/searchBarStyle.tsx';
import Modal from '../assets/components/Modal.tsx'
import { sampleProducts } from '../data/sampleData';
import { Plus, Search, Filter, Table } from 'lucide-react';

const ProductScreen = () => {
    const [isShowProductsModal, setIsShowProductsModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [products, setProducts] = useState(sampleProducts);
    const [productFormData, setProductFormData] = useState({
        image: '',
        name:'',
        sku:'',
        price:'',
        stock:'',
        description:'',
        category:''
      })
    
    const resetProductForm = () => {
        setProductFormData({
          image: '',
          name:'',
          sku:'',
          price:'',
          stock:'',
          description:'',
          category:''
        });
    };
    
    const handleCloseProductModal = () => {
        setIsShowProductsModal(false);
        resetProductForm();
    };
    
    return(
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
              <p className="text-gray-600 mt-1">Manage your product catalog</p>
            </div>
            <AddButton label="Add Product" onClick={() => {setIsShowProductsModal(true); setIsEditing(false)}}></AddButton>
          </div>
    
          <SearchBar label="Search Product's Name ...."></SearchBar>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-center text-base font-medium text-gray-600 uppercase">Product</th>
                    <th className="px-6 py-4 text-center text-base font-medium text-gray-600 uppercase">SKU</th>
                    <th className="px-6 py-4 text-center text-base font-medium text-gray-600 uppercase">Description</th>
                    <th className="px-6 py-4 text-center text-base font-medium text-gray-600 uppercase">Price</th>
                    <th className="px-6 py-4 text-center text-base font-medium text-gray-600 uppercase">Stock</th>
                    <th className="px-6 py-4 text-center text-base font-medium text-gray-600 uppercase">Status</th>
                    <th className="px-6 py-4 text-center text-base font-medium text-gray-600 uppercase">Actions</th>
                  </tr>
              </thead>
              <tbody>
                {products.map(products => ( 
                  <ProductRow key={products.id} product={products}></ProductRow>
                ))}
              </tbody>
              </table>
            </div>
          </div>
    
          <Modal
            isOpen={isShowProductsModal}
            onClose={() => handleCloseProductModal}
            title={isEditing? 'Update Product' : 'Add New Product'}
            size='lg'
            >
            <form>
              <div className=''>
                <div className=''>
                  <button className='bg-gray-200 rounded-lg w-30 h-30 flex items-center justify-center hover:bg-gray-300 transition-colors'>
                    <Plus className='w-10 h-10 text-gray-500'></Plus>
                  </button>
                </div>
              </div>
    
              <div className='grid grid-cols-2 gap-4 my-5'>
                <div className=''>
                  <label className='font-semibold text-base text-gray-700'>
                    Product Name *
                  </label>
                  <input 
                    className='border border-gray-300 rounded-lg text-sm w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
                    placeholder='e.g. Basic White T-Shirt'
                    value={productFormData.name}
                    onChange={(e) => setProductFormData({...productFormData, name: e.target.value})}
                    //required
                    >
                  </input>
                </div>
                <div className=''>
                  <label className='font-semibold text-base text-gray-700'>
                    SKU *
                  </label>
                  <input 
                    className='border border-gray-300 rounded-lg text-sm w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
                    placeholder='e.g. T-Shirt-001'
                    value={productFormData.sku}
                    onChange={(e) => setProductFormData({...productFormData, sku: e.target.value})}
                    //required
                    >
                  </input>
                </div>
              </div>
    
              <div className='grid grid-cols-2 gap-4 my-5'>
                <div className=''>
                  <label className='font-semibold text-base text-gray-700'>
                    Price ($) *
                  </label>
                  <input 
                    className='border border-gray-300 rounded-lg text-sm w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
                    placeholder='e.g. 3'
                    value={productFormData.price}
                    onChange={(e) => setProductFormData({...productFormData, price: e.target.value})}
                    //required
                    >
                  </input>
                </div>
                <div className=''>
                  <label className='font-semibold text-base text-gray-700'>
                    Category *
                  </label>
                  <select
                    className={`border border-gray-300 rounded-lg text-sm w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all 
                      ${productFormData.category === "" ? "text-gray-400" : "text-black"}`}
                    value={productFormData.category}
                    onChange={(e) => setProductFormData({...productFormData, category: e.target.value})}
                    //required
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
                <div className=''>
                  <label className='font-semibold text-base text-gray-700'>
                    Description *
                  </label>
                  <textarea 
                    className='h-18 border border-gray-300 rounded-lg text-sm w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
                    placeholder='e.g. Áo thun trắng basic cotton thoáng mát, dễ phối đồ'
                    value={productFormData.description}
                    onChange={(e) => setProductFormData({...productFormData, description: e.target.value})}
                    //required
                    rows={3} // Quy định số dòng hiển thị mặc định
                  />
                </div>
              </div>
    
              <div className='mt-10 grid grid-cols-2 gap-3'>
                <div className=''>
                  <CancelButton label='Cancel' onClick={handleCloseProductModal}>
                  </CancelButton>
                </div>
                <div className=''>
                  <ConfirmButton label='Confirm'>
                  </ConfirmButton>
                </div>
              </div>
            </form>
          </Modal>
        </div>
    );
}

export default ProductScreen;