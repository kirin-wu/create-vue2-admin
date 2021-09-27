<template>
  <div class="cates">
    <MtCard title="分类列表" url="/cates/create" btnName="创建">
      <!-- ##表格 -->
      <MtTable :tableData="tableData" :columns="columns" />
      <!-- ### 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableDataTotal"
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
    <Edit :state="editstate" @close="editstate = false" :row="row" />
  </div>
</template>

<script>
// import tableData from "~mock/cates";
import { getCatesApi } from "@/api/cates";
import Edit from "@/views/cates/components/Edit";
export default {
  components: {
    Edit,
  },
  data() {
    return {
      // ###分页
      currentPage: 5,
      columns: [
        { title: "分类编号", field: "cat_id" },
        { title: "分类名称", field: "cat_name" },
        {
          title: "分类层级",
          type: "tag",
          payload: {
            field: "level",
            // color: "success",
            filterName: "cateFilter",
          },
        },
        {
          title: "操作",
          width: "360",
          type: "btn",
          payload: [
            {
              name: "修改分类",
              type: "primary",
              click: (row) => {
                console.log("修改", row);
                this.editstate = true;
                this.row = row;
              },
            },
            {
              // name: "删除",
              icon: "el-icon-delete",
              type: "danger",
              click: (row) => {
                console.log("编辑", row);
                this.deleteFn(row);
              },
            },
          ],
        },
      ],
      tableData: [],
      tableDataTotal: 0,
      row: {},
      editstate: false,
      params: {
        pagenum: 1,
        pagesize: 10,
        lever: 3,
      },
    };
  },
  created() {
    this.initDataFn();
  },
  methods: {
    initDataFn() {
      getCatesApi(this.params).then((res) => {
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

<style></style>
