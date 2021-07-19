<template>
  <div class='box_s'>

    <table class="borderTable" v-if="Data.Msg == 'Success' ">
      <tbody>
        <tr>
          <td colspan="3" style="font-weight:800">员工出差补助申请表</td>
        </tr>
        <tr>
          <td @click="dialogTableVisible = true" class="DJCCXXRY">
            {{Data.Dto.EnginnerName}}
          </td>
          <td style="text-align:right">申请月份：</td>
          <td>
            {{Data.Dto.Date}}
          </td>
        </tr>
        <tr>
          <td style="font-weight:800">出差日期</td>
          <td style="font-weight:800">出差事由</td>
          <td style="font-weight:800">出差天数</td>
        </tr>

        <tr v-for="(item,index) in GcsListWork" :key='index'>
          <td style="width:25%"><span>{{item.Date.split('T')[0]}}</span></td>
          <td style="width:60%; text-align:left;">
            <span>
              <span>{{item.Info}}</span><br>
            </span>
          </td>
          <td style="width:15%"><span>{{item.Days}}</span></td>
        </tr>

        <tr>
          <td>合计</td>
          <td style="text-align:left; color:red">
            <span> &emsp; &emsp;【自动计算天数】是系统自送根据工作日报计算得出；</span>
            <br>
            <span> &emsp; &emsp;【手动修改天数】是审核人根据实际情况核算天数，财务计算补助以【手动修改天数】为准；</span>
          </td>
          <td>
            <el-input v-model="Data.Dto.Days" size="mini" class="JS" disabled>
              <template slot="prepend" style="color:#000">自动计算天数：</template>
            </el-input>
            <br>

            <el-input v-model="AutomaticComputing" size="mini" class="JS">
              <template slot="prepend">手动修改天数：</template>
            </el-input>

          </td>
        </tr>
        <tr>
          <td colspan="3" style="text-align:left"> &emsp; &emsp;初核人：{{Data.Dto.FirstInspection}}</td>
        </tr>
        <tr>
          <td colspan="3" style="text-align:left"> &emsp; &emsp;复核人：</td>
        </tr>
        <tr>
          <td colspan="3" style="text-align:left"> &emsp; &emsp;日期：{{Data.Dto.CreateDate}}</td>
        </tr>
      </tbody>
    </table>

    <el-button type="primary" style="float:right;marginTop:30px" :loading="this.$store.state.Vuex.loading" @click="FH()" size="mini">复核</el-button>

  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
export default {
  // 定义属性
  data() {
    return {
      AutomaticComputing: "",

      GcsListWork: [],
      Data: {},
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    // 复核
    FH: function () {
      var NumberDate = this.Data.Dto.Date;
      // 修改天数
      if (this.AutomaticComputing != "") {
        NumberDate = this.AutomaticComputing;
      }

      var obj = {
        api: "post",
        url: this.$store.state.http + "Pcenter/ExamineTA",
        data: {
          Id: this.$store.state.Vuex.Id,
          Str: NumberDate,
        },
      };
      this.$https(obj).then((res) => {
        this.$emit("refresh"),
          this.$router.push({
            path: "TravelAllowance",
          });
      });
    },
    init: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "Pcenter/GetTADetailDetail",
        data: {
          taId: this.$store.state.Vuex.Id,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.Data = res.Data;
        this.GcsListWork = res.Data.TravelInfos;
        this.AutomaticComputing = res.Data.Dto.Days;
        this.Data.Dto.Days = 0;
        for (let index = 0; index < this.GcsListWork.length; index++) {
          this.Data.Dto.Days += this.GcsListWork[index].Days;
        }
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
.borderTable {
  width: 80%;
  //   min-height: 100px;
  border-radius: 10px;
  margin: 50px auto;
  line-height: 25px;
  font-size: 12px;
  border-collapse: collapse;
  //   选择被评定人
  .DJCCXXRY {
    color: #409eff;
    cursor: pointer;
    user-select: none;
    text-align: center;
  }
  //   检索工程师输入框
}
.INput {
  height: 28px;
  line-height: 28px;
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 30px;
  line-height: 30px;
  outline: 0;
  padding: 0 15px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}

.borderTable td {
  border: 1px solid #000000;
  text-align: center;
  padding: 0;
}
.JS {
  width: 200px;
}
</style>