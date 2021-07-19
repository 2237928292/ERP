<template>
  <div class="box_s">
    <router-view @refresh="inits"></router-view>
    <div style="width:100%；height：100%" v-show="ShowAdd">
      <div class="segmentation">基础信息
        <div @mouseover="MaintainRHF = true" @mouseleave="MaintainRHF = false" style="width:50px;height:50px;float:right;z-index:99">
          <el-button v-show="MaintainRHF" size="mini" style="float:right" type="success" @click="ResetMC()" icon="el-icon-refresh"></el-button>
        </div>
      </div>

      <div class="text itemxxxxX">
        <p><span>客户:</span>{{Data.CusName + '【' + (Data.BelongEnginners || ' - ') + '】' }}</p>
      </div>
      <div class="text itemxxxxx">
        <p><span>订单单号:</span>{{Data.SOCode }}</p>
      </div>
      <div class="text itemxxxxx">
        <p><span>报价单号:</span>{{Data.QuoteCode || ' - ' }}</p>
      </div>
      <div class="text itemxxxxx">
        <p><span>状态:</span>{{Data.StateStr }}</p>
      </div>
      <div class="text itemxxxxx">
        <p><span>是否需要安装:</span>{{Data.IsNeedInstall ? '是' : '否' }}</p>
      </div>

      <div class="text itemxxxxx">
        <p>
          <span>报价类型:</span>
          <el-select v-model="SoQuoteType" style="width:150px" size="mini" placeholder="请选择AS/SP">
            <el-option v-for="item in optionsASAndSP" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </p>
      </div>

      <div class="text itemxxxxx">
        <p>
          <span>隶属公司:</span>
          <el-select v-model="BelongCompany" style="width:150px" size="mini" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </p>
      </div>

      <div class="text itemxxxx9" style="">
        <p>
          <span>工程师备注:</span>{{Data.EngineerMemo}}
        </p>
      </div>

      <div class="textNB">
        <div style="textBZ">备注：</div>
        <el-input type="textarea" style="float:left;width:500px" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="Data.Memo">
        </el-input>
      </div>

      <div class="segmentation">
        设备清单
        <el-button style="float:right;marginLeft:10px" size="mini" @click="AddSb()" type="primary" v-if="State == 1 || State ==  2 || State ==  0">添加设备</el-button>
        <el-button style="float:right" size="mini" @click="RefreshOrderUnitPrice" type="primary" v-if="State == 1 || State ==  2 || State ==  0">刷新订单设备单价</el-button>
      </div>
      <el-table :data="SOEquipmentList" size="mini" highlight-current-row border style="width: 98%;marginTop:10px;float:left" :header-cell-style="{background:'#e1e1e1'}">
        <el-table-column prop="ProcodeCode" label="产品编号" width="150"></el-table-column>
        <el-table-column prop="Brand" label="品牌" width="100"></el-table-column>
        <el-table-column prop="Desc" label="描述" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="数量" width="70">
          <template slot-scope="scope">
            <!-- <el-input-number v-model="scope.row.Number" @change="pricesOfPartsJS('SaveOrderS')" size="mini" :controls='false' :min="1"></el-input-number> -->
            <input type="text" style="width:100%" v-model="scope.row.Number" @change="pricesOfPartsJS('SaveOrderS')" :min="1">
          </template>
        </el-table-column>
        <el-table-column prop="Locations" label="库位" width="90"></el-table-column>
        <el-table-column prop="NetInventory" label="库存" width="70"></el-table-column>
        <el-table-column prop="PurchaseUnitPrice" label="采购单价" width="120"></el-table-column>
        <el-table-column prop="UnitPrice" label="销售单价" width="90"></el-table-column>
        <el-table-column prop="AssemblyPeice" label="安装费单价" width="90"></el-table-column>
        <el-table-column label="甲方安装" width="80">
          <template slot-scope="scope">
            <el-switch @change="pricesOfPartsJS" v-model="scope.row.IsAssembly" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed='right' label="操作" width="80" v-if="State == 1 || State ==  2">
          <template slot-scope="scope">
            <el-button @click="dele(scope.row)" size="mini" type="danger" icon="el-icon-delete"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 费用合计 -->

      <div class="segmentation">
        费用合计
        <el-button style="float:right;marginLeft:10px" size="mini" @click="Orderlistmag()" type="primary">报价单</el-button>
      </div>
      <div class="segation">
        <el-input placeholder size="mini" v-model="TotalPrice.LogisticCharge" @change="pricesOfPartsJS">
          <template slot="prepend">空运费：￥</template>
        </el-input>
        <el-autocomplete class="inline-input" size="mini" style="width:250px" v-model="TravelAmount" :show-overflow-tooltip="true" :fetch-suggestions="querySearch" placeholder="请选择市区" @select="handleSelect" clearable
          @clear="Qingk" @input="InoutgB" :automatic-dropdown="true">
          <template slot="prepend">差旅费：￥</template>
        </el-autocomplete>

        <el-input placeholder size="mini" v-model="TotalPrice.NumberCG" disabled>
          <template slot="prepend">采购总金额：￥</template>
        </el-input>

        <el-input placeholder size="mini" v-model="TotalPrice.Amount" disabled>
          <template slot="prepend">产品总金额：￥</template>
        </el-input>

        <el-input placeholder size="mini" @change="pricesOfPartsJS" v-model="Discount">
          <template slot="prepend">优惠比例（%）：</template>
        </el-input>

        <el-input placeholder size="mini" v-model="DiscountAmount">
          <template slot="prepend">优惠后金额：￥</template>
        </el-input>

        <el-input placeholder style="width:300px" size="mini" v-model="Data.QuoteCode">
          <template slot="prepend">报价单号：</template>
        </el-input>
      </div>
      <!-- 发货 -->
      <div v-if="State == 4 || State ==  8 || State ==  6">
        <div class="segmentation">发货
          <span style="float:right;color:red" v-if="Data.IsAS">当前客户为保养大包(AS)客户，优先使用AS专用配件</span>
        </div>
        <el-input placeholder style="width:400px;marginTop:10px;float:right" v-model="GoodsDH" size="mini">
          <template slot="prepend">物流信息:</template>
        </el-input>
        <el-table :data="SOEquipmentList" size="mini" highlight-current-row border style="width: 100%;marginTop:10px;float:left" :header-cell-style="{background:'#e1e1e1'}">
          <el-table-column prop="ProcodeCode" label="产品编号" width="150"></el-table-column>
          <el-table-column prop="Brand" label="品牌" width="150"></el-table-column>
          <el-table-column prop="Desc" label="描述" :show-overflow-tooltip="true"></el-table-column>
          <!-- <el-table-column fixed prop="Locations" label="库位" width="70"></el-table-column> -->

          <el-table-column label="库位" width="90">
            <template slot-scope="scope">
              <p v-for="(itemin,indexis) in scope.row.arr" :key='indexis'>{{itemin.name}}</p>
              <!-- <p>{{scope.row.Locations}}</p> -->
            </template>
          </el-table-column>

          <el-table-column prop="NetInventory" label="库存" width="70"></el-table-column>
          <el-table-column prop="Number" label="订单数量" width="80"></el-table-column>
          <el-table-column label="物流" width="100" v-for="(items,indexs) in DeliDetails" :prop="NumberIndex(indexs)" :key="indexs">
            <template slot="header">
              <p @click="DeliverysHttp(indexs)">{{'物流'+(indexs+1)}}</p>
            </template>
          </el-table-column>
          <el-table-column fixed='right' label="发货" width="90" v-if="State == 8 || State ==  4">
            <template slot-scope="scope">
              <!-- <el-input-number v-for="(item12,indext) in scope.row.arr"  :min="0" :key='indext' size="mini" v-model="item12.value"></el-input-number> -->
              <input type="number" v-for="(item12,indext) in scope.row.arr" :key='indext' size="mini" v-model="item12.value">
              <!-- <el-input v-for="(item12,indext) in scope.row.arr" :key='indext' size="mini" v-model="item12.value"></el-input> -->
              <!-- <el-input size="mini" v-model="scope.row.index"></el-input> -->
            </template>
          </el-table-column>
        </el-table>

        <el-button class="C33" size="mini" @click="deliverGoods" v-if="State == 8 || State ==  4" type="primary">发货</el-button>
        <el-button class="C33" size="mini" @click="Invoice" v-if="State == 8 || State ==  4  || State ==  6" type="success">发货单</el-button>
      </div>

      <!-- 收货人 -->
      <div class="segmentation">收货人
        <el-button v-if="State == 1 || State ==  2 || State ==  0" style="float:right;marginLeft:10px" size="mini" @click="SelectConsignee()" type="primary">选择收货人</el-button>
      </div>
      <div class="consignee">
        <span>姓名：</span>
        <el-input size="mini" v-model="Consignee.Name"></el-input>
      </div>
      <div class="consignee">
        <span>英文名：</span>
        <el-input size="mini" v-model="Consignee.EnginnerName"></el-input>
      </div>
      <div class="consignee">
        <span>手机：</span>
        <el-input size="mini" v-model="Consignee.MobilePhone"></el-input>
      </div>
      <div class="consignee">
        <span>电话：</span>
        <el-input size="mini" v-model="Consignee.Tel"></el-input>
      </div>
      <div class="consignee">
        <span>邮箱：</span>
        <el-input size="mini" v-model="Consignee.EMail"></el-input>
      </div>
      <div class="consignee" style="width:800px">
        <span>地址：</span>
        <el-input size="mini" v-model="Consignee.Address"></el-input>
      </div>

      <div style="width:98%;border:1px solid #ccc;float: left;"></div>
      <el-button class="C33" size="mini" @click="SaveOrder(7)" v-if="State == 0 || State ==  1 || State ==  2" type="danger">撤单</el-button>
      <el-button class="C33" size="mini" @click="SaveOrder(1)" v-if="State == 0" type="primary">确认</el-button>
      <el-button class="C33" size="mini" @click="SaveOrder(2)" v-if="State == 1 || State ==  2" type="primary">报价</el-button>
      <el-button class="C33" size="mini" @click="SaveOrder(3)" v-if="State == 2" type="success">确认报价</el-button>
      <el-button class="C33" size="mini" @click="SaveOrder(8)" v-if="State == 3" type="primary">付款</el-button>
      <el-button style="float:left;margin:10px" size="mini" v-if="State == 1 || State ==  2" @click="SaveOrder" type="primary">保存</el-button>
    </div>

    <el-dialog title="选择收货人" :visible.sync="dialogTableVisible" :modal-append-to-body='false'>
      <el-table :data="gridData" @row-click="ConsigneeS">
        <el-table-column property="Name" label="姓名" width="100"></el-table-column>
        <el-table-column property="Mobile" label="手机" width="100"></el-table-column>
        <el-table-column property="Email" label="邮箱" width="260"></el-table-column>
        <el-table-column property="Address" label="地址"></el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
