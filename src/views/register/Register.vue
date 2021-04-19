<template>
  <div class="menu">
    <div class="mainMenu">
      <div class="menu-item">
        <span class="btn"
          ><myBtn :btnOptions="btnOptions" @btnClick="btnClick(item)"></myBtn
        ></span>
      </div>
    </div>
    <div class="dialog">
      <el-button type="text" @click="dialogVisible = true"
        >点击打开 Dialog</el-button
      >
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { client } from "@/utils/commonFun/myFun.js";
export default {
  name: "register",
  data() {
    return {
      dialogVisible: false,
      isClick: false,
      btnData: [
        { name: "bb", value: "12" },
        { name: "aa", value: "34" },
      ],
      btnOptions: [
        { label: "首页", path: "/home" },
        { label: "登录", path: "/home" },
        { label: "注册", path: "/home" },
      ],
    };
  },
  methods: {
    btnClick(e) {
      this.isClick = true;
      let left = Math.ceil(client().width / 2);
      let top = Math.ceil(client().height / 2);
    },
  },
};
</script>

<style lang="scss" scoped>
.menu {
  width: 100%;
  height: 100%;
}
.mainMenu {
  padding: 0;
  margin: 0;
  width: 20%;
  height: 100%;
  background: rgba(7, 17, 27, 0.5);
  position: absolute;
  top: 0;
  right: 0;
  .menu-item {
    width: 100%;
    background-color: #00ffff;
    position: relative;
    top: 0;
    left: 0;
    /* margin-top: 100px; */
    /* .plane {
        position: absolute;
        top: 17px;
        left:30px;
        background-image: -webkit-linear-gradient(90deg, #2af598, #009efd);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        display: none;
      } */
    .btn {
      position: absolute;
      top: 10px;
      left: 75px;
    }
  }
}
.btnClickStyle {
  display: block !important;
}
</style>
<!-- 
<transition name="fade" mode="out-in">
  <keep-alive :include="cachedViews">
    <router-view v-if="isAlive">></router-view>
  </keep-alive>
</transition> -->
