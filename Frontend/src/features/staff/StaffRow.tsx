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
    <tr className="table-row">

      {/* EMPLOYEE */}
      <td className="table-td-left">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-xl font-semibold text-white shadow-sm ring-2 ring-blue-100">
            {staff.name.charAt(0)}
          </div>
          <div>
            <p className="text-base font-medium text-gray-900">{staff.name}</p>
            <p className="text-sm text-gray-500">{staff.email}</p>
          </div>
        </div>
      </td>

      <td className="table-td-center">
        <span className={`table-status-badge ${
          staff.accountStatus === 'Active' 
            ? "bg-green-100 text-green-700 border border-green-200" 
            : "bg-red-100 text-red-700 border border-red-200"
        }`}>
          {staff.accountStatus}
        </span>
      </td>

      <td className="table-td-center">{staff.phone || "N/A"}</td>
      <td className="table-td-left max-w-[150px] truncate">
        {staff.address || "N/A"}
      </td>
      <td className="table-td-center">
        {staff.dob ? new Date(staff.dob).toLocaleDateString('vi-VN') : "N/A"}
      </td>

      <td className="table-td-center">{staff.role}</td>
      {/* <td className="px-6 py-4 text-md text-gray-600">{staff.accountStatus}</td> */}

      <td className="table-td-center table-money">${staff.salary}</td>
      <td className="table-td-center">{new Date(staff.hireDate).toLocaleDateString('vi-VN')}</td>

      {/* INFRACTIONS */}
      <td className="table-td-center">
        <span
          onClick={() => onViewInfractions(staff)}
          className={`cursor-pointer px-2 py-1 rounded-full ${
            staff.infractions.length === 0
              ? "bg-green-100 text-base text-green-700"
              : "bg-yellow-100 text-base text-yellow-700"
          }`}
        >
          {staff.infractions.length}
        </span>
      </td>

      {/* ACTION */}
      <td className="table-td-center">
        <div className="flex justify-center gap-4">
          <button onClick={() => onEdit(staff)}>
            <Edit className="w-5 h-5 text-blue-600" />
          </button>
          <button onClick={() => onDelete(staff.id)}>
            <Trash2 className="w-5 h-5 text-red-600" />
          </button>
        </div>
      </td>

    </tr>
  );
};

export default StaffRow;
