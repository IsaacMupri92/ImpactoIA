"""Configuración centralizada del sistema."""

from typing import Optional
from pydantic import Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """
    Configuración de la aplicación.

    Lee valores de variables de entorno con prefijo IMPACTO_IA_
    """

    # Configuración general
    debug: bool = Field(default=False, description="Modo debug")
    log_level: str = Field(default="INFO", description="Nivel de logging")

    # Umbrales
    umbral_impacto: float = Field(
        default=50.0,
        ge=0,
        le=100,
        description="Umbral mínimo de impacto significativo",
    )

    # Paths
    data_dir: Optional[str] = Field(
        default=None, description="Directorio de datos"
    )

    class Config:
        """Configuración de Pydantic."""

        env_prefix = "IMPACTO_IA_"
        env_file = ".env"
        case_sensitive = False


# Instancia singleton de configuración
_configuracion: Optional[Settings] = None


def obtener_configuracion() -> Settings:
    """
    Obtiene la configuración del sistema (singleton).

    Returns:
        Instancia de Settings con la configuración
    """
    global _configuracion

    if _configuracion is None:
        _configuracion = Settings()

    return _configuracion
