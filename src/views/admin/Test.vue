<template>
  <my-form
    :form-data="postData.filter"
    :form-config="formConfig"
    :form-btns="formBtns"
    line-num="1"
    @submit="handleSubmit"
    @increase="handleIncrease"
  ></my-form>
</template>
<script>
export default {
  data() {
    return {
      postData: {},
    };
  },
};
</script>
<style lang="scss"></style>
