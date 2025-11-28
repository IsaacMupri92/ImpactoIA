# Iconos de la Aplicación

Este directorio contiene los iconos necesarios para la aplicación.

## Archivos de Iconos

- `icon.svg` - Icono principal de la aplicación (256x256)
- `tray-icon.svg` - Icono para el system tray (64x64)
- `icon.png` - Icono principal en formato PNG (debes generarlo)
- `tray-icon.png` - Icono del tray en PNG (debes generarlo)
- `icon.ico` - Icono para Windows (debes generarlo)

## Cómo generar los iconos PNG desde SVG

### Opción 1: Usando herramientas online
1. Ve a https://convertio.co/es/svg-png/
2. Sube los archivos SVG
3. Convierte a PNG con las siguientes dimensiones:
   - `icon.png`: 256x256 píxeles
   - `tray-icon.png`: 32x32 píxeles (para mejor visualización en Windows)

### Opción 2: Usando Inkscape (software gratuito)
```bash
# Instalar Inkscape
# Windows: Descargar desde https://inkscape.org/

# Convertir SVG a PNG
inkscape icon.svg --export-filename=icon.png --export-width=256 --export-height=256
inkscape tray-icon.svg --export-filename=tray-icon.png --export-width=32 --export-height=32
```

### Opción 3: Usando ImageMagick
```bash
# Instalar ImageMagick
# Windows: choco install imagemagick

# Convertir
convert -background none icon.svg -resize 256x256 icon.png
convert -background none tray-icon.svg -resize 32x32 tray-icon.png
```

## Generar archivo .ico para Windows

Para crear el archivo `icon.ico` necesario para Windows:

### Opción 1: Herramienta online
1. Ve a https://convertio.co/es/png-ico/
2. Sube `icon.png`
3. Descarga como `icon.ico`

### Opción 2: Usando ImageMagick
```bash
convert icon.png -define icon:auto-resize=256,128,96,64,48,32,16 icon.ico
```

## Recomendaciones de Diseño

- **System Tray**: Usa iconos simples y monocromáticos para mejor legibilidad en tamaños pequeños
- **Icono Principal**: Puede ser más detallado y colorido
- **Transparencia**: Usa fondo transparente para mejor integración con el sistema
- **Contraste**: Asegúrate de que el icono sea visible en fondos claros y oscuros

## Recursos para Iconos Profesionales

Si prefieres usar iconos profesionales:
- https://www.flaticon.com/
- https://icons8.com/
- https://www.iconfinder.com/
- https://fontawesome.com/
