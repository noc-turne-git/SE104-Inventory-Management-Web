import * as React from "react";
import type { Warehouse, Invitation } from "../../types/warehouse";
import { Icons } from "./iconWareHouse";
import { motion } from "motion/react";

interface WarehouseCardProps {
  warehouse: Warehouse;
  onManage: (id: string) => void;
}

export const WarehouseCard: React.FC<WarehouseCardProps> = ({ warehouse, onManage }) => {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="flex flex-col bg-[#ffffff] rounded-2xl overflow-hidden shadow-[0px_8px_24px_rgba(0,0,0,0.04)] border border-[#e5e7eb] group"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <img 
          src={warehouse.imageUrl || "https://picsum.photos/seed/warehouse/800/400"} 
          alt={warehouse.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <span className="px-2 py-1 rounded bg-[#000000]/80 backdrop-blur-sm text-[#ffffff] text-[10px] font-black uppercase tracking-widest">Active</span>
        </div>
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-['Plus_Jakarta_Sans'] font-black text-[#000000] mb-4">{warehouse.name}</h3>
        <div className="space-y-4 mb-8">
          <div className="flex items-center text-[#666666] gap-3 text-sm font-medium">
            <Icons.MapPin className="w-4 h-4 text-[#e5e7eb]" />
            <span>{warehouse.address}</span>
          </div>
          <div className="flex items-center text-[#666666] gap-3 text-sm font-medium">
            <Icons.Package className="w-4 h-4 text-[#e5e7eb]" />
            <span>{warehouse.productCount.toLocaleString()} Products</span>
          </div>
        </div>
        <div className="pt-6 border-t border-[#e5e7eb] flex items-center justify-between">
          <span className="text-[11px] text-[#666666]/60 font-bold uppercase tracking-widest">Updated {warehouse.lastUpdate}</span>
          <button 
            onClick={() => onManage(warehouse.warehouseId)}
            className="text-[#000000] font-black text-sm flex items-center gap-1 group/btn hover:translate-x-1 transition-transform"
          >
            Manage
            <Icons.ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

interface InvitationCardProps {
  invitation: Invitation;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({ invitation, onAccept, onDecline }) => {
  return (
    <div className="bg-[#ffffff] rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6 shadow-sm border border-[#e5e7eb]/15 group hover:shadow-md transition-all duration-300">
      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[#f8f9fa]">
        <img 
          src={invitation.imageUrl || "https://picsum.photos/seed/inv/200/200"} 
          alt={invitation.warehouseName}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex-grow">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-[#0040a1] uppercase tracking-widest font-['Plus_Jakarta_Sans']">{invitation.ownerId}</span>
          <span className="w-1 h-1 rounded-full bg-[#e5e7eb]" />
          <span className="text-xs text-[#666666]">Sent {invitation.sendTime}</span>
        </div>
        <h3 className="text-xl font-['Plus_Jakarta_Sans'] font-bold text-[#000000] mb-1">{invitation.warehouseName}</h3>
        <p className="text-sm text-[#666666]">
          Requested your role as <span className="font-semibold text-[#000000] capitalize">{invitation.requestedRole}</span>
        </p>
      </div>
      <div className="flex md:flex-col gap-2 w-full md:w-auto">
        <button 
          onClick={() => onAccept(invitation.id)}
          className="flex-1 md:w-32 py-2.5 rounded-lg bg-[#0040a1] text-white text-sm font-bold shadow-sm hover:bg-[#0056d2] transition-all font-['Plus_Jakarta_Sans']"
        >
          Accept
        </button>
        <button 
          onClick={() => onDecline(invitation.id)}
          className="flex-1 md:w-32 py-2.5 rounded-lg bg-[#f8f9fa] text-[#666666] text-sm font-bold hover:bg-[#e5e7eb]/20 transition-all font-['Plus_Jakarta_Sans']"
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export const CreateWarehousePlaceholder: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center bg-[#f8f9fa]/50 border-2 border-dashed border-[#e5e7eb] rounded-2xl p-12 group hover:bg-[#f8f9fa] hover:border-[#000000] transition-all duration-500 min-h-[450px]"
    >
      <div className="w-20 h-20 rounded-full bg-[#ffffff] flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500">
        <Icons.Plus className="w-10 h-10 text-[#000000]" />
      </div>
      <h3 className="text-2xl font-['Plus_Jakarta_Sans'] font-black text-[#000000] mb-4">Create New Warehouse</h3>
      <p className="text-[#666666] text-center max-w-[240px] leading-relaxed font-medium">
        Set up a new workspace for your logistics and inventory management.
      </p>
    </button>
  );
};
