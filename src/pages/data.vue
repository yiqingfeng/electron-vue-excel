<template>
  <div class="d-g-page p-data">
    <header class="data-head">
      <h3 class="data-head_title">Excel 处理小工具</h3>
      <div class="data-head_buttons">
        <el-button
          v-if="hasSheetData"
          type="primary"
          size="medium"
          @click="importFiel"
          >导入</el-button>
      </div>
    </header>
    <el-tabs class="data-tabs" v-model="activeName">
      <el-tab-pane v-for="name in sheetNames" :key="name" :label="name" :name="name"></el-tab-pane>
    </el-tabs>
    <main class="data-main">
      <d-list> </d-list>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import DList from "../components/list/list.vue";
// import { sendMessageToMain, registerChannels } from "../data/index";

export default {
  components: {
    DList,
  },
  computed: {
    ...mapGetters([
      "hasSheetData",
      "sheetNames",
      "curtSheet"
    ]),
    activeName: {
      set(val) {
        this.setCurtSheet(val);
      },
      get() {
        return this.curtSheet;
      },
    }
  },
  data() {
    return {
    };
  },
  // mounted() {
  //   registerChannels({
  //     "render-get_excel_data": {
  //       listener: (event, data) => {
  //         const excelSheets = Object.keys(data)
  //           .map((key) => {
  //             return {
  //               name: key,
  //               data: data[key].data,
  //               keys: data[key].keys,
  //             };
  //           })
  //           .filter((i) => i.data.length);
  //         this.setSheetLists(excelSheets);
  //       },
  //     },
  //   });
  // },
  methods: {
    ...mapMutations([
      "setSheetLists",
      "setCurtSheet"
    ]),
    importFiel() {
      // sendMessageToMain("main-get_excel_data");
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

  .data-tabs {
    padding: 16px;
  }

  .data-main {
    flex: 1;
    overflow-y: hidden;
    padding: 0 16px;
  }
}
</style>
