<template>
  <el-card class="box-card animated search" :class="{ zoomIn: articalBI }">
    <div slot="header" class="clearfix">
      <h2 style="font-size: 20px; color: rgb(153,153,153)">
        <span class="iconfont icon-tag title"></span>
        blog分类
      </h2>
    </div>
    <div class="searchLog">
      <el-input v-model="searchValue" placeholder="请输入内容">
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="searchBlog"
        ></el-button>
      </el-input>
    </div>
    <div class="typeList">
      <ul @mouseleave="mouseOver(currentIndex)">
        <li class="liMask" ref="liMask"></li>
        <li
          v-for="(item, index) in typeList"
          :key="index"
          @click="searchType(item, index)"
          @mouseenter="mouseOver(index)"
        >
          <p>{{ item.label }}</p>
        </li>
      </ul>
    </div>
  </el-card>
</template>

<script>
import { typeList } from "./data.js";
import { animate } from "@/utils/commonFun/myFun.js";
export default {
  name: "articleSearch",
  components: {},
  data() {
    return {
      articalBI: false,
      searchValue: "",
      typeList: typeList,
      currentIndex: 0,
    };
  },
  created() {
    this.articalBI = true;
  },
  methods: {
    searchBlog() {
      console.log("+++++++++++++");
      this.$eventBus.$emit("sendSearch", this.searchValue);
    },
    searchType(item, index) {
      this.currentIndex = index;
      if (item.path) return this.$router.push(item.path);
      this.searchValue = item.key;
      this.$eventBus.$emit("sendSearch", this.searchValue);
    },
    mouseOver(index) {
      let liMask = this.$refs.liMask;
      animate(liMask, index, 3);
    },
  },
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

.searchLog {
  margin: 10px 0;
}

.el-button {
  position: relative;
  top: 0;
  left: 0;

  &::before {
    content: "";
    display: inline-block;
    width: 2px !important;
    height: 20px;
    position: absolute;
    top: 9px;
    left: 2px;
    background-color: #ddd;
  }
}

/deep/ .el-input-group__append {
  border: none;
  background-color: #fff;
  border-radius: 20px;
  height: 30px;
}

/deep/ .el-input {
  border: 1px solid #ddd;
  border-radius: 20px;
  height: 30px;
}

/deep/.el-input__inner {
  border: none !important;
  height: 30px;
  border-radius: 20px;
}

.typeList {
  margin: 10px 0;

  ul {
    list-style: none;
    position: relative;
    left: 0;
    top: 0;

    li {
      padding: 0 25px;
      height: 39px;
      border-bottom: 1px solid #f8f9f7;
      transition: none;
      text-decoration: none;
      color: #787977;
      line-height: 39px;
      cursor: pointer;
    }
  }
}

.liMask {
  height: 39px;
  line-height: 39px;
  background-color: #eee;
  opacity: 0.4;
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  transition: all 5s linear;
  animation: all 5s linear;
  pointer-events: none;
  &::after {
    content: "";
    display: inline-block;
    width: 4px;
    height: 39px;
    background-color: #aaa;
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
