<template>
  <div>
    <my-form
      :form-data="postData"
      :form-config="formConfig"
      :form-btns="formBtns"
      :line-num="1"
      size="medium"
      @submit="handleSubmit"
      @reset="handleReset"
    ></my-form>
    <my-table :tableData="tableData" :columns="columns"></my-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      postData: {
        id: "",
        role_name: "",
        uname: "",
        mobile: "",
        state: "",
        create_time: "",
      },
      formConfig: [
        [
          {
            type: "text",
            label: "编号",
            field: "id",
            rules: [
              { required: true, message: "请输入id", trigger: "blur" },
              {
                min: 3,
                max: 5,
                message: "长度在 3 到 5 个字符",
                trigger: "blur",
              },
            ],
          },
          { type: "text", label: "所属角色", field: "role_name", rules: [] },
          { type: "text", label: "所属角色", field: "uname", rules: [] },
        ],
        [
          { type: "text", label: "手机号", field: "mobile", rules: [] },
          {
            type: "select",
            label: "冻结状态",
            field: "state",
            isStatic: true,
            payload: "state",
            rules: [],
          },
          { type: "date", label: "创建时间", field: "create_time" },
        ],
      ],
      formBtns: [
        { type: "primary", content: "查询" },
        { type: "", content: "重置" },
      ],
      // 图表配置
      columns: [
        { name: "编号", field: "id" },
        { name: "所属角色", field: "role_name" },
        { name: "用户名", field: "uname" },
        { name: "手机号", field: "mobile" },
        {
          name: "冻结",
          type: "switch",
          payload: {
            field: "state",
            change: (row) => console.log("冻结", row),
          },
        },
        { name: "创建时间", field: "create_time", width: "180" },
        {
          name: "操作",
          width: "260",
          type: "btn",
          payload: [
            {
              name: "修改用户",
              type: "primary",
              click: (row) => {
                console.log("修改", row);
                // 1.显示数据
                this.editstate = true;
                // 2.
              },
            },
            {
              name: "分配角色",
              type: "success",
              click: (row) => {
                console.log("分配", row);
                // 1.显示数据
                this.editrolesstate = true;
                // 2.
              },
            },
            {
              name: "删除",
              type: "danger",
              click: (row) => {
                console.log("删除", row);
                this.deleteFn(row);
              },
            },
          ],
        },
      ],
      // 表格数据
      tableData: [
        {
          id: 2352341251251,
          role_name: "管理员",
          uname: "admin",
          mobile: 13733490000,
          state: 1,
          create_time: "2022 06 07 09:00:00",
        },
      ],
    };
  },
  methods: {
    handleSubmit() {
      console.log("查询");
    },
    handleReset() {
      console.log("重置");
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-form-item .el-select {
  display: block !important;
}
</style>
