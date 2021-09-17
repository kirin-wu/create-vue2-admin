<template>
  <div class="users">
    <!-- ### 卡片 -->
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <!-- ### 添加用户 -->
        <span>用户创建</span>
        <el-button
          style="float: right;margin-top:-8px ;padding: 3px 0 width:70px"
          :round="true"
          type="primary"
          >返回</el-button
        >
        <!-- #用户创建表单 -->
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="密保问题" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="您父亲的名字" value="father"></el-option>
            <el-option label="您母亲的名字" value="mother"></el-option>
            <el-option label="您出生的城市" value="city"></el-option>
            <el-option label="您其中一位老师的名字" value="teacher"></el-option>
            <el-option label="您最喜欢的餐馆名称" value="guanzi"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密保答案" prop="question">
          <el-input v-model="ruleForm.question"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<style lang="scss" scoped>
.users {
  width: 100%;
  height: 100%;
  .el-card {
    width: 96%;
    margin: auto;
  }
}
</style>
<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        password: "",
        question: "",
        region: "",
        delivery: false,
        type: [],
      },
      rules: {
        name: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        question: [
          { required: true, message: "请输入密保答案", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
