<template>
  <div class="box">
    <div class="LeftHome">

      <div class="TopTitle" v-if="Data.length != 0">
        <!-- 保养模块基础统计 -->

        <div class="box-card one" v-if="Datatf[0]" :style="StyleTop">
          <div class="TopTitleText">
            保养模块基础统计
            <el-button style="float: right" type="success" @click="MCBaseStatc()" size="mini">
              <i class="el-icon-refresh-right"></i>
            </el-button>
          </div>
          <div class="bottomText">
            <el-tooltip content="保养跟进中(已报价)合同数量 | 15天以内" placement="top-start">
              <div class="Li" @click="MaintenanceFollowUp()">
                <img :src="imgsrcHome[0].icon" alt="">
                <div>
                  <span>{{Afterment.processing}} 份</span>
                  <span>|</span>
                  <span>{{ Afterment.processing - Afterment.unconfirmed}} 份</span>
                </div>
              </div>
            </el-tooltip>
            <el-tooltip content="本周签署保养合同 数量 | 金额" placement="top-start">
              <div class="Li" @click="contractThisWeek()">
                <img :src="imgsrcHome[1].icon" alt="">
                <div>
                  <span>{{Afterment.signed}} 份</span>
                  <span>|</span>
                  <span>{{Afterment.signedAmount}} 元</span>
                </div>
              </div>
            </el-tooltip>
            <el-tooltip content="临近到期合同提醒 MC | AS" placement="top-start">
              <div class="Li" @click="approachingExpiration()">
                <img :src="imgsrcHome[2].icon" alt="">
                <div>
                  <span>MC:{{Afterment.duesoonMC}}</span>
                  <span>|</span>
                  <span>AS:{{Afterment.duesoonAS}}</span>
                </div>
              </div>
            </el-tooltip>
          </div>
        </div>
        <!-- 零配件基础统计 -->

        <div class="box-card one" v-if="Datatf[1]" :style="StyleTop">
          <div class="TopTitleText">
            零配件基础统计
            <el-button style="float: right" type="success" @click="MCBaseStatc()" size="mini">
              <i class="el-icon-refresh-right"></i>
            </el-button>
          </div>
          <div class="bottomText">
            <el-tooltip content="零配件订单跟进中(已报价)合同数量 | 7天以内" placement="top-start">
              <div class="Li">
                <img :src="imgsrcHome[0].icon" alt="">
                <div>
                  <span>{{SOBaseStats.processing}} 份</span>
                  <span>|</span>
                  <span>{{ SOBaseStats.processing - SOBaseStats.unconfirmed}} 份</span>
                </div>
              </div>
            </el-tooltip>

            <el-tooltip content="本周签署零配件订单 数量 | 金额" placement="top-start">
              <div class="Li">
                <img :src="imgsrcHome[1].icon" alt="">
                <div>
                  <span>{{SOBaseStats.signed}} 份</span>
                  <span>|</span>
                  <span>{{SOBaseStats.signedAmount}} 元</span>
                </div>
              </div>
            </el-tooltip>
          </div>
        </div>

        <!-- 报修基础统计 -->

        <div class="box-card one" v-if="Datatf[2]" :style="StyleTop">
          <div class="TopTitleText">
            报修基础统计
            <el-button style="float: right" type="success" @click="MCBaseStatc()" size="mini">
              <i class="el-icon-refresh-right"></i>
            </el-button>
          </div>
          <div class="bottomText">
            <el-tooltip content="本周受理的报修单数量" placement="top-start">
              <div class="Li">
                <img :src="imgsrcHome[3].icon" alt="">
                <div>
                  <span>{{RequestBaseStats.apply}}</span>
                </div>
              </div>
            </el-tooltip>

            <el-tooltip content="报修单进行中数量" placement="top-start">
              <div class="Li">
                <img :src="imgsrcHome[4].icon" alt="">
                <div>
                  <span>{{RequestBaseStats.processing}} </span>
                </div>
              </div>
            </el-tooltip>

            <el-tooltip content="本周已处理(结单)工单数量" placement="top-start">
              <div class="Li">
                <img :src="imgsrcHome[5].icon" alt="">
                <div>
                  <span>{{RequestBaseStats.complete}}</span>
                </div>
              </div>
            </el-tooltip>
          </div>
        </div>

        <!-- 财务基础统计 -->

        <div class="box-card one" v-if="Datatf[2]" :style="StyleTop">
          <div class="TopTitleText">
            财务基础统计
            <el-button style="float: right" type="success" @click="MCBaseStatc()" size="mini">
              <i class="el-icon-refresh-right"></i>
            </el-button>
          </div>
          <div class="bottomText" @click="RouterLink()">
            <el-tooltip content="保养合同收款等待确认" placement="top-start">
              <div class="Li">
                <img :src="imgsrcHome[3].icon" alt="">
                <div>
                  <span>{{FinanceBaseStatText.mwc }} 条</span>

                </div>
              </div>
            </el-tooltip>
          </div>
        </div>

        <!-- <el-card class="box-card one" v-if="Datatf[3]" :style="StyleTop">
          <div slot="header">
            <div class="Tit">
              <span>财务基础统计</span>
              <el-button style="float: right" type="success" @click="MCBaseStatc()" size="mini">
                <i class="el-icon-refresh-right"></i>
              </el-button>
            </div>
          </div>
          <div class="bot" @click="RouterLink()">
            <el-tooltip content="保养合同收款等待确认" placement="top-start">
              <div class="Li">
                <img :src="imgsrcHome[3].icon" alt="">
                <div>
                  <span>{{FinanceBaseStatText.mwc }} 条</span>

                </div>
              </div>
            </el-tooltip>
          </div>
        </el-card> -->
      </div>
      <div class="ConterText" v-if="!Chart">
        欢迎使用 英之杰综合管理平台
      </div>
      <div class="BottomConter" v-if="Chart">
        <div style="width:95%;margin:auto;padding:5px 0px">
          <!-- 选择排行榜 -->

          <div class="RankingList_Div">
            <div :class="RankingList == 1 ? 'RanKing09c' : '' " @click="RanKingClick(1)">客户报修排行榜</div>
            <div :class="RankingList == 6 ? 'RanKing09c' : '' " @click="RanKingClick(6)">设备报修排行榜</div>
            <div :class="RankingList == 2 ? 'RanKing09c' : '' " @click="RanKingClick(2)">配件销售排行榜</div>
            <div :class="RankingList == 4 ? 'RanKing09c' : '' " @click="RanKingClick(4)">维修执行排行榜</div>
            <div :class="RankingList == 3 ? 'RanKing09c' : '' " @click="RanKingClick(3)">保养执行排行榜</div>
            <div :class="RankingList == 5 ? 'RanKing09c' : '' " @click="RanKingClick(5)">保养设备排行榜</div>
          </div>

        </div>
        <div style="width:95%;margin:auto;padding:5px 0px">

          <!-- 选择年 -->
          <el-date-picker v-model="year" value-format="yyyy-MM-dd" style="width:197px" @change="YesrSOK" size="mini" type="year" placeholder="选择年 默认当年"></el-date-picker>
          <!-- 选择季度 -->
          <el-select size="mini" style="width:197px" @change="QuarterSOK" v-model="Quartertext" placeholder="请选择季度">
            <el-option v-for="item in Quarter" :key="item.index" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <!-- 选择月份 -->
          <el-select size="mini" style="width:197px" @change="monthSOK" v-model="monthText" placeholder="请选择月份">
            <el-option v-for="item in month" :key="item.index" :label="item.label" :value="item.value"></el-option>
          </el-select>

          <el-radio-group v-model="more" @change="initdata()" size="mini">
            <el-radio-button label="查看全部"></el-radio-button>
            <el-radio-button label="查看前十"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="Bottom_TB_data">
          <div class="li_left">
            <div class="li_text" v-for="(item,erd) in TBData" :key='erd' :title='item.Key'>
              <div style="width:50px;float:left">{{erd + 1}} </div> {{ item.Key}}
            </div>
          </div>
          <div class="li_right">
            <div class="X1"></div>
            <div class="X1"></div>
            <div class="X1"></div>
            <div class="X1"></div>
            <div class="zhuZi" v-for="(item,sds) in TBData" :key='sds' :title="item.Value" :style="{ width : (item.Value / DataLengthD) * 100+ '%' ,background: BackGroundCoderFUN(sds) }">
              {{item.Value}}</div>
          </div>

          <!-- <el-link type="primary" @click="more = (!more),initdata()">加载更多</el-link> -->

        </div>

      </div>
    </div>
    <div class="RightView">

      <h4>研发历程</h4>
      <br>

      <el-timeline>
        <el-timeline-item e-item v-for="(activity, index) in activities" :key="index" :icon="activity.icon" :type="activity.type" :color="activity.color" size="large" :timestamp="activity.Describe">
          <el-card style="margin: -6px">
            <p style="fontSize:10px">{{activity.Key}}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>

    <el-drawer :visible.sync="drawer" direction="ltr" :modal="false" style="width: 200%" :title="titlebatch">
      <div class="top_init_data" style="marginbottom: 10px">

        <el-select size="mini" style="width:140px" @change="MaintenanceFollowUp()" v-model="CustomerType" placeholder="选择客户类型" clearable>
          <el-option v-for="item in this.$store.state.Vuex.CustomerTypes" :key="item + '99'" :label="item" :value="item"></el-option>
        </el-select>

        <el-select size="mini" style="width:140px" @change="MaintenanceFollowUp()" v-model="MCASType" placeholder="选择合同类型" clearable>
          <el-option v-for="item in ['MC','AS']" :key="item + '001'" :label="item" :value="item"></el-option>
        </el-select>

        <el-select size="mini" style="width:140px" @change="MaintenanceFollowUp()" v-model="limit" placeholder="选择合同类型">
          <el-option v-for="item in eachLidt " :key="item.name" :label="item.name" :value="item.value"></el-option>
        </el-select>

      </div>

      <!-- 表格 -->
      <el-table :data="Datatable" style="width: 100%" :height="this.$store.state.TableOptimumHeight">
        <el-table-column prop="Key" label="公司名称" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="Other" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="Describe" label="时间">
        </el-table-column>
      </el-table>
      <!-- 分页 -->
    </el-drawer>

  </div>
