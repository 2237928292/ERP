<template>
  <div class="box_s">
    <div class="segmentation">基础信息</div>
    <div class="text itemxxxxX">
      <p>
        <span>客户:</span>
        {{Data.CusFullName}}
      </p>
    </div>
    <div class="text itemxxxxx">
      <p>
        <span>合同号:</span>
        {{Data.ContractCode}}
      </p>
    </div>
    <div class="text itemxxxxx">
      <p>
        <span>任务单号:</span>
        {{Data.OrderCode}}
      </p>
    </div>
    <div class="text itemxxxxx">
      <p>
        <span>区域:</span>
        {{Data.Area}}
      </p>
    </div>
    <div class="text itemxxxxx">
      <p>
        <span>状态:</span>
        {{Data.MSSOStateStr}}
      </p>
    </div>
    <!-- 物流 -->
    <div class="segmentation">物流</div>
    <!-- 发货 -->
    <el-input placeholder style="width:400px;marginTop:10px;float:right" v-model="GoodsDH" size="mini">
      <template slot="prepend">物流信息:</template>
    </el-input>
    <el-table :data="GoosDtos" size="mini" :height="this.$store.state.TableOptimumHeight" highlight-current-row border style="width: 100%;marginTop:10px;float:left" :header-cell-style="{background:'#e1e1e1'}">
      <el-table-column fixed prop="Brand" label="品牌" width="150"></el-table-column>
      <el-table-column fixed prop="ProductCode" label="内部编码" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column fixed prop="ProDesc" label="产品描述" width="100"></el-table-column>
      <el-table-column fixed prop="Delivered" label="已发数量" width="80"></el-table-column>
      <el-table-column fixed prop="Quantity" label="订单数量" width="80"></el-table-column>
      <el-table-column fixed label="物流" width="100" v-for="(items,indexs) in LogisticDtos" :prop="NumberIndex(indexs)" :key="indexs">
        <template slot="header">
          <p @click="DeliverysHttp(indexs)">{{'物流'+(indexs+1)}}</p>
        </template>
      </el-table-column>
      <el-table-column fixed label="发货" width="120">
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.index"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <el-button class="C33" size="mini" @click="deliverGoods" type="primary">发货</el-button>

  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      Data: {},
      GoodsDH: "", //物流单号
      GoosDtos: [], //发货物品
      LogisticDtos: [],
    };
  },
  created() {
    this.init();
  },
  components: {},
  methods: {
    //   初始
    init: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "Maintain/GetMSSO",
        data: {
          Id: this.$store.state.Vuex.Delivery,
        },
      };
      this.$https(obj).then((res) => {
        this.Data = res.Data.Dto;
        // 发货订单
        this.GoosDtos = res.Data.Dto.GoosDtos;
        // 已发
        this.LogisticDtos = res.Data.Dto.LogisticDtos;

        for (let index = 0; index < this.GoosDtos.length; index++) {
          const element = this.GoosDtos[index];
          this.$set(element, "index", "");
        }
        console.log("-------------------------");
        var ShipmentCollection = []; // 发货集合
        // this.GoosDtos               // 待发集合
        for (let index = 0; index < this.LogisticDtos.length; index++) {
          ShipmentCollection.push(this.LogisticDtos[index].LogisticGoodDtos);
        }
        // 判断 每一次发货的商品
        console.log(ShipmentCollection);
        for (let index = 0; index < ShipmentCollection.length; index++) {
          const element = ShipmentCollection[index];
          // 循环出每一次发货
          var Pro = "Number" + index;
          for (let web = 0; web < element.length; web++) {
            const wlweb = element[web];
            // console.log(wlweb)
            // 获得单个货品
            for (let Goos = 0; Goos < this.GoosDtos.length; Goos++) {
              const PrduId = this.GoosDtos[Goos].ProductId;
              if (wlweb.ProductId == PrduId) {
                this.GoosDtos[Goos][Pro] = wlweb.Quantity;
              }
            }
          }
        }
      });
    },
    // 返回当前物流数量 键值对
    NumberIndex: function (index) {
      return "Number" + index;
    },
    // 查看物流
    DeliverysHttp: function (index) {
      console.log(index);
      var LogisticsorderNo = this.LogisticDtos[index].LogisticInfo;
      //   切割去除  'SF'
      console.log(LogisticsorderNo.split(0, 2));
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
      var Data = [];
      //   判断是否有输入数量
      var EnterQuantity = this.GoosDtos.length;
      for (let index = 0; index < this.GoosDtos.length; index++) {
        const element = this.GoosDtos[index];
        Data.push({
          ProductId: element.ProductId,
          Quantity: element.index,
        });
        if (element.index == "" || element.index == 0) {
          EnterQuantity -= 1;
        }
      }
      if (EnterQuantity == 0) {
        this.$look("warning", "请输入发货数量！");
        return false;
      }
      var obj = {
        api: "post",
        url: this.$store.state.http + "Maintain/SendMSSO",
        data: {
          MaintainSuppliesSOId: this.$store.state.Vuex.Delivery,
          LogisticInfo: this.GoodsDH,
          Goods: Data,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);
        this.init();
        this.$look("success", "发货成功！");
        return false;
      });
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

// 卡片

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
.C33 {
  float: right;
  margin: 10px;
}
</style>
