<template>
  <el-dialog
    title="文件导入"
    :visible="visible"
    width="400px"
    :before-close="closeHandle"
  >
    <el-upload
      class="upload-demo"
      ref="upload"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      :multiple="false"
      :limit="1"
      :auto-upload="false"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      :file-list="fileList"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击导入</em></div>
      <div class="el-upload__tip" slot="tip">
        只能导入xls/xlsx文件，且不超过5Mb
      </div>
    </el-upload>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeHandle">取 消</el-button>
      <el-button type="primary" @click="importHandle">导 入</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "m-dialog-import",
  props: {},
  data() {
    return {
      visible: true,
      fileList: [],
    };
  },
  methods: {
    closeHandle() {
      this.visible = false;
      this.$emit("close");
    },
    importHandle() {
      this.$refs.upload.submit();
      this.visible = false;
      this.$emit('import');
    },
    beforeUpload(file) {
      console.log(file);
      return false;
    }
  },
};
</script>
