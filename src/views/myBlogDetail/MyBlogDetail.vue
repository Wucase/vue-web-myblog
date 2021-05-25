<template>
  <div class="ArtDetail">
    <el-card
      class="animated zoomIn box-card titleCard">
      <el-row class="detail-title">
        <el-col :span="12">
          <div class="title">
            {{ articalInfo.articalTitle }}
          </div>
          <div class="author">
            作者：<el-link type="primary"
              :underline="false">{{
              articalInfo.articalAuthor
            }}</el-link><span> 更新于
              {{ $timeService(articalInfo.articalDate) }}</span>
          </div>
        </el-col>
        <el-col :span="12" class="time">
          <div>
            <div class="day">{{ articalInfo.day }}
            </div>
            <div>
              <span
                class="month">{{ articalInfo.month }}</span>
              <span
                class="year">{{ articalInfo.year }}</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <!-- <div class="dividerList animated zoomIn">
      <el-row :gutter="20">
        <el-col :span="1" v-for="item in 24"
          :key="item">
          <div :class="{ active: item == activeIndex }"
            class="grid-content bg-purple"></div>
        </el-col>
      </el-row>
    </div> -->
    <!-- 文章主体 -->
    <el-card
      class="animated zoomIn box-card articalCard">
      <div id="content"
        v-html="articalInfo.articalContent">

      </div>
    </el-card>

    <!-- 版权 -->
    <el-card class="animated zoomIn box-card fromCard">
      <el-row>
        <el-col :span="14">
          非特殊说明，本文版权归
          <el-link type="primary" :underline="false">{{
            articalInfo.articalAuthor
          }}</el-link>
          所有，转载请注明出处.<br />
          本文标题： <span style="color: #6bc30d;">
            路由懒加载</span><br />
          本文网址：
          <el-link type="primary" :underline="false">
            {{ articalUrl }}</el-link><br />
        </el-col>
        <el-col :span="10" class="iconShare">
          <span class="iconfont icon-10wechat"></span>
          <span class="iconfont icon-qq1"></span>
          <!-- <span class="iconfont icon-pengyouquan-copy"></span> -->
          <span class="iconfont icon-weibo"></span>
          <span style="font-size: 36px;"
            class="iconfont icon-tubiaozhizuomobanyihuifu-"
            title="修改Blog" @click="blogEdit"></span>
          <span style="font-size: 36px;" title="删除Blog"
            class="iconfont icon-46shanchu"
            @click="blogDelete"></span>
          <!-- <span class="iconfont icon-QQkongjian"></span> -->
        </el-col>
      </el-row>
    </el-card>

    <!-- 写留言 -->
    <el-card
      class="animated zoomIn box-card writeCard">
      <div class="msg-input">
        <tinymce-editor style="background-color: #ddd;"
          ref="editor" v-model="tinymceHtml"
          :value="tinymceHtml" @input="inputMsg">
        </tinymce-editor>
      </div>
      <div class="btns">
        <el-button type="success" icon="el-icon-check"
          circle :loading="btnLoading"
          @click="submitMsg"></el-button>
        <el-button type="danger" icon="el-icon-close"
          circle @click="tinymceHtml = ''"></el-button>
      </div>
    </el-card>

    <!-- 留言列表 -->

    <leave-msg v-if="isShowMsg"
      :msgDataList="msgDataList"></leave-msg>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { getArticalById } from "@/api/artical/artical";
import { addMsg, getMsgById } from "@/api/msg/msg";
import tinymceEditor from "@/components/tinymce/editor.vue";
import LeaveMsg from "@/components/leaveMsg/LeaveMsg.vue";
import { addCodeBtn } from "@/plugins/mavonEditor/mavon";

