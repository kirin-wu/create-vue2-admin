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
      :row="row"
    />
  </el-dialog>
</template>

<script>
import { getAuthsApi, putAuthsApi } from "@/api/auths";
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
  },
  data() {
    return {
      width: "120px",
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
          field: "auth_pname",
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
            { label: "缓存", value: "1" },
            { label: "不缓存", value: "0" },
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
          content: "更新",
          type: "primary",
        },
        {
          content: "重置",
          type: "",
        },
      ],
      formData: {
        auth_name: "",
        url: "",
        auth: "",
        keep_alive: "",
        component: "",
      },
    };
  },
  created() {
    getAuthsApi().then((res) => {
      if (res.meta.state == 200) {
        let temp = res.data.map((item) => {
          return {
            label: item.auth_name,
            value: `${item.auth_id}_${item.auth_name}`,
          };
        });
        // console.log("temp", temp);
        this.formConfig[2].payload = temp;
      }
    });
  },
  methods: {
    submitFn(formData) {
      // console.log("更新数据处理", formData);
      // if (formData.auth) {
      //   formData.auth.pid = formData.auth.split("_")[0];
      //   formData.auth.pname = formData.auth.split("_")[1];
      // }
      putAuthsApi(formData).then((res) => {
        // console.log(res);
        if (res.meta.state == 200) {
          getAuthsApi();
          this.$message({
            type: "success",
            message: `${res.meta.msg}!`,
          });
          getAuthsApi();
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
