<template>
  <div class="NotFound">
    <p class="title">ERROR 404</p>
    <div class="planet"></div>
    <div class="dog"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.NotFound {
  height: 100%;
  overflow: hidden;
  background: url(../assets/img/sky.png) repeat-x;
  position: relative;
  .title {
    text-align: center;
    font: 60px/120px "";
    color: #fff;
  }
  .planet {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1100px;
    margin: 0px auto;
    width: 980px;
    background: url(../assets/img/planet.png) center no-repeat;
    height: 1920px;
    z-index: 0;
    transition: transform 300s linear;
    transform: rotate(501deg);
  }
  .dog {
    position: absolute;
    bottom: 325px;
    left: 753px;
    width: 80px;
    height: 80px;
    z-index: 999;
    background: url(../assets/img/dog.png) 0px 0px no-repeat;
  }
}
</style>
