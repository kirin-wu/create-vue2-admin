<template>
  <div class="storescreate">
    <!-- ##用户创建表单 -->
    <MtFrom :width="width" :formConfig="formConfig" />
    <!-- ##用户创建表单 -->
  </div>
</template>
<style lang="scss" scoped>
.storescreate {
  width: 100%;
  height: 100%;
  .el-card {
    width: 96%;
    margin: auto;
  }
}
</style>
<script>
export default {
  data() {
    return {
      width: "120px",
      // 标题、所属分类、所属地区、封面60x60、相册
      // 商家特色筛选
      // 人均价筛选
      // 优惠活动筛选

      formConfig: [
        {
          label: "所属分类",
          field: "cate_id",
          type: "cascader",
          rules: [
            { required: true, message: "标题不能为空", trigger: "blur" },
            { min: 3, max: 6, message: "长度在3-6个字符", trigger: "blur" },
          ],
          payload: {
            change: (value) => console.log(value),
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
                    ],
                  },
                  {
                    value: "daohang",
                    label: "导航",
                    children: [
                      {
                        value: "cexiangdaohang",
                        label: "侧向导航",
                      },
                      {
                        value: "dingbudaohang",
                        label: "顶部导航",
                      },
                    ],
                  },
                ],
              },
              {
                value: "zujian",
                label: "组件",
                children: [
                  {
                    value: "basic",
                    label: "Basic",
                    children: [
                      {
                        value: "layout",
                        label: "Layout 布局",
                      },
                      {
                        value: "color",
                        label: "Color 色彩",
                      },
                      {
                        value: "typography",
                        label: "Typography 字体",
                      },
                    ],
                  },
                  {
                    value: "form",
                    label: "Form",
                    children: [
                      {
                        value: "radio",
                        label: "Radio 单选框",
                      },
                      {
                        value: "checkbox",
                        label: "Checkbox 多选框",
                      },
                    ],
                  },
                  {
                    value: "data",
                    label: "Data",
                    children: [
                      {
                        value: "table",
                        label: "Table 表格",
                      },
                      {
                        value: "tag",
                        label: "Tag 标签",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
        {
          label: "所属地区",
          width: "",
          field: "cate_desc",
          type: "cascader",
          clearable: true,
          showPassword: true,
          rules: [
            { required: true, message: "密码不能为空", trigger: "blur" },
            { min: 3, max: 6, message: "长度在3-6个字符", trigger: "blur" },
          ],
          payload: {
            change: (value) => console.log(value),
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
                    ],
                  },
                  {
                    value: "daohang",
                    label: "导航",
                    children: [
                      {
                        value: "cexiangdaohang",
                        label: "侧向导航",
                      },
                      {
                        value: "dingbudaohang",
                        label: "顶部导航",
                      },
                    ],
                  },
                ],
              },
              {
                value: "zujian",
                label: "组件",
                children: [
                  {
                    value: "basic",
                    label: "Basic",
                    children: [
                      {
                        value: "layout",
                        label: "Layout 布局",
                      },
                      {
                        value: "color",
                        label: "Color 色彩",
                      },
                      {
                        value: "typography",
                        label: "Typography 字体",
                      },
                    ],
                  },
                  {
                    value: "form",
                    label: "Form",
                    children: [
                      {
                        value: "radio",
                        label: "Radio 单选框",
                      },
                      {
                        value: "checkbox",
                        label: "Checkbox 多选框",
                      },
                    ],
                  },
                  {
                    value: "data",
                    label: "Data",
                    children: [
                      {
                        value: "table",
                        label: "Table 表格",
                      },
                      {
                        value: "tag",
                        label: "Tag 标签",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
        {
          label: "商家特色",
          width: "",
          field: "filter1",
          type: "select",
          payload: [
            { label: "特殊1", value: "特殊1" },
            { label: "特殊2", value: "特殊2" },
            { label: "特殊3", value: "特殊3" },
            { label: "特殊4", value: "特殊4" },
          ],
          rules: [
            { required: true, message: "商家特色不能为空", trigger: "blur" },
            { min: 3, max: 6, message: "长度在3-6个字符", trigger: "blur" },
          ],
        },
        {
          label: "人均价格",
          width: "",
          field: "filter2",
          type: "select",
          payload: [
            { label: "特殊1", value: "特殊1" },
            { label: "特殊2", value: "特殊2" },
            { label: "特殊3", value: "特殊3" },
            { label: "特殊4", value: "特殊4" },
          ],
          rules: [
            {
              required: true,
              message: "人均价格不能为空",
              trigger: "blur",
            },
            { min: 3, max: 6, message: "长度在3-6个字符", trigger: "blur" },
          ],
        },
        {
          label: "优惠活动",
          width: "",
          field: "filter3",
          type: "text",
          clearable: true,
          showPassword: true,
          rules: [
            { required: true, message: "密码不能为空", trigger: "blur" },
            { min: 3, max: 6, message: "长度在3-6个字符", trigger: "blur" },
          ],
        },
      ],
      formData: {
        uname: "",
        pwd: "",
        question: "",
        answer: "",
      },
    };
  },
};
</script>
