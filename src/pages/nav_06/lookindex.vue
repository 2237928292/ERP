<template>
  <div class="box_s">
    <!-- 基础信息   这里不用修改 -->
    <div v-if="Data.MCBaseInfo">
      <div class="segmentation">保养合同基础信息 【 {{Data.MCBaseInfo.MaintainCode}} 】</div>
      <div class="itemmsgxx_document" style="width:600px">
        <p><span>客户名称:</span>{{Data.MCBaseInfo.CusFullName}}</p>
      </div>
      <div class="itemmsgxx_document">
        <p><span>合同类型:</span>{{Data.MCBaseInfo.ContractType }}</p>
      </div>
      <div class="itemmsgxx_document">
        <p><span>合同号:</span>{{Data.MCBaseInfo.MaintainCode }}</p>
      </div>
      <div class="itemmsgxx_document">
        <p><span>区域:</span>{{Data.MCBaseInfo.Area }}</p>
      </div>
      <div class="itemmsgxx_document">
        <p><span>设备数量:</span>{{Data.MCBaseInfo.EquCount }}</p>
      </div>
      <div class="itemmsgxx_document">
        <p><span>创建日期:</span>{{Data.MCBaseInfo.CreateDate | TimeCode}}</p>
      </div>
      <div class="itemmsgxx_document">
        <p><span>报价日期:</span>{{Data.MCBaseInfo.AcceptDate | TimeCode }}</p>
      </div>
      <div class="itemmsgxx_document">
        <p><span>付款日期:</span>{{Data.MCBaseInfo.PayDate | TimeCode }}</p>
      </div>
      <div class="itemmsgxx_document">
        <p><span>结单日期:</span>{{Data.MCBaseInfo.EndDate | TimeCode }}</p>
      </div>
      <div class="itemmsgxx_document">
        <p><span>销售员:</span>{{Data.MCBaseInfo.SalesPerson }}</p>
      </div>
      <div class="itemmsgxx_document">
        <p><span>当前状态:</span>{{Data.MCBaseInfo.StateStr }}</p>
      </div>
      <div class="itemmsgxx_document">
        <p><span>联系人:</span>{{Data.MCBaseInfo.LinkMan }}</p>
      </div>
      <div class="itemmsgxx_document">
        <p><span>联系人英文名:</span>{{Data.MCBaseInfo.LinkManEngilsh }}</p>
      </div>
      <div class="itemmsgxx_document">
        <p><span> 联系人手机号:</span>{{Data.MCBaseInfo.Mobile }}</p>
      </div>
      <div class="itemmsgxX_document">
        <p><span>备注信息:</span>{{Data.MCBaseInfo.Memo }}</p>
      </div>

      <div id="LEtetabe">
        <el-table :data="EquDtos1" border row-key="id" size="mini" :header-cell-style="{background:'#e1e1e1'}" align="left">
          <el-table-column v-for="(item, index) in col" :key="`col_${index}`" :prop="dropCol[index].prop" sortable :width="dropCol[index].width" :show-overflow-tooltip="dropCol[index].widths" :label="item.label">
          </el-table-column>
        </el-table>
      </div>

      <div class="itemmsgxx_document">
        <p><span>合同年限:</span>{{Data.MCEquInfo.YearLife  }}</p>
      </div>
      <div class="itemmsgxx_document">
        <p><span>保养次数:</span>{{Data.MCEquInfo.MaintainCount   }}</p>
      </div>
      <div class="itemmsgxx_document">
        <p><span>总金额(RMB):</span>{{Data.MCEquInfo.AmountTotal   }}</p>
      </div>
      <div class="itemmsgxx_document">
        <p><span>优惠后金额:</span>{{Data.MCEquInfo.PreferentialAmount   }}</p>
      </div>
      <div class="itemmsgxx_document">
        <p><span>优惠比例:</span>{{Data.MCEquInfo.PreferentialRatio   }}</p>
      </div>
      <div class="itemmsgxx_document">
        <p><span>差旅费:</span>{{Data.MCEquInfo.TravelExpenses   }}</p>
      </div>
      <div class="itemmsgxx_document">
        <p><span>差旅费次数:</span>{{Data.MCEquInfo.TraveTime   }}</p>
      </div>
      <div class="itemmsgxx_document">
        <p><span style="width:200px">是否在合同中显示折扣率:</span>{{Data.MCEquInfo.IsShowDiscount ? '显示' : '不显示'    }}</p>
      </div>

      <div v-if="Data.MCBaseInfo.ContractType == '服务公司AS' || Data.MCBaseInfo.ContractType == '技术公司AS'">
        <div class="segmentation">大包设备信息</div>
        <el-table :data="Data.ASEquInfo.EquDtos" size="mini" highlight-current-row border style="width: 100%" :header-cell-style="{background:'#e1e1e1'}">
          <el-table-column fixed prop="Pos" label="序号" width="50"></el-table-column>
          <el-table-column fixed prop="ProductCode" label="设备编码" width="150"></el-table-column>
          <el-table-column fixed prop="Brand" label="品牌" width="150"></el-table-column>
          <el-table-column fixed prop="Desc" label="描述" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column fixed prop="Number" label="数量" width="50"></el-table-column>
          <el-table-column fixed prop="SN" label="序列号" width="150"></el-table-column>
        </el-table>
        <div class="itemmsgxx_document">
          <p><span style="width:200px">AS金额合计 优惠前(RMB):</span>{{Data.ASEquInfo.ASAmountTotal}}</p>
        </div>
        <div class="itemmsgxx_document">
          <p><span>AS优惠后金额:</span>{{Data.ASEquInfo.ASPreferentialAmount}}</p>
        </div>
        <div class="itemmsgxx_document">
          <p><span>建店年份:</span>{{Data.ASEquInfo.YearOfEstablishment}}</p>
        </div>
        <div class="itemmsgxx_document">
          <p><span>举升机数量:</span>{{Data.ASEquInfo.TotalNumberOfLifts}}</p>
        </div>
        <div class="itemmsgxx_document">
          <p><span style="width:200px">去年售后维修花费:</span>{{Data.ASEquInfo.QNHF}}</p>
        </div>
        <div class="itemmsgxx_document">
          <p><span>空压机数量:</span>{{Data.ASEquInfo.TotalNumberOfAirCompressor}}</p>
        </div>
        <div class="itemmsgxx_document">
          <p><span>烤漆房数量:</span>{{Data.ASEquInfo.TotalNumberOfSprayBooth}}</p>
        </div>
      </div>

      <!-- ! 收款记录 -->
      <div class="segmentation" v-if="StateStr == 4 || StateStr == 5  ||StateStr == 9 ">收款记录
        <p style="float:right;color:#000"> (共计已收：{{GetMCPlistDataList + ' 元'}} ) &nbsp;&nbsp; </p>
        <p style="float:right;color:#000"> (共计应收：{{PreferentialAmountSD + ' 元'}} )&nbsp;&nbsp;&nbsp; </p>
      </div>
      <div class="timeline" v-if="StateStr == 4 || StateStr == 5  ||StateStr == 9 ">
        <el-timeline :reverse="reverse">
          <el-timeline-item v-for="(activity, index) in GetMCPlistData" :key="index" :timestamp="activity.CreateDate.split('T')[0]">
            {{activity.Amount + ' 元'}}
          </el-timeline-item>
        </el-timeline>
      </div>

      <!-- 下载合同 -->
      <div class="segmentation" v-if="StateStr == 2 || StateStr == 3 || StateStr == 4 || StateStr == 5 || StateStr == 9  ">下载合同</div>
      <div class="div" style="width:100%;float:left" v-if="StateStr == 2 || StateStr == 3 || StateStr == 4 || StateStr == 5 || StateStr == 9  ">
        <div class="Fl" v-if="ASMC == 'MC' ">
          <!-- MC -->
          <el-link @click="httpTXFWQBYHT('MC')" type="primary">合同</el-link>
          <el-link @click="httpTXFWQBYHT('MC2')" type="primary">附件2</el-link>
        </div>
        <div class="Fl" v-if="ASMC == 'AS' ">
          <!-- AS -->
          <el-link @click="httpTXFWQBYHT('ASs')" type="primary">AS预报价方案</el-link>
          <el-link @click="httpTXFWQBYHT('AS')" type="primary">合同</el-link>
          <el-link @click="httpTXFWQBYHT('AS2')" type="primary">附件2</el-link>
          <el-link @click="httpTXFWQBYHT('AS3')" type="primary">附件3</el-link>
        </div>
      </div>

      <!-- 任务列表 -->
      <div class="segmentation" v-if="StateStr == 4 || StateStr == 5  ||StateStr == 9 ">任务列表</div>
      <div id="LEtetabes" v-if="StateStr == 4 || StateStr == 5  ||StateStr == 9 ">
        <el-table :data="MCOrderDtos" size="mini" highlight-current-row border style="width: 100%" :header-cell-style="{background:'#e1e1e1'}">
          <el-table-column fixed prop="EstimatedTime" label="预计时间" width="200"></el-table-column>
          <el-table-column fixed prop="ActualTime" label="启动时间" width="200"></el-table-column>
          <el-table-column fixed prop="EndTime" label="完成时间" width="200"></el-table-column>
          <el-table-column fixed prop="Enginners" label="工程师" width="100"></el-table-column>
          <el-table-column fixed prop="StateStr" label="状态"></el-table-column>
        </el-table>
      </div>

    </div>
  </div>
