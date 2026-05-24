import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart3 } from 'lucide-react';
import { type YearlyRevenueData } from '../../../types/dashboard/manager';

type RevenueChartProps = {
  revenueByYear: YearlyRevenueData[];
  selectedYear: number;
  onYearChange: (year: number) => void;
};

const RevenueChart = ({ revenueByYear, selectedYear, onYearChange }: RevenueChartProps) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from(new Set([
    ...revenueByYear.map((item) => item.year),
    ...Array.from({ length: 5 }, (_, index) => currentYear - index),
  ])).sort((a, b) => b - a);
  const revenue = revenueByYear.find(item => item.year === selectedYear);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Revenue Overview</h3>
          <select 
            value={selectedYear}
            onChange={(e) => onYearChange(parseInt(e.target.value))}
            className="text-base border border-gray-300 rounded-xl px-2 p-1"
          >
            {years.map((year) => (
              <option key={year} value={year}>Year {year}</option>
            ))}
          </select>
        </div>
        <BarChart3 className="w-5 h-5 text-gray-400" />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={revenue?.data}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" />
          <Area type="monotone" dataKey="profit" stroke="#10b981" fillOpacity={1} fill="url(#colorProfit)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
