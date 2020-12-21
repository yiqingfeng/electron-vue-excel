import Vue from 'vue';
import ImportDialog from './import.vue';

const ImportDialogCtrl = Vue.extend(ImportDialog);

export default function createImportDialog(options = {}) {
  const dialog = new ImportDialogCtrl({
    el: document.createElement('div'),
    propsData: Object.assign({}, options),
  });
  dialog.$on('close', () => {
    dialog.$destroy();
    console.log(dialog.$el);
  });
  document.body.appendChild(dialog.$el);
  return dialog;
}
