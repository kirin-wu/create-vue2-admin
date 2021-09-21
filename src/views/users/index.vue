<template>
  <div class="users">
    <!-- # 卡片 -->
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <!-- ### 添加用户 -->
        <span>用户列表</span>
        <el-button
          style="float: right;margin-top:-8px ;padding: 3px 0 width:70px"
          :round="true"
          type="primary"
          @click="jump('/users/create')"
          >添加用户</el-button
        >
      </div>
      <!-- 内容筛选 -->
      <div class="search">
        <!-- ### input搜索 -->
        <el-input
          placeholder="请输入用户名"
          v-model="uname"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <!-- ### 日期时间选项 -->
        <el-date-picker
          v-model="value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
      <!-- ### 用户列表表格 -->
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
      >
      </el-pagination>
    </el-card>
    <!-- #编辑弹框 -->
    <Edit :state="editstate" @close="editstate = false" />
    <EditRoles :state="editrolesstate" @close="editrolesstate = false" />
  </div>
</template>
<style lang="scss" scoped>
.users {
  width: 100%;
  height: 100%;
  .el-card {
    width: 96%;
    margin: auto;
    .search {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      .input-with-select {
        width: 300px;
        height: 40px;
      }
    }
    .el-pagination {
      width: 100%;
      padding: 10px 0;
      background-color: #ebeef5;
      text-align: right;
      margin-top: 20px;
      padding-right: 80px;
      box-sizing: border-box;
    }
  }
}
</style>
<script>
import MtTable from "@/components/table/Index.vue";
import tableData from "~mock/users/index";
import Edit from "./components/Edit.vue";
import EditRoles from "./components/EditRoles.vue";
export default {
  components: {
    MtTable,
    Edit,
    EditRoles,
  },
  data() {
    return {
      // 编辑弹框数据
      editstate: false,
      editrolesstate: false,
      uname: "",
      value1: [],
      currentPage: 4,
      item: {
        row: { status: true },
      },
      // 表格列
      // 编号 所属角色 用户名 手机号 冻结 创建时间 操作
      columns: [
        { title: "编号", field: "id" },
        { title: "所属角色", field: "role_name" },
        { title: "用户名", field: "uname" },
        { title: "手机号", field: "mobile" },
        {
          title: "冻结",
          type: "switch",
          payload: {
            field: "state",
            change: (row) => console.log("冻结", row),
          },
        },
        { title: "创建时间", field: "create_time", width: "180" },
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
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    deleteFn(row) {
      console.log("删除", row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
