<template>
  <el-dialog
    title="分配权限"
    :visible.sync="state"
    width="30%"
    :before-close="handleClose"
    v-if="state"
  >
    <!-- ##树形控件 -->
    <el-tree
      ref="tree"
      :data="AuthsData"
      show-checkbox
      node-key="auth_id"
      :default-expanded-keys="[2, 3]"
      :default-checked-keys="this.row ? this.row.auth_ids_son.split(',') : []"
      :props="defaultProps"
    >
    </el-tree>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitFn">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getAuthsApi } from "@/api/auths";
import { putRolesChangeAuthApi } from "@/api/roles";
export default {
  props: {
    state: {
      required: true,
    },
    row: {
      row: Object,
    },
    initDateFn: {
      type: Function,
    },
  },
  data() {
    return {
      // ##树形控件数据
      AuthsData: [],
      // defaultCheckKey: [],
      defaultProps: {
        children: "children",
        label: "auth_name",
      },
    };
  },
  created() {
    getAuthsApi().then((res) => {
      this.AuthsData = res.data;
    });
  },
  methods: {
    submitFn() {
      // console.log(11111, this.$refs.tree.getCheckedNodes());
      // ##收集子的数据
      let chooseData = this.$refs.tree.getCheckedNodes();
      // console.log(chooseData);
      let auth_ids_son = [];
      chooseData.forEach((item) => {
        if (item.auth_pid != 0) auth_ids_son.push(item.auth_pid);
      });
      // ##收集父的数据
      let auth_ids = [];
      chooseData.forEach((item) => {
        if (item.auth_pid != 0) auth_ids.push(item.auth_pid);
        auth_ids = [...new Set(auth_ids)];
      });
      // console.log(1, auth_ids_son, 2, auth_ids, 3, this.row.role_id);
      auth_ids_son = auth_ids_son.join(",");
      auth_ids = auth_ids.join(",");
      let role_id = this.row.role_id;

      putRolesChangeAuthApi({
        auth_ids_son,
        auth_ids,
        role_id,
      }).then((res) => {
        if (res.meta.state == 200) {
          // console.log(res);
          this.$message({
            type: "success",
            message: `${res.meta.msg}!`,
          });
          this.initDateFn();
          this.$emit("close");
        } else {
          this.$message({
            type: "error",
            message: `${res.meta.msg}!`,
          });
        }
      });
    },
    handleClose() {
      // done();
      this.$emit("close");
    },
  },
};
</script>

<style></style>
