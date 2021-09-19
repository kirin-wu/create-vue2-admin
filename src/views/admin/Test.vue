<template>
  <div class="test">
    <MtFrom
      :width="width"
      :formConfig="formConfig"
      :formBtns="formBtns"
      @submit="submit2Fn"
    />
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      width: "80px",
      formConfig: [
        {
          label: "账号",
          width: "",
          field: "uname",
          type: "text",
          rules: [
            { required: true, message: "账号不能为空", trigger: "blur" },
            { min: 3, max: 6, message: "长度在3-6个字符", trigger: "blur" },
          ],
        },
        {
          label: "密码",
          width: "",
          field: "pwd",
          type: "password",
          rules: [
            // { required: true, message: "密码不能为空", trigger: "blur" },
            // { min: 3, max: 6, message: "长度在3-6个字符", trigger: "blur" },
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
      ],
      formBtns: [
        { content: "登录", type: "primary" },
        { content: "重置", type: "" },
      ],
      formData: {
        uname: "",
        pwd: "",
      },
    };
  },
  methods: {
    submit2Fn(formData) {
      console.log("提交了", formData);
    },
  },
};
</script>

<style></style>
