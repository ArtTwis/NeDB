const electron = require('electron');
const { app, BrowserWindow, dialog, Menu, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
let appPath = app.getAppPath();

let win;

function createWindow() {
  win = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });
  win.loadFile('src/index.html');
  win.maximize();
  win.show();
  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
