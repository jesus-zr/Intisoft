import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../../services/authService';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const res = await authService.forgotPassword(email);
      if (res && res.success) setMessage(res.message);
      else setError(res?.message || 'Error');
    } catch (err: any) {
      setError(err?.message || 'Error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Recuperar Contraseña</h2>
        {message && <div className="p-2 mb-4 text-sm text-green-700 bg-green-100 rounded">{message}</div>}
        {error && <div className="p-2 mb-4 text-sm text-red-700 bg-red-100 rounded">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} className="w-full border px-3 py-2 rounded" />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">Enviar enlace</button>
        </form>
        <div className="mt-4 text-sm text-center">
          <Link to="/login" className="text-indigo-600">Volver al login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
