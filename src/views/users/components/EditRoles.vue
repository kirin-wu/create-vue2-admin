<template>
  <el-dialog
    title="分配角色"
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
          label: "当前用户",
          width: "",
          field: "uname",
          type: "text",
          disabled: true,
          rules: [
            { required: true, message: "用户名必须填写", trigger: "blur" },
          ],
        },
        {
          label: "当前角色",
          width: "",
          field: "role_name",
          type: "text",
          disabled: true,
          rules: [
            { required: true, message: "角色名必须填写", trigger: "blur" },
          ],
        },
        {
          label: "选择角色",
          field: "role_id",
          type: "select",
          payload: [
            { label: "超级管理员", value: "1" },
            { label: "财务", value: "2" },
            { label: "人事", value: "3" },
            { label: "普通用户", value: "4" },
          ],
          rules: [
            { required: true, message: "请选择账号状态", trigger: "blur" },
          ],
        },
      ],
      formBtns: [
        {
          content: "更新",
          type: "primary",
        },
        // {
        //   content: "重置",
        //   type: "",
        // },
      ],
      formData: {
        uname: "",
        role_name: "",
        role_id: "",
      },
    };
  },
  methods: {
    submitFn(formData) {
      console.log("更新数据处理", formData);
    },
    handleClose() {
      // done();
      this.$emit("close");
    },
  },
};
</script>

<style></style>
