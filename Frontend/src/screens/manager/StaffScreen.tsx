import { useState } from "react";
import { useStaff } from "../../hooks/useStaffs";
import { MOCK_STAFF } from "../../data/MOCK_STAFF";
import StaffRow from "../../features/staff/StaffRow";
import StaffModal from "../../features/staff/StaffModal";
import InfractionModal from "../../features/staff/InfractionModal";
import SearchBar from "../../components/common/searchBar";
import OpenModalButton from "../../components/common/button/ModalButton";
import { type Staff } from "../../types/staff";

const StaffScreen = () => {
  const { staffs, addStaff, updateStaff, deleteStaff, addInfraction } =
    useStaff(MOCK_STAFF);

  const [search, setSearch] = useState("");
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Staff | null>(null);

  // luôn lấy staff mới nhất
  const selectedStaff =
    staffs.find((s) => s.id === selectedStaffId) || null;

  // filter
  const filtered = staffs.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  //  add/update staff
  const handleSubmit = (data: Omit<Staff, "id" | "infractions">) => {
    if (editingItem) {
      updateStaff(editingItem.id, data);
    } else {
      addStaff(data);
    }
    handleCloseModal();
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditingItem(null);
    setShowModal(false);
  };

  return (
    <div className="p-8">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Staff Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage employees and their information
          </p>
        </div>

        <OpenModalButton label="Add Staff" onClick={handleOpenAddModal} />
      </div>

      {/* SEARCH */}
      <SearchBar
        label="Search staff..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-md text-gray-600 uppercase">
                  Employee </th>
                <th className="px-6 py-4 text-left text-md text-gray-600 uppercase">
                  Status </th>
                <th className="px-6 py-4 text-left text-md text-gray-600 uppercase">
                  Phone </th>
                <th className="px-6 py-4 text-left text-md text-gray-600 uppercase">
                  Address </th>
                <th className="px-6 py-4 text-left text-md text-gray-600 uppercase">
                  DOB </th>
                <th className="px-6 py-4 text-left text-md text-gray-600 uppercase">
                  Role </th>
                <th className="px-6 py-4 text-left text-md text-gray-600 uppercase">
                  Salary </th>
                <th className="px-6 py-4 text-center text-md text-gray-600 uppercase">
                  Hire Date </th>
                <th className="px-6 py-4 text-center text-md text-gray-600 uppercase">
                  Violation </th>
                <th className="px-6 py-4 text-right text-md text-gray-600 uppercase">
                  Action </th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((s) => (
                <StaffRow
                  key={s.id}
                  staff={s}
                  onDelete={deleteStaff}
                  onEdit={(staff) => {
                    setEditingItem(staff);
                    setShowModal(true);
                  }}
                  onViewInfractions={(s) => setSelectedStaffId(s.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* STAFF MODAL */}
      <StaffModal
        isOpen={showModal}
        onClose={handleCloseModal}
        initialData={editingItem}
        onSubmit={handleSubmit}
      />

      {/* INFRACTION MODAL */}
      <InfractionModal
        isOpen={selectedStaffId !== null}
        onClose={() => setSelectedStaffId(null)}
        staff={selectedStaff} 
        onAdd={addInfraction}
      />

    </div>
  );
};

export default StaffScreen;