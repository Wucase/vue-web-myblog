<template>
  <div>
    <el-card class="animated zoomIn" v-if="isShowPage">
      <div slot="header" class="clearfix">
        <img src="@/assets/img/message.png" alt="">
      </div>

      <div class="msg-input">
        <tinymce-editor style="background-color: #ddd;" ref="editor" v-model="tinymceHtml" :value="tinymceHtml"
          @input="input"></tinymce-editor>
      </div>
      <div class="btns">
        <el-button type="success" icon="el-icon-check" circle @click="submitMsg"></el-button>
        <el-button type="danger" icon="el-icon-delete" circle @click="tinymceHtml = ''"></el-button>
      </div>
    </el-card>

    <leave-msg></leave-msg>

  </div>

</template>

<script>
  import tinymceEditor from "@/components/tinymce/editor.vue";
  import LeaveMsg from "@/components/leaveMsg/LeaveMsg.vue";
  export default {
    name: 'Message',
    components: {
      tinymceEditor,
      LeaveMsg
    },
    data() {
      return {
        tinymceHtml: '',
        isShowPage: false,
      }
    },

    created() {
      this.isShowPage = true
    },
    methods: {
      submitMsg(){
        if(!this.tinymceHtml) return this.$notify.warning("请输入留言！")
        if(!window.sessionStorage.getItem('userName')) return this.$notify.warning("请登录！")
        
      },
      
      input(value) {
        console.log(value);
      }
    }
  }
</script>

<style lang='scss' scoped>
  .el-card {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;

  }

  .msg-title {
    text-align: center;

    span {
      font-size: 36px;
      color: #C6E2FF;
    }

    img {

      margin: 0 10px;
    }
  }

  .msg-input {
    width: 100%;
    /* background-color: #ddd; */
  }

  .lsit {
    animation-delay: 0.5s;
  }

  .msg {
    padding: 20px 20px 0 20px;
    margin-top: 20px;

  }


  .btns{
    text-align: left;
    margin-top: 15px;
  }
</style>