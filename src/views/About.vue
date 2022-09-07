<template>
  <vue-base-chart
    :option="option"
    id="barEcharts"
    ref="myChart"
  ></vue-base-chart>
</template>

<script>
import VueBaseChart from "@/components/VueBaseChart";
export default {
  name: "LineChart",
  components: { VueBaseChart },
  data() {
    return {
      option: {},
      activeIndex: null,
    };
  },
  watch: {
    activeIndex: {
      handler() {
        if (!this.activeIndex) return;
        let start = (this.activeIndex - 3) * 10;
        let end = (parseInt(this.activeIndex) + 3) * 10;
        if (start < 0) start = 0;
        console.log("index变化了", start, end);
        this.initOption({
          xAxis: [
            "08.24",
            "08.25",
            "08.26",
            "08.27",
            "08.28",
            "08.29",
            "08.30",
          ],
          series: [40, 90, 10, 20, 56, 49, 28],
          position: [start, end],
        });
      },
    },
  },
  mounted() {
    this.initOption();
  },
  methods: {
    initOption(
      data = {
        xAxis: ["08.24", "08.25", "08.26", "08.27", "08.28", "08.29", "08.30"],
        series: [40, 90, 10, 20, 56, 49, 28],
        position: [0, 30],
      }
    ) {
      //   console.log(this.$refs.myChart.myBaseChart); // echarts实例
      let myChart = this.$refs.myChart.myBaseChart;
      myChart.on("mouseover", (v) => {
        // console.log("鼠标移上去的index：");
        // console.log(v.dataIndex);
        this.activeIndex = v.dataIndex;
      });
      // 配置
      this.option = {
        backgroundColor: "#fff",
        grid: {
          top: "15%",
          right: "10%",
          left: "10%",
          bottom: "12%",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            lineStyle: {
              color: "rgba(0,215,132)",
              width: 2,
              type: "solid",
            },
            z: 1,
          },
          showContent: false, // 不显示提示框
        },
        xAxis: [
          {
            type: "category",
            data: data.xAxis,
            // 坐标轴线
            axisLine: {
              lineStyle: {
                color: "#2be1a5",
                width: 2,
              },
            },
            // 坐标轴刻度
            axisTick: {
              show: true,
              alignWithLabel: true,
              length: 8,
              inside: false,
              lineStyle: {
                width: 2,
                color: "#e0e0e0",
              },
            },
            axisLabel: {
              show: true,
              margin: 15,
              color: function (value) {
                // console.log(value, index);
                return value >= 0 ? "#a1a1a1" : "#414141";
              },
              fontSize: 14,
            },

            triggerEvent: true, // 坐标轴的标签是否响应和触发鼠标事件，默认不响应。
          },
        ],
        yAxis: {
          axisLabel: false,
          axisTick: false,
          axisLine: false,
          splitLine: {
            lineStyle: {
              color: "#e4e4e4",
              type: "dashed",
            },
          },
        },
        dataZoom: [
          {
            type: "inside",
            start: data.position[0],
            end: data.position[1],
          },
        ],

        series: [
          {
            type: "bar",
            data: data.series,
            barWidth: "30px",
            itemStyle: {
              normal: {
                color: "#50ecc3",
                barBorderRadius: [30, 30, 0, 0],
              },
              emphasis: {
                color: "rgba(0,215,132)",
              },
            },
            label: {
              show: true,
              position: "top",
              formatter: function (params) {
                return data.series[params.dataIndex] + "步";
              },
              fontSize: 20,
              padding: [8, 5, 5, 5],
              color: "#f7fdfc",
              backgroundColor: "#00d784",
              borderRadius: 4,
            },
          },
        ],
      };
    },
  },
};
</script>

<style scoped lang="scss">
#barEcharts {
  width: 800px;
  height: 300px;
}
</style>
