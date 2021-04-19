<template>
  <div class="homePage">
    <!-- blo主体 -->
    <div class="home-main">
      <!-- blog列表 -->
      <div class="blog-list" :class="{ newStyle: !showMenuNav }">
        <artical-list></artical-list>
      </div>

      <!-- 右边导航 -->
      <div class="blog-nav" v-if="showMenuNav">
        <!-- 关于 -->
        <template v-if="articalBI">
          <about-me></about-me>
        </template>

        <template v-if="articalBI">
          <artical-search></artical-search>
        </template>

        <template v-if="articalBI">
          <hot-articel></hot-articel>
        </template>

        <!-- 标签 -->
        <template v-if="articalBI">
          <artical-tip></artical-tip>
        </template>

        <template v-if="articalBI">
          <tourist-list></tourist-list>
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
import articalList from "./components/articleList.vue";
import aboutMe from "./components/aboutMe.vue";
import articalSearch from "./components/articleSearch.vue";
import hotArticel from "./components/hotArticel.vue";
import touristList from "./components/touristList.vue";
import articalTip from "./components/articalTip.vue";
import { scroll, client } from "@/utils/commonFun/myFun.js";
export default {
  name: "HomePage",
  components: {
    articalList,
    aboutMe,
    articalSearch,
    hotArticel,
    touristList,
    articalTip,
  },
  data() {
    return {
      articalBI: false,

      showMenuNav: true,
      drawerShow: false,
    };
  },
  created() {
    this.articalBI = true;
  },
  mounted() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      let winWidth = client().width;
      if (winWidth < 1000) return (this.showMenuNav = false);
      this.showMenuNav = true;
      this.drawerShow = false;
    },
    showMenuNavClick() {
      this.drawerShow = true;
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.el-card__body {
  padding: 0 !important;
}

.homePage:before {
  content: " ";
  position: fixed;
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
  font: 14px/1.5 "Helvetica neue", Helvetica, Tahoma, "lantinghei sc",
    "Microsoft Yahei", sans-serif;
  color: #515250;
  -webkit-font-smoothing: antialiased;
  width: 100%;
  height: 100% !important;

  .home-header {
    width: 100%;
    height: 60px;
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  }

  .home-main {
    width: 90%;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    margin-top: 0px;
    overflow: hidden;

    .blog-list {
      width: 75%;
      padding: 10px;
      float: left;
      box-sizing: border-box;
    }

    .blog-nav {
      width: 25%;
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
    background-color: #b0e2ff;
    color: #6bc30d;
  }

  &:hover span {
    color: #6bc30d;
  }

  span {
    transform: rotate(-90deg);
    color: rgb(84, 32, 168);
    font-size: 14px;
  }
}

.newStyle {
  width: 100% !important;
  margin: 0 auto !important;
}
</style>
