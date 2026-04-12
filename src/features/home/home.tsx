import React, { useState } from 'react';
import { HomeScreen } from '../../screens/HomeScreen';
import { MOCK_HOME_DATA } from '../../data/MOCK_HOME';
import { Settings } from 'lucide-react';

const Home: React.FC = () => {
  const [themeColor, setThemeColor] = useState('#afc6ff');
  const [showSettings, setShowSettings] = useState(false);

  const colors = [
    { name: 'Blue', value: '#afc6ff' },
    { name: 'Emerald', value: '#10b981' },
    { name: 'Violet', value: '#8b5cf6' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Rose', value: '#f43f5e' },
  ];

  return (
    <div className="relative">
      {/* Theme Customizer Trigger */}
      <button 
        onClick={() => setShowSettings(!showSettings)}
        className="fixed bottom-8 right-8 z-100 bg-white text-slate-900 p-4 rounded-full shadow-2xl hover:scale-110 transition-transform border border-slate-200"
      >
        <Settings size={24} />
      </button>

      {/* Theme Customizer Panel */}
      {showSettings && (
        <div className="fixed bottom-24 right-8 z-100 bg-white p-6 rounded-2xl shadow-2xl border border-slate-200 w-64 animate-in fade-in slide-in-from-bottom-4">
          <h3 className="text-slate-900 font-bold mb-4">Customize Theme</h3>
          <div className="grid grid-cols-5 gap-2">
            {colors.map((color) => (
              <button
                key={color.value}
                onClick={() => setThemeColor(color.value)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${themeColor === color.value ? 'border-slate-900 scale-110' : 'border-transparent'}`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
          <div className="mt-6">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Custom Hex</label>
            <input 
              type="color" 
              value={themeColor}
              onChange={(e) => setThemeColor(e.target.value)}
              className="w-full h-10 rounded-lg cursor-pointer bg-slate-50 border border-slate-200 p-1"
            />
          </div>
        </div>
      )}

      <HomeScreen data={MOCK_HOME_DATA} themeColor={themeColor} />
    </div>
  );
};

export default Home;
