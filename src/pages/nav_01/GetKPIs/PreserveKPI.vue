<template>
  <div class='box_s'>
    <div class="KPITable">
      <table class="borderTable" style="width:100%">
        <tbody>
          <tr>

            <td colspan="6" style="lineHeight:40px">
              <h3>{{AddKpi.Date.split('-')[0]+'年'+AddKpi.Date.split('-')[1]+'月'  }}售后员工考核表</h3>
            </td>
          </tr>
          <tr>
            <td>姓名</td>
            <td colspan="2" class="DJCCXXRY">
              {{this.AddKpi.EmployeeName ? this.AddKpi.EmployeeName : '未查询到工程师姓名' }}

            </td>
            <td rowspan="2">初核</td>
            <td rowspan="2">复核</td>
            <td rowspan="2">备注</td>
          </tr>
          <tr>
            <td>考核项目</td>
            <td>分数</td>
            <td>评定标准</td>
          </tr>
          <tr>
            <td>客户满意度</td>
            <td>20</td>
            <td class="Conter">
              &emsp;任何有关客户的投诉及不满意，直接扣20分。
            </td>
            <td>
              <el-input-number v-model="AddKpi.Pone" size="mini" :min="-100" :max="0" :disabled="true"></el-input-number>
            </td>
            <td>
              <el-input-number v-model="AddKpi.Cone" size="mini" :min="-100" :max="0" @change="ReviewCalc()"></el-input-number>
            </td>
            <td>
              <el-input v-model="AddKpi.Mone" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入备注" size="mini"></el-input>
            </td>
          </tr>
          <tr>
            <td>工作日报<br>（完整、清晰）</td>
            <td>10</td>
            <td class="Conter">
              &emsp;每日的工作要以文字及图片的形式发日报给区域经理确认。<br>
              &emsp;日报清晰详细，语法通顺，无错别字，且客户方的联系人必须真实准确。<br>
              &emsp;工作过程中出现任何问题及时与区域经理及客户沟通，<br>
              &emsp;不得瞒报。所有工作日报均需已Excel表格形式发送，并注意格式。
            </td>
            <td>
              <el-input-number v-model="AddKpi.Ptwo" size="mini" :min="-100" :max="0" :disabled="true"></el-input-number>
            </td>
            <td>
              <el-input-number v-model="AddKpi.Ctwo" size="mini" :min="-100" :max="0" @change="ReviewCalc()"></el-input-number>
            </td>
            <td>
              <el-input v-model="AddKpi.Mtwo" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入备注" size="mini"></el-input>
            </td>
          </tr>
          <tr>
            <td>工作态度<br>（认真、好学）</td>
            <td>10</td>
            <td class="Conter">
              &emsp;上班时间：尽量做到跟4S店上班时间一致，有特殊情况提前报告；若车间情况特殊，也需保证一天正常工作量<br>
              &emsp;沟通：需耐心细致地跟客户&amp;公司员工沟通；安装、保养、维修工作上门之前需跟客户提前沟通，以保证工作顺利开展。<br>
              &emsp;学习：公司内部培训不认真学习，平时工作中不好学好问<br>
              &emsp;积极性：工作有积极性，工作态度好
            </td>
            <td>
              <el-input-number v-model="AddKpi.Pthree" size="mini" :min="-100" :max="0" :disabled="true"></el-input-number>
            </td>
            <td>
              <el-input-number v-model="AddKpi.Cthree" size="mini" :min="-100" :max="0" @change="ReviewCalc()"></el-input-number>
            </td>
            <td>
              <el-input v-model="AddKpi.Mthree" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入备注" size="mini"></el-input>
            </td>
          </tr>
          <tr>
            <td>工作效率<br>（质量、效率）</td>
            <td>40</td>
            <td class="Conter">
              &emsp;维修工作：无极其特殊原因上门维修两次以上（包含2次）<br>
              &emsp;配件报件：报件不符，多报或少报配件<br>
              &emsp;保养&amp;安装效率：效率低，磨洋工（保养标准详情见批注）<br>
              &emsp;培训：回访时客户反馈不满意，不全面（最多2次）<br>
              &emsp;没有择优选择乘车方式<br>
              &emsp;保养安排没有最大限度节约成本<br>
              &emsp;对工作有热忱，不拖沓，尽最大努力把本职工作做好。每月售后员工完成工作量对比来评判工作效率。
            </td>
            <td>
              <el-input-number v-model="AddKpi.Pfour" size="mini" :min="-100" :max="0" :disabled="true"></el-input-number>
            </td>
            <td>
              <el-input-number v-model="AddKpi.Cfour" size="mini" :min="-100" :max="0" @change="ReviewCalc()"></el-input-number>
            </td>
            <td>
              <el-input v-model="AddKpi.Mfour" type="textarea" :autosize="{ minRows: 6, maxRows: 6}" placeholder="请输入备注" size="mini"></el-input>
            </td>
          </tr>
          <tr>
            <td>安装、保养记录<br>（完整、全面）</td>
            <td>10</td>
            <td class="Conter">
              &emsp;安装&amp;培训工作：举升机、拆胎机、平衡机、KDS、制动试验台，冷媒机等需要保修的大设备安装验收单（连带序列号），<br>
              &emsp;培训记录单，清点单，客户签字盖章后原件均需邮寄给客服存档；新店数据采集（责任人最后培训人）<br>
              &emsp;保养工作：认真完成保养记录、设备保养与检修报告，客户签字后原件邮寄给客服。 <br>
              &emsp;保养记录不准确，保养耗材提前发货未能及时统计
            </td>
            <td>
              <el-input-number v-model="AddKpi.Pfive" size="mini" :min="-100" :max="0" :disabled="true"></el-input-number>
            </td>
            <td>
              <el-input-number v-model="AddKpi.Cfive" size="mini" :min="-100" :max="0" @change="ReviewCalc()"></el-input-number>
            </td>
            <td>
              <el-input v-model="AddKpi.Mfive" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入备注" size="mini"></el-input>
            </td>
          </tr>
          <tr>
            <td>网上报修<br>（及时、有效）</td>
            <td>10</td>
            <td class="Conter">
              &emsp;24小时内处理网上报修
            </td>
            <td>
              <el-input-number v-model="AddKpi.Psix" size="mini" :min="-100" :max="0" :disabled="true"></el-input-number>
            </td>
            <td>
              <el-input-number v-model="AddKpi.Csix" size="mini" :min="-100" :max="0" @change="ReviewCalc()"></el-input-number>
            </td>
            <td>
              <el-input v-model="AddKpi.Msix" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入备注" size="mini"></el-input>
            </td>
          </tr>
          <tr>
            <td colspan="3">合计得分</td>
            <td>
              {{InitialCore}}
            </td>
            <td>
              {{Review}}
            </td>
            <td></td>
          </tr>
          <tr>
            <td colspan="3">除年假外本月是否满勤（是否上浮20%）</td>
            <td colspan="2">
              <el-radio v-model="AddKpi.IsManQin" label="1">满勤</el-radio>
              <el-radio v-model="AddKpi.IsManQin" label="0">未满勤</el-radio>
            </td>
            <td></td>
          </tr>
          <tr>
            <td colspan="3">新员工减绩效总成绩</td>
            <td>
              {{AddKpi.SpecialJian}}
            </td>
            <td>
              <el-input v-model="AddKpi.SpecialJianM" size="mini" class="inp" @input="AddKpi.SpecialJianM != '' ? AddKpi.SpecialJian = '-20' :  AddKpi.SpecialJian = ''  " placeholder="请输入姓名"></el-input>
            </td>
            <td></td>
          </tr>
          <tr>
            <td colspan="3">老员工加新员工培训效总成绩</td>
            <td>
              {{AddKpi.SpecialJia}}
            </td>
            <td>
              <el-input v-model="AddKpi.SpecialJiaM" size="mini" class="inp" @input="AddKpi.SpecialJiaM != '' ? AddKpi.SpecialJia = '20' :  AddKpi.SpecialJia = ''  " placeholder="请输入姓名"></el-input>
            </td>
            <td></td>
          </tr>
          <tr>
            <td class="Conter" colspan="6">
              &emsp;注：<br>
              &emsp;(1)实习期员工无绩效考核(入职3个月内)<br>
              &emsp;(2)实习期员工正式入职后6个月内绩效考核中最终成绩的20%绩效工资给区域经理；同时区域经理需认真教新同事工作，若发现区域经理态度不端正绩效考核直接为0分；同时若区域经理没有监督到位跟员工一并在绩效考核中扣分。（若员工学习能力强，工作能力全面，区域经理可以提前打申请，员工提前转正）<br>
              &emsp;(3)区域经理权利和义务相符，区域经理在做好自己工作安排的同时有权利和义务监督员工的一切工作；在执行权利的同时也需做好带头领导作用，若没能监督好员工工作将从重处理
            </td>
          </tr>
        </tbody>
      </table>

      <el-button type="success" style="float:right;margin: 30px 30px" :loading="this.$store.state.Vuex.loading" size="mini" @click="UpdateKpi('1')">复核</el-button>

      <el-button type="primary" style="float:right;marginTop:30px" :loading="this.$store.state.Vuex.loading" size="mini" @click="UpdateKpi()">保存</el-button>

    </div>

  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
