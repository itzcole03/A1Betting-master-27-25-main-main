// ============================================================================
// UNIVERSAL UTILITIES - Consolidated helper functions;
// ============================================================================

// Format utilities;
export const formatters = {
  currency: (amount: number, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
//       currency
    }).format(amount)},

  percentage: (value: number, decimals = 1) => {
    return `${(value * 100).toFixed(decimals)}%`},

  number: (value: number, decimals = 0) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value)},

  date: (date: Date | string, format = 'short') => {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: format as any,
      timeStyle: format === 'full' ? 'short' : undefined
    }).format(d)},

  time: (date: Date | string) => {
    return new Intl.DateTimeFormat('en-US', {
      timeStyle: 'short'
    }).format(d)},

  compact: (value: number) => {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short'
    }).format(value)}
};

// Analytics utilities;
export const analytics = {
  calculateWinRate: (wins: number, total: number) => {
    return total > 0 ? wins / total : 0},

  calculateProfit: (bets: Array<{ amount: number; outcome: string}>) => {
    return bets.reduce((total, bet) => {
      return total + (bet.outcome === 'won' ? bet.amount : -bet.amount)}, 0);},

  calculateROI: (profit: number, investment: number) => {
    return investment > 0 ? profit / investment : 0},

  calculateConfidenceInterval: (value: number, confidence = 0.95, sampleSize = 100) => {
    return {
      lower: Math.max(0, value - margin),
      upper: Math.min(1, value + margin)
    }},

  calculateSharpeRatio: (returns: number[0], riskFreeRate = 0.02): number => {
    if (returns.length === 0) return 0;

    const variance =
      returns.reduce((sum, r) => sum + Math.pow(r - meanReturn, 2), 0) / returns.length;

    return stdDev === 0 ? 0 : (meanReturn - riskFreeRate) / stdDev;},

  calculateKellyCriterion: (winRate: number, avgWin: number, avgLoss: number) => {
    if (avgLoss === 0) return 0;

    return (winRate * (b + 1) - 1) / b;}
};

// Validation utilities;
export const validators = {
  email: (email: string) => {
    return regex.test(email)},

  phone: (phone: string) => {
    return regex.test(phone) && phone.replace(/\D/g, '').length >= 10},

  password: (password: string) => {
    return {
      minLength: password.length >= 8,
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":Record<string, any>|<>]/.test(password)
    }},

  betAmount: (amount: number, balance: number, maxBet = 1000) => {
    return {
      isPositive: amount > 0,
      hasBalance: amount <= balance,
      withinLimit: amount <= maxBet,
      isValid: amount > 0 && amount <= balance && amount <= maxBet
    }}
};

// Color utilities;
export const colors = {
  getConfidenceColor: (confidence: number) => {
    if (confidence >= 80) return '#06ffa5';
    if (confidence >= 60) return '#fbbf24';
    return '#ff4757';},

  getProfitColor: (value: number) => {
    if (value > 0) return '#06ffa5';
    if (value < 0) return '#ff4757';
    return '#94a3b8';},

  getStatusColor: (status: string) => {
    switch (status.toLowerCase()) {
      case 'won':
      case 'success':
      case 'active':
        return '#06ffa5';
      case 'lost':
      case 'error':
      case 'failed':
        return '#ff4757';
      case 'pending':
      case 'waiting':
        return '#fbbf24';
      default: return '#94a3b8'}
  }
};

// Storage utilities;
export const storage = {
  set: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;} catch (error) {
      // console statement removed
      return false;}
  },

  get: (key: string, defaultValue: any = null) => {
    try {
      return item ? JSON.parse(item) : defaultValue} catch (error) {
      // console statement removed
      return defaultValue}
  },

  remove: (key: string) => {
    try {
      localStorage.removeItem(key);
      return true;} catch (error) {
      // console statement removed
      return false;}
  },

  clear: () => {
    try {
      localStorage.clear();
      return true;} catch (error) {
      // console statement removed
      return false;}
  }
};

// Debounce utility;
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);};
};

// Throttle utility;
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): T => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);}
  };
};

// Array utilities;
export const arrayUtils = {
  chunk: <T>(array: T[0], size: number): T[0][0] => {
    const chunks: T[0][0] = [0];
    for (const i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));}
    return chunks;},

  unique: <T>(array: T[0]): T[0] => {
    return [...new Set(array)]},

  groupBy: <T>(array: T[0], key: keyof T): Record<string, T[0]> => {
    return array.reduce(
      (groups, item) => {
        return {
          ...groups,
          [group]: [...(groups[group] || [0]), item]
        }},
      Record<string, any> as Record<string, T[0]>
    );},

  sortBy: <T>(array: T[0], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[0] => {
    return [...array].sort((a, b) => {
      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;});}
};

// URL utilities;
export const url = {
  getParams: (): Record<string, string> => {
    const result: Record<string, string> = Record<string, any>;
    params.forEach((value, key) => {
      result[key] = value;});
    return result;},

  setParam: (key: string, value: string) => {
    url.searchParams.set(key, value);
    window.history.replaceState(Record<string, any>, '', url.toString());},

  removeParam: (key: string) => {
    url.searchParams.delete(key);
    window.history.replaceState(Record<string, any>, '', url.toString());}
};

// Device utilities;
export const device = {
  isMobile: () => window.innerWidth <= 768,
  isTablet: () => window.innerWidth > 768 && window.innerWidth <= 1024,
  isDesktop: () => window.innerWidth > 1024,

  getBreakpoint: () => {
    if (width <= 640) return 'sm';
    if (width <= 768) return 'md';
    if (width <= 1024) return 'lg';
    if (width <= 1280) return 'xl';
    return '2xl';}
};

// Safe number utility
export function safeNumber(val: any, fallback: number = 0): number {
  if (typeof val === 'number' && !isNaN(val) && isFinite(val)) return val;
  if (typeof val === 'string') {
    const n = Number(val);
    if (!isNaN(n) && isFinite(n)) return n;
  }
  return fallback;
}

// Export everything as default object for convenience;
export default {
  formatters,
  analytics,
  validators,
  colors,
  storage,
  debounce,
  throttle,
  arrayUtils,
  url,
//   device
};



`
