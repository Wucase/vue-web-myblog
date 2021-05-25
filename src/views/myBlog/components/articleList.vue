<template>
  <ul class="blogUl">
    <template v-if="articalBI">
      <el-card v-if="isDataList"
        class="box-card animated nodata"
        :class="{ zoomIn: articalBI }">
        <img src="@/assets/img/null.jpg" alt="" />
        <div>
          <el-link type="info" :underline="false"
            @click="toWrite">去找点乐子...</el-link>
        </div>
      </el-card>
      <el-card v-else class="box-card animated"
        v-for="item in artList" :key="item._id"
        :class="{ zoomIn: articalBI }">
        <li>
          <div class="flag">HOT</div>
          <div class="artical-header">
            <div class="left">
              【原创】
              <el-link @click="toDetail(item)"
                :underline="false" type="primary">
                {{ item.articalTitle }}</el-link>
            </div>
            <div class="right">
              <p class="day">{{ item.day }}</p>
              <p class="year">
                {{ item.month }}月<span></span>{{ item.year }}
              </p>
            </div>
          </div>
          <div class="artical-main">
            <el-row>
              <el-col :span="10">
                <img :src="$getImage(item.articalImgs)"
                  alt="" @click="toDetail(item)" />
              </el-col>
              <el-col :span="14">
                <h2
                  style="text-align: center;line-height:30px;font-size: 22px;color: #6bc30d;">
                  {{ item.articalTitle }}
                </h2>
                <div class="articalContent"
                  v-html="item.articalContent"></div>
              </el-col>
            </el-row>
          </div>
          <div class="continuRead">
            <el-link :underline="false" type="primary"
              @click="toDetail(item)">继续悦读</el-link>
          </div>
          <div class="artInfo">
            <div class="writeMsg">
              <span class="iconfont icon-shuxie"
                @click="toDetail(item)">留言</span>
            </div>
            <div class="tourCount">
              <span
                class="iconfont icon-yan"><span>{{ item.articalVisit }}</span></span>
              <span
                class="iconfont icon-fenxiang"><span>{{ item.articalShare }}</span></span>
            </div>
          </div>
        </li>
      </el-card>
    </template>
  </ul>
</template>

<script>
import { getArticalList } from "@/api/artical/artical";
export default {
  name: "",
  components: {},
  data() {
    return {
      articalBI: false,
      isDataList: false,
      artList: [],
      searchValue: "",
      allType: [],
      allTip: [],
    };
  },
  beforeDestroy() {
    this.articalBI = false;
    this.$eventBus.$off("sendSearch");
  },
  created() {
    this.articalBI = true;
    this.getDataList();
    this.$eventBus.$on("sendSearch", (searchValue) => {
      console.log(searchValue);
      this.searchValue = searchValue;
      this.articalBI = false;
      this.getDataList();
      this.searchValue = "";
    });
  },
  methods: {
    getDataList() {
      let params = {
        userId: this.$store.state.user.userId,
        title: this.searchValue,
      };

      getArticalList(params).then((res) => {
        if (res.meta.status == "200") {
          this.articalBI = true;
          this.artList = res.data;
          if (this.artList.length <= 0) return (this.isDataList = true);
          this.isDataList = false;
          let type = [];
          let tip = [];
          this.artList.forEach((item) => {
            item.articalDate = this.$timeService(item.articalDate);
            let ymdArr = item.articalDate.split(" ");
            if (!ymdArr) return false;
            let artYmd = ymdArr[0];
            let arrSplit = artYmd.split("-");
            item.year = arrSplit[0];
            item.month = arrSplit[1];
            item.day = arrSplit[2];
            type.push(...item.articalType);
            tip.push(...item.articalTip);
            console.log(type, tip);
          });
          this.allType = [...new Set(type)];
          this.allTip = [...new Set(tip)];
        } else {
          this.$message.error("err");
        }
      });
    },
    toDetail(item) {
      this.$router.push("/blog/myblogdetail/" + item.articalId);
    },
    toWrite() {
      this.$router.push("/blog/writeblog");
    },
  },
};
</script>

<style lang="scss" scoped>
.blogUl .el-card {
  margin-bottom: 20px !important;
  animation-duration: 1.5s !important;
}

.el-card {
  border: none;
}

.blogUl {
  list-style: none;

  li {
    position: relative;
    top: 0;
    left: 0;
    background-color: #fff;
    width: 100%;
    height: 350px;

    .flag {
      width: 100px;
      height: 20px;
      color: #fff;
      background-color: #f00;
      position: absolute;
      top: 17px;
      left: -23px;
      transform: rotate(-45deg);
      text-align: center;
      cursor: pointer;
    }
  }
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
    float: left;
    padding-left: 30px;
    box-sizing: border-box;
    line-height: 85px;
    position: relative;
    left: 0;
    top: 0;
    font-size: 16px;

    &::after {
      display: inline-block;
      content: "";
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
    cursor: pointer;
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
    content: "";
    width: 85% !important;
    height: 2px;
    background-color: rgb(232, 232, 232);
    position: absolute;
    left: 95px;
    bottom: 10px;
  }
}

.artInfo {
  margin: 20px;
  font-size: 14px !important;

  .writeMsg {
    float: left;
    width: 100px;
    color: #6bc30d;

    span {
      font-size: 14px !important;
      cursor: pointer;
    }
  }

  .tourCount {
    float: right;
    width: 150px;

    span {
      margin: 0 10px;
      font-size: 14px !important;
      color: #6bc30d;
      text-align: right;
      cursor: pointer;
    }
  }
}
.articalContent {
  width: 98%;
  height: 135px;
  /* background-color:#ddd; */
  margin-left: 10px;
  line-height: 28px !important;
  font: 14px/1.5 "Helvetica neue", Helvetica, Tahoma, "lantinghei sc",
    "Microsoft Yahei", sans-serif;
  color: #515250;
  overflow: hidden;
  padding-right: 20px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
}
.nodata {
  height: 500px;
  text-align: center;
  background-color: rgb(245, 245, 245);
  div {
    height: 30px;
    width: 100%;
    text-align: center;

    .el-link {
      color: rgb(150, 177, 197);
      &:hover {
        color: skyblue;
      }
    }
  }
  img {
    margin-top: 30px;
    width: 300px;
    height: 300px;
  }
  /* height: 300px; */
}
</style>
