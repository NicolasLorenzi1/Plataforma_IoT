import React from 'react';
import { 
  CheckCircle, 
  AlertCircle, 
  Info, 
  X, 
  Loader 
} from 'lucide-react';

// ==================== BUTTON COMPONENT ====================
export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon: Icon,
  onClick,
  disabled,
  type = 'button',
  className = ''
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200",
    ghost: "hover:bg-gray-100 text-gray-700",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-sm",
    success: "bg-green-600 hover:bg-green-700 text-white shadow-sm"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {Icon && <Icon size={size === 'sm' ? 16 : 18} />}
      {children}
    </button>
  );
};

// ==================== INPUT COMPONENT ====================
export const Input = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange,
  name,
  required,
  error,
  className = ''
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />
      {error && (
        <p className="text-xs text-red-600 flex items-center gap-1">
          <AlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  );
};

// ==================== SELECT COMPONENT ====================
export const Select = ({ 
  label, 
  options = [], 
  value, 
  onChange,
  name,
  required,
  placeholder = "Selecione...",
  className = ''
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
      >
        <option value="">{placeholder}</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// ==================== CARD COMPONENT ====================
export const Card = ({ children, className = '', hover = false }) => {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm ${hover ? 'hover:shadow-md transition-shadow duration-200' : ''} ${className}`}>
      {children}
    </div>
  );
};

// ==================== BADGE COMPONENT ====================
export const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    success: 'bg-green-100 text-green-700',
    ativo: 'bg-green-100 text-green-700',
    error: 'bg-red-100 text-red-700',
    inativo: 'bg-red-100 text-red-700',
    warning: 'bg-yellow-100 text-yellow-700',
    manutencao: 'bg-yellow-100 text-yellow-700',
    info: 'bg-blue-100 text-blue-700'
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium ${variants[variant] || variants.default}`}>
      {children}
    </span>
  );
};

// ==================== STAT CARD COMPONENT ====================
export const StatCard = ({ title, value, icon: Icon, trend, color = 'blue' }) => {
  const colors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500'
  };
  
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
          {trend !== undefined && (
            <p className={`text-sm mt-2 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% vs último período
            </p>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl ${colors[color]}`}>
            <Icon className="text-white" size={24} />
          </div>
        )}
      </div>
    </Card>
  );
};

// ==================== ALERT COMPONENT ====================
export const Alert = ({ children, variant = 'info', onClose }) => {
  const variants = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: CheckCircle
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: AlertCircle
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: Info
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: AlertCircle
    }
  };
  
  const config = variants[variant];
  const IconComponent = config.icon;
  
  return (
    <div className={`${config.bg} border ${config.border} rounded-xl p-4 flex items-start gap-3`}>
      <IconComponent className={config.text} size={20} />
      <div className={`flex-1 ${config.text} text-sm`}>{children}</div>
      {onClose && (
        <button onClick={onClose} className={`${config.text} hover:opacity-70`}>
          <X size={16} />
        </button>
      )}
    </div>
  );
};

// ==================== MODAL COMPONENT ====================
export const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;
  
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className={`w-full ${sizes[size]} bg-white rounded-2xl shadow-2xl animate-scale-in`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// ==================== LOADING COMPONENT ====================
export const Loading = ({ size = 'md', text }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };
  
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <Loader className={`${sizes[size]} animate-spin text-blue-600`} />
      {text && <p className="text-sm text-gray-600">{text}</p>}
    </div>
  );
};

// ==================== PAGE HEADER COMPONENT ====================
export const PageHeader = ({ title, subtitle, action }) => {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

// ==================== EMPTY STATE COMPONENT ====================
export const EmptyState = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="text-center py-12">
      {Icon && (
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-gray-100 rounded-2xl">
            <Icon size={48} className="text-gray-400" />
          </div>
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {description && <p className="text-gray-600 mb-6">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
};