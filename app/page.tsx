'use client';

import { DailyMetrics } from '@/components/dashboard/DailyMetrics';
import { MonthlyChart } from '@/components/dashboard/MonthlyChart';
import { ToolBreakdown } from '@/components/dashboard/ToolBreakdown';
import { AnnualProjectionCard } from '@/components/dashboard/AnnualProjection';
import { Button } from '@/components/ui/Button';
import { useConsumption } from '@/hooks/useConsumption';
import { calculateAnnualProjection, calculateAverage } from '@/lib/calculations/consumption';
import { ToolStats } from '@/lib/types/consumption';
import { useRouter } from 'next/navigation';
import { TOOLS } from '@/data/toolsData';

export default function Home() {
  const router = useRouter();
  const { isLoading, todayConsumption, yesterdayConsumption, monthlyData, allEntries } =
    useConsumption();

  // Calculate tool breakdown
  const toolStats: ToolStats[] = TOOLS.map((tool) => {
    const toolEntries = allEntries.filter((e) => e.toolId === tool.id);
    const totalQueries = toolEntries.reduce((sum, e) => sum + e.queryCount, 0);
    const totalCO2 = toolEntries.reduce((sum, e) => sum + e.co2Grams, 0);

    return {
      toolId: tool.id,
      queries: totalQueries,
      energyKwh: toolEntries.reduce((sum, e) => sum + e.energyWh, 0) / 1000,
      waterLiters: toolEntries.reduce((sum, e) => sum + e.waterMl, 0) / 1000,
      co2Kg: totalCO2 / 1000,
      costEuros: toolEntries.reduce((sum, e) => sum + e.costEuros, 0),
      percentage: 0,
    };
  }).filter((stat) => stat.queries > 0);

  // Calculate percentages
  const totalCO2 = toolStats.reduce((sum, stat) => sum + stat.co2Kg, 0);
  toolStats.forEach((stat) => {
    stat.percentage = totalCO2 > 0 ? (stat.co2Kg / totalCO2) * 100 : 0;
  });

  // Calculate annual projection
  const monthlyConsumptions = monthlyData.map((d) => ({
    energyKwh: d.energyKwh,
    waterLiters: d.waterLiters,
    co2Kg: d.co2Kg,
    costEuros: d.costEuros,
  }));
  const averageDaily = calculateAverage(monthlyConsumptions);
  const annualProjection = calculateAnnualProjection(averageDaily, 220);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  const hasData = allEntries.length > 0;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI Impact Calculator</h1>
              <p className="text-gray-600 mt-1">
                Visualiza y reduce el impacto ambiental de tu uso de IA
              </p>
            </div>
            <Button onClick={() => router.push('/calculator')}>Registrar consumo</Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {!hasData ? (
          <div className="text-center py-16">
            <div className="mb-8">
              <span className="text-6xl">📊</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Comienza a trackear tu impacto
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Registra tu primer día de uso de herramientas de IA para empezar a visualizar tu
              impacto ambiental y descubrir oportunidades de mejora.
            </p>
            <Button size="lg" onClick={() => router.push('/calculator')}>
              Registrar mi primer día
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Today's metrics */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Resumen de hoy</h2>
                <Button variant="ghost" size="sm">
                  Exportar PDF
                </Button>
              </div>
              <DailyMetrics
                consumption={todayConsumption}
                previousDayConsumption={yesterdayConsumption}
              />
            </section>

            {/* Monthly chart */}
            {monthlyData.length > 0 && (
              <section>
                <MonthlyChart data={monthlyData} />
              </section>
            )}

            {/* Tool breakdown */}
            {toolStats.length > 0 && (
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ToolBreakdown toolStats={toolStats} />
                <AnnualProjectionCard projection={annualProjection} workDaysPerYear={220} />
              </section>
            )}

            {/* Quick actions */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => router.push('/history')}
              >
                📅 Ver histórico
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => router.push('/compare')}
              >
                ⚖️ Comparar herramientas
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => router.push('/settings')}
              >
                ⚙️ Configuración
              </Button>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
