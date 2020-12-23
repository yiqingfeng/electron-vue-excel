<template>
  <div class="m-list">
    <div class="list-filters">
      <el-button size="small" @click="showFilters = true"
        >筛选
        <span v-show="filterList.length > 0" class="tip-number">{{
          filterList.length
        }}</span></el-button
      >
      <el-button size="small" @click="setColumns">列设置</el-button>
      <el-button size="small" @click="setTotal">合计设置</el-button>
      <filters
        title="设置筛选条件"
        :is-show.sync="showFilters"
        :filter-list="filterList"
        :fields="filterFields"
        @confirm="filterList = $event"
      ></filters>
    </div>
    <div class="list-body">
      <div class="list-table_wrap">
        <el-table
          class="list-table"
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
import Filters from "../filters/filters";
import showTransferDialog from "../transfer/index";
import { 
  isMatchForOperatorData
} from '../../common/utils';

export default {
  name: "d-list",
  components: {
    Filters,
  },
  data() {
    return {
      showFilters: false,
      filterList: [],
      curtKeys: [],
      dataList: [],
      curtPage: 1,
      pageSize: 20,
    };
  },
  computed: {
    ...mapGetters(["curtSheetData"]),
    keys() {
      return this.curtSheetData.keys || [];
    },
    filterFields() {
      return this.keys.map(i => {
        return {
          label: i,
          value: i,
        };
      });
    },
    columns() {
      let keys = this.curtKeys || [];
      if (_.isEmpty(keys)) {
        keys = this.keys;
      }
      return keys.map((i) => {
        return {
          label: i,
          data: i,
        };
      });
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
    filterList() {
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
        for(let filter of filterList) {
          if (!isMatchForOperatorData(filter.operator, item[filter.field_name], filter.field_values)) {
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
      const list = (this.curtSheetData.data || []).filter(this.getFilterFn());
      return list;
    },
    /**
     * @description 获取 dataList
     */
    getDataList: _.debounce(function () {
      this.dataList = this.caclDataList();
    }, 10),
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
