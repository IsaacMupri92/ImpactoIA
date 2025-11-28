# Principios de Código Mantenible

## ¿Qué hace que el código sea mantenible?

Un código es **fácil de mantener** cuando:

1. **Se puede entender rápidamente** - Un desarrollador nuevo puede comprenderlo en minutos
2. **Se puede modificar con seguridad** - Los cambios no rompen funcionalidad existente
3. **Se puede probar fácilmente** - Tests claros verifican el comportamiento

## Legibilidad

### Nombres Descriptivos

```python
# ❌ Malo - Requiere contexto mental
def calc(d, f):
    return d * f

# ✅ Bueno - Auto-explicativo
def calcular_puntuacion_ajustada(
    puntuacion_base: float,
    factor_ajuste: float
) -> float:
    """Calcula la puntuación ajustada por el factor."""
    return puntuacion_base * factor_ajuste
```

### Funciones Pequeñas

Una función debe hacer **una sola cosa** y hacerla bien.

```python
# ❌ Malo - Hace demasiadas cosas
def procesar_y_guardar(datos):
    # Valida
    if not datos:
        raise ValueError("Vacío")
    # Transforma
    resultado = datos * 2
    # Guarda
    with open("file.txt", "w") as f:
        f.write(str(resultado))
    # Envía email
    send_email("resultado", resultado)
    return resultado

# ✅ Bueno - Responsabilidad única
def validar_datos(datos: dict[str, Any]) -> None:
    """Valida que los datos no estén vacíos."""
    if not datos:
        raise ValueError("Los datos no pueden estar vacíos")

def transformar_datos(datos: dict[str, Any]) -> float:
    """Transforma los datos en puntuación."""
    return datos.get("valor", 0) * 2.0

def guardar_resultado(resultado: float, ruta: Path) -> None:
    """Guarda el resultado en un archivo."""
    ruta.write_text(str(resultado))
```

### Documentación Clara

```python
def analizar(self, datos: dict[str, Any]) -> ResultadoAnalisis:
    """
    Analiza el impacto basándose en los datos proporcionados.

    Args:
        datos: Diccionario con los datos a analizar.
               Debe contener 'valor' (float) y opcionalmente 'factor' (float).

    Returns:
        ResultadoAnalisis con la evaluación del impacto.

    Raises:
        ValueError: Si los datos son inválidos o están vacíos.
        RuntimeError: Si ocurre un error durante el análisis.

    Example:
        >>> analizador = AnalizadorImpacto()
        >>> resultado = analizador.analizar({"valor": 50, "factor": 1.5})
        >>> print(resultado.puntuacion)
        75.0
    """
```

## Simplicidad

### KISS (Keep It Simple, Stupid)

```python
# ❌ Sobre-ingeniería
class CalculadorPuntuacionFactory:
    def crear_calculador(self, tipo: str):
        if tipo == "simple":
            return CalculadorSimple()
        elif tipo == "complejo":
            return CalculadorComplejo()
    # ... 50 líneas más

# ✅ Simple y directo
def calcular_puntuacion(valor: float, factor: float = 1.0) -> float:
    """Calcula la puntuación multiplicando valor por factor."""
    return valor * factor
```

### DRY (Don't Repeat Yourself)

```python
# ❌ Repetición
def procesar_usuario(usuario):
    if usuario is None:
        raise ValueError("Usuario no puede ser None")
    if not isinstance(usuario, dict):
        raise ValueError("Usuario debe ser dict")
    # ... procesar

def procesar_producto(producto):
    if producto is None:
        raise ValueError("Producto no puede ser None")
    if not isinstance(producto, dict):
        raise ValueError("Producto debe ser dict")
    # ... procesar

# ✅ Reutilizable
def validar_entrada(datos: Any, nombre: str) -> None:
    """Valida que los datos sean un diccionario no nulo."""
    if datos is None:
        raise ValueError(f"{nombre} no puede ser None")
    if not isinstance(datos, dict):
        raise ValueError(f"{nombre} debe ser dict")

def procesar_usuario(usuario: dict[str, Any]) -> None:
    validar_entrada(usuario, "Usuario")
    # ... procesar

def procesar_producto(producto: dict[str, Any]) -> None:
    validar_entrada(producto, "Producto")
    # ... procesar
```

## Robustez

### Validación de Entrada

**Siempre valida en los límites del sistema** (APIs, entrada de usuario, archivos externos).

