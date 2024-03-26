import log from 'electron-log';
import { autoUpdater } from 'electron-updater';
// import pkg from 'electron-updater';
// const { autoUpdater } = pkg;
import { app, BrowserWindow, ipcMain } from 'electron';
// const { app, BrowserWindow, ipcMain } = require('electron')
import path from 'path';
// const path = require('path');




log.catchErrors()
log.info('AdsMarket starting...');


// autoUpdater.logger = log;

let win;

function createWindow() {
	win = new BrowserWindow({
		show: false,
		width: 1800,
		height: 850,
		x: 0,
		y: 0,
		webPreferences: {
			webSecurity: false,
			devTools: true,
			// devTools: process.env.ENV === 'development',
			contextIsolation: true,
			nodeIntegration: true,
			enableRemoteModule: true,
			nodeIntegrationInWorker: true,
			preload: path.join(__dirname, "preload.js")
		},
	});
	if (process.env.ENV === 'development') {
		win.loadURL(`http://127.0.0.1:4000`);
		win.webContents.openDevTools();
	} else {
		win.loadFile('index.html')
		win.maximize();
	}

	win.once('ready-to-show', win.show)

	win.on('close', () => win = null)

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


ipcMain.on('app_version', async (event, data) => {
	event.sender.send('app_version', { version: app.getVersion() });
});



// Check for updated
autoUpdater.checkForUpdatesAndNotify();

autoUpdater.on('update-available', () => {
    win.webContents.send('update_available');
});

autoUpdater.on('update-downloaded', () => {
    win.webContents.send('update_downloaded');
});



// Get erroes in terminal
process.on('uncaughtException', function (error) {
	console.log(error)
})





// IPC EXAMPLE Resive on back and send to front in callback
ipcMain.on('test', async (event, arg) => {

	console.log('code is ' + arg.testCode)

	win.webContents.send('testMain')
})





