import React, { useEffect, useState } from 'react';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  createdAt: string;
  updatedAt: string;
};

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/product');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Carregando produtos...</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b">Produto</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b">Preço</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b">Estoque</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b">Criado em</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-4 py-6 text-center text-gray-400">
                Nenhum produto cadastrado.
              </td>
            </tr>
          ) : (
            products.map(product => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">R$ {product.price.toFixed(2)}</td>
                <td className="px-4 py-2">{product.stockQuantity}</td>
                <td className="px-4 py-2">{new Date(product.createdAt).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;