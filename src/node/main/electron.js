/**
 * @description 数据处理
 */
import { ipcMain, dialog } from 'electron'

/**
 * @description 主进程消息注册
 * @param {object} data eg. {'test': {listener:(event) => {}, isOnce: true}}
 */
export function registerChannels(data = {}) {
    Object.keys(data).forEach((name) => {
        const item = data[name]
        ipcMain[item.isOnce ? 'once' : 'on'](name, item.listener)
    })
}

/**
 * @description 打开本地文件弹窗
 */
export function showOpenDialog(options) {
    return new Promise((resolve, reject) => {
        dialog
            .showOpenDialog(
                Object.assign(
                    {
                        title: '选择文件'
                        // filters: [],
                    },
                    options
                )
            )
            .then((data) => {
                resolve(data.filePaths)
            }, reject)
    })
}

/**
 * @description 打开本地文件保存弹窗
 */
export function showSaveDialog(options) {
    return new Promise((resolve, reject) => {
        dialog
            .showSaveDialog(
                Object.assign(
                    {
                        title: '保存到本地'
                        // defaultPath: '',
                        // filters: [],
                    },
                    options
                )
            )
            .then((data) => {
                resolve(data.filePath)
            }, reject)
    })
}
