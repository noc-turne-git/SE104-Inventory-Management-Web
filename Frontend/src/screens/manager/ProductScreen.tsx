import { useEffect, useMemo, useState } from 'react';
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

const resolveImageUrl = (url: string) => {
  if (!url) return '';
  if (/^(https?:|blob:|data:)/i.test(url)) return url;
  return `http://localhost:5074${url}`;
};
//convert format của BE/api sang của FE
const mapApiProductToProduct = (data: any): Product => {
  const status = (data?.status ?? 'undefined') as Product['status']; // cho phép null/defined nhưng nếu dị thì là string 'undefined'

  return {
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
    status,
  };
};

const ProductScreen = () => {
  const { warehouseId } = useWarehouseContext();
  const { products, appendProduct, replaceProducts, replaceProduct, deleteProduct, filteredProducts } = useProducts([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  const categoryOptions = useMemo(() => {
    return Array.from(
      new Set(
        products
          .map((product) => product.category.trim())
          .filter(Boolean)
      )
    ).sort((a, b) => a.localeCompare(b));
  }, [products]);

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
        else if (!err.response) toast.error('Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại mạng!');
        else toast.error(err.response.data?.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [warehouseId, replaceProducts]);

  const handleSubmit = async (formData: ProductFormData) => {
    if (!warehouseId) {
      toast.error('Vui lòng chọn kho trước khi thêm sản phẩm.');
      return false;
    }

    try {
      const payload: Product = {
        id: editingItem?.id ?? '0',
        image: formData.image,
        imageFile: formData.imageFile ?? null,
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
      console.error('PRODCUCT ERROR:', err);

      if (!isAxiosError(err)) {
        toast.error('Failed to create product');
        return false;
      }

      if (!err.response) {
        toast.error('Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại mạng!');
        return false;
      }

      const message = err.response.data?.message;
      toast.error(message || 'Failed to create product');
      return false;
    }
  };

  const handleDelete = async (id: string) => {
    if (!warehouseId) {
      toast.error('Vui lÃ²ng chá»n kho trÆ°á»›c khi xÃ³a sáº£n pháº©m.');
      return;
    }

    try {
      await productApi.delete(warehouseId, id);
      deleteProduct(id);
    } catch (err: unknown) {
      if (!isAxiosError(err)) toast.error('Failed to delete product');
      else if (!err.response) toast.error('KhÃ´ng thá»ƒ káº¿t ná»‘i Ä‘áº¿n mÃ¡y chá»§. Vui lÃ²ng kiá»ƒm tra láº¡i máº¡ng!');
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

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600 mt-1">Manage your product catalog</p>
        </div>
        <OpenModalButton label="Add Product" onClick={() => handleOpenAddModal()}></OpenModalButton>
      </div>

      <SearchBar label="Search Product's Name or SKU...." onChange={(e) => setSearchTerm(e.target.value)}></SearchBar>

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
              {loading && (
                <tr>
                  <td className="px-6 py-6 text-gray-500" colSpan={9}>
                    Loading...
                  </td>
                </tr>
              )}
              {filteredProducts(searchTerm).map((p) => (
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

      <ProductModal
        isOpen={showAddModal}
        onClose={() => handleCloseModal()}
        initialData={editingItem}
        onSubmit={handleSubmit}
        categoryOptions={categoryOptions}
      />
    </div>
  );
};

export default ProductScreen;
