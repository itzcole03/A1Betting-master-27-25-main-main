import { AnimatePresence, motion} from 'framer-motion';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X} from 'lucide-react';
import React, { useEffect} from 'react';
import { useAppStore} from '../store/useAppStore';
import { ToastNotification} from '../utils/formatters';

interface ToastProps extends ToastNotification {
  onDismiss: (id: string) => void}

const Toast: React.FC<ToastProps> = ({ id, message, type, onDismiss}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(id)}, 5000);
    return () => clearTimeout(timer)}, [id, onDismiss]);

  const icons = {
    success: <CheckCircle className='w-5 h-5 text-green-400' />,
    error: <AlertTriangle className='w-5 h-5 text-red-400' />,
    info: <Info className='w-5 h-5 text-blue-400' />,
    warning: <AlertCircle className='w-5 h-5 text-yellow-400' />
  };

  const borderColors = {
    success: 'border-green-500',
    error: 'border-red-500',
    info: 'border-blue-500',
    warning: 'border-yellow-500'
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.3}}
      animate={{ opacity: 1, x: 0, scale: 1}}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2} }}
      className={`
        flex items-center gap-3 p-4 bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-xl border-l-4 ${borderColors[type]}
        max-w-sm w-full pointer-events-auto
      `}
    >
      {icons[type]}
      <div className='flex-1'>
        <p className='text-sm text-white'>{message}</p>
      </div>
      <button onClick={() => onDismiss(id)}
        className='text-gray-400 hover:text-white transition-colors'
      >
        <X className='w-4 h-4' />
      </button>
    </motion.div>
  )};

const SimpleToaster: React.FC = () => {
  const { toasts, removeToast} = useAppStore();

  return (
    <div className='fixed bottom-4 right-4 z-[9999] space-y-3 pointer-events-none'>
      <AnimatePresence>
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} onDismiss={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  )};

export default SimpleToaster;



`
