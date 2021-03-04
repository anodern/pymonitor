import { app, BrowserWindow, ipcMain} from 'electron';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreen: false,
    webPreferences: {
      nodeIntegration : true
    }
  });

  // 加载index.html
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  // 调试工具
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  ipcMain.on('getData', (e, ...data) => {
    console.log(data);

    // e.sender => 通过这对象再返回消息给渲染进程
    e.sender.send('sendData', 1000);
  });
  mainWindow.webContents.send('hello', 'hello Yang');
};

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


// pidusage(process.pid, function (err, stats) {
//   console.log(stats)
//   // => {
//   //   cpu: 10.0,            // percentage (from 0 to 100*vcore)
//   //   memory: 357306368,    // bytes
//   //   ppid: 312,            // PPID
//   //   pid: 727,             // PID
//   //   ctime: 867000,        // ms user + system time
//   //   elapsed: 6650000,     // ms since the start of the process
//   //   timestamp: 864000000  // ms since epoch
//   // }
//   cb()
// })
var username = 'cnmmm';

var pidusage = require('pidusage')

pidusage(6260, function (err, stats) {
  LogPID(stats)
})

function LogPID(stats) {
  console.log(stats);
  console.log('aaaaaaaaaaa');
  console.log(stats.memory / 1024);

}


// It supports also multiple pids
// pidusage([727, 1234], function (err, stats) {
//   console.log(stats)
//   // => {
//   //   727: {
//   //     cpu: 10.0,            // percentage (from 0 to 100*vcore)
//   //     memory: 357306368,    // bytes
//   //     ppid: 312,            // PPID
//   //     pid: 727,             // PID
//   //     ctime: 867000,        // ms user + system time
//   //     elapsed: 6650000,     // ms since the start of the process
//   //     timestamp: 864000000  // ms since epoch
//   //   },
//   //   1234: {
//   //     cpu: 0.1,             // percentage (from 0 to 100*vcore)
//   //     memory: 3846144,      // bytes
//   //     ppid: 727,            // PPID
//   //     pid: 1234,            // PID
//   //     ctime: 0,             // ms user + system time
//   //     elapsed: 20000,       // ms since the start of the process
//   //     timestamp: 864000000  // ms since epoch
//   //   }
//   // }
// })

// If no callback is given it returns a promise instead
// const stats = await pidusage(process.pid)
// console.log(stats)
// => {
//   cpu: 10.0,            // percentage (from 0 to 100*vcore)
//   memory: 357306368,    // bytes
//   ppid: 312,            // PPID
//   pid: 727,             // PID
//   ctime: 867000,        // ms user + system time
//   elapsed: 6650000,     // ms since the start of the process
//   timestamp: 864000000  // ms since epoch
// }

// Avoid using setInterval as they could overlap with asynchronous processing
// function compute(cb) {
//   pidusage(process.pid, function (err, stats) {
//     console.log(stats)
//     // => {
//     //   cpu: 10.0,            // percentage (from 0 to 100*vcore)
//     //   memory: 357306368,    // bytes
//     //   ppid: 312,            // PPID
//     //   pid: 727,             // PID
//     //   ctime: 867000,        // ms user + system time
//     //   elapsed: 6650000,     // ms since the start of the process
//     //   timestamp: 864000000  // ms since epoch
//     // }
//     cb()
//   })
// }

// function interval(time) {
//   setTimeout(function () {
//     compute(function () {
//       interval(time)
//     })
//   }, time)
// }

// Compute statistics every second:
//interval(1000)

// Above example using async/await
// const compute = async () => {
//   const stats = await pidusage(process.pid)
//   // do something
// }

// Compute statistics every second:
// const interval = async (time) => {
//   setTimeout(async () => {
//     await compute()
//     interval(time)
//   }, time)
// }
// interval(1000)