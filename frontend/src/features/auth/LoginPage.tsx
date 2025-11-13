import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { useAuthStore } from '../../app/store/authStore';

export function LoginPage() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMessage, setForgotMessage] = useState('');

  const navigate = useNavigate();
  const { setUser: setAuthUser, setIsAuthenticated } = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await authService.login(user, password);
      if (response.success) {
        setAuthUser(response.user);
        setIsAuthenticated(true);
        navigate('/home');
      } else {
        setError(response.message);
      }
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotMessage('');

    try {
      const response = await authService.forgotPassword(forgotEmail);
      if (response.success) {
        setForgotMessage(response.message);
        setTimeout(() => {
          setShowForgotPassword(false);
          setForgotEmail('');
          setForgotMessage('');
        }, 3000);
      }
    } catch (err: any) {
      setForgotMessage(err.message || 'Error al recuperar contraseña');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white rounded-full p-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-900 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">I</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">IntisCorp</h1>
          <p className="text-blue-100">Soluciones Empresariales</p>
        </div>

        {!showForgotPassword ? (
          /* Login Form */
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Iniciar Sesión</h2>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Usuario */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Usuario
                </label>
                <input
                  type="text"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  placeholder="Ingresa tu usuario"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Contraseña */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Botón Iniciar Sesión */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:from-blue-700 hover:to-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </button>
            </form>

            {/* Forgot Password Link */}
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="w-full mt-4 text-blue-600 font-semibold hover:text-blue-700 transition"
            >
              ¿Olvidé mi contraseña?
            </button>
          </div>
        ) : (
          /* Forgot Password Form */
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <button
              type="button"
              onClick={() => setShowForgotPassword(false)}
              className="text-blue-600 font-semibold mb-4 hover:text-blue-700 transition"
            >
              ← Volver
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recuperar Contraseña</h2>

            {forgotMessage && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
                {forgotMessage}
              </div>
            )}

            <form onSubmit={handleForgotPassword} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="Ingresa tu email"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:from-blue-700 hover:to-blue-800 transition shadow-lg"
              >
                Enviar Enlace
              </button>
            </form>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-blue-100 text-sm mt-8">
          © 2025 IntisCorp. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
