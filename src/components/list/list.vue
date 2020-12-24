<template>
  <div class="m-list">
    <div class="list-filters">
      <el-button size="small" @click="showFilters = true"
        >筛选<i
          v-show="filterList.length > 0"
          class="el-icon-finished el-icon--right"
        ></i
      ></el-button>
      <el-button size="small" @click="setColumns">列设置</el-button>
      <el-button size="small" @click="showTotalSettings = true"
        >合计设置<i
          v-show="isNotEmptyTotalSettings"
          class="el-icon-finished el-icon--right"
        ></i
      ></el-button>
      <el-button size="small" type="primary" @click="exportExcel"
        >数据导出</el-button
      >
      <filters
        title="设置筛选条件"
        :is-show.sync="showFilters"
        :filter-list="filterList"
        :fields="fieldOptions"
        @confirm="changeFilterList"
      ></filters>
      <total-settings
        title="设置合计信息"
        :is-show.sync="showTotalSettings"
        :fields="fieldOptions"
        :value="totalSettings"
        @confirm="changeTotalSettings"
      ></total-settings>
    </div>
    <div class="list-body">
      <div class="list-table_wrap">
        <el-table
          class="c-table list-table"
          border
          stripe
          :data="tableData"
          height="100%"
          style="width: 100%"
        >
          <el-table-column
            v-for="column in columns"
            :key="column.data"
            :prop="column.data"
            :label="column.label"
            min-width="100"
          ></el-table-column>
        </el-table>
      </div>
    </div>
    <el-pagination
      class="list-foot"
      background
      @size-change="pageSizeChange"
      @current-change="curtPageChange"
      :current-page="curtPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="dataList.length"
    >
    </el-pagination>
  </div>
</template>

<script>
// 列表页组件
import { mapGetters } from "vuex";
import Filters from "../filters/filters.vue";
import TotalSettings from "./total-setting.vue";
import showTransferDialog from "../transfer/index";
import { isMatchForOperatorData, dataSum } from "../../common/utils";
import { sendMessageToMain } from "../../data/index";

export default {
  name: "d-list",
  components: {
    Filters,
    TotalSettings,
  },
  data() {
    return {
      showFilters: false,
      filterList: [],
      curtKeys: [],
      showTotalSettings: false,
      totalSettings: {},
      dataList: [],
      curtPage: 1,
      pageSize: 20,
    };
  },
  computed: {
    ...mapGetters(["curtSheetData", "curtSheet"]),
    keys() {
      return this.curtSheetData.keys || [];
      // return ["字段a", "字段b", "字段c"];
    },
    isNotEmptyTotalSettings() {
      const data = this.totalSettings;
      if (data && data.groupField && data.totalField) return true;
      return false;
    },
    fieldOptions() {
      let options = this.keys.map((i) => {
        return {
          label: i,
          value: i,
        };
      });
      return options;
    },
    columns() {
      let keys = this.curtKeys || [];
      if (_.isEmpty(keys)) {
        keys = this.keys;
      }
      let columns = keys.map((i) => {
        return {
          label: i,
          data: i,
        };
      });
      if (this.isNotEmptyTotalSettings) {
        columns.push({
          label: "合计",
          data: "合计",
        });
      }
      return columns;
    },
    tableData() {
      const start = (this.curtPage - 1) * this.pageSize;
      return this.dataList.slice(start, start + this.pageSize);
    },
  },
  watch: {
    curtSheetData(val) {
      this.curtKeys = _.clone(val.keys || []);
      this.getDataList();
    },
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    // 设置数据筛选条件
    setFilters() {},
    // 设置需要展示的列
    setColumns() {
      showTransferDialog(
        {
          items: this.keys.map((i) => {
            return {
              label: i,
              key: i,
              // disabled: false,
            };
          }),
          value: this.curtKeys,
        },
        (keys) => {
          this.curtKeys = keys;
        }
      );
    },
    // 设置需要进行合计的列
    setTotal() {},
    //
    getFilterFn() {
      const filterList = this.filterList || [];
      return function (item) {
        let flag = true;
        for (let filter of filterList) {
          if (
            !isMatchForOperatorData(
              filter.operator,
              item[filter.field_name],
              filter.field_values
            )
          ) {
            flag = false;
            break;
          }
        }
        return flag;
      };
    },
    /**
     * @description 表格相关数据计算
     */
    caclDataList() {
      let list = (this.curtSheetData.data || []).filter(this.getFilterFn());
      if (this.isNotEmptyTotalSettings) {
        const groupField = this.totalSettings.groupField;
        const totalField = this.totalSettings.totalField;
        // 按照指定字段分组
        let groupMap = {};
        list.forEach((item) => {
          if (!groupMap[item[groupField]]) {
            groupMap[item[groupField]] = {
              data: item,
              total: [],
            };
          }
          groupMap[item[groupField]].total.push(item[totalField]);
        });
        list = Object.keys(groupMap).map((key) => {
          return Object.assign({}, groupMap[key].data, {
            合计: dataSum(groupMap[key].total),
          });
        });
      }
      return list;
    },
    /**
     * @description 获取 dataList
     */
    getDataList: _.debounce(function () {
      this.dataList = this.caclDataList();
    }, 10),
    // 筛选条件变更
    changeFilterList(data) {
      this.filterList = data;
      this.getDataList();
    },
    // 合计设置变更
    changeTotalSettings(data) {
      this.totalSettings = data;
      this.getDataList();
    },
    // 导出 excel 文件
    exportExcel() {
      sendMessageToMain("main-export_excel_file", {
        [this.curtSheet]: {
          keys: this.columns.map((i) => i.data),
          data: this.dataList,
        },
      });
    },
    // 切页展示数
    pageSizeChange(val) {
      this.curtPage = 1;
      this.pageSize = val;
    },
    // 切页数
    curtPageChange(val) {
      this.curtPage = val;
    },
  },
};
</script>

<style lang="less">
.m-list {
  display: flex;
  flex-direction: column;
  height: 100%;

  .list-filters {
    margin-bottom: 10px;
  }
  .tip-number {
    display: inline-block;
    padding: 0 5px;
    margin-left: 4px;
    background-color: #409eff;
    color: #fff;
    border-radius: 2px;
  }

  .list-body {
    flex: 1;
    position: relative;
  }
  .list-foot {
    padding: 10px;
  }

  .list-table {
    &_wrap {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
