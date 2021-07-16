<template>
  <div id="app" @contextmenu.prevent="">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      data: [],
    };
  },
  created() {
    this.$nextTick(() => {
      // 页面渲染完成后的回调 00
      var Phieght = document.documentElement.clientHeight;
      console.log(Phieght - 300);
      this.$store.state.TableOptimumHeight = Phieght - 250;
    });
    // 读取上次关闭Vuex时存储的数据
    var localVuex = JSON.parse(localStorage.getItem("state"));
    if (localVuex != null && localVuex != "" && localVuex != undefined) {
      this.$store.state.Vuex = localVuex;
      localStorage.setItem("state", "");
    }
  },
  mounted() {
    var that = this;
    // 页面关闭或者刷新 存储数据到本地
    window.onbeforeunload = function (e) {
      localStorage.setItem("state", JSON.stringify(that.$store.state.Vuex));
    };
  },
  watch: {
    $route(to, from) {
      console.log(to.path);
    },
  },
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  font-family: "PingFangSC-Regular", "Microsoft YaHei";
}
</style>
