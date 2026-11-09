
import Link from 'next/link';
import productsData from '@/data/products.json';

// Genera las rutas estáticas para cada producto durante la compilación
export async function generateStaticParams() {
  return productsData.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  // Buscar producto por ID
  const product = productsData.find((p) => p.id.toString() === id);

  if (!product) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full text-center">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Producto no encontrado</h1>
          <p className="text-gray-500 text-sm mb-6">El producto que buscas no existe o fue removido.</p>
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition"
          >
            Volver al catálogo
          </Link>
        </div>
      </main>
    );
  }

  // Soporte para name/title y price numérico
  const title = product.title || product.name;
  const price = typeof product.price === 'number' ? product.price.toFixed(2) : product.price;

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Botón para regresar */}
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-6 transition"
        >
          ← Volver al catálogo
        </Link>

        {/* Tarjeta de Detalle del Producto */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
          {/* Imagen */}
          <div className="w-full h-80 md:h-96 rounded-xl overflow-hidden bg-gray-100">
            <img 
              src={product.image || 'https://via.placeholder.com/400'} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Información del Producto */}
          <div className="flex flex-col justify-between">
            <div>
              {product.category && (
                <span className="text-xs uppercase font-bold text-blue-600 tracking-wider bg-blue-50 px-2.5 py-1 rounded-md">
                  {product.category}
                </span>
              )}
              <h1 className="text-3xl font-bold text-gray-900 mt-3">{title}</h1>
              <p className="text-2xl font-bold text-gray-900 mt-2">${price}</p>
              
              <div className="border-t border-b border-gray-100 my-6 py-4">
                <h2 className="text-sm font-semibold text-gray-700 mb-2">Descripción:</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
              </div>
            </div>

            {/* Redirección al checkout */}
            <Link
              href="/checkout"
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3.5 rounded-xl font-semibold transition text-center block"
            >
              Proceder al Checkout
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}