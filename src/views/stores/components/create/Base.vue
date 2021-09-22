<template>
  <div class="base">
    <!-- ##用户创建表单 -->
    <MtFrom :width="width" :formConfig="formConfig" />
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
  </div>
</template>
<style lang="scss" scoped>
.base {
  width: 100%;
  height: 100%;
  position: relative;
  .qf-upload {
    position: absolute;
    top: 60px;
    left: 400px;
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
          label: "标题",
          width: "",
          field: "title",
          type: "text",
          clearable: true,
          rules: [
            { required: true, message: "标题不能为空", trigger: "blur" },
            { min: 3, max: 6, message: "长度在3-6个字符", trigger: "blur" },
          ],
          payload: {
            width: "500px",
          },
        },

        {
          label: "起送",
          width: "",
          field: "start_send",
          type: "text",
          payload: {
            width: "300px",
          },
          rules: [
            { required: true, message: "起送不能为空", trigger: "blur" },
            { min: 3, max: 6, message: "长度在3-6个字符", trigger: "blur" },
          ],
        },
        {
          label: "夜间配送",
          width: "",
          field: "night_send",
          type: "text",
          payload: {
            width: "300px",
          },
          rules: [
            { required: true, message: "夜间配送不能为空", trigger: "blur" },
            { min: 3, max: 6, message: "长度在3-6个字符", trigger: "blur" },
          ],
        },
        {
          label: "人均",
          width: "",
          field: "per_capita",
          type: "text",
          payload: {
            width: "300px",
          },
          rules: [
            { required: true, message: "人均不能为空", trigger: "blur" },
            { min: 3, max: 6, message: "长度在3-6个字符", trigger: "blur" },
          ],
        },
        {
          label: "电话",
          width: "",
          field: "mobile",
          type: "text",
          payload: {
            width: "300px",
          },
          rules: [
            { required: true, message: "电话不能为空", trigger: "blur" },
            { min: 11, max: 11, message: "长度在11个字符", trigger: "blur" },
          ],
        },
        {
          label: "营业时间",
          width: "",
          field: "time",
          type: "text",
          payload: {
            width: "300px",
          },
          rules: [
            { required: true, message: "营业时间不能为空", trigger: "blur" },
            { min: 3, max: 6, message: "长度在3-6个字符", trigger: "blur" },
          ],
        },
      ],
      formData: {
        title: "",
        img: "",
        start_send: "",
        night_send: "",
        per_capita: "",
        mobile: "",
        time: "",
      },
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
  },
};
</script>
