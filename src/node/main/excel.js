/**
 * @description xlsx 相关处理
 */
import XLSX from 'xlsx'

/**
 * @description xlsx 转换成 JSON
 */
export function xlsx2json(path) {
    const workbook = XLSX.readFile(path)

    const result = {}
    // excel 表名遍历
    workbook.SheetNames.forEach(function(sheetName) {
        var worksheet = workbook.Sheets[sheetName]
        // result[sheetName] = XLSX.utils.sheet_to_json(worksheet);
        // const refs = worksheet['!ref'].split(':');
        const data = XLSX.utils.sheet_to_json(worksheet)
        result[sheetName] = {
            data,
            // keys: Object.keys(data[0] || {}),
            keys: (XLSX.utils.sheet_to_csv(worksheet).split('\n')[0] || '')
                .split(',')
                .filter(i => !!i)
        }
    })

    // console.log("打印表信息", JSON.stringify(result, 2, 2)); //显示格式{"表1":[],"表2":[]}
    return result
}

/**
 * @description data 数据导出为 excel
 */
export function writeExcelData(path, data) {
    if (!path || !data) return

    const getSheetData = data => {
        const headers = data.keys
            // 为 _headers 添加对应的单元格位置
            .map((v, i) =>
                Object.assign(
                    {},
                    { v: v, position: String.fromCharCode(65 + i) + 1 }
                )
            )
            // 转换成 worksheet 需要的结构
            .reduce(
                (prev, next) =>
                    Object.assign({}, prev, { [next.position]: { v: next.v } }),
                {}
            )
        const nData = data.data
            // 匹配 headers 的位置，生成对应的单元格数据
            .map((v, i) =>
                data.keys.map((k, j) =>
                    Object.assign(
                        {},
                        {
                            v: v[k],
                            position: String.fromCharCode(65 + j) + (i + 2)
                        }
                    )
                )
            )
            // 对刚才的结果进行降维处理（二维数组变成一维数组）
            .reduce((prev, next) => prev.concat(next))
            // 转换成 worksheet 需要的结构
            .reduce(
                (prev, next) =>
                    Object.assign({}, prev, { [next.position]: { v: next.v } }),
                {}
            )
        // 合并 headers 和 nData
        const output = Object.assign({}, headers, nData)
        // 获取所有单元格的位置
        const outputPos = Object.keys(output)
        // 计算出范围
        const ref = outputPos[0] + ':' + outputPos[outputPos.length - 1]
        return Object.assign({}, output, { '!ref': ref })
    }

    const SheetNames = Object.keys(data)
    const Sheets = {}
    SheetNames.forEach(name => {
        Sheets[name] = getSheetData(data[name])
    })
    XLSX.writeFile(
        {
            SheetNames,
            Sheets
        },
        path
    )
}
