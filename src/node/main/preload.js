/**
 * @description 主进程预处理
 */
import { registerChannels, showOpenDialog, showSaveDialog } from './electron'
import { xlsx2json, writeExcelData } from './excel'

/**
 * @description 获取选择的本地Excel对应的 json 数据
 */
function getExcelDataListener(event) {
    showOpenDialog({
        title: '选择excel文件',
        filters: [
            {
                name: 'Excel',
                extensions: ['xls', 'xlsx']
            }
        ]
    }).then((list) => {
        event.sender.send('render-get_excel_json_data', xlsx2json(list[0]))
    })
}

/**
 * @description 指定格式数据保存为 excel 文件
 */
function exportExcelDataListener(event, data) {
    showSaveDialog({
        title: '保存Excel文件',
        defaultPath: '导出文件.xlsx',
        filters: [
            {
                name: 'All Files',
                extensions: ['xls', 'xlsx']
            }
        ]
    }).then((filePath) => {
        writeExcelData(filePath, data)
    })
}

// 注册主进程通信
registerChannels({
    'main-get_excel_json_data': {
        listener: getExcelDataListener
    },
    'main-export_excel_file': {
        listener: exportExcelDataListener
    }
})
