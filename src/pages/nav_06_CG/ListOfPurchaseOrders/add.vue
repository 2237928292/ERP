<template>
  <div class='box_s'>
    <div class="segmentation">
      选择设备
      <el-button style="float:right" size="mini" type="primary" @click="drawer = true,initss()">选择设备</el-button>
    </div>
    <el-table :data="SBData" size="mini" highlight-current-row border style="width: 100%" :header-cell-style="{background:'#e1e1e1'}">

      <el-table-column prop="ProductCode" label="产品编号" width="170" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="BarcodeMemo" label="内部编码" width="140" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="OriginalCurrencyUnitPrice" label="原币种单价" width="150" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="BuyingUnitPrice" label="购买单价" width="100" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="Rate" label="汇率" width="100" :show-overflow-tooltip="true"></el-table-column>
      <!-- <el-table-column prop="SN" label="序列号" width="130"></el-table-column> -->
      <el-table-column prop="Manufacturer" label="品牌" width="120" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="Characteristics" label="产品描述" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column fixed="right" style="float: left" label="添加数量" width="154">
        <template slot-scope="scope">
          <el-input-number :min="1" size="mini" v-model="scope.row.Number"></el-input-number>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteOK(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="segmentation">
      收货人信息
      <el-button-group style="float:right">
        <el-button size="mini" type="primary" @click="emptyText = '数据较多,必须输入检索项(右上角)' ,search = '',dialogTableVisible2 = true,gridData = [] ">选择客户联系人</el-button>
        <el-button size="mini" type="primary" @click="GetEmployeeMini()">选择内部员工</el-button>
      </el-button-group>
    </div>
    <div class="consignee">
      <span>采购单号:</span>
      <el-input size="mini" v-model="POCode"></el-input>
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

    <div style="width:100%;float:left;"></div>
    <el-button size="mini" type="primary" style="float:right;marginRight:10px" @click="AddPO()">创建</el-button>
    <!-- 选择自己人 -->
    <el-dialog title="选择收货人" :visible.sync="dialogTableVisible" :modal-append-to-body='false'>
      <el-table :data="gridData" height='400' style="width: 100%" size='mini'>
        <el-table-column label="姓名" prop="Name" width="70"></el-table-column>
        <el-table-column label="区域" prop="Area" width="100"></el-table-column>
        <el-table-column label="手机" prop="Mobile" width="140"></el-table-column>
        <el-table-column label="地址" prop="Address" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="Choose(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 选择联系人 -->
    <el-dialog title="选择收货人" :visible.sync="dialogTableVisible2" :modal-append-to-body='false' size='mini'>
      <el-table :data="gridData" height='400' style="width: 100%" :empty-text='emptyText'>
        <el-table-column label="姓名" prop="Name" width="70"></el-table-column>
        <el-table-column label="区域" prop="Area" width="100"></el-table-column>
        <el-table-column label="手机" prop="Mobile" width="120"></el-table-column>
        <el-table-column label="公司名称" prop="CusFullName" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" style="color:red" @input="GetCusLinkmanMini" placeholder="输入关键字" />
          </template>
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="Choose(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 设备弹出选择窗 -->
    <el-drawer :visible.sync="drawer" direction="ltr" :modal="false" style="width: 200%" title="选择设备" :before-close="handleClose">

      <div class="top_init_data" style="marginbottom: 10px">
        <!-- 检索内容 -->
        <el-input style="width: 193px" size="mini" v-model="GetProducts2.productCode" @change="initss(1)" placeholder="请输入产品编码"></el-input>
        <!-- 产品编码 -->
        <el-input style="width: 193px" size="mini" v-model="GetProducts2.barcodeMemo" @change="initss(1)" placeholder="请输入内部编码"></el-input>
        <!-- 内部编码 -->
        <el-input style="width: 193px" size="mini" v-model="GetProducts2.desc" @change="initss(1)" placeholder="请输入产品描述"></el-input>
        <!-- 描述 -->
        <el-input style="width: 193px" size="mini" v-model="GetProducts2.memo" @change="initss(1)" placeholder="请输入产品备注"></el-input>
        <!-- 品牌 -->

        <el-autocomplete size="mini" @input="initss(1)" v-model="GetProducts2.man" :show-overflow-tooltip="true" :fetch-suggestions="querySearch" placeholder="请选择品牌" clearable>
        </el-autocomplete>
        <el-button size="mini" type="primary" @click="initss(1)" style="float: right">检索</el-button>

      </div>

      <!-- 表格 -->
      <el-table :data="Datatable" size="mini" :height="this.$store.state.Vuex.TableOptimumHeight" border style="marginbottom: 10px" ref="multipleTable" :header-cell-style="{ background: '#e1e1e1' }">
        <el-table-column prop="ProductCode" label="产品编号" width="170" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="BarcodeMemo" label="内部编码" width="140" :show-overflow-tooltip="true"></el-table-column>
        <!-- <el-table-column prop="SN" label="序列号" width="130"></el-table-column> -->
        <el-table-column prop="Manufacturer" label="品牌" width="120" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="Characteristics" label="产品描述" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column fixed="right" style="float: left" type="selection" width="55"></el-table-column>
        <el-table-column fixed="right" style="float: left" label="添加数量" width="154">
          <template slot-scope="scope">
            <el-input-number :min="1" size="mini" v-model="scope.row.Number"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="80">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="adds(scope.row)">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" size="mini" style="float: right" @click="addscheck()">添加选择</el-button>
      <!-- 分页 -->
      <nav style="text-align: center">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-size="GetProducts2.numPerPage" :page-sizes="this.$store.state.Vuex.pageSNumber"
          layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </nav>

    </el-drawer>

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
        if (this.gridData.length == 0)
          this.emptyText = "未查询到相关人员，请尝试切换检索项";
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
      for (let index = 0; index < this.SBData.length; index++) {
        const element = this.SBData[index];
        if (element.ID == row.ID) {
          this.SBData.splice(index, 1);
        }
      }
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
    GetBrand: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "System/GetBrand",
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.BrandList = res.Data;

        for (let index = 0; index < this.BrandList.length; index++) {
          this.BrandList[index]["value"] = this.BrandList[index].Value;
        }
        console.log(this.BrandList);
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
      if (this.SBData.length == 0) {
        this.SBData.push(row);
      } else {
        var rowif = true;
        for (let index = 0; index < this.SBData.length; index++) {
          const element = this.SBData[index];
          if (element.ID == row.ID) {
            rowif = false;
            element.Number += row.Number;
          }
        }
        if (rowif) {
          this.SBData.push(row);
        }
      }
      this.drawer = false;
    },
    addscheck: function () {
      var TableData = this.$refs.multipleTable.selection;
      console.log(TableData);

      if (this.SBData.length == 0) {
        this.SBData = TableData;
      } else {
        for (let index = 0; index < TableData.length; index++) {
          const row = TableData[index];
          var rowif = true;
          for (let indexStr = 0; indexStr < this.SBData.length; indexStr++) {
            const element = this.SBData[indexStr];
            if (element.ID == row.ID) {
              rowif = false;
              element.Number += row.Number;
            }
          }
          if (rowif) {
            this.SBData.push(row);
          }
        }
      }
      this.drawer = false;
    },
    // ICMS.创建采购单
    AddPO: function () {
      var POGoodDtos = [];

      for (let index = 0; index < this.SBData.length; index++) {
        const element = this.SBData[index];
        POGoodDtos.push({
          ProductId: element.ID,
          Number: element.Number,
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
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
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
  .el-input,
  textarea {
    width: calc(100% - 71px);
  }
}
</style>