//import React from 'react';
import {Plus} from 'lucide-react';

interface OpenModalButtonProps{
    label: string,
    onClick: () => void
}

interface ModalButtonProps{
    label: string,
    type: "submit" | "reset" | "button";
}

// {name, onClick} là props
const AddButton = ({label, onClick} : OpenModalButtonProps) => {
    return ( 
        <button 
          onClick={onClick}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
            {label}
        </button>
    );
}

export const CancelButton = ({label, type} : ModalButtonProps) => {
    return (
        <button 
          type={type}
          className="w-full flex-1 items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 hover:bg-gray-200 font-semibold text black text-lg font-bold rounded-lg transition-colors"
        >
        {label}
        </button>
    );
}

export const ConfirmButton = ({label, type} : ModalButtonProps) => {
    return (
        <button 
          type={type}
          className="w-full flex-1 items-center justify-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-large rounded-lg transition-colors"
        >
        {label}
        </button>
    );
}



export default AddButton;