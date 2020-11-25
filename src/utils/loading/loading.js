import Vue from 'vue'
import loadingComponent from '@/components/loading/Loading.vue'

const LoadingConstructor = Vue.extend(loadingComponent)

const instance = new LoadingConstructor({
  el: document.createElement('div')
})

instance.show = false // 默认隐藏
const loading = {
  show() { // 显示方法
    console.log("show++++++++++");
    instance.show = true
    document.body.appendChild(instance.$el)
    document.documentElement.style.overflowY = 'hidden'; 
  },
  hide() { // 隐藏方法
    instance.show = false
    // document.body.remove(instance.$el)
    console.log("hide++++++++++");
    document.documentElement.style.overflowY = 'scroll'; 

  }
}

export default {
  install() {
    if (!Vue.$loading) {
      Vue.$loading = loading
    }
    Vue.mixin({
      created() {
        this.$loading = Vue.$loading
      }
    })
  }
}
