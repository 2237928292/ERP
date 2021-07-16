<template>
  <div class="box_s">
    <el-steps :active="StateActive" v-if="StateActive != 13" id="BottomTextStopes">
      <el-step icon="el-icon-caret-bottom" description="已受理"></el-step>
      <el-step icon="el-icon-caret-bottom" description="已收到设备"></el-step>
      <el-step icon="el-icon-caret-bottom" description="在保状态已确认"></el-step>
      <el-step icon="el-icon-caret-bottom" description="已选小件"></el-step>
      <el-step icon="el-icon-caret-bottom" description="维修完毕"></el-step>
      <el-step icon="el-icon-caret-bottom" description="待报最终价"></el-step>
      <el-step icon="el-icon-caret-bottom" description="已报最终价"></el-step>
      <el-step icon="el-icon-caret-bottom" description="已收款"></el-step>
      <el-step icon="el-icon-caret-bottom" description="已转至物流部"></el-step>
      <el-step icon="el-icon-caret-bottom" description="已结单"></el-step>
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

        <el-table :data="Data.RepairCosts" style="width: 100%;paddingLeft:50px;fontSize:12px">
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
        </el-table>
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
          <p style="word-break:break-all"><span>工作内容:</span>{{Data.RepairProcess.WorkContent}}</p>
        </div>
      </div>

      <!-- 工程师 -->
      <div v-if="StateActive > 2">
        <div class="segmentation">
          在保状态
        </div>
        <div class="itemmsgxx_document">
          <p><span>在保状态:</span>{{Data.RepairProcess.IsUnderWarranty ? '在保' : '不在保'}}</p>
        </div>
      </div>

      <!-- 最终价 -->
      <div v-if="StateActive > 5 ">
        <div class="segmentation">
          追加报价
        </div>
        <!-- 报最终价 -->
        <div class="itemmsgxx_document" v-if="StateActive == 6">
          <span style="float:left">追加报价:</span>
          <el-input style="width:193px;float:left" size="mini" v-model="ActualCharge" placeholder=""></el-input>
        </div>

        <!-- 最终价已确认 -->
        <div class="itemmsgxx_document" v-if="StateActive > 6">
          <p><span>追加报价：</span>{{Data.RepairProcess.ActualCharge}}</p>
        </div>

      </div>

      <!-- 选择在保状态 -->
      <div v-if="StateActive == 1 || StateActive == 2">
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

      <div>
        <div class="segmentation">
          备注
          <!-- <el-button type="success" style="float:right;" size="mini" @click="AddOrdeTypeWorkOrderr()">创建工单</el-button> -->
        </div>
        <el-input type="textarea" style="float:left;width:500px;margin:10px" :autosize="{ minRows: 2, maxRows: 10}" placeholder="备注" v-model="Memo">
        </el-input>
      </div>

      <div v-if="StateActive == 3 || StateActive == 4">
        <div class="segmentation">
          工作内容
          <!-- <el-button type="success" style="float:right;" size="mini" @click="AddOrdeTypeWorkOrderr()">创建工单</el-button> -->
        </div>
        <el-input type="textarea" style="float:left;width:500px;margin:10px" :autosize="{ minRows: 2, maxRows: 10}" placeholder="工作内容" v-model="Content">
        </el-input>
      </div>

      <div style="width:99%;height:2px;float:left;marginBottom:100px">
        <el-button :loading='this.$store.state.Vuex.loading' v-if="StateActive == 1 || StateActive == 2 || StateActive == 5 || StateActive == 6 || StateActive == 7|| StateActive == 8" type="primary" size="mini"
          style="margin:10px;float:right" @click="Save">
          {{SName}}</el-button>

        <el-button :loading='this.$store.state.Vuex.loading' v-if="StateActive == 3 ||  StateActive == 4 " type="primary" size="mini" style="margin:10px;float:right" @click="MaintenanceCompleted">维修完毕</el-button>
        <el-button :loading='this.$store.state.Vuex.loading' v-if="StateActive == 3" type="success" size="mini" style="margin:10px;float:right" @click="CreateAnOrder">创建订单</el-button>

        <el-button :loading='this.$store.state.Vuex.loading' v-if="StateActive == 11" type="primary" size="mini" style="margin:10px;float:right" @click="EndWorkOrder">结单</el-button>
      </div>

    </div>
  </div>
</template>

