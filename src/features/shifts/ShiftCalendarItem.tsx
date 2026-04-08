    import React from 'react';
    import { Clock, Copy, Edit, Trash2 } from 'lucide-react';
    import { type Shift, type ShiftFormData } from '../../types/shift';
    import { Pencil, Trash } from 'lucide-react';

    interface Props {
        shift: Shift;
        onOpenEditModal: (shift : Shift) => void;
        onDelete: (id: string) => void;
    }

    export const ShiftCalendarItem: React.FC<Props> = ({shift, onOpenEditModal, onDelete}) => {
    const getStatusColor = (status: string) => {
        switch (status) {
        case 'filled': return 'bg-green-100 border-green-300 text-green-800';
        case 'empty': return 'bg-gray-100 border-gray-300 text-gray-800';
        case 'urgent': return 'bg-red-100 border-red-300 text-red-800';
        default: return 'bg-gray-100 border-gray-300 text-gray-800';
        }
    };

    return (
        <div key={shift.id} className={`border rounded-lg p-2 ${getStatusColor(shift.status)}`}>
                        
            <div className="flex justify-between mb-1 text-xs">
                <Clock size={20}> </Clock>
                <span> {shift.startTime} - {shift.endTime} </span>
                <div className="flex gap-1">
                    {/* <button onClick={() => handleDuplicate(shift)}>D</button> */}
                    <button 
                        type="button" 
                        onClick={() => onOpenEditModal(shift)}>
                        <Pencil size={15}></Pencil>
                    </button>
                    <button 
                        type="button" 
                        onClick={() => onDelete(shift.id)}>
                        <Trash size={15}></Trash>
                    </button>
                </div>
            </div>

            <div className="text-xs font-medium">{shift.position}</div>
                <div className="text-xs text-gray-700">
                    {shift.assignedTo || 'Unassigned'}
                </div>

                {shift.notes && (
                    <div className="text-xs text-gray-600 italic truncate">
                        {shift.notes}
                    </div>
                )}
            </div>    
        );
    };