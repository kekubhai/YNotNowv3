import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  user: any;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username?: string) => Promise<void>;
  logout: () => void;
}

// Add interface for decoded token
interface DecodedToken {
  email: string;
  username?: string;
  userId: string;
  exp: number;
  iat: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('ynn3_token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        // Properly type the decoded token
        const decoded = jwtDecode<DecodedToken>(token);
        
        // Check token expiration
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          console.log("Token expired, logging out");
          logout();
          return;
        }
        
        setUser({
          email: decoded.email,
          username: decoded.username || decoded.email.split('@')[0],
          userId: decoded.userId,
        });
        
        // Then fetch complete user details from server
        fetch('http://localhost:3000/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then(res => {
            if (!res.ok) {
              if (res.status === 401) {
                // Token is invalid or expired according to server
                throw new Error('Invalid authentication');
              }
              throw new Error('Failed to get user data');
            }
            return res.json();
          })
          .then(data => {
            if (data && data.user) {
              setUser(prevUser => ({
                ...prevUser,
                ...data.user,
                username: data.user.username || prevUser.username,
                photoURL: data.user.photoURL || null
              }));
            }
          })
          .catch((error) => {
            console.error("Error fetching user details:", error);
            if (error.message === 'Invalid authentication') {
              // Only logout if token was explicitly rejected
              logout();
            }
          });
      } catch (error) {
        console.error("Token decode error:", error);
        // Token is invalid, remove it
        localStorage.removeItem('ynn3_token');
        setToken(null);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Sign in failed');
      
      localStorage.setItem('ynn3_token', data.ynn3_token);
      setToken(data.ynn3_token);
      navigate('/');
    } catch (error: any) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const signup = async (email: string, password: string, username?: string) => {
    try {
      const res = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, username }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Sign up failed');
      
      localStorage.setItem('ynn3_token', data.ynn3_token);
      setToken(data.ynn3_token);
      navigate('/');
    } catch (error: any) {
      console.error("Signup error:", error);
      throw error;
    }
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
