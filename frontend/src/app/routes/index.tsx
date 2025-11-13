import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LoginPage } from '../../features/auth/LoginPage';
import { HomePage } from '../../features/home/HomePage';

// Componente protegido
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export const routes = [
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/home',
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    )
  },
  {
    path: '/',
    element: <Navigate to="/login" replace />
  }
];