import hljs from "highlight.js";
import marked from "marked";
export default {
  name: "",
  components: {
    tinymceEditor,
    LeaveMsg,
  },
  data() {
    return {
      isShowMsg: false,
      btnLoading: false,
      msgDataList: [],
      articalId: "",
      activeIndex: 0,
      timer: null,
      tinymceHtml: "",
      articalInfo: {},
      articalUrl: window.location.href,
    };
  },
  created() {
    this.articalId = this.$route.params.id;
    this.slideLight();
    this.getDataByID();
    this.getMsgList();
  },
  mounted() {
    hljs.highlightCode();
    this.$nextTick((_) => {
      addCodeBtn();
    });
  },
  methods: {
    ...mapActions(["setArticalAction"]),
    //修改blog
    blogEdit() {
      this.setArticalAction(this.articalInfo);
      this.$router.push({
        path: "/blog/writeblog",
        query: {
          articalId: this.articalId,
        },
      });
    },
    //删除blog
    blogDelete() {},
    getDataByID() {
      let params = {
        articalId: this.articalId,
      };
      console.log(params);

      getArticalById(params).then((res) => {
        if (res.meta.status == "200") {
          this.articalInfo = res.data[0];
          this.articalInfo.articalContent = marked(
            this.articalInfo.articalContent || "",
            {
              sanitize: true,
            }
          );
          this.articalInfo.articalDate = this.$timeService(
            this.articalInfo.articalDate
          );
          let ymdArr = this.articalInfo.articalDate.split(" ");
          if (!ymdArr) return false;
          let artYmd = ymdArr[0];
          let arrSplit = artYmd.split("-");
          this.articalInfo.year = arrSplit[0];
          this.articalInfo.month = arrSplit[1];
          this.articalInfo.day = arrSplit[2];
          console.log(this.articalInfo);
          this.$nextTick((_) => {
            addCodeBtn();
          });
        } else {
          this.$message.error("err");
        }
      });
    },
    getMsgList() {
      let params = {
        articalId: this.articalId,
      };
      getMsgById(params).then((res) => {
        console.log(res);
        this.msgDataList = res.data;
        this.isShowMsg = true;
      });
    },
    submitMsg() {
      // if (!this.$store.state.user.userId || this.$store.state.user.userId == "")
      //   return this.$notify.warning("请登录，再进行操作");
      // if (!this.tinymceHtml) return this.$notify.warning("请输入留言！");
      // let params = {
      //   articalId: this.articalId,
      //   msgContent: this.tinymceHtml,
      //   userName: window.sessionStorage.getItem("userName"),
      //   userImg:
      //     "/public/updata/images/upload_c8aab80f675d6220c664a2584b8daca7.jpg",
      // };
      // this.btnLoading = true;
      // addMsg(params).then((res) => {
      //   console.log(res);
      //   this.btnLoading = false;
      //   if (res.meta.status == "200") {
      //     this.isShowMsg = false;
      //     this.getMsgList();
      //     this.tinymceHtml = "";
      //     this.$notify.success("留言成功");
      //   }
      // });
    },
    slideLight() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.activeIndex++;
        if (this.activeIndex > 24) {
          this.activeIndex = 0;
        }
      }, 500);
    },
    inputMsg(value) {
      this.tinymceHtml = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.ArtDetail {
  width: 75%;
  margin: 0 auto;
}
.el-card {
  padding: 20px;
  margin-bottom: 15px;
}

.titleCard {
  padding-bottom: 10px;
}

.detail-title {
  /* height: 100px; */
  /* background-color: #aaa; */
  .title {
    font-size: 19px;
    line-height: 46px;
    color: #6bc30d;
  }

  .author {
    font-size: 14px;
    line-height: 10px;

    .el-link {
      margin-right: 20px;
    }
  }
}

.dividerList {
  margin-bottom: 15px;

  .el-row {
    display: flex;
    justify-content: space-between;
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #fff;
  }

  .bg-purple {
    background: #fff;
  }

  .grid-content {
    width: 20px;
    height: 10px;
  }
}

.active {
  background-color: #6bc30d !important;
}

.articalCard {
  height: 500px;
}

.iconShare {
  span {
    color: skyblue;
    line-height: 60px;
    font-size: 40px;
    margin: 0 20px;
    cursor: pointer;
    &:hover {
      color: #6bc30d;
    }
  }
}

.msg-input {
  width: 100%;
  /* background-color: #ddd; */
}

.btns {
  text-align: left;
  margin-top: 15px;
}
.time {
  text-align: right;
}
.day {
  font-size: 35px;
  line-height: 35px;
  padding-right: 32px;
  color: #6bc30d;
}
.month,
.year {
  font-size: 20px;
  margin: 15px 5px;
  line-height: 35px;
  color: #ddd;
}
#content /deep/ pre.code {
  position: relative !important;
  border-radius: 3px !important;
  border: 1px solid #c3ccd0 !important;
  overflow: hidden;
  background-color: rgb(40, 42, 54);
  padding: 10px 0;
  box-sizing: border-box;
  color: #fff;
  padding-left: 60px !important;
  code {
    line-height: 30px !important;
  }
  ol.pre-numbering {
    position: absolute !important;
    top: 0 !important;
    left: 5px !important;
    padding-top: 10px;
    line-height: 30px;
    list-style-type: none;
    counter-reset: sectioncounter;
    margin-bottom: 0;
    li {
      margin-top: 0 !important;
      color: #fff;
      &:before {
        content: counter(sectioncounter) "";
        counter-increment: sectioncounter;
        display: inline-block;
        width: 40px;
        text-align: center;
        border-right: solid 1px rgba(255, 255, 255, 0.7);
      }
    }
  }
  i.code-copy {
    position: absolute;
    top: 0;
    right: 0;
    background-color: #464d5e;
    padding: 3px;
    margin: 3px 3px 0 0;
    font-size: 11px;
    border-radius: inherit;
    color: #f1f1f1;
    cursor: pointer;
    display: none;
  }
  &:hover i.code-copy {
    display: block;
  }
}
</style>
