import { ToolModels } from '@/lib/types/tools';

export const CONSUMPTION_BASE: Record<string, ToolModels> = {
  chatgpt: {
    'gpt-4o': {
      energyWh: 0.35,
      waterMl: 0.32,
      co2Grams: 4.32,
      costEuros: 0.015,
    },
    'gpt-4': {
      energyWh: 0.43,
      waterMl: 0.40,
      co2Grams: 5.20,
      costEuros: 0.020,
    },
    'gpt-4-turbo': {
      energyWh: 0.38,
      waterMl: 0.35,
      co2Grams: 4.70,
      costEuros: 0.018,
    },
    'o3': {
      energyWh: 33.0,
      waterMl: 15.0,
      co2Grams: 42.0,
      costEuros: 0.150,
    },
    'o1': {
      energyWh: 25.0,
      waterMl: 12.0,
      co2Grams: 35.0,
      costEuros: 0.120,
    },
    'gpt-3.5-turbo': {
      energyWh: 0.15,
      waterMl: 0.14,
      co2Grams: 2.00,
      costEuros: 0.005,
    },
  },
  claude: {
    'sonnet-4': {
      energyWh: 0.38,
      waterMl: 0.35,
      co2Grams: 4.50,
      costEuros: 0.016,
    },
    'opus-4': {
      energyWh: 0.52,
      waterMl: 0.48,
      co2Grams: 6.20,
      costEuros: 0.025,
    },
    'sonnet-3.5': {
      energyWh: 0.32,
      waterMl: 0.30,
      co2Grams: 3.80,
      costEuros: 0.014,
    },
    'haiku-3.5': {
      energyWh: 0.12,
      waterMl: 0.11,
      co2Grams: 1.50,
      costEuros: 0.004,
    },
  },
  copilot: {
    'standard': {
      energyWh: 0.20,
      waterMl: 0.18,
      co2Grams: 2.50,
      costEuros: 0.008,
    },
    'gpt-4': {
      energyWh: 0.40,
      waterMl: 0.37,
      co2Grams: 4.80,
      costEuros: 0.018,
    },
  },
  gemini: {
    'pro': {
      energyWh: 0.30,
      waterMl: 0.28,
      co2Grams: 3.60,
      costEuros: 0.012,
    },
    'ultra': {
      energyWh: 0.45,
      waterMl: 0.42,
      co2Grams: 5.40,
      costEuros: 0.022,
    },
  },
};

export const QUERY_TYPE_MULTIPLIERS = {
  simple: 1.0, // Búsquedas rápidas, código simple
  medium: 1.5, // Debugging, consultas medias
  complex: 2.0, // Arquitectura, consultas complejas
  advanced: 3.5, // Razonamiento avanzado (o3, deepthink)
};
