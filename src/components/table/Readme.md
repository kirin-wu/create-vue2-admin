# MyTable

<my-table :tableData="tableData" :columns="columns" />

# 表格列 表格数据

## columns:[],

## tableData:[],

```
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
          id: 1,
          role_name: "管理员",
          uname: "admin",
          mobile: 13733490000,
          state: 1,
          create_time: "2022 06 07 09:00:00",
        },
      ],
```
