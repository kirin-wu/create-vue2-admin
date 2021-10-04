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
        <el-form-item prop="account">
          <el-input
            v-model="formdata.account"
            placeholder="请输入手机号"
            prefix-icon="el-icon-s-custom"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="token">
          <el-input
            v-model="formdata.token"
            placeholder="请输入手机令牌"
            prefix-icon="el-icon-lollipop"
            clearable
            ref="accounttoken"
          ></el-input>
        </el-form-item>
        <!-- 获取验证码 -->
        <!-- <el-button
          class="token"
          @click="subtokenFn"
          ref="accounttoken"
          :disabled="buttonstate"
          >{{ tokentime }}</el-button
        > -->
        <!-- ###返回 -->
        <el-button
          class="login-back"
          type="primary"
          icon="el-icon-back"
          @click="jump('./')"
        ></el-button>
        <!-- ###登录 -->
        <el-button class="login-btn" type="primary" @click="submitForm"
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
::v-deep .el-icon-account-phone {
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
  .token {
    position: absolute;
    bottom: 93px;
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
      // 发送手机令牌
      tokentime: "获取手机令牌",
      buttonstate: false,
      t: null,
      n: 10,
      formdata: {
        account: "",
        token: "",
      },
      rules: {
        account: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "长度在11个字符",
            trigger: "blur",
          },
        ],
        token: [{ required: true, message: "请输入手机令牌", trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapActions({
      loginToken: "login/FETCH_TOKEN_LOGIN",
    }),
    // ## 手机令牌登录
    async submitForm() {
      console.log(this.formdata);
      let res = await this.loginToken(this.formdata);
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
    // subtokenFn() {
    //   this.buttonstate = true;
    //   this.t = setInterval(() => {
    //     this.n--;
    //     this.tokentime = `重新获取（${this.n}）`;
    //     if (this.n == 0) {
    //       clearInterval(this.t);
    //       this.tokentime = `发送手机令牌`;
    //       this.n = 10;
    //       this.buttonstate = false;
    //     }
    //   }, 1000);
    //   console.log("获取手机令牌");
    // },
  },
};
</script>
