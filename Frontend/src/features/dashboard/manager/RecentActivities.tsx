import React, { useState } from 'react';
import { Activity, Handshake, Contact2, ShieldAlert } from 'lucide-react';
import { RecentActivitiesData } from '../../../data/dashboard/MOCK__MANAGER_DASHBOARD';

const RecentActivities: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalEntries = RecentActivitiesData.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = RecentActivitiesData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'supplier': return <Handshake className="w-4 h-4 text-green-600" />;
      case 'employee': return <Contact2 className="w-4 h-4 text-yellow-600" />;
      case 'infraction': return <ShieldAlert className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-blue-600" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'supplier': return 'bg-green-100';
      case 'employee': return 'bg-yellow-100';
      case 'infraction': return 'bg-red-100';
      default: return 'bg-blue-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col min-h-[500px] overflow-hidden">
      <div className="p-6 flex-1">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-gray-900">Recent Activities</h3>
          <Activity className="w-5 h-5 text-gray-400" />
        </div>
        <div className="space-y-4">
          {currentItems.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
              <div className={`mt-1 rounded-full p-2 ${getBgColor(activity.type)}`}>
                {getIcon(activity.type)}
              </div>
              <div className="flex-1">
                <p className="text-lg font-medium text-gray-900">{activity.action}</p>
                <p className="text-md text-gray-500 mt-1">by {activity.actor}</p>
              </div>
              <span className="text-lg text-gray-400 whitespace-nowrap">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 mt-auto px-6 py-4 bg-gray-100 border-t border-gray-100 flex justify-between items-center">
        <p className="text-md text-gray-500">
          Showing {totalEntries === 0 ? 0 : indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalEntries)} of {totalEntries} entries
        </p>

        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-3 py-1 text-md font-medium transition-colors ${
              currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 flex items-center justify-center rounded-md text-md font-bold transition-colors ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`px-3 py-1 text-md font-medium transition-colors ${
              currentPage === totalPages || totalPages === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentActivities;