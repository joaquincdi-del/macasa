'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulación de autenticación (guardamos un usuario en LocalStorage)
    const userData = {
      email: email,
      name: email.split('@')[0], // Usamos la primera parte del correo como nombre
      isLoggedIn: true,
    };

    localStorage.setItem('ecommerce_user', JSON.stringify(userData));

    // Redirigir al catálogo principal
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">Iniciar Sesión</h1>
        <p className="text-gray-500 text-sm mb-6 text-center">Accede a tu cuenta de MaCasa</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Correo Electrónico</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="cliente@ejemplo.com"
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Contraseña</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition mt-2"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-800 transition">
            ← Volver a la Tienda
          </Link>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500 space-y-2">
  <p>
    ¿No tienes una cuenta?{' '}
    <Link href="/register" className="text-blue-600 font-semibold hover:underline">
      Regístrate aquí
    </Link>
  </p>
  <div>
    <Link href="/" className="text-xs text-gray-400 hover:text-gray-700 transition">
      ← Volver a la Tienda
    </Link>
  </div>
</div>
      </div>
    </main>
  );
}