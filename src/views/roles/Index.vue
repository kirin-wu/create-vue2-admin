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
          >返回</el-button
        >
      </div>
      <!-- ### 用户列表表格 -->
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column
          prop="number"
          label="编号"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="role"
          label="角色名称"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="username"
          label="角色描述"
          width="100"
        ></el-table-column>
        <el-table-column prop="operation" label="操作" width="140">
          <el-button type="primary" :round="true">分配权限</el-button>
        </el-table-column>
        <el-table-column width="60">
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
        </el-table-column>
        <el-table-column>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </el-table-column>
      </el-table>
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
export default {
  data() {
    return {
      uname: "",
      value: true,
      value1: [],
      urrentPage4: 4,
      currentPage: 5,
      tableData: [
        {
          number: "0396",
          role: "普通用户",
          username: "神龙教主",
          phoneNum: 13788888888,
          time: "2020-09-16 19:29:30",
        },
        {
          number: "0397",
          role: "普通用户",
          username: "神龙教主",
          phoneNum: 13788888888,
          time: "2020-09-16 19:29:30",
        },
        {
          number: "0398",
          role: "普通用户",
          username: "神龙教主",
          phoneNum: 13788888888,
          time: "2020-09-16 19:29:30",
        },
        {
          number: "0399",
          role: "普通用户",
          username: "神龙教主",
          phoneNum: 13788888888,
          time: "2020-09-16 19:29:30",
        },
        {
          number: "0400",
          role: "普通用户",
          username: "神龙教主",
          phoneNum: 13788888888,
          time: "2020-09-16 19:29:30",
        },
      ],
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
