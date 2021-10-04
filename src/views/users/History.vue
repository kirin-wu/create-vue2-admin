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
          v-model="params.uname"
          class="input-with-select"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="changedataFn"
          ></el-button>
        </el-input>
        <!-- ### 登录日期时间选项 -->
        <el-date-picker
          v-model="params.date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="登录开始日期"
          end-placeholder="登录结束日期"
          @change="changedateFn"
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
        :page-sizes="[5, 10, 15, 30]"
        :page-size="params.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableDataTotal"
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
// import tableData from "~mock/admin/history";
import { getHistoryApi } from "@/api/history.js";
export default {
  components: {
    MtTable,
  },
  data() {
    return {
      currentPage: 10,
      // 接口请求数据
      params: {
        date: [],
        pagenum: 1,
        pagesize: 5,
        start_time: "",
        end_time: "",
        uname: "",
      },
      // 表格列
      columns: [
        { title: "编号", field: "id" },
        { title: "用户", field: "username" },
        { title: "登录方式", field: "type" },
        { title: "登录城市", field: "city" },
        { title: "登录时间", field: "login_time" },
        { title: "上一次登录时间", field: "prev_login_time" },
      ],
      // 表格数据
      tableData: [],
      tableDataTotal: 0,
    };
  },
  created() {
    this.initDateFn();
  },
  methods: {
    initDateFn() {
      getHistoryApi(this.params).then((res) => {
        console.log(res);
        this.tableData = res.data.list;
        this.tableDataTotal = parseInt(res.data.total);
      });
    },
    changedataFn() {
      this.initDateFn();
    },
    changedateFn() {
      this.params.start_time = this.params.date[0];
      this.params.end_time = this.params.date[1];
      this.initDateFn();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.params.pagesize = val;
      this.initDateFn();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.params.pagenum = val;
      this.initDateFn();
    },
  },
};
</script>
