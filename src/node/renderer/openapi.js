/**
 * @description 提供给渲染进程用的 openApi
 */
import { registerChannels, sendMessageToMain, removeChannels } from './electron'

const channelMaps = new Map()

/**
 * @description 选择EXCEL文件，成功后返回其对应的 JSON 数据
 */
function getExcelJSONData(callBack) {
    const tasks = new Set()
    const EXCEL_JSON_DATA_CHANNEL = 'render-get_excel_json_data'

    // 存在未完成的任务时，不允许继续获取
    if (!_.isEmpty(tasks)) return

    if (!channelMaps.has(EXCEL_JSON_DATA_CHANNEL)) {
        const listener = function(event, data) {
            const excelSheets = Object.keys(data)
                .map((key) => {
                    return {
                        name: key,
                        data: data[key].data,
                        keys: data[key].keys
                    }
                })
                .filter((i) => i.data.length)

            // 执行任务队列
            for(let task of tasks) {
                task(excelSheets);
            }
            tasks.clear()
        }
        channelMaps.set(EXCEL_JSON_DATA_CHANNEL, listener)
        registerChannels({
            [EXCEL_JSON_DATA_CHANNEL]: { listener }
        })
    }

    // 将成功回调放置到任务队列中
    if (callBack) {
        tasks.add(callBack)
    }
    sendMessageToMain('main-get_excel_json_data')
}

/**
 * 指定格式数据保存为 excel 文件
 * @param {*} channel
 */
function exportExcelFile(data) {
    sendMessageToMain('main-export_excel_file', data)
}

/**
 * @description 清空通信监听
 */
function clearChannel(channel) {
    if (channel) {
        channelMaps.delete(channel)
    } else {
        channelMaps.clear()
    }
    removeChannels(channel)
}

export default {
    getExcelJSONData,
    exportExcelFile,
    clearChannel
}
