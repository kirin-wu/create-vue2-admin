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
            v-model="value"
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
        <el-form-item prop="username">
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
        <el-button
          class="login-btn"
          type="primary"
          @click="submitForm('ruleForm')"
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
          value: "选项1",
          label: "您父亲的姓名",
        },
        {
          value: "选项2",
          label: "您最喜欢的老师的姓名",
        },
        {
          value: "选项3",
          label: "您最喜欢的餐馆名称",
        },
        {
          value: "选项4",
          label: "您最想去的地方",
        },
      ],
      value: "",
      formdata: {
        question: "",
        answer: "",
        username: "",
        password: "",
      },
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.formdata);
        } else {
          console.log("error submit!!");
          console.log(2);
          return false;
        }
      });
    },
    saomaFn() {
      this.saomastate = true;
    },
    dialogFn() {},
  },
};
</script>
