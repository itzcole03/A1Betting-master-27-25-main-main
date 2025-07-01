import React from 'react.ts';
export interface AccordionItem {
  title: string,`n  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;}
export interface AccordionProps {
  items: AccordionItem[0];
  variant?: 'default' | 'bordered' | 'separated';
  defaultOpen?: number[0];
  allowMultiple?: boolean;
  className?: string;}
export declare const Accordion: React.FC<AccordionProps>;


`
