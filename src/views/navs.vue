<template>
    <div class="g-p-navs nav-sections">
        <div class="section-list">
            <router-link to="/excel/list"
                ><i class="section-icon el-icon-document-copy" title="Excel"></i
            ></router-link>
            <router-link to="/test"
                ><i class="section-icon el-icon-s-help" title="测试"></i
            ></router-link>
        </div>
        <div class="section-settings">
            <i class="section-icon el-icon-setting" title="管理"></i>
        </div>
    </div>
</template>

<style lang="less">
.g-p-navs {
    position: relative;
    width: 50px;
    height: 100%;
    background-color: #303133;

    .section-icon {
        padding: 10px;
        font-size: 30px;
        color: #909399;
        cursor: pointer;

        &:hover {
            color: #fff;
        }
    }

    .section-settings {
        position: absolute;
        left: 0;
        bottom: 0;
        // width: 100%;
    }
}
</style>
