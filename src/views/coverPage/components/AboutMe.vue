<template>
  <div class='aboutBtn' id="aboutMe">
    <div class="btns">
      <el-row>
        <el-col :span="12"  v-if="animatedClass" :class="{ slideInLeft:animatedClass}" class="animated">
          <el-button class="about" @click="about"  style="float: right;"><span></span>关 于</el-button>
        </el-col>
        <el-col :span="12" v-if="animatedClass" :class="{ slideInRight:animatedClass}" class="animated">
          <el-button class="friend" @click="friendLink" style="float: left;"><span></span>+友情链接</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="saySomething">
      <div class="animated" v-if="saySomethingStyle" :class="{rollIn:saySomethingStyle}">
        <div class="title">次元使者</div>
        <div class="msg">爱好游戏，动漫。闲来无事喜欢在一些不健康的场所虚度光阴，撸起代码就会废寝忘食。</div>
      </div>
    </div>
    <div class="coverFooter">
      <CoverFooter></CoverFooter>
    </div>
  </div>
</template>

<script>
  
  import CoverFooter from "./CoverFooter.vue"
   import { scrollAnimation, scroll, client } from "@/utils/commonFun/myFun.js"
export default {
  name: 'aboutMe',
  components: {
    CoverFooter
  },
  data () {
    return {
      animatedClass: false,
      saySomethingStyle: false,

    }
  },
  created() {

  },
  mounted(){
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    about(){},
    friendLink(){},
    handleScroll() {
        let box = document.getElementById("aboutMe")
        let scrollTop = scroll().top
        let boxH = box.offsetHeight * 0.1 + box.offsetTop
        let screenW = document.body.clientHeight || document.documentElement.clientHeight;
        if (boxH <= screenW + scrollTop) {
          this.animatedClass = true
          boxH = box.offsetHeight * 0.3 + box.offsetTop
        }
        if (boxH <= screenW + scrollTop) {
          this.saySomethingStyle = true
        }
      }
  }
}
</script>

<style lang='scss' scoped>
.aboutBtn{
  width: 100%;
  height: 100%;
  
  .btns{
    width: 100%;
    height: 50px;
    margin: 150px 0;
    text-align: center;
    .about{
      margin-right: 50px;
      
      &:hover span{
        width: 100%;
      }
    }
    .friend{
      margin-left: 50px;
      &:hover span{
        width: 100%;
      }
    }
    .el-button{
      width: 200px;
      height: 50px;
      color: aliceblue;
      background-color: rgba(0,0,0,0);
      position: relative;
      top: 0;
      left: 0;
      span{
        display: inline-block;
        width: 0;
        height: 100%;
        background-color: rgba(154,205,50,.4);
        position: absolute;
        top:0;
        left: 0;
        transition: all 1.5s linear;
      }
    }
  }

  .saySomething{
    width: 100%;
    height: 300px;
    background-color: #fff;
    text-align: center;
    box-sizing: border-box;
    overflow: hidden;
    .title{
      color: #000;
      font-size: 24px;
      margin-top: 100px;
    }
    .msg{
      color: black;
      font-size: 14px;
      margin-top: 20px;
    }
  }
  .coverFooter{
    width: 100%;
    height: 420px;
    background-color: #fff;
   
  }
}
</style>
