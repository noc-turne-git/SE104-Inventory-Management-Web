import React, { useState } from 'react';
import { Activity, CheckCircle } from 'lucide-react';
import { recentActivitiesData } from '../../../data/dashboard/MOCK_STAFF_DASHBOARD';

const StaffRecentActivities: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalEntries = recentActivitiesData.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = recentActivitiesData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col min-h-[500px] overflow-hidden">
      <div className="p-6 flex-1">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-500" /> Recent Activities
        </h3>
        <div className="space-y-4">
          {currentItems.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 pb-4 border-b border-gray-50 last:border-0 last:pb-0"
            >
              <div
                className={`mt-1 p-1.5 rounded-full ${
                  activity.type === 'success'
                    ? 'bg-green-100 text-green-600'
                    : activity.type === 'warning'
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'bg-blue-100 text-blue-600'
                }`}
              >
                {activity.type === 'success' ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Activity className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold text-gray-900 leading-none">
                  {activity.action}
                </p>
                <p className="text-md text-gray-500 mt-1">{activity.item}</p>
              </div>
              <span className="text-[10px] font-medium text-gray-400 whitespace-nowrap bg-gray-50 px-2 py-1 rounded">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 mt-auto px-6 py-4 bg-gray-100 border-t border-gray-100 flex justify-between items-center">
        <p className="text-md text-gray-500">
          Showing {totalEntries === 0 ? 0 : indexOfFirstItem + 1} to{' '}
          {Math.min(indexOfLastItem, totalEntries)} of {totalEntries} entries
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
              currentPage === totalPages || totalPages === 0
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffRecentActivities;