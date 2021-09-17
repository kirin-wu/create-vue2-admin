<template>
  <div class="auth">
    <!-- ### 卡片 -->
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <!-- ### 添加用户 -->
        <span>权限列表</span>
      </div>
      <el-input v-model="input" placeholder="请输入关键字进行过滤"></el-input>
      <el-tree
        :data="data"
        :props="defaultProps"
        @node-click="handleNodeClick"
      ></el-tree>
    </el-card>
  </div>
</template>
<style lang="scss" scoped>
.auth {
  width: 100%;
  height: 100%;
  .el-card {
    width: 96%;
    margin: auto;
    .el-input {
      margin-bottom: 30px;
    }
  }
}
</style>
<script>
export default {
  data() {
    return {
      input: "",
      data: [
        {
          label: " 后台首页",
          children: [
            {
              label: "欢迎页",
            },
            {
              label: "访客记录",
            },
          ],
        },
        {
          label: " 商品分类",
          children: [
            {
              label: "分类列表",
            },
            {
              label: "分类创建",
            },
          ],
        },
        {
          label: " 商品规格",
          children: [
            {
              label: "商品类型",
            },
            {
              label: "类型创建",
            },
            {
              label: "商品属性",
            },
            {
              label: "属性创建",
            },
          ],
        },
        {
          label: " 商品管理",
          children: [
            {
              label: "商品列表",
            },
            {
              label: "商品创建",
            },
            {
              label: "商品回收站",
            },
          ],
        },
        {
          label: " 订单管理",
          children: [
            {
              label: "订单管理",
            },
            {
              label: "订单回收站",
            },
            {
              label: "订单统计",
            },
          ],
        },
        {
          label: " 用户管理",
          children: [
            {
              label: "用户列表",
            },
            {
              label: "用户创建",
            },
          ],
        },
        {
          label: " 角色管理",
          children: [
            {
              label: "角色列表",
            },
            {
              label: "角色创建",
            },
          ],
        },
        {
          label: " 权限管理",
          children: [
            {
              label: "权限列表",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
};
</script>
