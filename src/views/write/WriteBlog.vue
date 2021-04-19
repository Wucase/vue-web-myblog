<template>
  <el-card class="animated zoomIn" v-if="isShowPage">
    <div class="writeTitle">
      <img src="@/assets/img/writeBlog.png" alt="" />
    </div>
    <div class="writeForm">
      <el-form
        :model="writeForm"
        :rules="writeFormRules"
        ref="writeFormRef"
        label-width="100px"
        class="demo-ruleForm"
        :auto-upload="false"
      >
        <el-form-item label="blog标题" prop="blogTitle">
          <el-input v-model="writeForm.blogTitle"></el-input>
        </el-form-item>
        <el-form-item label="blog图片" prop="blogImg" class="blogImg">
          <div class="block" v-if="imgUrl">
            <img
              :src="$getImage(imgUrl)"
              alt="no"
              style="width: 100px;height: 100px;"
            />
          </div>

          <el-upload
            class="upload-demo"
            action
            multiple
            :show-file-list="false"
            :http-request="(data) => handleAvatarSuccess(data, fileList)"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg文件，且不超过2M
            </div>
          </el-upload>
          <!-- <el-upload
            action
            list-type="picture-card"
            :auto-upload="false"
            :on-change="imgChange"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :http-request="(data) => handleAvatarSuccess(data, fileList)"
            :limit="1"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
          <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog> -->
        </el-form-item>
        <el-form-item label="blog" class="blogArt" prop="blogContent">
          <div class="msg-input">
            <tinymce-editor
              msgHeight="400px"
              ref="editor"
              v-model="writeForm.blogContent"
              :value="writeForm.blogContent"
              @input="inputContent"
            >
            </tinymce-editor>
          </div>
        </el-form-item>

        <el-form-item label="blog分类" prop="blogType" class="blogTy">
          <div class="checkClass">
            <el-checkbox-group v-model="writeForm.blogType">
              <el-checkbox
                :label="value"
                :name="value"
                v-for="(value, key) in writeForm.blogType"
                :key="key"
              ></el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="addClass">
            <el-tag
              size="small"
              :key="tag"
              v-for="tag in dynamicTagsType"
              closable
              :disable-transitions="false"
              @close="handleClose(tag, 'type')"
            >
              {{ tag }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisibleType"
              v-model="inputValueType"
              ref="saveTagInputType"
              size="small"
              @keyup.enter.native="handleInputConfirm('type')"
              @blur="handleInputConfirm('type')"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showInput('type')"
              >+ New Type</el-button
            >
          </div>
        </el-form-item>

        <el-form-item label="blog标签" prop="blogTip" class="blogTy">
          <div class="checkClass">
            <el-checkbox-group v-model="writeForm.blogTip">
              <el-checkbox
                :label="value"
                :name="value"
                v-for="(value, key) in writeForm.blogTip"
                :key="key"
              ></el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="addClass">
            <el-tag
              size="small"
              :key="tag"
              v-for="tag in dynamicTagsTip"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >
              {{ tag }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisibleTip"
              v-model="inputValueTip"
              ref="saveTagInputTip"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showInput"
              >+ New Tip</el-button
            >
          </div>
        </el-form-item>
        <el-form-item style="margin-top:25px;">
          <el-button type="primary" @click="submitBlog" :loading="btnLoading"
            >发 表</el-button
          >
          <el-button type="primary" @click="resetForm">重 写</el-button>
        </el-form-item>
      </el-form>
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
export default {
  name: "writeBlog",
  components: {
    tinymceEditor,
  },
  data() {
    return {
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
    };
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

.writeForm {
  width: 90%;
  margin: 15px 0;

  .el-form-item {
    height: 30px;
    margin-bottom: 15px;
  }

  .blogImg {
    margin-top: 30px;
    height: 140px;
  }
}

.blogArt,
.msg-input {
  margin-top: 10px;
  height: 400px !important;
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
  margin-left: 10px;
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
</style>
