import { use, useState } from "react";
import React from "react";
import { ProfileFeature } from '../features/profile/profile';
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
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const WareHouseScreen = () => {
  const {user} = useAuth();
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

  const {logout} = useAuth();
  const navigate = useNavigate();
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(false); // State cho thanh trượt Day/Night

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
            <div className="relative ">
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
          <div className="relative ">
            <button onClick={() => setIsSettingOpen(!isSettingOpen)}
            className="text-[#1E3A8A] px-1 py-4 hover:text-[#2563EB] transition-colors">
              <Icons.Settings className="w-5 h-5" />
            </button>
            {/* KHUNG MENU DROPDOWN */}
            {isSettingOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsSettingOpen(false)} />
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 py-2 z-50 overflow-hidden font-headline">
                  {/* Item: Translate */}
                  <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors text-slate-700 text-sm font-semibold">
                    <Icons.Languages className="w-4 h-4 text-slate-400" />
                    <span>Translate</span>
                    <span className="ml-auto text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500">EN</span>
                  </button>

                  {/* Item: Day/Night Mode (Thanh trượt) */}
                  <div className="px-4 py-3 flex items-center justify-between text-slate-700 text-sm font-semibold border-y border-slate-50">
                    <div className="flex items-center gap-3">
                      {isDarkMode ? <Icons.Moon className="w-4 h-4 text-slate-400" /> : <Icons.Sun className="w-4 h-4 text-slate-400" />}
                      <span>{isDarkMode ? 'Night Mode' : 'Day Mode'}</span>
                    </div>
                    
                    {/* Thanh trượt (Switch) */}
                    <button 
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      className={`w-10 h-5 rounded-full transition-colors relative ${isDarkMode ? 'bg-[#2563EB]' : 'bg-slate-200'}`}
                    >
                      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isDarkMode ? 'left-6' : 'left-1'}`} />
                    </button>
                  </div>

                  {/* Item: Logout */}
                  <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-rose-50 transition-colors text-rose-600 text-sm font-semibold"
                    onClick={() => logout()}>
                    <Icons.LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}
            </div>
            <button onClick={() => setIsProfileOpen(true)}
            className="h-8 w-8 rounded-full bg-[#1E3A8A] flex items-center justify-center text-white text-xs font-bold hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:bg-[#2563EB] active:scale-90 active:shadow-inner border border-white/10">
              {user?.role ? 'M' : 'S'}
            </button>
          </div>
          <ProfileFeature 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
      />
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