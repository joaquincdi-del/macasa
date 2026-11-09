'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CheckoutPage() {

  // En src/app/checkout/page.js
useEffect(() => {
  const savedUser = localStorage.getItem('ecommerce_user');
  if (savedUser) {
    const user = JSON.parse(savedUser);
    setFormData((prev) => ({
      ...prev,
      email: user.email,
      fullName: user.name,
    }));
  }
}, []);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'card',
  });

  const [isCompleted, setIsCompleted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Limpiar el carrito guardado en el navegador
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ecommerce_cart');
    }

    // 2. Mostrar la pantalla de éxito
    setIsCompleted(true);
  };

  if (isCompleted) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
            ✓
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">¡Pedido Confirmado!</h1>
          <p className="text-gray-600 text-sm mb-6">
            Gracias por tu compra, <span className="font-semibold text-gray-800">{formData.fullName}</span>. Hemos enviado la confirmación a <span className="font-semibold text-gray-800">{formData.email}</span>.
          </p>
          <Link
            href="/"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Volver a la Tienda
          </Link>
        </div>
      </main>
    );
  }



  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-6 transition">
          ← Volver al catálogo
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Finalizar Compra</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sección de Datos Personales */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">1. Datos de Envío</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Nombre Completo</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Ej. Juan Pérez"
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="correo@ejemplo.com"
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Dirección de Calle</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Av. Principal #123, Col. Centro"
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Ciudad</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Ciudad de México"
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Código Postal</label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="01000"
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Sección de Método de Pago */}
            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">2. Método de Pago</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 border p-3.5 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-800">Tarjeta de Crédito / Débito (Simulación)</span>
                </label>
                <label className="flex items-center gap-3 border p-3.5 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="transfer"
                    checked={formData.paymentMethod === 'transfer'}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-800">Transferencia Bancaria</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3.5 rounded-xl font-semibold transition mt-6"
            >
              Confirmar y Pagar
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}