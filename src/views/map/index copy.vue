<template>
  <div ref="mapEcharts" class="map-echart"></div>
</template>

<script>
import * as echarts from "echarts";
import axios from "axios";
// import LiangXi from "../../assets/liangxi.json";
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
              // 要显示的散点数据
              series: [
                // map
                {
                  type: "scatter",
                  coordinateSystem: "bmap",
                  map: "chongq",
                  aspectScale: 1,
                  roam: false, // 是否允许缩放
                  zoom: 1.2, // 默认显示级别
                  layoutSize: "80%",
                  layoutCenter: ["50%", "50%"],
                  itemStyle: {
                    normal: {
                      borderColor: "rgba(46, 137, 225,.8)",
                      borderWidth: 4,
                      shadowColor: "#6FFDFF",
                      shadowOffsetY: 0,
                      shadowBlur: 10,
                      areaColor: "rgba(41, 125, 207,.6)",
                    },
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
                  zlevel: -3,
                },
              ],
              bmap: {
                center: [120.30297, 31.56597],
                zoom: 15,
                roam: false,
                mapStyle: {
                  styleJson: [
                    {
                      featureType: "land", //调整土地颜色
                      elementType: "geometry",
                      stylers: {
                        color: "#081734",
                      },
                    }, // 如果注释掉，该项就变成灰色
                    {
                      featureType: "building", //调整建筑物颜色
                      elementType: "geometry",
                      stylers: {
                        color: "#04406F",
                      },
                    },
                    {
                      featureType: "building", //调整建筑物标签是否可视
                      elementType: "labels",
                      stylers: {
                        visibility: "off",
                      },
                    },
                    {
                      featureType: "highway", //调整高速道路颜色
                      elementType: "geometry",
                      stylers: {
                        color: "#015B99",
                      },
                    },
                    {
                      featureType: "highway", //调整高速名字是否可视
                      elementType: "labels",
                      stylers: {
                        visibility: "off",
                      },
                    },
                    {
                      featureType: "arterial", //调整一些干道颜色
                      elementType: "geometry",
                      stylers: {
                        color: "#003051",
                      },
                    },
                    {
                      featureType: "arterial",
                      elementType: "labels",
                      stylers: {
                        visibility: "off",
                      },
                    },
                    {
                      featureType: "green",
                      elementType: "geometry",
                      stylers: {
                        visibility: "off",
                      },
                    },
                    {
                      featureType: "water",
                      elementType: "geometry",
                      stylers: {
                        color: "#044161",
                      },
                    },
                    {
                      featureType: "subway", //调整地铁颜色
                      elementType: "geometry.stroke",
                      stylers: {
                        color: "#003051",
                      },
                    },
                    {
                      featureType: "subway",
                      elementType: "labels",
                      stylers: {
                        visibility: "off",
                      },
                    },
                    {
                      featureType: "railway",
                      elementType: "geometry",
                      stylers: {
                        visibility: "off",
                      },
                    },
                    {
                      featureType: "railway",
                      elementType: "labels",
                      stylers: {
                        visibility: "off",
                      },
                    },
                    {
                      featureType: "all", //调整所有的标签的边缘颜色
                      elementType: "labels.text.stroke",
                      stylers: {
                        color: "#313131",
                      },
                    },
                    {
                      featureType: "all", //调整所有标签的填充颜色
                      elementType: "labels.text.fill",
                      stylers: {
                        color: "#FFFFFF",
                      },
                    },
                    {
                      featureType: "manmade",
                      elementType: "geometry",
                      stylers: {
                        visibility: "off",
                      },
                    },
                    {
                      featureType: "manmade",
                      elementType: "labels",
                      stylers: {
                        visibility: "off",
                      },
                    },
                    {
                      featureType: "local",
                      elementType: "geometry",
                      stylers: {
                        visibility: "off",
                      },
                    },
                    {
                      featureType: "local",
                      elementType: "labels",
                      stylers: {
                        visibility: "off",
                      },
                    },
                    {
                      featureType: "subway",
                      elementType: "geometry",
                      stylers: {
                        lightness: -65,
                      },
                    },
                    {
                      featureType: "railway",
                      elementType: "all",
                      stylers: {
                        lightness: -40,
                      },
                    },
                    {
                      featureType: "boundary",
                      elementType: "geometry",
                      stylers: {
                        color: "#8b8787",
                        weight: "1",
                        lightness: -29,
                      },
                    },
                  ],
                },
              },
            };
            // 将配置应用到地图上
            myChart.setOption(option);
            // 获取百度地图实例，使用百度地图自带的控件
            var bmap = myChart.getModel().getComponent("bmap").getBMap();
            bmap.removeControl(new window.BMap.CopyrightControl());
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
</style>
