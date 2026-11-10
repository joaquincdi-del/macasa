'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [addedProductId, setAddedProductId] = useState(null);

  // 1. Cargar productos desde Supabase y sincronizar contador del carrito
  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.error('Error cargando productos:', error);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    }

    fetchProducts();
    updateCartCount();
  }, []);

  // Función para obtener la cantidad total de productos en localStorage
  const updateCartCount = () => {
    if (typeof window !== 'undefined') {
      const savedCart = JSON.parse(localStorage.getItem('ecommerce_cart') || '[]');
      const totalItems = savedCart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalItems);
    }
  };

  // 2. Función para agregar un producto al carrito en localStorage
  const addToCart = (product) => {
    const savedCart = JSON.parse(localStorage.getItem('ecommerce_cart') || '[]');
    const existingIndex = savedCart.findIndex((item) => item.id === product.id);

    if (existingIndex > -1) {
      savedCart[existingIndex].quantity += 1;
    } else {
      savedCart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }

    localStorage.setItem('ecommerce_cart', JSON.stringify(savedCart));
    updateCartCount();

    // Feedback visual breve en el botón
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1500);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <p className="text-gray-500 font-medium">Cargando catálogo...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado con contador de carrito */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Catálogo de Productos</h1>
          
          <Link
            href="/checkout"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition shadow-sm"
          >
            🛒 Carrito ({cartCount})
          </Link>
        </div>

        {/* Grilla de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition"
            >
              <div>
                <div className="h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={product.image || 'https://via.placeholder.com/400'}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs uppercase font-bold text-blue-600 tracking-wider bg-blue-50 px-2 py-1 rounded-md">
                    {product.category || 'General'}
                  </span>
                  <h2 className="text-lg font-bold text-gray-900 mt-2">{product.title}</h2>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>
                </div>
              </div>

              <div className="p-5 pt-0 mt-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-gray-900">
                    ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                  </span>
                  <Link
                    href={`/product/${product.id}`}
                    className="text-xs font-semibold text-gray-500 hover:text-gray-900 underline"
                  >
                    Ver Detalle
                  </Link>
                </div>

                {/* Botón de Agregar al Carrito */}
                <button
                  onClick={() => addToCart(product)}
                  className={`w-full py-2.5 rounded-xl font-semibold text-sm transition ${
                    addedProductId === product.id
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                >
                  {addedProductId === product.id ? '✓ ¡Añadido!' : 'Añadir al Carrito'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}