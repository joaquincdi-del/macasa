

export const dynamic = 'force-dynamic'; // Evita errores de pre-renderizado estático

import Link from 'next/link';
import productsData from '@/data/products.json';

export default async function ProductDetailPage({ params }) {
  // En versiones recientes de Next.js params es una promesa
  const { id } = await params;

  const product = productsData.find((p) => p.id.toString() === id);

  if (!product) {
    return <div className="p-8 text-center">Producto no encontrado</div>;
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <p className="text-2xl font-bold text-green-600 mt-4">${product.price}</p>
    </main>
  );

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