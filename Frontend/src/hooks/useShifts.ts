import { useCallback, useEffect, useState } from 'react';
import { type Shift, type ShiftFormData } from '../types/shift';
import { toast } from 'sonner';
import shiftApi from '../api/ShiftAPI';
import { useWarehouseContext } from '../context/WarehouseContext';
import { isAxiosError } from 'axios';

export const useShifts = () => {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const { warehouseId } = useWarehouseContext();

  const fetchShifts = useCallback(async () => {
    if (!warehouseId) {
      setShifts([]);
      return;
    }

    try {
      setShifts([]);
      const res = await shiftApi.getAll(warehouseId);
      setShifts(res.data || []);
    } catch (err: unknown) {
      setShifts([]);
      if (!isAxiosError(err)) toast.error('Failed to fetch shifts');
      else toast.error(err.response?.data?.message || 'Failed to fetch shifts');
    }
  }, [warehouseId]);

  useEffect(() => {
    void fetchShifts();
  }, [fetchShifts]);

  const toIsoDateTime = (date: string, time: string): string => {
    return new Date(`${date}T${time}:00`).toISOString();
  };

  const resolveAssignedUserId = (assignedTo: string): number | null => {
    const trimmed = assignedTo.trim();
    if (!trimmed) return null;

    const parsed = Number(trimmed);
    return Number.isInteger(parsed) ? parsed : null;
  };

  const deleteShift = async (id: string) => {
    if (!warehouseId) {
      toast.error('No warehouse selected');
      return;
    }

    try {
      await shiftApi.delete(warehouseId, id);
      setShifts((prev) => prev.filter((s) => s.id !== id));
      toast.success('Shift deleted');
    } catch (err: unknown) {
      if (!isAxiosError(err)) toast.error('Failed to delete shift');
      else toast.error(err.response?.data?.message || 'Failed to delete shift');
    }
  };

  const addShift = async (formData: ShiftFormData) => {
    if (!warehouseId) {
      toast.error('No warehouse selected');
      return;
    }

    try {
      const repeatCount = formData.repeatWeekly ? parseInt(formData.repeatCount, 10) : 1;
      const userId = resolveAssignedUserId(formData.assignedTo);

      const requests: Promise<unknown>[] = [];

      for (let i = 0; i < repeatCount; i++) {
        const [year, month, day] = formData.date.split('-').map(Number);
        const shiftDate = new Date(year, month - 1, day);
        shiftDate.setDate(shiftDate.getDate() + (i * 7));

        const y = shiftDate.getFullYear();
        const m = String(shiftDate.getMonth() + 1).padStart(2, '0');
        const d = String(shiftDate.getDate()).padStart(2, '0');
        const date = `${y}-${m}-${d}`;

        requests.push(
          shiftApi.create(warehouseId, {
            startTime: toIsoDateTime(date, formData.startTime),
            endTime: toIsoDateTime(date, formData.endTime),
            userId,
            duty: formData.position,
            note: formData.notes || '',
          })
        );
      }

      await Promise.all(requests);
      await fetchShifts();
      toast.success(`${repeatCount} shift(s) added successfully`);
    } catch (err: unknown) {
      if (!isAxiosError(err)) toast.error('Failed to add shift');
      else toast.error(err.response?.data?.message || 'Failed to add shift');
    }
  };

  const updateShift = async (id: string, formData: ShiftFormData) => {
    if (!warehouseId) {
      toast.error('No warehouse selected');
      return;
    }

    try {
      const userId = resolveAssignedUserId(formData.assignedTo);
      await shiftApi.update(warehouseId, id, {
        startTime: toIsoDateTime(formData.date, formData.startTime),
        endTime: toIsoDateTime(formData.date, formData.endTime),
        userId,
        duty: formData.position,
        note: formData.notes || '',
      });

      await fetchShifts();
      toast.success('Shift updated successfully');
    } catch (err: unknown) {
      if (!isAxiosError(err)) toast.error('Failed to update shift');
      else toast.error(err.response?.data?.message || 'Failed to update shift');
    }
  };

  const getWeekDates = () => {
    const week: Date[] = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      week.push(date);
    }

    return week;
  };

  const weekDates = getWeekDates();

  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getTotalShifts = () => shifts.length;
  const getEmptyShiftsCount = () => shifts.filter((shift) => shift.status === 'empty').length;
  const getUrgentCoverageCount = () => shifts.filter((shift) => shift.status === 'urgent').length;

  return {
    shifts,
    setShifts,
    currentDate,
    setCurrentDate,
    deleteShift,
    addShift,
    updateShift,
    weekDates,
    goToToday,
    goToNextWeek,
    goToPreviousWeek,
    fetchShifts,
    getTotalShifts,
    getEmptyShiftsCount,
    getUrgentCoverageCount,
  };
};
