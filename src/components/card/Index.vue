<template>
  <transition enter-active-class="animated fadeInRight">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ title }}</span>
        <el-button
          v-if="url"
          style="float: right;margin-top:-8px ;padding: 3px 0 width:70px; border-radius: 30px;"
          type="primary"
          @click="jump(url)"
          >{{ btnName }}</el-button
        >
      </div>
      <!-- card header -->
      <!-- card content -->
      <slot></slot>
      <slot name="page"></slot>
    </el-card>
  </transition>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
    btnName: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  width: 96%;
  margin: auto;
}
</style>
