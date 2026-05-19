import { useCallback, useEffect, useState } from "react";
import { isAxiosError } from "axios";
import staffApi from "../api/StaffAPI";
import infractionApi from "../api/InfractionAPI";
import { type Staff, type Infractions } from "../types/staff";
import { toast } from "sonner";

type StaffInput = Omit<Staff, "id" | "infractions">;

const roleIdByName: Record<Staff["role"], number> = {
  Manager: 2,
  Staff: 3,
};

const normalizeStaff = (staff: Staff): Staff => ({
  ...staff,
  role: staff.role === "Manager" ? "Manager" : "Staff",
  accountStatus: staff.accountStatus === "Inactive" ? "Inactive" : "Active",
  salary: Number(staff.salary ?? 0),
  hireDate: staff.hireDate || "",
  infractions: Array.isArray(staff.infractions) ? staff.infractions : [],
});

const getStaffErrorMessage = (err: unknown, fallback: string) => {
  if (!isAxiosError(err)) return fallback;
  if (!err.response) return "Cannot connect to server. Please check your network.";
  return err.response.data?.message || fallback;
};

const toApiDate = (datetime?: string) => {
  const date = datetime ? new Date(datetime) : new Date();
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
};

export const useStaff = (warehouseId?: number | null) => {
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchStaffs = useCallback(async () => {
    if (!warehouseId) {
      setStaffs([]);
      return false;
    }

    setLoading(true);
    try {
      const res = await staffApi.getAll(warehouseId);
      setStaffs((res.data || []).map(normalizeStaff));
      return true;
    } catch (err: unknown) {
      toast.error(getStaffErrorMessage(err, "Failed to fetch staff"));
      return false;
    } finally {
      setLoading(false);
    }
  }, [warehouseId]);

  useEffect(() => {
    void fetchStaffs();
  }, [fetchStaffs]);

  const addStaff = useCallback(async (_data: StaffInput) => {
    toast.error("Create staff API is not available yet. Please invite staff from Warehouse Management.");
    return false;
  }, []);

  const updateStaff = useCallback(
    async (id: string, data: StaffInput) => {
      if (!warehouseId) {
        toast.error("No warehouse selected");
        return false;
      }

      try {
        await staffApi.update(warehouseId, id, {
          accountStatus: data.accountStatus,
          salary: data.salary,
          hireDate: data.hireDate,
          roleId: roleIdByName[data.role],
        });

        await fetchStaffs();
        toast.success("Staff updated successfully");
        return true;
      } catch (err: unknown) {
        toast.error(getStaffErrorMessage(err, "Update failed"));
        return false;
      }
    },
    [fetchStaffs, warehouseId],
  );

  const deleteStaff = useCallback(async (_id: string) => {
    toast.error("Delete staff API is not available yet.");
    return false;
  }, []);

  const addInfraction = useCallback(
    async (staffId: string, data: Omit<Infractions, "id">) => {
      if (!warehouseId) {
        toast.error("No warehouse selected");
        return false;
      }

      const userId = Number(staffId);
      if (!Number.isInteger(userId)) {
        toast.error("Invalid staff id");
        return false;
      }

      try {
        await infractionApi.create(warehouseId, {
          userId,
          date: toApiDate(data.datetime),
          description: data.reason,
          penalty: data.penalty,
        });

        await fetchStaffs();
        toast.success("Infraction added");
        return true;
      } catch (err: unknown) {
        toast.error(getStaffErrorMessage(err, "Failed to add infraction"));
        return false;
      }
    },
    [fetchStaffs, warehouseId],
  );

  return {
    staffs,
    loading,
    refetch: fetchStaffs,
    addStaff,
    updateStaff,
    deleteStaff,
    addInfraction,
  };
};
