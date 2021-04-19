<template>
  <div class="hostArt" id="slider">
    <el-row
      class="animated articalTitle"
      v-if="animatedClass"
      :class="{ fadeInDown: animatedClass }"
    >
      <el-col :span="24">
        <div class="infoTitle">
          {{ infoTitle.title }}
        </div>
        <div class="infoTip"></div>
        <div class="infoMsg">
          {{ infoTitle.infoMsgOne }}<br />{{ infoTitle.infoMsgTwo }}
        </div>
      </el-col>
    </el-row>
    <el-row v-if="animatedArtClass" class="artLists">
      <div class="artList">
        <el-col
          :span="8"
          :class="{ fadeInUp: animatedArtClass }"
          class="animated articalLists"
          v-for="(item, index) in hostArtical"
          :key="index"
        >
          <div class="articalList">
            <div class="mask">
              <el-link type="primary" :underline="false">
                <div class="iconfont icon-tubiao link"></div>
              </el-link>
            </div>
            <div class="articalImg">
              <img src="@/assets/img/acticalImg.png" alt="LOL" />
            </div>
            <div class="articalMsg">
              <p class="articalMsgAbout">关于本站</p>
              <p class="articalMsgDate">2020年10月29日</p>
              <p class="articalMsgFont">
                FastReport.Net是一款适用于Windows Forms,
                ASP.NET和MVC框架的功能齐全的报表分析解决方案，支持.Net Framework
                2.0到4.x。
              </p>

              <div style="margin-top:50px;">
                <el-link :underline="false" type="primary">阅读更多</el-link>
              </div>
            </div>
          </div>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
import { scrollAnimation, scroll, client } from "@/utils/commonFun/myFun.js";
export default {
  name: "",
  components: {},
  props: {
    infoTitle: {
      type: Object,
    },
    hostArtical: {
      type: Array,
    },
  },
  data() {
    return {
      animatedClass: false,
      animatedArtClass: false,
    };
  },
  created() {},
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      let box = document.getElementById("slider");
      let scrollTop = scroll().top;
      let boxH = box.offsetHeight * 0.2 + box.offsetTop;
      let screenW =
        document.body.clientHeight || document.documentElement.clientHeight;
      if (boxH <= screenW + scrollTop) {
        this.animatedClass = true;
        boxH = box.offsetHeight * 0.3 + box.offsetTop;
      }
      if (boxH <= screenW + scrollTop) {
        this.animatedArtClass = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.hostArt {
  width: 100%;
  height: 100%;
}
.articalTitle {
  margin-bottom: 50px;
}

/* background-color: #00f; */
.infoTitle {
  margin: 70px auto;
  text-align: center;
  font-size: 32px;
  color: #121212;
  margin-bottom: 25px;
}

.infoTip {
  width: 50px;
  height: 2px;
  background-color: #ff83fa;
  margin: 5px auto;
}

.infoMsg {
  margin: 20px auto;
  text-align: center;
  font-size: 15px;
  color: #48d1cc;
  margin-bottom: 0;
  line-height: 25px;
}
.artLists {
  display: flex;
  /* justify-content: space-around; */
}
.artList {
  margin: auto;
  /* justify-content: space-around; */
}
.articalLists {
  margin: 0 auto;
  padding: 20px;
  max-width: 330px;
  .articalList {
    width: 100%;
    max-width: 330px;
    height: 550px;
    background-color: rgb(250, 249, 249);
    box-sizing: border-box;
    position: relative;
    top: 0;
    left: 0;

    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 0;
      display: grid;
      background-color: rgba(255, 255, 255, 0.51);
      transition: all 1s linear;
      z-index: 999;

      .link {
        margin: auto;
        color: #0000ee;
        font-size: 32px;
        opacity: 0;
        transition: all 1s linear;
      }
    }

    &:hover .mask {
      height: 320px;
    }

    &:hover .mask .link {
      opacity: 1;
    }

    &:hover img {
      transform: scale(1.2);
    }

    .articalImg {
      width: 100%;
      height: 320px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        /* transform: scale(1); */
        transition: all 1s linear;
        /* transform:scale(1.5); */
        /* animation: all 1s linear forwards; */
      }
    }

    .articalMsg {
      padding: 10px 10px 15px 10px;

      p {
        line-height: 35px;
        color: #999;
        font-family: "Microsoft YaHei";
      }

      .articalMsgAbout {
        font-size: 14px;
        color: #333;
      }

      .articalMsgDate {
        font-size: 12px;
      }

      .articalMsgFont {
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
}
</style>
