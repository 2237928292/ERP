<template>
  <div class="box_s">
    <el-steps :active="StateActive" v-if="StateActive != 13" id="BottomTextStopes">
      <el-step icon="el-icon-caret-bottom" description="已受理"></el-step>
      <el-step icon="el-icon-caret-bottom" description="在保状态已确认"></el-step>
      <el-step icon="el-icon-caret-bottom" description="已预报价"></el-step>
      <el-step icon="el-icon-caret-bottom" description="预报价已确认"></el-step>
      <el-step icon="el-icon-caret-bottom" description="已指派工程师"></el-step>
      <el-step icon="el-icon-caret-bottom" description="已接受任务"></el-step>
      <el-step icon="el-icon-caret-bottom" description="已出发"></el-step>
      <el-step icon="el-icon-caret-bottom" description="已到达"></el-step>
      <el-step icon="el-icon-caret-bottom" description="工作已完成"></el-step>
      <el-step icon="el-icon-caret-bottom" description="已报最终价"></el-step>
      <el-step icon="el-icon-caret-bottom" description="最终价已确认"></el-step>
      <el-step icon="el-icon-caret-bottom" description="已结单"></el-step>
    </el-steps>

    <el-steps :active="1" v-if="StateActive == 13" finish-status='error' id="BottomTextStopes">
      <el-step icon="el-icon-caret-bottom" description="已撤单"></el-step>
    </el-steps>

    <!-- 客户信息 -->
    <div class="boxj4bjb5hv65k43n53">
      <div v-if='Data.RepairBase'>
        <div class="segmentation">
          客户信息 【{{Data.RepairBase.CusName}}】
        </div>
        <div class="itemmsgxx_document" style="width: 100%">
          <p><span>报修单号:</span>{{Data.RepairBase.RepairCode}}</p>
        </div>
        <div class="itemmsgxx_document">
          <p><span>报修人:</span>{{Data.RepairMan.RepairName}}</p>
        </div>
        <!-- <div class="itemmsgxx_document">
        <p><span>报修单号:</span>{{Data.RepairBase.RepairCode}}</p>
      </div> -->
        <div class="itemmsgxx_document">
          <p><span>英文名:</span>{{Data.RepairMan.RepairNameEn}}</p>
        </div>
        <div class="itemmsgxx_document">
          <p><span>手机号码:</span>{{Data.RepairMan.MobilePhone}}</p>
        </div>
        <div class="itemmsgxx_document">
          <p><span>固定号码:</span>{{Data.RepairMan.Tel}}</p>
        </div>
        <div class="itemmsgxx_document" style="width: 600px">
          <p><span>邮箱:</span>{{Data.RepairMan.Email}}</p>
        </div>
        <div class="itemmsgxx_document" style="width: 600px">
          <p><span>公司地址:</span>{{Data.RepairMan.AddressDetail}}</p>
        </div>
        <div class="itemmsgxx_documentText">
          <p style="word-break:break-all"><span>客户备注:</span>{{Data.RepairBase.Remark}}</p>
        </div>
      </div>
      <!-- 设备信息 -->
      <div v-if='Data.RepairDeviceInfo'>
        <div class="segmentation">
          故障设备
        </div>
        <div class="itemmsgxx_document">
          <p><span>产品编号:</span>{{Data.RepairDeviceInfo.DeviceCode}}</p>
        </div>
        <div class="itemmsgxx_document">
          <p><span>序列号:</span>{{Data.RepairDeviceInfo.DeviceSN}}</p>
        </div>
        <div class="itemmsgxx_document">
          <p><span>设备品牌:</span>{{Data.RepairDeviceInfo.DeviceBrand}}</p>
        </div>
        <div class="itemmsgxx_document" style="width: 100%">
          <p><span>设备描述:</span>{{Data.RepairDeviceInfo.DeviceDesc}}</p>
        </div>
        <div class="itemmsgxx_documentText">
          <p style="word-break:break-all"><span>故障描述:</span>{{Data.RepairBase.FaultDescribe}}</p>
        </div>
      </div>

      <!-- 图片&视频 -->
      <div v-if='Data.RepairDeviceInfo'>
        <div class="segmentation">
          故障图片&视频
        </div>
        <div class="demo-image__preview" style="width:200px;float:left" v-for="(upload,index) in Data.RepairFaultImages" :key="index" @click="IMGVIDEO(upload)">
          <el-image v-if="upload.Type == 'picture' " style="width: 100px; height: 100px" :src="upload.Path" fit="fill" :preview-src-list="imgList"></el-image>
        </div>
        <div class="demo-image__preview" style="width:200px;float:left" v-for="(upload1,index1) in Data.RepairFaultImages" :key="index1 + 123" @click="IMGVIDEO(upload)">
          <video style="width:100%" v-if="upload1.Type == 'video' " :src="upload1.Path" class="avatar video-avatar" controls="controls">
            您的浏览器不支持视频播放
          </video>
        </div>
      </div>

      <el-dialog :visible.sync="dialogVisibleMainGraph" class='spc12' :modal-append-to-body="false">
        <img v-if="!(imageUrl.type == 'video/mp4') " width="100%" :src="imageUrl.Path" alt="">
        <video v-if="imageUrl.type == 'video/mp4' " :src="imageUrl.Path" class="avatar video-avatar" controls="controls">
          您的浏览器不支持视频播放
        </video>
      </el-dialog>

      <!-- 费用清单 -->
      <div v-if='Data.RepairCosts'>
        <div class="segmentation">
          费用清单
        </div>

        <el-table :data="Data.RepairCosts" @row-click='TravelForOnSiteMaintenance' style="width: 100%;paddingLeft:50px;fontSize:12px">
          <el-table-column prop="OrderTypeStr" label="工单类型" width="180">
          </el-table-column>
          <el-table-column prop="WoCode" label="工单单号" width="180">
          </el-table-column>
          <el-table-column prop="TravelTravelInfo" label="差旅费" width="180">
          </el-table-column>
          <el-table-column prop="Service" label="服务费">
          </el-table-column>
          <el-table-column prop="QupteCode" label="报价单号">
          </el-table-column>
          <el-table-column prop="Cost" label="合计">
          </el-table-column>
          <el-table-column fixed="right" label="报价单" width="150">
            <template>
              <p style="color:#409EFF">点击查看报价单</p>
            </template>
          </el-table-column>
        </el-table>

        <!-- <div class="itemmsgxx_document" style="width: 100%">
          <p><span>差旅费:</span>{{this.Data.RepairProcess.Travel.Province + ' - ' + this.Data.RepairProcess.Travel.City  + '￥' + this.Data.RepairProcess.Travel.Price  }}</p>
        </div>
        <div class="itemmsgxx_document" style="width: 100%" v-for="(items,indexxx) in Data.RepairCosts" :key='indexxx + 1'>
          <p><span style="width:200px">{{items.WoCode}}:</span>￥{{items.Cost}}</p>
        </div>
        <div class="itemmsgxx_document" style="width: 100%">
          <p><span>总计:</span>￥{{WoCodeCost}}</p>
        </div> -->
      </div>

      <!-- 工程师 -->
      <div v-if="StateActive > 4">
        <div class="segmentation">
          工程师
        </div>
        <div class="itemmsgxx_document">
          <p><span>工程师:</span>{{Data.RepairProcess.Enginner}}</p>
        </div>
        <div class="itemmsgxx_documentText">
          <p style="word-break:break-all"><span>备注:</span>{{Data.RepairProcess.WorkContent}}</p>
        </div>
      </div>

      <!-- 最终价 -->
      <div v-if="StateActive > 8">
        <div class="segmentation">
          最终价
        </div>
        <!-- 报最终价 -->
        <div class="itemmsgxx_document" v-if="StateActive == 9 || StateActive == 10">
          <span style="float:left">最终价:</span>
          <el-input style="width:193px;float:left" size="mini" v-model="ActualCharge" placeholder=""></el-input>
        </div>
        <div class="itemmsgxx_document" v-if="StateActive == 9 || StateActive == 10">
          <span>最终优惠价:</span>
          <el-input style="width:193px" size="mini" v-model="DiscountFinalCharge" placeholder=""></el-input>
        </div>
        <!-- 最终价已确认 -->
        <div class="itemmsgxx_document" v-if="StateActive > 10">
          <p><span>最终价：</span>{{Data.RepairProcess.ActualCharge}}</p>
        </div>
        <div class="itemmsgxx_document" v-if="StateActive > 10">
          <p><span>最终优惠价：</span>{{Data.RepairProcess.DiscountFinalCharge}}</p>
        </div>
      </div>

      <!-- 最终价 -->
      <div>
        <div class="segmentation">
          差旅费报价单
        </div>
        <div class="itemmsgxx_document" v-if="StateActive == 1">
          <span>差旅费报价单:</span>
          <el-input style="width:193px" size="mini" v-model="TravelPriceOffer" placeholder=""></el-input>
        </div>
      </div>

      <!-- 选择在保状态 -->
      <div>
        <div class="segmentation">
          在保状态
          <!-- <el-button type="success" style="float:right;" size="mini" @click="AddOrdeTypeWorkOrderr()">创建工单</el-button> -->
        </div>
        <div class="itemmsgxx_documentSece" v-if="State == 1">
          <span class="leftSpan">选择在保状态:</span>
          <el-select v-model="InState" style="width:150px" size="mini" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="itemmsgxx_document" v-if="State != 1 && Data.RepairProcess">
          <p><span>在保状态:</span>{{Data.RepairProcess.IsUnderWarranty ? '在保' : '不在保'}}</p>
        </div>
      </div>

      <!-- 选择差旅费 -->
      <div v-if="State == 1">
        <div class="segmentation">
          选择差旅费
          <!-- <el-button type="success" style="float:right;" size="mini" @click="AddOrdeTypeWorkOrderr()">创建工单</el-button> -->
        </div>
        <el-autocomplete class="inline-input" size="mini" style="width:250px;float:left;margin:10px" v-model="TravelAmount" :show-overflow-tooltip="true" :fetch-suggestions="querySearch" placeholder="请选择市区"
          @select="handleSelect" clearable @clear="Qingk" @input="InoutgB" :automatic-dropdown="true">
          <template slot="prepend">差旅费：￥</template>
        </el-autocomplete>
      </div>

      <!-- 选择差旅费 -->
      <div>
        <div class="segmentation">
          备注
          <!-- <el-button type="success" style="float:right;" size="mini" @click="AddOrdeTypeWorkOrderr()">创建工单</el-button> -->
        </div>
        <el-input type="textarea" style="float:left;width:500px;margin:10px" :autosize="{ minRows: 2, maxRows: 10}" placeholder="备注" v-model="Memo">
        </el-input>
      </div>

      <div style="width:99%;height:2px;float:left;marginBottom:100px">
        <el-button :loading='this.$store.state.Vuex.loading' v-if="StateActive == 1 ||( StateActive == 4 && !this.Data.RepairProcess.ServiceToArea) || StateActive == 9 ||StateActive == 10" type="primary" size="mini"
          style="margin:10px;float:right" @click="Save">
          {{SName}}</el-button>
        <el-button :loading='this.$store.state.Vuex.loading' v-if="StateActive == 11" type="primary" size="mini" style="margin:10px;float:right" @click="EndWorkOrder">结单</el-button>
      </div>

    </div>
  </div>
