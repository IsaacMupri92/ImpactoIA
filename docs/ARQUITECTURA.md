# Arquitectura de ImpactoIA

## Visión General

ImpactoIA está diseñado con **mantenibilidad** como prioridad principal. La arquitectura sigue principios SOLID y patrones de diseño que facilitan la comprensión y modificación del código.

## Estructura del Proyecto

```
ImpactoIA/
│
├── impacto_ia/              # Código fuente principal
│   ├── __init__.py          # Exportaciones públicas del paquete
│   │
│   ├── core/                # Lógica de negocio principal
│   │   ├── __init__.py
│   │   └── analizador.py    # Clase principal AnalizadorImpacto
│   │
│   ├── models/              # Modelos de datos (Pydantic)
│   │   ├── __init__.py
│   │   └── resultado.py     # ResultadoAnalisis con validación
│   │
│   ├── utils/               # Utilidades compartidas
│   │   ├── __init__.py
│   │   ├── logger.py        # Sistema de logging
│   │   └── validadores.py  # Validación de datos
│   │
│   └── config/              # Configuración centralizada
│       ├── __init__.py
│       └── settings.py      # Settings con Pydantic
│
├── tests/                   # Tests completos
│   ├── test_analizador.py
│   ├── test_resultado.py
│   └── test_validadores.py
│
├── examples/                # Ejemplos de uso
│   └── ejemplo_basico.py
│
└── docs/                    # Documentación
    └── ARQUITECTURA.md      # Este archivo
```

## Principios de Diseño

### 1. Separación de Responsabilidades

Cada módulo tiene una responsabilidad clara:

- **core/**: Lógica de negocio
- **models/**: Representación de datos
- **utils/**: Funciones auxiliares reutilizables
- **config/**: Gestión de configuración

### 2. Inyección de Dependencias

```python
# La configuración se inyecta, no se accede globalmente
analizador = AnalizadorImpacto(umbral_minimo=50.0)
```

### 3. Validación con Pydantic

Los modelos usan Pydantic para validación automática:

```python
class ResultadoAnalisis(BaseModel):
    puntuacion: float = Field(ge=0, le=100)  # Auto-validación
    mensaje: str = Field(min_length=1)
```

### 4. Type Hints Completos

Todo el código usa type hints para:
- Documentación automática
- Detección temprana de errores con mypy
- Mejor autocompletado en IDEs

## Flujo de Datos

```
┌─────────────┐
│   Usuario   │
└──────┬──────┘
       │ datos (dict)
       ▼
┌─────────────────────┐
│  validar_datos()    │  ← Validación robusta
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ AnalizadorImpacto   │  ← Lógica de negocio
│  .analizar()        │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ ResultadoAnalisis   │  ← Modelo validado
└─────────────────────┘
```

## Manejo de Errores

### Estrategia en Capas

1. **Validación de entrada** (utils/validadores.py)
   - Valida tipos y rangos
   - Lanza `ValueError` con mensajes claros

2. **Lógica de negocio** (core/analizador.py)
   - Captura errores de validación
   - Lanza `RuntimeError` para errores inesperados
   - Registra errores con el logger

3. **Modelos** (models/resultado.py)
   - Validación automática con Pydantic
   - Lanza `ValidationError` si los datos no son válidos

### Ejemplo

```python
try:
    resultado = analizador.analizar(datos)
except ValueError as e:
    # Error de validación de entrada
    logger.error(f"Datos inválidos: {e}")
except RuntimeError as e:
    # Error en el procesamiento
    logger.error(f"Error al procesar: {e}")
```

## Configuración

### Jerarquía de Configuración

1. Valores por defecto (config/settings.py)
2. Archivo .env (sobrescribe defaults)
3. Variables de entorno (sobrescribe .env)

```python
# settings.py
class Settings(BaseSettings):
    debug: bool = Field(default=False)
    umbral_impacto: float = Field(default=50.0)

    class Config:
        env_prefix = "IMPACTO_IA_"
        env_file = ".env"
```

## Testing

### Estrategia

- **Tests unitarios**: Cada función/clase
- **Tests de integración**: Flujos completos
- **Cobertura mínima**: 80%

### Organización

```python
class TestAnalizadorImpacto:
    """Una clase de test por clase de producción."""

    def test_caso_especifico(self) -> None:
        """Un test por comportamiento específico."""
        # Arrange
        analizador = AnalizadorImpacto()

        # Act
        resultado = analizador.analizar(datos)

        # Assert
        assert resultado.puntuacion > 0
```

## Logging

### Niveles de Log

- **DEBUG**: Información detallada de diagnóstico
- **INFO**: Confirmación de operaciones normales
- **WARNING**: Situaciones inesperadas no críticas
- **ERROR**: Errores que requieren atención

### Uso

```python
from impacto_ia.utils.logger import obtener_logger

logger = obtener_logger(__name__)
logger.info("Operación completada")
logger.error(f"Error al procesar: {error}")
```

## Extensibilidad

### Añadir Nuevos Validadores

```python
# En utils/validadores.py
def validar_nuevo_campo(datos: dict[str, Any]) -> None:
    """Valida un nuevo campo."""
    if "nuevo_campo" in datos:
        valor = datos["nuevo_campo"]
        if not validar_condicion(valor):
            raise ValueError("Mensaje de error claro")
```

### Añadir Nuevos Modelos

```python
# En models/nuevo_modelo.py
from pydantic import BaseModel, Field

class NuevoModelo(BaseModel):
    """Documentación clara del modelo."""

    campo: str = Field(description="Descripción del campo")
```

## Mejores Prácticas

### DO ✅

- Usa type hints en todas las funciones
- Escribe docstrings descriptivos
- Valida datos en los límites del sistema
- Mantén funciones pequeñas (< 20 líneas)
- Usa nombres descriptivos
- Escribe tests para cada comportamiento

### DON'T ❌

- No uses variables globales mutables
- No captures excepciones genéricas sin re-lanzar
- No añadas código "por si acaso" para el futuro
- No uses abreviaciones en nombres
- No omitas validación de datos externos
- No escribas funciones que hacen múltiples cosas

## Recursos Adicionales

- [CONTRIBUTING.md](../CONTRIBUTING.md) - Guía de contribución
- [README.md](../README.md) - Documentación de uso
