<template>
  <el-card class="animated zoomIn artDetail"
    v-if="isShowPage">
    <div class="writeTitle">
      <img src="@/assets/img/writeBlog.png" alt="" />
    </div>
    <div class="writeForm">
      <el-form :model="writeForm"
        :rules="writeFormRules" ref="writeFormRef"
        label-width="100px" class="demo-ruleForm"
        :auto-upload="false">
        <el-form-item label="标题" prop="blogTitle">
          <el-input v-model="writeForm.blogTitle">
          </el-input>
        </el-form-item>
        <el-form-item label="封面图片" prop="blogImg"
          class="blogImg">
          <div class="block" v-if="imgUrl">
            <img :src="imgUrl" alt="no"
              style="width: 100px;height: 100px;" />
          </div>

          <el-upload
            :class="{upLoadBtn:true,upBtn:imgUrl}"
            action multiple :show-file-list="false"
            :http-request="(data) => handleAvatarSuccess(data, fileList)">
            <el-button size="small" type="primary">点击上传
            </el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg文件，且不超过2M
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="blog分类" prop="blogType"
          class="blogTy">
          <div class="checkClass">
            <el-checkbox-group
              v-model="writeForm.blogType">
              <el-checkbox :label="value" :name="value"
                v-for="(value, key) in writeForm.blogType"
                :key="key"></el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="addClass">
            <el-tag size="small" :key="tag"
              v-for="tag in dynamicTagsType" closable
              :disable-transitions="false"
              @close="handleClose(tag, 'type')">
              {{ tag }}
            </el-tag>
            <el-input class="input-new-tag"
              v-if="inputVisibleType"
              v-model="inputValueType"
              ref="saveTagInputType" size="small"
              @keyup.enter.native="handleInputConfirm('type')"
              @blur="handleInputConfirm('type')">
            </el-input>
            <el-button v-else class="button-new-tag"
              size="small" @click="showInput('type')">+
              New Type</el-button>
          </div>
        </el-form-item>

        <el-form-item label="blog标签" prop="blogTip"
          class="blogTy">
          <div class="checkClass">
            <el-checkbox-group
              v-model="writeForm.blogTip">
              <el-checkbox :label="value" :name="value"
                v-for="(value, key) in writeForm.blogTip"
                :key="key"></el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="addClass">
            <el-tag size="small" :key="tag"
              v-for="tag in dynamicTagsTip" closable
              :disable-transitions="false"
              @close="handleClose(tag)">
              {{ tag }}
            </el-tag>
            <el-input class="input-new-tag"
              v-if="inputVisibleTip"
              v-model="inputValueTip"
              ref="saveTagInputTip" size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm">
            </el-input>
            <el-button v-else class="button-new-tag"
              size="small" @click="showInput">+ New Tip
            </el-button>
          </div>
        </el-form-item>
        <el-form-item label="blog" class="blogArt"
          prop="blogContent">
          <div class="msg-input">
            <mavon-editor
              v-model="writeForm.blogContent" ref=md
              :toolbarsBackground="'#f9f9f9'"
              @imgAdd="$imgAdd" @imgDel="$imgDel" />
            <div class="clearF"></div>
          </div>
        </el-form-item>

      </el-form>
    </div>
    <div class="submitBtns">
      <el-button type="primary" @click="submitBlog"
        :loading="btnLoading">发 表</el-button>
      <el-button type="primary" @click="resetForm">
        重 写</el-button>
    </div>
  </el-card>
</template>

<script>
import { getBase64 } from "@/utils/changeBase64/changeBase";
import {
  addArtical,
  fileUpload,
  updateArticalById,
} from "@/api/artical/artical";
import tinymceEditor from "@/components/tinymce/editor.vue";
import axios from "axios";

