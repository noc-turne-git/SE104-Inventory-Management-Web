export interface Shift {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  position: string;
  assignedTo: string | null;
  status: 'filled' | 'empty' | 'urgent'; // đã có người nhận ca/ chưa có/ chưa có người + sắp tới
  shiftType: string;
  notes?: string;
}

export const ShiftTimes: { [key: string]: { start: string; end: string } } = {
  'Morning':   { start: '07:00', end: '15:00' }, 
  'Afternoon': { start: '15:00', end: '23:00' },
  'Night':     { start: '23:00', end: '07:00' },
};

export interface ShiftFormData extends Omit<Shift, 'id' | 'status'> {
  // id và status sẽ được xử lý logic lúc submit nên không cần trong form
  assignedTo: string;
  repeatWeekly: boolean;
  repeatCount: string;
}
