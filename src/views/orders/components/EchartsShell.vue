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
        title: {
          text: "Waterfall Chart",
          subtext: "Living Expenses in Shenzhen",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: function (params) {
            var tar = params[1];
            return tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          splitLine: { show: false },
          data: [
            "Total",
            "Rent",
            "Utilities",
            "Transportation",
            "Meals",
            "Other",
          ],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "Placeholder",
            type: "bar",
            stack: "Total",
            itemStyle: {
              borderColor: "transparent",
              color: "transparent",
            },
            emphasis: {
              itemStyle: {
                borderColor: "transparent",
                color: "transparent",
              },
            },
            data: [0, 1700, 1400, 1200, 300, 0],
          },
          {
            name: "Life Cost",
            type: "bar",
            stack: "Total",
            label: {
              show: true,
              position: "inside",
            },
            data: [2900, 1200, 300, 200, 900, 300],
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
