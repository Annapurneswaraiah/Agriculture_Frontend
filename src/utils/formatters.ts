import { ClusterInfo } from '../types';

export const CLUSTER_SEGMENTS: Record<number, ClusterInfo> = {
  0: {
    id: 0,
    groupCode: 'Group_0',
    name: 'Commercial Farmers',
    percentage: 28,
    color: '#10b981', // emerald
    description: 'Large-scale mechanised and intensive farm operations prioritizing high market yield and surplus production.',
    characteristics: {
      avgLand: '5.0+ Hectares',
      primaryActivity: 'Cash Crops & Large Grains',
      avgLivestock: 'Moderate - High herd quality',
      fertilizerUsage: 'High (>180 kg/ha)',
      annualIncomeRange: '₦ 850,000 - ₦ 2,500,000+ (~₹ 4,00,000+)',
    },
    recommendations: [
      'Implement precision agriculture and automated drip irrigation',
      'Optimize bulk fertilizer purchasing and forward contract grain selling',
      'Adopt GPS soil nutrient mapping for targeted fertilizer reduction'
    ]
  },
  1: {
    id: 1,
    groupCode: 'Group_1',
    name: 'Mixed Farmers',
    percentage: 22,
    color: '#3b82f6', // blue
    description: 'Integrated farming households combining crop cultivation with small ruminants and dairy cows.',
    characteristics: {
      avgLand: '2.0 - 4.5 Hectares',
      primaryActivity: 'Rotational Crops & Livestock',
      avgLivestock: '4-8 Goats/Sheep, 20-40 L milk/wk',
      fertilizerUsage: 'Moderate (80 - 150 kg/ha)',
      annualIncomeRange: '₦ 350,000 - ₦ 750,000 (~₹ 1,85,000)',
    },
    recommendations: [
      'Utilize organic animal manure to decrease synthetic fertilizer dependence',
      'Explore cold-chain storage for surplus dairy milk and fresh eggs',
      'Diversify with high-value leguminous fodder trees'
    ]
  },
  2: {
    id: 2,
    groupCode: 'Group_2',
    name: 'Livestock Focused',
    percentage: 18,
    color: '#8b5cf6', // purple
    description: 'Pastoralist and agro-pastoralist producers where animal husbandry generates the majority of livelihood.',
    characteristics: {
      avgLand: '1.0 - 3.0 Hectares',
      primaryActivity: 'Dairy, Goats, Sheep, Poultry',
      avgLivestock: '10+ Goats/Sheep, High egg/milk yield',
      fertilizerUsage: 'Low to Moderate (<80 kg/ha)',
      annualIncomeRange: '₦ 280,000 - ₦ 600,000 (~₹ 1,40,000)',
    },
    recommendations: [
      'Invest in animal health vaccination schedules and breed improvement',
      'Install solar refrigeration for daily milk preservation',
      'Form poultry and goat marketing cooperatives to capture retail margins'
    ]
  },
  3: {
    id: 3,
    groupCode: 'Group_3',
    name: 'Smallholder Farmers',
    percentage: 16,
    color: '#f59e0b', // amber
    description: 'Family-run farms with modest land acreage focused on local food security and community markets.',
    characteristics: {
      avgLand: '0.8 - 2.0 Hectares',
      primaryActivity: 'Staple Grains & Vegetables',
      avgLivestock: '2-4 Goats/Sheep, modest poultry',
      fertilizerUsage: 'Moderate (50 - 100 kg/ha)',
      annualIncomeRange: '₦ 180,000 - ₦ 400,000 (~₹ 95,000)',
    },
    recommendations: [
      'Join village cooperative credit schemes to access subsidized inputs',
      'Intercrop maize with nitrogen-fixing cowpeas or pigeon peas',
      'Adopt micro-dosing fertilizer techniques to maximize return on input'
    ]
  },
  4: {
    id: 4,
    groupCode: 'Group_4',
    name: 'Subsistence Farmers',
    percentage: 16,
    color: '#ef4444', // red
    description: 'Small plots managed primarily for household nutrition with occasional small barter in local markets.',
    characteristics: {
      avgLand: '< 1.0 Hectare',
      primaryActivity: 'Tubers, Cassava & Subsistence Maize',
      avgLivestock: 'Minimal (0-2 small animals)',
      fertilizerUsage: 'Low (<40 kg/ha)',
      annualIncomeRange: '₦ 90,000 - ₦ 220,000 (~₹ 50,000)',
    },
    recommendations: [
      'Adopt bio-fortified seed varieties (iron beans, vitamin A cassava)',
      'Construct rainwater harvesting pits for dry-season backyard gardens',
      'Explore micro-credit government agricultural support programs'
    ]
  }
};

export const FARMING_SYSTEM_OPTIONS = [
  'Mixed Cropping',
  'Commercial Crop Production',
  'Livestock & Pastoral Farming',
  'Agroforestry & Cash Crops',
  'Smallholder Grain Farming',
  'Horticulture & Vegetable Farming',
  'Subsistence Multi-Cropping'
];

/**
 * Format currency in NGN (model's native output) with optional INR conversion
 */
export function formatCurrencyNGN(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || isNaN(amount)) return '₦ 0.00';
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format currency in Indian Rupee (as in screenshot)
 */
export function formatCurrencyINR(amountNgn: number | null | undefined): string {
  if (amountNgn === null || amountNgn === undefined || isNaN(amountNgn)) return '₹ 0';
  // Approx 1 NGN ≈ 0.49 INR for standard parity or screenshot benchmark (₦378,550 ≈ ₹1,85,000)
  const inrValue = Math.round(amountNgn * 0.4887);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(inrValue);
}

export function formatNumber(num: number | null | undefined): string {
  if (num === null || num === undefined || isNaN(num)) return '0';
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatDate(timestampOrDate: number | string | Date): string {
  const d = new Date(timestampOrDate);
  if (isNaN(d.getTime())) return 'Recently';
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function getClusterData(clusterNumOrStr: number | string): ClusterInfo {
  let id = 0;
  if (typeof clusterNumOrStr === 'number') {
    id = clusterNumOrStr;
  } else if (typeof clusterNumOrStr === 'string') {
    const match = clusterNumOrStr.match(/\d+/);
    id = match ? parseInt(match[0], 10) : 0;
  }
  return CLUSTER_SEGMENTS[id % 5] || CLUSTER_SEGMENTS[0];
}
