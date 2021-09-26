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
import { postAuthsApi, getAuthsApi } from "@/api/auths";
export default {
  data() {
    return {
      width: "140px",
      formConfig: [
        {
          label: "权限名称",
          width: "",
          field: "auth_name",
          type: "text",
          rules: [
            { required: true, message: "权限名称不能为空", trigger: "blur" },
            { min: 3, max: 6, message: "长度在 3-6 个字符", trigger: "blur" },
          ],
        },
        {
          label: "权限访问路径",
          width: "",
          field: "url",
          type: "text",
          rules: [
            {
              required: true,
              message: "权限访问路径不能为空",
              trigger: "blur",
            },
            { min: 1, max: 16, message: "长度在 1-26 个字符", trigger: "blur" },
          ],
        },
        {
          label: "所属父级",
          width: "",
          field: "auth",
          type: "select",
          payload: [
            { label: "后台首页", value: "1_后台首页" },
            { label: "商品分类", value: "2_商品分类" },
          ],
          rules: [
            {
              required: true,
              message: "所属父级不能为空",
              trigger: "blur",
            },
          ],
        },
        {
          label: "缓存组件",
          width: "",
          field: "keep_alive",
          type: "select",
          payload: [
            { label: "缓存", value: true },
            { label: "不缓存", value: false },
          ],
          rules: [
            {
              required: true,
              message: "缓存组件不能为空",
              trigger: "blur",
            },
          ],
        },
        {
          label: "权限组件路径",
          width: "",
          field: "component",
          type: "text",
          rules: [
            {
              required: true,
              message: "权限组件路径不能为空",
              trigger: "blur",
            },
            { min: 1, max: 26, message: "长度在 1-26个字符", trigger: "blur" },
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
  created() {
    getAuthsApi().then((res) => {
      console.log(res);
      // let temp = res.data.map((item) => {
      //   return {
      //     label: item.auth_name,
      //     value: `${item.auth_id}_${item.auth_name}`,
      //   };
      // });
      let temp = [];
      res.data.forEach((item) => {
        temp.push({
          label: item.auth_name,
          value: `${item.auth_id}_${item.auth_name}`,
        });
      });
      // this.formConfig[2].payload = res.data;
      console.log("temp", temp);
      this.formConfig[2].payload = temp;
    });
  },
  methods: {
    submitFn(formData) {
      console.log("提交了", formData);
      formData.auth_pid = formData.auth.split("_")[0];
      formData.auth_pname = formData.auth.split("_")[1];
      postAuthsApi(formData).then((res) => {
        if (res.meta.state == "201") {
          this.$message({
            message: res.meta.msg,
            type: "success",
          });
          this.jump("/auths");
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
