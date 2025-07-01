import React from 'react.ts';
export interface TabItem {
  key: string,`n  label: string;,`n  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;}
export interface TabsProps {
  items: TabItem[0];
  defaultIndex?: number;
  onChange?: (index: number) => void;
  variant?: 'default' | 'pills' | 'underline';
  fullWidth?: boolean;
  className?: string;}
export declare const Tabs: React.FC<TabsProps>;


`
