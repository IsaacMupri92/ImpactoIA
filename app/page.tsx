export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-sustainable-600 mb-4">
          AI Impact Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Calculadora de impacto ambiental de herramientas de IA
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <div className="bg-sustainable-100 p-6 rounded-lg">
            <p className="text-2xl font-bold text-sustainable-700">⚡</p>
            <p className="text-sm text-gray-600 mt-2">Energía</p>
          </div>
          <div className="bg-blue-100 p-6 rounded-lg">
            <p className="text-2xl font-bold text-blue-700">💧</p>
            <p className="text-sm text-gray-600 mt-2">Agua</p>
          </div>
          <div className="bg-impact-100 p-6 rounded-lg">
            <p className="text-2xl font-bold text-impact-700">🌍</p>
            <p className="text-sm text-gray-600 mt-2">CO2</p>
          </div>
          <div className="bg-warning-100 p-6 rounded-lg">
            <p className="text-2xl font-bold text-warning-700">💶</p>
            <p className="text-sm text-gray-600 mt-2">Coste</p>
          </div>
        </div>
      </div>
    </main>
  );
}
