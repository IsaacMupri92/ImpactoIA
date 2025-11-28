'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { AnnualProjection } from '@/lib/types/consumption';
import { getEquivalences } from '@/lib/calculations/equivalences';
import { formatEquivalence } from '@/lib/calculations/equivalences';

export interface AnnualProjectionProps {
  projection: AnnualProjection;
  workDaysPerYear?: number;
}

export function AnnualProjectionCard({ projection, workDaysPerYear = 220 }: AnnualProjectionProps) {
  const equivalences = getEquivalences({
    energyKwh: projection.energyKwh,
    waterLiters: projection.waterLiters,
    co2Kg: projection.co2Kg,
    costEuros: projection.costEuros,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Proyección Anual ({workDaysPerYear} días laborables)</CardTitle>
        <CardDescription>
          Estimación del impacto anual basada en tu consumo promedio
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Main metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold font-mono text-gray-900">
                {projection.energyKwh.toFixed(1)}
              </p>
              <p className="text-sm text-gray-600 mt-1">kWh</p>
              <p className="text-xs text-gray-500 mt-1">⚡ Energía</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold font-mono text-gray-900">
                {projection.waterLiters.toFixed(0)}
              </p>
              <p className="text-sm text-gray-600 mt-1">L</p>
              <p className="text-xs text-gray-500 mt-1">💧 Agua</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold font-mono text-impact-600">
                {projection.co2Kg.toFixed(1)}
              </p>
              <p className="text-sm text-gray-600 mt-1">kg</p>
              <p className="text-xs text-gray-500 mt-1">🌍 CO₂</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold font-mono text-gray-900">
                {projection.costEuros.toFixed(0)}
              </p>
              <p className="text-sm text-gray-600 mt-1">€</p>
              <p className="text-xs text-gray-500 mt-1">💶 Coste</p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* Equivalences */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Equivale a:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <span className="text-2xl">🚗</span>
                <div>
                  <p className="font-semibold text-gray-900">
                    {formatEquivalence(equivalences.co2.carKm)} km
                  </p>
                  <p className="text-xs text-gray-600">en coche de gasolina</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <span className="text-2xl">🚿</span>
                <div>
                  <p className="font-semibold text-gray-900">
                    {formatEquivalence(equivalences.water.showers)} duchas
                  </p>
                  <p className="text-xs text-gray-600">de 5 minutos</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <span className="text-2xl">💻</span>
                <div>
                  <p className="font-semibold text-gray-900">
                    {formatEquivalence(equivalences.energy.laptopHours)} horas
                  </p>
                  <p className="text-xs text-gray-600">de uso de portátil</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <span className="text-2xl">🌳</span>
                <div>
                  <p className="font-semibold text-gray-900">
                    {formatEquivalence(equivalences.co2.trees)} árboles
                  </p>
                  <p className="text-xs text-gray-600">necesarios 1 año</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social impact note */}
          <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
            <div className="flex gap-3">
              <span className="text-xl">👤</span>
              <div>
                <p className="text-sm font-semibold text-warning-900">
                  Impacto social
                </p>
                <p className="text-xs text-warning-700 mt-1">
                  El coste equivale a {formatEquivalence(equivalences.social.kenyanWorkerHours)} horas de
                  trabajo en minería de minerales críticos en países en desarrollo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
