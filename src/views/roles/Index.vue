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
    <!-- ## 分配权限弹框EditAuth 编辑Edit -->
    <Edit :state="editstate" @close="editstate = false" />
    <EditAuth :state="editauthstate" @close="editauthstate = false" />
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
import tableData from "~mock/roles/index";
import Edit from "./components/Edit.vue";
import EditAuth from "./components/EditAuth.vue";
export default {
  components: {
    Edit,
    EditAuth,
  },
  data() {
    return {
      // 分页数据
      currentPage: 5,
      // 分配权限 编辑 删除
      editstate: false,
      editauthstate: false,
      columns: [
        { title: "编号", filed: "id" },
        { title: "角色名称", filed: "role_name" },
        { title: "角色描述", filed: "role_desc" },
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
              },
            },
            {
              // name: "编辑",
              icon: "el-icon-edit",
              type: "success",
              click: (row) => {
                console.log("编辑", row);
                this.editstate = true;
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
  },
};
</script>
