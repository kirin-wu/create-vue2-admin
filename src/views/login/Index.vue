<template>
  <div class="login">
    <div class="animated rotateIn">
      <el-form
        class="login-form"
        label-position="top"
        label-width="80px"
        :model="formdata"
      >
        <h2>B2C电商管理系统</h2>
        <el-form-item>
          <br />
          <el-input
            v-model="formdata.username"
            placeholder="请输入账号"
            prefix-icon="el-icon-s-custom"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="formdata.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lollipop"
          ></el-input>
        </el-form-item>
        <el-button class="login-btn" type="primary">登录</el-button>
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
}
.login-form {
  width: 300px;
  background: #fff;
  border-radius: 5px;
  padding: 30px;
}
.login-btn {
  width: 100%;
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
    };
  },
};
</script>
