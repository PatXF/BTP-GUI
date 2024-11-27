const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  saveJsonFile: (jsonObject) =>
    ipcRenderer.invoke("save-json-file", jsonObject),
  openJsonFile: () => ipcRenderer.invoke("open-json-file"),
  minimizeWindow: () => ipcRenderer.send("window:minimize"),
  restoreWindow: () => ipcRenderer.send("window:restore"),
  closeWindow: () => ipcRenderer.send("window:close"),
});
