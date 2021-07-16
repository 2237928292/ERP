<template>
  <div class='box_s'>
    <div v-if='Data.Msg == "Success"'>
      <div class="segmentation">
        基础信息 【{{Data.Dto.CusFullName}}】
      </div>
      <div class="itemmsgxx_document">
        <p><span>安装任务编号:</span>{{Data.Dto.EquInstallOrderCode}}</p>
      </div>

      <div class="itemmsgxx_document">
        <p><span>客户名称:</span>{{Data.Dto.CusFullName}}</p>
      </div>

      <div class="itemmsgxx_document">
        <p><span>区域:</span>{{Data.Dto.Area}}</p>
      </div>

      <div class="itemmsgxx_document">
        <p><span>创建者:</span>{{Data.Dto.Creater}}</p>
      </div>

      <div class="itemmsgxx_document">
        <p><span>物流单号:</span>{{Data.Dto.Logistic}}</p>
      </div>

      <div class="itemmsgxx_document">
        <p><span>收货时间:</span>{{Data.Dto.ReceiveDate || '尚未收货' }}</p>
      </div>

      <div class="itemmsgxx_document">
        <p><span>回收者:</span>{{Data.Dto.Receiver }}</p>
      </div>

      <div class="itemmsgxx_document">
        <p><span>状态:</span>{{Data.Dto.StateStr  }}</p>
      </div>
    </div>

    <div class="segmentation">
      回收物品
    </div>

    <el-table v-if='Data.Msg == "Success"' :data="Data.Dto.RecoveryGoodDtos" style="width: 100%">
      <el-table-column prop="ProductCode" label="产品内部编码">
      </el-table-column>
      <el-table-column prop="ProDesc" label="产品描述">
      </el-table-column>
      <el-table-column prop="Number" label="数量">
      </el-table-column>
    </el-table>

    <div style="width:100%;marginTop:30px" v-if="Data.Dto.State == 1">
      <el-button type="primary" size="mini" style="float:right" @click="RecoveryReceive()">收到旧件</el-button>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
export default {
  // 定义属性
  data() {
    return {
      Data: {},
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    init: function () {
      var obj = {
        url: this.$store.state.http + "WO/GetRecovery",
        api: "get",
        data: { Id: this.$store.state.Vuex.Id },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.Data = res.Data;
      });
    },
    RecoveryReceive: function () {
      var obj = {
        url: this.$store.state.http + "WO/RecoveryReceive",
        api: "post",
        data: { Id: this.Data.Dto.Id },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.init();
        this.$look("success", "已收到旧件！");
      });
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.init();
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