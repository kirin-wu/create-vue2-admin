<template>
  <div id="container"></div>
</template>
<script>
import AMapLoader from "@amap/amap-jsapi-loader";
export default {
  data() {
    return {
      map: null,
    };
  },
  mounted() {
    //DOM初始化完成进行地图初始化
    this.$nextTick(() => {
      this.initMap();
      this.init1("新疆");
    });
  },
  methods: {
    initMap() {
      //创建地图
      AMapLoader.load({
        key: "7941896918312018ae304142775d675a", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [""], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        this.map = new AMap.Map("container", {
          center: [120.30297, 31.56597], //设置中心点
          // pitch: 60,
          // rotation: -35,
          resizeEnable: true, //是否监控地图容器尺寸变化
          features: ["bg", "road", "point"], //隐藏默认楼块
          mapStyle: "amap://styles/macaron", //设置地图的显示样式
          // layers: [new AMap.TileLayer.Satellite()], //地图图层（卫星图层）    new AMap.TileLayer()
          zoom: 12, //地图显示的缩放级别
        });
      });
    },
    init1(city) {
      AMapLoader.load({
        key: "7941896918312018ae304142775d675a", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [""], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        //区域遮盖
        var that = this;
        if (that.polygon) {
          that.map.remove(that.polygon);
        }
        AMap.plugin("AMap.DistrictSearch", function () {
          new AMap.DistrictSearch({
            extensions: "all",
            subdistrict: 0,
          }).search(city, function (status, result) {
            // 外多边形坐标数组和内多边形坐标数组
            var outer = [
              new AMap.LngLat(-360, 90, true),
              new AMap.LngLat(-360, -90, true),
              new AMap.LngLat(360, -90, true),
              new AMap.LngLat(360, 90, true),
            ];
            var holes = result.districtList[0].boundaries;
            var pathArray = [outer];
            pathArray.push.apply(pathArray, holes);
            that.polygon = new AMap.Polygon({
              pathL: pathArray,
              strokeColor: "red", //城市边界颜色
              strokeWeight: 3,
              fillColor: "#5149ce", // 遮罩背景色黑色
              fillOpacity: 1,
            });
            that.polygon.setPath(pathArray);
            that.map.add(that.polygon);
          });
        });
      });
    },
  },
};
</script>
<style scoped>
#container {
  padding: 0px;
  margin: 0px;
  width: 30%;
  height: 560px;
}
</style>
