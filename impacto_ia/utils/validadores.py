"""Validadores de datos de entrada."""

from typing import Any


def validar_datos_entrada(datos: dict[str, Any]) -> None:
    """
    Valida que los datos de entrada sean correctos.

    Args:
        datos: Diccionario con datos a validar

    Raises:
        ValueError: Si los datos no cumplen los requisitos
    """
    if not isinstance(datos, dict):
        raise ValueError("Los datos deben ser un diccionario")

    if not datos:
        raise ValueError("Los datos no pueden estar vacíos")

    # Validar campos numéricos si existen
    if "valor" in datos:
        valor = datos["valor"]
        if not isinstance(valor, (int, float)):
            raise ValueError("El campo 'valor' debe ser numérico")
        if valor < 0:
            raise ValueError("El campo 'valor' no puede ser negativo")

    if "factor" in datos:
        factor = datos["factor"]
        if not isinstance(factor, (int, float)):
            raise ValueError("El campo 'factor' debe ser numérico")
        if factor <= 0:
            raise ValueError("El campo 'factor' debe ser positivo")
