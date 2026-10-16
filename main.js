const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const bytenode = require('bytenode');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 720,
    resizable: false,
    frame: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    backgroundColor: '#0a0d14'
  });

  mainWindow.loadFile('src/index.html');
}

// Load Bytecode module if compiled, otherwise runtime execution
const compiledMainPath = path.join(__dirname, 'main.jsc');
if (fs.existsSync(compiledMainPath)) {
  require(compiledMainPath);
} else {
  app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('app-close', () => app.quit());
ipcMain.on('app-minimize', () => mainWindow.minimize());
