"""Sistema de logging configurado para el proyecto."""

import logging
from typing import Optional


def obtener_logger(nombre: str, nivel: int = logging.INFO) -> logging.Logger:
    """
    Obtiene un logger configurado.

    Args:
        nombre: Nombre del logger (generalmente __name__ del módulo)
        nivel: Nivel de logging (default: INFO)

    Returns:
        Logger configurado y listo para usar
    """
    logger = logging.getLogger(nombre)

    # Evitar duplicar handlers
    if not logger.handlers:
        logger.setLevel(nivel)

        # Handler para consola con formato legible
        console_handler = logging.StreamHandler()
        console_handler.setLevel(nivel)

        # Formato simple y claro
        formato = logging.Formatter(
            fmt="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
            datefmt="%Y-%m-%d %H:%M:%S",
        )
        console_handler.setFormatter(formato)

        logger.addHandler(console_handler)

    return logger
