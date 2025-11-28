/**
 * Constantes generales para cálculos
 */

// Umbrales para niveles de impacto (en kg de CO2)
export const IMPACT_THRESHOLDS = {
  LOW: 0.01,
  MEDIUM: 0.05,
  HIGH: 0.1,
};

// Colores para niveles de impacto
export const IMPACT_COLORS = {
  low: '#22c55e', // Verde
  medium: '#eab308', // Amarillo
  high: '#f97316', // Naranja
  'very-high': '#ef4444', // Rojo
};

// Días laborables por defecto
export const DEFAULT_WORK_DAYS_PER_YEAR = 220;

// Presets de uso diario (número de consultas)
export const USAGE_PRESETS = {
  light: {
    queries: 30,
    label: 'Día ligero',
    description: 'Uso ocasional de IA',
  },
  normal: {
    queries: 100,
    label: 'Día normal',
    description: 'Uso regular de IA',
  },
  intensive: {
    queries: 200,
    label: 'Día intensivo',
    description: 'Uso intensivo de IA',
  },
  extreme: {
    queries: 500,
    label: 'Día extremo',
    description: 'Uso muy intensivo de IA',
  },
};

// Factores de emisión por fuente de energía (g CO2/kWh)
export const EMISSION_FACTORS = {
  coal: 820,
  naturalGas: 490,
  renewable: 0,
  nuclear: 12,
  worldAverage: 475, // Promedio mundial
};

// Unidades de medida
export const UNITS = {
  energy: {
    wh: 'Wh',
    kwh: 'kWh',
    mwh: 'MWh',
  },
  water: {
    ml: 'ml',
    liters: 'L',
    cubicMeters: 'm³',
  },
  co2: {
    grams: 'g',
    kg: 'kg',
    tons: 't',
  },
  currency: {
    euros: '€',
    cents: 'c',
  },
};
