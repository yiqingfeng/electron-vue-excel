<template>
  <div class="m-list">
    <div class="list-filters">
      <el-button size="medium">筛选</el-button>
      <el-button size="medium">列设置</el-button>
      <el-button size="medium">合计设置</el-button>
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
      layout="prev, pager, next"
      :total="1000"
    >
    </el-pagination>
  </div>
</template>

<script>
// 列表页组件
import { mapGetters } from 'vuex';

export default {
  name: "d-list",
  props: {
    dataKey: String,
  },
  computed: {
    ...mapGetters([
      'sheetLists'
    ]),
    sheetData() {
      const sheetLists = this.sheetLists;
      console.log(sheetLists[0]);
      return sheetLists[0] || {};
    },
    columns() {
      const keys = this.sheetData.keys || [];
      return keys.map(i => {
        return {
          label: i,
          data: i,
        };
      });
    },
    tableData() {
      return this.sheetData.data || [];
    },
  },
  data() {
    return {
      // tableData: [
      //   {
      //     date: "2016-05-02",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1518 弄",
      //   },
      //   {
      //     date: "2016-05-04",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1517 弄",
      //   },
      //   {
      //     date: "2016-05-01",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1519 弄",
      //   },
      //   {
      //     date: "2016-05-03",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1516 弄",
      //   },
      // ],
    };
  },
  methods: {},
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
