<template>
  <div class="home">
    <transition name="fade" mode="in-out">
      <div class="mainMenu" v-show="showMenu">
        <div class="menu-item">
          <btnMenu :btnOptions="btnOptions"></btnMenu>
        </div>
      </div>
    </transition>
    <div class="home-main-header">
      <transition name="fade" mode="in-out">
        <span @click="showMenuClick" class="animated zoomIn" :class="{err:showMenu}">
          <i v-if="!showMenu" class="iconfont icon-icon-test memuOpen"></i>
          <i v-else class="iconfont icon-cuo memuOpen cuoRoate"></i>
        </span>
      </transition>

    </div>
    <div class="home-main-bottom">
      <div class="animated zoomIn managerInfo" style="animation-duration: 2s;" v-if="isManagerInfo">
        <ShiMask :shiData="shiData"></ShiMask>
      </div>
      <div class="drawDowm">

        <span class="animated zoomIn iconDrowm" @click="sliderDown" v-if="isManagerInfo"
          style="animation-duration: 2s;">
          <i class="iconfont icon-xiangxia"></i>
        </span>
      </div>
    </div>
    <div class="home-main-info">
      <HostArtical :infoTitle="infoTitle" :hostArtical="btnOptions"></HostArtical>
    </div>
    <div class="aboutMe">
      <AboutMe></AboutMe>
    </div>
    <div class="bg"></div>
  
  </div>
</template>

<script>
  import { scrollAnimation, scroll, client } from "@/utils/commonFun/myFun.js"
  import btnMenu from "./components/btnMenu.vue"
  import ShiMask from "./components/ShiMask.vue"
  import HostArtical from "./components/HostArtical.vue"
  import AboutMe from "./components/AboutMe.vue"
  import { shiData, infoTitle } from "./data/shiData"
  export default {
    name: 'Cover',
    components: {
      btnMenu,
      ShiMask,
      HostArtical,
      AboutMe
    },
    data() {
      return {
        showMenu: false,
        
        dialogVisible: false,
        animateIn: false,
        isManagerInfo: false,
        shiData: shiData,
        infoTitle,
        btnOptions: [
          { label: "首页", path: "/" },
          { label: "博客", path: "/home" },
          { label: "留言", path: "/home" }
        ]
      }
    },
    created(){
      console.log("loading,,,,,,,,,,,,,,,,,,,,,,,");
      this.$loading.show()
     
    },
    mounted() {
      console.log("hide-----------");
      setTimeout(() => {
        this.$loading.hide()
      }, 3000)
      this.isManagerInfo = true
    },
    methods: {
      sliderDown() {
        let box = document.getElementById("slider")
        let target = box.offsetTop
        let current = scroll().top
        scrollAnimation(current, target)
      },
      showMenuClick() {
        this.showMenu = !this.showMenu
      },
    
    }
  }
</script>
<style lang="scss" scoped>
  .home {
    width: 100%;
    height: 100%;
    min-height: 500px !important;
    background: url("~@/assets/img/earthBg.jpg") no-repeat;
    background-size: cover;
    .home-main-header {
      width: 100%;
      height: 100px !important;
      position: relative;
      top: 0;
      left: 0;
      span {
        z-index: 999;
        display: inline-block;
        width: 50px;
        height: 50px;
        position: fixed;
        top: 50px;
        right: 50px;
        /* background-color: blue; */
        border-radius: 50%;
        display: grid;

        i {
          margin: auto;
          font-size: 30px;
          color: skyblue;
        }

        &:hover {
          background-color: skyblue;

          i {
            color: #fff;
          }
        }
      }
    }

    .home-main-bottom {
      width: 100%;
      height: calc(100% - 100px) !important;
      /* background: #00f; */
      position: relative;

      .managerInfo {
        display: inline-block;
        width: 50%;
        height: 40%;
        /* background-color: #ddd; */
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translate(-50%, 0)
      }

      .drawDowm {
        z-index: 999;
        width: 50%;
        height: 10%;
        /* background-color: #eee; */
        position: absolute;
        bottom: 0%;
        left: 50%;
        transform: translate(-50%, 0)
      }
    }

  }

  .iconDrowm {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -40%);
    text-align: center;
    line-height: 50px;
    padding-top: 3px;
    box-sizing: border-box;

    i {
      font-size: 30px;
      color: skyblue;
      line-height: 50px;
    }

    &:hover {
      background-color: skyblue;

      i {
        color: #fff;
      }
    }
  }

  .home-main-info {
    width: 100%;
    height: 850px;
    background-color: #fff;

   

  }


  .mainMenu {
    z-index: 99;
    padding: 0;
    margin: 0;
    width: 20%;
    height: 100%;
    background: rgba(7, 17, 27, 0.7);
    position: fixed;
    top: 0;
    right: 0;

    .menu-item {
      margin-top: 60%;
      width: 100%;
      /* background-color: #00ffff; */
      position: relative;
      top: 0;
      left: 0;

    }
  }

  .fade-enter {
    opacity: 0;
  }

  .fade-leave {
    opacity: 1;
  }

  .fade-enter-active {
    transition: opacity .5s;
  }

  .fade-leave-active {
    opacity: 0;
    transition: opacity .5s;
  }

  .err {
    background-color: #fff;

    i {
      color: skyblue;
    }

  }

  .cuoRoate {
    animation: cuoRoate 3s linear infinite;
  }

  @keyframes cuoRoate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
  .aboutMe{
    width: 100%;
    height: 100%;
    /* background-color: blue; */
    
    
    /* background:url(https://yssimage.oss-cn-hangzhou.aliyuncs.com/22.jpg); */
  }
  .bg{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    background-size: contain;
    z-index: -100;
    background: url(../../assets/img/cityImg.jpg) no-repeat;
  }
</style>