<template>
  <div class="box_s">
    <!-- 客户信息 -->
    <div v-if='Data.RepairBase'>
      <div class="segmentation">
        基础信息 【{{Data.RepairBase.CusName}}】
      </div>
      <div class="itemmsgxx_document" style="width: 100%">
        <p><span>报修单号:</span>{{Data.RepairBase.RepairCode}}</p>
      </div>

      <div class="itemmsgxx_document">
        <p><span>申请日期:</span>{{Data.RepairBase.CreateDate}}</p>
      </div>
      <div class="itemmsgxx_document">
        <p><span>受理日期:</span>{{Data.RepairBase.AcceptanceDate}}</p>
      </div>
      <div class="itemmsgxx_document">
        <p><span>解决日期:</span>{{Data.RepairBase.OverOrderDate}}</p>
      </div>
      <div style="width:100%;height:1px;float:left"></div>
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
      <div class="demo-image__preview" style="width:200px;float:left" v-for="(upload,index) in Data.RepairFaultImages" :key="index">
        <el-image v-if="upload.Type == 'picture' " style="width: 100px; height: 100px" :src="upload.Path" fit="fill" :preview-src-list="imgList"></el-image>
      </div>
      <div class="demo-image__preview" style="width:200px;float:left" v-for="(upload1,index1) in Data.RepairFaultImages" :key="index1 + 123">
        <video style="width:100%" v-if="upload1.Type == 'video' " :src="upload1.Path" class="avatar video-avatar" controls="controls">
          您的浏览器不支持视频播放
        </video>
      </div>

    </div>

    <!-- <el-dialog :visible.sync="dialogVisibleMainGraph" class='spc12' :modal-append-to-body="false">
      <img v-if="!(imageUrl.type == 'video/mp4') " width="100%" :src="imageUrl.url" alt="">
      <video v-if="imageUrl.type == 'video/mp4' " :src="imageUrl.url" class="avatar video-avatar" controls="controls">
        您的浏览器不支持视频播放
      </video>
    </el-dialog> -->
    <!-- 设备信息 -->
    <!-- <div v-if='Data.RepairCosts'>
      <div class="segmentation">
        费用清单
      </div>

      <div class="itemmsgxx_document" v-for="(items,indexxx) in Data.RepairCosts" :key='indexxx + 1'>
        <p><span>{{items.WoCode}}:</span>￥{{items.Cost}}</p>
      </div>

      <div class="itemmsgxx_document">
        <p><span>总计:</span>￥{{WoCodeCost}}</p>
      </div>
    </div> -->

    <!-- 费用清单 -->
    <div v-if='Data.RepairCosts'>
      <div class="segmentation">
        费用清单
      </div>

      <el-table :data="Data.RepairCosts" style="width: 100%;paddingLeft:50px;fontSize:12px">
        <el-table-column prop="OrderTypeStr" label="工单类型" width="180">
        </el-table-column>
        <el-table-column prop="WoCode" label="单号" width="180">
        </el-table-column>
        <el-table-column prop="TravelTravelInfo" label="差旅费" width="180">
        </el-table-column>
        <el-table-column prop="Service" label="服务费">
        </el-table-column>
        <el-table-column prop="Cost" label="合计">
        </el-table-column>
      </el-table>
    </div>

    <div class="Details" v-for="(item,index) in RepairWos" :key='index + 23 '>
      <div class="DetailsTopTitle" @click="item.IsShow = !item.IsShow">
        {{ '工单：' + item.WoCode}}
        <i v-show="item.IsShow" style="float:right" class="el-icon-caret-left"></i>
        <i v-show="!item.IsShow" style="float:right" class="el-icon-caret-bottom"></i>
      </div>
      <div class="DetailsBotttomTitle" :style="{'max-height':item.IsShow ? '1000px' :'0px'}">
        <div class="itemmsgxx_document">
          <p><span>工程师:</span>{{item.Enginner}}</p>
        </div>
        <div class="itemmsgxx_document">
          <p><span>工单类型:</span>{{item.WoType}}</p>
        </div>
        <div class="itemmsgxx_document">
          <p><span>状态:</span>{{item.WoStateStr}}</p>
        </div>
        <div class="itemmsgxx_documentText">
          <p style="word-break:break-all"><span>工作内容:</span>{{item.WorkContent}}</p>
        </div>
        <div class="itemmsgxx_documentText">
          <p style="word-break:break-all"><span>备注:</span>{{item.Memo}}</p>
        </div>
      </div>
    </div>

    <div class="Details" v-for="(item,index) in SODtos" :key='index'>
      <div class="DetailsTopTitle" @click="item.IsShow = !item.IsShow">
        {{ '订单：' + item.SOCode}}
        <i v-show="item.IsShow" style="float:right" class="el-icon-caret-left"></i>
        <i v-show="!item.IsShow" style="float:right" class="el-icon-caret-bottom"></i>
      </div>
      <div class="DetailsBotttomTitle" ref="element" :style="{'max-height':item.IsShow ? '1000px' :'0px'}">

        <el-table :data="item.SOEquipmentList" style="width: 100%;fontSize:12px">

          <el-table-column prop="ProcodeCode" label="产品编码" width="180"></el-table-column>
          <el-table-column prop="Brand" label="品牌" width="180"></el-table-column>
          <el-table-column prop="Desc" label="描述" width="180" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="UnitPrice" label="单价"></el-table-column>
          <el-table-column prop="Number" label="数量"></el-table-column>
          <el-table-column prop="AssemblyPeice" label="安装单价"></el-table-column>
          <el-table-column  label="安装" width="80">
            <template slot-scope="scope">
              <p>{{scope.row.IsAssembly ? '需要':'不需要'}}</p>
            </template>
          </el-table-column>
          <el-table-column  label="金额" width="80">
            <template slot-scope="scope">
              <p>{{Number(scope.row.UnitPrice) * Number(scope.row.Number)}}</p>
            </template>
          </el-table-column>

        </el-table>

        <div class="itemmsgxx_document">
          <p><span>状态:</span>{{item.StateStr}}</p>
        </div>
        <div class="itemmsgxx_document">
          <p><span>收货人:</span>{{item.Consignee.Name}}</p>
        </div>
        <div class="itemmsgxx_document">
          <p><span>联系方式:</span>{{item.Consignee.MobilePhone}}</p>
        </div>
        <div class="itemmsgxx_document" style="width:400px">
          <p><span>邮箱:</span>{{item.Consignee.EMail}}</p>
        </div>

        <div class="itemmsgxx_documentText">
          <p style="word-break:break-all"><span>地址:</span>{{item.Consignee.Address}}</p>
        </div>

        <div class="itemmsgxx_documentText">
          <p style="word-break:break-all"><span>备注:</span>{{item.Memo}}</p>
        </div>
      </div>
    </div>

    

    <div v-if="State == 0">
      <div class="segmentation">
        选择工单类型
        <el-button type="success" style="float:right;" size="mini" @click="AddOrdeTypeWorkOrderr()">创建工单</el-button>
      </div>
      <div class="itemmsgxx_documentSece">
        <span class="leftSpan">选择工单类型:</span>
        <el-select v-model="TypeWorkOrder" style="width:150px" size="mini" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
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
      Data: {},
      //   dialogVisibleMainGraph: false,
      imgList: [],
      WoCodeCost: 0,
      //创建工单类型
      options: [
        {
          value: "OnlineRepair",
          label: "现场维修",
        },
        {
          value: "SmallRepair",
          label: "小件维修",
        },
        {
          value: "MulDeu",
          label: "MUL&DBL维修",
        },
      ],
      // 选择的工单类型
      TypeWorkOrder: "",
      activeName: "",
      RepairWos: [],
      SODtos: [],
    };
  },
  created() {
    this.init();
  },
  components: {},
  methods: {
    // 选工单类型后
    AddOrdeTypeWorkOrderr: function () {
      console.log(this.TypeWorkOrder);
      if (this.TypeWorkOrder == "") {
        this.$look("warning", "提示！", "请选择工单类型！");
        return false;
      }
      var obj = {
        url: this.$store.state.http + "WO/SelectOrderType",
        api: "post",
        data: {
          Id: this.Data.RepairBase.RepairId,
          Str: this.TypeWorkOrder,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.$look("success", "成功！", "创建了一条工单！");
        this.$store.state.Vuex.Id = res.Data;
        // 现场维修
        if (this.TypeWorkOrder == "OnlineRepair") {
          this.$router.push({
            path: "/OnSiteMaintenance",
          });
        }
        if (this.TypeWorkOrder == "SmallRepair") {
          this.$router.push({
            path: "/MinorMaintenance",
          });
        }
        if (this.TypeWorkOrder == "MulDeu") {
          this.$router.push({
            path: "/DBLMaintenance",
          });
        }
      });
    },
    // 初始化
    init: function () {
      var obj = {
        url: this.$store.state.http + "WO/GetRepairDetailInfo",
        api: "get",
        data: {
          repairId: this.$store.state.Vuex.Id,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);
        this.Data = res.Data;
        this.State = res.Data.RepairBase.State;
        this.SODtos = res.Data.SODtos;
        this.RepairWos = res.Data.RepairWos;
        // 总额
        if (this.Data.RepairCosts) {
          for (var i = 0; i < this.Data.RepairCosts.length; i++) {
            this.WoCodeCost += this.Data.RepairCosts[i].Cost;
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.Details {
  width: 95%;
  border-radius: 5px;
  // background: #ccc;
  border: 1px solid #ccc;
  margin: 20px auto;
  .DetailsTopTitle {
    width: 100%;
    height: 20px;
    background: #cbdefb;
    font-size: 14px;
    padding: 0 10px;
    box-sizing: border-box;
    font-weight: bold;
    line-height: 20px;
  }
  .DetailsBotttomTitle {
    width: 100%;
    // height: 0px;
    max-height: 0px;
    transition: 1s;
    background: #f1f9ff;
    overflow: hidden;
  }
}
</style>
