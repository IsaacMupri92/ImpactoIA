import { ConsumptionResult, Equivalences } from '@/lib/types/consumption';
import { EQUIVALENCE_CONSTANTS } from '@/data/equivalencesData';

/**
 * Calcula todas las equivalencias tangibles del consumo
 */
export function getEquivalences(consumption: ConsumptionResult): Equivalences {
  return {
    co2: {
      carKm: consumption.co2Kg / EQUIVALENCE_CONSTANTS.CO2_PER_KM_CAR,
      flights: consumption.co2Kg / EQUIVALENCE_CONSTANTS.CO2_PER_FLIGHT_MAD_LON,
      trees: consumption.co2Kg / EQUIVALENCE_CONSTANTS.CO2_ABSORBED_PER_TREE_YEAR,
    },
    water: {
      showers: consumption.waterLiters / EQUIVALENCE_CONSTANTS.WATER_PER_SHOWER,
      bottles: consumption.waterLiters / EQUIVALENCE_CONSTANTS.WATER_PER_BOTTLE,
      toiletFlushes: consumption.waterLiters / EQUIVALENCE_CONSTANTS.WATER_PER_TOILET_FLUSH,
    },
    energy: {
      ledHours: (consumption.energyKwh * 1000) / EQUIVALENCE_CONSTANTS.POWER_LED_WATTS,
      laptopHours: (consumption.energyKwh * 1000) / EQUIVALENCE_CONSTANTS.POWER_LAPTOP_WATTS,
      fridgeDays: consumption.energyKwh / EQUIVALENCE_CONSTANTS.POWER_FRIDGE_KWH_DAY,
    },
    social: {
      kenyanWorkerHours: consumption.costEuros / EQUIVALENCE_CONSTANTS.KENYAN_WORKER_HOURLY_RATE,
      cobaltGrams: consumption.co2Kg * EQUIVALENCE_CONSTANTS.COBALT_GRAMS_PER_KG_CO2 * 1000,
    },
  };
}

/**
 * Obtiene la equivalencia más relevante para mostrar
 */
export function getMostRelevantEquivalence(
  consumption: ConsumptionResult,
  metric: 'co2' | 'water' | 'energy' | 'social'
): { value: number; label: string; icon: string } {
  const equivalences = getEquivalences(consumption);

  switch (metric) {
    case 'co2':
      return {
        value: equivalences.co2.carKm,
        label: 'km en coche',
        icon: '🚗',
      };
    case 'water':
      return {
        value: equivalences.water.showers,
        label: 'duchas de 5 min',
        icon: '🚿',
      };
    case 'energy':
      return {
        value: equivalences.energy.laptopHours,
        label: 'horas de portátil',
        icon: '💻',
      };
    case 'social':
      return {
        value: equivalences.social.kenyanWorkerHours,
        label: 'horas de trabajo',
        icon: '👤',
      };
  }
}

/**
 * Formatea un valor de equivalencia para mostrar
 */
export function formatEquivalence(value: number, decimals: number = 1): string {
  if (value < 0.01) return '< 0.01';
  if (value < 1) return value.toFixed(2);
  if (value < 10) return value.toFixed(decimals);
  return value.toFixed(0);
}
