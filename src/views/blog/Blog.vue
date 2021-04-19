<template>
  <div class='homePage'>
    <!-- 主页头部 -->
    <div class="home-header">
      <blog-header></blog-header>
    </div>

    <!-- blo主体 -->
    <div class="home-main">
      <router-view></router-view>
    </div>
    
  </div>
</template>

<script>
  import BlogHeader from '@/views/blogHeader/BlogHeader.vue'
  export default {
    name: 'HomePage',
    components: {
      BlogHeader,
      
    },
    data() {
      return {
       
        
      }
    },
    created() {
     
    },
    mounted() {
      
    },
    methods: {
    
    }
  }
</script>

<style lang='scss' scoped>
  /deep/.el-card__body {
    padding: 0 !important;
  }

  .homePage:before {
    content: ' ';
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
    font: 14px/1.5 "Helvetica neue", Helvetica, Tahoma, "lantinghei sc", "Microsoft Yahei", sans-serif;
    color: #515250;
    -webkit-font-smoothing: antialiased;
    width: 100%;
    /* height: 100%; */

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
      padding-top: 75px;
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
      background-color: #B0E2FF;
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