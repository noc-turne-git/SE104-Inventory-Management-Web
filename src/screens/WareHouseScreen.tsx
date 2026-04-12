import * as React from "react";
import { Icons } from "../features/warehouse/iconWareHouse";
import { 
  WarehouseCard, 
  InvitationCard, 
  CreateWarehousePlaceholder 
} from "../features/warehouse/warehouse";
import { CreateWareHouseModal } from "../features/warehouse/CreateWareHouseModal";
import { useWarehouse } from "../hooks/useWarehouse"; // Import hook vừa tạo
import type { Warehouse, Invitation } from "../types/warehouse";
import { MOCK_WAREHOUSES, MOCK_INVITATIONS } from "../data/MOCK_WAREHOUSE";

const WareHouseScreen = () => {
  const {
    warehouses,
    invitations,
    isModalOpen,
    openModal,
    closeModal,
    createWarehouse,
    acceptInvitation,
    declineInvitation,
    manageWarehouse,
  } = useWarehouse(MOCK_WAREHOUSES, MOCK_INVITATIONS);

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Top Navigation Bar */}
      <header className="w-full h-16 sticky top-0 z-30 bg-white border-b border-outline-variant/15 shadow-sm">
        <div className="flex items-center justify-between px-8 w-full max-w-7xl mx-auto h-full">
           <div className="flex items-center gap-8">
             <span className="text-xl font-extrabold text-[#1E3A8A] font-headline">Stokify</span>
             {/* ... (phần nav giữ nguyên) */}
           </div>
           {/* ... (phần search bar giữ nguyên) */}
        </div>
      </header>

      <main className="grow w-full max-w-7xl mx-auto px-8 py-12">
        <section className="mb-16">
          <h1 className="text-5xl font-headline font-extrabold text-inverse-surface tracking-tight mb-2">
            Welcome back, Justin
          </h1>
          <p className="text-on-surface-variant text-lg max-w-2xl">
            Select a workspace to manage your logistics, or review new invitations from partners.
          </p>
        </section>

        {/* Section Invitations */}
        {invitations.length > 0 && (
          <section className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Icons.Mail className="w-6 h-6 text-primary fill-primary/10" />
                <h2 className="text-4xl font-headline font-bold text-inverse-surface">Warehouse Invitations</h2>
              </div>
              <span className="px-3 py-1 bg-[#FFDBCF] text-[#812800] rounded-full text-xs font-bold uppercase tracking-wider">
                {invitations.length} Pending
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {invitations.map((inv) => (
                <InvitationCard 
                  key={inv.id} 
                  invitation={inv} 
                  onAccept={acceptInvitation} 
                  onDecline={declineInvitation} 
                />
              ))}
            </div>
          </section>
        )}

        {/* Section Warehouse List */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Icons.Warehouse className="w-6 h-6 text-primary fill-primary/10" />
              <h2 className="text-4xl font-headline font-bold text-inverse-surface">Select a Warehouse</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {warehouses.map((wh) => (
              <WarehouseCard 
                key={wh.warehouseId} 
                warehouse={wh} 
                onManage={manageWarehouse} 
              />
            ))}
            <CreateWarehousePlaceholder onClick={openModal} />
          </div>
        </section>
      </main>

      {/* Footer giữ nguyên */}

      <CreateWareHouseModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        onCreate={createWarehouse} 
      />
    </div>
  );
};

export default WareHouseScreen;