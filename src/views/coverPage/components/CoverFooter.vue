<template>
  <div class='CoverFooter' id="coverFoot">
    <div class="authorMsg">
      <div class="msgList">
        <div class="animated callMe" :class="{bounceInUp:animatedClass}">
          <p>北孤雁</p>
          <p>未必逢矰缴，孤飞自可疑。</p>
          <p>
            <el-button>Me</el-button>
          </p>
        </div>
        <div class="animated iconFontList" :class="{bounceInUp:animatedClass}">
          <p>相关链接</p>
          <p>
            <el-link :underline="false"><i  class="iconfont icon-bowen"></i>博文</el-link>
            <el-link :underline="false"><i class="iconfont icon-liuyan"></i>留言</el-link>
          </p>
          <p>
            <el-link :underline="false"><i class="iconfont icon-guidang"></i>归档</el-link>
            <el-link :underline="false"><i class="iconfont icon-xuehua"></i>日志</el-link>
          </p>
          <p>
            <el-link :underline="false"><i class="iconfont icon-ziyuan148"></i>资源</el-link>
          </p>

        </div>
        <div class="animated callMeOk" :class="{bounceInUp:animatedClass}">
          <p>联系我</p>
          <p>
            <el-link :underline="false"><i  class="iconfont icon-dizhi"></i>广东省广州市荔湾区</el-link>
            
          </p>
          <p>
            <el-link :underline="false"><i class="iconfont icon-qq"></i>121452557</el-link>
            
          </p>
          <p>
            <el-link :underline="false"><i class="iconfont icon-youxiang"></i>121452557@qq.com</el-link>
          </p>
        </div>
      </div>
    </div>
    <div class="footTip">
      <p>Copyright © 2018-2020 beiguyan All Rights Reserved V.0.0.0 备案号:<i>粤ICP备00000000号</i></p>
    </div>
  </div>
</template>

<script>
  import { scrollAnimation, scroll, client } from "@/utils/commonFun/myFun.js"
  export default {
    name: 'CoverFooter',
    components: {

    },
    data() {
      return {
        animatedClass: false
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
        let box = document.getElementById("coverFoot")
        let scrollTop = scroll().top
        let boxH = box.offsetHeight * 0.1 + box.offsetTop
        let screenW = document.body.clientHeight || document.documentElement.clientHeight;
        console.log("---------------", scrollTop, boxH, screenW);
        if (boxH <= screenW + scrollTop) {
          console.log("===============");
          this.animatedClass = true
        }
      }
  }
  }
</script>

<style lang='scss' scoped>
  .CoverFooter {
    width: 100%;
    height: 100%;

    .authorMsg {
      width: 100%;
      height: 370px;
      background-color: #232328;
      overflow: hidden;

      .msgList {
        width: 100%;
        height: 270px;
        margin-top: 50px;
        display: flex;
        justify-content: space-around;

        /* background-color: rgb(64, 150, 30); */
        div {
          width: 30%;
          height: 200px;
          /* background-color: blue; */
          padding: 25px;
          box-sizing: border-box;

          p {
            color: #fff;
            line-height: 30px;
            margin-bottom: 10px;
          }
        }
      }
    }

    .footTip {
      width: 100%;
      height: 50px;
      background-color: #000;
      text-align: center;
      line-height: 50px;
      color: #bbb;
      i{
        color: #fff;
      }
    }
  }

  .callMe p:nth-child(1) {
    font-size: 24px;
    line-height: 30px;

  }

  .callMe p:nth-child(2) {
    font-size: 14px;
    margin-top: 30px;

  }

  .callMe p:nth-child(3) {
    font-size: 20px;
    margin-top: 30px;
  }

  .iconFontList {
    p {
      color: #fff;

      .el-link {
        color: #fff;
        margin-right: 70px;
        i{
          margin-right: 10px;
        }
      }
    }
  }

  .iconFontList p:nth-child(1) {
    font-size: 24px;
    line-height: 30px;
  }
.callMeOk{
  p {
      color: #fff;

      .el-link {
        color: #fff;
        margin-right: 70px;
        i{
          margin-right: 10px;
        }
      }
    }
}
.callMeOk p:nth-child(1) {
    font-size: 24px;
    line-height: 30px;
  }
</style>