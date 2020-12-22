import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sheetLists: [],
    curtSheet: '',
  },
  getters: {
    hasSheetData(state) {
      return state.sheetLists.length < 1;
    },
    sheetLists(state) {
      return state.sheetLists;
    },
    curtSheet(state) {
      return state.curtSheet;
    },
    sheetNames(state) {
      return state.sheetLists.map(i => i.name);
    },
  },
  mutations: {
    setSheetLists(state, list) {
      state.sheetLists = list || [];
      state.curtSheet = list? list[0].name : '';
    },
    setCurtSheet(state, name) {
      state.curtSheet = name || '';
    },
  },
  actions: {
  },
  modules: {
  }
})
