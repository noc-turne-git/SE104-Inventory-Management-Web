import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {type User} from '../types/user'

interface AuthContextType {
  user: User | null;
  setUser: (userData: User) => void;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  // Kiểm tra xem có user đã lưu trong máy chưa khi load trang
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    navigate('/warehouse', {replace: false});
    //localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    navigate('/home', {replace: true});
    //localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook để sử dụng nhanh ở các component khác
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};