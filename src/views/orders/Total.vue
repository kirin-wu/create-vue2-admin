<template>
  <div class="total">
    <MtCard title="订单统计">
      <div class="divbox">
        <div class="top">
          <div class="box1">
            <h3>本月销售量</h3>
            <h1>{{ echartsData.now_month_reg }}</h1>
          </div>
          <div class="box2">
            <h3>上月销售量</h3>
            <h1>{{ echartsData.prev_month_total }}</h1>
          </div>
          <div class="box3">
            <h3>总库存</h3>
            <h1>{{ echartsData.goods_total_number }}</h1>
          </div>
          <div class="box4">
            <h3>本月新注册用户</h3>
            <h1 v-if="echartsData.now_month_total">
              {{ echartsData.now_month_total }}
            </h1>
            <h1 v-else>{{ 999 }}</h1>
          </div>
        </div>
        <div class="center">
          <EChartsReg
            :data="echartsData.reg_data"
            :title="echartsData.reg_title"
          />
        </div>
        <div class="down">
          <div class="left">
            <EChartsPv
              :data="echartsData.pv_data"
              :title="echartsData.pv_title"
            />
          </div>
          <div class="right">
            <EchartsShell
              :data="echartsData.store_data"
              :title="echartsData.store_data"
            />
          </div>
        </div>
      </div>
    </MtCard>
  </div>
</template>

<script>
import EChartsReg from "./components/EchartsReg.vue";
import EChartsPv from "./components/EchartsPv";
import EchartsShell from "./components/EchartsShell.vue";
import { getTotalApi } from "@/api/orders";
export default {
  components: {
    EChartsReg,
    EChartsPv,
    EchartsShell,
  },
  data() {
    return {
      echartsData: {
        goods_total_number: 999,
        now_month_reg: 999,
        now_month_total: 999,
        prev_month_total: 999,
        pv_data: [],
        pv_title: [],
        reg_data: [],
        reg_title: [],
        store_data: [],
        store_title: [],
      },
    };
  },
  created() {
    this.initDataFn();
  },
  methods: {
    initDataFn() {
      getTotalApi().then((res) => {
        // console.log(res);
        this.echartsData = res.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.total {
  height: 100%;
  .divbox {
    height: 100%;
    background-color: #fff;
    .top {
      display: flex;
      justify-content: center;
      color: #fff;
      div {
        width: 25%;
        height: 120px;
        background-color: black;
        margin-right: 20px;
        border-radius: 5px;
        box-shadow: 2px 2px 10px 2px rgb(175, 171, 171);
        h3 {
          padding: 8px 0 8px 10px;
        }
        h1 {
          padding: 0 0 8px 10px;
        }
      }
      .box1 {
        background-color: rgb(211, 110, 146);
      }
      .box2 {
        background-color: rgb(125, 187, 149);
      }
      .box3 {
        background-color: rgb(204, 186, 133);
      }
      .box4 {
        background-color: rgb(90, 153, 192);
        margin-right: 0;
      }
    }
    .center {
      margin: 30px 0;
      width: 100%;
      height: 300px;
      border-radius: 1px;
      box-shadow: 2px 2px 10px 2px rgb(175, 171, 171);
    }
    .down {
      width: 100%;
      height: 250px;
      display: flex;
      justify-content: space-between;
      div {
        width: 50%;
        border-radius: 1px;
        box-shadow: 2px 2px 10px 2px rgb(175, 171, 171);
      }
      .left {
        margin-right: 20px;
      }
    }
  }
}
</style>
