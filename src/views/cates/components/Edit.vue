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
      :row="row"
      @submit="submitFn"
    />
  </el-dialog>
</template>

<script>
import { getCatesApi } from "@/api/cates";
// import { postCatesApi } from "@/api/cates";
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
          label: "分类名称",
          width: "",
          field: "cat_name",
          type: "text",
          rules: [
            { required: true, message: "分类名称不能为空", trigger: "blur" },
          ],
        },
        {
          label: "所属分类",
          width: "",
          type: "cascader",
          field: "pid",
          payload: {
            field: "pid",
            options: [
              {
                value: "zhinan",
                label: "指南",
                children: [
                  {
                    value: "shejiyuanze",
                    label: "设计原则",
                    children: [
                      {
                        value: "yizhi",
                        label: "一致",
                      },
                      {
                        value: "fankui",
                        label: "反馈",
                      },
                      {
                        value: "xiaolv",
                        label: "效率",
                      },
                      {
                        value: "kekong",
                        label: "可控",
                      },
                    ],
                  },
                ],
              },
            ],
            change: (value) => {
              console.log(value);
            },
          },
          rules: [
            { required: true, message: "所属分类不能为空", trigger: "blur" },
          ],
        },
        {
          label: "关键词",
          width: "",
          field: "keywords",
          type: "text",
          rules: [
            {
              required: true,
              message: "关键词不能为空",
              trigger: "blur",
            },
          ],
        },
        {
          label: "跳转网址",
          width: "",
          field: "url",
          type: "text",
          rules: [
            {
              required: true,
              message: "跳转网址不能为空",
              trigger: "blur",
            },
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
  created() {
    getCatesApi({
      pagesize: 1000,
      pagenum: 1,
      level: 2,
    }).then((res) => {
      // ##一级目录数据过滤
      let temp = res.data.list.map((item) => {
        if (item.children) {
          // ##二级目录数据数据
          var temp2 = item.children.map((item) => {
            return {
              label: item.cat_name,
              value: item.cat_id,
            };
          });
          console.log("children", temp2);
        }
        // ##返回一级目录数据和二级目录数据
        return {
          label: item.cat_name,
          value: item.cat_id,
          children: temp2,
        };
      });
      this.formConfig[1].payload.options = temp;
    });
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
