<template>
  <div ref="myChart" style="width: 100%; height: 100%"></div>
</template>

<script>
import echarts from "echarts";
export default {
  mounted() {
    this.initMychart();
  },
  props: {
    data: {
      type: Array,
    },
    title: {
      type: Array,
    },
  },
  watch: {
    title() {
      this.initMychart();
    },
  },
  methods: {
    initMychart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(this.$refs.myChart);

      // 指定图表的配置项和数据
      let option = {
        xAxis: {
          type: "category",
          data: this.title,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.data,
            type: "line",
            smooth: true,
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
