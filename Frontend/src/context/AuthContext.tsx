import React, { createContext, useContext, useState } from 'react';
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
  const [user, setUser] = useState<User | null>(()=> {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const navigate = useNavigate();

  

  const login = (userData: User) => {
    // setUser(userData);
    // console.log(user?.role);
    // console.log(user?.email);
    // navigate('/warehouse', {replace: false});

    setUser(userData);
    //console.log(userData.role); // Chắc chắn sẽ ra 'staff'
    console.log(userData.email); // Chắc chắn sẽ ra 'bob@example.com'
    navigate('/warehouse');
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    navigate('/home', {replace: true});
    localStorage.removeItem('user');
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