import { Menu } from 'lucide-react';

export default function Navbar({ onMenuClick }) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="h-full flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors lg:hidden"
          >
            <Menu size={24} className="text-gray-700" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">IoT</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 hidden sm:block">
              Plataforma IoT
            </h2>
          </div>
        </div>
      </div>
    </header>
  );
}