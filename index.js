// This file is used to create an
// Electron window for the game. This
// isnt used in the browser version

const { app, BrowserWindow, Menu } = require('electron')

let win;

function createWindow() {
  
  // Size and icon the app uses
  win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: 'app/assets/images/icon-192x192.png'
  })

  // Load the frondend files
  win.loadFile('app/index.html');

  // Hide UGLY menubar
  win.setMenuBarVisibility(false);
  win.setAutoHideMenuBar(true);

  // Icon (again)
  win.setIcon('app/assets/images/icon-192x192.png');
}

// Template for the custom menu
// Contains Chrome DevTools, Fullscreen Mode, toggle for debug mode and reload
const template = [
  {
     label: 'Developer',
     submenu: [
       {
          label: "Developer Tools",
          role: 'toggledevtools'
      },
       {
          label: "Debug Mode",
          click() { 
            win.webContents.executeJavaScript("debugMode()");
        } 
       },
       {
          label: "Fullscreen Mode",
          role: 'togglefullscreen'
       },
       {type:'separator'},
       {
        label: "Reload game",
        role: 'reload'
       },
       {
        label:'Exit', 
        click() { 
            app.quit() 
        } 
       }
     ]
  }
]

// Use the custom menu (use second option to disable menu)
const menu = Menu.buildFromTemplate(template)
// const menu = new Menu(); 

Menu.setApplicationMenu(menu)

app.whenReady().then(createWindow)

// Close the process if all windows
// are closed, exept on MacOS. 
// (i dunno why, i just copied from Getting Started Guide)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})