<template>
  <div class="rolescreate">
    <MtCard title="角色创建" url="/roles" btnName="返回">
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
.rolesCreate {
  width: 100%;
  height: 100%;
}
</style>
<script>
import { postRolesCreateApi } from "@/api/roles.js";
export default {
  data() {
    return {
      width: "80px",
      formConfig: [
        {
          label: "角色名称",
          width: "",
          field: "role_name",
          type: "text",
          rules: [
            { required: true, message: "角色名称不能为空", trigger: "blur" },
            { min: 3, max: 6, message: "长度在 3-6 个字符", trigger: "blur" },
          ],
        },
        {
          label: "角色描述",
          width: "",
          field: "role_describe",
          type: "text",
          rules: [
            { required: true, message: "角色描述不能为空", trigger: "blur" },
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
      postRolesCreateApi(formData).then((res) => {
        console.log(res);
        if (res.meta.state == "201") {
          this.$message({
            message: res.meta.msg,
            type: "success",
          });
          this.jump("/roles");
        } else {
          this.$message({
            message: res.meta.msg,
            type: "error",
          });
        }
      });
    },
  },
};
</script>
