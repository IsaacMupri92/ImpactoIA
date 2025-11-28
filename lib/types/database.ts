export interface DBConsumptionEntry {
  id?: number;
  date: string;
  toolId: string;
  modelId: string;
  queryType: string;
  queryCount: number;
  energyWh: number;
  waterMl: number;
  co2Grams: number;
  costEuros: number;
}

export interface DBSettings {
  id?: number;
  key: string;
  value: string;
}

export interface UserSettings {
  workDaysPerYear: number;
  usageIntensity: 'low' | 'medium' | 'high' | 'intensive';
  primaryTools: string[];
  activeSubscriptions: string[];
  primaryMetric: 'energy' | 'water' | 'co2' | 'cost';
  numberFormat: 'ES' | 'US';
  theme: 'light' | 'dark';
}
