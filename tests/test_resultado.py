"""Tests para el modelo ResultadoAnalisis."""

import pytest
from pydantic import ValidationError
from impacto_ia.models.resultado import ResultadoAnalisis


class TestResultadoAnalisis:
    """Tests para ResultadoAnalisis."""

    def test_creacion_valida(self) -> None:
        """Verifica que se puede crear un resultado válido."""
        resultado = ResultadoAnalisis(
            puntuacion=75.5, mensaje="Impacto positivo"
        )

        assert resultado.puntuacion == 75.5
        assert resultado.mensaje == "Impacto positivo"
        assert resultado.timestamp is not None

    def test_puntuacion_fuera_rango_superior(self) -> None:
        """Verifica que puntuación > 100 lanza error."""
        with pytest.raises(ValidationError):
            ResultadoAnalisis(puntuacion=150.0, mensaje="Test")

    def test_puntuacion_fuera_rango_inferior(self) -> None:
        """Verifica que puntuación < 0 lanza error."""
        with pytest.raises(ValidationError):
            ResultadoAnalisis(puntuacion=-10.0, mensaje="Test")

    def test_mensaje_vacio_lanza_error(self) -> None:
        """Verifica que mensaje vacío lanza error."""
        with pytest.raises(ValidationError):
            ResultadoAnalisis(puntuacion=50.0, mensaje="")

    def test_detalles_opcionales(self) -> None:
        """Verifica que detalles son opcionales."""
        resultado = ResultadoAnalisis(
            puntuacion=50.0,
            mensaje="Test",
            detalles={"categoria": "social"},
        )

        assert resultado.detalles == {"categoria": "social"}

    def test_redondeo_puntuacion(self) -> None:
        """Verifica que la puntuación se redondea correctamente."""
        resultado = ResultadoAnalisis(
            puntuacion=75.555555, mensaje="Test"
        )

        assert resultado.puntuacion == 75.56
