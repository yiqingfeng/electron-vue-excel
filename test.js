const XLSX = require('xlsx');

/**
 * @description xlsx 转换成 JSON
 */
function xlsx2json(path) {
  const workbook = XLSX.readFile(path);

  const result = {};
  // excel 表名遍历
  workbook.SheetNames.forEach(function (sheetName) {
    var worksheet = workbook.Sheets[sheetName];

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

console.log(xlsx2json('测试数据.xlsx'));

/**
 * @description 
 */
// function writeExcel(path)
