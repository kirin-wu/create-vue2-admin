<template>
  <div class="main">
    <vue-echarts :option="option"></vue-echarts>
  </div>
</template>
<script>
import vueEcharts from "@/components/vue-echarts";
export default {
  components: {
    vueEcharts,
  },
  data() {
    return {
      option: {
        xAxis: {
          type: "category",
          data: ["A", "B", "C", "D"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [100, 200, 300, 400],
            type: "bar",
          },
        ],
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.main {
  width: 500px;
  height: 500px;
  border: 1px solid red;
}
</style>
