<template>
  <div class="d-g-page p-data">
    <header class="data-head">
      <h3 class="data-head_title">Excel 处理小工具{{ test }}</h3>
      <div class="data-head_buttons">
        <el-button type="primary" size="medium" @click="importFiel"
          >导入</el-button
        >
      </div>
    </header>
    <main class="data-main">
      <d-list> </d-list>
    </main>
  </div>
</template>

<script>
import DList from "../components/list/list.vue";
// import createImportDialog from '../components/import/index.js';
import { sendMessageToMain, registerChannels } from "../data/index";

export default {
  components: {
    DList,
  },
  data() {
    return {
      test: "",
    };
  },
  mounted() {
    registerChannels({
      "render-get_excel_data": {
        listener: (event, data) => {
          console.log(data);
          // this.test = data;
        },
      },
    });
  },
  methods: {
    importFiel() {
      sendMessageToMain("main-get_excel_data");
      // createImportDialog();
    },
  },
};
</script>

<style lang="less">
html,
body,
.p-data {
  height: 100%;
}

.p-data {
  display: flex;
  flex-direction: column;

  .data-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;

    &_title {
      margin: 0;
      font-size: 24px;
    }
  }

  .data-main {
    flex: 1;
    overflow-y: hidden;
    padding: 0 16px;
  }
}
</style>
