<template>
  <el-dialog
    title="用户编辑"
    :visible.sync="state"
    width="60%"
    :before-close="handleClose"
    v-if="state"
  >
    <MtFrom
      :width="width"
      :formConfig="formConfig"
      :formBtns="formBtns"
      @submit="submitFn"
    />
  </el-dialog>
</template>

<script>
export default {
  props: {
    state: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      width: "120px",
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
          content: "更新",
          type: "primary",
        },
        {
          content: "重置",
          type: "",
        },
      ],
      formData: {
        role_name: "",
        role_desc: "",
      },
    };
  },
  methods: {
    submitFn(formData) {
      console.log("更新数据处理", formData);
    },
    handleClose() {
      this.$emit("close");
    },
  },
};
</script>

<style></style>
