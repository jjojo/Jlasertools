// src/electron/main.js
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const { setMainMenu } = require('./main-menu.js')

require('electron-reload')(__dirname, '../../')
require('dotenv').config()

let win = null;

app.on('ready', function () {

  // Initialize the window to our specified dimensions
  win = new BrowserWindow({width: 1200, height: 720, show: false});

  // Specify entry point
  if (process.env.PACKAGE === 'true'){
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  } else {
    win.loadURL(process.env.HOST);
    win.webContents.openDevTools();
  }

  // Show dev tools
  // Remove this line before distributing
  win.webContents.openDevTools()

  // Show window when styles are fully loaded
  win.on('ready-to-show', () => {
    win.show()
  })

  setMainMenu(win);

  // Remove window once app is closed
  win.on('closed', function () {
    win = null;
  });

});

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});