import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../../services/authService';

type Role = 'admin' | 'tecnico';

interface User {
	id: string;
	name: string;
	email: string;
	user: string;
	rol: Role;
}

interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	login: (user: string, password: string) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const saved = localStorage.getItem('user');
		if (saved) {
			try {
				setUser(JSON.parse(saved));
			} catch (e) {
				localStorage.removeItem('user');
			}
		}
	}, []);

	const login = async (username: string, password: string) => {
		setIsLoading(true);
		try {
			const res = await authService.login(username, password);
			if (res && res.success) {
				setUser(res.user);
				localStorage.setItem('user', JSON.stringify(res.user));
			} else {
				throw new Error(res?.message || 'Login failed');
			}
		} finally {
			setIsLoading(false);
		}
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem('user');
	};

	return (
		<AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
	return ctx;
};

