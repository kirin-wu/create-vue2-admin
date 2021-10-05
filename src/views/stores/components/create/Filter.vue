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
import { getCatesApi } from "@/api/cates";
import { getAreasApi } from "@/api/areas";
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
          rules: [{ required: true, message: "标题不能为空", trigger: "blur" }],
          payload: {
            change: (value) => console.log(value),
            props: { label: "cat_name", value: "cat_id" },
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
          field: "area_id",
          type: "cascader",
          clearable: true,
          showPassword: true,
          rules: [{ required: true, message: "密码不能为空", trigger: "blur" }],
          payload: {
            change: (value) => console.log(value),
            props: { label: "area_name", value: "area_id" },
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
          field: "sjts",
          type: "select",
          payload: [
            { label: "免费配送", value: "免费配送" },
            { label: "新商家", value: "新商家" },
            { label: "品牌商家", value: "品牌商家" },
            { label: "支持开票", value: "支持开票" },
          ],
          rules: [
            { required: true, message: "商家特色不能为空", trigger: "blur" },
            { min: 3, max: 6, message: "长度在3-6个字符", trigger: "blur" },
          ],
        },
        {
          label: "人均价格",
          width: "",
          field: "rjj",
          type: "select",
          payload: [
            { label: "全部", value: "全部" },
            { label: "20元以下", value: "20元以下" },
            { label: "20~40元", value: "20~40元" },
            { label: "40元以上", value: "40元以上" },
          ],
          rules: [
            {
              required: true,
              message: "人均价格不能为空",
              trigger: "blur",
            },
          ],
        },
        {
          label: "优惠活动",
          width: "",
          field: "yhhd",
          type: "select",
          payload: [
            { label: "全部", value: "全部" },
            { label: "优惠商品", value: "优惠商品" },
            { label: "折扣商品", value: "折扣商品" },
            { label: "买赠活动", value: "买赠活动" },
          ],
          rules: [
            {
              required: true,
              message: "优惠活动不能为空",
              trigger: "blur",
            },
          ],
        },
      ],
      formData: {
        cate_id: [],
        area_id: [],
        sjts: "",
        rjj: "",
        yhhd: "",
      },
    };
  },
  async created() {
    // ## 门店分类
    let cates = await getCatesApi({ pagenum: 1, pagesize: 1000 });
    // console.log(cates.data.list);
    this.formConfig[0].payload.options = cates.data.list;

    let areas = await getAreasApi();
    // console.log(areas.data);
    this.formConfig[1].payload.options = areas.data;
  },
  methods: {},
};
</script>
