<template>
  <div class="userscreate">
    <!-- # 卡片 -->
    <el-card class="box-card">
      <!-- ##头部 -->
      <div slot="header" class="clearfix">
        <!-- ### 添加用户 -->
        <span>用户创建</span>
        <el-button
          style="float: right;margin-top:-8px ;padding: 3px 0 width:70px"
          :round="true"
          type="primary"
          @click="jump('/users')"
          >返回</el-button
        >
      </div>
      <!-- ##用户创建表单 -->
      <MtFrom
        :width="width"
        :formConfig="formConfig"
        :formBtns="formBtns"
        @submit="submitFn"
      />
      <!-- ##用户创建表单 -->
    </el-card>
  </div>
</template>
<style lang="scss" scoped>
.userscreate {
  width: 100%;
  height: 100%;
  .el-card {
    width: 96%;
    margin: auto;
  }
}
</style>
<script>
import { postUsersCreateApi } from "@/api/users.js";
export default {
  data() {
    return {
      width: "80px",
      formConfig: [
        {
          label: "账号",
          width: "",
          field: "username",
          type: "text",
          clearable: true,
          rules: [
            { required: true, message: "账号不能为空", trigger: "blur" },
            { min: 3, max: 6, message: "长度在3-6个字符", trigger: "blur" },
          ],
        },
        {
          label: "密码",
          width: "",
          field: "password",
          type: "password",
          clearable: true,
          showPassword: true,
          rules: [
            { required: true, message: "密码不能为空", trigger: "blur" },
            { min: 3, max: 16, message: "长度在3-16个字符", trigger: "blur" },
            // ### 自定义规则
            {
              validator: (rule, value, callback) => {
                if (!value) {
                  return callback("请输入密码");
                }
                return callback();
              },
              trigger: "blur",
            },
          ],
        },
        {
          label: "手机号",
          width: "",
          field: "mobile",
          type: "text",
          clearable: true,
          rules: [
            { required: true, message: "手机号不能为空", trigger: "blur" },
            { min: 11, max: 11, message: "长度在11个字符", trigger: "blur" },
          ],
        },
        {
          label: "密保问题",
          width: "",
          field: "question",
          type: "select",
          payload: [
            { label: "母亲的名字", value: "母亲的名字" },
            { label: "爷爷的名字", value: "爷爷的名字" },
            { label: "您其中一位老师的名字", value: "老师的名字" },
            { label: "您最喜欢餐馆的餐馆名称", value: "餐馆的名字" },
          ],
          rules: [
            { required: true, message: "密保不能为空", trigger: "blur" },
            { min: 3, max: 6, message: "长度在3-6个字符", trigger: "blur" },
          ],
        },
        {
          label: "密保答案",
          width: "",
          field: "answer",
          type: "text",
          rules: [
            { required: true, message: "答案不能为空", trigger: "blur" },
            { min: 3, max: 6, message: "长度在3-6个字符", trigger: "blur" },
          ],
        },
      ],
      formBtns: [
        { content: "创建", type: "primary" },
        { content: "重置", type: "" },
      ],
      formData: {
        username: "",
        password: "",
        question: "",
        answer: "",
      },
      params: {
        username: "",
        password: "",
        question: "",
        answer: "",
        mobile: "",
      },
    };
  },
  methods: {
    initDateFn() {
      postUsersCreateApi(this.params).then((res) => {
        console.log(res);
        if (res.meta.state == "201") {
          this.$message({
            message: res.meta.msg,
            type: "success",
          });
          this.jump("/users");
        } else {
          this.$message({
            message: res.meta.msg,
            type: "error",
          });
        }
      });
    },
    submitFn(formData) {
      this.params = formData;
      this.initDateFn();
    },
  },
};
</script>
