# Guía de Contribución

## Principios de Código

Este proyecto sigue estrictos principios de mantenibilidad:

### 1. Legibilidad

- **Nombres descriptivos**: Las variables y funciones deben explicar su propósito
- **Funciones pequeñas**: Cada función hace una sola cosa
- **Comentarios útiles**: Documenta el "por qué", no el "qué"

```python
# ❌ Malo
def proc(d):
    return d * 2

# ✅ Bueno
def calcular_puntuacion_doble(puntuacion: float) -> float:
    """Duplica la puntuación para casos especiales."""
    return puntuacion * 2
```

### 2. Simplicidad

- **KISS** (Keep It Simple, Stupid): La solución más simple es la mejor
- **No sobre-ingeniería**: No añadas complejidad para casos futuros hipotéticos
- **DRY** (Don't Repeat Yourself): Reutiliza código cuando sea apropiado

### 3. Robustez

- **Validación de entrada**: Siempre valida datos externos
- **Manejo de errores**: Captura y maneja errores de manera clara
- **Type hints**: Usa tipado estático para prevenir errores

```python
def procesar_datos(datos: dict[str, Any]) -> ResultadoAnalisis:
    """
    Procesa datos con validación y manejo de errores.

    Args:
        datos: Diccionario con datos a procesar

    Returns:
        ResultadoAnalisis con los datos procesados

    Raises:
        ValueError: Si los datos son inválidos
    """
    if not isinstance(datos, dict):
        raise ValueError("Los datos deben ser un diccionario")

    # ... resto de la lógica
```

## Estándares de Código

### Formateo

Usamos `black` para formateo automático:

```bash
black impacto_ia/ tests/
```

### Linting

Usamos `flake8` para verificar calidad:

```bash
flake8 impacto_ia/ tests/
```

### Type Checking

Usamos `mypy` para verificar tipos:

```bash
mypy impacto_ia/
```

## Tests

### Escribir Tests

- Un test por comportamiento
- Nombres descriptivos que explican qué se prueba
- Arrange-Act-Assert pattern

```python
def test_validacion_rechaza_valores_negativos() -> None:
    """Verifica que valores negativos lanzan ValueError."""
    # Arrange
    datos = {"valor": -10}

    # Act & Assert
    with pytest.raises(ValueError, match="no puede ser negativo"):
        validar_datos_entrada(datos)
```

### Ejecutar Tests

```bash
# Todos los tests
pytest

# Con cobertura
pytest --cov=impacto_ia --cov-report=html

# Tests específicos
pytest tests/test_analizador.py
```

## Flujo de Trabajo

1. **Crear rama**: `git checkout -b feature/mi-caracteristica`
2. **Escribir código**: Siguiendo los principios anteriores
3. **Escribir tests**: Cobertura mínima 80%
4. **Verificar calidad**:
   ```bash
   black impacto_ia/ tests/
   flake8 impacto_ia/ tests/
   mypy impacto_ia/
   pytest
   ```
5. **Commit**: Mensajes claros y descriptivos
6. **Pull Request**: Con descripción detallada

## Estructura de Commits

```
tipo: descripción breve

Descripción más detallada si es necesaria.

Relacionado con: #issue-number
```

Tipos:
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Documentación
- `refactor`: Refactorización
- `test`: Tests
- `chore`: Tareas de mantenimiento

## Preguntas

Si tienes dudas, abre un issue para discutirlo con el equipo.
