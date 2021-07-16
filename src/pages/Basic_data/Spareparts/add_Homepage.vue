<template>
  <div class="box_s">
    <!-- 数据一级 -->
    <div class="Data_1">基础数据</div>

    <div class="demo">
      <div>产品编号:</div>
      <el-input v-model="Product.ProductCode" size="mini"></el-input>
    </div>
    <div class="demo">
      <div>内部编码:</div>
      <el-input v-model="Product.BarcodeMemo" size="mini"></el-input>
    </div>

    <div class="demo">
      <div>品牌:</div>
      <el-row class="demo-autocomplete">
        <el-col>
          <el-autocomplete size='mini' class="inline-input input" v-model="Product.Manufacturer" @select="handleSelect" :fetch-suggestions="querySearch" @input="BuyingUnitPriceOnclick" placeholder="请输入内容">
          </el-autocomplete>
        </el-col>
      </el-row>
    </div>

    <div class="demo">
      <div>年份:</div>
      <el-date-picker style="width:180px;background:#FFF" v-model="Product.ProductionYear" type="year" size="mini" value-format="yyyy" placeholder="选择年"></el-date-picker>
    </div>
    <!-- 保质期 -->
    <div class="demo">
      <div>保质期:</div>
      <!-- <el-input v-model="Product.GuaranteePeriodMonths" size="mini"></el-input> -->
      <el-select v-model="Product.GuaranteePeriodMonths" size="mini" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>

    <div class="demo">
      <div>库存量下限:</div>
      <el-input v-model="Product.MinInventoryAlert" class="no-number" type="number" size="mini"></el-input>
    </div>

    <div class="demo">
      <div>库存量上限:</div>
      <el-input v-model="Product.MaxInventoryAlert" class="no-number" type="number" size="mini"></el-input>
    </div>

    <div class="demo">
      <div>最佳库存量:</div>
      <el-input v-model="Product.OptimalInventory" class="no-number" type="number" size="mini"></el-input>
    </div>

    <div class="demo">
      <div>单位:</div>
      <el-input v-model="Product.Unit" size="mini"></el-input>
    </div>

    <div class="demo">
      <div>是否回收:</div>
      <el-switch v-model="Product.Recovery" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
    </div>

    <!-- 数据一级 -->
    <div class="Data_1">价格属性</div>
    <!-- 采购 -->
    <div class="Data_2">
      <div class="demo2">
        <div class="div_567876">采购单价:</div>
        <el-input placeholder="请输入内容" v-model="Product.BuyingUnitPrice " size="mini" style="width:calc(100% - 120px)" class="input-with-select no-number" @input="BuyingUnitPriceOnclick" type="number">
          <el-select style="width:120px;" v-model="Product.BuyingCurrency" size="mini" slot="prepend" placeholder="请选择币种" @change="BuyingUnitPriceOnclick">
            <el-option label="RMB" value="RMB"></el-option>
            <el-option label="EUR" value="EUR"></el-option>
          </el-select>
        </el-input>
      </div>

      <div class="demo">
        <div>销售单价:</div>
        <el-input v-model="Product.UnitPrice" class="no-number" type="number" size="mini"></el-input>
      </div>
    </div>
    <!-- 保养 -->
    <div class="Data_2">
      <div class="demo2">
        <div class="div_567876">保养工时:</div>
        <el-input placeholder="请输入内容" v-model="Product.MaintainHours" size="mini" style="width:calc(100% - 120px)" class="input-with-select a1 no-number" type="number" @input="MaintainPrice">
          <el-select style="width:120px;" v-model="Product.BMBSJ" size="mini" slot="prepend" placeholder="请选择系数" @change="MaintainPrice">
            <el-option label="宝马" value="35"></el-option>
            <el-option label="保时捷" value="45"></el-option>
          </el-select>
        </el-input>
      </div>

      <div class="demo">
        <div>保养价格:</div>
        <el-input v-model="Product.MaintainPrice" class="no-number" type="number" size="mini"></el-input>
      </div>
    </div>
    <!-- 维修 -->
    <div class="Data_2">
      <div class="demo">
        <div>维修费欧元价:</div>
        <el-input v-model="Product.ReapirChargeEUR" @input="BuyingUnitPrice()" class="no-number" type="number" size="mini"></el-input>
      </div>

      <div class="demo">
        <div>维修费:</div>
        <el-input v-model="Product.RepairCharge" class="no-number" type="number" size="mini"></el-input>
      </div>
    </div>
    <!-- 安装 -->
    <div class="Data_2">
      <div class="demo">
        <div>安装工时:</div>
        <el-input v-model="Product.AssemblyUnitPriceTime" @input="AssemblyUnitPriceTimeMN()" size="mini" class="no-number" type="number"></el-input>
      </div>
      <div class="demo">
        <div>安装费:</div>
        <el-input v-model="Product.AssemblyUnitPrice" class="no-number" type="number" size="mini"></el-input>
      </div>
    </div>
    <div class="Data_1">描述，内容，备注</div>

    <div class="bottom">
      <!-- 备注 -->

      <!-- 备注 -->
      <div class="Memo">
        <div>产品描述：</div>
        <el-input type="textarea" placeholder="请输入内容" v-model="Product.Characteristics" show-word-limit></el-input>
      </div>

      <!-- 保养内容 -->
      <div class="Memo">
        <div>保养内容：</div>
        <el-input type="textarea" placeholder="请输入内容" v-model="Product.MaintainContent" show-word-limit></el-input>
      </div>

      <div class="Memo">
        <div>备注：</div>
        <el-input type="textarea" placeholder="请输入内容" v-model="Product.Barcode" show-word-limit></el-input>
      </div>
    </div>
    <div class="true">
      <el-button type="primary" style="float:right" size="mini" @click="add()">确认添加</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "6",
          label: "半年",
        },
        {
          value: "12",
          label: "一年",
        },
        {
          value: "18",
          label: "一年半",
        },
        {
          value: "24",
          label: "两年",
        },
      ],
      optionss: [],
      Product: {
        // 是否回收
        Recovery: false,
        ProductCode: "",
        // 产品编号
        ProductionYear: "",
        // 产品年份
        GuaranteePeriodMonths: "",
        // 保质期
        Characteristics: "",
        // 产品描述
        MaintainContent: "",
        // 保养内容
        KitFlag: false,
        // 零配件
        MinInventoryAlert: "",
        // 库存量下限
        MaxInventoryAlert: "",
        // 库存量上限
        OptimalInventory: "",
        // 最佳库存量
        Unit: "",
        // 单位
        UnitPrice: "",
        // 销售单价
        AssemblyUnitPriceTime: "",
        // 安装工时
        AssemblyUnitPrice: "0",
        //  安装费
        BuyingUnitPrice: "",
        // 采购单价
        BuyingCurrency: "RMB",
        // 币种
        Barcode: "",
        // 备注
        BarcodeMemo: "",
        // 内部编码
        RepairCharge: "",
        // 维修费
        ReapirChargeEUR: "",
        // 维修费欧元
        MaintainPrice: "",
        // 保养价格
        MaintainHours: "",
        // 保养工时
        BMBSJ: "35",
        // 保养车型
        Manufacturer: "",
        // 品牌
      },
      state1: "",
      // 品牌确认值
      restaurants: [],
      // 品牌供选值
    };
  },

  mounted() {
    // 获取品牌
    this.Manufacturer();
  },
  methods: {
    // 获取品牌信息
    Manufacturer: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "Product/GetManufacturer",
      };
      this.$https(obj).then((res) => {
        this.optionss = res.Data;
        var restaurants = [];
        for (var i = 0; i < res.Data.length; i++) {
          restaurants.push({
            value: res.Data[i].Name,
            address: res.Data[i].ID,
          });
        }
        this.restaurants = restaurants;
        console.log(restaurants);
      });
    },
    // 品牌输入框
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    // 品牌检索
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    // 输入维修费欧元 输出维修费
    BuyingUnitPrice: function () {
      console.log(this.Product.ReapirChargeEUR * 9 * 1.06);
      this.Product.RepairCharge = (
        this.Product.ReapirChargeEUR *
        9 *
        1.06
      ).toFixed(2);
    },
    // 输入安装工时  输出安装费
    AssemblyUnitPriceTimeMN: function (res) {
      this.Product.AssemblyUnitPrice = (
        this.Product.AssemblyUnitPriceTime *
        14 *
        1.17
      ).toFixed(2);
    },
    // 输出保养价格
    MaintainPrice: function () {
      this.Product.MaintainPrice = (
        this.Product.MaintainHours * this.Product.BMBSJ
      ).toFixed(2);
    },
    handleSelect(item) {
      console.log(item.address);
      this.Product.ManufacturerAddress = item.address;
    },
    // 切换币种
    BuyingUnitPriceOnclick: function () {
      console.log(this.Product);

      if (
        this.Product.ManufacturerAddress ==
        "85d3cebb-c6be-4940-8037-8a38d70edf22"
      ) {
        //Nussbaum专用价格公式
        this.Product.UnitPrice =
          (this.Product.BuyingUnitPrice *
            0.7 *
            (0.15 + 1) *
            (0.15 + 1) *
            (0.17 + 1) *
            (0.001 + 1) *
            (0.02 + 1) *
            8.7809) /
          (1 - 0.5);
        this.Product.UnitPrice = this.Product.UnitPrice.toFixed(2);
      } else if (
        this.Product.ManufacturerAddress ==
        "5db92775-3cfb-466c-b414-d9c647d2f9b0"
      ) {
        //BEISSBARTH
        this.Product.UnitPrice = (
          (this.Product.BuyingUnitPrice / 0.75) *
          1.1
        ).toFixed(2);
      } else if (
        this.Product.ManufacturerAddress ==
        "63501f26-7e48-41ae-bc11-5862cf4e1783"
      ) {
        //Festool
        this.Product.UnitPrice = (this.Product.BuyingUnitPrice / 0.65).toFixed(
          2
        );
      } else if (
        this.Product.ManufacturerAddress ==
        "9dfeb543-a782-4ba5-a9ec-8f2a6bacd7f1"
      ) {
        //SATA
        this.Product.UnitPrice = (this.Product.BuyingUnitPrice / 0.65).toFixed(
          2
        );
      } else if (
        this.Product.ManufacturerAddress ==
        "8c2befd7-36cb-4974-b905-e0a494ecf9c3"
      ) {
        //Hazet
        this.Product.UnitPrice = (this.Product.BuyingUnitPrice / 0.55).toFixed(
          2
        );
      } else if (
        this.Product.ManufacturerAddress ==
        "D0D9DDB9-18E5-43C0-97AA-CE538F0685AD"
      ) {
        //Maha
        this.Product.UnitPrice = (this.Product.BuyingUnitPrice / 0.6).toFixed(
          2
        );
      } else {
        if (this.Product.BuyingCurrency == "RMB") {
          //买入价为RMB价格公式
          this.Product.UnitPrice = this.Product.BuyingUnitPrice / (1 - 0.5);
          this.Product.UnitPrice = this.Product.UnitPrice.toFixed(2);
        }
        if (this.Product.BuyingCurrency == "EUR") {
          //买入价位EUR价格公式
          this.Product.UnitPrice =
            (this.Product.BuyingUnitPrice *
              (0.25 + 1) *
              (0.15 + 1) *
              (0.17 + 1) *
              (0.001 + 1) *
              (0.02 + 1) *
              8.7809) /
            (1 - 0.5);
          this.Product.UnitPrice = this.Product.UnitPrice.toFixed(2);
        }
      }
    },

    // 添加
    add: function () {
      // 产品编码
      if (this.Product.ProductCode == "") {
        return this.$msgs(1, "请输入产品编号！");
      } else if (this.Product.BarcodeMemo == "") {
        return this.$msgs(1, "请输入内部编码！");
      } else if (this.Product.Manufacturer == "") {
        return this.$msgs(1, "请输入品牌！");
      } else if (this.Product.BuyingUnitPrice == "") {
        return this.$msgs(1, "请输入采购单价！");
      } else if (this.Product.Characteristics == "") {
        return this.$msgs(1, "请输入产品描述！");
      }

      this.$msgs(0, "正在添加，请勿重复点击！");
      //   以上为恐怖的非空判断
      var obj = {
        api: "post",
        url: this.$store.state.http + "Product/AddProduct",
        data: {
          ProductCode: this.Product.ProductCode,
          ProductionYear: Number(this.Product.ProductionYear),
          GuaranteePeriodMonths: this.Product.GuaranteePeriodMonths,
          Characteristics: this.Product.Characteristics,
          MaintainContent: this.Product.MaintainContent,
          KitFlag: true,
          proType: 1,
          /// 产品类型  1：零配件  2：整机  3：耗材  4：通用
          //   标识
          MinInventoryAlert: Number(this.Product.MinInventoryAlert),
          MaxInventoryAlert: Number(this.Product.MaxInventoryAlert),
          OptimalInventory: Number(this.Product.OptimalInventory),
          Unit: this.Product.Unit,
          UnitPrice: Number(this.Product.UnitPrice),
          AssemblyUnitPrice: Number(this.Product.AssemblyUnitPrice),
          BuyingUnitPrice: Number(this.Product.BuyingUnitPrice),
          BuyingCurrency: this.Product.BuyingCurrency,
          Barcode: this.Product.Barcode,
          BarcodeMemo: this.Product.BarcodeMemo,
          RepairCharge: Number(this.Product.RepairCharge),
          ReapirChargeEUR: Number(this.Product.ReapirChargeEUR),
          MaintainPrice: Number(this.Product.MaintainPrice),
          MaintainHours: Number(this.Product.MaintainHours),
          Manufacturer: this.Product.Manufacturer,
          Recovery: this.Product.Recovery,
        },
      };
      this.$https(obj).then((res) => {
        if (res.Code == 0) {
          this.$emit("refresh"),
            this.$router.push({ path: "/Spareparts_page" });
          this.$msgs(0, "添加成功！");
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.Data_1 {
  width: 100%;
  border-bottom: 2px solid #878787;
  line-height: 30px;
  font-weight: bolder;
  float: left;
  font-size: 14px;
  margin-top: 20px;
}
.Data_2 {
  width: 100%;
  float: left;
}

.demo {
  width: 300px;
  float: left;
  margin: 10px;
  div {
    width: 120px;
    float: left;
    text-align: right;
    padding-right: 10px;
    box-sizing: border-box;
    line-height: 28px;
    font-size: 14px;
  }
  .demo-autocomplete {
    width: calc(100% - 120px);
    height: 28px;
    .el-col,
    .el-col-24,
    div {
      width: 100%;
      height: 28px;
      padding: 0;
    }
    .el-input__inner {
      height: 28px;
    }
  }
  .input {
    width: calc(100% - 120px);
  }
  .el-input {
    width: calc(100% - 120px);
  }
  .el-select {
    width: calc(100% - 120px);
    .el-input {
      width: 100%;
      padding-right: 0px;
    }
  }
}
.demo2 {
  width: 610px;
  float: left;
  margin: 10px;
  margin-right: 20px;
  .div_567876 {
    width: 120px;
    float: left;
    text-align: right;
    padding-right: 10px;
    box-sizing: border-box;
    line-height: 28px;
    font-size: 14px;
  }
}
.bottom {
  width: 100%;
  float: left;
  .Memo {
    width: 500px;
    float: left;
    padding-left: 50px;
    box-sizing: border-box;
    div {
      font-size: 14px;
      // font-weight: bolder;
      line-height: 30px;
    }
  }
}
.true {
  width: 100%;
  padding: 20px;
  padding-right: 50px;
  box-sizing: border-box;
  float: left;
}

.no-number::-webkit-outer-spin-button,
.no-number::-webkit-inner-spin-button {
  margin: 0;
  -webkit-appearance: none !important;
}

.no-number input[type="number"]::-webkit-outer-spin-button,
.no-number input[type="number"]::-webkit-inner-spin-button {
  margin: 0;
  -webkit-appearance: none !important;
}

.no-number {
  -moz-appearance: textfield;
}

.no-number input[type="number"] {
  -moz-appearance: textfield;
}
</style>


