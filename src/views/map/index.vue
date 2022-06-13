<template>
  <div ref="mapEcharts" class="map-echart"></div>
</template>

<script>
import * as echarts from "echarts";
import axios from "axios";
// import LiangXi from "../../assets/liangxi.json";
// import LiangXiSVG from "@/assets";
export default {
  name: "Map",
  data() {
    return {
      seriesData: [
        { name: "无锡市南禅寺景区", value: 20057.34 },
        { name: "无锡市佛教居士林", value: 15477.48 },
        { name: "无锡天意中医医院", value: 31686.1 },
      ],
      map: null,
    };
  },
  created() {},
  methods: {
    initEcharts() {
      // 获取地图数据
      axios
        .get("https://geo.datav.aliyun.com/areas_v3/bound/320213.json")
        .then((res) => {
          // 使用数据注册地图
          echarts.registerMap("liangxi", res.data);
          this.$nextTick(() => {
            // 初始化地图
            let myChart = echarts.init(this.$refs["mapEcharts"]);
            // 设置基础配置项
            const option = {
              // 悬浮窗
              tooltip: {
                trigger: "item",
                formatter: function (params) {
                  return `${params.name}`;
                },
              },
              geo: [
                // 高亮虚影层
                {
                  map: "liangxi",
                  aspectScale: 1,
                  roam: false, // 是否允许缩放
                  zoom: 1.2, // 默认显示级别
                  silent: true,
                  layoutSize: "80%",
                  layoutCenter: ["50%", "50%"],
                  itemStyle: {
                    normal: {
                      borderColor: "rgba(68, 173, 254,1)",
                      borderWidth: 6,
                      shadowColor: "rgba(68, 173, 254,1)",
                      shadowOffsetY: 0,
                      shadowBlur: 5,
                    },
                  },
                  zlevel: -1,
                },
                // 实际层
                {
                  map: "liangxi",
                  aspectScale: 1,
                  roam: false, // 是否允许缩放
                  zoom: 1.2, // 默认显示级别
                  // silent: true,
                  layoutSize: "80%",
                  layoutCenter: ["50%", "50%"],
                  itemStyle: {
                    borderColor: "rgba(68, 173, 254,.2)",
                    borderWidth: 2,
                    areaColor: "#094987",
                  },
                  emphasis: {
                    itemStyle: {
                      areaColor: "#0160AD",
                    },
                    label: {
                      show: 0,
                      color: "#fff",
                    },
                  },
                  zlevel: 1,
                },
                // 底部重影层
                {
                  map: "liangxi",
                  aspectScale: 1,
                  roam: false, // 是否允许缩放
                  zoom: 1.2, // 默认显示级别
                  silent: true,
                  layoutSize: "80%",
                  layoutCenter: ["50%", "51.2%"],
                  itemStyle: {
                    borderColor: "rgba(68, 173, 254,.2)",
                    borderWidth: 1,
                    areaColor: "#094987",
                  },
                  zlevel: -2,
                },
              ],
              bmap: {
                center: [120.30297, 31.56597],
                zoom: 15,
                roam: false,
              },
            };
            // 将配置应用到地图上
            myChart.setOption(option);
            // 获取百度地图实例，使用百度地图自带的控件
            // var bmap = myChart.getModel().getComponent("bmap").getBMap();
            // bmap.removeControl(new window.BMap.CopyrightControl());
          });
        });
    },
  },
  mounted() {
    this.initEcharts();
  },
};
</script>

<style>
.map-echart {
  height: 600px;
  width: 500px;
  background: #050f29;
}
/*去掉地图logo*/
.BMap_cpyCtrl {
  display: none;
}

.anchorBL {
  display: none;
}

.amap-logo img {
  display: none;
}

.amap-copyright {
  opacity: 0;
}
</style>
