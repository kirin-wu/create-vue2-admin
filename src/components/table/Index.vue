<template>
  <el-table :row-key="rowkey" :data="tableData" stripe style="width: 100%">
    <template v-for="(item, index) in columns">
      <!-- ##默认 -->
      <el-table-column
        :fixed="item.fixed"
        :key="index"
        v-if="item.field"
        :label="item.title"
        :prop="item.field"
        :width="item.width"
      >
      </el-table-column>
      <!-- ##默认end -->
      <!-- ##自定义 -->
      <el-table-column
        :fixed="item.fixed"
        :key="index"
        :label="item.title"
        :width="item.width"
        v-else
      >
        <template slot-scope="scope">
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
          <!-- endtips -->

          <!--  img -->
          <img
            v-if="item.type === 'img'"
            width="50px"
            :src="
              'http://tmp00001.zhaodashen.cn/' + scope.row[item.payload.field]
            "
            alt="img"
          />
          <!--  end_img -->
          <!--  tag -->
          <!-- <el-tag
            v-if="item.type === 'tag'"
            :type="
              item.payload.color ||
              scope.row[item.payload.field] | elTagTypeFilter
            "
          >
            {{ scope.row[item.payload.field] | cateFilter }}
          </el-tag> -->

          <el-tag
            v-if="item.type === 'tag'"
            :type="
              filterFn(
                'elTagTypeFilter',
                item.payload.color || scope.row[item.payload.field]
              )
            "
          >
            {{
              filterFn(item.payload.filterName, scope.row[item.payload.field])
            }}
          </el-tag>

          <!-- end_tag -->
          <!-- btn -->
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
          <!-- end_btn -->
        </template>
      </el-table-column>
    </template>
    <!-- ### 自定义end -->
  </el-table>
</template>

<script>
import Vue from "vue";
export default {
  props: {
    rowkey: {
      type: String,
      default: "cat_id",
    },
    tableData: {
      required: true,
      type: Array,
    },
    columns: {
      /*
        {title,field,...}
        */
      required: true,
      type: Array,
    },
  },
  data() {
    return {};
  },
  methods: {
    filterFn(filterNanme, ...params) {
      let tempFn = Vue.filter(filterNanme);
      return tempFn(...params);
    },
  },
};
</script>

<style></style>
