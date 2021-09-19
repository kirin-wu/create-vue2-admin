<template>
  <div class="login">
    <div class="animated rotateIn">
      <el-form
        class="login-form"
        label-position="top"
        label-width="80px"
        :model="formdata"
        :rules="rules"
        ref="ruleForm"
      >
        <h2>B2C电商管理系统</h2>
        <el-form-item prop="username">
          <br />
          <el-input
            v-model="formdata.username"
            placeholder="请输入账号"
            prefix-icon="el-icon-s-custom"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formdata.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lollipop"
            clearable
            show-password
          ></el-input>
        </el-form-item>
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
.login {
  height: 100%;
  background: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    width: 300px;
    background: #fff;
    border-radius: 5px;
    padding: 30px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
<script>
export default {
  name: "Login",
  data() {
    return {
      formdata: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "长度在 3 到 16 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 8,
            max: 16,
            message: "长度在 8 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
          console.log(1);
        } else {
          console.log("error submit!!");
          console.log(2);
          return false;
        }
      });
    },
  },
};
</script>
