"""Analizador principal de impacto de IA."""

from typing import Any
from impacto_ia.models.resultado import ResultadoAnalisis
from impacto_ia.utils.validadores import validar_datos_entrada
from impacto_ia.utils.logger import obtener_logger

logger = obtener_logger(__name__)


class AnalizadorImpacto:
    """
    Analizador de impacto de sistemas de IA.

    Esta clase proporciona métodos para evaluar el impacto
    de sistemas de inteligencia artificial de manera simple y robusta.
    """

    def __init__(self, umbral_minimo: float = 0.0) -> None:
        """
        Inicializa el analizador.

        Args:
            umbral_minimo: Puntuación mínima para considerar impacto significativo
        """
        if not 0 <= umbral_minimo <= 100:
            raise ValueError("El umbral debe estar entre 0 y 100")

        self.umbral_minimo = umbral_minimo
        logger.info(f"Analizador inicializado con umbral: {umbral_minimo}")

    def analizar(self, datos: dict[str, Any]) -> ResultadoAnalisis:
        """
        Analiza el impacto basándose en los datos proporcionados.

        Args:
            datos: Diccionario con los datos a analizar

        Returns:
            ResultadoAnalisis con la evaluación del impacto

        Raises:
            ValueError: Si los datos son inválidos
        """
        try:
            # Validar datos de entrada
            validar_datos_entrada(datos)

            # Calcular puntuación
            puntuacion = self._calcular_puntuacion(datos)

            # Generar mensaje descriptivo
            mensaje = self._generar_mensaje(puntuacion)

            logger.info(f"Análisis completado: puntuación={puntuacion}")

            return ResultadoAnalisis(
                puntuacion=puntuacion,
                mensaje=mensaje,
                detalles={"tipo": datos.get("tipo", "general")},
            )

        except ValueError as error:
            logger.error(f"Error en validación: {error}")
            raise
        except Exception as error:
            logger.error(f"Error inesperado: {error}")
            raise RuntimeError(f"Error al analizar datos: {error}") from error

    def _calcular_puntuacion(self, datos: dict[str, Any]) -> float:
        """
        Calcula la puntuación de impacto.

        Args:
            datos: Datos validados para el cálculo

        Returns:
            Puntuación calculada (0-100)
        """
        # Ejemplo simple de cálculo
        # En un caso real, aquí iría la lógica específica del dominio
        valor = datos.get("valor", 50)
        factor = datos.get("factor", 1.0)

        puntuacion = min(100, max(0, valor * factor))
        return round(puntuacion, 2)

    def _generar_mensaje(self, puntuacion: float) -> str:
        """
        Genera un mensaje descriptivo basado en la puntuación.

        Args:
            puntuacion: Puntuación calculada

        Returns:
            Mensaje descriptivo del impacto
        """
        if puntuacion < 25:
            return "Impacto bajo"
        elif puntuacion < 50:
            return "Impacto moderado-bajo"
        elif puntuacion < 75:
            return "Impacto moderado-alto"
        else:
            return "Impacto alto"

    def es_impacto_significativo(self, resultado: ResultadoAnalisis) -> bool:
        """
        Determina si el impacto es significativo.

        Args:
            resultado: Resultado del análisis

        Returns:
            True si el impacto supera el umbral mínimo
        """
        return resultado.puntuacion >= self.umbral_minimo
