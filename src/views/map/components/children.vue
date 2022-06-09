<template>
  <div class="son">
    this is son
    <button @click="$emit('update', '哈哈哈')">点击传值给父组件1</button>
    <button @click="$emit('update:title', '哈哈哈')">点击传值给父组件2</button>
  </div>
</template>
