"""Configuración del paquete ImpactoIA."""

from setuptools import setup, find_packages

setup(
    name="impacto_ia",
    version="0.1.0",
    description="Sistema de análisis de impacto de IA",
    author="ImpactoIA Team",
    packages=find_packages(exclude=["tests*"]),
    python_requires=">=3.8",
    install_requires=[
        "pydantic>=2.0.0",
        "python-dotenv>=1.0.0",
    ],
    extras_require={
        "dev": [
            "pytest>=7.0.0",
            "pytest-cov>=4.0.0",
            "black>=23.0.0",
            "flake8>=6.0.0",
            "mypy>=1.0.0",
        ]
    },
)
