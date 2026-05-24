import { useState } from "react";
import { useStaff } from "../../hooks/useStaffs";
import StaffRow from "../../features/staff/StaffRow";
import StaffModal from "../../features/staff/StaffModal";
import InfractionModal from "../../features/staff/InfractionModal";
import SearchBar from "../../components/common/searchBar";
import OpenModalButton from "../../components/common/button/ModalButton";
import { type Staff } from "../../types/staff";
import { useWarehouseContext } from "../../context/WarehouseContext";

const StaffScreen = () => {
  const { warehouseId } = useWarehouseContext();
  const { staffs, loading, addStaff, updateStaff, deleteStaff, addInfraction } =
    useStaff(warehouseId);

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
  const handleSubmit = async (data: Omit<Staff, "id" | "infractions">) => {
    const ok = editingItem
      ? await updateStaff(editingItem.id, data)
      : await addStaff(data);

    if (ok) {
      handleCloseModal();
    }
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditingItem(null);
    setShowModal(false);
  };

  if (!warehouseId) {
    return <div className="p-8 text-gray-600">Please select a warehouse</div>;
  }

  return (
    <div className="p-8">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
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

      {loading && (
        <div className="text-gray-500 mt-6">Loading staff...</div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-gray-500 mt-6">No staff found.</div>
      )}

      {/* TABLE */}
      {filtered.length > 0 && (
      <div className="table-panel">
        <div className="table-scroll">
          <table className="table-base">
            <thead className="table-head">
              <tr>
                <th className="table-th">
                  Employee </th>
                <th className="table-th">
                  Status </th>
                <th className="table-th">
                  Phone </th>
                <th className="table-th">
                  Address </th>
                <th className="table-th">
                  DOB </th>
                <th className="table-th">
                  Role </th>
                <th className="table-th">
                  Salary </th>
                <th className="table-th">
                  Hire Date </th>
                <th className="table-th">
                  Violation </th>
                <th className="table-th">
                  Action </th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((s) => (
                <StaffRow
                  key={s.id}
                  staff={s}
                  onDelete={(id) => void deleteStaff(id)}
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
      )}

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
