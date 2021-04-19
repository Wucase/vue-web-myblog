<template>
  <el-card class="box-card animated search" :class="{ zoomIn: articalBI }">
    <div slot="header" class="clearfix">
      <h2 style="font-size: 20px; color: rgb(153,153,153)">
        <span class="iconfont icon-fangke title"></span>
        blog标签
      </h2>
    </div>
    <div class="typeList">
      <ul>
        <li v-for="(item, index) in touristList" :key="index">
          <el-tag type="info" size="mini">标签三</el-tag>
        </li>
      </ul>
    </div>
  </el-card>
</template>

<script>
import { touristList } from "./data.js";
import { animate } from "@/utils/commonFun/myFun.js";
export default {
  name: "touristList",
  components: {},
  data() {
    return {
      articalBI: false,
      searchValue: "",
      touristList: touristList,
    };
  },
  created() {
    this.articalBI = true;
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.search {
  /* height: 250px; */
  padding: 10px;
  box-sizing: border-box;
  margin: 20px 0;
}

/deep/ .el-card__header {
  padding: 10px 0;
}

.title {
  font-size: 20px;
  color: #6bc30d;
}
.typeList {
  margin: 10px 0;

  ul {
    list-style: none;
    display: flex;
    justify-content: flex-starts;
    flex-wrap: wrap;
    li {
      height: 30px;
      width: 25%;
      padding: 5px;
      box-sizing: border-box;
      .el-tag {
        cursor: pointer;
        &:hover {
          background-color: #6bc30d;
          color: #fff;
        }
      }
      /* background-color: #aaa; */
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