</template>
<script>
export default {
  name: "home-user",
  data() {
    return {
      activities: [],
      // 最上方自适应跨度
      StyleTop: {},
      // 保养数据
      Afterment: {},
      // 零配件基础统计
      SOBaseStats: {},
      // 报修基础统计
      FinanceBaseStatText: "",
      RequestBaseStats: {},
      Datatf: [
        // "保养模块基础统计"
        false,
        // "零配件基础统计"
        false,
        // "报修基础统计"
        false,
        // "保养合同收款等待确认"
        false,
      ],
      // !  以上是上部分 统计模块
      // 是否显示图表
      Chart: false,
      year: "2021-01-01",
      Quartertext: "",
      monthText: "",
      Data: [],
      RankingList: 1,

      ain: "2021-01-01",
      end: "2021-12-31",
      // 图表标题
      TBTitle: "",
      // 图表展示数据
      TBData: [],
      // 图表的最大数
      DataLengthD: 0,
      limit: false,
      eachLidt: [
        { name: "全部", value: false },
        { name: "15日内", value: true },
      ],

      // 是否查看更多排行榜

      more: "查看前十",
      drawer: false,
      titlebatch: "",
      CustomerType: "",
      MCASType: "",

      Datatable: [],
      // 季度
      Quarter: [
        { label: "第一季度", value: "-01-01&-03-31" },
        { label: "第二季度", value: "-04-01&-06-30" },
        { label: "第三季度", value: "-07-01&-09-30" },
        { label: "第四季度", value: "-10-01&-12-31" },
      ],
      month: [
        { label: "一月", value: "-01-01&-01-31" },
        { label: "二月", value: "-02-01&-02-28" },
        { label: "三月", value: "-03-01&-03-31" },
        { label: "四月", value: "-04-01&-04-30" },
        { label: "五月", value: "-05-01&-05-31" },
        { label: "六月", value: "-06-01&-06-30" },
        { label: "七月", value: "-07-01&-07-31" },
        { label: "八月", value: "-08-01&-08-31" },
        { label: "九月", value: "-09-01&-09-30" },
        { label: "十月", value: "-10-01&-10-31" },
        { label: "十一月", value: "-11-01&-11-30" },
        { label: "十二月", value: "-12-01&-12-31" },
      ],

      imgsrcHome: [
        { icon: require("../../assets/img-icon/Home/BJ.png") },
        { icon: require("../../assets/img-icon/Home/HT.png") },
        { icon: require("../../assets/img-icon/Home/DQ.png") },

        { icon: require("../../assets/img-icon/Home/DD.png") },
        { icon: require("../../assets/img-icon/Home/JXZ.png") },
        { icon: require("../../assets/img-icon/Home/JS.png") },
      ],

      BGColorList: [
        "#fcce10",
        "#b5c334",
        "#c1232b",
        "#e17e19",
        "#7b7878",
        "#e3c46f",
        "#9bca63",
        "#fe8463",
        "#27727b",
        "#e87c25",
      ],
    };
  },
  created() {
    this.init();
    this.initdata("2021-01-01", "2021-12-31");
    this.GetRDHistory();
  },
  mounted() {},
  methods: {
    // 切换选中排行榜
    RanKingClick: function (i) {
      this.RankingList = i;
      if (this.year == "") {
        this.year = "2021-01-01";
        this.initdata("2021-01-01", "2021-12-31");
        return false;
      }
      this.initdata();
    },
    // 选择季度
    QuarterSOK: function (er) {
      // console.log(er.split("&"));
      this.monthText = "";
      // console.log(this.year);
      if (this.year == "") {
        this.$look("warning", "警告！", "请选择年份！");
        return false;
      }
      this.ain = this.year.split("-")[0] + er.split("&")[0];
      this.end = this.year.split("-")[0] + er.split("&")[1];
      this.initdata();
    },
    // 选择月份
    monthSOK: function (er) {
      // console.log(er.split("&"));
      this.Quartertext = "";
      // console.log(this.year);
      if (this.year == "") {
        this.$look("warning", "警告！", "请选择年份！");
        return false;
      }
      this.ain = this.year.split("-")[0] + er.split("&")[0];
      this.end = this.year.split("-")[0] + er.split("&")[1];
      this.initdata();
    },
    // 选择年后清空季度和月份
    YesrSOK: function (er) {
      // console.log(er);
      this.Quartertext = "";
      this.monthText = "";
      if (er != null) {
        this.ain = er;
        this.end = er.split("-")[0] + "-12-31";
        this.initdata();
      }
    },
    RouterLink: function () {
      this.$router.push({ path: "/FinancialReceipts" });
    },
    // !初始
    init: function () {
      var Datas = [];
      var obj = {
        api: "get",
        url: this.$store.state.http + "System/GetMenus",
      };
      this.$https(obj).then((res) => {
        this.Data = [];
        this.$store.state.IPTopShow = [];

        for (var asd = 0; asd < res.Data.length; asd++) {
          var in1 = res.Data[asd].Url.split("-")[0] - 1;
          var in2 = res.Data[asd].Url.split("-")[1] - 1;
          if (in1 + 1 == "99") {
            if (res.Data[asd].Name == "工程师地图") {
              // 地图
              this.$store.state.IPTopShow[0] = res.Data[asd];
            } else if (res.Data[asd].Name == "排行榜统计") {
              // 排行榜统计
              this.Chart = true;
            } else {
              // 主页
              this.Data.push(res.Data[asd]);
            }
          }
        }
        // console.log(this.Data);
        // 计算 每个Li 宽度
        //将 接口赋予的权限打开
        for (let index = 0; index < this.Data.length; index++) {
          const element = this.Data[index];
          var xx = element.Url.split("-")[1] - 2;
          this.Datatf[xx] = true;
        }

        if (this.Datatf[0]) {
          this.MCBaseStatc();
        }
        if (this.Datatf[1]) {
          this.SOBaseStat();
        }
        if (this.Datatf[2]) {
          this.RequestBaseStat();
        }
        if (this.Datatf[3]) {
          this.FinanceBaseStat();
        }

        this.StyleTop = { width: 100 / this.Data.length - 1 + "%" };
        // console.log(this.StyleTop);
      });
    },
    //!  获取  保养模块基础统计
    FinanceBaseStat: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "Statistic/FinanceBaseStat",
        data: {
          mwc: "", //保养合同收款等待确认
        },
      };
      this.$https(obj).then((res) => {
        // console.log(res);
        this.FinanceBaseStatText = res.Data;
      });
    },

    //!  获取  保养模块基础统计
    MCBaseStatc: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "Statistic/MCBaseStatc",
        data: {
          cusType: "",
          mcType: "",
        },
      };
      this.$https(obj).then((res) => {
        // console.log(res);
        this.Afterment = res.Data;
      });
    },

    //!  获取  "零配件基础统计"
    SOBaseStat: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "Statistic/SOBaseStat",
        data: {
          cusType: "",
        },
      };
      this.$https(obj).then((res) => {
        // console.log(res.Data);
        this.SOBaseStats = res.Data;
        // processing,  零配件订单跟进中(已报价)合同数量
        // unconfirmed, 已报价超过7天未确认订单数量

        // signed,      本周签署零配件订单数据 数量
        // signedAmount,本周签署零配件订单数据 金额
      });
    },

    //!  获取  "报修基础统计"
    RequestBaseStat: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "Statistic/RequestBaseStat",
        data: {
          cusType: "",
        },
      };
      this.$https(obj).then((res) => {
        // console.log(res.Data);
        this.RequestBaseStats = res.Data;
        // apply,     报修单待处理(申请中)数量
        // processing,报修单进行中数量
        // complete,  本周已处理(结单)工单数量
      });
    },
    // 获取排行榜
    initdata: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "Statistic/TopTenStat",
        data: {
          begin: this.ain,
          end: this.end,
          type: this.RankingList,
          more: this.more == "查看全部" ? true : false,
        },
      };
      this.$https(obj).then((res) => {
        this.TBData = res.Data.StatDtos;
        // console.log(res.Data);
        var x = 0;
        for (let index = 0; index < this.TBData.length; index++) {
          const element = this.TBData[index];
          // if (element.Key.length > 20) {
          //   element.Key = element.Key.slice(0, 20) + "...";
          // }
          if (element.Value > x) {
            x = element.Value;
          }
        }
        this.DataLengthD = Math.ceil(x);
        // console.log(this.DataLengthD);
      });
    },

    // 根据坐标返回颜色
    BackGroundCoderFUN(ro) {
      for (let index = 0; index < this.BGColorList.length; index++) {
        if (ro > 9) {
          return this.BGColorList[
            String(ro).split("")[String(ro).split("").length - 1]
          ];
        } else {
          return this.BGColorList[ro];
        }
      }
    },

    // 获取保养跟进中
    MaintenanceFollowUp: function () {
      this.drawer = true;

      var obj = {
        api: "get",
        url: this.$store.state.http + "Statistic/MCProcessing",
        data: {
          cusType: this.CustomerType,
          mcType: this.MCASType,
          limit: this.limit,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);
        this.Datatable = res.Data.StatDtos;
        this.titlebatch = res.Data.Title;
      });
    },
    contractThisWeek: function () {
      this.drawer = true;
      var obj = {
        api: "get",
        url: this.$store.state.http + "Statistic/MCSign",
        data: {
          cusType: this.CustomerType,
          mcType: this.MCASType,
          limit: this.limit,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);
        this.Datatable = res.Data.StatDtos;
        this.titlebatch = res.Data.Title;
      });
    },
    approachingExpiration: function () {
      this.drawer = true;
      var obj = {
        api: "get",
        url: this.$store.state.http + "Statistic/MCDuesoon",
        data: {
          cusType: this.CustomerType,
          mcType: this.MCASType,
          limit: this.limit,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);
        this.Datatable = res.Data.StatDtos;
        this.titlebatch = res.Data.Title;
        console.log(this.titlebatch);
      });
    },

    // 研发历程明细
    GetRDHistory: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "Statistic/GetRDHistory",
      };
      this.$https(obj).then((res) => {
        this.activities = res.Data.StatDtos;

        for (let index = 0; index < this.activities.length; index++) {
          const element = this.activities[index];
          if (element.Other == "已完成") {
            element["icon"] = "el-icon-check";
            element["color"] = "#409eff";
          } else {
            element["icon"] = "el-icon-plus";
            element["color"] = "#0bbd87";
          }
        }

        console.log(this.activities);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
* {
  margin: none;
}

.box {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0);
  border-radius: 5px;
  overflow: auto;

  .box /deep/ .el-card__heade {
    background: #000;
  }
  //  大左侧
  .LeftHome {
    width: calc(100% - 205px);
    height: 100%;
    float: left;
    display: flex;
    flex-direction: column;
    .RankingList_Div {
      width: 1000px;
      height: 28px;
      border-radius: 5px;
      border: 1px solid #ccc;
      box-sizing: border-box;
      div {
        width: calc(100% / 6);
        height: 100%;
        float: left;
        text-align: center;
        line-height: 28px;
        font-size: 13px;
        cursor: pointer;
        background: #e4e4e4;
        transition: 0.7s;
        // font-weight: bold;
        color: #676767;
      }
      .RanKing09c {
        background: #409eff;
        color: #fff;
        transition: 0.7s;
      }
    }
    @media (min-width: 830px) and (max-width: 1367px) {
      .RankingList_Div {
        width: 100%;
        height: 28px;
        border-radius: 5px;
        border: 1px solid #ccc;
        box-sizing: border-box;
        div {
          width: calc(100% / 6);
          height: 100%;
          float: left;
          text-align: center;
          line-height: 28px;
          font-size: 13px;
          cursor: pointer;
          background: #e4e4e4;
          transition: 0.7s;
          // font-weight: bold;
          color: #676767;
        }
        .RanKing09c {
          background: #409eff;
          color: #fff;
          transition: 0.7s;
        }
      }
    }

    // 上方  每个小模块
    .TopTitle {
      width: 100%;
      // height: calc(30% - 5px);
      margin-bottom: 5px;
      // background: #fff;
      // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      float: left;
      padding: 0 0px;
      box-sizing: border-box;
      border-radius: 5px;
      .one:nth-child(1) {
        margin-left: 0px;
        margin-right: 0.6666%;
      }
      .one:nth-child(2) {
        margin-left: 0.6666%;
        margin-right: 0.6666%;
      }
      .one:nth-child(3) {
        margin-left: 0.6666%;
        margin-right: 0.6666%;
      }
      .one:nth-child(4) {
        margin-left: 0.6666%;
        margin-right: 0px;
      }

      .one {
        height: 100%;
        float: left;
        background: #fff;
        // border: 0.5px solid #ccc;
        padding: 5px;

        box-sizing: border-box;
        border-radius: 4px;
        margin: 0 0.5%;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        font-size: 12px;

        .TopTitleText {
          width: 100%;
          height: 30px;
          line-height: 30px;
          border-bottom: 1.3px solid #ccc;
          padding: 0 10px;
          box-sizing: border-box;
          font-weight: bold;
        }

        .bottomText {
          width: 100%;
          height: calc(100% - 40px);
          padding: 10px;
          box-sizing: border-box;
          .Li {
            width: 100%;
            height: 33%;
            padding-left: 2%;
            padding-top: 1%;
            box-sizing: border-box;
            img {
              width: 25px;
              height: 25px;
            }
            div {
              width: calc(100% - 25px);
              float: right;
              height: 50%;
              line-height: 30px;
              span {
                display: block;
                float: left;
                width: 45%;
                padding-left: 10%;
                box-sizing: border-box;
              }
              span:nth-child(2) {
                width: 1%;
                padding-left: 0%;
              }
            }
          }
        }
      }
    }
    // 中心 下部分
    .BottomConter {
      width: 100%;
      height: 70%;
      flex: auto;
      overflow: hidden;
      background: #fff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      float: left;
      box-sizing: border-box;
      border-radius: 5px;

      .Bottom_TB_data::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
      }
      .Bottom_TB_data::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #535353;
      }
      .Bottom_TB_data::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #ededed;
      }

      .Bottom_TB_data {
        width: 95%;
        min-height: 310px;
        max-height: calc(100% - 100px);
        overflow: auto;
        // min-height: 10px;
        padding: 10px;
        margin: auto;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
        transition: 0.5s;
        .li_left {
          width: 30%;
          // max-width: 30%;
          height: 100%;
          // border-right: 1px solid #cccc;
          float: left;
          box-sizing: border-box;
          position: relative;
          transition: 0.5s;
          .li_text {
            width: 100%;
            height: 25px;
            line-height: 25px;
            margin: 4px 0;
            padding: 0 5px;
            font-size: 12px;
            transition: 0.5s;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            border-bottom: 0.2px solid #ccc;
            transition: 0.5s;
            box-sizing: border-box;
          }
        }
        .li_right {
          width: 70%;
          height: 100%;
          float: left;
          box-sizing: border-box;
          position: relative;
          transition: 0.5s;
          // 虚线
          .X1 {
            position: absolute;
            border-right: 0.5px dashed #ccc;
            width: 0.5px;
            height: 100%;
            top: 0;
          }
          .X1:nth-child(1) {
            left: 20%;
          }
          .X1:nth-child(2) {
            left: 40%;
          }
          .X1:nth-child(3) {
            left: 60%;
          }
          .X1:nth-child(4) {
            left: 80%;
          }
          // 柱子
          .zhuZi {
            // width: 100%;
            height: 25px;
            margin: 4px 0;
            border-radius: 10px;
            padding-left: 10px;
            box-sizing: border-box;
            transition: 0.5s;
          }

          .zhuZi:nth-child(5) {
            background: #fcce10;
          }
          .zhuZi:nth-child(6) {
            background: #b5c334;
          }
          .zhuZi:nth-child(7) {
            background: #c1232b;
          }
          .zhuZi:nth-child(8) {
            background: #e17e19;
          }
          .zhuZi:nth-child(9) {
            background: #7b7878;
          }
          .zhuZi:nth-child(10) {
            background: #e3c46f;
          }
          .zhuZi:nth-child(11) {
            background: #9bca63;
          }
          .zhuZi:nth-child(12) {
            background: #fe8463;
          }
          .zhuZi:nth-child(13) {
            background: #27727b;
          }
          .zhuZi:nth-child(14) {
            background: #e87c25;
          }
        }
      }
      @media (min-width: 830px) and (max-width: 1367px) {
        /* 条件下样式的修改 */
        .Bottom_TB_data {
          width: 95%;
          height: 200px;
          padding: 10px;
          margin: auto;
          border: 1px solid #ccc;
          border-radius: 5px;
          box-sizing: border-box;
          transition: 0.5s;
          .li_left {
            width: 30%;
            // max-width: 30%;
            height: 100%;
            border-right: 1px solid #cccc;
            float: left;
            box-sizing: border-box;
            position: relative;
            transition: 0.5s;
            .li_text {
              width: 100%;
              height: 14px;
              line-height: 14px;
              margin: 4px 0;
              padding: 0 5px;
              font-size: 8px;
              transition: 0.5s;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              border-bottom: 0.2px solid #ccc;
              transition: 0.5s;
              box-sizing: border-box;
            }
          }
          .li_right {
            width: 70%;
            height: 100%;
            float: left;
            box-sizing: border-box;
            position: relative;
            transition: 0.5s;
            // 虚线
            .X1 {
              position: absolute;
              border-right: 0.5px dashed #ccc;
              width: 0.5px;
              height: 100%;
              top: 0;
            }
            .X1:nth-child(1) {
              left: 20%;
            }
            .X1:nth-child(2) {
              left: 40%;
            }
            .X1:nth-child(3) {
              left: 60%;
            }
            .X1:nth-child(4) {
              left: 80%;
            }
            // 柱子
            .zhuZi {
              // width: 100%;
              height: 14px;
              margin: 4px 0;
              border-radius: 10px;
              padding-left: 10px;
              box-sizing: border-box;
              transition: 0.5s;
              line-height: 14px;
            }

            .zhuZi:nth-child(5) {
              background: #fcce10;
            }
            .zhuZi:nth-child(6) {
              background: #b5c334;
            }
            .zhuZi:nth-child(7) {
              background: #c1232b;
            }
            .zhuZi:nth-child(8) {
              background: #e17e19;
            }
            .zhuZi:nth-child(9) {
              background: #7b7878;
            }
            .zhuZi:nth-child(10) {
              background: #e3c46f;
            }
            .zhuZi:nth-child(11) {
              background: #9bca63;
            }
            .zhuZi:nth-child(12) {
              background: #fe8463;
            }
            .zhuZi:nth-child(13) {
              background: #27727b;
            }
            .zhuZi:nth-child(14) {
              background: #e87c25;
            }
          }
        }
      }
    }
  }
  // 主页 右侧
  .RightView {
    width: 200px;
    height: 100%;
    float: right;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 10px;
    box-sizing: border-box;
    border-radius: 5px;
    overflow: auto;
  }
  .RightView::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  .RightView::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #535353;
  }
  .RightView::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #ededed;
  }
}
// 欢迎使用 英之杰 --- --- -
.ConterText {
  text-align: center;
  line-height: 400px;
  font-size: 30px;
  font-weight: bold;
  width: 100%;
  height: 70%;
  flex: auto;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  float: left;
  box-sizing: border-box;
  border-radius: 5px;
}
//mm  隐藏滚动条
.box::-webkit-scrollbar {
  display: none;
}

/deep/ :focus {
  outline: 0;
}
</style>