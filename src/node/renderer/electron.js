/**
 * @description 渲染进程 electron 相关 Api
 *
 * 备注：鉴于 webpack 打包区分，渲染进程使用 node 模块，需使用 window.require 而不是 require
 */
// import {
//   ipcRenderer,
// } from 'electron';
const { ipcRenderer } = window.require('electron')

/**
 * @description 发消息给主进程
 */
export function sendMessageToMain(channel, data) {
    return ipcRenderer.send(channel, data);
}

/**
 * @description 监听主进程消息注册
 */
export function registerChannels(data = {}) {
    Object.keys(data).forEach(name => {
        const item = data[name]
        ipcRenderer[item.isOnce ? 'once' : 'on'](name, item.listener)
    })
}

/**
 * @description 移除主进程消息监听
 */
export function removeChannels(channel, listener) {
    if (!listener) {
        ipcRenderer.removeAllListeners(channel)
        return
    }
    ipcRenderer.removeListener(channel, listener)
}
