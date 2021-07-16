<template>
  <div class="box_s">
    <div class="Data_1">基础数据</div>

    <div class="demo">
      <div class="left_s">产品编号:</div>
      <div class="right_s">&nbsp;{{Product.ProductCode}}</div>
    </div>

    <div class="demo">
      <div class="left_s">内部编码:</div>
      <div class="right_s">&nbsp;{{Product.BarcodeMemo}}</div>
    </div>

    <div class="demo">
      <div class="left_s">品牌:</div>
      <div class="right_s">&nbsp;{{Product.Manufacturer}}</div>
    </div>

    <div class="demo">
      <div class="left_s">年份:</div>
      <div class="right_s">&nbsp;{{Product.ProductionYear}}</div>
    </div>

    <div class="demo">
      <div class="left_s">保质期:</div>
      <div class="right_s">&nbsp;{{Product.GuaranteePeriodMonths}}</div>
    </div>

    <div class="demo">
      <div class="left_s">库存量下限:</div>
      <div class="right_s">&nbsp;{{Product.MinInventoryAlert}}</div>
    </div>
    <div class="demo">
      <div class="left_s">库存量上限:</div>
      <div class="right_s">&nbsp;{{Product.MaxInventoryAlert}}</div>
    </div>

    <div class="demo">
      <div class="left_s">最佳库存量:</div>
      <div class="right_s">&nbsp;{{Product.OptimalInventory}}</div>
    </div>

    <div class="demo">
      <div class="left_s">单位:</div>
      <div class="right_s">&nbsp;{{Product.Unit}}</div>
    </div>

    <div class="demo">
      <div>是否回收:</div>
      <div class="right_s">&nbsp;{{Product.Recovery ?  '回收' :'不回收' }}</div>
    </div>

    <div class="Data_1">价格属性</div>

    <div class="demo">
      <div class="left_s">销售单价:</div>
      <div class="right_s">&nbsp;{{Product.UnitPrice}}</div>
    </div>

    <div class="demo">
      <div class="left_s">安装费:</div>
      <div class="right_s">&nbsp;{{Product.AssemblyUnitPrice}}</div>
    </div>

    <div class="demo">
      <div class="left_s">采购单价:</div>
      <div class="right_s">&nbsp;{{Product.BuyingUnitPrice}}</div>
    </div>
    <div class="demo">
      <div class="left_s">币种:</div>
      <div class="right_s">&nbsp;{{Product.BuyingCurrency}}</div>
    </div>

    <div class="demo">
      <div class="left_s">维修费:</div>
      <div class="right_s">&nbsp;{{Product.RepairCharge}}</div>
    </div>
    <div class="demo">
      <div class="left_s">维修费欧元价:</div>
      <div class="right_s">&nbsp;{{Product.ReapirChargeEUR}}</div>
    </div>

    <div class="demo">
      <div class="left_s">保养价格:</div>
      <div class="right_s">&nbsp;{{Product.MaintainPrice}}</div>
    </div>

    <div class="demo">
      <div class="left_s">保养工时:</div>
      <div class="right_s">&nbsp;{{Product.MaintainHours}}</div>
    </div>

    <div class="Data_1">内容，描述，备注</div>

    <div class="boxx_xx">
      <div class="top">保养内容：</div>
      <div class="bottom">{{Product.MaintainContent || "无"}}</div>
    </div>

    <div class="boxx_xx">
      <div class="top">产品描述：</div>
      <div class="bottom">{{Product.Characteristics || "无"}}</div>
    </div>

    <div class="boxx_xx">
      <div class="top">备注：</div>
      <div class="bottom">{{Product.Barcode || "无"}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      Product: this.$store.state.HomepageData,
    };
  },
  created() {},
  components: {},
  methods: {
    init: function () {
      var obj = {
        api: "get",
        url: this.store.state.http + xxx / xxx,
        data: {},
      };
      this.https(obj).then((res) => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.demo {
  width: 300px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  float: left;
  margin: 10px;
  .left_s {
    width: 130px;
    height: 100%;
    float: left;
    text-align: right;
    // font-weight: bolder;
  }
  .right_s {
    width: 170px;
    height: 100%;
    float: left;
    text-align: left;
    // border-bottom: 1px solid #ccc;
    color: #09c;
  }
}
// .bottom {
//   width: 100%;
//   float: left;
//   .top {
//     width: 100%;
//     height: 30px;
//     line-height: 30px;
//     font-weight: bolder;
//     padding-left: 20px;
//     box-sizing: border-box;
//   }
//   .bottoms {
//     width: 95%;
//     padding: 10px;
//     margin: auto;
//     box-sizing: border-box;
//     background: #ececec;
//     border-radius: 5px;
//   }
// }

.boxx_xx {
  width: 500px;
  margin: 10px;
  border: 1px solid rgb(228, 227, 227);
  float: left;
  box-sizing: border-box;
  border-radius: 5px;
  .top {
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    font-weight: bolder;
  }
  .bottom {
    width: 100%;
    padding-left: 100px;
    box-sizing: border-box;
    line-height: 25px;
  }
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.ge {
  width: 100%;
  float: left;
}
</style>
