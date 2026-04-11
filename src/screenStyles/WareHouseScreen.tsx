import * as React from "react";
import type { Warehouse, Invitation } from "../types/warehouse";
import { Icons } from "../features/warehouse/iconWareHouse";
import { 
  WarehouseCard, 
  InvitationCard, 
  CreateWarehousePlaceholder 
} from "../features/warehouse/warehouse";
import { CreateWareHouseModal } from "../features/warehouse/CreateWareHouseModal";

interface WareHouseScreenProps {
  warehouses: Warehouse[];
  invitations: Invitation[];
  onManage: (id: string) => void;
  onCreate: (name: string, address: string) => void;
  onAcceptInvitation: (id: string) => void;
  onDeclineInvitation: (id: string) => void;
}

const WareHouseScreen: React.FC<WareHouseScreenProps> = ({
  warehouses,
  invitations,
  onManage,
  onCreate,
  onAcceptInvitation,
  onDeclineInvitation,
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Top Navigation Bar */}
      <header className="w-full h-16 sticky top-0 z-30 bg-white border-b border-outline-variant/15 shadow-sm">
        <div className="flex items-center justify-between px-8 w-full max-w-7xl mx-auto h-full">
          <div className="flex items-center gap-8">
            <span className="text-xl font-extrabold text-[#1E3A8A] font-headline">Stokify</span>
            <nav className="hidden md:flex items-center gap-6 font-headline text-sm font-semibold">
              <button className="relative group text-[#1E3A8A] px-1 py-4 font-semibold transition-colors hover:text-[#2563EB]">
                Warehouses
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button className="relative group text-[#1E3A8A] px-1 py-4 font-semibold transition-colors hover:text-[#2563EB]">
                Analytics
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full"></span>
              </button>
            </nav>
          </div>
          <div className="grow max-w-2xl mx-8 hidden sm:block">
            <div className="relative">
              <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
              <input 
                type="text" 
                placeholder="Search warehouses, products, or staff..." 
                className="w-full pl-10 pr-4 py-2 bg-[#F8FAFC] border-none rounded-full text-sm focus:ring-2 focus:ring-[#2563EB] outline-none placeholder:text-slate-600"              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-[#1E3A8A] px-1 py-4 hover:text-[#2563EB] transition-colors">
              <Icons.Bell className="w-5 h-5" />
            </button>
            <button className="text-[#1E3A8A] px-1 py-4 hover:text-[#2563EB] transition-colors">
              <Icons.Settings className="w-5 h-5" />
            </button>
            <div className="h-8 w-8 rounded-full bg-[#1E3A8A] flex items-center justify-center text-white text-xs font-bold">
              JD
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="grow w-full max-w-7xl mx-auto px-8 py-12">
        {/* Hero Header */}
        <section className="mb-16">
          <h1 className="text-5xl font-headline font-extrabold text-inverse-surface tracking-tight mb-2">Welcome back, Justin</h1>
          <p className="text-on-surface-variant text-lg max-w-2xl">Select a workspace to manage your logistics, or review new invitations from partners.</p>
        </section>

        {/* Section 1: W
         Invitations */}
        {invitations.length > 0 && (
          <section className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Icons.Mail className="w-6 h-6 text-primary fill-primary/10" />
                <h2 className="text-2xl font-headline font-bold text-inverse-surface">Warehouse Invitations</h2>
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
                  onAccept={onAcceptInvitation} 
                  onDecline={onDeclineInvitation} 
                />
              ))}
            </div>
          </section>
        )}

        {/* Section 2: Select a Warehouse */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Icons.Warehouse className="w-6 h-6 text-primary fill-primary/10" />
              <h2 className="text-2xl font-headline font-bold text-inverse-surface">Select a Warehouse</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {warehouses.map((wh) => (
              <WarehouseCard 
                key={wh.warehouseId} 
                warehouse={wh} 
                onManage={onManage} 
              />
            ))}
            <CreateWarehousePlaceholder onClick={() => setIsModalOpen(true)} />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 mt-auto bg-surface-container-low border-t border-outline-variant/15">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 w-full max-w-7xl mx-auto opacity-80">
          <div className="flex items-center gap-6 mb-6 md:mb-0">
            <span className="text-lg font-bold text-primary font-headline">Stokify</span>
            <p className="text-sm text-on-surface-variant">© 2024 Stokify. Architectural Curator System.</p>
          </div>
          <div className="flex items-center gap-8 text-sm font-semibold text-on-surface-variant">
            <a className="hover:text-primary transition-colors" href="#">Support</a>
            <a className="hover:text-primary transition-colors" href="#">Privacy</a>
            <a className="hover:text-primary transition-colors" href="#">Terms</a>
          </div>
        </div>
      </footer>

      <CreateWareHouseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onCreate={onCreate} 
      />
    </div>
  );
};

export default WareHouseScreen;