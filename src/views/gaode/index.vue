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
    this.initAMap();
  },
  methods: {
    initAMap() {
      AMapLoader.load({
        // key: "d09ab504ad2e0432b952109318e79dd2", //设置您的key,这里key需要申请一个
        key: "448e60724441f609e176b03f7900c1a4", //设置您的key,这里key需要申请一个
        version: "1.4.15",
        plugins: [
          "AMap.ToolBar",
          "AMap.Driving",
          "AMap.DistrictSearch",
          "AMap.ElasticMarker",
          "AMap.CitySearch",
        ],
        AMapUI: {
          version: "1.1",
          plugins: [],
        },
        Loca: {
          version: "1.4.15",
        },
      })
        .then((AMap) => {
          AMap.plugin("AMap.DistrictSearch", () => {
            var districtSearch = new AMap.DistrictSearch({
              subdistrict: 1, // 显示下级行政区级数 可选值：0、1、2、3
              extensions: "all", // 是否返回行政区边界坐标点
              level: "biz_area", // 关键字对应的行政区级别或商圈
            });
            districtSearch.search("梁溪区", (status, result) => {
              // 查询成功时，result即为对应的行政区信息
              var bounds = result.districtList[0].boundaries;
              var mask = [];
              for (var i = 0; i < bounds.length; i += 1) {
                mask.push([bounds[i]]);
              }
              // 创建map地图实例
              this.map = new AMap.Map("container", {
                center: [120.30297, 31.56597], // 初始经纬度 梁溪区
                zoom: 12, // 缩放等级
                pitch: 0, // 俯仰角度2D下无效
                viewMode: "3D", // 地图视图模式
                features: ["bg", "point", "building"], //地图上显示的元素种类
                mask: mask, // Map 实例指定掩模的路径
                mapStyle: "amap://styles/a35cade9eadc67bdff65f0dcad0b8255", //设置地图的显示样式
                resizeEnable: true, // 拖拽
                dragEnable: true,
              });
              // 添加高度面
              var object3Dlayer = new AMap.Object3DLayer({ zIndex: 1 });
              this.map.add(object3Dlayer);
              var height = 4000;
              var color = "#298ded";
              var wall = new AMap.Object3D.Wall({
                path: bounds,
                height: height,
                color: color,
              });
              wall.transparent = true;
              object3Dlayer.add(wall);

              // 添加描边
              for (let i = 0; i < bounds.length; i += 1) {
                new AMap.Polyline({
                  path: bounds[i],
                  strokeColor: "#298ded",
                  strokeWeight: 4,
                  map: this.map,
                });
              }

              // 创建点标记
              var marker = new AMap.Marker({
                position: [120.3084, 31.56672], // 南禅寺
                icon: "http://58.215.18.189:18080/lx/static/img/mapIcon/daoyou.png",
                offset: new AMap.Pixel(0, 0),
              });

              marker.setMap(this.map);

              // 设置label标签
              marker.setLabel({
                offset: new AMap.Pixel(10, 20), //设置文本标注偏移量
                content: `<div class='info'>
                  <p class='title'>无锡市南禅寺景区<span>X</span><p>
                  <p>所属街道</p>
                  <p>等级</p>
                  <p>负责人</p>
                  <p>联系方式</p>
                  <p>地址</p>
                </div>`, //设置文本标注内容
                direction: "bottom-right", //设置文本标注方位
              });
            });
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
  background: transparent !important;
  ::v-deep.amap-marker-label {
    width: 200px;
    height: 120px;
    background: #0f405d;
    border-radius: 6px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    .title {
      color: #fff;
      position: relative;
      span {
        position: absolute;
        top: 0%;
        right: 2%;
        background: #0b547b;
      }
    }
    p {
      color: #dadee1;
      padding: 5px 10px;
    }
  }
}
</style>
