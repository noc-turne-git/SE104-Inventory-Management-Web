import React from 'react';
import { PieChart as RePieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart as PieIcon } from 'lucide-react';
import { productCategoryData } from '../../../data/dashboard/MOCK__MANAGER_DASHBOARD';

const ProductCategoryChart: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-4xl font-semibold text-gray-900">Product Distribution</h3>
          <p className="text-md text-gray-500">By category</p>
        </div>
        <PieIcon className="w-5 h-5 text-gray-400" />
      </div>
      <div className="flex items-center">
        <ResponsiveContainer width="50%" height={240}>
          <RePieChart>
            <Pie
              data={productCategoryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {productCategoryData.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </RePieChart>
        </ResponsiveContainer>
        <div className="flex-1 space-y-3 ml-4">
          {productCategoryData.map((category: any, index: number) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                <span className="text-lg text-gray-700">{category.name}</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">{category.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategoryChart;