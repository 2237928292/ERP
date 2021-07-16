<template>
  <div class="box">
  

  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    // this.init();
   
  },

  methods: {
    init: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "aaa/bbb",
        data: {
          one: "",
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>
<style lang="scss" scoped>



</style>