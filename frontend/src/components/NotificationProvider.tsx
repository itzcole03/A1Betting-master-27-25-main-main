import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import React, { createContext, useCallback, useContext, useState } from 'react';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newNotification = { ...notification, id };

    setNotifications(prev => [...prev, newNotification]);

    // Auto-remove after duration (default 5 seconds)
    const duration = notification.duration ?? 5000;
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification, clearAll }}
    >
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
};

const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className='fixed top-4 right-4 z-50 space-y-2 max-w-sm'>
      <AnimatePresence>
        {notifications.map(notification => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onRemove={() => removeNotification(notification.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

interface NotificationItemProps {
  notification: Notification;
  onRemove: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onRemove }) => {
  const { type, title, message, action } = notification;

  const iconMap = {
    success: <CheckCircle className='w-5 h-5 text-green-400' />,
    error: <AlertTriangle className='w-5 h-5 text-red-400' />,
    warning: <AlertTriangle className='w-5 h-5 text-yellow-400' />,
    info: <Info className='w-5 h-5 text-blue-400' />,
  };

  const borderColorMap = {
    success: 'border-green-400/30',
    error: 'border-red-400/30',
    warning: 'border-yellow-400/30',
    info: 'border-blue-400/30',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.3 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.5, transition: { duration: 0.2 } }}
      className={`
        bg-black/80 backdrop-blur-md border rounded-lg p-4 shadow-lg
        ${borderColorMap[type]}
        max-w-sm w-full
      `}
    >
      <div className='flex items-start space-x-3'>
        <div className='flex-shrink-0 mt-0.5'>{iconMap[type]}</div>

        <div className='flex-1 min-w-0'>
          <h4 className='text-sm font-medium text-white'>{title}</h4>
          {message && <p className='mt-1 text-sm text-gray-300'>{message}</p>}

          {action && (
            <div className='mt-3'>
              <button
                onClick={action.onClick}
                className='text-xs font-medium text-cyber-primary hover:text-cyber-primary-light transition-colors'
              >
                {action.label}
              </button>
            </div>
          )}
        </div>

        <button
          onClick={onRemove}
          className='flex-shrink-0 text-gray-400 hover:text-white transition-colors'
        >
          <X className='w-4 h-4' />
        </button>
      </div>
    </motion.div>
  );
};

export default NotificationProvider;
