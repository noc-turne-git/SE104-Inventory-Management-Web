import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {type User} from '../types/user'
import { useWarehouseContext } from "./WarehouseContext";

interface AuthContextType {
  user: User | null;
  // setUser: (userData: User) => void;
  signin: (userData: User) => void;
  signout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { clearWarehouse } = useWarehouseContext();
  const [user, setUser] = useState<User | null>(()=> {    
    try {      
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const navigate = useNavigate();

  const signin = (userData: User) => {
    // setUser(userData);
    // console.log(user?.role);
    // console.log(user?.email);
    // navigate('/warehouse', {replace: false});

    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    console.log(userData); // Chắc chắn sẽ ra 'staff'
    console.log(userData.email); // Chắc chắn sẽ ra 'bob@example.com'
    navigate('/warehouse');
  };

  const signout = () => {
    setUser(null);
    clearWarehouse();
    localStorage.removeItem('user');
    navigate('/home', {replace: true});
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
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