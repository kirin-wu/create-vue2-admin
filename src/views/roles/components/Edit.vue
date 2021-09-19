<template>
  <el-dialog
    title="用户编辑"
    :visible.sync="state"
    width="30%"
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
      width: "80px",
      formConfig: [
        {
          label: "角色名",
          width: "",
          field: "role_name",
          type: "text",
          rules: [
            { required: true, message: "用户名必须填写", trigger: "blur" },
          ],
        },
        {
          label: "角色描述",
          width: "",
          field: "role_desc",
          type: "text",
          rules: [
            { required: true, message: "用户名必须填写", trigger: "blur" },
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
