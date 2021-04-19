<template>
  <div>
    <el-card
      class="animated zoomIn box-card msg"
      v-for="(item, index) in msgDataList"
      :key="index"
      :style="{ animationDelay: index * 0.1 + 's' }"
    >
      <div class="top">
        <div class="left"><img :src="$getImage(item.userImg)" alt="" /></div>
        <div class="right">
          <div class="name">
            <el-link :underline="false" type="primary">wwming</el-link>
          </div>
          <div class="authMsg">{{ item.msgContent }}</div>
        </div>
      </div>
      <div class="bottom">
        <div class="talk">
          <div class="icon">
            <div class="iconfont icon-yixianshi-"></div>
            <div class="acount">{{ item.msgLove }}</div>
          </div>
          <div class="icon">
            <div class="iconfont icon-i-good"></div>
            <div class="acount">{{ item.msgGood }}</div>
          </div>
          <div class="icon">
            <div class="iconfont icon-i-bad"></div>
            <div class="acount">{{ item.msgBad }}</div>
          </div>
        </div>
        <div class="time">
          <div class="icon">
            <div class="iconfont icon-shijian"></div>
            <div class="acount">{{ $timeService(item.msgDate) }}</div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {
    msgDataList: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.el-card {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.msg-title {
  text-align: center;

  span {
    font-size: 36px;
    color: #c6e2ff;
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

.top {
  height: 60px;
  line-height: 60px;
  display: flex;
  justify-content: flex-start;

  .left {
    width: 60px;

    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  }

  .right {
    width: 100%;
    height: auto;
    margin-left: 15px;

    .name {
      height: 30px;
      width: auto;
      line-height: 30px;
    }

    .authMsg {
      height: auto;
      width: 100%;
      line-height: 30px;
    }
  }
}

.bottom {
  width: 100%;
  height: 35px;
  line-height: 35px;
  margin: 20px 0 10px 0;

  .talk {
    width: 50%;
    height: 100%;
    float: left;
    display: flex;
    justify-content: flex-start;

    .icon {
      display: flex;
      justify-content: flex-start;
      margin: 0 20px 0 0;

      .iconfont {
        font-size: 23px;
      }

      .acount {
        font-size: 14px;
        margin-left: 5px;
        color: #6bc30d;
      }
    }
  }

  .time {
    width: 50%;
    height: 100%;
    float: right;

    .icon {
      display: flex;
      justify-content: flex-end;
      margin: 0 20px 0 0;

      .iconfont {
        font-size: 23px;
        color: skyblue;
      }

      .acount {
        font-size: 14px;
        margin-left: 5px;
        color: #6bc30d;
      }
    }
  }
}
.btns {
  text-align: left;
  margin-top: 15px;
}
</style>
