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
          v-model="params.uname"
          class="input-with-select"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="initDataFn"
          ></el-button>
        </el-input>
        <!-- ### 日期时间选项 -->
        <el-date-picker
          v-model="params.date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="changtimeFn"
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
        :page-sizes="[5, 10, 20, 30]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableDataTotal"
      >
      </el-pagination>
    </el-card>
    <!-- #编辑弹框 -->
    <Edit
      :row="row"
      :state="editstate"
      @close="editstate = false"
      :initDataFn="initDataFn"
    />
    <EditRoles
      :row="row"
      :state="editrolesstate"
      @close="editrolesstate = false"
      :initDataFn="initDataFn"
    />
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
import MtTable from "@/components/Table/Index.vue";
// import tableData from "~mock/users/index";
import Edit from "./components/Edit.vue";
import EditRoles from "./components/EditRoles.vue";
import {
  getUsersApi,
  deleteUsersApi,
  putUserChangeStateApi,
} from "@/api/users.js";
export default {
  components: {
    MtTable,
    Edit,
    EditRoles,
  },
  data() {
    return {
      row: {},
      // 编辑弹框数据
      params: {
        date: [],
        uname: "",
        pagenum: 1,
        pagesize: 5,
        start_time: "",
        end_time: "",
      },
      editstate: false,
      editrolesstate: false,
      currentPage: 4,
      item: {
        row: { status: true },
      },
      // 表格列
      // 编号 所属角色 用户名 手机号 冻结 创建时间 操作
      columns: [
        { title: "编号", field: "user_id" },
        { title: "所属角色", field: "role_name" },
        { title: "用户名", field: "username" },
        { title: "手机号", field: "mobile" },
        {
          title: "冻结",
          type: "switch",
          payload: {
            field: "state",
            change: (row) => {
              // console.log("冻结", row);
              putUserChangeStateApi({
                user_id: row.user_id,
                state: row.state,
              }).then((res) => {
                console.log(res);
                if (res.meta.state == 200) {
                  this.$message({
                    type: "success",
                    message: `${res.meta.msg}!`,
                  });
                  this.initDataFn();
                } else {
                  this.$message({
                    type: "error",
                    message: `${res.meta.msg}!`,
                  });
                }
              });
            },
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
                // console.log("修改", row);
                // 1.显示数据
                this.editstate = true;
                // 2.修改点击事件触发保存当前行数据，弹框表单使用当前行数据
                this.row = row;
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
                this.row = row;
              },
            },
            {
              name: "删除",
              type: "danger",
              click: (row) => {
                // console.log("删除", row);
                this.deleteFn(row);
              },
            },
          ],
        },
      ],
      // 表格数据
      tableData: [],
      tableDataTotal: 0,
    };
  },
  created() {
    this.initDataFn();
  },
  methods: {
    // 异步请求封装
    initDataFn() {
      getUsersApi(this.params).then((res) => {
        // console.log(res);
        this.tableData = res.data.list;
        this.tableDataTotal = parseInt(res.data.total);
      });
    },
    // 日期改变
    changtimeFn() {
      this.params.start_time = this.params.date[0];
      this.params.end_time = this.params.date[1];
      // console.log(this.params.date);
      this.initDataFn();
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
    deleteFn(row) {
      // console.log("删除", row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteUsersApi({ user_id: row.user_id }).then((res) => {
            // console.log(res);
            if (res.meta.state == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.initDataFn();
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
  },
};
</script>
