import { ConsumptionResult, AnnualProjection } from '@/lib/types/consumption';
import { QueryInput } from '@/lib/types/tools';
import { CONSUMPTION_BASE, QUERY_TYPE_MULTIPLIERS } from '@/data/consumptionBaseData';

/**
 * Calcula el consumo total basado en un array de consultas
 */
export function calculateConsumption(queries: QueryInput[]): ConsumptionResult {
  let totalEnergy = 0;
  let totalWater = 0;
  let totalCO2 = 0;
  let totalCost = 0;

  queries.forEach((q) => {
    const base = CONSUMPTION_BASE[q.toolId]?.[q.modelId];
    if (base) {
      totalEnergy += base.energyWh * q.count;
      totalWater += base.waterMl * q.count;
      totalCO2 += base.co2Grams * q.count;
      totalCost += base.costEuros * q.count;
    }
  });

  return {
    energyKwh: totalEnergy / 1000,
    waterLiters: totalWater / 1000,
    co2Kg: totalCO2 / 1000,
    costEuros: totalCost,
  };
}

/**
 * Calcula el consumo diario con multiplicador de tipo de query
 */
export function calculateDailyConsumption(
  queries: QueryInput[],
  queryType: keyof typeof QUERY_TYPE_MULTIPLIERS = 'medium'
): ConsumptionResult {
  const baseConsumption = calculateConsumption(queries);
  const multiplier = QUERY_TYPE_MULTIPLIERS[queryType];

  return {
    energyKwh: baseConsumption.energyKwh * multiplier,
    waterLiters: baseConsumption.waterLiters * multiplier,
    co2Kg: baseConsumption.co2Kg * multiplier,
    costEuros: baseConsumption.costEuros * multiplier,
  };
}

/**
 * Calcula la proyección anual basada en el promedio diario
 */
export function calculateAnnualProjection(
  dailyAverage: ConsumptionResult,
  workDaysPerYear: number = 220
): AnnualProjection {
  return {
    energyKwh: dailyAverage.energyKwh * workDaysPerYear,
    waterLiters: dailyAverage.waterLiters * workDaysPerYear,
    co2Kg: dailyAverage.co2Kg * workDaysPerYear,
    costEuros: dailyAverage.costEuros * workDaysPerYear,
  };
}

/**
 * Calcula el promedio de consumo a partir de múltiples días
 */
export function calculateAverage(consumptions: ConsumptionResult[]): ConsumptionResult {
  if (consumptions.length === 0) {
    return {
      energyKwh: 0,
      waterLiters: 0,
      co2Kg: 0,
      costEuros: 0,
    };
  }

  const totals = consumptions.reduce(
    (acc, curr) => ({
      energyKwh: acc.energyKwh + curr.energyKwh,
      waterLiters: acc.waterLiters + curr.waterLiters,
      co2Kg: acc.co2Kg + curr.co2Kg,
      costEuros: acc.costEuros + curr.costEuros,
    }),
    { energyKwh: 0, waterLiters: 0, co2Kg: 0, costEuros: 0 }
  );

  return {
    energyKwh: totals.energyKwh / consumptions.length,
    waterLiters: totals.waterLiters / consumptions.length,
    co2Kg: totals.co2Kg / consumptions.length,
    costEuros: totals.costEuros / consumptions.length,
  };
}

/**
 * Calcula el cambio porcentual entre dos valores
 */
export function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

/**
 * Determina el nivel de impacto basado en el consumo de CO2
 */
export function getImpactLevel(co2Kg: number): 'low' | 'medium' | 'high' | 'very-high' {
  if (co2Kg < 0.01) return 'low';
  if (co2Kg < 0.05) return 'medium';
  if (co2Kg < 0.1) return 'high';
  return 'very-high';
}

/**
 * Calcula el consumo total de suscripciones
 */
export function calculateSubscriptionCost(
  subscriptionIds: string[],
  subscriptions: { id: string; monthlyEuros: number; annualEuros: number }[]
): { monthly: number; annual: number } {
  const activeSubscriptions = subscriptions.filter((s) =>
    subscriptionIds.includes(s.id)
  );

  return {
    monthly: activeSubscriptions.reduce((sum, s) => sum + s.monthlyEuros, 0),
    annual: activeSubscriptions.reduce((sum, s) => sum + s.annualEuros, 0),
  };
}
