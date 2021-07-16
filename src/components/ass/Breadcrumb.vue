<template>
  <div class="crumbs">
    <el-breadcrumb class="app-breadcrumb" separator=">">
      <el-breadcrumb-item v-for="(item)  in levelList" :key="item.path" v-if="item.meta.title">
        <router-link :to="item.redirect||item.path">{{item.meta.title}}</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <!-- <el-breadcrumb class="breadcrumb-container" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="item in levelList" :key="item.path" :to="item.path">{{item.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb> -->
  </div>
</template>
<script>
export default {
  name: "Breadcrumb",
  data() {
    return {
      levelList: null,
    };
  },
  watch: {
    $route(to, from) {
      this.getBreadcrumb();
    },
  },
  mounted() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter((item) => item.name);
      const first = matched[0];
      if (first && first.name !== "首页") {
        matched = [{ path: "/home", meta: { title: "首页" } }].concat(matched);
      }
      this.levelList = matched;
    },
  },
};
</script>
<style lang="">
.crumbs {
  height: 100%;
  background: #fff;
  border-radius: 5px;
  line-height: 20px;
  margin: 10px 0px 10px 0px;
  padding: 8px 0px 0px 10px;
  box-sizing: border-box;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>