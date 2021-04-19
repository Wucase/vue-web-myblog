<template>
  <el-card class="box-card">
    <el-row>
      <el-col :span="6" class="logoImg">
        <img src="@/assets/img/logo.png" alt="" class="logo" />
      </el-col>
      <el-col :span="12" class="ulList">
        <ul>
          <li
            v-for="(menu, index) in menuList"
            :key="index"
            :class="{ menuActive: index == menuActive }"
            @click="toPage(menu, index)"
          >
            {{ menu.label }}
          </li>
        </ul>
      </el-col>
      <el-col :span="6">
        <div class="userLogo">
          <div class="wechat">
            <el-popover
              ref="popover"
              placement="bottom"
              width="150"
              trigger="hover"
            >
              <img
                style="width: 150px;height: 150px;"
                src="@/assets/img/wechat.jpg"
                alt=""
              />
            </el-popover>
            <span class="iconfont icon-10wechat" v-popover:popover></span>
          </div>
          <div class="qq">
            <span class="iconfont icon-qq1" v-popover:popoverQq></span>
            <el-popover
              ref="popoverQq"
              placement="bottom"
              width="150"
              height="300"
              trigger="hover"
            >
              <img
                style="width: 150px;height: 250px;"
                src="@/assets/img/qq.png"
                alt=""
              />
            </el-popover>
          </div>
          <div class="avatar">
            <img src="@/assets/img/wangz.jpg" alt="" />
          </div>
          <div class="userName">
            <el-dropdown trigger="click" v-if="!isLogin">
              <el-link
                :underline="false"
                type="primary"
                class="el-dropdown-link"
                @click="toLogin"
              >
                {{ "登 录" }}
              </el-link>
            </el-dropdown>
            <el-dropdown trigger="click" @command="menuClick" v-else>
              <span class="el-dropdown-link">
                {{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(item, index) in options"
                  :key="index"
                  :command="item"
                >
                  {{ item.label }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-drawer
      title="我是标题"
      :visible.sync="loginOutDrawer"
      direction="ttb"
      :append-to-body="true"
      :with-header="false"
      size="50%"
    >
      <div class="loutImg">
        <img style="height: 150px; height: 150px;" :src="loginOutImg" alt="" />
      </div>

      <div class="btns">
        <el-button type="primary" plain @click="loginOut">滚</el-button>
        <el-button type="warning" plain @click="loginOutDrawer = false"
          >不 滚</el-button
        >
      </div>
    </el-drawer>
  </el-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "",
  components: {},
  data() {
    return {
      isLogin: false,
      menuActive: 0,
      userName: "",
      loginOutUrl: "",
      loginOutImg: null,
      loginOutDrawer: false,
      options: [
        {
          label: "个人中心",
          path: "",
        },
        {
          label: "修改密码",
          path: "",
        },
        {
          label: "退出登录",
          path: "",
        },
      ],
      menuList: [
        { label: "首页", path: "/" },
        { label: "博客", path: "/blog/myblog" },
        { label: "留言", path: "/blog/message" },
        { label: "日记", path: "/blog/diary" },
        { label: "友链", path: "/blog/friendlink" },
        { label: "关于", path: "/blog/about" },
        { label: "写Blog", path: "/blog/writeblog?" },
      ],
    };
  },
  watch: {
    $route() {
      if (this.$route.path.indexOf("writeblog") > -1)
        return (this.menuActive = 6);
      if (this.$route.path.indexOf("diary") > -1) return (this.menuActive = 3);
    },
  },
  created() {
    this.isLogin = window.sessionStorage.getItem("userName") ? true : false;
    this.init();
  },
  methods: {
    ...mapActions(["resetUserAction"]),
    menuClick(item) {
      console.log(item.label);
      switch (item.label) {
        case "个人中心":
          break;
        case "修改密码":
          break;
        case "退出登录":
          this.loginOutDrawer = true;
          this.loginOutImg = require("@/assets/img/loginOutImg/loginOut" +
            Math.floor(Math.random() * (6 - 1 + 1) + 1) +
            ".jpg");
          break;
      }
    },
    toPage(menu, index) {
      this.$router.push(menu.path);
      this.menuActive = index;
    },
    init() {
      this.userName = window.sessionStorage.getItem("userName");
      this.menuList.forEach((item, index) => {
        console.log(item, index);
        if (this.$route.path.indexOf(item.path) != -1)
          return (this.menuActive = index);
      });
    },
    loginOut() {
      this.loginOutDrawer = false;
      window.sessionStorage.clear();
      window.localStorage.clear();
      this.resetUserAction();
      this.$router.push("/");
    },
    toLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  height: 60px;

  .el-col {
    height: 60px;
  }
}

.el-card {
  border: none;
  height: 60px;
}

.ulList {
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
      cursor: pointer;
      position: relative;
      top: 0;
      left: 0;
      margin-right: 10px;

      &:after {
        content: "";
        width: 0;
        height: 2px;
        background-color: #6bc30d;
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
        color: #6bc30d;
      }
    }
  }
}

.menuActive {
  color: #6bc30d;

  &:after {
    width: 100% !important;
    left: 0 !important;
  }
}

.logo {
  height: 60px;
  margin-left: 100px;
  cursor: pointer;
}

.userLogo {
  display: flex;
  justify-content: flex-end;
  height: 60px;
  width: 100%;
}

.avatar {
  width: 40px;
  height: 60px;
  line-height: 60px;
  padding-top: 10px;
  margin-left: 30px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
  }
}

.userName {
  width: 100px;
  height: 40px;

  .el-dropdown {
    line-height: 60px;
    margin-left: 15px;
    cursor: pointer;
  }
}

.wechat {
  /* margin-left: 50px; */
}

.qq {
  /* margin-left: 10px; */
  .el-popover {
    text-align: center;

    img {
      height: 300px;
    }
  }
}

.wechat,
.qq {
  width: 50px;
  height: 60px;
  text-align: center;

  span {
    font-size: 28px;
    color: skyblue;
    line-height: 60px;
    cursor: pointer;
    &:hover {
      color: #6bc30d;
    }
  }
}

.el-dropdown-menu {
  margin-top: 0 !important;
}

.el-drawer {
  padding: 50px;
  .loutImg {
    text-align: center;
    margin: 35px 0;
  }
  .btns {
    text-align: center;
    margin: 35px 0;
  }
}
</style>
