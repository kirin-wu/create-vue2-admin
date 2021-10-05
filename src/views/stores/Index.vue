<template>
  <div class="stores">
    <MtCard title="门店列表" url="/stores/create" btnName="创建">
      <MtTable :tableData="tableData" :columns="columns" rowkey="id"
    /></MtCard>
    <!-- ### 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableDataTotal"
    >
    </el-pagination>
  </div>
</template>

<script>
// import tableData from "~mock/stores/index.js";
import { getStoresApi, deleteStoresApi } from "@/api/stores";
export default {
  data() {
    return {
      params: {
        date: [],
        uname: "",
        pagenum: 1,
        pagesize: 5,
        start_time: "",
        end_time: "",
      },
      currentPage: 1,
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
        { title: "好评", field: "comment_good_count" },
        { title: "差评", field: "comment_bad_count" },
        { title: "总评", field: "comment_count" },
        { title: "销量", field: "sell_count" },
        { title: "联系方式", field: "tel" },
        { title: "营业时间", field: "work_time", width: "170" },
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
      tableData: [],
      tableDataTotal: 0,
    };
  },
  created() {
    this.initDataFn();
  },
  methods: {
    // 删除列表数据
    deleteFn(row) {
      // console.log("删除", row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteStoresApi({ store_id: row.id }).then((res) => {
            // console.log(res);
            if (res.meta.state == 200) {
              this.$message({
                type: "success",
                message: `${res.meta.msg}!`,
              });
              this.initDatFn();
            } else {
              this.$message({
                type: "error",
                message: `${res.meta.msg}!`,
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    initDataFn() {
      getStoresApi(this.params).then((res) => {
        // console.log(res);
        this.tableData = res.data.list;
        this.tableDataTotal = parseInt(res.data.total);
      });
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.params.pagesize = val;
      this.initDataFn();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.params.pagenum = val;
      this.initDataFn();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-pagination {
  width: 100%;
  padding: 10px 0;
  background-color: #ebeef5;
  text-align: right;
  margin-top: 20px;
  padding-right: 80px;
  box-sizing: border-box;
}
</style>
