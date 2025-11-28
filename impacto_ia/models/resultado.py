"""Modelos de resultados de análisis."""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, validator


class ResultadoAnalisis(BaseModel):
    """
    Resultado de un análisis de impacto.

    Attributes:
        puntuacion: Puntuación del impacto (0-100)
        mensaje: Descripción del resultado
        timestamp: Momento del análisis
        detalles: Información adicional opcional
    """

    puntuacion: float = Field(ge=0, le=100, description="Puntuación de impacto")
    mensaje: str = Field(min_length=1, description="Descripción del resultado")
    timestamp: datetime = Field(default_factory=datetime.now)
    detalles: Optional[dict[str, str]] = None

    @validator("puntuacion")
    def validar_puntuacion(cls, valor: float) -> float:
        """Valida que la puntuación esté en el rango correcto."""
        if not 0 <= valor <= 100:
            raise ValueError("La puntuación debe estar entre 0 y 100")
        return round(valor, 2)

    class Config:
        """Configuración del modelo."""

        json_schema_extra = {
            "example": {
                "puntuacion": 75.5,
                "mensaje": "Impacto positivo moderado",
                "detalles": {"categoria": "social"},
            }
        }
