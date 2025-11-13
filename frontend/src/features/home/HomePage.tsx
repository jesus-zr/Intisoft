import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../app/store/authStore';

export function HomePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">IntisCorp</h1>
            <p className="text-blue-100 text-sm">Soluciones Empresariales</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-semibold transition"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">
                ¡Bienvenido, <span className="text-blue-600">{user.nombre}</span>!
              </h2>
              <p className="text-gray-600 text-lg">
                Te has conectado exitosamente a IntisCorp
              </p>
            </div>
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-4xl">
                {user.nombre.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* User Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Información de Perfil */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Información de Perfil</h3>
            <div className="space-y-4">
              <div className="border-b pb-3">
                <p className="text-sm text-gray-600">Usuario</p>
                <p className="text-lg font-semibold text-gray-800">{user.user}</p>
              </div>
              <div className="border-b pb-3">
                <p className="text-sm text-gray-600">Nombre Completo</p>
                <p className="text-lg font-semibold text-gray-800">{user.nombre}</p>
              </div>
              <div className="border-b pb-3">
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-lg font-semibold text-gray-800">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Rol</p>
                <p className="text-lg font-semibold text-blue-600">{user.rol}</p>
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Dashboard</h3>
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                <p className="text-sm text-gray-600">Estado</p>
                <p className="text-2xl font-bold text-blue-600">Conectado</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                <p className="text-sm text-gray-600">Último acceso</p>
                <p className="text-lg font-semibold text-green-600">{new Date().toLocaleString('es-ES')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modules / Features */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Módulos Disponibles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition cursor-pointer">
              <div className="text-3xl mb-2">📊</div>
              <h4 className="font-semibold text-gray-800">Reportes</h4>
              <p className="text-sm text-gray-600">Análisis y reportes detallados</p>
            </div>
            <div className="p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition cursor-pointer">
              <div className="text-3xl mb-2">💼</div>
              <h4 className="font-semibold text-gray-800">Empresas</h4>
              <p className="text-sm text-gray-600">Gestión de empresas</p>
            </div>
            <div className="p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition cursor-pointer">
              <div className="text-3xl mb-2">💬</div>
              <h4 className="font-semibold text-gray-800">Chat</h4>
              <p className="text-sm text-gray-600">Comunicación interna</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
