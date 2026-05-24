import { Activity, AlarmCheck, AlertTriangle, DollarSign, Package, StoreIcon, TrendingUp, Users, type LucideIcon } from 'lucide-react';
import { type DashboardStat } from '../../types/dashboard/manager';

const iconByName: Record<DashboardStat['icon'], LucideIcon> = {
  package: Package,
  dollar: DollarSign,
  alert: AlertTriangle,
  note: AlarmCheck,
  store: StoreIcon,
  activity: Activity,
  users: Users,
};

const colorByTone: Record<DashboardStat['tone'], { color: string; subColor: string }> = {
  blue: { color: 'from-blue-500 to-blue-600', subColor: 'text-blue-100' },
  green: { color: 'from-green-500 to-green-600', subColor: 'text-green-100' },
  red: { color: 'from-red-500 to-red-600', subColor: 'text-red-100' },
  purple: { color: 'from-purple-500 to-purple-600', subColor: 'text-purple-100' },
};

const StatsCards = ({ stats }: { stats: DashboardStat[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => {
        const Icon = iconByName[stat.icon];
        const tone = colorByTone[stat.tone];

        return (
          <div key={stat.title} className={`bg-gradient-to-br ${tone.color} rounded-xl shadow-lg p-6 text-white`}>
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 rounded-lg p-3">
                <Icon className="w-10 h-10" />
              </div>
              <TrendingUp className="w-10 h-10" />
            </div>
            <p className={`${tone.subColor} text-xl font-semibold`}>{stat.title}</p>
            <p className="text-3xl font-bold mt-1">{stat.value}</p>
            <p className={`text-lg ${tone.subColor} mt-2`}>{stat.change}</p>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
