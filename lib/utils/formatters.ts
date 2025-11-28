import { format, formatDistance, formatRelative } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Formatea un número con el formato de localización español
 */
export function formatNumber(
  value: number,
  decimals: number = 2,
  locale: 'ES' | 'US' = 'ES'
): string {
  const localeString = locale === 'ES' ? 'es-ES' : 'en-US';
  return value.toLocaleString(localeString, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Formatea un valor de energía con la unidad apropiada
 */
export function formatEnergy(kwh: number, decimals: number = 2): string {
  if (kwh < 0.001) {
    return `${formatNumber(kwh * 1000000, decimals)} Wh`;
  }
  if (kwh < 1) {
    return `${formatNumber(kwh * 1000, decimals)} Wh`;
  }
  if (kwh < 1000) {
    return `${formatNumber(kwh, decimals)} kWh`;
  }
  return `${formatNumber(kwh / 1000, decimals)} MWh`;
}

/**
 * Formatea un valor de agua con la unidad apropiada
 */
export function formatWater(liters: number, decimals: number = 2): string {
  if (liters < 0.001) {
    return `${formatNumber(liters * 1000, decimals)} ml`;
  }
  if (liters < 1) {
    return `${formatNumber(liters * 1000, decimals)} ml`;
  }
  if (liters < 1000) {
    return `${formatNumber(liters, decimals)} L`;
  }
  return `${formatNumber(liters / 1000, decimals)} m³`;
}

/**
 * Formatea un valor de CO2 con la unidad apropiada
 */
export function formatCO2(kg: number, decimals: number = 2): string {
  if (kg < 0.001) {
    return `${formatNumber(kg * 1000, decimals)} g`;
  }
  if (kg < 1) {
    return `${formatNumber(kg * 1000, decimals)} g`;
  }
  if (kg < 1000) {
    return `${formatNumber(kg, decimals)} kg`;
  }
  return `${formatNumber(kg / 1000, decimals)} t`;
}

/**
 * Formatea un valor monetario en euros
 */
export function formatCurrency(euros: number, decimals: number = 2): string {
  return `${formatNumber(euros, decimals)}€`;
}

/**
 * Formatea una fecha en formato corto
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'dd/MM/yyyy', { locale: es });
}

/**
 * Formatea una fecha en formato largo
 */
export function formatDateLong(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, "d 'de' MMMM 'de' yyyy", { locale: es });
}

/**
 * Formatea una fecha con hora
 */
export function formatDateTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, "dd/MM/yyyy 'a las' HH:mm", { locale: es });
}

/**
 * Formatea una fecha relativa (hace X tiempo)
 */
export function formatDateRelative(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return formatDistance(dateObj, new Date(), { addSuffix: true, locale: es });
}

/**
 * Formatea un porcentaje
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${formatNumber(value, decimals)}%`;
}

/**
 * Formatea un número grande con sufijos (K, M, B)
 */
export function formatCompactNumber(value: number): string {
  if (value < 1000) return formatNumber(value, 0);
  if (value < 1000000) return `${formatNumber(value / 1000, 1)}K`;
  if (value < 1000000000) return `${formatNumber(value / 1000000, 1)}M`;
  return `${formatNumber(value / 1000000000, 1)}B`;
}

/**
 * Trunca un texto a una longitud máxima
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Formatea un cambio porcentual con signo
 */
export function formatPercentageChange(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${formatPercentage(value)}`;
}

/**
 * Convierte una fecha a formato ISO string (YYYY-MM-DD)
 */
export function toISODate(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

/**
 * Parsea una fecha en formato ISO string
 */
export function parseISODate(dateString: string): Date {
  return new Date(dateString);
}
