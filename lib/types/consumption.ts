export interface ConsumptionEntry {
  id: string;
  date: Date;
  toolId: string;
  modelId: string;
  queryType: string;
  queryCount: number;
  energyWh: number;
  waterMl: number;
  co2Grams: number;
  costEuros: number;
}

export interface ConsumptionResult {
  energyKwh: number;
  waterLiters: number;
  co2Kg: number;
  costEuros: number;
}

export interface DailyStats {
  date: Date;
  totalQueries: number;
  totalEnergyKwh: number;
  totalWaterLiters: number;
  totalCO2Kg: number;
  totalCostEuros: number;
  byTool: Map<string, ToolStats>;
}

export interface ToolStats {
  toolId: string;
  queries: number;
  energyKwh: number;
  waterLiters: number;
  co2Kg: number;
  costEuros: number;
  percentage: number;
}

export interface AnnualProjection {
  energyKwh: number;
  waterLiters: number;
  co2Kg: number;
  costEuros: number;
}

export interface MonthlyData {
  month: string;
  energyKwh: number;
  waterLiters: number;
  co2Kg: number;
  costEuros: number;
  queries: number;
}

export interface Equivalences {
  co2: {
    carKm: number;
    flights: number;
    trees: number;
  };
  water: {
    showers: number;
    bottles: number;
    toiletFlushes: number;
  };
  energy: {
    ledHours: number;
    laptopHours: number;
    fridgeDays: number;
  };
  social: {
    kenyanWorkerHours: number;
    cobaltGrams: number;
  };
}
