<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <template v-for="(item, index) in columns">
      <!-- ###默认 -->
      <el-table-column
        :key="index"
        v-if="item.filed"
        :label="item.title"
        :prop="item.filed"
        :width="item.width"
      >
      </el-table-column>
      <!-- ###默认end -->
      <!-- ###自定义 -->
      <el-table-column
        :key="index"
        :label="item.title"
        :width="item.width"
        v-else
      >
        <template slot-scope="scope">
          <!-- ####switch -->
          <el-switch
            v-if="item.type === 'switch'"
            v-model="scope.row[item.payload.filed]"
            @change="item.payload.change(scope.row)"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>

          <!-- ####btn -->
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
          <!-- ####btn -->
        </template>
      </el-table-column>
    </template>
    <!-- ### 自定义end -->
  </el-table>
</template>

<script>
export default {
  props: {
    tableData: {
      required: true,
      type: Array,
    },
    columns: {
      /*
        {title,filed,...}
        */
      required: true,
      type: Array,
    },
  },
  data() {
    return {};
  },
};
</script>

<style></style>
