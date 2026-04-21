import {useState} from 'react';
import { Calendar, User, AlertTriangle} from 'lucide-react';
import OpenModalButton from '../../components/common/button/ModalButton';
import { type Shift } from '../../types/shift';
import ShiftsCalendar from "../../features/shifts/ShiftsCalendar";
import { ShiftsModal } from '../../features/shifts/ShiftsModal';
import { toast } from 'sonner';
import {type ShiftFormData } from '../../types/shift';
import { useShifts } from '../../hooks/useShifts';

const ShiftScreen = () => {
    const { shifts, deleteShift, updateShift, addShift } = useShifts();
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingItem, setEditingItem] = useState<Shift | null>(null);

    const emptyShifts = shifts.filter(s => s.assignedTo === null);
    
    const handleSubmit = (formData : ShiftFormData) => {
        if(editingItem) {
            updateShift(editingItem.id, formData)
        } else {
            addShift(formData)
        }
       handleCloseAddModal();
    }
   
    const handleOpenAddModal = () => {
        setEditingItem(null);
        setShowAddModal(true)
    }
   
    const handleCloseAddModal = () => {
       setEditingItem(null); 
       setShowAddModal(false);
    }

    const handleOpenEditModal = (shift : Shift) => {
        setEditingItem(shift);
        setShowAddModal(true);
    }

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                <h1 className="text-4xl font-bold text-gray-900">Shift Management</h1>
                <p className="text-gray-600 mt-1">Track and manage employee shifts</p>
                </div>
                <OpenModalButton label="New Shift" onClick={() => handleOpenAddModal()}></OpenModalButton>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
                {/* Total Shifts */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
                <div>
                    <p className="text-slate-500 text-md mb-1">Total Shifts</p>
                    <span className="text-4xl font-bold text-slate-900">9</span>
                </div>
                <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                    <Calendar size={28} />
                </div>
                </div>

                {/* Empty Shifts */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
                <div>
                    <p className="text-slate-500 text-md mb-1">Empty Shifts</p>
                    <span className="text-4xl font-bold text-slate-900">4</span>
                </div>
                <div className="bg-yellow-100 p-3 rounded-xl text-yellow-600">
                    <User size={28} />
                </div>
                </div>

                {/* Urgent Coverage */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
                <div>
                    <p className="text-slate-500 text-md mb-1">Urgent Coverage</p>
                    <span className="text-4xl font-bold text-slate-900">4</span>
                </div>
                <div className="bg-red-100 p-3 rounded-xl text-red-500">
                    <AlertTriangle size={28} />
                </div>
                </div>
            </div>
            <ShiftsCalendar 
                shifts={shifts}
                onDelete={deleteShift}
                onOpenEditModal={handleOpenEditModal}
            />
            <ShiftsModal 
                isOpen={showAddModal}
                onClose={handleCloseAddModal}
                onSubmit={handleSubmit}
                initialData={editingItem}
            />
        </div>
    );
};

export default ShiftScreen;