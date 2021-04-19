<template>
  <div class=''>
    <Editor :init="init" id="tinydemo" v-model="content" ></Editor>
  </div>
</template>

<script>
  import Editor from '@tinymce/tinymce-vue'
  import tinymce from './tinymce.min.js'
  import './icons/default/icons.min.js'
  import './themes/silver/theme.min.js'
  import './langs/zh_CN.js'

  import './plugins/preview/plugin.min.js'
  import './plugins/emoticons/plugin.min.js'
  import './plugins/emoticons/js/emojis.min.js'
  import './plugins/emoticons/js/emojiimages.min.js'
  import './plugins/paste/plugin.min.js'
  import './plugins/code/plugin.min.js'
  import './plugins/image/plugin.min.js'
  import './plugins/imagetools/plugin.min.js'
  import './plugins/colorpicker/plugin.min.js'
  export default {
    name: '',
    props: {
      value: {
        type: String,
        default: ''
      },
      msgHeight:{
        type: String,
        default: '200px'
      }
    },
    components: {
      Editor
    },
    data() {
      return {
        content: this.value,
        init: {
          menubar: false,
          statusbar: false,//去掉下边广告
          force_br_newlines: true, //强制回车换行时生成</br>
          force_p_newlines: false, //强制关闭回车换行时生成p标签
          forced_root_block: '', //强制初始化时的根标签为“”，默认是p标签。
          language: 'zh_CN',
          height: this.msgHeight,
          selector: '#tinydemo',
          emoticons_database_url: './emoticons/js/emojis.js',
          plugins: "preview emoticons past code image imagetools colorpicker",
          toolbar: ['undo redo | preview | emoticons | past | colorpicker | bold italic underline strikethrough |subscript superscript | code | alignleft aligncenter alignright']

        }
      }
    },
    watch: {
      value(newValue) {
        this.content = newValue
        console.log(newValue);
      },
      content(newValue) {
        this.$emit('input', newValue)
      }
    },
    created() {

    },
    methods: {

    }
  }
</script>

<style lang='scss' scoped>
  @import url('./skins/ui/oxide/skin.min.css');
</style>