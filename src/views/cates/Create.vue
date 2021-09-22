<template>
  <div class="authsCreate">
    <MtCard title="权限创建" url="/auths" btnName="返回">
      <MtFrom
        :width="width"
        :formConfig="formConfig"
        :formBtns="formBtns"
        @submit="submitFn"
      />
    </MtCard>
  </div>
</template>
<style lang="scss" scoped>
.authsCreate {
  width: 100%;
  height: 100%;
}
</style>
<script>
export default {
  data() {
    return {
      width: "140px",
      formConfig: [
        {
          label: "权限名称",
          width: "",
          field: "auths_name",
          type: "text",
          rules: [
            { required: true, message: "权限名称不能为空", trigger: "blur" },
            { min: 3, max: 6, message: "长度在 3-6 个字符", trigger: "blur" },
          ],
        },
        {
          label: "权限访问路径",
          width: "",
          field: "auths_url",
          type: "text",
          rules: [
            {
              required: true,
              message: "权限访问路径不能为空",
              trigger: "blur",
            },
            { min: 1, max: 16, message: "长度在 1-16 个字符", trigger: "blur" },
          ],
        },
        {
          label: "权限组件路径",
          width: "",
          field: "url",
          type: "text",
          rules: [
            {
              required: true,
              message: "权限组件路径不能为空",
              trigger: "blur",
            },
            { min: 1, max: 16, message: "长度在 1-16 个字符", trigger: "blur" },
          ],
        },
      ],
      formBtns: [
        {
          content: "创建",
          type: "primary",
        },
        {
          content: "重置",
          type: "",
        },
      ],
    };
  },
  methods: {
    submitFn(formData) {
      console.log("提交了", formData);
    },
  },
};
</script>
