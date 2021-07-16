<template>
  <div id="ccc">

    <div class="heade">
      <img :src="YZJ" style="height:100%;display: block;float: left;margin-right:50px" />
      <div class="right-admin">

        <!-- 加载状态 -->
        <el-popover placement="top-start" title="加载状态" width="200" trigger="hover" @click="HeavyLoad()" content="旋转表示正在请求数据,如长时间没有结果,请退出系统并使用 Ctrl+F5 刷新 或者 联系管理员">
          <div style="cursor:pointer" slot="reference" class="img-click-left">
            <i v-if="this.$store.state.Vuex.loading" style="color:#E6A23C" class="el-icon-loading"></i>
            <i v-if="!this.$store.state.Vuex.loading" style="color:#ffffff" class="el-icon-finished"></i>
          </div>
        </el-popover>

        <!-- 功能区 -->
        <!-- <el-popover placement="top-start" title="工程师定位" width="200" trigger="hover" content="查看工程师地图定位"> -->
        <div style="cursor:pointer" class="img-click-left" v-if="this.$store.state.IPTopShow" @click="zanwu()">
          <i style="color:#ffffff" class="el-icon-map-location"></i>
        </div>
        <!-- </el-popover> -->

        <!-- 切换到公司内网 -->
        <el-popover placement="top-start" title="英之杰天祥公司内网" width="200" trigger="hover" content="仅限使用英之杰天祥公司内部网络时使用">
          <div style="cursor:pointer" slot="reference" v-if="Switching8080" class="img-click-left" @click="Switching()">
            <!-- <img :src="immeDaUrl" alt /> -->
            <i style="color:#ffffff" class="el-icon-refresh"></i>
          </div>
        </el-popover>

        <!-- 右侧个人头像区域 -->
        <div class="right-dim" style="cursor:pointer">
          <!-- 暂时使用默认头像 -->
          <img :src="adminimg" alt class="top-img" />
          <i class="el-icon-switch-button logos" @click="logos()"></i>
          <div class="right-p">
            {{name}}
          </div>
        </div>
      </div>
    </div>

    <div class="left" android:adjustViewBounds="true">
      <Homeleft v-bind:cdd="list"></Homeleft>
    </div>

    <div class="Home-right">
      <div class="ccc" style="cursor:pointer">
        <llll></llll>
      </div>
      <div class="right_BoTtOm">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import "../../assets/css/Home.css";
import Homeleft from "../../components/ass/Homeleft";
import llll from "../../components/ass/Breadcrumb";
export default {
  name: "home",
  data() {
    return {
      msg: "0000000000000000",
      list: "",
      // 顶部功能区的图标
      adminimg: require("../../assets/img-icon/admin.png"), //头像
      YZJ: require("../../assets/images/img.png"),
      name: localStorage.getItem("logoName"),
      admins: false,
      Switching8080: false,
      // LoadingWidth:'0.0001%',
      // Loading:this.$store.state.Vuex.loading,
    };
  },

  created() {
    this.list = JSON.parse(JSON.stringify(localStorage.getItem("Logo")));
    // 判断是否为内网
    if (
      this.$store.state.http == "http://39.101.201.199:6004/api/api/" ||
      this.$store.state.http == "http://erp.inchwell.com.cn/api/api/"
    ) {
      this.Switching8080 = true;
    } else {
      this.Switching8080 = false;
    }
    // 获取必要数据
    this.init();
  },
  components: {
    Homeleft: Homeleft,
    llll: llll,
  },
  methods: {
    zanwu: function () {
      this.$router.push({ path: "/ip" });
    },
    // 退出登录
    logos: function () {
      this.$router.push({ path: "/" });
    },
    // 切换网站
    Switching: function () {
      var url = "http://192.168.1.252:8080";
      // window.localtion.href = url;
      window.open(url, "_self");
    },
    //
    init: function () {
      // 获取区域
      var obj = {
        url: this.$store.state.http + "System/GetArea",
        api: "get",
      };
      this.$https(obj).then((res) => {
        // console.log('获取区域集合，运存')
        // console.log(res.Data)
        this.$store.state.Vuex.Area = res.Data;
      });
      // 获取品牌
      var obj = {
        url: this.$store.state.http + "System/GetBrand",
        api: "get",
      };
      this.$https(obj).then((res) => {
        // console.log('获取品牌集合，运存')
        // console.log(res.Data)
        this.$store.state.Vuex.Brand = res.Data;
      });
    },
    // 重载
    HeavyLoad: function () {},
  },
};
</script>
<style lang="">
.ccc {
  height: 30px;
  margin-top: 10px;
  box-sizing: border-box;
  cursor: pointer;
}
.right_BoTtOm {
  width: 100%;
  position: relative;
  padding: 10px 0px;
  box-sizing: border-box;
  height: calc(100% - 40px);
}
</style>