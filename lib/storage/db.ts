import Dexie, { Table } from 'dexie';
import { DBConsumptionEntry, DBSettings } from '@/lib/types/database';

export class ConsumptionDB extends Dexie {
  consumption!: Table<DBConsumptionEntry, number>;
  settings!: Table<DBSettings, number>;

  constructor() {
    super('AIImpactCalculator');

    this.version(1).stores({
      consumption: '++id, date, toolId, [date+toolId]',
      settings: '++id, key',
    });
  }
}

// Instancia singleton de la base de datos
export const db = new ConsumptionDB();

// Funciones helper para operaciones comunes

/**
 * Guarda una entrada de consumo
 */
export async function saveConsumption(entry: Omit<DBConsumptionEntry, 'id'>): Promise<number> {
  return await db.consumption.add(entry);
}

/**
 * Obtiene todas las entradas de consumo
 */
export async function getAllConsumption(): Promise<DBConsumptionEntry[]> {
  return await db.consumption.toArray();
}

/**
 * Obtiene entradas de consumo por rango de fechas
 */
export async function getConsumptionByDateRange(
  startDate: string,
  endDate: string
): Promise<DBConsumptionEntry[]> {
  return await db.consumption
    .where('date')
    .between(startDate, endDate, true, true)
    .toArray();
}

/**
 * Obtiene entradas de consumo de un día específico
 */
export async function getConsumptionByDate(date: string): Promise<DBConsumptionEntry[]> {
  return await db.consumption.where('date').equals(date).toArray();
}

/**
 * Obtiene entradas de consumo de una herramienta específica
 */
export async function getConsumptionByTool(toolId: string): Promise<DBConsumptionEntry[]> {
  return await db.consumption.where('toolId').equals(toolId).toArray();
}

/**
 * Elimina una entrada de consumo
 */
export async function deleteConsumption(id: number): Promise<void> {
  await db.consumption.delete(id);
}

/**
 * Elimina todas las entradas de consumo
 */
export async function clearAllConsumption(): Promise<void> {
  await db.consumption.clear();
}

/**
 * Guarda una configuración
 */
export async function saveSetting(key: string, value: string): Promise<number> {
  const existing = await db.settings.where('key').equals(key).first();

  if (existing) {
    await db.settings.update(existing.id!, { value });
    return existing.id!;
  } else {
    return await db.settings.add({ key, value });
  }
}

/**
 * Obtiene una configuración
 */
export async function getSetting(key: string): Promise<string | null> {
  const setting = await db.settings.where('key').equals(key).first();
  return setting ? setting.value : null;
}

/**
 * Obtiene todas las configuraciones
 */
export async function getAllSettings(): Promise<Record<string, string>> {
  const settings = await db.settings.toArray();
  return settings.reduce((acc, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {} as Record<string, string>);
}

/**
 * Elimina todas las configuraciones
 */
export async function clearAllSettings(): Promise<void> {
  await db.settings.clear();
}

/**
 * Exporta toda la base de datos a JSON
 */
export async function exportDatabase(): Promise<string> {
  const consumption = await db.consumption.toArray();
  const settings = await db.settings.toArray();

  return JSON.stringify({
    version: 1,
    exportDate: new Date().toISOString(),
    consumption,
    settings,
  }, null, 2);
}

/**
 * Importa datos desde un JSON
 */
export async function importDatabase(jsonData: string): Promise<void> {
  try {
    const data = JSON.parse(jsonData);

    if (data.consumption && Array.isArray(data.consumption)) {
      await db.consumption.bulkAdd(data.consumption.map((entry: DBConsumptionEntry) => {
        const { id, ...rest } = entry;
        return rest;
      }));
    }

    if (data.settings && Array.isArray(data.settings)) {
      for (const setting of data.settings) {
        await saveSetting(setting.key, setting.value);
      }
    }
  } catch (error) {
    console.error('Error importing database:', error);
    throw new Error('Error al importar la base de datos');
  }
}
