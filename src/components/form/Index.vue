<template>
  <el-form
    ref="form"
    :model="formData"
    :rules="rules"
    :size="formSize"
    :labelWidth="labelWidth"
    :labelPosition="labelPosition"
  >
    <el-row v-for="(l, i) in formConfig" :key="i">
      <el-col v-for="(item, index) in l" :key="index" span="6">
        <el-form-item
          :label="item.label"
          :label-width="item.width"
          :prop="item.field"
          :rules="item.rules"
        >
          <!-- input -->
          <el-input
            v-if="item.type === 'text'"
            v-model="formData[item.field]"
            :disabled="item.disabled"
            clearable
          >
          </el-input>

          <!-- select -->
          <my-select
            v-if="item.type === 'select'"
            v-model="formData[item.field]"
            :type="item.payload"
            :is-static="item.isStatic === true ? true : false"
            placeholder="请选择"
          >
          </my-select>

          <!-- cascader -->
          <el-cascader
            v-if="item.type === 'cascader'"
            v-model="formData[item.field]"
            :options="item.payload.options"
            @change="handleChange"
          ></el-cascader>

          <!-- date -->
          <el-date-picker
            v-if="item.type === 'date'"
            v-model="formData[item.field]"
            type="daterange"
            value-formData="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>

      <!-- button -->
      <template v-if="i == lineNum">
        <el-col :span="formBtns.length > 2 ? 6 : 4" :push="push" :pull="pull">
          <el-form-item label-width="40px">
            <el-button
              v-for="(item, index) in formBtns"
              :key="index"
              :type="item.type"
              size="mudium"
              @click="handleButton(item.content)"
            >
              {{ item.content }}
            </el-button>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>
<script>
import MySelect from "../mySelect/index.vue";
export default {
  components: {
    MySelect,
  },
  props: {
    formData: {
      // 表单数据对象
      type: Object,
      default: () => {},
    },
    formConfig: {
      // 表单配置
      type: Array,
      default: () => [],
    },
    formBtns: {
      type: Array,
      default: () => [],
    },
    rules: Array, // 校验规则
    formSize: {
      // 表单组件尺寸
      type: String,
      default: "medium",
    },
    labelWidth: {
      // 表单标签宽度
      type: String,
      default: "80px",
    },
    labelPosition: {
      // 表单标签位置
      type: String,
      default: "right",
    },
    lineNum: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          let nowDate = new Date().getTime();
          let three = 30 * 24 * 3600 * 1000;
          let months = nowDate - three;
          return time.getTime() > Date.now() || time.getTime() < months;
        },
      },
    };
  },
  methods: {
    handleButton(content) {
      if (content === "查询") {
        // 表单校验
        this.$emit("submit", this.formData);
      } else if (content === "重置") {
        // 重置表单
        this.$emit("reset", true);
      } else if (content === "新增") {
        this.$emit("increase", true);
      } else {
        this.$emit("other", true);
      }
    },
  },
};
</script>
<style lang="scss"></style>
