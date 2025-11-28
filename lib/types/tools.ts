export interface ModelConsumption {
  energyWh: number;
  waterMl: number;
  co2Grams: number;
  costEuros: number;
}

export interface ToolModels {
  [modelId: string]: ModelConsumption;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  models: ToolModels;
  icon: string;
  color: string;
}

export interface Subscription {
  id: string;
  name: string;
  monthlyEuros: number;
  annualEuros: number;
  toolId: string;
}

export interface QueryInput {
  toolId: string;
  modelId: string;
  count: number;
}

export type QueryType = 'simple' | 'medium' | 'complex' | 'advanced';

export interface QueryTypeMultiplier {
  simple: number;
  medium: number;
  complex: number;
  advanced: number;
}
