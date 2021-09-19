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
          label: "用户名",
          width: "",
          field: "uname",
          type: "text",
          rules: [
            { required: true, message: "用户名必须填写", trigger: "blur" },
          ],
        },
        {
          label: "手机号",
          width: "",
          field: "mobile",
          type: "text",
          rules: [
            { required: true, message: "手机号必须填写", trigger: "blur" },
            {
              validator: (rule, value, callback) => {
                if (!/^1\d{10}$/.test(value)) return callback("手机号格式有误");
                return callback();
              },
            },
          ],
        },

        {
          label: "账号状态",
          field: "state",
          type: "select",
          payload: [
            { label: "正常", value: "true" },
            { label: "冻结", value: "false" },
          ],
          rules: [
            { required: true, message: "请选择账号状态", trigger: "blur" },
          ],
        },
        {
          label: "密保问题",
          field: "question",
          type: "select",
          payload: [
            { label: "母亲的名字", value: "母亲的名字" },
            { label: "爷爷的名字", value: "爷爷的名字" },
            { label: "您其中一位老师的名字", value: "老师的名字" },
            { label: "最喜欢餐馆的名字", value: "餐馆的名字" },
          ],
          rules: [{ required: true, message: "密保不能为空", trigger: "blur" }],
        },
        {
          label: "密保答案",
          width: "",
          field: "answer",
          type: "text",
          rules: [
            { required: true, message: "答案不能为空", trigger: "blur" },
            { min: 3, max: 6, message: "长度在3-6个字符", trigger: "blur" },
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
        uname: "",
        mobile: "",
        state: "",
        question: "",
        answer: "",
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
