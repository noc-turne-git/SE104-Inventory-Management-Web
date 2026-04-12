import React from 'react';
import {type LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

// Định nghĩa kiểu dữ liệu cho từng Card
export interface StatItem {
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  description: string;
  icon: LucideIcon;
  iconColor: string; // VD: "text-blue-600"
  bgColor: string;   // VD: "bg-blue-50"
}

interface StatsCardsProps {
  data: StatItem[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {data.map((stat, i) => (
        <div 
          key={i} 
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-4">
            {/* Icon bao quanh bởi nền màu nhạt */}
            <div className={`${stat.bgColor} p-3 rounded-lg`}>
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
            
            {/* Badge hiển thị % tăng trưởng */}
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-bold ${
              stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 
              stat.trend === 'down' ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-600'
            }`}>
              {stat.change}
              {stat.trend === 'up' && <ArrowUpRight className="w-3 h-3" />}
              {stat.trend === 'down' && <ArrowDownRight className="w-3 h-3" />}
            </div>
          </div>

          <div>
            <p className="text-md font-semibold text-gray-400 uppercase tracking-wider">
              {stat.title}
            </p>
            <h3 className="text-4xl font-bold text-gray-900 mt-1">
              {stat.value}
            </h3>
            <p className="text-sm text-gray-400 mt-2 font-medium">
              {stat.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;