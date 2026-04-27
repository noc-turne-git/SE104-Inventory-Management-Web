import { createContext, useContext, useState, useEffect } from "react";

type Role = "user" | "manager" | "staff" | null;

interface WarehouseState {
  role: Role;
  warehouseId: string | null;
  warehouseName: string | null;
}

interface WarehouseContextType extends WarehouseState {
  setWarehouse: (data: WarehouseState) => void;
  clearWarehouse: () => void;
}

const WarehouseContext = createContext<WarehouseContextType | undefined>(undefined);

export const WarehouseProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<WarehouseState>({
    role: null,
    warehouseId: null,
    warehouseName: null,
  });

  // load từ localStorage (persist login)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("warehouse");
      if (stored) {
        setState(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Invalid warehouse data in localStorage");
      localStorage.removeItem("warehouse");
    }
  }, []);

  const setWarehouse = (data: WarehouseState) => {
    setState(data);
    localStorage.setItem("warehouse", JSON.stringify(data));
  };

  const clearWarehouse = () => {
    setState({
      role: null,
      warehouseId: null,
      warehouseName: null,
    });
    localStorage.removeItem("warehouse");
  };

  return (
    <WarehouseContext.Provider 
      value={{ ...state, setWarehouse, clearWarehouse }}>
      {children}
    </WarehouseContext.Provider>
  );
};

// custom hook 
export const useWarehouseContext = () => {
  const context = useContext(WarehouseContext);
  if (!context) {
    throw new Error("useWarehouse must be used within WarehouseProvider");
  }
  return context;
};