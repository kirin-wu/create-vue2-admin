<template>
  <el-dialog
    title="分配角色"
    :visible.sync="state"
    width="30%"
    :before-close="handleClose"
    v-if="state"
  >
  </el-dialog>
</template>

<script>
export default {
  methods: {
    submitFn(formData) {
      console.log("更新数据处理", formData);
    },
    handleClose() {
      // done();
      this.$emit("close");
    },
  },
};
</script>

<style></style>
