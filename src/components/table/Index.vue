<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :height="tableHeight"
    @selection-change="handleSelectionChange"
    :header-cell-style="headerStyle"
  >
    <!-- 勾选框 序号 -->
    <el-table-column fixed type="selection" width="55" v-if="isCheckbox">
    </el-table-column>
    <el-table-column label="序号" type="index" width="55" fixed v-if="isOrder">
    </el-table-column>
    <!-- end -->

    <template v-for="(item, index) in columns">
      <!-- 普通 -->
      <el-table-column
        v-if="item.field"
        :key="index"
        :prop="item.field"
        :label="item.name"
        :width="item.width"
      >
      </el-table-column>
      <!-- end -->

      <!-- 自定义 -->
      <el-table-column
        v-else
        :key="item.field"
        :label="item.name"
        :width="item.width"
        :fixed="item.fixed"
      >
        <template slot-scope="scope">
          <!-- 具名插槽 -->
          <template v-if="item.slotName">
            <slot
              :name="item.slotName"
              :row="scope.row[item.payload.field]"
              :data="scope.row"
            />
          </template>

          <!-- switch -->
          <el-switch
            v-if="item.type === 'switch'"
            v-model="scope.row[item.payload.field]"
            @change="item.payload.change(scope.row)"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0"
          >
          </el-switch>
          <!--  end_switch -->

          <!-- tips -->
          <el-tooltip
            v-if="item.type === 'tips'"
            class="item"
            effect="dark"
            :content="scope.row[item.payload.field]"
            placement="bottom-end"
          >
            <span> {{ scope.row[item.payload.field] | substrFilter(8) }}</span>
          </el-tooltip>

          <!-- button -->
          <template v-if="item.type === 'btn'">
            <el-button
              size="mini"
              :type="item.type"
              v-for="(item, index) in item.payload"
              :key="index"
              @click="item.click(scope.row)"
            >
              <span v-if="item.name">
                {{ item.name }}
              </span>
              <i v-else :class="item.icon"></i>
            </el-button>
          </template>
        </template>
      </el-table-column>
      <!-- end -->
    </template>
  </el-table>
</template>
<script>
export default {
  name: "myTable",
  props: {
    headerStyle: {
      type: Object,
      default: () => {
        return {
          background: "#fafafa",
          color: "#555",
          fontsize: "14px",
          fontWeight: 400,
        };
      },
    },
    columns: {
      // 表格配置
      type: Array,
      required: true,
    },
    tableData: {
      // 表格数据
      type: Array,
      required: true,
    },
    params: {
      // 接口参数
      type: Object,
      required: false,
    },
    tableHeight: {
      // 表格高度
      type: String,
      required: false,
    },
    isCheckbox: {
      // 多选框
      type: Boolean,
      default: true,
    },
    isOrder: {
      // 序列号
      type: Boolean,
      default: true,
    },
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },
  },
};
</script>