export default {
  // 定义属性
  data() {
    return {
      AddKpi: {
        Date: "", // 当前时间
        EmployeeId: "", //工程师Id
        EmployeeName: "", // 工程师姓名

        Pone: 0,
        Cone: 0,
        Mone: "",

        Ptwo: 0,
        Ctwo: 0,
        Mtwo: "",

        Pthree: 0,
        Cthree: 0,
        Mthree: "",

        Pfour: 0,
        Cfour: 0,
        Mfour: "",

        Pfive: 0,
        Cfive: 0,
        Mfive: "",

        Psix: 0,
        Csix: 0,
        Msix: "",

        SpecialJia: "",
        SpecialJiaM: "",

        SpecialJian: "",
        SpecialJianM: "",

        IsManQin: "1", //int
      },
      //   初核总分
      InitialCore: 100,
      // 复核总分
      Review: 100,
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    // 复核
    ExamineKpi: function () {
      var obj = {
        api: "post",
        url: this.$store.state.http + "PCenter/ExamineKpi",
        data: {
          Id: this.AddKpi.Id,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.$emit("refresh"),
          this.$router.push({
            path: "GetKPIs",
          });
      });
    },
    //   保存
    UpdateKpi: function (Kpis) {
      var obj = {
        api: "post",
        url: this.$store.state.http + "PCenter/UpdateKpi",
        data: this.AddKpi,
      };
      this.$https(obj).then((res) => {
        var that = this;
        if (Kpis == "1") {
          that.ExamineKpi();
        } else {
          that.$emit("refresh"),
            that.$router.push({
              path: "GetKPIs",
            });
        }
      });
    },

    // 初核实时监测
    InitialCoreCalc: function () {
      this.InitialCore =
        100 +
        this.AddKpi.Pone +
        this.AddKpi.Ptwo +
        this.AddKpi.Pthree +
        this.AddKpi.Pfour +
        this.AddKpi.Pfive +
        this.AddKpi.Psix;
    },

    // 复核实时监测
    ReviewCalc: function () {
      this.Review =
        100 +
        this.AddKpi.Cone +
        this.AddKpi.Ctwo +
        this.AddKpi.Cthree +
        this.AddKpi.Cfour +
        this.AddKpi.Cfive +
        this.AddKpi.Csix;
    },

    // 获取KPL信息
    init: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "PCenter/GetKPI",
        data: {
          kpiId: this.$store.state.Vuex.Id,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);
        this.AddKpi = res.Data;
        this.AddKpi.IsManQin = String(this.AddKpi.IsManQin);
        this.InitialCoreCalc();
        this.ReviewCalc();
      });
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // 获取详情
    this.init();
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    //   选择人员
  },
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
.KPITable {
  width: 95%;
  min-height: 500px;
  background: #d9ecff;
  border-radius: 10px;
  margin: 50px auto;
}

.borderTable {
  border: 1px solid #000000;
  line-height: 100%;
  border-collapse: collapse;
  font-size: 12px;
  // 评定标椎
  .Conter {
    text-align: left;
  }
  //   输入姓名
  .inp {
    width: 120px;
  }
  //   选择被评定人
  .DJCCXXRY {
    color: #409eff;
    cursor: pointer;
    user-select: none;
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
  line-height: 150%;
  text-align: center;
}

.borderTable td div {
  margin: 0 auto;
  //   width: 50px;
  text-align: center;
}
</style>