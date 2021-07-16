<template>
  <div class='box_s'>

    <div style="width:800px">

      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="产品">
          <el-card class="box-card" size='mini'>
            <div slot="header" class="clearfix" style="margin:-10px">
              <span>{{Data.Desc}}</span>
            </div>
            <div style="margin:-15px">
              <p> <span style="marginRight:100px">产品编号</span> {{ Data.ProductCode }}</p>
              <p> <span style="marginRight:100px">内部编码</span> {{ Data.BarcodeMemo }}</p>
              <p> <span style="marginRight:100px">{{ '品牌' + '&emsp;&emsp;'  }} </span> {{ Data.Brand }}</p>
            </div>
          </el-card>

        </el-form-item>

        <el-form-item label="库位">
          <el-input v-model="Data.Position" size="mini" style="width:300px"></el-input>
        </el-form-item>

        <el-form-item label="隶属">
          <el-radio-group v-model="Data.Belong" size="mini">
            <el-radio label="客服部"></el-radio>
            <el-radio label="培训室"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="备注">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" size="mini" v-model="Data.Memo"></el-input>
        </el-form-item>

        <el-form-item>

          <el-button size="mini" @click='onSubmitON'>取消</el-button>
          <el-button size="mini" type="primary" @click="onSubmit">确认修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
export default {
  // 定义属性
  data() {
    return {
      form: {
        Position: "",
        Belong: "",
        Memo: "",
      },

      GDProIdData: {},
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    onSubmit: function () {
      if (this.Data.Position == "") {
        this.$look("warning", "请输入库位！");
        return false;
      }

      if (this.Data.Belong == "") {
        this.$look("warning", "请选择隶属");
        return false;
      }

      var obj = {
        api: "post",
        url: this.$store.state.http + "StorageRoom/UpdaetStandby",
        data: {
          Id: this.Data.Id,
          Position: this.Data.Position,
          Memo: this.Data.Memo,
          Belong: this.Data.Belong == "客服部" ? 1 : 2,
        },
      };
      this.$https(obj).then((res) => {
        this.$emit("refresh"),
          this.$router.push({ path: "/SparePartsStorehouse" });
        this.$msgs(0, "添加成功！");
      });
    },
    // onSubmitON
    onSubmitON: function () {
      this.$emit("refresh"),
        this.$router.push({ path: "/SparePartsStorehouse" });
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.Data = this.$store.state.GDProIdData;
    console.log(this.$store.state.GDProIdData);
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