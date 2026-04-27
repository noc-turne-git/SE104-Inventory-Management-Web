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
    const stored = localStorage.getItem("warehouse");
    if (stored) {
      setState(JSON.parse(stored));
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
    <WarehouseContext.Provider value={{ ...state, setWarehouse, clearWarehouse }}>
      {children}
    </WarehouseContext.Provider>
  );
};

// custom hook 
export const useWarehouse = () => {
  const context = useContext(WarehouseContext);
  if (!context) {
    throw new Error("useWarehouse must be used within WarehouseProvider");
  }
  return context;
};