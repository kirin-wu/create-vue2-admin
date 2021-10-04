<template>
  <div class="goods">
    <MtCard title="商品创建" url="/goods/create" btnName="创建">
      <MtTable :tableData="tableData" :columns="columns" rowkey="id" />
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
import { getgoodsApi } from "@/api/goods";
export default {
  data() {
    return {
      params: {
        date: [],
        uname: "",
        pagenum: 1,
        pagesize: 5,
        start_time: "",
        end_time: "",
      },
      currentPage: 5,
      // 编号、所属门店、封面60x60、标题、库存、市场价、销售价、创建于、上架、操作
      columns: [
        { title: "编号", field: "goods_numberd" },
        { title: "所属门店", field: "sub_stores" },
        {
          title: "封面",
          type: "img",
          payload: {
            field: "img",
          },
        },
        {
          title: "标题",
          type: "tips",
          payload: {
            field: "title",
          },
        },
        { title: "库存", field: "repertory" },
        { title: "市场价", field: "market_price" },
        { title: "销售价", field: "sell_price" },
        { title: "创建于", field: "work" },
        {
          title: "上架",
          type: "switch",
          payload: {
            field: "state",
            change: (row) => console.log("冻结", row),
          },
        },
        {
          title: "操作",
          width: "260",
          type: "btn",
          fixed: "right",
          payload: [
            {
              name: "修改商品",
              type: "primary",
              click: (row) => {
                console.log("修改", row);
                // 1.显示数据
                this.editstate = true;
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
      tableData: [],
      tableDataTotal: 0,
    };
  },
  created() {
    this.initDataFn();
  },
  methods: {
    initDataFn() {
      getgoodsApi(this.params).then((res) => {
        console.log(res);
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

<style lang="scss" scoped>
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
