import * as React from "react";
import { WarehouseStatus } from "../../types/warehouse";
import type { Warehouse } from "../../types/warehouse";
import { Icons } from "./iconWareHouse";
import { motion } from "motion/react";

interface WarehouseManagementProps {
  warehouse: Warehouse;
  onBack: () => void;
}

export const WarehouseManagement: React.FC<WarehouseManagementProps> = ({
  warehouse,
  onBack,
}) => {
  const [email, setEmail] = React.useState("");
  const [isInviting, setIsInviting] = React.useState(false);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsInviting(true);
      // Simulate API call
      setTimeout(() => {
        alert(`Invitation sent to ${email}`);
        setEmail("");
        setIsInviting(false);
      }, 1000);
    }
  };

  const statusColors = {
    [WarehouseStatus.STABLE_OPERATIONS]: "bg-green-100 text-green-800 border-green-200",
    [WarehouseStatus.LOW_STOCK]: "bg-yellow-100 text-yellow-800 border-yellow-200",
    [WarehouseStatus.SHIFT_VACANCY]: "bg-red-100 text-red-800 border-red-200",
    [WarehouseStatus.DEFECTIVE_BATCH]: "bg-orange-100 text-orange-800 border-orange-200",
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Header */}
      <header className="w-full h-16 sticky top-0 z-30 bg-surface-container-lowest border-b border-outline-variant/15">
        <div className="flex items-center justify-between px-8 w-full max-w-7xl mx-auto h-full">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant hover:text-primary"
            >
              <Icons.ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-xl font-extrabold text-primary font-headline">Stokify</span>
            <span className="w-1 h-1 rounded-full bg-outline-variant" />
            <span className="text-sm font-bold text-inverse-surface">{warehouse.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant hover:text-primary">
              <Icons.Bell className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant hover:text-primary">
              <Icons.Settings className="w-5 h-5" />
            </button>
            <div className="h-8 w-8 rounded-full bg-primary-container flex items-center justify-center text-white text-xs font-bold">
              JD
            </div>
          </div>
        </div>
      </header>

      <main className="grow w-full max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Stats & Info */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-outline-variant/15">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-headline font-extrabold text-inverse-surface mb-2">{warehouse.name}</h2>
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <Icons.MapPin className="w-4 h-4" />
                    <span>{warehouse.address}</span>
                  </div>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${statusColors[warehouse.status]}`}>
                  {warehouse.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-6 bg-surface-container-low rounded-xl">
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Total Products</p>
                  <p className="text-3xl font-headline font-extrabold text-inverse-surface">{warehouse.productCount.toLocaleString()}</p>
                </div>
                <div className="p-6 bg-surface-container-low rounded-xl">
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Active Staff</p>
                  <p className="text-3xl font-headline font-extrabold text-inverse-surface">24</p>
                </div>
                <div className="p-6 bg-surface-container-low rounded-xl">
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Daily Shipments</p>
                  <p className="text-3xl font-headline font-extrabold text-inverse-surface">142</p>
                </div>
              </div>
            </section>

            {/* Placeholder for more content */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/15">
                <h3 className="text-lg font-headline font-bold text-inverse-surface mb-4 flex items-center gap-2">
                  <Icons.LayoutDashboard className="w-5 h-5 text-primary" />
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 py-3 border-b border-outline-variant/10 last:border-0">
                      <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center">
                        <Icons.Package className="w-5 h-5 text-on-surface-variant" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-inverse-surface">New shipment received</p>
                        <p className="text-xs text-on-surface-variant">2 hours ago • Batch #4492</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/15">
                <h3 className="text-lg font-headline font-bold text-inverse-surface mb-4 flex items-center gap-2">
                  <Icons.Users className="w-5 h-5 text-primary" />
                  Staff Members
                </h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 py-3 border-b border-outline-variant/10 last:border-0">
                      <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-white text-xs font-bold">
                        {["JD", "AS", "MK"][i-1]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-inverse-surface">{["Justin Doe", "Alice Smith", "Mark King"][i-1]}</p>
                        <p className="text-xs text-on-surface-variant">{["Manager", "Staff", "Staff"][i-1]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Actions */}
          <div className="space-y-8">
            <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/15">
              <h3 className="text-lg font-headline font-bold text-inverse-surface mb-4 flex items-center gap-2">
                <Icons.Mail className="w-5 h-5 text-primary" />
                Invite Staff
              </h3>
              <p className="text-sm text-on-surface-variant mb-6">Send an invitation to a new staff member via email.</p>
              <form onSubmit={handleInvite} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Email Address</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="staff@stokify.com" 
                    className="w-full px-4 py-2.5 bg-surface-container-low border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isInviting}
                  className="w-full py-2.5 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-container transition-all shadow-md disabled:opacity-50"
                >
                  {isInviting ? "Sending..." : "Send Invitation"}
                </button>
              </form>
            </section>

            <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/15">
              <h3 className="text-lg font-headline font-bold text-inverse-surface mb-4 flex items-center gap-2">
                <Icons.Settings className="w-5 h-5 text-primary" />
                Warehouse Settings
              </h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 text-sm font-bold text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors">
                  Edit Details
                </button>
                <button className="w-full text-left px-4 py-2 text-sm font-bold text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors">
                  Manage Permissions
                </button>
                <button className="w-full text-left px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  Archive Warehouse
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};