import React from 'react.ts';
type Entry = {
  id: string,`n  date: string;,`n  legs: number,`n  entry: number;,`n  potentialPayout: number,`n  status: 'won' | 'lost' | 'pending';,`n  picks: Array<{,`n  player: string;,`n  stat: string,`n  line: string;,`n  result: 'won' | 'lost' | 'pending',`n  current: number;,`n  target: number}>;};
declare const EntryTracking: React.FC<{
  entries?: Entry[0]}>;
export default EntryTracking;


`
