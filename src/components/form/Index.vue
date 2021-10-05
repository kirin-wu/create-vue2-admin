<template>
  <el-form :model="formData" :label-width="width" ref="form1">
    <el-form-item
      v-for="(item, index) in formConfig"
      :key="index"
      :prop="item.field"
      :label="item.label"
      :label-width="item.width"
      :rules="item.rules"
    >
      <!-- ##输入框 -->
      <!-- ###级联选择器 -->
      <el-cascader
        v-if="item.type === 'cascader'"
        :options="item.payload.options"
        v-model="formData[item.field]"
        change-on-select
        :props="item.payload.props || { label: 'label' }"
        @change="item.payload.change"
      ></el-cascader>
      <!-- ###级联选择器 -->
      <!-- ###文本输入框 -->
      <el-input
        type="text"
        :style="{ width: item.payload ? item.payload.width : '100%' }"
        :disabled="item.disabled"
        v-model="formData[item.field]"
        v-if="item.type === 'text'"
        :clearable="item.clearable"
      ></el-input>
      <!-- ###密码输入框 -->
      <el-input
        type="password"
        v-model="formData[item.field]"
        v-if="item.type === 'password'"
        :clearable="item.clearable"
        :show-password="item.showPassword"
      ></el-input>
      <!-- ###select选择器 -->
      <el-select
        v-if="item.type === 'select'"
        v-model="formData[item.field]"
        placeholder="请选择"
      >
        <el-option
          v-for="item in item.payload"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <!-- ##按钮 -->
    <el-form-item>
      <el-button
        v-for="(item, index) in formBtns"
        :key="index"
        :type="item.type"
        @click="submitFn(item.content)"
        >{{ item.content }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  // width: '0px'
  // 表格配置 一个对象代表后一个表格选项
  // formConfig: [
  //     {label: '标题',  width: '标题宽度', field: '标题字段', type: '输入框类型', rules: []}
  // ]
  // formBtns: [
  //     {content:'创建/更新/重置', type: 'primary/success/info/warning/danger', },
  //     {content:'创建/更新/重置', type: 'primary/success/info/warning/danger', },
  //     {content:'创建/更新/重置', type: 'primary/success/info/warning/danger', }
  // ]
  props: {
    width: {
      type: String,
      default: "",
    },
    formConfig: {
      type: Array,
      required: true,
    },
    formBtns: {
      type: Array,
    },
    row: {
      type: Object,
    },
  },
  created() {
    // console.log("row数据", this.row);
    if (this.row) {
      this.formData = this.row;
    }
  },
  data() {
    return {
      formData: {},
    };
  },
  methods: {
    submitFn(content) {
      if (content == "重置") {
        this.$refs.form1.resetFields();
      } else {
        this.$refs.form1.validate((isSuccess) => {
          if (isSuccess) {
            this.$emit("submit", this.formData);
          }
        });
      }
    },
  },
};
</script>

<style></style>
