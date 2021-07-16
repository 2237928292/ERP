<template>
  <div class="box_s">
    <el-steps :active="StateActive" v-if="StateActive != 13" id="BottomTextStopes">
      <el-step icon="el-icon-caret-bottom" description="已受理"></el-step>
      <el-step icon="el-icon-caret-bottom" description="维修费已确认"></el-step>
      <el-step icon="el-icon-caret-bottom" description="维修中"></el-step>
      <el-step icon="el-icon-caret-bottom" description="维修完毕"></el-step>
      <el-step icon="el-icon-caret-bottom" description="已报最终价"></el-step>
      <el-step icon="el-icon-caret-bottom" description="已付维修费"></el-step>
      <el-step icon="el-icon-caret-bottom" description="已转物流"></el-step>
    </el-steps>

    <el-steps :active="1" v-if="StateActive == 11" finish-status='error' id="BottomTextStopes">
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
          <el-table-column prop="Cost" label="合计">
          </el-table-column>
          <el-table-column fixed="right" label="报价单" width="150">
            <template>
              <p style="color:#409EFF">维修服务费报价单</p>
            </template>
          </el-table-column>
        </el-table>

      </div>

      <!-- 工程师 -->
      <div v-if="StateActive > 3">
        <div class="segmentation">
          工程师
        </div>
        <div class="itemmsgxx_document">
          <p><span>工程师:</span>{{Data.RepairProcess.Enginner}}</p>
        </div>
        <div class="itemmsgxx_documentText">
          <p style="word-break:break-all"><span>工作内容:</span>{{Data.RepairProcess.WorkContent}}</p>
        </div>
      </div>

      <!-- 在保状态 -->
      <div v-if="StateActive != 1">
        <div class="segmentation">
          在保状态
        </div>
        <div class="itemmsgxx_document">
          <p><span>在保状态:</span>{{IsUnderWarranty ? '在保' : '不在保'}}</p>
        </div>
      </div>

      <!-- 选择在保状态 -->
      <div v-if="StateActive == 1">
        <div class="segmentation">
          选择在保状态
          <!-- <el-button type="success" style="float:right;" size="mini" @click="AddOrdeTypeWorkOrderr()">创建工单</el-button> -->
        </div>
        <div class="itemmsgxx_documentSece">
          <span class="leftSpan">在保状态:</span>
          <el-select v-model="InState" style="width:150px" size="mini" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>

      <!-- 最终价 -->
      <div v-if="StateActive > 3 ">
        <div class="segmentation">
          最终价
        </div>
        <!-- 报最终价 -->
        <div class="itemmsgxx_document" v-if="StateActive == 4">
          <span style="float:left">最终价:</span>
          <el-input style="width:193px;float:left" size="mini" v-model="ActualCharge" placeholder=""></el-input>
        </div>

        <!-- 最终价已确认 -->
        <div class="itemmsgxx_document" v-if="StateActive > 4">
          <p><span>最终价</span>{{Data.RepairProcess.MDFinalQuoteCharge}}</p>
        </div>

      </div>

      <!-- 预报维修费 -->
      <div>
        <div class="segmentation">
          预报维修费
        </div>
        <!-- 预报维修费 -->
        <div class="itemmsgxx_document" v-if="StateActive == 1">
          <span style="float:left">报价单号:</span>
          <el-input style="width:193px;float:left" size="mini" v-model="MDQuoteCode" placeholder=""></el-input>
        </div>
        <div class="itemmsgxx_document" v-if="StateActive == 1">
          <span style="float:left">预报维修费:</span>
          <el-input style="width:193px;float:left" size="mini" v-model="MDQuoteCharge" placeholder=""></el-input>
        </div>

        <div class="itemmsgxx_document" v-if="StateActive != 1">
          <p><span>报价单号</span>{{MDQuoteCode}}</p>
        </div>
        <div class="itemmsgxx_document" v-if="StateActive != 1">
          <p><span>维修费</span>{{MDQuoteCharge}}</p>
        </div>
      </div>

      <div>
        <div class="segmentation">
          备注
          <!-- <el-button type="success" style="float:right;" size="mini" @click="AddOrdeTypeWorkOrderr()">创建工单</el-button> -->
        </div>
        <el-input type="textarea" style="float:left;width:500px;margin:10px" :autosize="{ minRows: 2, maxRows: 10}" placeholder="备注" v-model="Memo">
        </el-input>
      </div>

      <div v-if="StateActive == 3">
        <div class="segmentation">
          工作内容
          <!-- <el-button type="success" style="float:right;" size="mini" @click="AddOrdeTypeWorkOrderr()">创建工单</el-button> -->
        </div>
        <el-input type="textarea" style="float:left;width:500px;margin:10px" :autosize="{ minRows: 2, maxRows: 10}" placeholder="工作内容" v-model="Content">
        </el-input>
      </div>

      <div style="width:99%;height:2px;float:left;marginBottom:100px" v-if="StateActive < 7">
        <el-button type="primary" :loading='this.$store.state.Vuex.loading' size="mini" style="margin:10px;float:right" @click="Save">
          {{SName}}</el-button>

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
      // 工作内容
      Content: "",
      // 备注
      Memo: "",
      // 最终价
      MDQuoteCharge: "",
      // 报价单号
      MDQuoteCode: "",
      // 功能
      SName: "确认",
      // 在保
      IsUnderWarranty: false,
      // 最终价
      ActualCharge: "",
      DiscountFinalCharge: "",
    };
  },

  // DBL工单
  //1 已受理30->预报维修费 调接口 MDYuQuote
  //2 维修费已确认32 ->收到设备 调接口 MDReceive
  //3 维修中34 -> 维修完毕 调接口 MDRepairComplete
  //4 维修完毕41 ->报最终价 调接口 QuoteFinal
  //5 已报最终价35 -> 维修费付款 调接口 FSFinalConfirm
  //6 已付维修费33 -> 转物流 调接口 WOGotoLogistics
  //7 已转物流42
  created() {
    this.init();
  },
  components: {},
  methods: {
    TravelForOnSiteMaintenance: function (e) {
      console.log(e.WOId);

      const { href } = this.$router.resolve({
        path: this.$store.state.Vuex.TencentServer + "/List/DBLquotation.html",
        query: {
          url: Base64.encodeURI(this.$store.state.http + "WO/GetQutuoTrave"),
          ID: Base64.encodeURI(e.WOId),
          token: Base64.encodeURI(localStorage.getItem("token")),
        },
      });
      console.log(href.slice(2));
      window.open(href.slice(2), "_blank");
    },
    // 初始化
    init: function () {
      var obj = {
        url: this.$store.state.http + "WO/GetDBLWODetail",
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
        this.MDQuoteCode = res.Data.RepairProcess.MDQuoteCode;
        this.IsUnderWarranty = res.Data.RepairProcess.IsUnderWarranty;

        this.MDQuoteCharge = res.Data.RepairProcess.MDQuoteCharge;
        // 状态
        this.State = res.Data.RepairProcess.State;
        console.log("当前订单状态：" + this.State);
        // 将状态转为可显示状态
        var StateA = [30, 32, 34, 41, 35, 33, 42];
        for (let index = 0; index < StateA.length; index++) {
          if (this.State == StateA[index]) {
            this.StateActive = index + 1;
          }
        }
        console.log("我的状态:" + this.StateActive);
        if (this.StateActive == 2) {
          this.SName = "收到设备";
        }
        if (this.StateActive == 3) {
          this.SName = "维修完毕";
        }
        if (this.StateActive == 4) {
          this.SName = "报最终价";
        }
        if (this.StateActive == 5) {
          this.SName = "维修费付款";
        }
        if (this.StateActive == 6) {
          this.SName = "转物流";
        }
      });
    },

    // 功能键
    Save: function () {
      //! 已受理
      if (this.StateActive == 1) {
        console.log(this.InState);
        if (this.MDQuoteCode == "") {
          this.$look("warning", "警告！", "请输入报价单号！");
          return false;
        }
        // 是否选择在保
        if (this.InState == "请选择在保状态") {
          this.$look("warning", "警告！", "请选择是否在保！");
          return false;
        }

        var obj = {
          url: this.$store.state.http + "WO/MDYuQuote",
          api: "post",
          data: {
            Id: this.Data.RepairProcess.WOId,
            MDQuoteCode: this.MDQuoteCode,
            IsUnderWarranty: this.InState,
            MDQuoteCharge: this.MDQuoteCharge,
            Memo: this.Memo,
          },
        };
        this.$https(obj).then((res) => {
          console.log(res.Data);
          this.$look("success", "成功！", "操作成功！");
          this.$emit("refresh");
          this.$router.push({
            path: "/WorkOrderTask",
          });
        });
      }
      if (this.StateActive == 2) {
        var obj = {
          url: this.$store.state.http + "WO/MDReceive",
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
      }
      if (this.StateActive == 3) {
        var obj = {
          url: this.$store.state.http + "WO/MDRepairComplete",
          api: "post",
          data: {
            Id: this.Data.RepairProcess.WOId,
            Str: this.Memo,
            Type: this.Content,
          },
        };
        this.$https(obj).then((res) => {
          console.log(res.Data);
          this.$look("success", "成功！", "操作成功！");
          this.$emit("refresh");
          this.$router.push({
            path: "/WorkOrderTask",
          });
        });
      }
      if (this.StateActive == 4) {
        var obj = {
          url: this.$store.state.http + "WO/QuoteFinal",
          api: "post",
          data: {
            WoId: this.Data.RepairProcess.WOId,
            ActualCharge: this.ActualCharge,
            // DiscountFinalCharge: this.DiscountFinalCharge,
            Memo: this.Memo,
          },
        };
        this.$https(obj).then((res) => {
          console.log(res.Data);
          this.$look("success", "成功！", "操作成功！");
          this.init();
        });
      }
      if (this.StateActive == 5) {
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
      }
      if (this.StateActive == 6) {
        var obj = {
          url: this.$store.state.http + "WO/WOGotoLogistics",
          api: "post",
          data: {
            Id: this.Data.RepairProcess.WOId,
            Str: this.Memo,
          },
        };
        this.$https(obj).then((res) => {
          console.log(res.Data);
          this.$look("success", "成功！", "操作成功！");
          this.$emit("refresh");
          this.$router.push({
            path: "/WorkOrderTask",
          });
        });
      }
    },

    // 放大
    IMGVIDEO: function (item) {
      console.log(item);
      this.imageUrl = item;
      this.dialogVisibleMainGraph = true;
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