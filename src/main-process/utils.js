/**
 * @description 主进程通用处理
 */
import XLSX from 'xlsx';
import {
  ipcMain,
  // dialog
} from 'electron';

/**
 * @description 主进程消息注册
 * @param {object} data eg. {'test': {listener:(event) => {}, isOnce: true}}
 */
export function registerChannels(data = {}) {
  Object.keys(data)
    .forEach(name => {
      const item = data[name];
      console.log('ipcMain', name);
      ipcMain[item.isOnce ? 'once' : 'on'](name, item.listener)
    })
}

/**
 * @description 打开文件框
 */
// export function openDialog(options, browserWindow = null) {
//     if (browserWindow) {
//         return dialog.showOpenDialog(browserWindow, Object.assign({}, options));
//     }
//     return dialog.showOpenDialog(Object.assign({}, options));
// }

/**
 * @description xlsx 转换成 JSON
 */
export function xlsx2json(path) {
  const workbook = XLSX.readFile(path);

  const result = {};
  // excel 表名遍历
  workbook.SheetNames.forEach(function (sheetName) {
    var worksheet = workbook.Sheets[sheetName];
    // result[sheetName] = XLSX.utils.sheet_to_json(worksheet);
    // const refs = worksheet['!ref'].split(':');
    const data = XLSX.utils.sheet_to_json(worksheet)
    result[sheetName] = {
      data,
      // keys: Object.keys(data[0] || {}),
      keys: (XLSX.utils.sheet_to_csv(worksheet).split('\n')[0] || '').split(',').filter(i => !!i),
    };
  });

  // console.log("打印表信息", JSON.stringify(result, 2, 2)); //显示格式{"表1":[],"表2":[]}
  return result;
}