let Base64 = require("js-base64").Base64;
export default {
  name: "",
  data() {
    return {
      MaintainRHF: false,
      BelongCompany: "",
      // 隶属公司
      SoQuoteType: "",
      optionsASAndSP: [
        {
          value: "AS",
          label: "AS",
        },
        {
          value: "SP",
          label: "SP",
        },
        {
          value: "SC",
          label: "SC",
        },
      ],
      options: [
        {
          value: "技术公司",
          label: "技术公司",
        },
        {
          value: "服务公司",
          label: "服务公司",
        },
      ],
      afsdfsdf: [{ name: "22", name: "12" }],
      Data: {},
      SOEquipmentList: [],
      TotalPrice: {},
      Consignee: {},
      State: "",
      // 零件的单价之和
      pricesOfParts: 0,
      // 差旅费
      TravelAmount: "",
      // 差旅费 s
      TravelAmounts: 0,
      Discount: "",
      // 优惠后的金额
      DiscountAmount: 0,
      DiscountAmountIndex: false,

      // 物流信息
      GoodsDH: "",
      // 发的数量
      ShipmentQuantity: [],
      DeliDetails: [],
      ShowAdd: true,
      dialogTableVisible: false,
      gridData: [],
    };
  },
  created() {
    this.init();
  },
  components: {},
  mounted() {
    console.log("00000");
  },
  watch: {
    $route(to, from) {
      if (to.path == "/EditOrder") {
        this.ShowAdd = true;
      }
    },
  },
  methods: {
    ResetMC: function () {
      var obj = {
        api: "post",
        url: this.$store.state.http + "SO/ResetSO",
        data: {
          Id: this.$store.state.Vuex.SOId,
        },
      };
      this.$https(obj).then((res) => {
        this.$look(
          "success",
          "恢复成功！",
          Row.MaintainCode + "的状态已恢复！"
        );
      });
    },
    ConsigneeS: function (ce) {
      console.log(ce);
      this.Consignee.Name = ce.Name;
      this.Consignee.EnginnerName = ce.NameEn;
      this.Consignee.MobilePhone = ce.Mobile;
      this.Consignee.Tel = ce.Tel;
      this.Consignee.EMail = ce.Email;
      this.Consignee.Address = ce.Address;
      this.dialogTableVisible = false;
    },
    // 发货单
    Invoice: function () {
      if (
        this.BelongCompany == "" ||
        this.BelongCompany == null ||
        this.BelongCompany == undefined
      ) {
        this.$look("warning", "请选择隶属公司！");
        return false;
      }
      const { href } = this.$router.resolve({
        path: this.$store.state.Vuex.TencentServer + "/List/Delivery.html",
        query: {
          url: Base64.encodeURI(this.$store.state.http + "SO/GetSo"),
          soId: Base64.encodeURI(this.$store.state.Vuex.SOId),
          token: Base64.encodeURI(this.$store.state.token),
          index: Base64.encodeURI(this.BelongCompany == "技术公司" ? "1" : "2"),
        },
      });
      console.log("000");
      window.open(href.slice(2), "_blank");
    },
    // 搜索当前客户的收货人
    SelectConsignee: function () {
      console.log(this.CusId);
      var obj = {
        data: {
          cusId: this.CusId,
        },
        api: "get",
        url: this.$store.state.http + "CRM/GetCusLinkManMini",
        header: this.$store.state.token,
      };
      this.$https(obj).then((res) => {
        console.log(res.Data.Dtos);
        this.gridData = res.Data.Dtos;
        this.dialogTableVisible = true;
      });
    },
    Orderlistmag: function () {
      console.log(this.BelongCompany);
      if (
        this.BelongCompany == "" ||
        this.BelongCompany == null ||
        this.BelongCompany == undefined
      ) {
        this.$look("warning", "请选择隶属公司！");
        return false;
      }

      if (this.BelongCompany === "技术公司") {
        // 技术公司报价单
        const { href } = this.$router.resolve({
          path: this.$store.state.Vuex.TencentServer + "/List/technology.html",
          query: {
            url: Base64.encodeURI(this.$store.state.http + "SO/GetSo"),
            soId: Base64.encodeURI(this.$store.state.Vuex.SOId),
            token: Base64.encodeURI(this.$store.state.token),
          },
        });
        window.open(href.slice(2), "_blank");
      } else {
        // 服务公司报价单
        const { href } = this.$router.resolve({
          path: this.$store.state.Vuex.TencentServer + "/List/service.html",
          query: {
            url: Base64.encodeURI(this.$store.state.http + "SO/GetSo"),
            soId: Base64.encodeURI(this.$store.state.Vuex.SOId),
            token: Base64.encodeURI(this.$store.state.token),
          },
        });
        window.open(href.slice(2), "_blank");
      }
    },
    // 返回当前物流数量 键值对
    NumberIndex: function (index) {
      return "Number" + index;
    },
    // 查看物流
    DeliverysHttp: function (index) {
      var LogisticsorderNo = this.Data.Deliverys[index].LogisticsInfo;
      window.open(
        "https://www.sf-express.com/cn/sc/dynamic_function/waybill/#search/bill-number/" +
          LogisticsorderNo,
        "_blank"
      );
    },
    // 发货
    deliverGoods: function () {
      if (this.GoodsDH == "") {
        this.$look("warning", "请输入物流信息！");
        return false;
      }
      // 整合所有arr
      var Dtos = [];
      for (let index = 0; index < this.SOEquipmentList.length; index++) {
        var arritem = this.SOEquipmentList[index].arr;
        arritem.map((item) => {
          if (item.value != "" && item.value != 0) {
            Dtos.push(item);
          }
        });
      }
      var DtosG = [];
      for (let One = 0; One < Dtos.length; One++) {
        const element = Dtos[One];
        if (element.name == "") {
          this.$look("warning", "没有库位不可发");
          return false;
        }
        DtosG.push({
          Location: element.name.split("[")[0],
          Quantity: Number(element.value),
        });
      }

      console.log(DtosG);
      if (DtosG.length == 0) {
        this.$look("warning", "请输入发货数量");
      }

      var obj = {
        api: "post",
        url: this.$store.state.http + "SO/ShipmentSO",
        data: {
          SOId: this.$store.state.Vuex.SOId,
          LogisticsInfo: this.GoodsDH, //物流信息
          Dtos: DtosG,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.$emit("refresh");
        this.$router.push({ path: "/SpareParts" });
      });

      return false;

      var Dtos = [];
      for (let index = 0; index < this.SOEquipmentList.length; index++) {
        let emt = this.SOEquipmentList[index];
        console.log(emt);
        if (emt.index != "" && emt.index != undefined) {
          if (emt.Locations == "") {
            this.$look("warning", "暂无库存不可发！");
            return false;
          }
          Dtos.push({
            Location: emt.Locations,
            Quantity: Number(emt.index),
          });
        }
      }
      console.log(Dtos);

      if (Dtos.length == 0) {
        this.$look("warning", "请输入发货数量！");
        return false;
      }
      var obj = {
        api: "post",
        url: this.$store.state.http + "SO/ShipmentSO",
        data: {
          SOId: this.$store.state.Vuex.SOId,
          LogisticsInfo: this.GoodsDH, //物流信息
          Dtos: Dtos,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.$emit("refresh");
        this.$router.push({ path: "/SpareParts" });
      });
    },
    // 删除设备
    dele: function (res) {
      console.log(res);
      var obj = {
        api: "post",
        url: this.$store.state.http + "SO/DelSoGood",
        data: {
          Id: res.SOGoodId,
        },
      };
      this.$https(obj).then((res) => {
        this.init();
      });
    },
    // 点击差旅费
    handleSelect(item) {
      this.TravelAmounts = item.Price;
      this.pricesOfPartsJS();
    },
    Qingk: function () {
      this.TravelAmounts = "";
      this.TravelAmount = "";
      this.pricesOfPartsJS();
    },
    InoutgB: function (res) {
      if (res.split("-").length == 2) {
      } else {
        this.TravelAmounts = res;
      }
      this.pricesOfPartsJS();
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
    // 计算总金额
    pricesOfPartsJS: function (unde) {
      var prices = 0;
      var NumberCG = 0;
      for (let index = 0; index < this.SOEquipmentList.length; index++) {
        const element = this.SOEquipmentList[index];
        console.log(element);
        // 计算采购总金额

        if (element.BuyingCurrency == "RMB") {
          NumberCG += Number(element.BuyingUnitPrice) * element.Number;
        } else {
          NumberCG += Number(element.BuyingUnitPrice) * 10 * element.Number;
        }

        if (element.IsAssembly) {
          prices +=
            (element.AssemblyPeice + element.UnitPrice) * element.Number;
        } else {
          prices += element.UnitPrice * element.Number;
        }
      }
      this.TotalPrice.NumberCG = NumberCG;

      var Discountss = Number(this.Discount);
      if (this.Discount == undefined || Discountss == "") {
        Discountss = 0;
      }

      this.TotalPrice.Amount = (
        Number(this.TotalPrice.LogisticCharge) +
        prices +
        Number(this.TravelAmounts)
      ).toFixed(2);

      if (this.DiscountAmountIndex == false) {
        this.DiscountAmountIndex = true;
        return false;
      }
      this.DiscountAmount = this.TotalPrice.Amount * (1 - Discountss * 0.01);

      if (unde == "SaveOrderS") {
        this.SaveOrderS();
      }
    },
    // 保存订单
    SaveOrderS: function () {
      // 设备清单
      var SaveSOGoodDtos = [];
      for (let index = 0; index < this.SOEquipmentList.length; index++) {
        const element = this.SOEquipmentList[index];
        console.log(element.SOGoodId);
        var objde = {};
        objde["SOGoodId"] = element.SOGoodId;
        objde["Number"] = element.Number;
        objde["IsAssembly"] = element.IsAssembly;
        SaveSOGoodDtos.push(objde);
      }

      // 收货人
      var SaveSOConsigneeindex = {
        name: this.Consignee.Name,
        EnginnerName: this.Consignee.EnginnerName,
        Mobile: this.Consignee.MobilePhone,
        Tel: this.Consignee.Tel,
        Email: this.Consignee.EMail,
        Address: this.Consignee.Address,
      };
      console.log(SaveSOConsigneeindex);
      console.log(SaveSOGoodDtos);
      console.log(this.Data.Memo);
      var obj = {
        api: "post",
        url: this.$store.state.http + "SO/SaveSO",
        data: {
          Memo: this.Data.Memo,
          SOId: this.$store.state.Vuex.SOId,
          QuoteCode: this.Data.QuoteCode,
          Amount: this.TotalPrice.Amount,
          DiscountProportion: this.Discount,
          SaveSOConsignee: SaveSOConsigneeindex,
          TravelAmount: this.TravelAmounts,
          LogisticCharge: this.TotalPrice.LogisticCharge,
          DiscountAmount: this.DiscountAmount,
          SaveSOGoodDtos: SaveSOGoodDtos,
          BelongCompany: this.BelongCompany,
          SoQuoteType: this.SoQuoteType,
        },
      };
      console.log(obj);
      this.$https(obj).then((res) => {});
    },
    SaveOrder: function (stateIdd) {
      if (
        this.SoQuoteType == "" ||
        this.SoQuoteType == null ||
        this.SoQuoteType == undefined
      ) {
        this.$look("warning", "无法保存！", "请选择报价类型！");
        return false;
      }

      // 设备清单
      var SaveSOGoodDtos = [];
      for (let index = 0; index < this.SOEquipmentList.length; index++) {
        const element = this.SOEquipmentList[index];
        console.log(element.SOGoodId);
        var objde = {};
        objde["SOGoodId"] = element.SOGoodId;
        objde["Number"] = element.Number;
        objde["IsAssembly"] = element.IsAssembly;
        SaveSOGoodDtos.push(objde);
      }

      // 收货人
      var SaveSOConsigneeindex = {
        name: this.Consignee.Name,
        EnginnerName: this.Consignee.EnginnerName,
        Mobile: this.Consignee.MobilePhone,
        Tel: this.Consignee.Tel,
        Email: this.Consignee.EMail,
        Address: this.Consignee.Address,
      };
      console.log(SaveSOConsigneeindex);
      console.log(SaveSOGoodDtos);
      console.log(this.Data.Memo);
      var obj = {
        api: "post",
        url: this.$store.state.http + "SO/SaveSO",
        data: {
          Memo: this.Data.Memo,
          SOId: this.$store.state.Vuex.SOId,
          QuoteCode: this.Data.QuoteCode,
          Amount: this.TotalPrice.Amount,
          DiscountProportion: this.Discount,
          SaveSOConsignee: SaveSOConsigneeindex,
          TravelAmount: this.TravelAmounts,
          LogisticCharge: this.TotalPrice.LogisticCharge,
          DiscountAmount: this.DiscountAmount,
          SaveSOGoodDtos: SaveSOGoodDtos,
          BelongCompany: this.BelongCompany,
          SoQuoteType: this.SoQuoteType,
        },
      };
      console.log(obj);
      this.$https(obj).then((res) => {
        this.init();
        if (stateIdd != undefined) {
          this.Edit(stateIdd);
        }
      });
    },
    // 刷新订单 价格
    RefreshOrderUnitPrice: function () {
      var obj = {
        api: "post",
        url: this.$store.state.http + "SO/SORefreshPrice",
        data: {
          Id: this.$store.state.Vuex.SOId,
        },
      };
      this.$https(obj).then((res) => {
        this.init();
      });
    },
    inits: function () {
      this.init();
      this.pricesOfPartsJS();
      this.ShowAdd = true;
    },
    // 初始化
    init: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "SO/GetSo",
        data: {
          soId: this.$store.state.Vuex.SOId,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);
        this.CusId = res.Data.CusId;
        this.Data = JSON.parse(JSON.stringify(res.Data));
        console.log(this.Data);
        this.SOEquipmentList = res.Data.SOEquipmentList;
        console.log(this.SOEquipmentList);
        this.TotalPrice = res.Data.TotalPrice;
        this.Discount = Number(this.TotalPrice.DiscountProportion);
        this.TravelAmount = String(this.TotalPrice.TravelAmount);
        this.TravelAmounts = Number(this.TotalPrice.TravelAmount);
        this.Consignee = res.Data.Consignee;
        this.State = Number(res.Data.State);
        // 隶属公司
        this.BelongCompany = res.Data.BelongCompany;
        this.SoQuoteType = res.Data.SoQuoteType;
        this.pricesOfPartsJS();
        // 优惠后的金额
        this.DiscountAmount = Number(this.TotalPrice.DiscountAmount);
        if (Number(this.TotalPrice.DiscountAmount) == 0) {
          this.DiscountAmountIndex = true;
          this.pricesOfPartsJS();
        }

        var DeliDetails = [];
        for (let index = 0; index < this.Data.Deliverys.length; index++) {
          var array = this.Data.Deliverys[index].DeliveryDetails;
          var del = [];
          for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
            for (var j = 0, delLen = del.length; j < delLen; j++) {
              if (array[i].ProductId === del[j].ProductId) {
                del[j].Number += array[i].Number;
                break;
              }
            }
            if (j === delLen) {
              del.push(array[i]);
            }
          }
          console.log(del);
          DeliDetails.push(del);
        }
        console.log(DeliDetails);
        this.DeliDetails = DeliDetails;

        // 将已发货物数量对齐 列表
        var ShipmentQuantity = [];

        for (let indexs = 0; indexs < DeliDetails.length; indexs++) {
          const element = DeliDetails[indexs];
          // var sss = {}
          for (let index2 = 0; index2 < element.length; index2++) {
            const element2 = element[index2];
            console.log(indexs);
            for (let index = 0; index < this.SOEquipmentList.length; index++) {
              const PrduId = this.SOEquipmentList[index].ProductId;
              console.log(this.SOEquipmentList[index].Locations);
              var num = "Number" + indexs;
              if (element2.ProductId == PrduId) {
                this.SOEquipmentList[index][num] = element2.Number;
              }
            }
          }
        }
        console.log(this.SOEquipmentList);

        // 将多个库位的挑出来   生成数组

        for (
          let indexmax = 0;
          indexmax < this.SOEquipmentList.length;
          indexmax++
        ) {
          const element = this.SOEquipmentList[indexmax];
          element.PurchaseUnitPrice =
            element.BuyingUnitPrice + " " + element.BuyingCurrency;
          const arrS = element.Locations.split("、");
          var ArrList = [];
          for (let indexre = 0; indexre < arrS.length; indexre++) {
            const elements = arrS[indexre];
            ArrList[indexre] = { name: elements, Number: element.Number };
            this.$set(ArrList[indexre], "value", "");
          }
          element["arr"] = ArrList;
        }

        console.log(this.SOEquipmentList);
        this.ShipmentQuantity = ShipmentQuantity;

        var NumberCG = 0;
        for (let index = 0; index < this.SOEquipmentList.length; index++) {
          const element = this.SOEquipmentList[index];
          element.Locations = element.Locations.split("[")[0];
          // 计算采购总金额
          if (element.BuyingCurrency == "RMB") {
            NumberCG += Number(element.BuyingUnitPrice) * element.Number;
          } else {
            NumberCG += Number(element.BuyingUnitPrice) * 10 * element.Number;
          }
        }
        this.TotalPrice["NumberCG"] = NumberCG;
      });
    },

    //操作
    Edit: function (State) {
      console.log(State);

      if (
        this.BelongCompany == "" ||
        this.BelongCompany == null ||
        this.BelongCompany == undefined
      ) {
        this.$look("warning", "请选择隶属公司！");
        return false;
      }

      if (
        this.Consignee.Name == "" ||
        this.Consignee.Name == null ||
        this.Consignee.Name == undefined
      ) {
        this.$look("warning", "请输入收货人姓名！");
        return false;
      }

      if (
        this.Consignee.MobilePhone == "" ||
        this.Consignee.MobilePhone == null ||
        this.Consignee.MobilePhone == undefined
      ) {
        this.$look("warning", "请输入收货人手机！");
        return false;
      }

      if (
        this.Consignee.Address == "" ||
        this.Consignee.Address == null ||
        this.Consignee.Address == undefined
      ) {
        this.$look("warning", "请输入收货人地址！");
        return false;
      }
      // xxxxxxxxxxxx
      var obj = {
        api: "post",
        url: this.$store.state.http + "SO/UpdateSOState",
        data: {
          SoId: this.$store.state.Vuex.SOId,
          SOStatus: State,
          QuoteCode: "",
          IsNeedInstall: "",
        },
      };
      if (this.State == 2 || this.State == 1) {
        // if (
        //   this.Data.QuoteCode == "" ||
        //   this.Data.QuoteCode == null ||
        //   this.Data.QuoteCode == undefined
        // ) {
        //   this.$look("warning", "请输入报价单号！");
        //   return false;
        // } else {
        //   obj.data.QuoteCode = this.Data.QuoteCode;
        // }

        this.$https(obj).then((res) => {
          this.$emit("refresh");
          this.$router.push({ path: "/SpareParts" });
        });

        return false;
      }
      if (this.State == 3) {
        // 是否需要安装？
        this.$confirm(" 是否需要安装?", "提示", {
          confirmButtonText: "需要",
          cancelButtonText: "不需要",
          distinguishCancelAndClose: true,
          type: "warning",
        })
          .then(() => {
            obj.data.IsNeedInstall = true;
            this.$https(obj).then((res) => {
              this.$emit("refresh");
              this.$router.push({ path: "/SpareParts" });
            });
          })
          .catch((action) => {
            if (action != "cancel") {
              return false;
            }
            obj.data.IsNeedInstall = false;
            this.$https(obj).then((res) => {
              this.$emit("refresh");
              this.$router.push({ path: "/SpareParts" });
            });
          });
        return false;
      }

      this.$https(obj).then((res) => {
        this.$emit("refresh");
        this.$router.push({ path: "/SpareParts" });
      });
    },
    AddSb: function () {
      this.$router.push({
        path: "/AddOrderMsg",
      });
      this.ShowAdd = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.segmentation {
  width: 99%;
  height: 30px;
  border-bottom: 2px solid #ccc;
  line-height: 30px;
  padding-left: 20px;
  box-sizing: border-box;
  color: #09c;
  font-size: 13px;
  margin-top: 30px;
  font-weight: bold;
  float: left;
}

//费用合计
.segation {
  width: 100%;
  float: left;
  .el-input {
    width: 250px;
    margin: 10px;
    // pointer-events: none;
  }
}

// 收货人
.consignee {
  width: 300px;
  height: 24px;
  float: left;
  font-size: 13px;
  line-height: 24px;
  padding: 10px;
  span {
    display: block;
    float: left;
    width: 70px;
    font-weight: bold;
  }
  .el-input {
    width: calc(100% - 71px);
  }
}

.textNB {
  width: 100%;
  float: left;
  div {
    width: 90px;
    font-weight: bold;
    font-size: 12px;
    padding: 10px;
    float: left;
    box-sizing: border-box;
  }
}

// 卡片
.itemxxxx9 {
  width: 100%;
  min-height: 24px;
  line-height: 24px;
  margin-bottom: 10px;
  font-size: 12px;
  float: left;
  padding: 10px;
  box-sizing: border-box;
  span {
    display: block;
    width: 90px;
    float: left;
    font-weight: bold;
  }
}

.itemxxxxx {
  width: 300px;
  height: 24px;
  line-height: 24px;
  margin-bottom: 10px;
  font-size: 12px;
  float: left;
  padding: 10px;
  box-sizing: border-box;

  span {
    display: block;
    width: 90px;
    float: left;
    font-weight: bold;
  }
  #SPan {
    color: #505050;
    font-weight: none;
  }
}
.itemxxxxX {
  width: 100%;
  height: 24px;
  line-height: 24px;
  margin-bottom: 10px;
  font-size: 12px;
  float: left;
  padding: 10px;
  box-sizing: border-box;
  span {
    display: block;
    width: 90px;
    float: left;
    font-weight: bold;
  }
}

.box-card {
  width: 300px;
  margin: 10px;
  float: left;
}
.C33 {
  float: right;
  margin: 10px;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 80px;
}

input {
  border: 0; // 去除未选中状态边框
  outline: none; // 去除选中状态边框
  background-color: rgba(0, 0, 0, 0); // 透明背景
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 0 5px;
  line-height: 28px;
  width: 80%;
}
</style>


