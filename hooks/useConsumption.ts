'use client';

import { useState, useEffect } from 'react';
import { ConsumptionResult, DailyStats, MonthlyData } from '@/lib/types/consumption';
import { DBConsumptionEntry } from '@/lib/types/database';
import {
  getAllConsumption,
  getConsumptionByDateRange,
  saveConsumption,
} from '@/lib/storage/db';
import { format, subDays, startOfMonth, endOfMonth } from 'date-fns';
import { toISODate } from '@/lib/utils/formatters';

export function useConsumption() {
  const [isLoading, setIsLoading] = useState(true);
  const [todayConsumption, setTodayConsumption] = useState<ConsumptionResult>({
    energyKwh: 0,
    waterLiters: 0,
    co2Kg: 0,
    costEuros: 0,
  });
  const [yesterdayConsumption, setYesterdayConsumption] = useState<ConsumptionResult | undefined>();
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [allEntries, setAllEntries] = useState<DBConsumptionEntry[]>([]);

  const loadData = async () => {
    try {
      setIsLoading(true);

      // Load all consumption data
      const entries = await getAllConsumption();
      setAllEntries(entries);

      // Calculate today's consumption
      const today = toISODate(new Date());
      const todayEntries = entries.filter((e) => e.date === today);
      const todayTotal = calculateTotal(todayEntries);
      setTodayConsumption(todayTotal);

      // Calculate yesterday's consumption
      const yesterday = toISODate(subDays(new Date(), 1));
      const yesterdayEntries = entries.filter((e) => e.date === yesterday);
      if (yesterdayEntries.length > 0) {
        setYesterdayConsumption(calculateTotal(yesterdayEntries));
      }

      // Calculate monthly data (last 30 days)
      const monthlyDataArray: MonthlyData[] = [];
      for (let i = 29; i >= 0; i--) {
        const date = subDays(new Date(), i);
        const dateStr = toISODate(date);
        const dayEntries = entries.filter((e) => e.date === dateStr);
        const total = calculateTotal(dayEntries);

        monthlyDataArray.push({
          month: format(date, 'dd/MM'),
          energyKwh: total.energyKwh,
          waterLiters: total.waterLiters,
          co2Kg: total.co2Kg,
          costEuros: total.costEuros,
          queries: dayEntries.reduce((sum, e) => sum + e.queryCount, 0),
        });
      }
      setMonthlyData(monthlyDataArray);
    } catch (error) {
      console.error('Error loading consumption data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const calculateTotal = (entries: DBConsumptionEntry[]): ConsumptionResult => {
    return entries.reduce(
      (acc, entry) => ({
        energyKwh: acc.energyKwh + entry.energyWh / 1000,
        waterLiters: acc.waterLiters + entry.waterMl / 1000,
        co2Kg: acc.co2Kg + entry.co2Grams / 1000,
        costEuros: acc.costEuros + entry.costEuros,
      }),
      { energyKwh: 0, waterLiters: 0, co2Kg: 0, costEuros: 0 }
    );
  };

  const refreshData = () => {
    loadData();
  };

  return {
    isLoading,
    todayConsumption,
    yesterdayConsumption,
    monthlyData,
    allEntries,
    refreshData,
  };
}
