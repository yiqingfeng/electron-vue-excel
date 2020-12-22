import Vue from 'vue';
import Dialog from './transfer.vue';

const DialogCtrl = Vue.extend(Dialog);

export default function createDialog(options, callback) {
  let dialog = new DialogCtrl({
    el: document.createElement('div'),
    propsData: Object.assign({}, options),
  });
  dialog.$on('confirm', () => {
    callback && callback(dialog.transferValue);
  });
  dialog.$on('hide', () => {
    dialog.$destroy();
    dialog.$el.parentElement.removeChild(dialog.$el);
    dialog = null;
  });
  document.body.appendChild(dialog.$el);
}
