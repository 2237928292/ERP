<template>
  <div class='box_s'>

    <table class="borderTable">
      <tbody>
        <tr>
          <td colspan="3" style="font-weight:800">员工出差补助申请表</td>
        </tr>
        <tr>
          <td @click="dialogTableVisible = true" class="DJCCXXRY">
            {{EmployeeName || '点击选择售后人员' }}
          </td>
          <td style="text-align:right">申请月份：</td>
          <td>
            {{ApplicationData.Date}}
          </td>
        </tr>
        <tr>
          <td style="font-weight:800">出差日期</td>
          <td style="font-weight:800">出差事由</td>
          <td style="font-weight:800">出差天数</td>
        </tr>
        <tr v-if="GcsListWork[0] ==  null">
          <td colspan="3">
            <span class="DJCCXXRY">选择售后员工后，自动调出工作日报</span>
          </td>
        </tr>

        <tr v-for="(item,index) in GcsListWork" :key='index'>
          <td style="width:25%"><span>{{item.Date.split('T')[0]}}</span></td>
          <td style="width:60%; text-align:left;">
            <span>
              <span>[维修] 张家口轩之宝汽车销售服务有限公司</span><br>
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
            <el-input v-model="ApplicationData.Days" size="mini" class="JS" disabled>
              <template slot="prepend" style="color:#000">自动计算天数：</template>
            </el-input>
            <br>

            <el-input v-model="AutomaticComputing" size="mini" class="JS">
              <template slot="prepend">手动修改天数：</template>
            </el-input>

          </td>
        </tr>
        <tr>
          <td colspan="3" style="text-align:left"> &emsp; &emsp;初核人：</td>
        </tr>
        <tr>
          <td colspan="3" style="text-align:left"> &emsp; &emsp;复核人：</td>
        </tr>
        <tr>
          <td colspan="3" style="text-align:left"> &emsp; &emsp;日期：{{DateStr}}</td>
        </tr>
      </tbody>
    </table>

    <el-button type="primary" style="float:right;marginTop:30px" :loading="this.$store.state.Vuex.loading" size="mini" @click="AddTA()">初核</el-button>

    <el-dialog title="查询工程师" :visible.sync="dialogTableVisible" :modal-append-to-body="false">
      <el-table :data="gcsData2" size='mini' height="250">
        <el-table-column property="Name" label="姓名" width="200"></el-table-column>
        <el-table-column property="Area" label="区域" width="150"></el-table-column>
        <el-table-column property="UserName" label="账号"></el-table-column>
        <el-table-column align="right">
          <template slot="header">
            <input v-model="search" @input="EachrGcs" type="text" placeholder="输入关键字搜索" class="INput">
          </template>
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="Choose(scope.row)" plain>选择</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
export default {
  // 定义属性
  data() {
    return {
      ApplicationData: {
        EnginnerId: "",
        Date: "",
        Days: 0,
        // 总计天数
      },
      EmployeeName: "",
      DateStr: "",
      //   手动修改天数
      AutomaticComputing: "",
      dialogTableVisible: false,
      gcsData: [],
      gcsData2: [],
      search: "",

      GcsListWork: [],
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    AddTA: function () {
      // 修改天数
      if (this.AutomaticComputing != "") {
        this.ApplicationData.Days = this.AutomaticComputing;
      }

      var obj = {
        api: "post",
        url: this.$store.state.http + "Pcenter/AddTA",
        data: this.ApplicationData,
      };
      this.$https(obj).then((res) => {
        this.$emit("refresh"),
          this.$router.push({
            path: "TravelAllowance",
          });
      });
    },

    SelectPersonnel: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "System/GetEmployeeMini",
        data: {
          type: "2",
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.gcsData = res.Data;
        this.gcsData2 = res.Data;
      });
    },
    // 检索gcs
    EachrGcs: function (e) {
      console.log(this.search);
      var Ec = this.search;
      var DataInit = [];

      for (let index = 0; index < this.gcsData.length; index++) {
        const element = this.gcsData[index];
        for (var ins in element) {
          console.log(element[ins]);
          var xx = String(element[ins]);
          if (xx.indexOf(Ec) != -1) {
            DataInit.push(element);
            break;
          }
        }
      }
      this.gcsData2 = DataInit;
    },
    // 选择人员
    Choose: function (er) {
      console.log(er);
      this.ApplicationData.EnginnerId = er.EmployeeId;
      this.EmployeeName = er.Name;
      this.dialogTableVisible = false;
      this.GetTATravelInfoData();
    },
    // 调出出差记录
    GetTATravelInfoData: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "PCenter/GetTATravelInfoData",
        data: {
          enginnerId: this.ApplicationData.EnginnerId,
          date: this.ApplicationData.Date,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);
        this.GcsListWork = res.Data;
        var LINumber = 0;
        for (let index = 0; index < this.GcsListWork.length; index++) {
          LINumber += this.GcsListWork[index].Days;
        }
        this.ApplicationData.Days = LINumber;
      });
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var month1 = date.getMonth();
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    this.ApplicationData.Date = year + "-" + (month1 == "0" ? "12" : month1);
    this.DateStr =
      year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second;

    this.SelectPersonnel();
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