```python
def analizar(self, datos: dict[str, Any]) -> ResultadoAnalisis:
    """Analiza datos con validación robusta."""
    # ✅ Validar primero
    validar_datos_entrada(datos)

    try:
        # Procesamiento seguro
        puntuacion = self._calcular_puntuacion(datos)
        return ResultadoAnalisis(puntuacion=puntuacion, mensaje="OK")
    except Exception as error:
        logger.error(f"Error al analizar: {error}")
        raise RuntimeError(f"Error al analizar datos: {error}") from error
```

### Manejo de Errores Específico

```python
# ❌ Malo - Captura todo
try:
    resultado = procesar(datos)
except:  # Demasiado genérico
    print("Error")

# ✅ Bueno - Específico
try:
    resultado = procesar(datos)
except ValueError as e:
    logger.error(f"Datos inválidos: {e}")
    raise  # Re-lanza para que el llamador lo maneje
except FileNotFoundError as e:
    logger.error(f"Archivo no encontrado: {e}")
    raise
```

### Type Hints para Prevención

```python
# ✅ Type hints ayudan a detectar errores antes de ejecutar
def calcular_promedio(valores: list[float]) -> float:
    """Calcula el promedio de una lista de valores."""
    if not valores:
        raise ValueError("La lista no puede estar vacía")
    return sum(valores) / len(valores)

# mypy detectará esto como error:
resultado = calcular_promedio("not a list")  # ❌ Type error
```

## Testabilidad

### Diseño Testeable

```python
# ✅ Fácil de testear - Inyección de dependencias
class AnalizadorImpacto:
    def __init__(self, umbral_minimo: float = 0.0):
        self.umbral_minimo = umbral_minimo

    def analizar(self, datos: dict[str, Any]) -> ResultadoAnalisis:
        # Lógica testeable
        pass

# Test
def test_analisis_con_umbral_personalizado():
    analizador = AnalizadorImpacto(umbral_minimo=50.0)
    resultado = analizador.analizar({"valor": 60})
    assert analizador.es_impacto_significativo(resultado)
```

### Tests Descriptivos

```python
# ✅ Nombres que explican qué se prueba
def test_validacion_rechaza_valores_negativos() -> None:
    """Verifica que valores negativos lanzan ValueError."""
    with pytest.raises(ValueError, match="no puede ser negativo"):
        validar_datos_entrada({"valor": -10})

def test_calculo_puntuacion_respeta_limite_superior() -> None:
    """Verifica que la puntuación nunca excede 100."""
    resultado = analizador.analizar({"valor": 200, "factor": 10})
    assert resultado.puntuacion <= 100
```

## Principios SOLID

### Single Responsibility

Cada clase tiene una única responsabilidad:

```python
# ✅ Bueno
class ResultadoAnalisis(BaseModel):
    """Representa el resultado. Solo representación."""
    puntuacion: float
    mensaje: str

class AnalizadorImpacto:
    """Analiza impacto. Solo análisis."""
    def analizar(self, datos: dict[str, Any]) -> ResultadoAnalisis:
        # Lógica de análisis
        pass
```

### Open/Closed

Abierto para extensión, cerrado para modificación:

```python
# ✅ Extensible sin modificar
class AnalizadorImpacto:
    def analizar(self, datos: dict[str, Any]) -> ResultadoAnalisis:
        puntuacion = self._calcular_puntuacion(datos)
        return self._crear_resultado(puntuacion)

    def _calcular_puntuacion(self, datos: dict[str, Any]) -> float:
        """Puede ser sobrescrito en subclases."""
        return datos.get("valor", 0) * datos.get("factor", 1.0)
```

## Checklist de Mantenibilidad

Antes de hacer commit, verifica:

- [ ] ¿Los nombres son auto-explicativos?
- [ ] ¿Las funciones son pequeñas (< 20 líneas)?
- [ ] ¿Hay docstrings en funciones públicas?
- [ ] ¿Los datos de entrada están validados?
- [ ] ¿Los errores se manejan específicamente?
- [ ] ¿Hay type hints en todas las funciones?
- [ ] ¿Los tests cubren los casos importantes?
- [ ] ¿El código sigue el principio DRY?
- [ ] ¿No hay complejidad innecesaria?

## Conclusión

**El código se lee muchas más veces de las que se escribe.**

Invierte tiempo en hacer que tu código sea:
- **Obvio** - No requiere esfuerzo mental para entenderlo
- **Simple** - La solución más directa al problema
- **Robusto** - Maneja casos extremos y errores de forma clara

El resultado será un código que cualquier desarrollador (incluyéndote a ti en 6 meses) podrá mantener con confianza.
