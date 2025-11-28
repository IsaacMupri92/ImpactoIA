"""Tests para validadores."""

import pytest
from impacto_ia.utils.validadores import validar_datos_entrada


class TestValidadores:
    """Tests para funciones de validación."""

    def test_validacion_datos_correctos(self) -> None:
        """Verifica que datos correctos pasan la validación."""
        datos = {"valor": 50, "factor": 1.5}
        validar_datos_entrada(datos)  # No debe lanzar error

    def test_validacion_datos_vacios(self) -> None:
        """Verifica que datos vacíos fallan la validación."""
        with pytest.raises(ValueError, match="no pueden estar vacíos"):
            validar_datos_entrada({})

    def test_validacion_tipo_incorrecto(self) -> None:
        """Verifica que tipo incorrecto falla la validación."""
        with pytest.raises(ValueError, match="debe ser un diccionario"):
            validar_datos_entrada("no es dict")  # type: ignore

    def test_validacion_valor_negativo(self) -> None:
        """Verifica que valores negativos fallan la validación."""
        with pytest.raises(ValueError, match="no puede ser negativo"):
            validar_datos_entrada({"valor": -10})

    def test_validacion_factor_cero(self) -> None:
        """Verifica que factor <= 0 falla la validación."""
        with pytest.raises(ValueError, match="debe ser positivo"):
            validar_datos_entrada({"factor": 0})

    def test_validacion_valor_no_numerico(self) -> None:
        """Verifica que valor no numérico falla la validación."""
        with pytest.raises(ValueError, match="debe ser numérico"):
            validar_datos_entrada({"valor": "texto"})
