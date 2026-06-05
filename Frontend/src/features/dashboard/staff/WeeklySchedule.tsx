import React from 'react';
import { Briefcase } from 'lucide-react';
import { type WorkSchedule } from '../../../types/dashboard/staff';

type WeeklyScheduleProps = {
  schedules: WorkSchedule[];
};

const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({ schedules }) => {
  // Hàm format ngày hôm nay về định dạng "Thu, Apr 11" (khớp với Mock Data)
  const getTodayString = () => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    };
    // Format trả về "Sat, Apr 11" (Xóa dấu phẩy sau tên thứ để khớp 'Mon, Apr 13')
    return new Intl.DateTimeFormat('en-US', options).format(new Date()).replace(',', '');
  };

  const todayStr = getTodayString();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <Briefcase className="w-5 h-5 text-purple-500" /> Weekly Schedule
      </h3>
      <div className="space-y-3">
        {schedules.length > 0 ? schedules.map((shift, idx) => {
          // So sánh chuỗi date từ data với ngày hiện tại
          const isToday = shift.date.replace(',','') === todayStr;

          return (
            <div 
              key={idx} 
              className={`p-3 shadow-sm rounded-lg border-l-4 transition-colors ${
                isToday 
                  ? 'bg-purple-100 border-purple-600 ring-1 ring-purple-200' 
                  : 'bg-gray-50 border-purple-500'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <p className="text-base font-bold text-gray-900">{shift.date}</p>
                  {isToday && (
                    <span className="bg-purple-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                      Today
                    </span>
                  )}
                </div>
                <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                  isToday ? 'bg-purple-300 text-purple-800' : 'bg-purple-100 text-purple-700'
                }`}>
                  {shift.shift}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mt-1">
                <span className={isToday ? 'font-semibold' : ''}>{shift.position}</span> • {shift.time}
              </p>

              {shift.note !== '-' && (
                <p className={`text-sm italic mt-1 ${isToday ? 'text-purple-700' : 'text-gray-400'}`}>
                  Note: {shift.note}
                </p>
              )}
            </div>
          );
        }) : (
          <div className="py-10 text-center text-lg text-gray-400">
            No shifts scheduled this week
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklySchedule;