</template>

<script>
let Base64 = require("js-base64").Base64;
import Sortable from "sortablejs";
export default {
  name: "",
  data() {
    return {
      col: [
        {
          label: "序号",
          prop: "Pos",
          width: "80",
        },
        {
          label: "设备编码",
          prop: "ProductCode",
          width: "150",
        },
        {
          label: "品牌",
          prop: "Brand",
          width: "150",
        },
        {
          label: "描述",
          prop: "Desc",
          width: "",
          widths: true,
        },
        {
          label: "数量",
          prop: "Number",
          width: "80",
        },
        {
          label: "序列号",
          prop: "SN",
          width: "150",
        },
      ],
      dropCol: [
        {
          label: "序号",
          prop: "Pos",
          width: "80",
        },
        {
          label: "设备编码",
          prop: "ProductCode",
          width: "150",
        },
        {
          label: "品牌",
          prop: "Brand",
          width: "150",
        },
        {
          label: "描述",
          prop: "Desc",
          width: "",
          widths: true,
        },
        {
          label: "数量",
          prop: "Number",
          width: "80",
        },
        {
          label: "序列号",
          prop: "SN",
          width: "150",
        },
      ],
      Data: [],
      EquDtos1: [],
      StateStr: "",
      GetMCPlistDataList: 0,
      reverse: true,
      GetMCPlistData: [],
      MCOrderDtos: [],
      ASMC: "", // 合同类型

      PreferentialAmountSD: 0,
    };
  },
  filters: {
    TimeCode(res) {
      if (res == null || res == undefined || res == "") {
        return " - - ";
      }
      return res.split("T")[0];
    },
  },
  mounted() {
    this.initMaintenan();
    this.GetMCPlist();
  },
  methods: {
    // !  初始
    initMaintenan: function () {
      var obj = {
        url: this.$store.state.http + "Maintain/GetMC",
        api: "get",
        data: {
          Id: this.$store.state.Vuex.MaintenanceContractDetailsID,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);
        this.Data = res.Data;
        this.EquDtos1 = res.Data.MCEquInfo.EquDtos;
        this.StateStr = res.Data.MCBaseInfo.State;
        this.MCOrderDtos = res.Data.MCOrderDtos;
        this.ASMC = this.Data.MCBaseInfo.ContractType.substring(4, 6);
        if (
          res.Data.MCBaseInfo.ContractType == "服务公司AS" ||
          res.Data.MCBaseInfo.ContractType == "技术公司AS"
        ) {
          this.PreferentialAmountSD =
            res.Data.ASEquInfo.ASPreferentialAmount +
            res.Data.MCEquInfo.TravelExpenses * res.Data.MCEquInfo.TraveTime;
        } else {
          this.PreferentialAmountSD =
            res.Data.MCEquInfo.PreferentialAmount +
            res.Data.MCEquInfo.TravelExpenses * res.Data.MCEquInfo.TraveTime;
        }
      });
    },
    //! 获取收款记录
    GetMCPlist: function () {
      var obj = {
        api: "GET",
        url: this.$store.state.http + "maintain/GetMCPlist",
        data: {
          id: this.$store.state.Vuex.MaintenanceContractDetailsID, // 主键
        },
      };
      this.$https(obj).then((res) => {
        this.GetMCPlistData = res.Data;
        this.GetMCPlistDataList = 0;
        for (let index = 0; index < this.GetMCPlistData.length; index++) {
          const element = this.GetMCPlistData[index];
          this.GetMCPlistDataList += element.Amount;
        }
      });
    },
    // 下载保养合同
    httpTXFWQBYHT: function (index) {
      if (index == "MC" || index == "AS") {
        // 合同
        const { href } = this.$router.resolve({
          path:
            this.$store.state.Vuex.TencentServer + "/AS&MC/" + index + ".html",
          query: {
            url: Base64.encodeURI(
              this.$store.state.http + "Maintain/GetMaintainContract"
            ),
            ID: Base64.encodeURI(
              this.$store.state.Vuex.MaintenanceContractDetailsID
            ),
            token: Base64.encodeURI(localStorage.getItem("token")),
          },
        });
        window.open(href.slice(2), "_blank");
      } else if (index == "ASs") {
        // 合同
        const { href } = this.$router.resolve({
          path:
            this.$store.state.Vuex.TencentServer + "/AS&MC/" + index + ".html",
          query: {
            url: Base64.encodeURI(this.$store.state.http + "Maintain/GetMCYu"),
            ID: Base64.encodeURI(
              this.$store.state.Vuex.MaintenanceContractDetailsID
            ),
            token: Base64.encodeURI(localStorage.getItem("token")),
          },
        });
        window.open(href.slice(2), "_blank");
      } else {
        // 附件
        const { href } = this.$router.resolve({
          path:
            this.$store.state.Vuex.TencentServer + "/AS&MC/" + index + ".html",
          query: {
            url: Base64.encodeURI(
              this.$store.state.http + "Maintain/GetMCAppendix"
            ),
            ID: Base64.encodeURI(
              this.$store.state.Vuex.MaintenanceContractDetailsID
            ),
            token: Base64.encodeURI(localStorage.getItem("token")),
          },
        });
        window.open(href.slice(2), "_blank");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
