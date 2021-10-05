<template>
  <div class="stores">
    <!-- # 卡片 -->
    <MtCard title="门店创建" url="/stores" btnName="返回">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="base"
          ><CreateBase ref="base" />
          <el-button style="margin-left: 80px" type="primary" @click="submitFn"
            >创建</el-button
          >
        </el-tab-pane>
        <el-tab-pane label="门店筛选" name="filter"
          ><CreateFilter ref="filter"
        /></el-tab-pane>
        <el-tab-pane label="门店相册" name="imgs"
          ><CreateImgs ref="imgs"
        /></el-tab-pane>
        <el-tab-pane label="门店信息" name="map"
          ><CreateMap ref="map"
        /></el-tab-pane>
      </el-tabs>
    </MtCard>
  </div>
</template>
<style lang="scss" scoped></style>
<script>
import CreateBase from "./components/create/Base.vue";
import CreateFilter from "./components/create/Filter.vue";
import CreateImgs from "./components/create/Imgs.vue";
import CreateMap from "./components/create/Map.vue";
import { postStoresApi } from "@/api/stores";
export default {
  components: {
    CreateBase,
    CreateFilter,
    CreateImgs,
    CreateMap,
  },
  data() {
    return {
      activeName: "base",
    };
  },
  methods: {
    handleClick() {
      // handleClick(tab, event) {
      // console.log(tab, event);
    },
    submitFn() {
      let baseData = {};
      //base验证
      this.$refs.base.$children[0].$children[0].validate((isSuccess) => {
        if (isSuccess) {
          // 用ref父收集子的数据
          // console.log(this.$refs.base.$children[0].$data.formData);
          // console.log(this.$refs.base.imgData);

          baseData = this.$refs.base.$children[0].$data.formData;
          baseData.img = this.$refs.base.imgData;
          // 门店筛选验证
          this.$refs.filter.$children[0].$children[0].validate((isSuccess) => {
            if (isSuccess) {
              // ## base filter imgs map 数据
              let imgsData = this.$refs.imgs.imgs;
              let filterData = this.$refs.filter.$children[0].$data.formData;
              let mapData = this.$refs.map.location;
              let address = this.$refs.map.address;
              this.$refs.map;
              // ## base filter imgs map 数据
              // console.log("base", baseData);
              // console.log("filter", filterData);
              // console.log("imgs", imgsData);
              // console.log("map", mapData);

              // ## 收集请求的接口数据
              let postData = {
                ...baseData,
                imgs: imgsData.join(","),

                cat_id: filterData.cate_id[filterData.cate_id.length - 1],
                area_id: filterData.area_id[filterData.area_id.length - 1],
                sjts: filterData.sjts,
                rjj: filterData.rjj,
                yhhd: filterData.yhhd,

                lat: mapData.lat,
                lng: mapData.lng,
                address,
              };
              // console.log(postData);

              // ## 请求接口
              postStoresApi(postData).then((res) => {
                if (res.meta.state == "201") {
                  this.$message({
                    message: res.meta.msg,
                    type: "success",
                  });
                  this.jump("/stores");
                } else {
                  this.$message({
                    message: res.meta.msg,
                    type: "error",
                  });
                }
              });
            }
          });
        }
      });
    },
  },
};
</script>
