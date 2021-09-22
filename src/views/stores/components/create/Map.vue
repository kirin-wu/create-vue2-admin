<template>
  <div class="map">
    <p style="margin: 5px">
      <input style="width: 200px; padding: 3px 4px" type="text" id="place" />
      <span class="map_span"></span><br /><br />
    </p>
    <div id="container" style="width: 700px; height: 500px"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    let map = new window.qq.maps.Map(document.getElementById("container"), {
      center: new window.qq.maps.LatLng(39.916527, 116.397128),
      zoom: 13,
    });
    //实例化自动完成
    let ap = new window.qq.maps.place.Autocomplete(
      document.getElementById("place")
    );
    let keyword = "";
    //调用Poi检索类。用于进行本地检索、周边检索等服务。
    let searchService = new window.qq.maps.SearchService({
      complete: function (results) {
        if (results.type === "CITY_LIST") {
          searchService.setLocation(results.detail.cities[0].cityName);
          searchService.search(keyword);
          return;
        }
        let pois = results.detail.pois;
        let latlngBounds = new window.qq.maps.LatLngBounds();
        for (let i = 0, l = pois.length; i < l; i++) {
          let poi = pois[i];
          latlngBounds.extend(poi.latLng);
          // let marker = new window.qq.maps.Marker({
          //     map: map,
          //     position: poi.latLng
          // });

          // marker.setTitle(poi.name);
        }
        map.fitBounds(latlngBounds);
      },
    });
    //添加监听事件
    window.qq.maps.event.addListener(ap, "confirm", function (res) {
      keyword = res.value;
      searchService.search(keyword);
    });
    //添加dom监听事件
    let markersArray = [];
    window.qq.maps.event.addDomListener(map, "click", function (event) {
      // addMarker(event.latLng);
      // 全部清除 增加新的
      if (markersArray) {
        for (let i in markersArray) {
          markersArray[i].setMap(null);
        }
        markersArray.length = 0;
      }
      // 增加新的
      let location = event.latLng;
      let marker = new window.qq.maps.Marker({
        position: location,
        map: map,
      });
      markersArray.push(marker);
      // 显示坐标
      document.querySelector(".map_span").innerHTML =
        "经纬度：(" + location + ")";
      console.log(location);
    });
  },
};
</script>

<style></style>
