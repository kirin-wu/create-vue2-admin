<template>
  <div class="create">
    <MtCard title="商品创建" url="/goods" btnName="返回">
      <!-- ##用户创建表单 -->
      <MtFrom
        :width="width"
        :formConfig="formConfig"
        :formBtns="formBtns"
        @submit="submitFn"
      />
      <!-- ##用户创建表单 -->
      <!-- ##上传头像 -->
      <el-upload
        class="qf-upload"
        action="http://kg.zhaodashen.cn/mt/admin/upload.jsp"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="img" :src="img" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <!-- ##上传头像 -->
    </MtCard>
  </div>
</template>
<style lang="scss" scoped>
.create {
  width: 100%;
  height: 100%;
  position: relative;
  .qf-upload {
    position: absolute;
    top: 140px;
    left: 435px;
  }
}
</style>
<script>
import { getGoodsApi, postGoodsApi } from "@/api/goods";
export default {
  data() {
    return {
      width: "80px",
      // 标题、所属分类、所属地区、封面60x60、相册
      // 商家特色筛选
      // 人均价筛选
      // 优惠活动筛选

      formConfig: [
        {
          label: "商品名称",
          width: "",
          field: "goods_name",
          type: "text",
          clearable: true,
          rules: [
            { required: true, message: "商品名称不能为空", trigger: "blur" },
          ],
          payload: {
            width: "500px",
          },
        },

        {
          label: "商品数量",
          width: "",
          field: "goods_number",
          type: "text",
          payload: {
            width: "300px",
          },
          rules: [
            { required: true, message: "库存不能为空", trigger: "blur" },
            { min: 3, max: 6, message: "长度在3-6个字符", trigger: "blur" },
          ],
        },
        {
          label: "市场价",
          width: "",
          field: "market_price",
          type: "text",
          payload: {
            width: "300px",
          },
          rules: [
            { required: true, message: "市场价不能为空", trigger: "blur" },
            { min: 3, max: 6, message: "长度在3-6个字符", trigger: "blur" },
          ],
        },
        {
          label: "销售价",
          width: "",
          field: "shop_price",
          type: "text",
          payload: {
            width: "300px",
          },
          rules: [
            { required: true, message: "销售价不能为空", trigger: "blur" },
            { min: 3, max: 6, message: "长度在3-6个字符", trigger: "blur" },
          ],
        },
        {
          label: "所属门店",
          width: "",
          field: "store_id",
          type: "select",
          payload: [
            { label: "江北一店", value: "1" },
            { label: "江北二店", value: "2" },
            { label: "江北三店", value: "3" },
            { label: "江北四店", value: "4" },
          ],
          rules: [
            { required: true, message: "所属门店不能为空", trigger: "blur" },
          ],
        },
      ],
      formData: {
        store_id: "",
        goods_name: "",
        goods_number: "",
        market_price: "",
        shop_price: "",
      },
      formBtns: [
        { content: "创建", type: "primary" },
        { content: "重置", type: "" },
      ],
      img: "",
      imgData: "",
    };
  },
  created() {
    getGoodsApi().then((res) => {
      // console.log(res);
      let temp = res.data.list.map((item) => {
        return {
          label: item.goods_name,
          value: item.goods_id,
        };
      });
      this.formConfig[4].payload = temp;
    });
  },
  methods: {
    handleAvatarSuccess(res, file) {
      // console.log(res);
      if (res.meta.state == 201) {
        this.img = URL.createObjectURL(file.raw);
        this.imgData = res.data.img;
      } else {
        this.$message.error(res.meta.msg);
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    submitFn(formData) {
      formData.goods_img = this.imgData;
      console.log("提交了", formData);
      postGoodsApi(formData).then((res) => {
        if (res.meta.state == "201") {
          this.$message({
            message: res.meta.msg,
            type: "success",
          });
          this.jump("/goods");
        } else {
          this.$message({
            message: res.meta.msg,
            type: "error",
          });
        }
      });
    },
  },
};
</script>
