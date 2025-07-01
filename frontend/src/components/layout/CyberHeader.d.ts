import React from 'react.ts';
interface CyberHeaderProps {
  currentPage?: string;
  onToggleSidebar?: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  user?: {
    name: string,`n  email: string;,`n  balance: number,`n  tier: string;,`n  accuracy: number};
  className?: string;}
declare const CyberHeader: React.FC<CyberHeaderProps>;
export default CyberHeader;


`
