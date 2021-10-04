<template>
  <div class="login">
    <div class="animated slideInRight">
      <el-form
        class="login-form"
        label-position="top"
        label-width="80px"
        :model="formdata"
        :rules="rules"
        ref="ruleForm"
      >
        <h2>B2C电商管理系统</h2>
        <br />
        <el-form-item prop="mobile" ref="form">
          <el-input
            v-model="formdata.mobile"
            placeholder="请输入手机号"
            prefix-icon="el-icon-s-custom"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="formdata.code"
            placeholder="请输入验证码"
            prefix-icon="el-icon-lollipop"
            clearable
            ref="mobileCode"
            @click="subcodeFn"
          ></el-input>
        </el-form-item>
        <!-- ###获取验证码 -->
        <el-button
          class="code"
          @click="subcodeFn"
          ref="mobileCode"
          :disabled="buttonstate"
          >{{ codetime }}</el-button
        >
        <!-- ###返回 -->
        <el-button
          class="login-back"
          type="primary"
          icon="el-icon-back"
          @click="jump('./')"
        ></el-button>
        <!-- ###登录 -->
        <el-button
          class="login-btn"
          type="primary"
          @click="submitForm('ruleForm')"
          >登录</el-button
        >
      </el-form>
    </div>
  </div>
</template>
<style lang="scss" scoped>
::v-deep .el-icon-camera-solid {
  margin-left: -6px;
}
::v-deep .el-icon-mobile-phone {
  margin-left: -6px;
}
::v-deep .el-icon-s-claim {
  margin-left: -6px;
}
.login {
  height: 100%;
  background: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    position: relative;
    width: 300px;
    background: #fff;
    border-radius: 5px;
    padding: 30px;
  }
  .el-button {
    display: inline-block;
    margin-left: 5px;
  }
  .login-btn {
    width: 75%;
  }
  .login-back {
    width: 20%;
  }
  .code {
    position: absolute;
    bottom: 94px;
    right: 31px;
    border: none;
  }
}
</style>
<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      // 发送验证码
      codetime: "获取验证码",
      buttonstate: false,
      t: null,
      n: 10,
      formdata: {
        mobile: "",
        code: "",
      },
      rules: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "长度在11个字符",
            trigger: "blur",
          },
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  methods: {
    // ## 获取手机验证码
    ...mapActions({
      sendSms: "login/FETCH_SMS_SEND",
      loginSms: "login/FETCH_SMS_LOGIN",
    }),
    // ## 手机短信登录
    async submitForm() {
      let res = await this.loginSms(this.formdata);
      if (res.meta.state == 200) {
        this.$message({
          type: "success",
          message: `${res.meta.msg}!`,
        });
        this.jump("/");
      } else {
        this.$message({
          type: "error",
          message: `${res.meta.msg}!`,
        });
      }
    },
    // ## 获取手机验证码
    async subcodeFn() {
      // ### 正则验证手机号
      if (
        this.formdata.mobile.length == 11 &&
        /^1\d{10}$/.test(this.formdata.mobile)
      ) {
        let res = await this.sendSms({ mobile: this.formdata.mobile });
        // #### 接口状态码
        if (res.meta.state == 201) {
          this.buttonstate = true;
          this.t = setInterval(() => {
            this.n--;
            this.codetime = `重新获取（${this.n}）`;
            if (this.n == 0) {
              clearInterval(this.t);
              this.codetime = `发送验证码`;
              this.n = 10;
              this.buttonstate = false;
            }
          }, 1000);
          this.$message({
            type: "success",
            message: `${res.meta.msg}!`,
          });
        } else {
          this.$message({
            type: "error",
            message: `${res.meta.msg}!`,
          });
        }
      }
      // 正则验证手机号不对报错
      else {
        this.$notify.error({
          title: "错误",
          message: "手机号输入错误",
        });
      }
    },
  },
};
</script>
