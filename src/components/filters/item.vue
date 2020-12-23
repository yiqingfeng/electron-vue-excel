<template>
  <div class="m-c-filter_item">
    <div class="item-field">
      <el-select
        v-model="fieldName"
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
    <div class="item-operator">
      <el-select
        v-model="operator"
        clearable
        filterable
        size="small"
        placeholder="请选择"
        :disabled="!fieldName"
      >
        <el-option
          v-for="item in operatorOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="item-value">
      <el-input
        type="text"
        size="small"
        placeholder="请输入内容"
        clearable
        :disabled="operator | judgeFieldValuesDisabled"
        v-model="fieldValues"
      ></el-input>
    </div>
  </div>
</template>

<script>
import { getFieldOperatorData } from "../../common/utils";

export default {
  props: {
    fields: {
      type: Array,
      default() {
        return [];
      },
    },
    value: Object,
  },
  data() {
    return {
      operatorOptions: getFieldOperatorData(),
      fieldName: '',
      operator: '',
      fieldValues: '',
      inputValue: {},
    };
  },
  filters: {
    // 判断字段值是否能设置
    judgeFieldValuesDisabled(data) {
      if (!data) return true;
      if (['IS', 'NIS'].includes(data)) return true;
      return false;
    },
  },
  watch: {
    value(val) {
      const data = val || {};
      if (_.isEqual(this.inputValue, data)) return;

      this.fieldName = data.field_name || '';
      this.operator = data.operator || '';
      this.fieldValues = data.field_values || '';
    },
    fieldName(val) {
      if (_.isEqual(this.inputValue.field_name, val || '')) return;

      this.inputValue.field_name = val || '';
      this.handleInput();
    },
    operator(val) {
      this.fieldValues = '';

      if (_.isEqual(this.inputValue.operator, val || '')) return;

      this.inputValue.operator = val || '';
      this.handleInput();
    },
    fieldValues(val) {
      if (_.isEqual(this.inputValue.field_values, val || '')) return;

      this.inputValue.field_values = val || '';
      this.handleInput();
    },
  },
  methods: {
    handleInput: _.debounce(function () {
      this.$emit('change', Object.assign({}, this.inputValue));
    }, 0),
  },
};
</script>

<style lang="less">
.m-c-filter_item {
  display: flex;

  .item-field,
  .item-operator {
    width: 120px;
    flex: 0 0 120px;
    margin-right: 8px;
  }

  .item-value {
    flex: 1;
  }
}
</style>