import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "writeBlog",
  components: {
    tinymceEditor,
    mavonEditor,
  },
  data() {
    return {
      code_style: {
        scrollStyle: true,
      },
      //参数
      toolbars: {
        bold: true, // 粗体

        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: false, // 全屏编辑
        readmodel: false, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: false, // 预览
      },
      value: "",
      btnLoading: false,
      dynamicTagsType: [],
      dynamicTagsTip: [],
      inputVisibleType: false,
      inputVisibleTip: false,
      inputValueType: "",
      inputValueTip: "",
      isShowPage: false,
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      fileList: [],
      imgUrl: "",
      fileLoad: null,
      articalAuthor: "",
      articalId: null,
      writeForm: {
        blogTitle: "",
        blogImg: "",
        blogType: [],
        blogTip: [],
        blogContent: "",
      },
      writeFormRules: {
        blogTitle: [
          { required: true, message: "请填写文章标题", trigger: "blur" },
        ],
        blogImg: [
          { required: true, message: "请上传文章图片", trigger: "blur" },
        ],
        blogType: [
          { required: true, message: "请选择文章类型", trigger: "blur" },
        ],
        blogTip: [
          { required: true, message: "请选择文章标签", trigger: "blur" },
        ],
        blogContent: [
          { required: true, message: "请填写文章内容", trigger: "blur" },
        ],
      },
      img_file: {},
    };
  },
  watch: {
    value(val) {
      console.log(val);
    },
  },
  created() {
    console.log(this.$route.query);
    if (!this.$route.query.articalId) {
      console.log("===========");
      this.writeForm = {
        blogTitle: "",
        blogImg: "",
        blogType: [],
        blogTip: [],
        blogContent: "",
      };
      this.imgUrl = "";
    } else {
      let blogMsg = this.$store.state.artical.artical;
      console.log("++++++++++++", blogMsg);
      this.writeForm = {
        blogTitle: blogMsg.articalTitle,
        blogImg: blogMsg.articalImgs,
        blogType: blogMsg.articalType,
        blogTip: blogMsg.articalTip,
        blogContent: blogMsg.articalContent,
      };
      this.imgUrl = blogMsg.articalImgs;
      console.log("++++++++++++", this.imgUrl);
    }
    this.articalId = this.$route.query.articalId;
    this.articalAuthor = window.sessionStorage.getItem("userName");
    this.isShowPage = true;
  },
  mounted() {},
  methods: {
    $imgAdd(pos, $file) {
      console.log("============");
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("multipartFile", $file);
      this.img_file[pos] = $file;
      axios({
        url: "/fileUpload",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => {
        let _res = res.data;
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        this.$refs.md.$img2Url(pos, _res.avatar_url);
      });
    },
    $imgDel(pos) {
      delete this.img_file[pos];
    },
    handleClose(tag, type) {
      console.log(tag, type);
      if (type === "type")
        return this.dynamicTagsType.splice(
          this.dynamicTagsType.indexOf(tag),
          1
        );
      return this.dynamicTagsTip.splice(this.dynamicTagsTip.indexOf(tag), 1);
    },

    showInput(type) {
      if (type === "type") {
        this.inputVisibleType = true;
        this.$nextTick((_) => {
          this.$refs.saveTagInputType.$refs.input.focus();
        });
      } else {
        this.inputVisibleTip = true;
        this.$nextTick((_) => {
          this.$refs.saveTagInputTip.$refs.input.focus();
        });
      }
    },

    handleInputConfirm(type) {
      console.log("======");
      let inputValue = "";
      if (type === "type") {
        inputValue = this.inputValueType;
        this.writeForm.blogType.push(this.inputValueType);
      } else {
        inputValue = this.inputValueTip;
        this.writeForm.blogTip.push(this.inputValueTip);
      }
      if (!inputValue) return false;
      if (type === "type") {
        // this.dynamicTagsType.push(inputValue);
        this.inputVisibleType = false;
        this.inputValueType = "";
      } else {
        // this.dynamicTagsTip.push(inputValue);
        this.inputVisibleTip = false;
        this.inputValueTip = "";
      }
    },
    handleRemove(file, fileList) {},
    beforeUploadFile(fileList) {
      let isUpload = true;
      if (!fileList) return (isUpload = true);
      fileList.forEach((item) => {
        const isIMAGE =
          item.raw.type === "image/jpeg" ||
          item.raw.type === "image/gif" ||
          item.raw.type === "image/png";
        const isLt1M = item.size / 1024 / 1024 < 1;
        if (!isIMAGE) return (isUpload = false);
        if (!isLt1M) return (isUpload = false);
      });
      return isUpload;
    },
    imgChange(file, fileList) {
      // console.log(file, fileList);
      this.fileList = fileList;
    },
    handlePictureCardPreview(file, fileList) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    inputContent(value) {
      this.writeForm.blogContent;
    },
    handleAvatarSuccess(data) {
      if (!this.$store.state.user.userId || this.$store.state.user.userId == "")
        return this.$notify.warning("请登录，再进行操作");
      let file = data.file;
      if (!/image/.test(file.type))
        return this.$message.warning("请上传图片类型");
      const form = new FormData();
      form.append("multipartFile", file);
      fileUpload(form).then((res) => {
        console.log(res.meta);
        if (res.meta.status == "200") {
          this.imgUrl = res.avatar_url;
          this.writeForm.blogImg = res.avatar_url;
        }
      });
    },
    submitBlog(obj) {
      if (!this.$store.state.user.userId || this.$store.state.user.userId == "")
        return this.$notify.warning("请登录，再进行操作");
      this.$refs["writeFormRef"].validate((valid) => {
        if (!valid) return false;
        // this.writeForm.blogType.push(...this.dynamicTagsType);
        // this.writeForm.blogTip.push(...this.dynamicTagsTip);
        let params = {
          ...this.writeForm,
          articalAuthor: this.articalAuthor,
          userId: this.$store.state.user.userId,
        };
        this.btnLoading = true;
        console.log("+++++++", params);
        if (this.$route.query.articalId) {
          params.articalId = this.articalId;
          this.updateBlog(params);
        } else {
          this.insertBlog(params);
        }
      });
    },
    updateBlog(params) {
      console.log("----------000000000000");
      updateArticalById(params).then((res) => {
        this.btnLoading = false;
        if (res.meta.status == "200") {
          this.$notify.success("发表文章成功");
        }
        console.log(res);
        this.resetForm();
      });
    },
    insertBlog(params) {
      console.log("---------111111111111111");
      addArtical(params).then((res) => {
        this.btnLoading = false;
        if (res.meta.status == "200") {
          this.$notify.success("发表文章成功");
        }
        console.log(res);
        this.resetForm();
      });
    },
    resetForm() {
      this.writeForm = {
        blogTitle: "",
        blogImg: "",
        blogType: [],
        blogTip: [],
        blogContent: "",
      };
      this.imgUrl = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  width: 100%;
  padding: 15px;
}

.writeTitle {
  width: 100%;
  height: 60px;
  text-align: center;

  img {
    height: 80px;
  }
}
.upBtn /deep/ .el-upload .el-button {
  &:before {
    display: none !important;
  }
  &:after {
    display: none !important;
  }
}

.upLoadBtn /deep/ .el-upload .el-button {
  display: inline-block;
  height: 100px !important;
  width: 100px !important;
  background-color: rgba(0, 0, 0, 0);
  position: relative;
  top: 0;
  left: 0;
  &:before {
    content: "";
    display: inline-block;
    width: 70%;
    height: 3px;
    background-color: #eee;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
    &:hover {
      display: inline-block;
    }
  }
  &:after {
    content: "";
    width: 3px;
    display: inline-block;
    height: 70%;
    background-color: #eee;
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translate(-50%);
    &:hover {
      display: inline-block;
    }
  }
}
// .upLoadBtn /deep/ .el-upload .el-button ::before {
//   content: "";
//   width: 100%;
//   height: 5px;
//   background-color: #eee;
// }
.writeForm {
  width: 90%;
  margin: 15px 0;

  .el-form-item {
    height: 30px;
    margin-bottom: 15px;
  }

  .blogImg {
    position: relative;
    top: 0;
    left: 0;
    .upBtn {
      position: absolute;
      top: 0;
      left: 0;
      height: auto;
    }

    .block {
      height: 130px;
    }
    margin-top: 30px;
    height: 130px;
  }
}

.blogArt {
  height: 300px !important;
  height: auto;
}
.msg-input {
  // clear: both;
  overflow: hidden;

  height: 300px !important;

  .clearF {
    clear: both;
  }
}

.el-dialog {
  height: 200px;
  width: 200px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  vertical-align: bottom;
}
.addClass /deep/ .button-new-tag {
  margin-left: 15px !important;
}
.blogTy {
  display: flex;
  margin-top: 10px;
  .el-tag {
    margin-right: 15px !important;
  }
  div {
    display: inline-block;
    flex: 1;
  }
}
.blogTy /deep/ .el-form-item__content {
  margin-left: 0 !important;
}
.blogTy .el-checkbox:nth-last-of-type(1) {
  margin-right: 30px !important;
}
.submitBtns {
  text-align: center;
  clear: both;
}
.artDetail /deep/ .el-card__body {
  &:before {
    content: "";
    clear: both;
  }
}
</style>
