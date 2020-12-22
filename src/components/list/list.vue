<template>
  <div class="m-list">
    <div class="list-filters">
      <el-button size="medium" @click="setFilters">筛选</el-button>
      <el-button size="medium" @click="setColumns">列设置</el-button>
      <el-button size="medium" @click="setTotal">合计设置</el-button>
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
      :total="dataList.length">
    </el-pagination>
  </div>
</template>

<script>
// 列表页组件
import { mapGetters } from 'vuex';
import showTransferDialog from '../transfer/index';

export default {
  name: "d-list",
  computed: {
    ...mapGetters([
      'curtSheetData',
    ]),
    keys() {
      return this.curtSheetData.keys || [];
    },
    columns() {
      let keys = this.curtKeys || [];
      if (_.isEmpty(keys)) {
        keys = this.keys;
      }
      return keys.map(i => {
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
    filters() {
      this.getDataList();
    },
  },
  data() {
    return {
      filters: {},
      curtKeys: [],
      dataList: [],
      curtPage: 1,
      pageSize: 20,
    };
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    // 设置数据筛选条件
    setFilters() {

    },
    // 设置需要展示的列
    setColumns() {
      showTransferDialog({
        items: this.keys.map(i => {
          return {
            label: i,
            key: i,
            // disabled: false,
          };
        }),
        value: this.curtKeys,
      }, keys => {
        this.curtKeys = keys;
      })
    },
    // 设置需要进行合计的列
    setTotal() {

    },
    /**
     * @description 表格相关数据计算
     */
    caclDataList() {
      const list = this.curtSheetData.data || [];
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
