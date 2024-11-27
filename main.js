// electron.js
const { app, BrowserWindow, Menu, dialog, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

let mainWindow;

function createWindow() {
  const win = new BrowserWindow({
    frame: false,
    width: 1920,
    height: 1080,
    icon: path.join(__dirname, "public", "icon.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
    },
  });

  Menu.setApplicationMenu(null);

  win.loadURL("http://localhost:3000");
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.handle("save-json-file", async (event, jsonObject) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    title: "Save JSON File",
    defaultPath: "data.json",
    filters: [{ name: "JSON Files", extensions: ["json"] }],
  });

  if (result.canceled) {
    return null;
  }

  const filePath = result.filePath;
  try {
    fs.writeFileSync(filePath, JSON.stringify(jsonObject, null, 2));
    return filePath;
  } catch (error) {
    console.error("Error saving JSON file:", error);
    return null;
  }
});

ipcMain.handle("open-json-file", async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: "Open JSON File",
    filters: [{ name: "JSON Files", extensions: ["json"] }],
    properties: ["openFile"], // Allow opening files only
  });

  if (result.canceled) {
    return null; // User canceled the dialog
  }

  const filePath = result.filePaths[0];
  try {
    // Read the JSON file
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data); // Parse the JSON and return it to the renderer
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return null; // Return null in case of an error
  }
});

ipcMain.on("window:minimize", () => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  if (focusedWindow) focusedWindow.minimize();
});

ipcMain.on("window:restore", () => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  if (focusedWindow.isMaximized()) {
    focusedWindow.unmaximize();
  } else {
    focusedWindow.maximize();
  }
});

ipcMain.on("window:close", () => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  if (focusedWindow) focusedWindow.close();
});
