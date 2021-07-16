<template>
  <div class="box box404">
    <div class="Left404">
      <h1>您不该到这里！</h1>
      <h1>是否遇到了什么问题?</h1>
      <h1>您可以这样做：</h1>
      <el-divider>
        <i class="el-icon-headset"></i>
        <i class="el-icon-present"></i>
        <i class="el-icon-cold-drink"></i>
        <i class="el-icon-grape"></i>
        <i class="el-icon-orange"></i>
        <i class="el-icon-ice-cream-round"></i>
        <i class="el-icon-potato-strips"></i>
        <i class="el-icon-truck"></i>
        <i class="el-icon-guide"></i>
        <i class="el-icon-collection-tag"></i>
        <i class="el-icon-bank-card"></i>
        <i class="el-icon-coin"></i>
      </el-divider>

      <el-link type="primary" @click="gotoback(1)">返回上一页</el-link>
      <el-link type="success" @click="gotoback(2)">返回主页</el-link>
      <el-link type="danger"  @click="gotoback(3)">退出登录</el-link>
    </div>
    <div class="Right404"></div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  created() {},
  components: {},
  methods: {
    gotoback(i) {
       if(i === 1){
           this.$router.go(-1); //返回上一层
       }
       if(i === 2){
           this.$router.push({
               path:'user'
           }); //返回主页
       }
       if(i === 3){
           this.$router.push({
               path:'/'
           }); //返回登录
       }
    },
  },
};
</script>
