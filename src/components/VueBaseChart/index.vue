<template>
  <div class="echart" :id="id"></div>
</template>
<script>
import Mock from "mockjs";
import echarts from "echarts";
export default {
  name: "VueBaseChart",
  props: {
    id: {
      type: String,
      default: () => {
        return "echart" + Mock.mock("@guid()");
      },
    },
    option: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      myBaseChart: null,
    };
  },
  mounted() {
    this.initEcharts();
  },
  beforeDestroy() {
    if (this.myBaseChart) {
      this.myBaseChart.clear();
    }
    window.removeEventListener("resize", () => {
      this.myBaseChart.resize();
    });
  },
  watch: {
    option: {
      handler() {
        this.initEcharts();
      },
      deep: true,
    },
  },
  methods: {
    /**
     * @description 初始化echarts图表
     * @author
     */
    initEcharts() {
      const dom = document.getElementById(this.id);
      if (!dom) return;
      if (this.option) {
        this.myBaseChart = echarts.init(dom);
        this.myBaseChart.setOption(this.option);
      }
      window.addEventListener("resize", () => {
        this.myBaseChart.resize();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.echart {
  width: 100%;
  height: 100%;
}
</style>
