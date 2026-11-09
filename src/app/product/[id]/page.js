'use client';

import { use } from 'react';
import Link from 'next/link';
import productsData from '@/data/products.json';

export default function ProductDetailPage({ params }) {
  // Desempaquetar los parámetros dinámicos de la URL
  const { id } = use(params);

  // Buscar el producto correspondiente en el JSON local
  const product = productsData.find((item) => item.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Producto no encontrado</h1>
        <p className="text-gray-500 mb-6">El producto que buscas no existe en el catálogo.</p>
        <Link href="/" className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition">
          Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Botón para regresar */}
        <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-6 transition">
          ← Volver al catálogo
        </Link>

        {/* Tarjeta de Detalle del Producto */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
          {/* Imagen */}
          <div className="w-full h-80 md:h-96 rounded-xl overflow-hidden bg-gray-100">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Información del Producto */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase font-bold text-blue-600 tracking-wider bg-blue-50 px-2.5 py-1 rounded-md">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mt-3">{product.title}</h1>
              <p className="text-2xl font-bold text-gray-900 mt-2">${product.price.toFixed(2)}</p>
              
              <div className="border-t border-b border-gray-100 my-6 py-4">
                <h2 className="text-sm font-semibold text-gray-700 mb-2">Descripción:</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
              </div>
            </div>

            {/* Acción de compra */}
            <button
              onClick={() => alert(`¡${product.title} añadido al carrito!`)}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3.5 rounded-xl font-semibold transition"
            >
              Añadir al Carrito
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}