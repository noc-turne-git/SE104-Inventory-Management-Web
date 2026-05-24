import { useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';
import OpenModalButton from '../../components/common/button/ModalButton';
import SearchBar from '../../components/common/searchBar';
import productApi from '../../api/ProductAPI';
import { useWarehouseContext } from '../../context/WarehouseContext';
import ProductModal from '../../features/products/ProductModal';
import ProductRow from '../../features/products/ProductRowStyle';
import { useProducts } from '../../hooks/useProducts';
import { type Product, type ProductFormData } from '../../types/product';

const mapApiProductToProduct = (data: any): Product => {
  const status = (data?.status ?? 'undefined') as Product['status'];

  return {
    id: String(data?.productId ?? data?.id ?? ''),
    image: data?.imageUrl ?? data?.image ?? '',
    name: data?.name ?? '',
    sku: data?.sku ?? '',
    category: data?.category ?? '',
    description: data?.description ?? '',
    sellPrice: Number(data?.sellPrice ?? 0),
    stockQuantity: Number(data?.stockQuantity ?? 0),
    defectiveQuantity: Number(data?.defectiveQuantity ?? 0),
    damagedQuantity: Number(data?.damagedQuantity ?? 0),
    status,
  };
};

const ProductScreen = () => {
  const { warehouseId } = useWarehouseContext();
  const { appendProduct, replaceProducts, replaceProduct, deleteProduct, filteredProducts } = useProducts([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      if (!warehouseId) return;

      setLoading(true);
      try {
        const res = await productApi.getAll(warehouseId);
        const items = Array.isArray(res.data) ? res.data : [];
        replaceProducts(items.map(mapApiProductToProduct));
      } catch (err: unknown) {
        if (!isAxiosError(err)) toast.error('Failed to fetch products');
        else if (!err.response) toast.error('Unable to connect to the server. Please check your network.');
        else toast.error(err.response.data?.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [warehouseId, replaceProducts]);

  const handleSubmit = async (formData: ProductFormData) => {
    if (!warehouseId) {
      toast.error('Please select a warehouse before adding a product.');
      return false;
    }

    try {
      const payload: Product = {
        id: editingItem?.id ?? '0',
        image: formData.image,
        name: formData.name,
        sku: formData.sku,
        category: formData.category,
        description: formData.description,
        sellPrice: parseFloat(formData.sellPrice),
        stockQuantity: editingItem?.stockQuantity ?? 0,
        defectiveQuantity: editingItem?.defectiveQuantity ?? 0,
        damagedQuantity: editingItem?.damagedQuantity ?? 0,
        status: editingItem?.status ?? 'undefined',
      };

      if (editingItem) {
        const res = await productApi.update(warehouseId, editingItem.id, payload);
        replaceProduct(mapApiProductToProduct(res.data));
        toast.success('Product updated successfully');
        return true;
      }

      const createRes = await productApi.create(warehouseId, payload);
      const createdId = createRes.data?.productId;

      const detailRes =
        createdId !== undefined && createdId !== null
          ? await productApi.getById(warehouseId, createdId)
          : createRes;

      appendProduct(mapApiProductToProduct(detailRes.data));
      toast.success('Product added successfully');
      return true;
    } catch (err: unknown) {
      if (!isAxiosError(err)) {
        toast.error('Failed to create product');
        return false;
      }

      if (!err.response) {
        toast.error('Unable to connect to the server. Please check your network.');
        return false;
      }

      const message = err.response.data?.message;
      toast.error(message || 'Failed to create product');
      return false;
    }
  };

  const handleDelete = async (id: string) => {
    if (!warehouseId) {
      toast.error('Please select a warehouse before deleting a product.');
      return;
    }

    try {
      await productApi.delete(warehouseId, id);
      deleteProduct(id);
      toast.success('Product deleted successfully');
    } catch (err: unknown) {
      if (!isAxiosError(err)) toast.error('Failed to delete product');
      else if (!err.response) toast.error('Unable to connect to the server. Please check your network.');
      else toast.error(err.response.data?.message || 'Failed to delete product');
    }
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setEditingItem(null);
    setShowAddModal(false);
  };

  const filtered = filteredProducts(searchTerm);

  if (!warehouseId) {
    return <div className="p-8 text-gray-600">Please select a warehouse</div>;
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600 mt-1">Manage your product catalog</p>
        </div>
        <OpenModalButton label="Add Product" onClick={() => handleOpenAddModal()}></OpenModalButton>
      </div>

      <SearchBar label="Search Product's Name ...." onChange={(e) => setSearchTerm(e.target.value)}></SearchBar>

      {loading && (
        <div className="text-gray-500 mt-6">Loading products...</div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-gray-500 mt-6">No products found.</div>
      )}

      {filtered.length > 0 && (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-md text-gray-600 uppercase">
                  Product </th>
                <th className="px-6 py-4 text-left text-md text-gray-600 uppercase">
                  SKU </th>
                <th className="px-6 py-4 text-left text-md text-gray-600 uppercase">
                  Description </th>
                <th className="px-6 py-4 text-left text-md text-gray-600 uppercase">
                  Sell Price </th>
                <th className="px-6 py-4 text-left text-md text-gray-600 uppercase">
                  Stock </th>
                <th className="px-6 py-4 text-left text-md text-gray-600 uppercase">
                  Defective </th>
                <th className="px-6 py-4 text-left text-md text-gray-600 uppercase">
                  Damage </th>
                <th className="px-6 py-4 text-left text-md text-gray-600 uppercase">
                  Status </th>
                <th className="px-6 py-4 text-right text-md text-gray-600 uppercase">
                  Actions </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <ProductRow
                  key={p.id}
                  product={p}
                  onDelete={(id) => void handleDelete(id)}
                  onOpenEditModal={(prod) => {
                    setEditingItem(prod);
                    setShowAddModal(true);
                  }}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      )}

      <ProductModal
        isOpen={showAddModal}
        onClose={() => handleCloseModal()}
        initialData={editingItem}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ProductScreen;
