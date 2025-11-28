import { Tool, Subscription } from '@/lib/types/tools';
import { CONSUMPTION_BASE } from './consumptionBaseData';

export const TOOLS: Tool[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'OpenAI ChatGPT - Modelo de lenguaje conversacional',
    models: CONSUMPTION_BASE.chatgpt,
    icon: '🤖',
    color: '#10a37f',
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Anthropic Claude - Asistente de IA avanzado',
    models: CONSUMPTION_BASE.claude,
    icon: '🧠',
    color: '#D97757',
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    description: 'GitHub Copilot - Asistente de código con IA',
    models: CONSUMPTION_BASE.copilot,
    icon: '💻',
    color: '#0969da',
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    description: 'Google Gemini - Modelo multimodal de Google',
    models: CONSUMPTION_BASE.gemini,
    icon: '✨',
    color: '#4285f4',
  },
];

export const SUBSCRIPTIONS: Subscription[] = [
  {
    id: 'chatgpt_plus',
    name: 'ChatGPT Plus',
    monthlyEuros: 18,
    annualEuros: 216,
    toolId: 'chatgpt',
  },
  {
    id: 'chatgpt_pro',
    name: 'ChatGPT Pro',
    monthlyEuros: 185,
    annualEuros: 2220,
    toolId: 'chatgpt',
  },
  {
    id: 'claude_pro',
    name: 'Claude Pro',
    monthlyEuros: 18,
    annualEuros: 216,
    toolId: 'claude',
  },
  {
    id: 'claude_max',
    name: 'Claude Max',
    monthlyEuros: 185,
    annualEuros: 2220,
    toolId: 'claude',
  },
  {
    id: 'copilot_pro',
    name: 'GitHub Copilot Pro',
    monthlyEuros: 9,
    annualEuros: 108,
    toolId: 'copilot',
  },
  {
    id: 'gemini_advanced',
    name: 'Gemini Advanced',
    monthlyEuros: 18,
    annualEuros: 216,
    toolId: 'gemini',
  },
];

export const DEFAULT_USER_SETTINGS = {
  workDaysPerYear: 220,
  usageIntensity: 'medium' as const,
  primaryTools: ['chatgpt', 'copilot'],
  activeSubscriptions: [] as string[],
  primaryMetric: 'co2' as const,
  numberFormat: 'ES' as const,
  theme: 'light' as const,
};
