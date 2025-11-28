// Constantes para cálculos de equivalencias
export const EQUIVALENCE_CONSTANTS = {
  // CO2 equivalences
  CO2_PER_KM_CAR: 0.12, // 120g CO2 por km en coche medio
  CO2_PER_FLIGHT_MAD_LON: 85, // 85kg CO2 vuelo Madrid-Londres
  CO2_ABSORBED_PER_TREE_YEAR: 21, // 21kg CO2/año absorbe 1 árbol

  // Water equivalences
  WATER_PER_SHOWER: 50, // 50L ducha de 5 minutos
  WATER_PER_BOTTLE: 0.5, // 500ml botella
  WATER_PER_TOILET_FLUSH: 6, // 6L por descarga de cisterna

  // Energy equivalences
  POWER_LED_WATTS: 10, // 10W bombilla LED
  POWER_LAPTOP_WATTS: 65, // 65W laptop medio
  POWER_FRIDGE_KWH_DAY: 1.2, // 1.2kWh/día nevera

  // Social impact
  KENYAN_WORKER_HOURLY_RATE: 1.32, // $1.32/hora trabajador keniata en minería
  COBALT_GRAMS_PER_KG_CO2: 0.15, // Estimación cobalt/CO2 en producción
};

export const EQUIVALENCE_LABELS = {
  co2: {
    carKm: {
      label: 'Kilómetros en coche',
      icon: '🚗',
      unit: 'km',
      description: 'Equivalente a conducir {value} km en un coche de gasolina medio',
    },
    flights: {
      label: 'Vuelos Madrid-Londres',
      icon: '✈️',
      unit: 'vuelos',
      description: 'Equivalente a {value} vuelos Madrid-Londres',
    },
    trees: {
      label: 'Árboles necesarios (1 año)',
      icon: '🌳',
      unit: 'árboles',
      description: 'Se necesitarían {value} árboles un año completo para absorber este CO2',
    },
  },
  water: {
    showers: {
      label: 'Duchas de 5 minutos',
      icon: '🚿',
      unit: 'duchas',
      description: 'Equivalente a {value} duchas de 5 minutos',
    },
    bottles: {
      label: 'Botellas de agua (500ml)',
      icon: '🍶',
      unit: 'botellas',
      description: 'Equivalente a {value} botellas de agua de 500ml',
    },
    toiletFlushes: {
      label: 'Descargas de cisterna',
      icon: '🚽',
      unit: 'descargas',
      description: 'Equivalente a {value} descargas de cisterna',
    },
  },
  energy: {
    ledHours: {
      label: 'Horas de bombilla LED',
      icon: '💡',
      unit: 'horas',
      description: 'Equivalente a {value} horas de una bombilla LED encendida',
    },
    laptopHours: {
      label: 'Horas de portátil',
      icon: '💻',
      unit: 'horas',
      description: 'Equivalente a {value} horas de uso de un portátil',
    },
    fridgeDays: {
      label: 'Días de nevera',
      icon: '❄️',
      unit: 'días',
      description: 'Equivalente a {value} días de funcionamiento de una nevera',
    },
  },
  social: {
    kenyanWorkerHours: {
      label: 'Horas de trabajo en minería (Kenia)',
      icon: '👤',
      unit: 'horas',
      description: 'Equivalente a {value} horas de trabajo de un minero en Kenia',
    },
    cobaltGrams: {
      label: 'Gramos de cobalto extraído',
      icon: '⚒️',
      unit: 'gramos',
      description: 'Aproximadamente {value}g de cobalto extraído para esta infraestructura',
    },
  },
};
