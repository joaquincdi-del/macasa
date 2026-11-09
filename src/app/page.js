'use client';

import { useState, useEffect } from 'react';
import productsData from '@/data/products.json';
import Link from 'next/link';

export default function HomePage() {
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false); // Evita parpadeos de contenido durante la carga inicial

  // FUNCION LOGIN

const [user, setUser] = useState(null);

useEffect(() => {
  // Leer el usuario si existe al cargar
  const savedUser = localStorage.getItem('ecommerce_user');
  if (savedUser) {
    setUser(JSON.parse(savedUser));
  }
}, []);

const handleLogout = () => {
  localStorage.removeItem('ecommerce_user');
  setUser(null);
};

  // 1. Cargar el carrito guardado en LocalStorage cuando se monta el componente
  useEffect(() => {
    const savedCart = localStorage.getItem('ecommerce_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error al leer el carrito de LocalStorage:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // 2. Guardar el carrito en LocalStorage cada vez que la variable `cart` cambia
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('ecommerce_cart', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  

  // Funciones para modificar el carrito (addToCart, removeFromCart...)
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Función opcional para vaciar el carrito por completo
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('ecommerce_cart');
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);


  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-900">Mi Tienda Online</h1>
          <header className="flex justify-between items-center py-4 border-b mb-6">
  <h1 className="text-xl font-bold">MaCasa Store</h1>

  <div className="flex items-center gap-4">
  {!user ? (
  <div className="flex items-center gap-3 text-sm">
    <Link href="/login" className="text-gray-600 hover:text-gray-900 font-medium">
      Iniciar Sesión
    </Link>
    <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-lg font-semibold transition">
      Registrarse
    </Link>
  </div>
) : (
  <div className="flex items-center gap-3">
    <span className="text-sm font-medium text-gray-700">
      Hola, <b>{user.name}</b> ({user.role === 'admin' ? '👑 Admin' : '🛍️ Cliente'})
    </span>
    <button onClick={handleLogout} className="text-xs text-red-500 hover:underline font-semibold">
      Cerrar Sesión
    </button>
  </div>
)}
  </div>
</header>
          <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
            🛒 Carrito: {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Grilla de Catálogo (2 Columnas en escritorio) */}
          <section className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
  {productsData.map((product) => (
    <div 
      key={product.id} 
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between"
    >
      {/* Enlace que envuelve la imagen y el título */}
      <Link href={`/product/${product.id}`} className="block hover:opacity-95 transition">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-48 object-cover" 
        />
        <div className="p-4">
          <span className="text-xs uppercase font-bold text-blue-500 tracking-wider">
            {product.category}
          </span>
          <h2 className="text-lg font-semibold text-gray-800 mt-1">
            {product.title}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {product.description}
          </p>
        </div>
      </Link>

      {/* Precio y Botón de Añadir */}
      <div className="p-4 pt-0 flex items-center justify-between">
        <span className="text-xl font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </span>
        <button
          onClick={() => addToCart(product)}
          className="bg-gray-900 hover:bg-gray-800 text-white text-sm px-4 py-2 rounded-lg transition"
        >
          Añadir
        </button>
      </div>
    </div>
  ))}
</section>

          {/* Lateral del Carrito (1 Columna) */}
          <aside className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Resumen de Compra</h2>
            {cart.length === 0 ? (
              <p className="text-gray-400 text-sm">Tu carrito está vacío.</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm border-b pb-2">
                    <div>
                      <p className="font-semibold text-gray-800">{item.title}</p>
                      <p className="text-gray-500">${item.price.toFixed(2)} x {item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-gray-200 px-2 py-0.5 rounded text-gray-700 hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="font-bold">{item.quantity}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-gray-200 px-2 py-0.5 rounded text-gray-700 hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
                <div className="pt-2 flex justify-between items-center text-lg font-bold text-gray-900">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => alert('¡Checkout de prueba completado!')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition mt-4"
                >
                 <Link
  href="/checkout"
  className="block text-center w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition mt-4"
>
  Continuar al Pago
</Link>
                </button>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}