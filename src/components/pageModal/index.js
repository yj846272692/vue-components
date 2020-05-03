import Vue from 'vue'
import OriginPageModal from './index.vue'

class PageModal {
  constructor(component = {}, option = {}, callback) {
    option.on = option.on || {}
    option.on['SetTitle'] = (title) => {
      this.pageInstance.setTitle(title);
    }
    option.on['SetPageActions'] = (data) => {
      this.pageInstance.setPageActions(data)
    }
    option.on['SetPageSize'] = (data) => {
      this.pageInstance.setSize(data)
    }
    option.on['Close'] = (data) => {
      this.pageInstance.hide();
      $instanceModalArray.pop();
      $channel.$off('RouterChangeBefore');
      !!callback && callback(data);
    }
    this.instance = new Vue({
      el: document.createElement('div'),
      render: function (createElement) {
        return createElement(
          OriginPageModal,
          [
            createElement(
              component,
              option,
              this.$slots.default
            )
          ]
        )
      }
    })
    this.pageInstance = this.instance.$children[0];
    document.body.appendChild(this.instance.$el);
    $channel.$once('RouterChangeBefore', () => {
      this.pageInstance.hide();
      $instanceModalArray.pop();
    })
    $instanceModalArray.push(this);
  }

}
window.$instanceModalArray = [];
export default PageModal;