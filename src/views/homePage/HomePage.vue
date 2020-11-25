<template>
  <div class='homePage'>
    <div class="home-header">
      <el-card class="box-card">
        <el-row>
          <el-col :span="9">12</el-col>
          <el-col :span="15">
            <ul>
              <li v-for="(menu, index) in menuList" :key="index" :class="{menuActive: index == menuActive}"
                @click="toPage(menu, index)">
                {{menu.label}}
              </li>
            </ul>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <div class="home-main">
      <div class="blog-list" :class="{newStyle:!showMenuNav}">
        <ul class="blogUl">
          <template v-if="articalBI">
            <el-card class="box-card animated" v-for="(menu, index) in menuList" :key="index"
              :class="{zoomIn:articalBI}">
              <li>
                <div class="artical-header">
                  <div class="left">【原创】 关于本站</div>
                  <div class="right">
                    <p class="day">28</p>
                    <p class="year">10月<span></span>2020</p>
                  </div>
                </div>
                <div class="artical-main">
                  <el-row>
                    <el-col :span="10">
                      <img src='~@/assets/img/earthBg.jpg' alt="">
                    </el-col>
                    <el-col :span="14"></el-col>
                  </el-row>
                </div>
                <div class="continuRead">
                  <el-link :underline="false" type="primary">继续悦读</el-link>
                </div>
              </li>
            </el-card>
          </template>
        </ul>
      </div>
      <div class="blog-nav" v-if="showMenuNav">
        <template v-if="articalBI">
          <el-card class="box-card animated" :class="{zoomIn:articalBI}">
            <div class="blog-search"></div>
          </el-card>
        </template>
      </div>
    </div>
    <div class="hiddenNav" v-if="!showMenuNav" @click="showMenuNavClick()">
      <span class="el-icon-upload2"></span>
    </div>
    <el-drawer :visible.sync="drawerShow" direction="rtl">
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script>

  import { scroll, client } from "@/utils/commonFun/myFun.js"
  export default {
    name: 'HomePage',
    components: {

    },
    data() {
      return {
        articalBI: false,
        menuActive: 0,
        showMenuNav: true,
        drawerShow: false,
        menuList: [
          { label: '首页', path: '/home' },
          { label: '博客', path: '/home' },
          { label: '留言', path: '/home' },
          { label: '日记', path: '/home' },
          { label: '友链', path: '/home' },
          { label: '关于', path: '/home' },
        ]
      }
    },
    created() {
      this.articalBI = true
    },
    mounted() {
      this.handleResize()
      window.addEventListener('resize', this.handleResize)
    },
    methods: {
      toPage(menu, index) {
        this.menuActive = index
      },
      handleResize() {
        console.log("===========", client().width);
        let winWidth = client().width
        if (winWidth < 1000) return this.showMenuNav = false
        this.showMenuNav = true
      },
      showMenuNavClick() {
        this.drawerShow = true
      }
    }
  }
</script>

<style lang='scss' scoped>
  /deep/.el-card__body {
    padding: 0 !important;
  }

  .blogUl .el-card {
    margin-bottom: 20px !important;
    animation-duration: 1.5s !important;
  }

  .homePage:before {
    content: ' ';
    position: fixed;
    /* z-index: -1; */
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url("~@/assets/img/earthBg.jpg") center no-repeat;
    background-size: cover;
  }

  .el-row {
    height: 100%;

    .el-col {
      height: 100%;
    }
  }

  .homePage {
    font: 14px/1.5 "Helvetica neue", Helvetica, Tahoma, "lantinghei sc", "Microsoft Yahei", sans-serif;
    color: #515250;
    -webkit-font-smoothing: antialiased;
    width: 100%;
    height: 100%;

    /* z-index: 0; */
    .home-header {
      width: 100%;
      height: 60px;
      background-color: #fff;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999;

      ul {
        list-style: none;
        height: 100%;
        line-height: 60px;
        text-align: center;
        font-size: 16px;
        display: flex;
        justify-content: flex-start;

        li {
          width: 100px;
          height: 100%;
          /* background-color: #aaa; */
          cursor: pointer;
          position: relative;
          top: 0;
          left: 0;
          margin-right: 10px;

          &:after {
            content: '';
            width: 0;
            height: 2px;
            background-color: #EEEE00;
            position: absolute;
            bottom: 0;
            left: 50%;
            transition: all 0.7s linear;
          }

          &:hover:after {
            width: 100%;
            left: 0;
          }

          &:hover {
            color: #EEEE00;
          }
        }
      }
    }

    .home-main {
      width: 90%;
      height: 2000px;
      /* background-color: #fff; */
      /* z-index: 3; */
      margin: 0 auto;
      position: relative;
      z-index: 1;
      margin-top: 85px;
      overflow: hidden;

      .blog-list {
        width: 75%;
        /* background-color: #aaa; */
        padding: 10px;
        float: left;
        box-sizing: border-box;

        .blogUl {
          list-style: none;

          li {
            background-color: #fff;
            width: 100%;
            height: 350px;
          }
        }

      }

      .blog-nav {
        width: 25%;
        /* background-color: #ddd; */
        padding: 10px;
        float: left;
        box-sizing: border-box;

        .blog-search {
          width: 100%;
          height: 350px;
          margin-bottom: 20px;
          background-color: #fff;
        }
      }
    }
  }

  .hiddenNav {
    width: 15px;
    height: 100px;
    position: fixed;
    right: 0;
    top: 50%;
    background-color: #fff;
    transform: translate(0, -50%);
    cursor: pointer;
    line-height: 100px;
    text-align: center;

    &:hover {
      background-color: #B0E2FF;
      color: #EEEE00;
    }

    &:hover span {
      color: #EEEE00;
    }

    span {
      transform: rotate(-90deg);
      color: rgb(84, 32, 168);
      font-size: 14px;
    }

  }

  .menuActive {
    color: #EEEE00;

    &:after {
      width: 100% !important;
      left: 0 !important;
    }
  }

  .newStyle {
    width: 100% !important;
    margin: 0 auto !important;
  }

  .artical-header {
    width: 100%;
    height: 60px;
    position: relative;
    left: 0;
    top: 0;

    .left {
      width: 82%;
      height: 60px;
      /* background-color: #aaa; */
      float: left;
      padding-left: 20px;
      box-sizing: border-box;
      line-height: 85px;
      position: relative;
      left: 0;
      top: 0;
      font-size: 16px;

      &::after {
        display: inline-block;
        content: '';
        width: 96% !important;
        height: 2px;
        background-color: rgb(232, 232, 232);
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }

    .right {
      width: 150px;
      height: 100px;
      /* background-color: #ddd; */
      float: right;
      position: absolute;
      top: 0;
      right: 0;

      p {
        text-align: center;
        color: #fff;
      }

      .day {
        font-size: 40px;
        line-height: 45px;
        color: #6bc30d;
      }

      .year {
        font-size: 20px;
        line-height: 27px;
        color: #989999;

        span {
          display: inline-block;
          width: 25px;
        }
      }
    }
  }

  .artical-main {
    width: 100%;
    height: 200px;
    /* background-color: #aaa; */
    padding: 20px;
    box-sizing: border-box;

    img {
      width: 100%;
      height: 160px;
    }
  }

  .continuRead {
    padding: 0 20px;
    font-size: 18px !important;
    position: relative;
    left: 0;
    top: 0;

    &::after {
      display: inline-block;
      content: '';
      width: 85% !important;
      height: 2px;
      background-color: rgb(232, 232, 232);
      position: absolute;
      left: 95px;
      bottom: 10px;
    }
  }
</style>