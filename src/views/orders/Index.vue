<template>
  <div class="orders">
    <MtCard title="导出数据" url="/orders/total" btnName="图表">
      <div class="search">
        <!-- ### 导出excel表格 -->
        <el-button @click="exportExcelFn">导出Excel表格</el-button>
        <!-- ### input搜索 -->
        <el-input
          placeholder="下单人"
          v-model="params.uname"
          class="input-with-select"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="initDataFn"
          ></el-button>
        </el-input>
        <!-- ### input搜索 -->
        <el-input
          placeholder="收货人"
          v-model="params.consignee"
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
    </MtCard>
  </div>
</template>

<script>
// import tableData from "~mock/orders/index.js";
import { getOrdersApi, deleteOrdersApi } from "@/api/orders";
import { download } from "webopenfather-excel";
export default {
  data() {
    return {
      // 下单开始到下单结束日期
      uname1: "",
      uname2: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value: "",
      columns: [
        { title: "编号", field: "order_id" },
        { title: "订单编号", field: "order_sn", width: "200" },
        { title: "下单人", field: "username" },
        { title: "收货人", field: "consignee" },
        { title: "总额", field: "order_amount" },
        {
          title: "订单状态",
          type: "tag",
          payload: {
            color: "info",
            field: "order_status",
            filterName: "orderStatusFilter",
          },
        },
        {
          title: "支付状态",
          type: "tag",
          payload: {
            color: "info",
            field: "pay_status",
            filterName: "payStatusFilter",
          },
        },
        {
          title: "配送状态",
          type: "tag",
          payload: {
            color: "info",
            field: "shipping_status",
            filterName: "shippingStatusFilter",
          },
        },
        { title: "创建时间", field: "add_time", width: "180" },
        {
          title: "操作",
          width: "260",
          type: "btn",
          payload: [
            {
              icon: "el-icon-edit",
              // name: "分配角色",
              type: "success",
              click: (row) => {
                console.log("分配", row);
                // 1.显示数据
                this.editrolesstate = true;
                // 2.
              },
            },
            {
              icon: "el-icon-delete",
              // name: "删除",
              type: "danger",
              click: (row) => {
                // console.log("删除", row);
                this.deleteFn(row);
              },
            },
          ],
        },
      ],
      // 编辑弹框数据
      params: {
        date: [],
        uname: "", //下单人
        consignee: "", //收货人
        pagenum: 1,
        pagesize: 5,
        start_time: "",
        end_time: "",
      },
      // 表格数据
      currentPage: 1,
      tableData: [],
      tableDataTotal: 0,
    };
  },
  created() {
    this.initDataFn();
  },
  methods: {
    // 导出Excel表格
    exportExcelFn() {
      // console.log("表格");
      let temp = this.tableData.map((item) => {
        return {
          order_id: item.order_id,
          order_sn: item.order_sn,
          username: item.username, //下单人
          consignee: item.consignee, //收货人
          order_amount: item.order_amount,
          add_time: item.add_time,
        };
      });
      download(
        "美团订单数据",
        ["编号", "订单号", "下单人", "收货人", "总额", "创建于"],
        temp
      );
    },
    // 删除列表数据
    deleteFn(row) {
      // console.log("删除", row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteOrdersApi({ order_id: row.order_id }).then((res) => {
            // console.log(res);
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    initDataFn() {
      getOrdersApi(this.params).then((res) => {
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
  },
};
</script>

<style lang="scss" scoped>
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
</style>
