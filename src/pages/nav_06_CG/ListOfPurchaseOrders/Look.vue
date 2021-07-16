<template>
  <div class='box_s'>
    <div class="segmentation">
      基础信息
    </div>
    <div class="consignee">
      <span>发起人：</span>
      <span class="span">{{DataPO.Creater}}</span>
    </div>

    <div class="consignee">
      <span>付款方式：</span>
      <span class="span">{{DataPO.PayType}}</span>
    </div>

    <div class="consignee">
      <span>付款状态 ：</span>
      <span>{{DataPO.PayStatusStr}}</span>
    </div>

    <div class="consignee">
      <span>发货状态 ：</span>
      <span>{{DataPO.SentStatusStr  }}</span>
    </div>

    <div class="consignee">
      <span>发货日期：</span>
      <span class="span">{{DataPO.SendDate != null ? DataPO.SendDate.split('T')[0] : ' - - ' }}</span>
    </div>

    <div class="consignee">
      <span>收货日期：</span>
      <span class="span">{{DataPO.ReceiptDate != null ? DataPO.ReceiptDate.split('T')[0] : ' - - ' }}</span>
    </div>

    <div class="segmentation">
      选择设备
    </div>
    <el-table :data="SBData" size="mini" highlight-current-row border style="width: 100%" :header-cell-style="{background:'#e1e1e1'}">
      <el-table-column prop="ProductCode" label="产品编号" width="170" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="InchwellCode" label="内部编码" width="140" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="Brand" label="品牌" width="120" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="ProDesc" label="产品描述" :show-overflow-tooltip="true"></el-table-column>

      <el-table-column fixed="right" style="float: left" label="原币种单价" width="100">
        <template slot-scope="scope">
          <p style="width:49%;text-align:right;float:left">{{scope.row.OriginalCurrencyUnitPrice}}</p>
          <p style="width:49%;text-align:right;float:left;font-weight: bold;">{{scope.row.BuyingCurrency}}</p>
        </template>
      </el-table-column>

      <el-table-column fixed="right" style="float: left" label="汇率" width="100">
        <template slot-scope="scope">
          <el-input v-model="scope.row.Rate" size="mini" @change="UpdatePoGood(scope.row,'汇率')" placeholder="请输入汇率"></el-input>
        </template>
      </el-table-column>

      <el-table-column fixed="right" style="float: left" label="购买单价" width="154">
        <template slot-scope="scope">
          <el-input-number :min="1" size="mini" v-model="scope.row.BuyingUnitPrice" @change="UpdatePoGood(scope.row)"></el-input-number>
        </template>
      </el-table-column>

      <el-table-column fixed="right" style="float: left" label="添加数量" width="154">
        <template slot-scope="scope">
          <el-input-number :min="1" size="mini" v-model="scope.row.Number" @change="UpdatePoGood(scope.row)"></el-input-number>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteOK(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="WL">
      <span>物流费：</span>
      <el-input size="mini" v-model="LogisticCharge"></el-input>
    </div>

    <div class="WL">
      <span>总金额：</span>
      <p>{{ProAmount}}</p>
    </div>

    <div class="WL">
      <span style="width:90px">优惠后金额：</span>
      <el-input style="width:calc(100% - 91px)" size="mini" v-model="Amount"></el-input>
    </div>

    <div class="segmentation">
      收货人信息
    </div>
    <div class="consignee">
      <span>采购单号:</span>
      <!-- <el-input size="mini" v-model="POCode"></el-input> -->
      <p>{{POCode}}</p>
    </div>
    <div style="width:100%;float:left;"></div>

    <!-- 收货人 -->
    <div class="consignee">
      <span>姓名：</span>
      <el-input size="mini" v-model="POConsignee.Name"></el-input>
    </div>
    <div class="consignee">
      <span>英文名：</span>
      <el-input size="mini" v-model="POConsignee.EnginnerName"></el-input>
    </div>
    <div class="consignee">
      <span>手机：</span>
      <el-input size="mini" v-model="POConsignee.Mobile"></el-input>
    </div>
    <div class="consignee">
      <span>电话：</span>
      <el-input size="mini" v-model="POConsignee.Tel"></el-input>
    </div>
    <div class="consignee">
      <span>邮箱：</span>
      <el-input size="mini" v-model="POConsignee.Email"></el-input>
    </div>
    <div style="width:100%;float:left;"></div>

    <div class="consignee" style="width:800px">
      <span>地址：</span>
      <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 10}" placeholder="请输入内容" v-model="POConsignee.Address">
      </el-input>
    </div>
    <div style="width:100%;float:left;"></div>
    <div class="consignee" style="width:800px">
      <span>备注：</span>
      <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 10}" placeholder="请输入内容" v-model="Memo">
      </el-input>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
