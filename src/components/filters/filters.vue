<template>
  <el-dialog
    custom-class="m-c-dialog m-c-field-filters"
    :title="title"
    :visible="visible"
    width="600px"
    :before-close="handleClose"
  >
    <div class="field-filters">
      <div class="field-filter" v-for="(item, index) in list" :key="index">
        <filter-item
          :fields="fields"
          :value="item"
          @change="list[index] = $event"
        ></filter-item>
        <div class="field-filter--delete">
          <span class="el-icon-close" @click="handleDelete(index)"></span>
        </div>
      </div>
      <div class="field-filter--add">
        <span class="el-icon-circle-plus" @click="handleAdd"></span>
      </div>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary" size="small" @click="handleConfirm"
        >筛 选</el-button
      >
      <el-button size="small" @click="handleReset">清除筛选值</el-button>
    </span>
  </el-dialog>
</template>

<script>
import FilterItem from "./item.vue";

export default {
  components: {
    FilterItem,
  },
  props: {
    title: String,
    fields: Array,
    isShow: Boolean,
    filterList: Array,
  },
  data() {
    return {
      list: null,
    };
  },
  computed: {
    visible: {
      get() {
        return !!this.isShow;
      },
      set(val) {
        this.switchDialogVisible(val);
      },
    },
  },
  mounted() {
    let list = this.filterList || [{}];
    if (_.isEmpty(list)) {
      list = [{}];
    }
    this.list = list;
  },
  methods: {
    // 切换显示
    switchDialogVisible(status) {
      this.$emit("update:is-show", !!status);
    },
    // 移除筛选项
    handleDelete(index) {
      this.list.splice(index, 1);
    },
    // 添加筛选项
    handleAdd() {
      this.list.push({});
    },
    // 重置筛选项
    handleReset() {
      this.list = [{}];
    },
    // 数据验证
    validator() {
      if (
        this.list.find((i) => {
          if (
            _.isEmpty(i) || !i.field_name ||
            (
              i.operator &&
              (["IS", "NIS"].includes(i.operator) || i.field_values)
            )
          ) {
            return false;
          }
          return true;
        })
      ) {
        this.$message.error("筛选条件不完整");
        return false;
      }
      return true;
    },
    // 筛选确认
    handleConfirm() {
      if (!this.validator()) return;

      this.switchDialogVisible(false);
      this.$emit(
        "confirm",
        this.list.filter((i) => i.field_name)
      );
    },
    // 关闭
    handleClose() {
      this.switchDialogVisible(false);
    },
  },
};
</script>

<style lang="less">
.m-c-field-filters {
  .field-filters {
    max-height: 200px;
    overflow-y: auto;
  }
  .field-filter {
    position: relative;
    padding-right: 28px;
    margin-bottom: 10px;

    &--delete {
      position: absolute;
      top: 50%;
      right: 0;
      font-size: 20px;
      transform: translateY(-50%);
      cursor: pointer;
    }

    &--add {
      font-size: 20px;
      .el-icon-circle-plus {
        cursor: pointer;
      }
    }
  }
}
</style>
