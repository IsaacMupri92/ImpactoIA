import { UserSettings } from '@/lib/types/database';
import { DEFAULT_USER_SETTINGS } from '@/data/toolsData';

const STORAGE_KEYS = {
  USER_SETTINGS: 'ai-impact-user-settings',
  LAST_SYNC: 'ai-impact-last-sync',
  THEME: 'ai-impact-theme',
} as const;

/**
 * Verifica si localStorage está disponible
 */
export function isLocalStorageAvailable(): boolean {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Guarda las configuraciones de usuario en localStorage
 */
export function saveUserSettings(settings: UserSettings): void {
  if (!isLocalStorageAvailable()) return;

  try {
    localStorage.setItem(STORAGE_KEYS.USER_SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving user settings:', error);
  }
}

/**
 * Carga las configuraciones de usuario desde localStorage
 */
export function loadUserSettings(): UserSettings {
  if (!isLocalStorageAvailable()) return DEFAULT_USER_SETTINGS;

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_SETTINGS);
    if (!stored) return DEFAULT_USER_SETTINGS;

    const settings = JSON.parse(stored);
    return { ...DEFAULT_USER_SETTINGS, ...settings };
  } catch (error) {
    console.error('Error loading user settings:', error);
    return DEFAULT_USER_SETTINGS;
  }
}

/**
 * Guarda el tema actual
 */
export function saveTheme(theme: 'light' | 'dark'): void {
  if (!isLocalStorageAvailable()) return;

  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (error) {
    console.error('Error saving theme:', error);
  }
}

/**
 * Carga el tema guardado
 */
export function loadTheme(): 'light' | 'dark' {
  if (!isLocalStorageAvailable()) return 'light';

  try {
    const theme = localStorage.getItem(STORAGE_KEYS.THEME);
    return (theme === 'dark' ? 'dark' : 'light') as 'light' | 'dark';
  } catch (error) {
    console.error('Error loading theme:', error);
    return 'light';
  }
}

/**
 * Guarda la fecha de última sincronización
 */
export function saveLastSync(): void {
  if (!isLocalStorageAvailable()) return;

  try {
    localStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
  } catch (error) {
    console.error('Error saving last sync:', error);
  }
}

/**
 * Obtiene la fecha de última sincronización
 */
export function getLastSync(): Date | null {
  if (!isLocalStorageAvailable()) return null;

  try {
    const lastSync = localStorage.getItem(STORAGE_KEYS.LAST_SYNC);
    return lastSync ? new Date(lastSync) : null;
  } catch (error) {
    console.error('Error loading last sync:', error);
    return null;
  }
}

/**
 * Limpia todos los datos de localStorage
 */
export function clearLocalStorage(): void {
  if (!isLocalStorageAvailable()) return;

  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
}

/**
 * Exporta todos los datos de localStorage
 */
export function exportLocalStorage(): Record<string, string> {
  if (!isLocalStorageAvailable()) return {};

  const exported: Record<string, string> = {};

  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      const value = localStorage.getItem(key);
      if (value) exported[key] = value;
    });
  } catch (error) {
    console.error('Error exporting localStorage:', error);
  }

  return exported;
}

/**
 * Importa datos a localStorage
 */
export function importLocalStorage(data: Record<string, string>): void {
  if (!isLocalStorageAvailable()) return;

  try {
    Object.entries(data).forEach(([key, value]) => {
      if (Object.values(STORAGE_KEYS).includes(key as any)) {
        localStorage.setItem(key, value);
      }
    });
  } catch (error) {
    console.error('Error importing localStorage:', error);
  }
}
