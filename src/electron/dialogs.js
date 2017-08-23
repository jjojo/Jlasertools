const { dialog, app, nativeImage } = require('electron');
const fs = require('fs');
const path = require('path');

module.exports = {
    showMessage,
    showSaveDialog,
    showOpenDialog
}

function showMessage( browserWindow ) {
    dialog.showMessageBox( browserWindow, {
        type: 'info',
        icon: nativeImage.createFromPath('../assets/img/test/J_favicon_2-01.png'),
        message: 'Hello',
        detail: 'test texts',
        buttons: ['OK'],
        defaultId: 0,    
    }, (clickedIndex) => {
        console.log(clickedIndex)
    })
}


function showSaveDialog(browserWindow){
    dialog.showSaveDialog(browserWindow, {
        defaultPath: path.join(app.getPath('downloads'), 'mem-info.txt')
    }, (filename) => {
        if(filename){
            const memInfo = JSON.stringify(process.getProcessMemoryInfo(), null, 2);
            fs.writeFile(filename, memInfo, 'utf-8', (error) => {
                if(error){
                    dialog.showErrorBox('Save Failed', error.message)
                }
            })
        }
    })
}


function showOpenDialog(browserWindow){
    dialog.showOpenDialog(browserWindow, {
        defaultPath: app.getPath('downloads'),
        filters: [
            { name: 'Text Files', extensions: ['txt'] }
        ]
    }, (filepaths) => {
            if(filepaths){
                console.log(filepaths, fs.readFileSync(filepaths[0], 'utf8'))
            }
        }
    )
}