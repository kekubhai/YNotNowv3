import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  user: any;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('ynn3_token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetch('http://localhost:3000/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => {
          if (res.status === 404) {
            try {
              const decoded: any = jwtDecode(token);
              setUser({ email: decoded.email, id: decoded.id });
            } catch {
              setUser(null);
            }
            return null;
          }
          return res.ok ? res.json() : null;
        })
        .then(data => {
          if (data && data.user) setUser(data.user);
        })
        .catch(() => setUser(null));
    } else {
      setUser(null);
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Sign in failed');
    localStorage.setItem('token', data.token);
    setToken(data.token);
    navigate('/');
  };

  const signup = async (email: string, password: string) => {
    const res = await fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Sign up failed');
    localStorage.setItem('ynn3_token', data.token);
    setToken(data.token);
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('ynn3_token');
    setToken(null);
    setUser(null);
    navigate('/signin');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
