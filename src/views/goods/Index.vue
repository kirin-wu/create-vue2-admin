<template>
  <div class="goods">
    <MtCard title="商品创建" url="/goods/create" btnName="创建">
      <MtTable :tableData="tableData" :columns="columns" />
    </MtCard>
  </div>
</template>

<script>
import tableData from "~mock/goods/index.js";
export default {
  data() {
    return {
      // 编号、所属门店、封面60x60、标题、库存、市场价、销售价、创建于、上架、操作
      id: "@id",
      columns: [
        { title: "编号", field: "id" },
        { title: "所属门店", field: "sub_stores" },
        {
          title: "封面",
          type: "img",
          payload: {
            field: "img",
          },
        },
        { title: "标题", field: "title" },
        { title: "库存", field: "repertory" },
        { title: "市场价", field: "market_price" },
        { title: "销售价", field: "sell_price" },
        { title: "创建于", field: "work" },
        {
          title: "上架",
          type: "switch",
          payload: {
            field: "state",
            change: (row) => console.log("冻结", row),
          },
        },
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
    };
  },
};
</script>

<style></style>
