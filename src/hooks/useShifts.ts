import { useState } from 'react';
import { type Shift, type ShiftFormData } from '../types/shift';
import { MOCK_SHIFTS } from '../data/MOCK_SHIFTS';
import { toast } from 'sonner';

export const useShifts = () => {
  const [shifts, setShifts] = useState<Shift[]>(MOCK_SHIFTS);
  const [currentDate, setCurrentDate] = useState(new Date()); // mặc định là hôm nay

  const deleteShift = (id: string) => {
    setShifts(prev => prev.filter(s => s.id !== id));
    toast.success('Shift deleted');
  };

  const addShift = (formData : ShiftFormData) => {
    const assignedTo = formData.assignedTo.trim() || null;
    const status: 'filled' | 'empty' | 'urgent' = assignedTo ? 'filled' : 'empty';

    const shiftsToAdd: Shift[] = [];
      const repeatCount = formData.repeatWeekly ? parseInt(formData.repeatCount) : 1;
      
      for (let i = 0; i < repeatCount; i++) {
        const [year, month, day] = formData.date.split('-').map(Number);
        const shiftDate = new Date(year, month - 1, day); // month - 1 vì tháng trong JS bắt đầu từ 0
        
        shiftDate.setDate(shiftDate.getDate() + (i * 7)); 

        // Format lại YYYY-MM-DD mà không dùng toISOString
        const y = shiftDate.getFullYear();
        const m = String(shiftDate.getMonth() + 1).padStart(2, '0');
        const d = String(shiftDate.getDate()).padStart(2, '0');
        const formattedDate = `${y}-${m}-${d}`;
                
        const newShift: Shift = {
          id: Date.now().toString() + '-' + i,
          date: formattedDate,
          startTime: formData.startTime,
          endTime: formData.endTime,
          position: formData.position,
          assignedTo,
          shiftType: formData.shiftType,
          notes: formData.notes,
          status,
        };
        shiftsToAdd.push(newShift);
      }
      
      setShifts([...shifts, ...shiftsToAdd]);
      toast.success(`${shiftsToAdd.length} shift(s) added successfully`);
    };

    const updateShift = (id: string, formData: ShiftFormData) => {
        const assignedTo = formData.assignedTo.trim() || null;
        const status: 'filled' | 'empty' | 'urgent' = assignedTo ? 'filled' : 'empty';

        setShifts(shifts.map(s => 
            s.id === id 
            ? { 
                ...s, 
                date: formData.date,
                startTime: formData.startTime,
                endTime: formData.endTime,
                position: formData.position,
                assignedTo,
                shiftType: formData.shiftType,
                notes: formData.notes,
                status 
                }
            : s
        ));
        toast.success('Shift updated successfully');
    };

    //CALENDAR
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

    return {
        shifts, setShifts, currentDate, setCurrentDate,
        deleteShift, addShift, updateShift, 
        weekDates, goToToday, goToNextWeek, goToPreviousWeek
    };
};