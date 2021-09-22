<template>
  <div class="orders">
    <MtCard title="导出数据" url="/roles" btnName="返回">
      <div class="search">
        <!-- ### input搜索 -->
        <el-input
          placeholder="收货人"
          v-model="uname1"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <!-- ### input搜索 -->
        <el-input
          placeholder="下单人"
          v-model="uname2"
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
      <MtTable :tableData="tableData" :columns="columns" />
      <MtPage v-slot:page :currentPage="5" />
    </MtCard>
  </div>
</template>

<script>
import tableData from "~mock/orders/index.js";
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
        { title: "订单编号", field: "id", width: "200" },
        { title: "下单人", field: "uname1" },
        { title: "收货人", field: "uname2" },
        { title: "总额", field: "priceNum" },
        {
          title: "订单状态",
          type: "tag",
          payload: {
            color: "info",
            field: "orders_state",
            filterName: "orderStatusFilter",
          },
        },
        {
          title: "支付状态",
          type: "tag",
          payload: {
            color: "info",
            field: "pay_state",
            filterName: "payStatusFilter",
          },
        },
        {
          title: "配送状态",
          type: "tag",
          payload: {
            color: "info",
            field: "send_state",
            filterName: "shippingStatusFilter",
          },
        },
        { title: "创建时间", field: "work", width: "180" },
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
  methods: {},
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
</style>
