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
      :row="row"
      @submit="submitFn"
    />
    <!-- <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span> -->
  </el-dialog>
</template>

<script>
import { putRolesApi } from "@/api/roles";
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
    initDateFn: {
      type: Function,
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
          field: "role_describe",
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
      // console.log("更新数据处理", formData);
      putRolesApi(formData).then((res) => {
        // console.log(res);
        if (res.meta.state == 200) {
          this.$message({
            type: "success",
            message: `${res.meta.msg}!`,
          });
          this.initDateFn();
          this.$emit("close");
        } else {
          this.$message({
            type: "error",
            message: `${res.meta.msg}!`,
          });
        }
      });
    },
    handleClose() {
      this.$emit("close");
    },
  },
};
</script>

<style></style>
