<template>
  <div class="rolesCreate">
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
          >创建</el-button
        >
      </div>
      <!-- 表单 -->
      <el-form
        :model="numberValidateForm"
        ref="numberValidateForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- #角色名称 -->
        <el-form-item
          label="角色名称"
          prop="rolesname"
          :rules="[
            { required: true, message: '角色名称不能为空' },
            { type: 'string', message: '角色名称为' },
          ]"
        >
          <el-input
            type="age"
            v-model.number="numberValidateForm.age"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- #角色类型 -->
        <el-form-item
          label="角色类型"
          prop="rolestype"
          :rules="[
            { required: true, message: '角色类型不能为空' },
            { type: 'string', message: '角色类型必须' },
          ]"
        >
          <el-input
            type="age"
            v-model.number="numberValidateForm.age"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('numberValidateForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('numberValidateForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<style lang="scss" scoped>
.rolesCreate {
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
      numberValidateForm: {
        rolesname: "",
        rolestype: "",
      },
      rules: {},
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
