export interface RegressionInput {
  farming_system: string;
  head_of_household_age: number;
  land_owned_hectares: number;
  fertilizer_used_kg_per_hectare: number;
  goats_number: number;
  sheep_number: number;
  livestock_eggs_per_week: number;
  livestock_milk_litres_per_week: number;
}

export interface RegressionResponse {
  status: string;
  predicted_income_ngn: number;
  currency?: string;
  detail?: Array<{
    loc: (string | number)[];
    msg: string;
    type: string;
  }>;
}

export interface ClusteringInput {
  farming_system?: string;
  head_of_household_age?: number;
  land_owned_hectares?: number;
  fertilizer_used_kg_per_hectare?: number;
  goats_number?: number;
  sheep_number?: number;
  livestock_eggs_per_week?: number;
  livestock_milk_litres_per_week?: number;
  additionalProp1?: Record<string, any>;
  [key: string]: any;
}

export interface ClusteringResponse {
  status: string;
  cluster: number;
  farmer_segment: string;
  detail?: Array<{
    loc: (string | number)[];
    msg: string;
    type: string;
  }>;
}

export interface ClusterInfo {
  id: number;
  groupCode: string;
  name: string;
  percentage: number;
  color: string;
  description: string;
  characteristics: {
    avgLand: string;
    primaryActivity: string;
    avgLivestock: string;
    fertilizerUsage: string;
    annualIncomeRange: string;
  };
  recommendations: string[];
}

export interface PredictionHistoryItem {
  id: string;
  type: 'regression' | 'clustering';
  title: string;
  dateFormatted: string;
  timestamp: number;
  status: 'Success' | 'Failed';
  inputData: Record<string, any>;
  resultData: {
    predicted_income_ngn?: number;
    cluster?: number;
    farmer_segment?: string;
    segmentName?: string;
  };
  source: 'render_api' | 'ml_fallback';
}

export interface UserProfile {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  farmSizeHectares: number;
  farmingSystem: string;
  memberSince: string;
  avatarInitials: string;
}

export interface UserLoginHistoryItem {
  id: string;
  timestamp: number;
  dateFormatted: string;
  userName: string;
  phone: string;
  email: string;
  status: 'Success' | 'Failed';
  method: 'Password Auth' | 'Phone OTP' | 'Session Restore' | 'Registration';
  device: string;
  browser: string;
  ipAddress: string;
  location: string;
  isCurrentSession?: boolean;
}

export interface QueryAdvisory {
  problemCategory: string;
  problemTitle: string;
  severity: 'Urgent' | 'Moderate' | 'Optimizing';
  diagnosis: string;
  keyFactors: string[];
  actionSteps: string[];
  modelRecommendation: string;
  potentialImpact: string;
  suggestedInputs?: {
    farming_system?: string;
    head_of_household_age?: number;
    land_owned_hectares?: number;
    fertilizer_used_kg_per_hectare?: number;
    goats_number?: number;
    sheep_number?: number;
    livestock_eggs_per_week?: number;
    livestock_milk_litres_per_week?: number;
  };
  recommendedTab: 'income-prediction' | 'farmer-clustering' | 'cluster-summary' | 'dashboard';
  clusterTarget?: string;
}

export interface NotificationItem {
  id: number;
  title: string;
  time: string;
  desc: string;
  read: boolean;
  type?: 'query' | 'system' | 'ml';
  queryDetails?: {
    name: string;
    phone: string;
    email?: string;
    subject: string;
    message: string;
  };
  advisory?: QueryAdvisory;
}
