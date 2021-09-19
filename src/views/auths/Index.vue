<template>
  <div class="auth">
    <MtCard title="权限列表" btnName="权限创建">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText">
      </el-input>
      <!-- 树形权限列表 -->
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-button type="text" size="mini" @click="() => append(data)">
              编辑
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="() => remove(node, data)"
            >
              删除
            </el-button>
          </span>
        </span>
      </el-tree>
    </MtCard>
    <Edit :state="editstate" @close="editstate = false" />
  </div>
</template>
<style lang="scss" scoped>
.auth {
  width: 100%;
  height: 100%;
  .el-input {
    margin-bottom: 30px;
  }
}
.custom-tree-node button {
  padding: 0 3px;
}
::v-deep .el-tree-node__content {
  padding-top: 5px !important;
  padding-bottom: 5px !important;
}
</style>
<script>
import Edit from "./components/Edit.vue";
export default {
  components: {
    Edit,
  },
  data() {
    return {
      editstate: false,
      filterText: "",
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
    };
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    append(data) {
      console.log("编辑", data);
      this.editstate = true;
    },
    remove(node, data) {
      console.log("删除", node, data);
      this.deleteFn();
    },
  },
};
</script>