export default {
  // 定义属性
  data() {
    return {
      gridData: [],
      dialogTableVisible: false,
      dialogTableVisible2: false,
      search: "",
      POCode: "",
      SBData: [],
      POConsignee: {
        Name: "",
        EnginnerName: "",
        Mobile: "",
        Address: "",
      },
      Memo: "",
      emptyText: "数据较多,必须输入检索项(右上角)",
      drawer: false,
      dialogTableVisible3: false,

      GetProducts2: {
        pageNum: "1",
        numPerPage: 10,
        orderField: "",
        orderDirection: "",
        proType: 1,
        productCode: "",
        barcodeMemo: "",
        man: "",
        desc: "",
        memo: "",
      },
      Datatable: [],
      total: 0,
      BrandList: [],
      DataPO: {
        Creater: "",
      },
      LogisticCharge: 0,
      Amount: 0,

      SentStatus: 0,
      PayStatus: 0,
      PayType: 0,
      Status: 0,
      ProAmount: 0,
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    // 联系人
    GetCusLinkmanMini: function () {
      if (this.search == "") {
        this.gridData = [];
        this.emptyText = "必须输入检索项";
        return false;
      }
      this.emptyText = "正在查询 ··· ···";
      var obj = {
        api: "get",
        url: this.$store.state.http + "System/GetCusLinkmanMini",
        data: {
          search: this.search,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.gridData = res.Data;
      });
    },
    // 选择员工
    GetEmployeeMini: function () {
      this.dialogTableVisible = true;
      var obj = {
        api: "get",
        url: this.$store.state.http + "System/GetEmployeeMini",
        data: {
          type: 3,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.gridData = res.Data;
      });
    },
    Choose: function (row) {
      console.log(row);
      this.POConsignee = row;
      this.dialogTableVisible = false;
      this.dialogTableVisible2 = false;
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
          this.Datatable = [];
        })
        .catch((_) => {});
    },

    deleteOK: function (row) {
      console.log(row);
      var obj = {
        api: "post",
        url: this.$store.state.http + "PO/DelPoGood",
        data: {
          ID: row.POGoodId,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.initData();
        this.$look("success", "成功！", "删除成功！");
      });
    },
    initss: function (row) {
      if (row == "1") {
        this.GetProducts2.pageNum = "1";
      }
      var obj = {
        api: "get",
        url: this.$store.state.http + "Product/GetProducts2",
        data: this.GetProducts2,
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.Datatable = res.Data.Dtos;
        for (let index = 0; index < this.Datatable.length; index++) {
          const element = this.Datatable[index];
          this.$set(element, "Number", 1);
        }
        this.total = res.Data.DataBars;
      });
    },

    //输入第几页
    handleCurrentChange(val) {
      this.GetProducts2.pageNum = val;
      this.initss();
    },
    // 切换 每页条数时触发  刷新
    handleSizeChange(val) {
      this.GetProducts2.numPerPage = val;
      this.initss(1);
    },
    // 获取品牌
    GetBrand: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "System/GetBrand",
      };
      this.$https(obj).then((res) => {
        this.BrandList = res.Data;

        for (let index = 0; index < this.BrandList.length; index++) {
          this.BrandList[index]["value"] = this.BrandList[index].Value;
        }
      });
    },

    querySearch(queryString, cb) {
      if (queryString == undefined) {
        queryString = "";
        cb(this.BrandList);
        return false;
      }
      if (queryString == "") {
        cb(this.BrandList);
        return false;
      }

      var Search = queryString;
      var Data2 = this.BrandList;
      var DataInit = [];
      var input = Search.split("")[0];

      for (let index = 0; index < Data2.length; index++) {
        const element = Data2[index];
        if (element.value.indexOf(Search) != -1) {
          DataInit.push(element);
          // break;
        }
      }

      cb(DataInit);
    },
    // 单个选择
    adds: function (row) {
      var obj = {
        api: "post",
        url: this.$store.state.http + "PO/AddPoGoods",
        data: {
          POID: this.DataPO.Id,
          POGoodDtos: [
            {
              ProductId: row.ID,
              Number: row.Number,
              BuyingUnitPrice: row.BuyingUnitPrice,
            },
          ],
        },
      };
      this.$https(obj).then((res) => {
        this.initData();

        this.$look("success", "成功！", "添加成功！");
      });
      this.drawer = false;
    },
    // 多个添加
    addscheck: function () {
      var TableData = this.$refs.multipleTable.selection;
      var HttpData = [];
      for (let index = 0; index < TableData.length; index++) {
        const row = TableData[index];
        HttpData.push({
          ProductId: row.ID,
          Number: row.Number,
          BuyingUnitPrice: row.BuyingUnitPrice,
        });
      }

      var obj = {
        api: "post",
        url: this.$store.state.http + "PO/AddPoGoods",
        data: {
          POID: this.DataPO.Id,
          POGoodDtos: HttpData,
        },
      };
      this.$https(obj).then((res) => {
        this.initData();
        this.$look("success", "成功！", "添加成功！");
      });
      this.drawer = false;
    },
    // ICMS.创建采购单
    AddPO: function () {
      var POGoodDtos = [];

      for (let index = 0; index < this.SBData.length; index++) {
        const element = this.SBData[index];
        POGoodDtos.push({
          ProductId: element.ID,
          Number: element.ID,
        });
      }

      if (POGoodDtos.length == 0) {
        this.$look("warning", "提示！", "请选择想要采购的设备！");
        return false;
      }

      if (this.POCode == "") {
        this.$look("warning", "提示！", "请输入采购单号！");
        return false;
      }

      if (this.POConsignee.Name == "") {
        this.$look("warning", "提示！", "请输入收货人姓名！");
        return false;
      }

      if (this.POConsignee.EnginnerName == "") {
        this.$look("warning", "提示！", "请输入收货人英文名！");
        return false;
      }

      if (this.POConsignee.Mobile == "") {
        this.$look("warning", "提示！", "请输入收货人手机号！");
        return false;
      }

      if (this.POConsignee.Address == "") {
        this.$look("warning", "提示！", "请输入收货人地址！");
        return false;
      }

      var obj = {
        api: "post",
        url: this.$store.state.http + "PO/AddPO",
        data: {
          POCode: this.POCode,
          Memo: this.Memo,
          POConsignee: this.POConsignee,
          POGoodDtos: POGoodDtos,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.$emit("refresh"),
          this.$router.push({
            path: "/ListOfPurchaseOrders",
          });
      });
    },
    // 初始化
    initData: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "PO/GetPO",
        data: {
          poId: this.$store.state.Vuex.Id,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res.Data.PODetailDto);
        var data = res.Data.PODetailDto;
        this.SBData = data.POGoodDtos;
        // this.CalculateTheTotalAmount();

        for (let index = 0; index < this.SBData.length; index++) {
          this.$set(this.SBData[index], "NumberFH", "");
        }
        (this.ProAmount = data.ProAmount), (this.Memo = data.Memo);
        this.POCode = data.POCode;
        this.POConsignee = data.POConsignee;
        this.DataPO = data;
        this.Amount = data.Amount;
        this.LogisticCharge = data.LogisticCharge;
        this.SentStatus = data.SentStatus;
        this.PayStatus = data.PayStatus;
        this.PayType = data.PayType;
        this.Status = data.Status;

        // 付款方式
        if (this.DataPO.PayType == "1") {
          this.DataPO.PayType = "预付";
        }
        if (this.DataPO.PayType == "2") {
          this.DataPO.PayType = "到付";
        }
        if (this.DataPO.PayType == "3") {
          this.DataPO.PayType = "未知";
        }
      });
    },
    // 修改设备信息 单价 汇率 数量
    UpdatePoGood: function (row, item) {
      if (item == "汇率") {
        row.BuyingUnitPrice =
          Number(row.OriginalCurrencyUnitPrice) * Number(row.Rate);
      }

      var obj = {
        api: "post",
        url: this.$store.state.http + "PO/UpdatePoGood",
        data: {
          POGoodId: row.POGoodId,
          BuyingUnitPrice: row.BuyingUnitPrice,
          Number: row.Number,
          Rate: row.Rate,
        },
      };
      this.$https(obj).then((res) => {
        this.initData();
        this.$look("success", "成功！", "修改成功！");
      });
    },
    // 保存
    SavePO: function () {
      var obj = {
        api: "post",
        url: this.$store.state.http + "PO/SavePO",
        data: {
          Id: this.$store.state.Vuex.Id,
          Amount: this.Amount,
          LogisticCharge: this.LogisticCharge,
          POConsignee: this.POConsignee,
          Memo: this.Memo,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.initData();
        this.$look("success", "成功！", "已保存！");
      });
    },
    // 采购单确认和结单
    UpdatePoState: function (row) {
      if (row == "1") {
        var BZ = this.SBData[0].BuyingCurrency;
        console.log(BZ);

        for (let index = 0; index < this.SBData.length; index++) {
          const IndexBZ = this.SBData[index].BuyingCurrency;
          if (IndexBZ != BZ) {
            this.$look("warning", "提示！", "请统一币种！");
            return false;
          }
        }
      }

      console.log(row);
      var obj = {
        api: "post",
        url: this.$store.state.http + "PO/UpdatePoState",
        data: {
          POId: this.$store.state.Vuex.Id,
          Memo: this.Memo,
          ToSentStatus: row,
        },
      };
      this.$https(obj).then((res) => {
        this.$look("success", "成功！", "操作成功！");
        // 结单
        if (row == 4) {
          this.$emit("refresh"),
            this.$router.push({
              path: "/ListOfPurchaseOrders",
            });
        }
        // 确认
        if (row == 1) {
          this.SavePO();
        }
      });
    },
    // 供应商发货
    SupplierSendPO: function () {
      var SentGoods = [];

      for (let index = 0; index < this.SBData.length; index++) {
        const row = this.SBData[index];
        if (
          row.NumberFH != 0 &&
          row.NumberFH != "" &&
          row.NumberFH != null &&
          row.NumberFH != undefined
        ) {
          // 判断是否超出发货数量
          if (
            row.Number <
            Number(row.NumberFH) + Number(row.SentGoodsQuantity)
          ) {
            this.$look(
              "error",
              "发货数量超出！",
              "第" + (index + 1) + "条发货数量超出,单号为 :" + row.ProductCode
            );
            return false;
          }

          SentGoods.push({
            Id: row.POGoodId,
            Value: row.NumberFH,
          });
        }
        this.$set(this.SBData[index], "NumberFH", 0);
      }
      if (SentGoods.length == 0) {
        return false;
      }

      var obj = {
        api: "post",
        url: this.$store.state.http + "PO/SupplierSendPO",
        data: {
          POId: this.$store.state.Vuex.Id,
          Memo: this.Memo,
          SentGoods: SentGoods,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.initData();
        this.$look("success", "成功！", "正在发货!");
      });
    },
    // 到付 预付
    SetPOPayType: function (row) {
      var obj = {
        api: "post",
        url: this.$store.state.http + "PO/SetPOPayType",
        data: {
          Id: this.$store.state.Vuex.Id,
          Type: row,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.initData();
        this.$look("success", "成功！", "操作成功！");
      });
    },
    // DelPo
    DelPo: function () {
      var obj = {
        api: "post",
        url: this.$store.state.http + "PO/SetPOPayType",
        data: {
          Id: this.$store.state.Vuex.Id,
          Str: this.Memo,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.$emit("refresh"),
          this.$router.push({
            path: "/ListOfPurchaseOrders",
          });
      });
    },
    // 付款 驳回
    POPay: function (row) {
      var obj = {
        api: "post",
        url: this.$store.state.http + "po/POPay",
        data: {
          Id: this.$store.state.Vuex.Id,
          Type: row,
        },
      };
      this.$https(obj).then((res) => {
        this.initData();
        this.$look(
          "success",
          "成功！",
          row == "1" ? "付款成功！" : "驳回成功！"
        );
      });
    },
    // 调整采购单价格
    POModifyPrice: function () {
      var obj = {
        api: "post",
        url: this.$store.state.http + "PO/POModifyPrice",
        data: {
          Id: this.$store.state.Vuex.Id,
          Str: this.LogisticCharge,
          Type: this.Amount,
        },
      };
      this.$https(obj).then((res) => {
        this.initData();
        this.$look("success", "成功！", "调整成功！");
      });
    },
    // 重新申请付款
    POApplyPay: function () {
      var obj = {
        api: "post",
        url: this.$store.state.http + "PO/POApplyPay",
        data: {
          Id: this.$store.state.Vuex.Id,
        },
      };
      this.$https(obj).then((res) => {
        this.initData();
        this.$look("success", "成功！", "操作成功！");
      });
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // this.$store.state.Vuex.Id
    this.initData();
    this.GetBrand();

    // this.initss();
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
.consignee {
  width: 300px;
  min-height: 24px;
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
  .span {
    display: block;
    float: left;
    width: calc(100% - 71px);
    font-weight: bold;
  }
  .el-input,
  textarea {
    width: calc(100% - 71px);
  }
}

.WL {
  width: 200px;
  min-height: 24px;
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
  .span {
    display: block;
    float: left;
    width: calc(100% - 71px);
    font-weight: bold;
  }
  .el-input,
  textarea {
    width: calc(100% - 71px);
  }
}

.But {
  float: right;
  margin-right: 10px;
}
</style>