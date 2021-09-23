<template>
  <div class="qrcode">
    <el-dialog
      title="扫码登录"
      :visible.sync="state"
      width="30%"
      :before-close="handleClose"
      :modal="modalstate"
    >
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handlesubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    state: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      // state: false,
      modalstate: false,
    };
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },
    handlesubmit() {
      this.$emit("sure");
    },
  },
};
</script>

<style></style>
