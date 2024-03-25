const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld(
	"ipc", {
	send: (channel, data) => {
		ipcRenderer.send(channel, data);
	},
	on: (channel, callback) => {
		const newCallback = (_, data) => callback(data);
		ipcRenderer.on(channel, newCallback);
	}
}
);