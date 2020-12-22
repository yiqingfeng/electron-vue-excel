<template>
  <el-dialog
    class="m-dialog-transfer"
    title="文件导入"
    :visible="visible"
    width="560px"
    :before-close="closeHandle"
  >
    <el-transfer
      v-model="transferValue"
      :data="items"
      filterable
      target-order="push"
    ></el-transfer>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeHandle">取 消</el-button>
      <el-button type="primary" @click="confirmHandle">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "m-dialog-key_setting",
  props: {
    title: {
      type: String,
      default: "设置",
    },
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    value: Array,
  },
  computed: {
    // transferValue: {
    //   set(val) {
    //     this.$emit('update:value', val);
    //   },
    //   get() {
    //     return this.value || [];
    //   },
    // },
  },
  mounted() {
    console.log(this.items);
  },
  data() {
    return {
      visible: true,
      transferValue: [],
    };
  },
  methods: {
    closeHandle() {
      this.$emit("close");
      this.hide();
    },
    confirmHandle() {
      this.$emit("confirm");
      this.hide();
    },
    hide() {
      this.visible = false;
    },
  },
};
</script>

<style lang="less">
  .m-dialog-transfer {
    .el-transfer__buttons {
      .el-button {
        padding: 4px;
        border-radius: 50%;
      }
    }
  }
</style>
