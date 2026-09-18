// Multi-Page Routing mapping and synchronization for AgriAI

export const ROUTE_MAP: Record<string, string> = {
  '/': 'home',
  '/about': 'about',
  '/contact': 'contact',
  '/signin': 'signin',
  '/signup': 'signup',
  '/dashboard': 'dashboard',
  '/income-prediction': 'income-prediction',
  '/farmer-clustering': 'farmer-clustering',
  '/cluster-insights': 'cluster-summary',
  '/cluster-summary': 'cluster-summary',
  '/history': 'prediction-history',
  '/prediction-history': 'prediction-history',
  '/profile': 'profile',
};

export const TAB_TO_ROUTE: Record<string, string> = {
  home: '/',
  about: '/about',
  contact: '/contact',
  dashboard: '/dashboard',
  'income-prediction': '/income-prediction',
  'farmer-clustering': '/farmer-clustering',
  'cluster-summary': '/cluster-insights',
  'prediction-history': '/history',
  profile: '/profile',
};

export function getRouteFromPath(pathname: string): {
  tab: string;
  authMode?: 'signin' | 'signup';
} {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';

  if (cleanPath === '/signin') {
    return { tab: 'home', authMode: 'signin' };
  }
  if (cleanPath === '/signup') {
    return { tab: 'home', authMode: 'signup' };
  }

  const tab = ROUTE_MAP[cleanPath] || 'home';
  return { tab };
}

export function pushRoute(target: string) {
  if (typeof window === 'undefined') return;

  // If target starts with '/', use it directly; otherwise map tab to path
  const path = target.startsWith('/') ? target : (TAB_TO_ROUTE[target] || `/${target}`);
  if (window.location.pathname !== path) {
    window.history.pushState({}, '', path);
  }
}
