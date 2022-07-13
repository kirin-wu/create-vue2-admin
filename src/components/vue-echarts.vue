<template>
  <div class="chart" :id="id"></div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "vue-chart",
  props: {
    option: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      id: "chart" + new Date().getTime(),
    };
  },
  mounted() {
    this.initEcharts();
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
    initEcharts() {
      const dom = document.getElementById(this.id);
      if (!dom) return;
      if (this.option) {
        let myChart = echarts.init(dom);
        myChart.setOption(this.option);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
