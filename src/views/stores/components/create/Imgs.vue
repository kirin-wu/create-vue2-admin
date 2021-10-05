<template>
  <div class="imgs">
    <el-upload
      action="http://kg.zhaodashen.cn/mt/admin/upload.jsp"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleAvatarSuccess"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,

      imgs: [],
    };
  },
  methods: {
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      // ## 过滤删除的图片
      let imgs = fileList.map((item) => {
        return item.response.data.img;
      });

      this.imgs = imgs;
      // console.log(this.imgs);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleAvatarSuccess(res) {
      // console.log(res);
      if (res.meta.state == 201) {
        this.imgs.push(res.data.img);
        // console.log(this.imgs);
      } else {
        this.$message.error(res.meta.msg);
      }
    },
  },
};
</script>

<style></style>
