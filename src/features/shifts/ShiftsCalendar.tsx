import { Clock } from 'lucide-react';
import { ShiftCalendarItem } from './ShiftCalendarItem.tsx';
import { type Shift, type ShiftFormData } from '../../types/shift';
import { useShifts } from '../hooks/useShifts.tsx';

interface Props {
  shifts: Shift[];
  onOpenEditModal: (shift : Shift) => void;
  onDelete: (id: string) => void;
}

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const ShiftsCalendar = ({shifts, onOpenEditModal, onDelete,}: Props) => {
    const {weekDates, goToToday, goToNextWeek, goToPreviousWeek} = useShifts();

    return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {weekDates[0].toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h2>

        <div className="flex items-center gap-3">
          <button
            onClick={goToToday}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Today
          </button>

          <div className="flex items-center gap-2">
            <button onClick={goToPreviousWeek} className="p-2 hover:bg-gray-100 rounded-lg">
              {'<'}
            </button>
            <button onClick={goToNextWeek} className="p-2 hover:bg-gray-100 rounded-lg">
              {'>'}
            </button>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-7 gap-4">
        {weekDates.map((date, index) => {
          const dateStr = date.toISOString().split('T')[0];
          const dayShifts = shifts.filter(s => s.date === dateStr); // lọc ra những shift của ngày đó
          const isToday = date.toDateString() === new Date().toDateString(); // ngày hôm nay sẽ có UI hơi khác

          return (
            <div key={index} className="min-h-[200px]">
        
              <div className={`text-center mb-3 p-2 rounded-lg ${isToday ? 'bg-blue-100' : ''}`}>
                  <div className="text-xs text-gray-600 mb-1">{weekDays[index]}</div>
                  <div className={`text-lg font-semibold ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                      {date.getDate()}
                  </div>
              </div>

              <div className="space-y-2">
                  {dayShifts.map((shift) => (
                    <ShiftCalendarItem
                      shift={shift} onDelete={onDelete} onOpenEditModal={onOpenEditModal}>

                    </ShiftCalendarItem>
                  ))}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShiftsCalendar;