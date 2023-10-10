import log from 'electron-log';
import { autoUpdater } from 'electron-updater';
import { app, BrowserWindow, ipcMain } from 'electron';

log.catchErrors()
log.info('AdsMarket starting...');


autoUpdater.logger = log;

let win;

function createWindow() {
    win = new BrowserWindow({
        show: false,
        width: 1400,
        height: 800,
        x: 0,
        y: 0, 
        backgroundColor: 'rgba(18, 19, 28, 1)',
        webPreferences: {
            devTools: process.env.ENV === 'development',
            nodeIntegration: true,
            contextIsolation: true,
        },
    });
    if (process.env.ENV === 'development') {
        win.loadURL(`http://127.0.0.1:4000`);
        win.webContents.openDevTools();
    } else {
        win.loadFile(__dirname + '/index.html');
        win.maximize();
    }

    win.once('ready-to-show', win.show)

    win.on('close', () => win = null )

}

app.whenReady().then(() => {
    createWindow()
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// ipcMain.on('app_version', (event) => {
//     event.sender.send('app_version', { version: app.getVersion() });
// });



// Check for updated
// autoUpdater.checkForUpdatesAndNotify();

// autoUpdater.on('update-available', () => {
//     win.webContents.send('update_available');
// });

// autoUpdater.on('update-downloaded', () => {
//     win.webContents.send('update_downloaded');
// });



// Get erroes in terminal
// process.on('uncaughtException', function (error) {
//     console.log( error )
// })







