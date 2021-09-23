<template>
  <div ref="myChart" style="width: 100%; height: 100%"></div>
</template>

<script>
import echarts from "echarts";
export default {
  mounted() {
    this.initMychart();
  },
  methods: {
    initMychart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(this.$refs.myChart);

      // 指定图表的配置项和数据
      let option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
};
</script>

<style></style>
