import { UserLoginHistoryItem, UserProfile } from '../types';

const STORAGE_KEY = 'agri_ai_user_login_history';

/**
 * Detect client OS, browser, and device architecture
 */
export function detectClientEnvironment(): { device: string; browser: string } {
  if (typeof window === 'undefined' || !navigator) {
    return { device: 'Desktop Workstation', browser: 'Web Browser' };
  }

  const ua = navigator.userAgent;
  let browser = 'Chrome';
  if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Edg/')) browser = 'Microsoft Edge';
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
  else if (ua.includes('OPR/') || ua.includes('Opera')) browser = 'Opera';

  let device = 'Desktop (Linux/Web)';
  if (/Android/i.test(ua)) device = 'Android Mobile';
  else if (/iPhone|iPad|iPod/i.test(ua)) device = 'iOS Mobile Device';
  else if (/Windows/i.test(ua)) device = 'Windows PC';
  else if (/Macintosh|Mac OS/i.test(ua)) device = 'macOS Workstation';
  else if (/Linux/i.test(ua)) device = 'Linux Workstation';

  return { device, browser };
}

/**
 * Generate formatted timestamp string: "DD MMM YYYY, hh:mm:ss A"
 */
export function formatLoginDate(date: Date = new Date()): string {
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
}

/**
 * Initial seed records if none exist in localStorage
 */
function getInitialSeedHistory(user?: UserProfile | null): UserLoginHistoryItem[] {
  const env = detectClientEnvironment();
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const fiveDaysAgo = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);

  const userName = user?.name || 'Dr. Ibrahim Alabi';
  const phone = user?.phone || '+234 803 456 7890';
  const email = user?.email || 'ibrahim.alabi@agriai.org';
  const location = user?.location || 'Kaduna State, Nigeria';

  return [
    {
      id: `login-${now.getTime()}`,
      timestamp: now.getTime(),
      dateFormatted: formatLoginDate(now),
      userName,
      phone,
      email,
      status: 'Success',
      method: 'Password Auth',
      device: env.device,
      browser: env.browser,
      ipAddress: '102.89.34.120',
      location,
      isCurrentSession: true,
    },
    {
      id: `login-${yesterday.getTime()}`,
      timestamp: yesterday.getTime(),
      dateFormatted: formatLoginDate(yesterday),
      userName,
      phone,
      email,
      status: 'Success',
      method: 'Phone OTP',
      device: env.device,
      browser: env.browser,
      ipAddress: '102.89.34.118',
      location,
      isCurrentSession: false,
    },
    {
      id: `login-${fiveDaysAgo.getTime()}`,
      timestamp: fiveDaysAgo.getTime(),
      dateFormatted: formatLoginDate(fiveDaysAgo),
      userName,
      phone,
      email,
      status: 'Success',
      method: 'Registration',
      device: 'Desktop Workstation',
      browser: 'Chrome',
      ipAddress: '102.89.32.45',
      location,
      isCurrentSession: false,
    },
  ];
}

/**
 * Retrieve saved login history from localStorage
 */
export function getLoginHistory(user?: UserProfile | null): UserLoginHistoryItem[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to parse login history from localStorage', err);
  }

  // Seed default history
  const seed = getInitialSeedHistory(user);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  } catch {}
  return seed;
}

/**
 * Record a new login history item
 */
export function recordLoginEvent(params: {
  userName: string;
  phone: string;
  email: string;
  method?: 'Password Auth' | 'Phone OTP' | 'Session Restore' | 'Registration';
  status?: 'Success' | 'Failed';
  location?: string;
  ipAddress?: string;
}): UserLoginHistoryItem {
  const env = detectClientEnvironment();
  const now = new Date();

  // Create new session item
  const newItem: UserLoginHistoryItem = {
    id: `login-${now.getTime()}-${Math.random().toString(36).substr(2, 5)}`,
    timestamp: now.getTime(),
    dateFormatted: formatLoginDate(now),
    userName: params.userName || 'Agricultural Producer',
    phone: params.phone || '+234 800 000 0000',
    email: params.email || 'farmer@agriai.org',
    status: params.status || 'Success',
    method: params.method || 'Password Auth',
    device: env.device,
    browser: env.browser,
    ipAddress: params.ipAddress || `102.89.${Math.floor(Math.random() * 50) + 10}.${Math.floor(Math.random() * 200) + 10}`,
    location: params.location || 'Agricultural Operations Hub',
    isCurrentSession: true,
  };

  if (typeof window !== 'undefined') {
    try {
      const existing = getLoginHistory();
      // Mark older sessions as not current
      const updated = [
        newItem,
        ...existing.map((item) => ({ ...item, isCurrentSession: false })),
      ].slice(0, 50); // Keep last 50 entries

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to record login event', err);
    }
  }

  return newItem;
}

/**
 * Clear all login history items
 */
export function clearLoginHistory(): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }
}

/**
 * Export login history items to downloadable JSON file
 */
export function exportLoginHistoryAsJson(history: UserLoginHistoryItem[]): void {
  if (typeof window === 'undefined') return;

  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(history, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `user-login-history-${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
