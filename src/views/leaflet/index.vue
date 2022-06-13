<template>
  <div class="map-container" id="map-container"></div>
</template>

<script>
// import data from "@/assets/liangxi.json";
export default {
  name: "mapView",
  components: {},
  data() {
    return {
      map: null,
      OSMUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      tileLayer:
        "https://services.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer",
      featureLayer:
        "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Hurricanes/MapServer/0/",
      dynamicLayer:
        "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Hurricanes/MapServer/",
      imageLayer:
        "https://landsat.arcgis.com/arcgis/rest/services/Landsat/PS/ImageServer",
    };
  },
  mounted() {
    this.map = this.$utils.map.createMap("map-container");

    // 加载 open street map 图层服务
    this.$utils.map.createTileLayer(this.map, this.OSMUrl, {});

    // 设施地图视图 中心位置
    this.map.setView([51.505, -0.09], 13);
    // this.map.geoJSON(data).addTo(this.map);
  },
};
</script>
<style lang="scss" scoped>
.map-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
