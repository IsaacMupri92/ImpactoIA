# Makefile para ImpactoIA - Simplifica tareas comunes

.PHONY: help install test lint format typecheck clean all

help:  ## Muestra esta ayuda
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

install:  ## Instala dependencias
	pip install -r requirements.txt
	pip install -e .

install-dev:  ## Instala dependencias de desarrollo
	pip install -r requirements.txt
	pip install -e ".[dev]"

test:  ## Ejecuta tests
	pytest tests/ -v

test-cov:  ## Ejecuta tests con reporte de cobertura
	pytest tests/ --cov=impacto_ia --cov-report=html --cov-report=term

lint:  ## Verifica calidad del código
	flake8 impacto_ia/ tests/

format:  ## Formatea el código
	black impacto_ia/ tests/ examples/

typecheck:  ## Verifica tipos estáticos
	mypy impacto_ia/

clean:  ## Limpia archivos generados
	rm -rf __pycache__ .pytest_cache .mypy_cache htmlcov .coverage
	find . -type d -name "__pycache__" -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete

all: format lint typecheck test  ## Ejecuta todas las verificaciones

check: all  ## Alias para 'all'

example:  ## Ejecuta ejemplo básico
	python examples/ejemplo_basico.py
