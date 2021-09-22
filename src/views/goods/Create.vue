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
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
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
            { min: 3, max: 6, message: "长度在3-6个字符", trigger: "blur" },
          ],
          payload: {
            width: "500px",
          },
        },

        {
          label: "库存",
          width: "",
          field: "repertory",
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
          field: "sale_price",
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
          field: "store",
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
        goods_name: "",
        repertory: "",
        market_price: "",
        sale_price: "",
        store: "",
      },
      formBtns: [
        { content: "登录", type: "primary" },
        { content: "重置", type: "" },
      ],
      imageUrl: "",
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    submitFn(formData) {
      console.log("提交了", formData);
    },
  },
};
</script>
