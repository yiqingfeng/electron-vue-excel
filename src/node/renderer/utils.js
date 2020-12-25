/**
 * @description 通用函数支持
 */

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
    composeAsync
}
