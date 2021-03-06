const electron = require('electron')
const { app, BrowserWindow } = require('electron');
const path = require('path');
const { settings } = require('cluster');
const { electronProcess } = require('process');
const ipc = electron.ipcMain;
const dialog = electron.dialog;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

var mainWindow;
const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width: 480,
    height: 740,
    // icon: __dirname + '..\..\..\images\batterysync dark mode logo.png'
  })
  mainWindow.removeMenu();

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

ipc.on('show-settings-window', function(event){
  loadSettingsWindow();
})

ipc.on('show-login-page', function(event){
  loadLoginPage();
})

function loadSettingsWindow(){
  mainWindow.setSize(400, 600)
  mainWindow.loadFile(path.join(__dirname, 'settings.html'))
}

function loadLoginPage(){
  mainWindow.setSize(480, 720);
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// document.getElementById("loginButton").addEventListener("click", function(){console.log("WEEWEOOO")});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
