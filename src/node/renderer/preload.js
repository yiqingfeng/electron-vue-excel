/**
 * @description 渲染进程预加载
 */
import lodash from 'lodash'
global._ = lodash

import openApi from './openapi'
global.FE = {
    openApi
}
