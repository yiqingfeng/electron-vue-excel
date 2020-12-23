<template>
  <el-dialog
    custom-class="m-c-dialog m-c-field-totoal-settings"
    :title="title"
    :visible="visible"
    width="600px"
    :before-close="handleClose"
  >
    <div class="total-group">
      <label class="total-field_label">分组字段</label>
      <el-select
        v-model="groupField"
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
    <div class="total-field">
      <label class="total-field_label">待合计字段</label>
      <el-select
        v-model="totalField"
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
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleClose">取消</el-button>
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
      groupField: '',
      totalField: '',
      inputValue: {},
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
      if(_.isEqual(data, this.inputValue)) return;
      this.groupField = data.groupField || '';
      this.totalField = data.totalField || '';
    },
    groupField(val) {
      this.inputValue.groupField = val;
    },
    totalField(val) {
      this.inputValue.totalField = val;
    },
  },
  mounted() {
  },
  methods: {
    // 切换显示
    switchDialogVisible(status) {
      this.$emit("update:is-show", !!status);
    },
    // 数据验证
    validator() {
      
    },
    // 筛选确认
    handleConfirm() {
      if (!this.validator()) return;

      this.switchDialogVisible(false);
      this.$emit(
        "confirm",
        this.inputValue
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
