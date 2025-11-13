import React from 'react';
import { useAuth } from '../../app/context/AuthContext';

const Home: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">IntisCorp - Home</h1>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-500">{user?.name}</div>
              <div className="text-xs text-gray-400">{user?.rol}</div>
            </div>
            <button onClick={logout} className="px-3 py-1 bg-red-600 text-white rounded">Cerrar Sesión</button>
          </div>
        </div>
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Bienvenido, {user?.name}</h2>
          <p className="text-sm text-gray-600">Aquí verás el contenido de tu panel.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
