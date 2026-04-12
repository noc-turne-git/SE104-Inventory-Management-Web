import React from 'react';
import { motion } from 'motion/react';
import type { HomeData } from '../types/home';
import { ImageSlider } from '../features/home/imageSlider';
import { Header } from '../features/home/header';
import { 
  InventoryIcon, 
  BarcodeScannerIcon, 
  WarningIcon, 
  LocalShippingIcon, 
  ReceiptLongIcon, 
  UpdateIcon, 
  TouchAppIcon, 
  SecurityIcon, 
  CheckCircleIcon, 
  LanguageIcon, 
  TerminalIcon, 
  MenuIcon,
  ArrowForwardIcon 
} from '../features/home/iconHome';

const IconMap: Record<string, React.FC<{ className?: string }>> = {
  inventory_2: InventoryIcon,
  barcode_scanner: BarcodeScannerIcon,
  warning: WarningIcon,
  local_shipping: LocalShippingIcon,
  receipt_long: ReceiptLongIcon,
  update: UpdateIcon,
  touch_app: TouchAppIcon,
  security: SecurityIcon,
  check_circle: CheckCircleIcon,
  language: LanguageIcon,
  terminal: TerminalIcon,
  menu: MenuIcon,
};

interface HomeScreenProps {
  data: HomeData;
  themeColor: string;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ data, themeColor }) => {
  return (
    <div className="min-h-screen bg-[#0a0e14] text-[#dfe2eb] font-sans selection:bg-primary/30" style={{ '--primary-color': themeColor } as any}>
      <Header themeColor={themeColor} />

      {/* Hero Section */}
      <section className="relative min-h-[110vh] flex items-center pt-32 pb-24 overflow-hidden bg-linear-to-b from-[#0a0e14] via-[#0f172a] to-[#0a0e14]">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#1f6feb]/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#5825b3]/15 rounded-full blur-[100px]"></div>
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-10"
          >
            <h1 className="text-7xl md:text-[90px] font-black tracking-tighter leading-[0.85] text-[#dfe2eb]">
              Smart warehouse <br/>
              management <br/>
              <span className="text-[#afc6ff]">made simple</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-xl leading-relaxed font-medium">
              {data.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-full sm:w-80">
                <input 
                  className="w-full bg-[#05080c] border border-white/5 rounded-lg px-6 py-4 text-[#dfe2eb] focus:ring-0 focus:border-white/10 transition-all placeholder:text-slate-600" 
                  placeholder="Enter your email" 
                  type="email"
                />
              </div>
              <button 
                className="w-full sm:w-auto bg-linear-to-r from-[#afc6ff] to-[#1f6feb] text-[#002d6d] px-12 py-5 rounded-lg font-black text-2x1 hover:opacity-90 transition-all shadow-xl shadow-[#1f6feb]/20"              >
                {data.hero.cta}
              </button>
            </div>
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-3 text-slate-400 hover:text-slate-100 transition-colors font-normal text-sm">
                <InventoryIcon className="w-5 h-5" />
                {data.hero.secondaryCta}
              </button>
              <span className="text-slate-800">|</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center -space-x-3">
                  <img alt="User 1" className="w-10 h-10 rounded-full border-2 border-[#0a0e14]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAB1OeFoicu5nOhNzAkPV-so_-Vz-ZnqFnLH0jCq6jjJ1wHV3ExeKLhSJsXgbXOHTsJ6CJodtHssCwYE9G37hTpjxh9qerhy9nSUvs5_5wKhDur7ZD0GZ5B_U5zWycDuyrjqpzpwRmOD9KKvqiDtLnoHcu781Js_OGDpdnsQI43Lk0XBATdAeMeU13MDGMeix2HgPneZxFy1UPCWKS7yNLU_fV_mBFmZ6JrvbwdrAKBjmK9Ib8jilB3ytkb93v_e8MTXb2oUEI4PIM" referrerPolicy="no-referrer" />
                  <img alt="User 2" className="w-10 h-10 rounded-full border-2 border-[#0a0e14]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6lKgM1GwGpZRnuLK32VvwingWi--lOuBG4lrdmC6pIYgmlsTCrKXO2diRV4WFfbi-pFw1vHDQrOdFyYBQ1fqUa_ZC_Od8DTFdMc4bDFFOZW9gcou4HQmG6sxP_uNMey3d8QpVO78YPgmRp3Jf-pTGTf_9aPg8orRPo1f_Z56pyo-SbcYKR1r7PBIuVUR7k6so_ZP1q1oA3LNc_IhjnUNz02U696-9BkMg9D-rgt47qsGEjcnEwnBnctDI2gMhVf3hJfc7cp_4iSc" referrerPolicy="no-referrer" />
                  <div className="w-10 h-10 rounded-full border-2 border-[#0a0e14] bg-[#1c2026] flex items-center justify-center text-[10px] font-bold text-white">+12k</div>
                </div>
                <span className="text-[11px] text-slate-500 font-normal tracking-tight">Trust by global hubs</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block relative aspect-4/3 w-full"
          >
            <ImageSlider images={data.sliderImages} themeColor={themeColor} />
          </motion.div>
        </div>
      </section>

      {/* Transition to Light Mode */}
      <div className="bg-white text-slate-900 selection:bg-[#1f6feb]/20">
        {/* Features Section */}
        <section className="py-32 bg-white">
          <div className="max-w-screen-2xl mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-6xl font-black tracking-tight mb-6 text-slate-900">Operational Precision</h2>
                <p className="text-slate-500 text-xl font-normal">Every pallet, every shipment, tracked with sub-second accuracy across your entire network.</p>
              </div>
              <button className="flex items-center gap-2 text-[#1f6feb] font-bold hover:gap-4 transition-all">
                View all modules
                <ArrowForwardIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.features.map((feature, index) => (
                <motion.div 
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition-all group"
                >
                  <div className="flex justify-between items-start mb-10">
                    <div className={`p-4 rounded-xl ${feature.color === 'error' ? 'bg-red-50 text-red-600' : feature.color === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                      {IconMap[feature.icon] ? React.createElement(IconMap[feature.icon], { className: "w-8 h-8" }) : null}
                    </div>
                    <span className="text-[10px] font-black tracking-widest text-slate-300 uppercase mt-2">{feature.status}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-4xl font-black text-slate-900">
                      {feature.value.split(' ')[0]}
                    </span>
                    {feature.value.includes(' ') && (
                      <span className="text-sm font-bold text-slate-400">{feature.value.split(' ')[1]}</span>
                    )}
                    {feature.change && (
                      <span className={`text-sm font-black ${feature.color === 'error' ? 'text-red-600' : 'text-emerald-600'}`}>{feature.change}</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed font-normal">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard Preview Section */}
        <section className="py-32 bg-slate-50/50">
          <div className="max-w-screen-2xl mx-auto px-8">
            <div className="text-center mb-24">
              <h2 className="text-6xl font-black tracking-tight mb-8 text-slate-900">{data.dashboard.title}</h2>
              <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-normal">
                {data.dashboard.description}
              </p>
            </div>
            <div className="relative">
              <div className="relative z-10 bg-white rounded-3xl p-10 shadow-[0_50px_100px_rgba(0,0,0,0.05)] border border-slate-100">
                <div className="grid grid-cols-12 gap-12">
                  <div className="hidden lg:flex col-span-2 flex-col gap-8">
                    <div className="w-full h-10 bg-slate-100 rounded-xl"></div>
                    <div className="flex flex-col gap-4">
                      <div className="w-full h-5 bg-[#1f6feb]/10 rounded-lg" style={{ backgroundColor: `${themeColor}15` }}></div>
                      <div className="w-3/4 h-5 bg-slate-50 rounded-lg"></div>
                      <div className="w-5/6 h-5 bg-slate-50 rounded-lg"></div>
                    </div>
                    <div className="mt-auto">
                      <div className="w-12 h-12 rounded-full bg-slate-100"></div>
                    </div>
                  </div>
                  <div className="col-span-12 lg:col-span-10 flex flex-col gap-10">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col gap-2">
                        <div className="w-40 h-8 bg-slate-100 rounded-lg"></div>
                        <div className="w-64 h-5 bg-slate-50 rounded-lg"></div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-28 h-12 bg-slate-100 rounded-xl"></div>
                        <div className="w-28 h-12 bg-[#1f6feb] rounded-xl" style={{ backgroundColor: themeColor }}></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-8 h-100">
                      <div className="col-span-2 bg-slate-50/50 rounded-2xl p-8 border border-slate-100 flex flex-col">
                        <div className="flex justify-between items-center mb-12">
                          <div className="w-48 h-5 bg-slate-200/50 rounded-lg"></div>
                          <div className="flex gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#1f6feb]" style={{ backgroundColor: themeColor }}></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                          </div>
                        </div>
                        <div className="mt-auto flex items-end gap-3 h-full pb-6">
                          <div className="flex-1 bg-[#1f6feb]/20 h-[50%] rounded-t-lg" style={{ backgroundColor: `${themeColor}33` }}></div>
                          <div className="flex-1 bg-[#1f6feb]/40 h-[75%] rounded-t-lg" style={{ backgroundColor: `${themeColor}66` }}></div>
                          <div className="flex-1 bg-[#1f6feb] h-full rounded-t-lg" style={{ backgroundColor: themeColor }}></div>
                          <div className="flex-1 bg-[#1f6feb]/40 h-[65%] rounded-t-lg" style={{ backgroundColor: `${themeColor}66` }}></div>
                          <div className="flex-1 bg-[#1f6feb]/30 h-[85%] rounded-t-lg" style={{ backgroundColor: `${themeColor}4d` }}></div>
                        </div>
                      </div>
                      <div className="col-span-1 flex flex-col gap-6">
                        <div className="flex-1 bg-slate-50/50 rounded-2xl border border-slate-100"></div>
                        <div className="flex-1 bg-slate-50/50 rounded-2xl border border-slate-100"></div>
                        <div className="flex-1 bg-slate-50/50 rounded-2xl border border-slate-100"></div>
                        <div className="flex-1 bg-slate-50/50 rounded-2xl border border-slate-100"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-32 bg-white">
          <div className="max-w-screen-2xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
              {data.benefits.map((benefit) => (
                <div key={benefit.id} className="flex flex-col gap-8">
                  <div className="text-[#1f6feb]">
                    {IconMap[benefit.icon] ? React.createElement(IconMap[benefit.icon], { className: "w-12 h-12" }) : null}
                  </div>
                  <h3 className="text-4xl font-black text-slate-900 tracking-tight">{benefit.title}</h3>
                  <p className="text-slate-500 text-lg leading-relaxed font-normal">
                    {benefit.description}
                  </p>
                  <ul className="flex flex-col gap-4">
                    {benefit.points.map((point, idx) => (
                      <li key={idx} className="flex items-center gap-4 text-sm text-slate-500 font-bold">
                        <CheckCircleIcon className="w-6 h-6 text-[#1f6feb]" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-100 py-20 px-8 w-full font-sans">
          <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex flex-col gap-4">
              <span className="text-4xl font-bold tracking-tighter text-[#0F172A]">Stockify</span>
              <p className="text-slate-400 max-w-xs text-sm font-normal">© 2024 <span className="text-[#0F172A]">Stockify</span>, Inc. Built for the kinetic vault.</p>
            </div>
            <div className="flex items-center gap-16">
              <a className="text-slate-500 hover:text-[#1f6feb] transition-colors text-sm font-normal" href="#">About</a>
              <a className="text-slate-500 hover:text-[#1f6feb] transition-colors text-sm font-normal" href="#">Docs</a>
              <a className="text-slate-500 hover:text-[#1f6feb] transition-colors text-sm font-normal" href="#">Contact</a>
            </div>
            <div className="flex items-center gap-6">
              <button className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#1f6feb] transition-colors">
                <LanguageIcon className="w-6 h-6" />
              </button>
              <button className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#1f6feb] transition-colors">
                <TerminalIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
