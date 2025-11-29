# ImpactoIA

Aplicación de escritorio para Windows que se ejecuta en segundo plano con icono en la barra de tareas (system tray).

## Características

- ✨ Se ejecuta en segundo plano
- 📌 Icono en la barra de tareas de Windows
- 🖱️ Menú contextual al hacer clic derecho
- 🔄 Minimiza a la bandeja en lugar de cerrar
- 💻 Interfaz moderna y atractiva

## Requisitos

- Node.js 16 o superior
- npm o yarn
- Windows 10/11 (para probar y crear el instalador)

## Instalación para Desarrollo

1. Clona el repositorio:
```bash
git clone <tu-repositorio>
cd ImpactoIA
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta la aplicación en modo desarrollo:
```bash
npm start
```

## Crear el Instalador para Windows

Para crear un instalador `.exe` ejecutable:

```bash
npm run build
```

El instalador se creará en la carpeta `dist/` con el nombre `ImpactoIA Setup x.x.x.exe`.

### Crear solo los archivos sin instalador

Si solo quieres los archivos de la aplicación sin crear el instalador:

```bash
npm run build:dir
```

Los archivos se crearán en `dist/win-unpacked/`.

## Uso

### Ejecutar la aplicación

- **Doble clic** en el icono de la bandeja: Muestra/oculta la ventana principal
- **Clic derecho** en el icono de la bandeja: Abre el menú con opciones
- **Cerrar la ventana**: La aplicación se minimiza a la bandeja
- **Salir**: Usa la opción "Salir" del menú del icono en la bandeja

## Estructura del Proyecto

```
ImpactoIA/
├── main.js              # Proceso principal de Electron
├── preload.js           # Script de precarga
├── renderer.html        # Interfaz de usuario
├── renderer.js          # Lógica del renderizador
├── package.json         # Configuración del proyecto
├── assets/              # Recursos (iconos, imágenes)
│   ├── icon.png
│   ├── icon.ico
│   ├── icon.svg
│   └── tray-icon.png
└── README.md            # Este archivo
```

## Personalización

### Cambiar los Iconos

Los iconos se encuentran en la carpeta `assets/`. Reemplaza los archivos existentes con tus propios diseños:

- `icon.png` - Icono principal de la aplicación (256x256 recomendado)
- `tray-icon.png` - Icono para la bandeja del sistema (64x64 o menor)
- `icon.ico` - Icono para Windows (generado automáticamente por electron-builder)

Si tienes un archivo SVG, puedes generar los iconos PNG e ICO usando el script:

```bash
# Primero instala las dependencias de Python
pip install pillow cairosvg

# Luego ejecuta el script
python3 generate-icons.py
```

### Modificar la Interfaz

Edita `renderer.html` y `renderer.js` para personalizar la apariencia y funcionalidad de la ventana principal.

### Cambiar el Comportamiento

Edita `main.js` para modificar:
- El menú del icono de la bandeja
- El comportamiento al minimizar/cerrar
- El tamaño y propiedades de la ventana

## Distribución

Una vez creado el instalador con `npm run build`, puedes distribuir el archivo `.exe` resultante a tus usuarios. El instalador:

- Crea un acceso directo en el escritorio
- Crea un acceso directo en el menú inicio
- Permite al usuario elegir la carpeta de instalación
- Incluye un desinstalador

## Solución de Problemas

### La aplicación no inicia

- Verifica que Node.js esté instalado: `node --version`
- Reinstala las dependencias: `rm -rf node_modules && npm install`

### El icono de la bandeja no aparece

- En Windows, verifica la configuración de iconos de la bandeja del sistema
- Asegúrate de que los archivos de iconos existen en `assets/`

### Error al crear el instalador

- Verifica que tienes suficiente espacio en disco
- Ejecuta `npm run build` con permisos de administrador si es necesario
- Comprueba que no hay procesos de la aplicación en ejecución

## Licencia

MIT

## Contacto

Para soporte o preguntas, abre un issue en el repositorio.
