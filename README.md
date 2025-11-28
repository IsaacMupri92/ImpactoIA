# 🚀 ImpactoIA - Aplicación de Windows con System Tray

Aplicación de escritorio para Windows desarrollada con Electron que se ejecuta en segundo plano con soporte completo para el System Tray (bandeja del sistema).

## ✨ Características

- ✅ **Ejecución en segundo plano**: La aplicación continúa ejecutándose incluso cuando cierras la ventana
- ✅ **Icono en la bandeja del sistema**: Icono personalizado visible en el system tray
- ✅ **Minimizar a la bandeja**: Al cerrar la ventana, la aplicación se minimiza al tray en lugar de cerrarse
- ✅ **Menú contextual**: Clic derecho en el icono del tray para acceder a opciones
- ✅ **Mostrar/Ocultar**: Doble clic en el icono para mostrar u ocultar la ventana
- ✅ **Interfaz moderna**: Diseño atractivo con gradientes y efectos visuales

## 🛠️ Tecnologías Utilizadas

- **Electron**: Framework para crear aplicaciones de escritorio con tecnologías web
- **Node.js**: Entorno de ejecución JavaScript
- **HTML/CSS/JavaScript**: Para la interfaz de usuario

## 📋 Requisitos Previos

- Node.js (versión 16 o superior)
- npm (incluido con Node.js)

## 🚀 Instalación

1. **Clonar el repositorio**:
```bash
git clone <url-del-repositorio>
cd ImpactoIA
```

2. **Instalar dependencias**:
```bash
npm install
```

3. **Generar iconos PNG** (importante):
   - Los archivos SVG están en la carpeta `assets/`
   - Necesitas convertirlos a PNG antes de ejecutar
   - Sigue las instrucciones en `assets/README-ICONS.md`
   - O usa iconos temporales ejecutando:

   ```bash
   # En Windows con ImageMagick instalado
   convert -background none assets/icon.svg -resize 256x256 assets/icon.png
   convert -background none assets/tray-icon.svg -resize 32x32 assets/tray-icon.png
   ```

## 🎮 Uso

### Modo Desarrollo

```bash
npm start
```

Para ejecutar en modo desarrollo con DevTools abierto:

```bash
npm run dev
```

### Generar Ejecutable

Para crear un ejecutable instalable de Windows (.exe):

```bash
npm run build
```

El ejecutable se generará en la carpeta `dist/`.

## 📖 Funcionalidades del System Tray

### Menú del System Tray

Haz clic derecho en el icono de la bandeja del sistema para ver estas opciones:

- **Mostrar Aplicación**: Muestra la ventana principal
- **Ocultar Aplicación**: Oculta la ventana (sigue ejecutándose en segundo plano)
- **Acerca de**: Información sobre la aplicación
- **Salir**: Cierra completamente la aplicación

### Interacciones

- **Doble clic en el icono**: Alterna entre mostrar/ocultar la ventana
- **Cerrar ventana (X)**: La aplicación se minimiza al tray en lugar de cerrarse
- **Hover sobre el icono**: Muestra tooltip con el nombre de la aplicación

## 📁 Estructura del Proyecto

```
ImpactoIA/
├── src/
│   ├── main.js          # Archivo principal de Electron
│   └── index.html       # Interfaz de usuario
├── assets/
│   ├── icon.svg         # Icono principal (SVG)
│   ├── tray-icon.svg    # Icono del tray (SVG)
│   ├── icon.png         # Icono principal (PNG) - generar
│   ├── tray-icon.png    # Icono del tray (PNG) - generar
│   └── README-ICONS.md  # Instrucciones para iconos
├── package.json         # Configuración del proyecto
├── .gitignore          # Archivos ignorados por git
└── README.md           # Este archivo
```

## 🎨 Personalización

### Cambiar el Icono

1. Reemplaza los archivos en `assets/icon.png` y `assets/tray-icon.png`
2. Para Windows, genera también un `icon.ico`:
   ```bash
   convert icon.png -define icon:auto-resize=256,128,96,64,48,32,16 assets/icon.ico
   ```

### Modificar el Menú del Tray

Edita el archivo `src/main.js` en la función `createTray()` para añadir o modificar opciones del menú.

### Cambiar la Interfaz

Edita `src/index.html` para modificar el diseño y contenido de la ventana principal.

## 🔧 Configuración Avanzada

### Ejecutar al Inicio de Windows

Para que la aplicación se ejecute automáticamente al iniciar Windows:

1. Genera el ejecutable con `npm run build`
2. Crea un acceso directo del .exe en:
   ```
   C:\Users\TuUsuario\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup
   ```

### Cambiar el Comportamiento de Cierre

En `src/main.js`, modifica el evento `close` de `mainWindow` según tus necesidades.

## 📝 Scripts Disponibles

- `npm start` - Ejecuta la aplicación en modo normal
- `npm run dev` - Ejecuta la aplicación con DevTools abierto
- `npm run build` - Genera el ejecutable para Windows

## 🐛 Solución de Problemas

### El icono no aparece en el tray

- Asegúrate de haber generado los archivos PNG desde los SVG
- Verifica que `assets/tray-icon.png` existe
- Reinicia la aplicación

### La aplicación no se minimiza al tray

- Verifica que el icono del tray se haya creado correctamente
- Revisa la consola de DevTools para errores

### Error al instalar dependencias

```bash
# Limpia la caché de npm
npm cache clean --force

# Elimina node_modules y reinstala
rm -rf node_modules
npm install
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

## 👨‍💻 Autor

**ImpactoIA**

## 🙏 Agradecimientos

- Electron por el excelente framework
- La comunidad de desarrollo de código abierto

---

**Nota**: Esta es una aplicación base que puedes extender según tus necesidades. Algunas ideas:
- Añadir notificaciones del sistema
- Integrar con APIs externas
- Almacenar datos localmente
- Añadir atajos de teclado globales
- Implementar actualizaciones automáticas
