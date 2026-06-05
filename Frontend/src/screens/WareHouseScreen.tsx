import React, { useState } from "react";
import { ProfileFeature } from '../features/profile/profile';
import { Icons } from "../features/warehouse/iconWareHouse";
import { WarehouseCard, InvitationCard, CreateWarehousePlaceholder } from "../features/warehouse/warehouse";
import { CreateWareHouseModal } from "../features/warehouse/CreateWareHouseModal";
import { useWarehouse } from "../hooks/useWarehouse";
import { useWarehouseContext } from "../context/WarehouseContext";
// import type { Warehouse, Invitation } from "../types/warehouse";
// import { MOCK_WAREHOUSES, MOCK_INVITATIONS } from "../data/MOCK_WAREHOUSE";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const WareHouseContent = () => {
  const {signout} = useAuth();
  const {
    warehouses,
    loading,
    invitations,
    isModalOpen,
    editingWarehouse,
    openModal,
    openEditModal,
    closeModal,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse,
    acceptInvitation,
    declineInvitation,
    manageWarehouse,
  } = useWarehouse();

  const { clearWarehouse } = useWarehouseContext();
  const { role } = useWarehouseContext();
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(false); // State cho thanh trượt Day/Night

  if (loading) return <div>Loading...</div>;
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Top Navigation Bar */}
      <header className="w-full h-16 sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-8 w-full max-w-7xl mx-auto h-full">
          <div className="flex items-center gap-8">
            <span className="text-xl font-bold text-blue-600">Stockify</span>
            <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
              <button className="relative text-blue-600 px-1 py-4 transition-colors hover:text-blue-700">
                Warehouses
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>
              </button>
              <button className="relative group text-gray-600 px-1 py-4 transition-colors hover:text-blue-600">
                Analytics
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
            </nav>
          </div>
          <div className=" grow max-w-2xl mx-8 hidden sm:block">
            <div className="relative ">
              <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search warehouses, ..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none placeholder:text-gray-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-600 px-1 py-4 hover:text-blue-600 transition-colors">
              <Icons.Bell className="w-5 h-5" />
            </button>
            <div className="relative ">
              <button onClick={() => setIsSettingOpen(!isSettingOpen)}
              className="text-gray-600 px-1 py-4 hover:text-blue-600 transition-colors">
                <Icons.Settings className="w-5 h-5" />
              </button>
              {/* KHUNG MENU DROPDOWN */}
              {isSettingOpen && (
                <>
                <div className="fixed inset-0 z-40" onClick={() => setIsSettingOpen(false)} />
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 overflow-hidden">
                  {/* Item: Translate */}
                  <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-gray-700 text-sm font-semibold">
                    <Icons.Languages className="w-4 h-4 text-gray-400" />
                    <span>Translate</span>
                    <span className="ml-auto text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-500">EN</span>
                  </button>

                  {/* Item: Day/Night Mode (Thanh trượt) */}
                  <div className="px-4 py-3 flex items-center justify-between text-gray-700 text-sm font-semibold border-y border-gray-100">
                    <div className="flex items-center gap-3">
                      {isDarkMode ? <Icons.Moon className="w-4 h-4 text-gray-400" /> : <Icons.Sun className="w-4 h-4 text-gray-400" />}
                      <span>{isDarkMode ? 'Night Mode' : 'Day Mode'}</span>
                    </div>
                    
                    {/* Thanh trượt (Switch) */}
                    <button 
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      className={`w-10 h-5 rounded-full transition-colors relative ${isDarkMode ? 'bg-blue-600' : 'bg-gray-200'}`}
                    >
                      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isDarkMode ? 'left-6' : 'left-1'}`} />
                    </button>
                  </div>

                  {/* Item: Logout */}
                  <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-rose-50 transition-colors text-rose-600 text-sm font-semibold"
                    onClick={() => {
                      signout();
                      clearWarehouse();
                    }}>
                    <Icons.LogOut className="w-4 h-4" />
                    <span>Sign out</span>
                  </button>
                </div>
              </>
            )}
            </div>
            <button onClick={() => setIsProfileOpen(true)}
            className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold hover:bg-blue-700 hover:shadow-md active:scale-95 transition-all">
              {role === "owner" ? 'O' : role === "manager" ? 'M' : 'S'}
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
            Welcome back
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
                <Icons.Mail className="w-5 h-5 text-primary fill-primary/10" />
                <h2 className="text-4xl font-headline font-bold text-inverse-surface">Warehouse Invitations</h2>
              </div>
              <span className="px-3 py-1 bg-[#FFDBCF] text-[#812800] rounded-full text-xs font-bold uppercase tracking-wider">
                {invitations.length} Pending
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {(invitations || []).map((inv) => (
                <InvitationCard                 
                  key={inv.id} 
                  invitation={inv} 
                  onAccept={() => acceptInvitation(inv.id)} 
                  onDecline={() => declineInvitation(inv.id)} 
                />
              ))}
            </div>
          </section>
        )}

        {/* Section Warehouse List */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Icons.Warehouse className="w-5 h-5 text-primary fill-primary/10" />
              <h2 className="text-4xl font-headline font-bold text-inverse-surface">Select a Warehouse</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(warehouses || []).map((wh) => (
              <WarehouseCard 
                key={wh.warehouseId} 
                warehouse={wh} 
                onManage={() => manageWarehouse(wh.warehouseId)}
                onEdit={openEditModal}
                onDelete={(warehouse) => deleteWarehouse(warehouse.warehouseId)}
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
        onUpdate={updateWarehouse}
        warehouse={editingWarehouse}
      />
    </div>
  );
};

const WareHouseScreen = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <WareHouseContent />;
};

export default WareHouseScreen;
