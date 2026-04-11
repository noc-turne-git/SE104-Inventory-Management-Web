import { type LucideIcon, Package, DollarSign, ShoppingCart, Users, TrendingUp, Activity, StoreIcon, AlertCircle, AlertOctagon, AlertTriangle, AlarmCheck } from 'lucide-react';



const StatsCards = ({role} : {role : 'manager' | 'staff'}) => {
    let stats;

    if (role === 'manager')
    {
        stats  = [
            { title: 'Total Products', value: '8', change: '+1 from last month', icon: Package, color: 'from-blue-500 to-blue-600', subColor: 'text-blue-100' },
            { title: 'Monthly Revenue', value: '$67K', change: '+22% from last month', icon: DollarSign, color: 'from-green-500 to-green-600', subColor: 'text-green-100' },
            { title: 'Low Stock', value: '3', change: '5% need restocking', icon: AlertTriangle, color: 'from-red-500 to-red-600', subColor: 'text-red-100' },
            { title: 'Pending note', value: '32', change: 'Oldest pending: 2 days', icon: AlarmCheck, color: 'from-purple-500 to-purple-600', subColor: 'text-purple-100' },
            ];
    } else {
        stats  = [
        { title: 'Total Stock Items', value: '247', change: '+12 from last month', icon: StoreIcon, color: 'from-blue-500 to-blue-600', subColor: 'text-blue-100' },
        { title: 'Inbound/Outbound Logistics', value: '8', change: '+5 completed', icon: Activity, color: 'from-green-500 to-green-600', subColor: 'text-green-100' },
        { title: 'Low Stock', value: '3', change: '5% need restocking', icon: AlertTriangle, color: 'from-red-500 to-red-600', subColor: 'text-red-100' },
        { title: 'Your Contribute', value: '2', change: '2 completed and 1 rejected', icon: Users, color: 'from-purple-500 to-purple-600', subColor: 'text-purple-100' },
        ];
    }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, i) => (
        <div key={i} className={`bg-gradient-to-br ${stat.color} rounded-xl shadow-lg p-6 text-white`}>
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 rounded-lg p-3">
              <stat.icon className="w-10 h-10" />
            </div>
            <TrendingUp className="w-10 h-10" /> 
          </div>
          <p className={`${stat.subColor} text-xl`}>{stat.title}</p>
          <p className="text-4xl font-bold mt-1">{stat.value}</p>
          <p className={`text-lg ${stat.subColor} mt-2`}>{stat.change}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;