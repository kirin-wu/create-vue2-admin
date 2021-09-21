<template>
  <div class="stores">
    <MtCard title="门店列表" url="/stroes/create" btnName="创建">
      <MtTable :tableData="tableData" :columns="columns"
    /></MtCard>
    <MtPage v-slot:page :currentPage="currentPage" />
  </div>
</template>

<script>
import tableData from "~mock/stores/index.js";
console.log(tableData);
export default {
  data() {
    return {
      currentPage: 5,
      // 编号、封面60x60、标题、好评、差评、总评、销量、联系方式、营业时间
      columns: [
        { title: "编号", field: "id", fixed: "left" },
        { title: "封面", type: "img", payload: { field: "img" } },
        {
          title: "标题",
          type: "tips",
          width: 160,
          payload: {
            field: "title",
          },
        },
        { title: "好评", field: "commit_goods_count" },
        { title: "差评", field: "commit_bad_count" },
        { title: "总评", field: "commit_count_count" },
        { title: "销量", field: "sell_count" },
        { title: "联系方式", field: "mobile" },
        { title: "营业时间", field: "work", width: "170" },
        {
          title: "操作",
          width: "360",
          type: "btn",
          fixed: "right",
          payload: [
            {
              name: "修改门店",
              type: "primary",
              click: (row) => {
                console.log("修改门店", row);
                this.editauthstate = true;
              },
            },
            {
              name: "删除",
              icon: "el-icon-delete",
              type: "danger",
              click: (row) => {
                console.log("删除", row);
                this.deleteFn(row);
              },
            },
          ],
        },
      ],
      tableData: tableData.data,
    };
  },
};
</script>

<style></style>
