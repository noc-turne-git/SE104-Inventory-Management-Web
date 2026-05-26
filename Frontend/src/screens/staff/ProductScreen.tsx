import { useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import ProductViewRow from '../../features/products/ProductViewRowStyle';
import OpenModalButton from '../../components/common/button/ModalButton';
import SearchBar from '../../components/common/searchBar';
import { toast } from 'sonner';
import { type Product } from '../../types/product';
import { type InventoryCheckFormData } from '../../types/note';
import InventoryCheckModal from '../../features/products/InventoryCheckModal';
import productApi from '../../api/ProductAPI';
import warehouseNotesApi from '../../api/WarehouseNotesAPI';
import { useWarehouseContext } from '../../context/WarehouseContext';
import { useProducts } from '../../hooks/useProducts';
import { resolveImageUrl } from '../../utils/resolveImageUrl';

const mapApiProductToProduct = (data: any): Product => ({
  id: String(data?.productId ?? data?.id ?? ''),
  image: resolveImageUrl(data?.imageUrl ?? data?.image ?? ''),
  name: data?.name ?? '',
  sku: data?.sku ?? '',
  category: data?.category ?? '',
  description: data?.description ?? '',
  sellPrice: Number(data?.sellPrice ?? 0),
  stockQuantity: Number(data?.stockQuantity ?? 0),
  defectiveQuantity: Number(data?.defectiveQuantity ?? 0),
  damagedQuantity: Number(data?.damagedQuantity ?? 0),
  status: (data?.status ?? 'undefined') as Product['status'],
});

const ProductViewScreen = () => {
  const { warehouseId } = useWarehouseContext();
  const { products, replaceProducts, filteredProducts } = useProducts([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      if (!warehouseId) {
        replaceProducts([]);
        return;
      }

      setLoading(true);
      try {
        replaceProducts([]);
        const res = await productApi.getAll(warehouseId);
        const items = Array.isArray(res.data) ? res.data : [];
        replaceProducts(items.map(mapApiProductToProduct));
      } catch (err: unknown) {
        replaceProducts([]);
        if (!isAxiosError(err)) toast.error('Failed to fetch products');
        else if (!err.response) toast.error('Cannot connect to server. Please check your network.');
        else toast.error(err.response.data?.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    void loadProducts();
  }, [warehouseId, replaceProducts]);

  const handleSubmit = async (formData : InventoryCheckFormData) => {
    if (!warehouseId) {
      toast.error('Please select a warehouse before creating an inventory check.');
      return false;
    }

    const items = formData.items
      .map((item) => {
        const productId = item.productId ?? Number(products.find((p) => p.name === item.product)?.id);
        return {
          productId,
          stockQuantity: item.stockQuantity,
          reason: item.reason || '',
        };
      })
      .filter((item) => Number.isInteger(item.productId));

    if (items.length === 0) {
      toast.error('Please select at least one product.');
      return false;
    }

    try {
      await warehouseNotesApi.createInventoryCheck(warehouseId, { items });
      toast.success('Inventory check sent to manager');
      handleCloseModal();
      return true;
    } catch (err: unknown) {
      if (!isAxiosError(err)) toast.error('Failed to create inventory check');
      else if (!err.response) toast.error('Cannot connect to server. Please check your network.');
      else toast.error(err.response.data?.message || 'Failed to create inventory check');
      return false;
    }
  }

  const handleOpenAddModal = () => {
    setShowAddModal(true)
  }

  const handleCloseModal = () => {
    setShowAddModal(false);
  }

  const filtered = filteredProducts(searchTerm);

  if (!warehouseId) {
    return <div className="p-8 text-gray-600">Please select a warehouse</div>;
  }

  return(
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600 mt-1">Manage your product catalog</p>
        </div>
        <OpenModalButton label="Check Inventory" onClick={() => handleOpenAddModal()}></OpenModalButton>
      </div>
    
      <SearchBar label="Search Product's Name ...."  onChange={(e) => setSearchTerm(e.target.value)}></SearchBar>

      {loading && (
        <div className="text-gray-500 mt-6">Loading products...</div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-gray-500 mt-6">No products found.</div>
      )}
          
      {filtered.length > 0 && (
      <div className="table-panel">
        <div className="table-scroll">
              <table className="w-full">
                <thead className="table-head">
                  <tr>
                    <th className="table-th">
                      Product </th>
                    <th className="table-th">
                      SKU </th>
                    <th className="table-th">
                      Description </th>
                    <th className="table-th">
                      Sell Price </th>
                    <th className="table-th">
                      Stock </th>
                    <th className="table-th">
                      Defective </th>
                    <th className="table-th">
                      Damage </th>
                    <th className="table-th">
                      Status </th>
                  </tr>
              </thead>
              <tbody>
                {filtered.map(p => ( 
                  <ProductViewRow key={p.id} product={p} />
                ))}
              </tbody>
              </table>
            </div>
          </div>
          )}
          
          <InventoryCheckModal
            isOpen={showAddModal} 
            onClose={() => handleCloseModal()}
            onSubmit={handleSubmit}
            products={products}
          />
        </div>
    );
}

export default ProductViewScreen;
