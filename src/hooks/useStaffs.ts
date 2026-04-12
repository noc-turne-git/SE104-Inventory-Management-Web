import { useState } from "react";
import { type Staff, type Infractions } from "../types/staff";
import { toast } from "sonner";

export const useStaff = (initialData: Staff[]) => {
  const [staffs, setStaffs] = useState<Staff[]>(initialData);

  // clean function
  const cleanInfractions = (infractions: Infractions[]) => {
    const now = new Date();

    return infractions.filter(i => {
      const diff =
        (now.getTime() - new Date(i.datetime).getTime()) /
        (1000 * 60 * 60 * 24);

      return diff <= 30;
    });
  };

  // add staff
  const addStaff = (data: Omit<Staff, "id" | "infractions">) => {
    const newStaff: Staff = {
      ...data,
      id: Date.now().toString(),
      infractions: []
    };

    setStaffs(prev => [...prev, newStaff]);
    toast.success("Staff added");
  };

  // update staff
  const updateStaff = (id: string, data: Omit<Staff, "id" | "infractions">) => {
    setStaffs(prev =>
      prev.map(s => (s.id === id ? { ...s, ...data } : s))
    );
    toast.success("Staff updated");
  };

  // delete staff
  const deleteStaff = (id: string) => {
    setStaffs(prev => prev.filter(s => s.id !== id));
    toast.success("Staff deleted");
  };

  // add infraction 
  const addInfraction = (staffId: string, data: Omit<Infractions, "id">) => {
    const newInfraction: Infractions = {
      ...data,
      id: Date.now().toString()
    };

    setStaffs(prev =>
      prev.map(s => {
        if (s.id !== staffId) return s;

        const updated = [...s.infractions, newInfraction];

        return {
          ...s,
          infractions: cleanInfractions(updated) // clean ngay tại đây
        };
      })
    );

    toast.success("Infraction added");
  };

  return {
    staffs,
    addStaff,
    updateStaff,
    deleteStaff,
    addInfraction
  };
};