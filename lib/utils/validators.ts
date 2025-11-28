import { z } from 'zod';

/**
 * Schema de validación para una entrada de consumo
 */
export const consumptionEntrySchema = z.object({
  id: z.number().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)'),
  toolId: z.string().min(1, 'El ID de la herramienta es requerido'),
  modelId: z.string().min(1, 'El ID del modelo es requerido'),
  queryType: z.enum(['simple', 'medium', 'complex', 'advanced']),
  queryCount: z.number().int().positive('El número de consultas debe ser positivo'),
  energyWh: z.number().nonnegative('La energía no puede ser negativa'),
  waterMl: z.number().nonnegative('El agua no puede ser negativa'),
  co2Grams: z.number().nonnegative('El CO2 no puede ser negativo'),
  costEuros: z.number().nonnegative('El coste no puede ser negativo'),
});

/**
 * Schema de validación para configuraciones de usuario
 */
export const userSettingsSchema = z.object({
  workDaysPerYear: z
    .number()
    .int()
    .min(1, 'Debe haber al menos 1 día laboral')
    .max(365, 'No puede haber más de 365 días laborales'),
  usageIntensity: z.enum(['low', 'medium', 'high', 'intensive']),
  primaryTools: z.array(z.string()).min(1, 'Debe seleccionar al menos una herramienta'),
  activeSubscriptions: z.array(z.string()),
  primaryMetric: z.enum(['energy', 'water', 'co2', 'cost']),
  numberFormat: z.enum(['ES', 'US']),
  theme: z.enum(['light', 'dark']),
});

/**
 * Schema de validación para input de consultas
 */
export const queryInputSchema = z.object({
  toolId: z.string().min(1, 'Selecciona una herramienta'),
  modelId: z.string().min(1, 'Selecciona un modelo'),
  count: z.number().int().positive('El número de consultas debe ser mayor a 0'),
});

/**
 * Valida si una fecha es válida
 */
export function isValidDate(date: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const dateObj = new Date(date);
  return dateObj instanceof Date && !isNaN(dateObj.getTime());
}

/**
 * Valida si una fecha está en el pasado
 */
export function isDateInPast(date: string): boolean {
  if (!isValidDate(date)) return false;
  const dateObj = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return dateObj < today;
}

/**
 * Valida si una fecha está en el futuro
 */
export function isDateInFuture(date: string): boolean {
  if (!isValidDate(date)) return false;
  const dateObj = new Date(date);
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return dateObj > today;
}

/**
 * Valida si un número está dentro de un rango
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Valida un archivo JSON
 */
export function isValidJSON(jsonString: string): boolean {
  try {
    JSON.parse(jsonString);
    return true;
  } catch {
    return false;
  }
}

/**
 * Valida el formato de exportación de la base de datos
 */
export const databaseExportSchema = z.object({
  version: z.number(),
  exportDate: z.string(),
  consumption: z.array(consumptionEntrySchema),
  settings: z.array(
    z.object({
      key: z.string(),
      value: z.string(),
    })
  ),
});

/**
 * Sanitiza un string eliminando caracteres especiales
 */
export function sanitizeString(str: string): string {
  return str.replace(/[<>]/g, '');
}

/**
 * Valida si un valor es un número positivo
 */
export function isPositiveNumber(value: unknown): value is number {
  return typeof value === 'number' && value > 0 && !isNaN(value) && isFinite(value);
}

/**
 * Valida si un email es válido (básico)
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
