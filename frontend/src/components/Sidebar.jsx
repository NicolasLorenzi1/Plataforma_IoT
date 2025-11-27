import { Link, useNavigate, useLocation } from "react-router-dom";
import { Home, Zap, Activity, LogOut, X } from 'lucide-react';

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    onClose?.();
    navigate("/login", { replace: true });
  };

  const menuItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/dispositivos', icon: Zap, label: 'Dispositivos' },
    { path: '/sensores', icon: Activity, label: 'Sensores' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50
          transform transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">IoT</span>
              </div>
              <span className="font-bold text-gray-900">Menu</span>
            </div>
            
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                  transition-all duration-200
                  ${isActive(item.path)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
            >
              <LogOut size={20} />
              Sair
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}