const { app, BrowserWindow, Tray, Menu, nativeImage } = require('electron');
const path = require('path');

let mainWindow = null;
let tray = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, '../assets/icon.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Prevenir que la aplicación se cierre al cerrar la ventana
  mainWindow.on('close', (event) => {
    if (!app.isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
    return false;
  });

  // Opcional: Abrir DevTools en modo desarrollo
  if (process.argv.includes('--dev')) {
    mainWindow.webContents.openDevTools();
  }
}

function createTray() {
  // Crear icono para el tray
  const iconPath = path.join(__dirname, '../assets/tray-icon.png');
  const trayIcon = nativeImage.createFromPath(iconPath);

  tray = new Tray(trayIcon);

  // Menú contextual del tray
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Mostrar Aplicación',
      click: () => {
        mainWindow.show();
      }
    },
    {
      label: 'Ocultar Aplicación',
      click: () => {
        mainWindow.hide();
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Acerca de',
      click: () => {
        mainWindow.show();
        mainWindow.webContents.send('show-about');
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Salir',
      click: () => {
        app.isQuitting = true;
        app.quit();
      }
    }
  ]);

  tray.setContextMenu(contextMenu);
  tray.setToolTip('ImpactoIA - Aplicación en segundo plano');

  // Doble click en el icono del tray para mostrar/ocultar
  tray.on('double-click', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
    }
  });
}

// Cuando Electron ha terminado de inicializar
app.whenReady().then(() => {
  createWindow();
  createTray();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Salir cuando todas las ventanas estén cerradas (excepto en macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    // En Windows, no cerramos la app, solo ocultamos la ventana
    // La app seguirá corriendo en el system tray
  }
});

// Prevenir cierre accidental
app.on('before-quit', () => {
  app.isQuitting = true;
});
