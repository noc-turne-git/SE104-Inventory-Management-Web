import { ShiftCalendarItem } from './ShiftCalendarItem';
import { type Shift } from '../../types/shift';

interface Props {
  shifts: Shift[];
  weekDates: Date[];
  onToday: () => void;
  onNextWeek: () => void;
  onPreviousWeek: () => void;
  onOpenEditModal: (shift : Shift) => void;
  onDelete: (id: string) => void;
}

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const formatDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const ShiftsCalendar = ({
  shifts,
  weekDates,
  onToday,
  onNextWeek,
  onPreviousWeek,
  onOpenEditModal,
  onDelete,
}: Props) => {
    return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {weekDates[0].toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h2>

        <div className="flex items-center gap-3">
          <button
            onClick={onToday}
            className="px-4 py-2 text-md border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Today
          </button>

          <div className="flex items-center gap-2">
            <button onClick={onPreviousWeek} className="p-2 hover:bg-gray-100 rounded-lg">
              {'<'}
            </button>
            <button onClick={onNextWeek} className="p-2 hover:bg-gray-100 rounded-lg">
              {'>'}
            </button>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-7 gap-4">
        {weekDates.map((date, index) => {
          const dateStr = formatDateKey(date);
          const dayShifts = shifts.filter(s => s.date === dateStr); // lọc ra những shift của ngày đó
          const isToday = date.toDateString() === new Date().toDateString(); // ngày hôm nay sẽ có UI hơi khác

          return (
            <div key={index} className="min-h-[200px]">
        
              <div className={`text-center mb-3 p-2 rounded-lg ${isToday ? 'bg-blue-100' : ''}`}>
                  <div className="text-sm text-gray-600 mb-1">{weekDays[index]}</div>
                  <div className={`text-lg font-semibold ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                      {date.getDate()}
                  </div>
              </div>

              <div className="space-y-2">
                  {dayShifts.map((shift) => (
                    <ShiftCalendarItem
                      key={shift.id}
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
