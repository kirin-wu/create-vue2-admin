<template>
  <div class="roles">
    <!-- ### 卡片 -->
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <!-- ### 添加用户 -->
        <span>角色列表</span>
        <el-button
          style="float: right;margin-top:-8px ;padding: 3px 0 width:70px"
          :round="true"
          type="primary"
          @click="jump('/roles/create')"
          >创建角色</el-button
        >
      </div>
      <!-- ### 用户列表表格 -->
      <MtTable :tableData="tableData" :columns="columns" />
    </el-card>
    <!-- ## 分配权限弹框EditAuth 编辑Edit -->
    <Edit
      :state="editstate"
      @close="editstate = false"
      :row="row"
      :initDateFn="initDateFn"
    />
    <EditAuth
      :state="editauthstate"
      @close="editauthstate = false"
      :row="row"
      :initDateFn="initDateFn"
    />
  </div>
</template>
<style lang="scss" scoped>
.roles {
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
// import tableData from "~mock/roles/index";
import { getRolesApi, deleteRolesApi } from "@/api/roles.js";
import Edit from "./components/Edit.vue";
import EditAuth from "./components/EditAuth.vue";
export default {
  components: {
    Edit,
    EditAuth,
  },
  data() {
    return {
      row: {},
      // 分页数据
      currentPage: 5,
      // 分配权限 编辑 删除
      editstate: false,
      editauthstate: false,
      columns: [
        { title: "编号", field: "role_id" },
        { title: "角色名称", field: "role_name" },
        { title: "角色描述", field: "role_describe" },
        {
          title: "操作",
          width: "360",
          type: "btn",
          payload: [
            {
              name: "分配权限",
              type: "primary",
              click: (row) => {
                console.log("分配", row);
                this.editauthstate = true;
                this.row = row;
              },
            },
            {
              // name: "编辑",
              icon: "el-icon-edit",
              type: "success",
              click: (row) => {
                console.log("编辑", row);
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
      params: {},
    };
  },
  created() {
    this.initDateFn();
  },
  methods: {
    deleteFn(row) {
      // console.log("删除", row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteRolesApi({ role_id: row.role_id }).then((res) => {
            // console.log(res);
            if (res.meta.state == 200) {
              this.$message({
                type: "success",
                message: `${res.meta.msg}!`,
              });
              this.initDateFn();
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
    initDateFn() {
      getRolesApi(this.params).then((res) => {
        // console.log(res);
        this.tableData = res.data;
        this.tableDataTotal = parseInt(res.data.total);
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>
