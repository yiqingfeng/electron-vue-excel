<template>
  <el-dialog
    custom-class="m-c-dialog m-c-field-totoal-settings"
    :title="title"
    :visible="visible"
    width="600px"
    :before-close="handleClose"
  >
    <div class="c-form">
      <div class="c-form_item total-group">
        <label
          class="c-form_item-label c-form_item-label--required total-field_label"
          >分组字段</label
        >
        <el-select
          class="c-form_item-content"
          v-model="inputValue.groupField"
          clearable
          filterable
          size="small"
          placeholder="请选择"
        >
          <el-option
            v-for="item in fields"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="c-form_item total-field">
        <label
          class="c-form_item-label c-form_item-label--required total-field_label"
          >待合计字段</label
        >
        <el-select
          class="c-form_item-content"
          v-model="inputValue.totalField"
          clearable
          filterable
          size="small"
          placeholder="请选择"
        >
          <el-option
            v-for="item in fields"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleReset">清 空</el-button>
      <el-button type="primary" size="small" @click="handleConfirm"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    title: String,
    fields: Array,
    isShow: Boolean,
    value: Object,
  },
  data() {
    return {
      inputValue: {
        groupField: "",
        totalField: "",
      },
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
  watch: {
    value(val) {
      const data = val || {};
      if (_.isEqual(data, this.inputValue)) return;

      this.inputValue.groupField = data.groupField || '';
      this.inputValue.totalField = data.totalField || '';
    },
  },
  methods: {
    // 切换显示
    switchDialogVisible(status) {
      this.$emit("update:is-show", !!status);
    },
    // 数据验证
    validator() {
      const inputValue = this.inputValue;
      if (!inputValue.groupField) {
        this.$message.error("分组字段不能为空");
        return false;
      }
      if (!inputValue.totalField) {
        this.$message.error("待合计字段不能为空");
        return false;
      }
      return true;
    },
    // 筛选确认
    handleConfirm() {
      if (!this.validator()) return;

      this.switchDialogVisible(false);
      this.$emit("confirm", _.clone(this.inputValue));
    },
    // 清空
    handleReset() {
      this.switchDialogVisible(false);
      this.$emit("confirm", {});
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
