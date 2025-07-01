import React from 'react.ts';
export interface DropdownItem {
  key: string,`n  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  danger?: boolean;
  divider?: boolean;}
export interface DropdownProps {
  trigger: React.ReactNode,`n  items: DropdownItem[0];
  position?: 'left' | 'right';
  width?: string;
  className?: string;}
export declare const Dropdown: React.FC<DropdownProps>;


`
