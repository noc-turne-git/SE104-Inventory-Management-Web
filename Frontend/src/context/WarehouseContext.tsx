import { createContext, useContext, useState, useEffect } from "react";

type Role = "user" | "manager" | "staff" | null;

interface WarehouseState {
  role: Role;
  warehouseId: number | null;
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

  // normalize data từ localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("warehouse");

      if (stored) {
        const parsed = JSON.parse(stored);

        const normalized: WarehouseState = {
          role: parsed.role ?? null,
          warehouseName: parsed.warehouseName ?? null,
          warehouseId: parsed.warehouseId ? Number(parsed.warehouseId) : null,
        };
        setState(normalized);
      }
    } catch (err) {
      console.error("Invalid warehouse data in localStorage");
      localStorage.removeItem("warehouse");
    }
  }, []);

  // Đảm bảo luôn lưu number
  const setWarehouse = (data: WarehouseState) => {
    const normalized: WarehouseState = {
      ...data, warehouseId: data.warehouseId ? Number(data.warehouseId) : null,
    }
    setState(normalized);
    localStorage.setItem("warehouse", JSON.stringify(normalized));
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