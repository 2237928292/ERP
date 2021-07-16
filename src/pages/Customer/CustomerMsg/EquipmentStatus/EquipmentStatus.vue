<template>
  <div class='box_s' style="z-index:888;height:100%;background:#ccc">

    <el-switch v-model="value1" active-color="#13ce66" inactive-color="#ff4949" active-text="落下" inactive-text="升起" @change="Swit()">
    </el-switch>
    <img :src="ImgUrl" alt="" style="width:500px" srcset="">

  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
export default {
  // 定义属性
  data() {
    return {
      value1: true,
      ImgUrl: "",
      BottomIng: require("../../../../assets/Bot.png"),
      TopImg: require("../../../../assets/Top.jpg"),
      GotBot: require("../../../../assets/GotBot.gif"),
      GotTop: require("../../../../assets/GotTop.gif"),
      timer: null,
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    Swit: function () {
      //   this.ImgUrl = this.Gif;
      if (this.value1) {
        this.ImgUrl = this.GotBot;
      } else {
        this.ImgUrl = this.GotTop;
      }
      this.timer = setTimeout(() => {
        //设置延迟执行
        this.Tabimg();
      }, 2000);
    },
    Tabimg: function () {
      if (this.value1) {
        this.ImgUrl = this.BottomIng;
      } else {
        this.ImgUrl = this.TopImg;
      }
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.ImgUrl = this.BottomIng;
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang='scss' scoped>
</style>