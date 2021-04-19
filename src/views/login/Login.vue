<template>
  <div class="loginPage">
    <div class="animated fadeIn login" v-if="showLogin">
      <h1><span>LOGIN</span></h1>
      <el-form :model="loginForm" :rules="LoginRules" ref="loginRef">
        <el-form-item prop="userName">
          <el-input
            v-model="loginForm.userName"
            class="userName inputStyle"
            type="text"
            placeholder="UserName"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input
            type="password"
            class="password inputStyle"
            v-model="loginForm.passWord"
            placeholder="PassWord"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          class="verCodeList"
          :class="{ opShow: verCodeSum, noShow: !verCodeSum }"
          prop="verCode"
        >
          <span>
            <el-input
              v-model="loginForm.verCode"
              type="text"
              placeholder="验证码"
              class="VerCode  inputStyle"
            ></el-input>
          </span>
          <span class="verImg" ref="verCodeNum">{{ verCodeNum }}</span>
        </el-form-item>
        <el-form-item
          class="verList"
          :class="{
            animatDown: verCodeSum,
            noDown: !verCodeSum,
            verList: statusnoverCodeSum,
            noverList: !statusnoverCodeSum,
          }"
        >
          <el-button @click="login" class="loginBtn">LOTIN</el-button>
          <el-button
            @click="register"
            class="regBtn"
            :class="{ r: registerStyle }"
            >R</el-button
          >
        </el-form-item>
        <el-form-item> </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { userLogin } from "@/api/user/user";
