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
      :row="row"
    />
  </el-dialog>
</template>

<script>
import { getRolesApi } from "@/api/roles.js";
import { putUserRoleApi } from "@/api/users.js";
export default {
  props: {
    state: {
      type: Boolean,
      default: false,
    },
    row: {
      type: Object,
      required: true,
    },
    initDataFn: {
      type: Function,
    },
  },
  data() {
    return {
      width: "80px",
      formConfig: [
        {
          label: "当前用户",
          width: "",
          field: "username",
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
          rules: [],
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
        username: "",
        role_name: "",
        role_id: "",
      },
    };
  },
  created() {
    getRolesApi().then((res) => {
      let temp = res.data.map((item) => {
        return {
          label: item.role_name,
          value: item.role_id,
        };
      });
      this.formConfig[2].payload = temp;
      console.log(this.formConfig[2].payload);
    });
  },
  methods: {
    submitFn(formData) {
      console.log("更新数据处理", formData);
      putUserRoleApi(formData).then((res) => {
        if (res.meta.state == "200") {
          this.$message({
            message: res.meta.msg,
            type: "success",
          });
          this.initDataFn();
          this.$emit("close");
        } else {
          this.$message({
            message: res.meta.msg,
            type: "error",
          });
          this.$emit("close");
        }
      });
    },
    handleClose() {
      // done();
      this.$emit("close");
    },
  },
};
</script>

<style></style>
