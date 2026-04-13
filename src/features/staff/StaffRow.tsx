import { Edit, Trash2 } from "lucide-react";
import type { Staff } from "../../types/staff";

interface Props {
  staff: Staff;
  onEdit: (s: Staff) => void;
  onDelete: (id: string) => void;
  onViewInfractions: (s: Staff) => void;
}

const StaffRow = ({ staff, onEdit, onDelete, onViewInfractions }: Props) => {
  return (
    <tr className='hover: bg-gray-100'>

      {/* EMPLOYEE */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-15 h-15 bg-blue-500 rounded-full flex items-center justify-center text-white">
            {staff.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-gray-900">{staff.name}</p>
            <p className="text-md text-gray-500">{staff.email}</p>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
          staff.accountStatus === 'Active' 
            ? "bg-green-100 text-green-700 border border-green-200" 
            : "bg-red-100 text-red-700 border border-red-200"
        }`}>
          {staff.accountStatus}
        </span>
      </td>

      <td className="px-6 py-4 text-md text-gray-600">{staff.phone || "N/A"}</td>
      <td className="px-6 py-4 text-sm text-gray-600 max-w-[150px] truncate">
        {staff.address || "N/A"}
      </td>
      <td className="px-6 py-4 text-md text-gray-600">{staff.dob || "N/A"}</td>

      <td className="px-6 py-4 text-md text-gray-600">{staff.role}</td>
      {/* <td className="px-6 py-4 text-md text-gray-600">{staff.accountStatus}</td> */}

      <td className="px-6 py-4 font-medium">${staff.salary}</td>
      <td className="px-6 py-4 text-center">
        {new Date(staff.hireDate).toLocaleDateString('vi-VN')}</td>

      {/* INFRACTIONS */}
      <td className="px-6 py-4 text-center">
        <span
          onClick={() => onViewInfractions(staff)}
          className={`cursor-pointer px-3 py-1 text-lg rounded-full ${
            staff.infractions.length === 0
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {staff.infractions.length}
        </span>
      </td>

      {/* ACTION */}
      <td className="px-6 py-4">
        <div className="flex justify-end gap-5">
          <button onClick={() => onEdit(staff)}>
            <Edit className="w-6 h-6 text-blue-600" />
          </button>
          <button onClick={() => onDelete(staff.id)}>
            <Trash2 className="w-6 h-6 text-red-600" />
          </button>
        </div>
      </td>

    </tr>
  );
};

export default StaffRow;