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
        <br />
        <el-form-item prop="question">
          <el-select
            v-model="formdata.question"
            placeholder="请选择密保"
            style="width: 100%"
            prop="question"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="answer">
          <el-input
            v-model="formdata.answer"
            placeholder="请输入密保答案"
            prefix-icon="el-icon-lollipop"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="uname">
          <el-input
            v-model="formdata.uname"
            placeholder="请输入账号"
            prefix-icon="el-icon-s-custom"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formdata.pwd"
            placeholder="请输入密码"
            prefix-icon="el-icon-lollipop"
            clearable
            show-password
          ></el-input>
        </el-form-item>
        <el-button
          @click="saomaFn"
          type="primary"
          icon="el-icon-camera-solid"
          class="login-qr"
        ></el-button>
        <el-button
          type="primary"
          icon="el-icon-mobile-phone"
          class="login-moblie"
          @click="jump('/login/sms')"
        ></el-button>
        <el-button
          type="primary"
          icon="el-icon-s-claim"
          class="login-moblie"
          @click="jump('/login/token')"
        ></el-button>
        <el-button class="login-btn" type="primary" @click="submitForm()"
          >登录</el-button
        >
      </el-form>
      <QrCode
        :state="saomastate"
        @close="saomastate = false"
        @sure="saomastate = false"
      />
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
  position: relative;
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
  .el-button {
    display: inline-block;
    margin-left: 5px;
  }
  .login-qr {
    width: 5%;
  }
  .login-moblie {
    width: 5%;
  }
  .login-btn {
    width: 50%;
  }
}
</style>
<script>
import QrCode from "./components/QrCode.vue";
// import { postLoginApi } from "@/api/login";
import { mapActions } from "vuex";
export default {
  components: {
    QrCode,
  },
  name: "Login",
  data() {
    return {
      saomastate: false,
      options: [
        {
          value: "您父亲的姓名",
          label: "您父亲的姓名",
        },
        {
          value: "您其中一位老师的名字",
          label: "您其中一位老师的名字",
        },
        {
          value: "您最喜欢的餐馆名称",
          label: "您最喜欢的餐馆名称",
        },
        {
          value: "您最想去的地方",
          label: "您最想去的地方",
        },
      ],
      value: "",
      formdata: {},
      rules: {
        question: [
          { required: true, message: "请选择密保问题", trigger: "blur" },
        ],
        answer: [
          { required: true, message: "请输入密保答案", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "长度在 3 到 16 个字符",
            trigger: "blur",
          },
        ],
        uanme: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "长度在 3 到 16 个字符",
            trigger: "blur",
          },
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "长度在 3 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions({
      login: "login/FETCH_MB_LOGIN",
    }),
    async submitForm() {
      // ##请求接口数据
      let res = await this.login(this.formdata);
      // console.log(res);
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
    saomaFn() {
      this.saomastate = true;
    },
    dialogFn() {},
  },
};
</script>
