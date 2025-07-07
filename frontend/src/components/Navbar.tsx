import { motion } from 'framer-motion';
import { Bell, Menu, Search, Settings, User, X } from 'lucide-react';
import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';

interface NavbarProps {
  onMenuToggle?: () => void;
  className?: string;
}

/**
 * Navbar Component
 *
 * Modern, responsive navigation bar for the A1Betting platform.
 * Includes user profile, notifications, search, and mobile menu.
 *
 * @param onMenuToggle - Function to toggle mobile menu
 * @param className - Additional CSS classes
 */
export const Navbar: React.FC<NavbarProps> = ({ onMenuToggle, className = '' }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAppContext();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    onMenuToggle?.();
  };

  return (
    <nav className={`bg-gray-900 border-b border-gray-700 ${className}`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='flex items-center'>
            <motion.div
              className='flex-shrink-0 flex items-center'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500'>
                A1BETTING
              </div>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:block'>
            <div className='ml-10 flex items-baseline space-x-4'>
              <NavLink href='/dashboard'>Dashboard</NavLink>
              <NavLink href='/predictions'>Predictions</NavLink>
              <NavLink href='/analytics'>Analytics</NavLink>
              <NavLink href='/portfolio'>Portfolio</NavLink>
            </div>
          </div>

          {/* Right Side */}
          <div className='flex items-center space-x-4'>
            {/* Search */}
            <motion.button
              className='p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors'
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label='Search'
            >
              <Search className='h-5 w-5' />
            </motion.button>

            {/* Notifications */}
            <motion.button
              className='p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors relative'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label='Notifications'
            >
              <Bell className='h-5 w-5' />
              <span className='absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-gray-900'></span>
            </motion.button>

            {/* Settings */}
            <motion.button
              className='p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label='Settings'
            >
              <Settings className='h-5 w-5' />
            </motion.button>

            {/* User Profile */}
            <div className='flex items-center space-x-3'>
              <div className='hidden md:block text-right'>
                <div className='text-sm font-medium text-white'>{user?.name || 'Guest User'}</div>
                <div className='text-xs text-gray-400'>{user?.role || 'Member'}</div>
              </div>
              <motion.button
                className='p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label='User profile'
              >
                <User className='h-5 w-5' />
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <motion.button
              className='md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors'
              onClick={toggleMobileMenu}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label='Toggle mobile menu'
            >
              {isMobileMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className='md:hidden'
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800'>
            <MobileNavLink href='/dashboard'>Dashboard</MobileNavLink>
            <MobileNavLink href='/predictions'>Predictions</MobileNavLink>
            <MobileNavLink href='/analytics'>Analytics</MobileNavLink>
            <MobileNavLink href='/portfolio'>Portfolio</MobileNavLink>
          </div>
        </motion.div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <motion.div
          className='absolute top-16 left-0 right-0 bg-gray-800 border-b border-gray-700 p-4 z-50'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className='max-w-2xl mx-auto'>
            <input
              type='text'
              placeholder='Search predictions, analytics, or players...'
              className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500'
            />
          </div>
        </motion.div>
      )}
    </nav>
  );
};

// Helper Components
const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a
    href={href}
    className='text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors'
  >
    {children}
  </a>
);

const MobileNavLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <a
    href={href}
    className='text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors'
  >
    {children}
  </a>
);

export default Navbar;
