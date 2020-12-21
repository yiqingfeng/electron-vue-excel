/**
 * @description 数据处理
 */
import {
  dialog
} from 'electron';
import {
  registerChannels,
  xlsx2json,
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

export default function preLoad() {
  const getExcelDataListener = (event) => {
    createExcelDialog()
      .then(list => {
        event.sender.send('render-get_excel_data', xlsx2json(list[0]))
      })
  }

  registerChannels({
    'main-get_excel_data': {
      listener: getExcelDataListener,
    },
  });
}
