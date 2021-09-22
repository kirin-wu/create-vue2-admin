<template>
  <div id="admin">
    <!-- #admin menu -->
    <div class="menu" :style="{ width: menuWidth }">
      <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo menu_color"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        background-color="#263445"
        text-color="#fff"
        :collapse-transition="false"
      >
        <!-- ## 后台首页 -->
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <!-- <i class="iconfont icon-fenlei"></i> -->
            <span slot="title">后台首页</span>
          </template>

          <el-menu-item index="1-1">
            <!-- <i class="el-icon-setting"></i> -->
            <i class="iconfont icon-shezhi"></i>
            欢迎页
          </el-menu-item>
          <el-menu-item index="1-2">
            <i class="iconfont icon-shezhi"></i>
            访客记录
          </el-menu-item>
        </el-submenu>
        <!-- ## 商品分类 -->
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">分类管理</span>
          </template>

          <el-menu-item index="2-1">
            <i class="iconfont icon-shezhi"></i>
            分类列表
          </el-menu-item>
          <el-menu-item index="2-2">
            <i class="iconfont icon-shezhi"></i>
            分类创建
          </el-menu-item>
        </el-submenu>
        <!-- ## 商品规格 -->
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">门店管理</span>
          </template>
          <el-menu-item index="3-1">
            <i class="iconfont icon-shezhi"></i>
            商品类型
          </el-menu-item>
          <el-menu-item index="3-2">
            <i class="iconfont icon-shezhi"></i>
            类型创建
          </el-menu-item>
          <el-menu-item index="3-3">
            <i class="iconfont icon-shezhi"></i>
            商品属性
          </el-menu-item>
          <el-menu-item index="3-4">
            <i class="iconfont icon-shezhi"></i>
            属性创建
          </el-menu-item>
        </el-submenu>
        <!-- ## 商品管理 -->
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">门店商品</span>
          </template>
          <el-menu-item index="4-1">
            <i class="iconfont icon-shezhi"></i>
            商品列表
          </el-menu-item>
          <el-menu-item index="4-2">
            <i class="iconfont icon-shezhi"></i>
            商品创建
          </el-menu-item>
          <el-menu-item index="4-3">
            <i class="iconfont icon-shezhi"></i>
            商品回收站
          </el-menu-item>
        </el-submenu>
        <!-- ## 订单管理 -->
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">订单管理</span>
          </template>
          <el-menu-item index="5-1">
            <i class="iconfont icon-shezhi"></i>
            订单管理
          </el-menu-item>
          <el-menu-item index="5-2">
            <i class="iconfont icon-shezhi"></i>
            订单回收站
          </el-menu-item>
          <el-menu-item index="5-3">
            <i class="iconfont icon-shezhi"></i>
            订单统计
          </el-menu-item>
        </el-submenu>
        <!-- ## 用户管理 -->
        <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">用户管理</span>
          </template>
          <el-menu-item index="6-1">
            <i class="iconfont icon-shezhi"></i>
            用户列表
          </el-menu-item>
          <el-menu-item index="6-2">
            <i class="iconfont icon-shezhi"></i>
            用户创建
          </el-menu-item>
        </el-submenu>
        <!-- ## 角色管理 -->
        <el-submenu index="7">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">角色管理</span>
          </template>
          <el-menu-item index="7-1">
            <i class="iconfont icon-shezhi"></i>
            角色列表
          </el-menu-item>
          <el-menu-item index="7-2">
            <i class="iconfont icon-shezhi"></i>
            角色创建
          </el-menu-item>
        </el-submenu>
        <!-- ## 权限管理 -->
        <el-submenu index="8">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">权限管理</span>
          </template>
          <el-menu-item index="8-1">
            <i class="iconfont icon-shezhi"></i>
            权限列表
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
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
      <div class="content">
        <router-view />
      </div>
    </div>
    <!-- #admin main -->
  </div>
</template>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
/* #admin */
#admin {
  width: 100%;
  height: 100%;
  display: flex;
  .menu {
    width: 200px;
    background-color: #263445;
    transition: width 0.28s;
    .menu_color {
      border: none;
    }
    .iconfont {
      font-size: 18px;
      margin-right: 5px;
      width: 24px;
      text-align: center;
      vertical-align: middle;
    }
  }
  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
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
}
</style>
<script>
// import Menu from "@/components/menu/Index.vue";
// import TOP from "@/components/top/Index.vue";
// import { Menu, Main } from "@/components";
export default {
  components: {
    // Menu,
    // Main,
  },
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
