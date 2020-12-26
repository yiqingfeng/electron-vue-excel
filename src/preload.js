/**
 * @description 渲染进程预加载
 */
import lodash from 'lodash'
global._ = lodash

import openApi from './node/renderer/openapi'
global.FE = {
    openApi
}
