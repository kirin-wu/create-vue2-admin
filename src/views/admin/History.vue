<template>
  <div class="history">
    <!-- ### 卡片 -->
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <!-- ### 添加用户 -->
        <span>访客纪录</span>
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
        <!-- ### 登录日期时间选项 -->
        <el-date-picker
          v-model="value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="登录开始日期"
          end-placeholder="登录结束日期"
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
  </div>
</template>
<style lang="scss" scoped>
.history {
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
import tableData from "~mock/admin/history";
export default {
  components: {
    MtTable,
  },
  data() {
    return {
      uname: "",
      value1: [],
      currentPage: 10,
      // 表格列
      columns: [
        { title: "编号", filed: "id" },
        { title: "用户", filed: "title" },
        { title: "登录方式", filed: "type" },
        { title: "登录城市", filed: "city" },
        { title: "登录时间", filed: "time" },
        { title: "上一次登录时间", filed: "nexttime" },
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
  },
};
</script>
