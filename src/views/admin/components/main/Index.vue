<template>
  <!-- #admin .main -->
  <div class="main">
    <div class="top">
      <div class="left">
        <div class="btn" @click="changeMenu">
          <i :class="menuIcon"></i>
        </div>
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div class="right">
        <span>神龙教主(超级管理员)</span>
        <i class="el-icon-full-screen"></i>
        <i class="el-icon-switch-button"></i>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  .top {
    height: 50px;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    overflow: hidden;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    .left {
      width: 300px;
      display: flex;
      .btn {
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        cursor: pointer;
        background: #fff;
      }
      .btn:hover {
        background: rgba(0, 0, 0, 0.025);
      }
      .breadcrumb {
        width: 200px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .right {
      width: 240px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        width: 176px;
      }
      i {
        width: 20;
        height: 20;
        margin: 0 5px 0 5px;
        font-size: 20px;
      }
      i:hover {
        cursor: pointer;
        color: #409eff;
      }
    }
  }
  .content {
    flex: 1;
    height: 2000px;
    overflow-y: scroll;
  }
}
</style>
<script>
export default {
  data() {
    return {
      menuWidth: "200px",
      isCollapse: false,
      menuIcon: "el-icon-s-fold",
    };
  },
  methods: {
    // ### 控制菜单切换
    changeMenu() {
      // this.menuIcon = this.menuIcon == 'el-icon-s-fold' ? 'el-icon-s-unfold' : 'el-icon-s-fold'
      this.isCollapse = !this.isCollapse;
      this.menuIcon = this.isCollapse ? "el-icon-s-unfold" : "el-icon-s-fold";
      this.menuWidth = this.isCollapse ? "64px" : "200px";
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
