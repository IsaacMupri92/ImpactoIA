# ImpactoIA

Sistema de análisis de impacto de IA, diseñado con principios de código limpio y mantenible.

## 📋 Características

- **Código Legible**: Nombres descriptivos, funciones pequeñas y bien documentadas
- **Simplicidad**: Arquitectura clara sin complejidad innecesaria
- **Robustez**: Manejo de errores completo y validación de datos

## 🚀 Instalación

```bash
# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt
```

## 📖 Uso

```python
from impacto_ia import AnalizadorImpacto

# Crear instancia del analizador
analizador = AnalizadorImpacto()

# Analizar impacto
resultado = analizador.analizar(datos)
print(resultado)
```

## 🧪 Tests

```bash
pytest tests/
```

## 📁 Estructura del Proyecto

```
impacto_ia/
├── core/           # Lógica principal
├── utils/          # Utilidades comunes
├── models/         # Modelos de datos
└── config/         # Configuración

tests/              # Tests unitarios e integración
docs/               # Documentación adicional
```

## 🤝 Contribución

El código sigue estos principios:
- **DRY**: No repetir código
- **KISS**: Mantener simplicidad
- **SOLID**: Principios de diseño orientado a objetos
- **Type Hints**: Tipado estático para mejor documentación

## 📝 Licencia

MIT
