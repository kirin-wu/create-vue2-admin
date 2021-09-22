<template>
  <div class="cates">
    <MtCard title="分类列表" url="/roles/create" btnName="创建">
      <!-- ##表格 -->
      <MtTable :tableData="tableData" :columns="columns" />
      <!-- ### 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        style="
          width: 98%;
          padding: 10px 0;
          background-color: #ebeef5;
          text-align: right;
          margin-top: 20px;
          padding-right: 80px;
          box-sizing: border-box;
        "
      >
      </el-pagination>
    </MtCard>
  </div>
</template>

<script>
import tableData from "~mock/cates";
export default {
  data() {
    return {
      // ###分页
      currentPage: 5,
      columns: [
        { title: "分类编号", field: "cat_id" },
        { title: "分类名称", field: "name" },
        {
          title: "分类层级",
          type: "tag",
          payload: {
            field: "level",
            // color: "success",
          },
        },
      ],
      tableData,
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style></style>