</template>

<script>
let Base64 = require("js-base64").Base64;

export default {
  name: "",
  data() {
    return {
      State: 0,
      StateActive: 0,
      Data: {},
      //   dialogVisibleMainGraph: false,
      //   图片展示列表
      imgList: [],
      imageUrl: {},
      dialogVisibleMainGraph: false,
      //   总额
      WoCodeCost: 0,
      // 选择在保状态
      InState: "请选择在保状态",
      options: [
        {
          value: true,
          label: "在保",
        },
        {
          value: false,
          label: "不在保",
        },
      ],
      // 选择差旅费
      TravelAmount: "",
      TravelAmounts: "",
      itemID: "",
      // 备注
      Memo: "",
      // 最终价
      ActualCharge: "",
      // 最终优惠价
      DiscountFinalCharge: "",
      SName: "保存",
      TravelPriceOffer: "",
      //单号
    };
  },
  // 现场维修工单
  // 1 已受理1-> 显示到在保状态  显示到差旅费 调接口-报差旅费
  //2 在保状态已确认4->
  // 3 已预报价(差旅费)5-> 显示到差旅费
  // 4 预报价已确认6-> 显示到差旅费 调接口-派送
  //5 已指派工程师7-> 显示到工程师
  //6 已接受任务8-> 显示到工程师
  //7 已出发47-> 显示到工程师
  //8 已到达48-> 显示到工程师
  // 9 工作已完成9-> 显示到最终价 -调接口-报最终价
  // 0 已报最终价10-> 显示到最终价 -调接口-确认最终价
  //1 最终价已确认11-> 显示到最终价 -调接口-结单
  //2 已结单12->显示到最终价
  created() {
    this.init();
  },
  components: {},
  methods: {
    // 初始化
    init: function () {
      var obj = {
        url: this.$store.state.http + "WO/GetRepairWODetail",
        api: "get",
        data: {
          woId: this.$store.state.Vuex.Id,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);
        // 全部数据
        this.Data = res.Data;
        // 拼接差旅费地区和金额

        for (let index = 0; index < this.Data.RepairCosts.length; index++) {
          const element = this.Data.RepairCosts[index];
          element["TravelTravelInfo"] =
            element.Travel + " - " + element.TravelInfo;
        }

        this.Memo = res.Data.RepairProcess.Memo;
        // 状态
        this.State = res.Data.RepairProcess.State;
        console.log("当前订单状态：" + this.State);
        // 将状态转为可显示状态
        var StateA = [1, 4, 5, 6, 7, 8, 47, 48, 9, 10, 11, 12, 13];
        for (let index = 0; index < StateA.length; index++) {
          if (this.State == StateA[index]) {
            this.StateActive = index + 1;
          }
        }
        console.log("我的状态:" + this.StateActive);
        if (this.StateActive == 1) {
          this.SName = "报差旅费";
        }
        if (this.StateActive == 4) {
          this.SName = "确认预报价";
          //
        }
        if (this.StateActive == 4) {
          this.SName = "派送区域经理";
        }
        if (this.StateActive == 9) {
          this.SName = "报最终价";
        }
        if (this.StateActive == 10) {
          this.SName = "确认最终价";
          //
        }
        // 总额
        if (this.Data.RepairCosts) {
          for (var i = 0; i < this.Data.RepairCosts.length; i++) {
            this.WoCodeCost += this.Data.RepairCosts[i].Cost;
          }
        }
      });
    },
    // 跳转 现场维修 报价单
    TravelForOnSiteMaintenance: function (e) {
      console.log(e.WOId);

      const { href } = this.$router.resolve({
        path:
          this.$store.state.Vuex.TencentServer +
          "/List/TravelForOnSiteMaintenance.html",
        query: {
          url: Base64.encodeURI(this.$store.state.http + "WO/GetQutuoTrave"),
          ID: Base64.encodeURI(e.WOId),
          token: Base64.encodeURI(localStorage.getItem("token")),
        },
      });
      console.log(href.slice(2));
      window.open(href.slice(2), "_blank");
    },
    //筛选差旅费
    querySearch(queryString, cb) {
      if (queryString == "0") {
        queryString = "";
      }
      var obj = {
        data: {
          province: "",
          City: queryString,
        },
        api: "get",
        url: this.$store.state.http + "System/GetTravelExpenses",
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);
        var asd = [];
        // if (res.Data.length == 0) {
        //   cb([]);
        //   return false;
        // }
        for (var i = 0; i < res.Data.length; i++) {
          res.Data[i]["value"] = res.Data[i].City + " - " + res.Data[i].Price;
        }
        console.log(res.Data);
        cb(res.Data);
      });
    },
    // 点击差旅费
    handleSelect(item) {
      this.itemID = item.ID;
      this.TravelAmounts = item.Price;
    },
    // 情况差旅费
    Qingk: function () {
      this.TravelAmounts = "";
      this.TravelAmount = "";
      this.itemID = "";
    },
    // 实时监测差旅费输入框的value
    InoutgB: function (res) {
      console.log(res);
      if (res.split("-").length == 2) {
      } else {
        this.TravelAmounts = res;
      }
    },
    // 功能键
    Save: function () {
      //! 已受理
      console.log(this.StateActive);
      if (this.StateActive == 1) {
        console.log(this.InState);
        console.log(this.itemID);
        // 是否选择在保
        if (this.InState == "请选择在保状态") {
          this.$look("warning", "警告！", "请选择是否在保！");
          return false;
        }
        if (this.TravelPriceOffer == "") {
          this.$look("warning", "警告！", "请输入报价单号!");
          return false;
        }
        // 可以不选择差旅费
        var obj = {
          url: this.$store.state.http + "WO/QutuoTravel",
          api: "post",
          data: {
            WoId: this.Data.RepairProcess.WOId,
            TravelId: this.itemID,
            IsUnderWarranty: this.InState,
            TravelPriceOffer: this.TravelPriceOffer,
            Memo: this.Memo,
          },
        };
        this.$https(obj).then((res) => {
          console.log(res.Data);
          this.$look("success", "成功！", "操作成功！");
          this.init();
        });
      }
      if (this.StateActive == 4) {
        var obj = {
          url: this.$store.state.http + "WO/ServerToArea",
          api: "post",
          data: {
            Id: this.Data.RepairProcess.WOId,
          },
        };
        this.$https(obj).then((res) => {
          this.$look("success", "成功！", "操作成功！");
          console.log(res.Data);
          this.$emit("refresh");
          this.$router.push({
            path: "/WorkOrderTask",
          });
        });
      }
      if (this.StateActive == 9) {
        this.QuoteFinal();
      }
      if (this.StateActive == 10) {
        this.FSFinalConfirm();
      }
      if (this.StateActive == 4) {
        var obj = {
          url: this.$store.state.http + "WO/WOConfirmQuote",
          api: "post",
          data: {
            Id: this.Data.RepairProcess.WOId,
            IsAccept: true,
          },
        };
        this.$https(obj).then((res) => {
          this.$look("success", "成功！", "操作成功！");
          console.log(res.Data);
          this.init();
        });
        //
      }
    },
    // 放大
    IMGVIDEO: function (item) {
      console.log(item);
      this.imageUrl = item;
      this.dialogVisibleMainGraph = true;
    },
    // 结单
    EndWorkOrder: function () {
      var obj = {
        url: this.$store.state.http + "WO/EndWorkOrder",
        api: "post",
        data: {
          Id: this.Data.RepairProcess.WOId,
          Str: this.Memo,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);
        this.$look("success", "成功！", "操作成功！");
        this.init();
      });
    },
    // 报最终价
    QuoteFinal: function () {
      var obj = {
        url: this.$store.state.http + "WO/QuoteFinal",
        api: "post",
        data: {
          WoId: this.Data.RepairProcess.WOId,
          ActualCharge: this.ActualCharge,
          DiscountFinalCharge: this.DiscountFinalCharge,
          Memo: this.Memo,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);
        this.$look("success", "成功！", "操作成功！");
        this.init();
      });
    },
    // 确认最终价
    FSFinalConfirm: function () {
      var obj = {
        url: this.$store.state.http + "WO/FSFinalConfirm",
        api: "post",
        data: {
          Id: this.Data.RepairProcess.WOId,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);
        this.$look("success", "成功！", "操作成功！");
        this.init();
      });
    },
  },
};
</script>
<style lang="scss" scoped  >
@import url("../../../assets/scss/04/XianChang.scss");
</style>