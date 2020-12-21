/**
 * @description 渲染进程 本地数据相关处理
 */
// import {
//   ipcRenderer,
// } from 'electron';
const { ipcRenderer } = window.require('electron');

// https://aotu.io/notes/2016/04/07/node-excel/index.html

// function startUp() {
//   const el = this.document.querySelector('#test-content');
//   document.querySelector('#test')
//     .onclick = () => {
//       console.log(ipcRenderer.send('main-get_excel_data'))
//     }
//   ipcRenderer.on('render-get_excel_data', (event, data) => {
//     el.innerHTML = `You selected: ${data}`
//   })
// }


/**
 * @description 发消息给主进程
 */
export function sendMessageToMain(channel, data) {
  ipcRenderer.send(channel, data);
}

/**
 * @description 监听主进程消息注册
 */
export function registerChannels(data = {}) {
  Object.keys(data)
    .forEach(name => {
      const item = data[name];
      console.log('ipcRenderer', name);
      ipcRenderer[item.isOnce ? 'once' : 'on'](name, item.listener)
    })
}

/**
 * @description 移除主进程消息监听
 */
export function removeChannels(channel, listener) {
  if (!listener) {
    ipcRenderer.removeAllListeners(channel);
    return;
  }
  ipcRenderer.removeListener(channel, listener);
}
