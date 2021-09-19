import Vue from "vue";
export default Vue.mixin({
  methods: {
    jump(path) {
      return this.$router.push(path);
    },
  },
});
