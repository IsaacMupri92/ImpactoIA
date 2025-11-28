"""
Ejemplo básico de uso de ImpactoIA.

Este script demuestra cómo usar el analizador de impacto
de manera simple y clara.
"""

from impacto_ia import AnalizadorImpacto


def ejemplo_simple() -> None:
    """Ejemplo de análisis simple."""
    print("=== Ejemplo Simple ===\n")

    # Crear analizador
    analizador = AnalizadorImpacto()

    # Datos de ejemplo
    datos = {"valor": 75, "factor": 1.2, "tipo": "social"}

    # Realizar análisis
    resultado = analizador.analizar(datos)

    # Mostrar resultados
    print(f"Puntuación: {resultado.puntuacion}")
    print(f"Mensaje: {resultado.mensaje}")
    print(f"Timestamp: {resultado.timestamp}")
    print(f"Detalles: {resultado.detalles}\n")


def ejemplo_con_umbral() -> None:
    """Ejemplo usando umbral de significancia."""
    print("=== Ejemplo con Umbral ===\n")

    # Crear analizador con umbral
    analizador = AnalizadorImpacto(umbral_minimo=60.0)

    casos = [
        {"valor": 80, "factor": 1.0, "tipo": "alto"},
        {"valor": 40, "factor": 1.0, "tipo": "bajo"},
    ]

    for i, datos in enumerate(casos, 1):
        resultado = analizador.analizar(datos)
        es_significativo = analizador.es_impacto_significativo(resultado)

        print(f"Caso {i}:")
        print(f"  Puntuación: {resultado.puntuacion}")
        print(f"  Significativo: {'Sí' if es_significativo else 'No'}")
        print()


def ejemplo_manejo_errores() -> None:
    """Ejemplo de manejo robusto de errores."""
    print("=== Ejemplo Manejo de Errores ===\n")

    analizador = AnalizadorImpacto()

    # Caso con datos inválidos
    try:
        datos_invalidos = {"valor": -10}  # Valor negativo
        analizador.analizar(datos_invalidos)
    except ValueError as error:
        print(f"Error capturado correctamente: {error}\n")


if __name__ == "__main__":
    ejemplo_simple()
    ejemplo_con_umbral()
    ejemplo_manejo_errores()
