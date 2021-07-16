<template>
  <div class="logo1index">
    <div class="img">
      <div class="home  animate__animated animate__backInLeft">
        <p class="ppt">Sign in and start a happy day</p>
        <el-input v-model="logoName" class="input-top" placeholder="Username"></el-input>
        <el-input show-password v-model="logoPassd" class="input-top" placeholder="Password" @change='Logos()'></el-input>
        <div class="elel">
          <el-checkbox v-model="radio">记住密码</el-checkbox>
        </div>
        <el-button type="primary" :loading="loading" @click="Logos()">登录</el-button>
      </div>

      <div class="rightLogo">
        <p class="animate__animated animate__fadeInDown">
          Welcome To
          <br />INCHWELL
        </p>
      </div>
      <div class="div">
        <el-link href="https://beian.miit.gov.cn" style="color:#fff" target="_blank">北京英之杰天祥汽车技术服务有限公司 &nbsp;【京ICP备19034001号-1】</el-link>
      </div>
      <!-- <div class="div">北京英之杰天祥汽车技术服务有限公司 &nbsp;【京ICP备19034001号-1】</div> -->
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { Message } from "element-ui";

export default {
  name: "Logo",
  data() {
    return {
      loading: false,
      //  修改后的数据
      logoName: "" || localStorage.getItem("logoName"),
      logoPassd: "" || localStorage.getItem("logoPassd"),
      radio: true || Boolean(localStorage.getItem("radio")),
      //  背景图片
      list: {
        input1: "" || localStorage.getItem("lo"),
        input2: "" || localStorage.getItem("go"),
        radio: true || localStorage.getItem("do"),
      },
      zhu: {
        Name: "",
        Ename: "",
        phone: "",
        Entry: "",
        Nation: "",
        province: "",
      },
      dist: "",
      direction: "rtl",
    };
  },
  mounted() {},
  methods: {
    // 修改
    Logos: function () {
      console.log("🍍");
      if (this.logoName == null || this.logoPassd == null) {
        alert("请输入登录名或密码");
        return false;
      }
      this.loading = true;

      var obj = {
        url: this.$store.state.http + "account/login",
        // url: "/InchwellHeader/account/login",
        api: "post",
        data: {
          username: this.logoName,
          password: this.logoPassd,
        },
      };

      axios
        .post(obj.url, obj.data, {
          headers: { token: localStorage.getItem("token") },
        })

        // this.$https(obj)
        .then((row) => {
          var res = JSON.parse(row.data);

          if (res.Code != 0) {
            Message({
              message: res.Msg,
              type: "error",
            });
            this.loading = false;
            return false;
          }

          this.loading = false;
          // if (res == false) {
          //   this.loading = false;
          //   return false;
          // }

          // 判断是否需要储存账密
          if (this.radio) {
            localStorage.setItem("logoName", this.logoName);
            localStorage.setItem("logoPassd", this.logoPassd);
            localStorage.setItem("radio", "1");
          } else {
            localStorage.setItem("logoPassd", "");
            localStorage.setItem("radio", "0");
          }

          if (res.Data.length < 40) {
            // 公司
            this.$store.state.token = res.Data;
            localStorage.setItem("token", res.Data); //本地储存token
            localStorage.setItem("Logo", res.Data); //
            localStorage.setItem("sf", "admin");
            // 跳转主页
            this.$router.push({
              name: "Home",
            });
          } else {
            //  客户
            this.$store.state.CusId = JSON.parse(res.Data).CusId;
            this.$store.state.token = JSON.parse(res.Data).Token; //vuex在线储存token
            localStorage.setItem("token", JSON.parse(res.Data).Token); //本地储存token
            localStorage.setItem("Logo", res.Data); //
            localStorage.setItem("sf", "kehu");
            // 跳转主页
            // this.$router.push({
            //   name: "KH",
            // });
            this.$router.push({
              name: "Home",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
          this.$notify.error({
            title: "登录失败！",
            message: "登录失败请联系管理员！",
          });
        });
    },
  },
};
</script>
