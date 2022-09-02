<template>
  <el-select
    :value="value"
    :placeholder="placeholder"
    :size="size"
    clearable
    @change="changeValue"
  >
    <el-option
      v-for="item in list"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
</template>
<script>
export default {
  props: {
    type: {
      // 查询业务类别
      type: [String, Number],
      required: true,
    },
    value: {
      // 对应的value值
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "请选择",
    },
    isStatic: {
      // 是否是静态数据不走接口
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: "medium",
    },
  },
  data() {
    return {
      list: [], // 下拉框集合
      // 静态数据Map
      staticValueMap: {
        state: [
          { label: "关闭", value: 0 },
          { label: "开启", value: 1 },
        ],
      },
    };
  },
  watch: {
    type() {
      this.queryList();
    },
  },
  mounted() {
    this.queryList();
  },
  methods: {
    queryList() {
      if (!this.type) {
        this.list = [];
        return;
      }
      if (this.isStatic) {
        this.list = this.staticValueMap[this.type];
      } else {
        // 请求接口 res =this.list
      }
    },
    changeValue(item) {
      this.value = item;
      this.$emit("change", item);
    },
  },
};
</script>
<style></style>
