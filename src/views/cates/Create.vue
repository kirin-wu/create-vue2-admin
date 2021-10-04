<template>
  <div class="authsCreate">
    <MtCard title="分类创建" url="/cates" btnName="返回">
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
import { getCatesApi } from "@/api/cates";
import { postCatesApi } from "@/api/cates";
export default {
  data() {
    return {
      width: "140px",
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
          // console.log("children", temp2);
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
      // console.log("提交了", formData);
      formData.pid = formData.pid[formData.pid.length - 1];
      postCatesApi(formData).then((res) => {
        // console.log(res);
        if (res.meta.state == 201) {
          this.$message({
            type: "success",
            message: `${res.meta.msg}!`,
          });
          // this.initDateFn();
          this.jump("/cates");
        } else {
          this.$message({
            type: "error",
            message: `${res.meta.msg}!`,
          });
        }
      });
    },
  },
};
</script>
