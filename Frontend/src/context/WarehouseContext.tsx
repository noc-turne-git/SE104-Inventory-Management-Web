import { createContext, useContext, useState } from "react";

type Role = "user" | "owner" | "manager" | "staff" | null;

interface WarehouseState {
  role: Role;
  warehouseId: number | null;
  warehouseName: string | null;
}

interface WarehouseContextType extends WarehouseState {
  setWarehouse: (data: WarehouseState) => void;
  clearWarehouse: () => void;
  loading: boolean;
}

const WarehouseContext = createContext<WarehouseContextType | undefined>(undefined);

const emptyWarehouseState: WarehouseState = {
  role: null,
  warehouseId: null,
  warehouseName: null,
};

const normalizeWarehouseState = (data: Partial<WarehouseState>): WarehouseState => ({
  role: data.role ?? null,
  warehouseName: data.warehouseName ?? null,
  warehouseId: data.warehouseId ? Number(data.warehouseId) : null,
});

const getInitialWarehouseState = (): WarehouseState => {
  try {
    const stored = localStorage.getItem("warehouse");

    if (!stored) {
      return emptyWarehouseState;
    }

    const parsed = JSON.parse(stored);

    return normalizeWarehouseState(parsed);
  } catch {
    console.error("Invalid warehouse data in localStorage");
    localStorage.removeItem("warehouse");
    return emptyWarehouseState;
  }
};

export const WarehouseProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<WarehouseState>(getInitialWarehouseState);
  const [loading] = useState(false);
  
  // Đảm bảo luôn lưu number
  const setWarehouse = (data: WarehouseState) => {
    const normalized = normalizeWarehouseState(data);
    setState(normalized);
    localStorage.setItem("warehouse", JSON.stringify(normalized));
  };

  const clearWarehouse = () => {
    setState(emptyWarehouseState);
    localStorage.removeItem("warehouse");
  };

  return (
    <WarehouseContext.Provider 
      value={{ ...state, setWarehouse, clearWarehouse, loading }}>
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
