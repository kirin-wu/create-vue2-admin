# MtTable

<MtTable :tableData="tableData" :columns="columns" />

# 表格列 表格数据

## columns:[]

## tableData: tableData.data,

```columns: [
{ title: "编号", filed: "id" },
{ title: "所属角色", filed: "role_name" },
{ title: "用户名", filed: "uname" },
{ title: "手机号", filed: "mobile" },
{
title: "冻结",
type: "switch",
payload: {
filed: "state",
change: (row) => console.log("冻结", row),
},
},
{ title: "创建时间", filed: "create_time", width: "180" },
{
title: "操作",
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
tableData: tableData.data,
```
