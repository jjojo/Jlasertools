const { app, Menu } = require('electron');
const { showMessage, showSaveDialog, showOpenDialog } = require('./dialogs.js')
const isWindows = process.platform === 'win32';

module.exports = {
    setMainMenu
};

function setMainMenu(win) {
    const template = [
        {
            label: isWindows ? 'File' : app.getName(),
            submenu: [
                {
                    label: isWindows ? 'Exit' : `Quit ${app.getName()}`,
                    accelerator: isWindows ? 'Alt+F4' : 'CmdOrCtrl+Q',
                    click() {
                        app.quit();
                    }
                },
                {
                    label: 'save memory info',
                    click() {
                        showSaveDialog(win)
                    }
                },
                {
                    label: 'open mem info',
                    click() {
                        showOpenDialog(win)
                    }
                },
                {
                    label: 'About',
                    click() {
                        showMessage(win)
                    }
                }
            ]
        },
        {
            label: 'Edit',
            submenu:[
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                { role: 'selectall' }

            ]  
        }
    ]
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}

