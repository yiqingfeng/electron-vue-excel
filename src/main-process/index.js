/**
 * @description 数据处理
 */
import {
  dialog
} from 'electron';
import {
  registerChannels,
  xlsx2json,
  writeExcelData,
} from './utils';
/**
 * @description 创建 excel 文件选择器
 */
function createExcelDialog() {
  return new Promise((resolve, reject) => {
    dialog.showOpenDialog({
        title: '选择Excel文件',
        filters: [{
          name: 'Excel',
          extensions: ['xls', 'xlsx']
        }, ],
        // properties: ['openFile', 'openDirectory']
      })
      .then(data => {
        resolve(data.filePaths);
      }, reject);
  });
}

/**
 * @description 创建 excel 文件保存器
 */


export default function preLoad() {
  const getExcelDataListener = (event) => {
    createExcelDialog()
      .then(list => {
        event.sender.send('render-get_excel_data', xlsx2json(list[0]))
      })
  }

  const exportExcelDataListener = (event, data) => {
    dialog.showSaveDialog({
      title: '保存Excel文件',
      defaultPath: '导出文件.xlsx',
      filters: [{
        name: 'All Files',
        extensions: ['xls', 'xlsx']
      }],
    })
    .then(file => {
      writeExcelData(file.filePath, data);
    });
  }

  registerChannels({
    'main-get_excel_data': {
      listener: getExcelDataListener,
    },
    'main-export_excel_file': {
      listener: exportExcelDataListener,
    }
  });
}
