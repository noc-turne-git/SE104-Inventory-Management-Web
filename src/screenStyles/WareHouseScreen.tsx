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
      <header className="w-full h-16 sticky top-0 z-30 bg-surface-container-lowest border-b border-outline-variant/15">
        <div className="flex items-center justify-between px-8 w-full max-w-7xl mx-auto h-full">
          <div className="flex items-center gap-8">
            <span className="text-xl font-extrabold text-primary font-headline">Stokify</span>
            <nav className="hidden md:flex items-center gap-6 font-headline text-sm font-semibold">
              <a className="text-primary border-b-2 border-primary px-1 py-4" href="#">Warehouses</a>
              <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Analytics</a>
            </nav>
          </div>
          <div className="grow max-w-2xl mx-8 hidden sm:block">
            <div className="relative">
              <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
              <input 
                type="text" 
                placeholder="Search warehouses, products, or staff..." 
                className="w-full pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full text-sm focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container-low">
              <Icons.Bell className="w-5 h-5" />
            </button>
            <button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container-low">
              <Icons.Settings className="w-5 h-5" />
            </button>
            <div className="h-8 w-8 rounded-full bg-primary-container flex items-center justify-center text-white text-xs font-bold">
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

        {/* Section 1: Warehouse Invitations */}
        {invitations.length > 0 && (
          <section className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Icons.Mail className="w-6 h-6 text-primary fill-primary/10" />
                <h2 className="text-2xl font-headline font-bold text-inverse-surface">Warehouse Invitations</h2>
              </div>
              <span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full text-xs font-bold uppercase tracking-wider">
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