import { mapActions } from "vuex";
export default {
  name: "",
  components: {},
  data() {
    var checkVerCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入验证码"));
      } else if (value) {
        if (Number(value) !== this.verSum) {
          return callback(new Error("验证码不正确"));
        }
        callback();
      }
    };
    return {
      loginForm: {
        userName: "wwmimg",
        passWord: "wwm950107",
        verCode: "",
      },
      verCodeSum: false,
      verSum: 0,
      registerStyle: false,
      statusnoverCodeSum: true,
      verCodeNum: "",
      showLogin: false,
      LoginRules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        passWord: [{ required: true, message: "请输入密码", trigger: "blur" }],
        verCode: [{ validator: checkVerCode, trigger: "blur" }],
      },
    };
  },
  watch: {
    loginForm: {
      handler: function() {
        if (this.loginForm.userName && this.loginForm.passWord) {
          this.verCodeSum = true;
        } else if (!this.loginForm.userName && !this.loginForm.passWord) {
          this.verCodeSum = false;
          this.statusnoverCodeSum = false;
        }
      },
      deep: true,
    },
  },
  created() {
    if (this.loginForm.userName != null) this.verCodeSum = true;
    console.log(this.$store.state.user);
    this.getVerCode();
  },
  methods: {
    ...mapActions(["setUserAction", "setTokenAction", "setUserIdAction"]),
    getVerCode() {
      this.showLogin = true;
      let num1 = Math.floor(Math.random() * 100);
      let num2 = Math.floor(Math.random() * 100);
      this.verSum = num1 + num2;
      this.verCodeNum = `${num1} + ${num2}`;
    },
    login() {
      this.$refs.loginRef.validate(async (valid) => {
        if (valid) {
          let params = {
            userName: this.loginForm.userName,
            passWord: this.loginForm.passWord,
          };
          let res = await userLogin(params);
          if (res.meta.status === 200) {
            let userInfo = res.data;
            this.setUserAction(userInfo[0]);
            this.setUserIdAction(userInfo[0].userId);
            this.setTokenAction(res.meta.token);
            window.sessionStorage.setItem("Token", res.meta.token);
            window.sessionStorage.setItem("userName", userInfo[0].username);
            this.$notify.success(res.meta.msg);
            this.$router.push("/blog/myblog");
          } else if (res.meta.status === 201) {
            this.$message.error(res.meta.msg);
            this.registerStyle = true;
            this.resetForm();
          } else {
            this.$notify.error(res.meta.msg + ",请先注册");
            this.registerStyle = true;
            this.resetForm();
          }
        } else {
          return false;
        }
      });
    },
    register() {
      this.registerStyle = false;
    },
    resetForm() {
      this.$refs.loginRef.resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.loginPage {
  width: 100%;
  height: 100%;
  background: url("../../assets/img/loginBg.jpg") no-repeat;
  background-size: cover;
}

.login {
  width: 500px;
  height: 350px;
  padding: 30px;
  box-sizing: border-box;
  background-color: rgba(0, 10, 10, 0.1);
  color: #fff;
  font-size: 18px;
  text-align: center !important;
  font-family: sans-serif;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 24px;
  animation-duration: 3s;
}

.login h1 {
  color: #fff;
  text-transform: uppercase;
  font-weight: 500;
  margin: 0;

  /* margin-bottom: -10px; */
}

.login h1 span {
  cursor: pointer;
}

.el-form-item,
.el-form-item /deep/ .el-form-item__content {
  margin: 0;
  height: 50px !important;
  margin: 10px !important;
  line-height: 40px;
}

.el-form-item /deep/ .el-form-item__content .el-form-item__error {
  margin: -5px 0 0 110px;
}

.inputStyle {
  width: 400px !important;
}

.el-input {
  border: 0 !important;
  background-color: blue !important;
  height: 35px !important;
  background-color: none !important;
  width: 400px !important;
}

.el-input,
.el-form-item__content .el-input > .el-input__inner {
  background: none !important;

  margin: 10px auto !important;

  text-align: center !important;
  outline: none !important;
  color: #fff !important;
}

.userName /deep/ .el-input__inner:focus,
.password /deep/ .el-input__inner:focus {
  width: 300px !important;
  border-color: yellow !important;
}

.inputStyle /deep/ .el-input__inner {
  text-align: center !important;
  width: 200px !important;
  height: 35px !important;
  display: block !important;
  background: none !important;
  border: 2px solid skyblue !important;
  margin: 0 auto !important;
  border-radius: 24px !important;
  padding: 5px !important;
  text-align: center !important;
  outline: none !important;
  color: #fff !important;
  transition: all 0.5s !important;
}

.inputStyle /deep/ .el-input__inner::-webkit-input-placeholder {
  color: #fff !important;
}

.inputStyle /deep/ .el-input__inner::-moz-input-placeholder {
  color: #fff !important;
}

.inputStyle /deep/ .el-input__inner::-ms-input-placeholder {
  color: #fff !important;
}

.VerCode /deep/ .el-input__inner {
  width: 100px !important;
  display: inline-block !important;
  margin-top: -10px !important;
  position: absolute !important;
  top: 10px !important;
  left: 100px !important;
}

.verImg {
  display: inline-block !important;
  width: 80px !important;
  height: 20px !important;
  line-height: 25px !important;
  background: none !important;
  border: 2px solid skyblue !important;
  margin-top: 10px !important;
  border-radius: 24px !important;
  padding: 5px !important;
  text-align: center !important;
  outline: none !important;
  color: #fff !important;
  position: absolute !important;
  top: 0 !important;
  right: 100px !important;
  font-size: 18px !important;
  color: rgb(148, 156, 36) !important;
}

.verList .el-button {
  text-align: center !important;
  height: 35px !important;
  background: none !important;
  border: 2px solid skyblue !important;
  margin: 10px 5px !important;
  border-radius: 24px !important;
  padding: 5px !important;
  text-align: center !important;
  outline: none !important;
  color: #fff !important;
  transition: all 0.5s !important;
}

.verList .loginBtn {
  width: 100px;
  transition: all 0.5s !important;
}

.verList .regBtn {
  width: 35px;
  transition: all 0.5s !important;
}

.verList .loginBtn:hover {
  border-color: yellow !important;
  background-color: skyblue !important;
  color: yellow !important;
}

.verList .regBtn:hover {
  border-color: yellow !important;
  width: 90px;
  background-color: skyblue !important;
  color: yellow !important;
}
.r {
  border-color: yellow !important;
  background-color: skyblue !important;
  color: yellow !important;
}

.verList {
  position: relative;
  top: -60px;
  left: 0;
}

.noverList {
  position: relative;
  top: -5px;
  left: 0;
}

.animatDown {
  animation: showDowm 0.5s linear forwards;
}

.noDown {
  animation: noDowm 0.5s linear 0.5s forwards;
}

@keyframes showDowm {
  0% {
    top: -60px;
  }

  100% {
    top: -5px;
  }
}

@keyframes noDowm {
  0% {
    top: -5px !important;
  }

  100% {
    top: -60px;
  }
}

.verCodeList {
  opacity: 0;
}

.opShow {
  animation: showCode 0.5s linear 0.5s forwards;
}

.noShow {
  animation: noShowCode 0.5s linear forwards;
}

@keyframes showCode {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes noShowCode {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>
