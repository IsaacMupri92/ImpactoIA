const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onShowAbout: (callback) => ipcRenderer.on('show-about', callback)
});
