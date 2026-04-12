import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';
import { InventoryTrendData } from '../../../data/dashboard/MOCK_STAFF_DASHBOARD';

const InventoryMovement: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-4xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <Activity className="w-7 h-7 text-blue-500" /> Inventory Movement
      </h3>
      <ResponsiveContainer width="100%" height={550}>
        <LineChart data={InventoryTrendData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Legend iconType="circle" />
          <Line 
            type="monotone" 
            dataKey="inbound" 
            name="Inbound"
            stroke="#10b981" 
            strokeWidth={3} 
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="outbound" 
            name="Outbound"
            stroke="#ef4444" 
            strokeWidth={3} 
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="stock" 
            name="Total Stock"
            stroke="#3b82f6" 
            strokeWidth={3} 
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InventoryMovement;