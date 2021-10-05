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
        <el-submenu
          v-for="item in menus"
          :key="item.auth_id"
          :index="item.auth_id"
        >
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">
              {{ item.auth_name }}
            </span>
          </template>

          <el-menu-item
            v-for="sonItem in item.children"
            :key="sonItem.auth_id"
            :index="`${item.auth_id}-${sonItem.auth_id}`"
            @click="jump(sonItem.url)"
          >
            <i class="iconfont icon-shezhi"></i>
            {{ sonItem.auth_name }}
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
              <el-breadcrumb-item :key="name1"
                ><a href="/">{{ name1 }}</a></el-breadcrumb-item
              >

              <transition enter-active-class="animated fadeInRight">
                <el-breadcrumb-item :key="name2">{{
                  name2
                }}</el-breadcrumb-item>
              </transition>
            </el-breadcrumb>
          </div>
        </div>
        <div class="right">
          <span v-if="roleName">{{ uname }}({{ roleName }})</span>
          <span v-else>{{ uname }}</span>
          <i class="el-icon-switch-button" @click="outLoginFn"></i>
          <i class="el-icon-full-screen"></i>
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
        width: 310px;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          width: 240px;
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
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    // Menu,
    // Main,
  },
  data() {
    return {
      name1: "",
      name2: "",
      menuWidth: "200px",
      isCollapse: false,
      menuIcon: "el-icon-s-fold",
    };
  },
  computed: {
    ...mapState({
      uname: (state) => state.login.uname,
      roleName: (state) => state.login.roleName,
      menus: (state) => state.auths.menus,
    }),
  },
  methods: {
    // ### 退出
    ...mapMutations({
      loginOutClearData: "login/DELETE_USERINFO",
      menusOutClearData: "auths/DELETE_USERINFO",
    }),
    outLoginFn() {
      this.loginOutClearData();
      this.menusOutClearData();
      this.jump("/login");
    },
    // ### 控制菜单切换
    changeMenu() {
      // this.menuIcon = this.menuIcon == 'el-icon-s-fold' ? 'el-icon-s-unfold' : 'el-icon-s-fold'
      this.isCollapse = !this.isCollapse;
      this.menuIcon = this.isCollapse ? "el-icon-s-unfold" : "el-icon-s-fold";
      this.menuWidth = this.isCollapse ? "64px" : "200px";
    },
    handleOpen() {
      // handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose() {
      // handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    // ##监控路由变化
  },
  watch: {
    // $route(newDate) {
    //   console.log(newDate);
    //   this.name1 = newDate.meta.name1;
    //   this.name2 = newDate.meta.name2;
    // },
    $route: {
      handler(newDate) {
        this.name2 = newDate.meta.name2;
        this.name1 = newDate.meta.name1;
      },
      immediate: true,
    },
  },
};
</script>
