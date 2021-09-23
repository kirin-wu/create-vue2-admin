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
        <el-form-item prop="mobile">
          <el-input
            v-model="formdata.mobile"
            placeholder="请输入手机号"
            prefix-icon="el-icon-s-custom"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="mobile_code">
          <el-input
            v-model="formdata.mobile_code"
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
        mobile_code: "",
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
        mobile_code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.formdata);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    subcodeFn() {
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
      console.log("获取验证码");
    },
  },
};
</script>