<script>
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
      // 备注
      Memo: "",
      // 工作内容
      Content: "",
      // 最终价
      ActualCharge: "",
      // 最终优惠价
      DiscountFinalCharge: "",
      SName: "保存",
    };
  },

  //   ! 收货设备复选框
  //  小件维修
  //  1   已受理2 -> 显示选择在保状态和收货设备复选框 ->调接口-确认在保状态 SRUnderInsurance
  //  2   X已收到设备19 -> 显示选择在保状态和收货设备复选框 ->调接口-确认在保状态 SRUnderInsurance
  //  3   在保状态已确认14 ->
  // 	   维修完毕 ->显示在保状态 ->调接口-维修完毕接口 SRFinishWO
  // 	   创建订单 ->显示在保状态 ->调接口-创建订单接口 SRCreateSO

  //       4   -已选小件15 -> 显示在保状态 -> 调接口 维修完毕 SRFinishWO
  //       5   -维修完毕16 ->显示在保状态，工作内容 ->调接口 转物流 WOGotoLogistics

  //  6   待报最终价44 -> 显示在保状态，工作内容 ->调接口 报最终价 QuoteFinal
  //  7   已报最终价20 ->显示最终价，工作内容 ->调接口 最终价付款 FSFinalConfirm
  //  8   已收款46 ->显示最终价，工作内容 ->调接口 转物流 WOGotoLogistics

  //  9   已转至物流部42

  //   小件维修
  // 已受理2 -> 显示选择在保状态和收货设备复选框 ->调接口-确认在保状态 SRUnderInsurance
  // X已收到设备19 -> 显示选择在保状态和收货设备复选框 ->调接口-确认在保状态 SRUnderInsurance 跳到14
  // 在保状态已确认14 ->
  // 	维修完毕 ->显示在保状态 ->调接口-维修完毕接口 SRFinishWO 跳到44
  // 	创建订单 ->显示在保状态 ->调接口-创建订单接口 SRCreateSO 跳到15
  // -已选小件15 -> 显示在保状态 -> 调接口 维修完毕 SRFinishWO 跳到16
  // -已维修完毕16 ->显示在保状态，工作内容 ->调接口 转物流 WOGotoLogistics 跳到43

  // 6待报最终价44 -> 显示在保状态，工作内容 ->调接口 报最终价 QuoteFinal 跳到20
  // 7已报最终价20 ->显示最终价，工作内容 ->调接口 最终价付款 FSFinalConfirm 跳到46
  // 8已收款46 ->显示最终价，工作内容 ->调接口 转物流 WOGotoLogistics 跳到43
  // 9已转至物流部43
  created() {
    this.init();
  },
  components: {},
  methods: {
    // 初始化
    init: function () {
      var obj = {
        url: this.$store.state.http + "WO/GetSRWODetail",
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
        var StateA = [2, 19, 14, 15, 16, 44, 20, 46, 43, 21, 22];
        for (let index = 0; index < StateA.length; index++) {
          if (this.State == StateA[index]) {
            this.StateActive = index + 1;
          }
        }
        console.log("我的状态:" + this.StateActive);

        if (this.StateActive == 1 || this.StateActive == 2) {
          this.SName = "确认在保状态";
        }
        if (this.StateActive == 5 || this.StateActive == 8) {
          this.SName = "转物流";
        }
        if (this.StateActive == 6) {
          this.SName = "追加报价";
        }
        if (this.StateActive == 7) {
          this.SName = "追加报价收款";
        }
      });
    },

    // ! 返回列表页
    // 功能键
    Save: function () {
      //! 已受理
      if (this.StateActive == 1 || this.StateActive == 2) {
        console.log(this.InState);
        console.log(this.itemID);
        // 是否选择在保
        if (this.InState == "请选择在保状态") {
          this.$look("warning", "警告！", "请选择是否在保！");
          return false;
        }
        // 提交在保状态
        var obj = {
          url: this.$store.state.http + "WO/SRUnderInsurance",
          api: "post",
          data: {
            Id: this.Data.RepairProcess.WOId,
            Type: this.InState ? 1 : 0,
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
      //   转物流
      if (this.StateActive == 5 || this.StateActive == 8) {
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
      //   报最终价
      if (this.StateActive == 6) {
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
      }
      //   追加报价
      if (this.StateActive == 7) {
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
    },
    // 维修完毕
    MaintenanceCompleted: function () {
      var obj = {
        url: this.$store.state.http + "WO/SRFinishWO",
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
    },
    // 创建订单
    CreateAnOrder: function () {
      var obj = {
        url: this.$store.state.http + "WO/SRCreateSO",
        api: "post",
        data: {
          Id: this.Data.RepairProcess.WOId,
          Str: this.Memo,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);

        this.$store.state.Vuex.SOId = res.Data;
        // 现场维修
        this.$router.push({
          path: "/EditOrder",
        });

        this.$look("success", "成功！", "操作成功！");
        this.init();
      });
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