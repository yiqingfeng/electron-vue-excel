/**
 * @description 通用函数支持
 */

/**
 * @description 函数组合处理
 * @param {Function (data) => {}} data 上一个任务返回的结果
 * @returns {Function (data) => {}} data 上下文环境
 */
// function compose(...fns) {
//     return function() {
//         let data;
//         function next(i) {
//             let fn = fns[i]
//             if (!fn) return data
//             return fn() => next(i + 1))
//         }

//         next(0)
//     }
// }

/**
 * @description 异步函数组合处理
 * @param {Function (ctx, next) => {}} ctx 上下文环境 next 执行下一个任务
 * @returns {Function (ctx) => {}} ctx 上下文环境
 */
function composeAsync(...fns) {
    return function(ctx) {
        function next(i) {
            let fn = fns[i]
            if (!fn) return Promise.resolve()
            return Promise.resolve(fn(ctx, () => next(i + 1)))
        }

        next(0)
    }
}

export default {
    compose,
    composeAsync
}
