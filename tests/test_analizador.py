"""Tests para el módulo analizador."""

import pytest
from impacto_ia import AnalizadorImpacto, ResultadoAnalisis


class TestAnalizadorImpacto:
    """Tests para la clase AnalizadorImpacto."""

    def test_inicializacion_correcta(self) -> None:
        """Verifica que el analizador se inicializa correctamente."""
        analizador = AnalizadorImpacto(umbral_minimo=50.0)
        assert analizador.umbral_minimo == 50.0

    def test_umbral_invalido_lanza_error(self) -> None:
        """Verifica que un umbral inválido lanza ValueError."""
        with pytest.raises(ValueError, match="umbral debe estar entre 0 y 100"):
            AnalizadorImpacto(umbral_minimo=150.0)

    def test_analisis_basico(self) -> None:
        """Verifica que el análisis básico funciona correctamente."""
        analizador = AnalizadorImpacto()
        datos = {"valor": 50, "factor": 1.5}

        resultado = analizador.analizar(datos)

        assert isinstance(resultado, ResultadoAnalisis)
        assert 0 <= resultado.puntuacion <= 100
        assert len(resultado.mensaje) > 0

    def test_analisis_con_datos_vacios_lanza_error(self) -> None:
        """Verifica que datos vacíos lanzan un error."""
        analizador = AnalizadorImpacto()

        with pytest.raises(ValueError, match="no pueden estar vacíos"):
            analizador.analizar({})

    def test_impacto_significativo(self) -> None:
        """Verifica la detección de impacto significativo."""
        analizador = AnalizadorImpacto(umbral_minimo=50.0)
        datos = {"valor": 75, "factor": 1.0}

        resultado = analizador.analizar(datos)
        assert analizador.es_impacto_significativo(resultado) is True

    def test_impacto_no_significativo(self) -> None:
        """Verifica la detección de impacto no significativo."""
        analizador = AnalizadorImpacto(umbral_minimo=50.0)
        datos = {"valor": 25, "factor": 1.0}

        resultado = analizador.analizar(datos)
        assert analizador.es_impacto_significativo(resultado) is False

    def test_manejo_error_tipo_incorrecto(self) -> None:
        """Verifica el manejo de tipos de datos incorrectos."""
        analizador = AnalizadorImpacto()

        with pytest.raises(ValueError):
            analizador.analizar({"valor": "no_es_numero"})  # type: ignore
