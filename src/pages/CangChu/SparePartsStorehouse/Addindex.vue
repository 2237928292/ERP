<template>
  <div class='box_s'>

    <div class="segmentation">
      设备信息
    </div>

    <div class="itemmsgxx_document">
      <p><span>产品编号:</span>{{AddSpareParts.ProductCode}}</p>
    </div>

    <div class="itemmsgxx_document">
      <p><span>品牌:</span>{{AddSpareParts.Brand}}</p>
    </div>

    <div class="itemmsgxx_document">
      <p><span>当前状态:</span>{{AddSpareParts.StateStr}}</p>
    </div>

    <div class="itemmsgxx_document">
      <p><span>库位:</span>{{AddSpareParts.Position}}</p>
    </div>

    <div class="itemmsgxx_document">
      <p><span>创建日期:</span>{{AddSpareParts.CreateDate}}</p>
    </div>

    <div class="itemmsgxx_document">
      <p><span>正在使用的客户:</span>{{AddSpareParts.CusFullName}}</p>
    </div>

    <div class="itemmsgxx_document">
      <p><span>隶属:</span>{{AddSpareParts.Belong}}</p>
    </div>

    <div class="segmentation">
      申请信息

    </div>

    <div class='Ul'>

      <div class="select">
        <el-autocomplete class="inline-input" size="mini" style="width:350px" v-model="FullName" :show-overflow-tooltip="true" :fetch-suggestions="querySearch" placeholder="请选择客户" @select="handleSelect" clearable>
          <template slot="prepend">选择客户</template>
        </el-autocomplete>
      </div>

      <div class="textNB">
        <div class="textBZ" style="float:left">申请类型</div>
        <el-radio-group v-model="ApprovalType" style="marginTop:20px;marginLeft:20px">
          <el-radio label="整机申请"></el-radio>
          <el-radio label="零配件申请"></el-radio>
        </el-radio-group>
      </div>

      <div class="textNB">
        <div class="textBZ" style="width:160px">审批结果的原因/发起原因</div>
        <el-input type="textarea" style="float:left;width:500px" :autosize="{ minRows: 2, maxRows: 4}" placeholder="审批结果的原因/发起原因" v-model="Reason">
        </el-input>
      </div>

      <div class="textNB" v-if="ApprovalType == '零配件申请' ">
        <div class="textBZ" style="cursor:pointer;" @click="select(),drawer = true">点击选择设备</div>
        <p style="line-height:40px;" v-if="ZBData.length == 0">未选择设备</p>

        <el-table v-if="ZBData.length != 0" :data='ZBData' style="width: 100%">
          <el-table-column prop="ProductCode" label="产品编号" width="170"></el-table-column>
          <el-table-column prop="BarcodeMemo" label="内部编码" width="140"></el-table-column>
          <el-table-column prop="Manufacturer" label="品牌" width="120"></el-table-column>
          <el-table-column prop="Characteristics" label="产品描述" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="Unit" label="单位" width="120"></el-table-column>
          <el-table-column prop="UpdateDate" label="更新时间" width="120"></el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click='Del(scope.row)'><i class="el-icon-delete"></i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>

      <div>
        <el-button size="mini" type="primary" @click="ApplicationLoan()" style="float: right;marginRight:30px">申请借用</el-button>
      </div>
    </div>

    <!-- 弹窗 -->

    <el-drawer :visible.sync="drawer" direction="ltr" :modal="false" style="width: 200%" title="添加设备" :before-close="handleClose">

      <div class="top_init_data" style="marginbottom: 10px">
        <!-- 检索内容 -->
        <el-input style="width: 193px" size="mini" v-model="productCode" @change="select()" placeholder="请输入产品编码"></el-input>
        <!-- 产品编码 -->
        <el-input style="width: 193px" size="mini" v-model="barcodeMemo" @change="select()" placeholder="请输入内部编码"></el-input>
        <!-- 内部编码 -->
        <el-input style="width: 193px" size="mini" v-model="desc" @change="select()" placeholder="请输入产品描述"></el-input>
        <!-- 描述 -->
        <el-input style="width: 193px" size="mini" v-model="memo" @change="select()" placeholder="请输入产品备注"></el-input>
        <!-- 备注 -->
        <el-autocomplete class="inline-input" size="mini" v-model="man" style="width: 200px" @change="select()" :show-overflow-tooltip="true" :fetch-suggestions="querySearchPP" placeholder="请选择品牌"
          @select="handleSelectpp" clearable>
        </el-autocomplete>

        <el-button size="mini" type="primary" @click="select()" style="float: right">检索</el-button>
        <!-- 选择品牌 -->
      </div>

      <!-- 表格 -->
      <el-table :data="Data" size="mini" :height="this.$store.state.TableOptimumHeight" border style="marginbottom: 10px" ref="multipleTable" :header-cell-style="{ background: '#e1e1e1' }">
        <el-table-column prop="ProductCode" label="产品编号" width="170"></el-table-column>
        <el-table-column prop="BarcodeMemo" label="内部编码" width="140"></el-table-column>
        <el-table-column prop="SN" label="序列号" width="130"></el-table-column>
        <el-table-column prop="Manufacturer" label="品牌" width="120"></el-table-column>
        <el-table-column prop="Characteristics" label="产品描述" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column fixed="right" style="float: left" type="selection" width="55"></el-table-column>
        <el-table-column fixed="right" label="操作" width="80">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="adds(scope.row)">添加</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-button type="primary" size="mini" style="float: right" @click="addscheck()">添加选择</el-button>
      <!-- 分页 -->
      <nav style="text-align: center">
        <el-pagination class="pagition-li" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="this.$store.state.Vuex.pageSNumber" :page-size="pagesize"
          layout=" total , sizes, prev, pager, next, jumper " :total="total"></el-pagination>
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
      ZBData: [],
      FullName: "",
      CustomerId: "",
      ApprovalType: "整机申请",
      Reason: "",
      X: {},
      drawer: false,

      productDesc: "",

      search: "",
      Data: [], //表格数据
      pageNum: 1, //
      pagesize: 10, //每页显示条数
      total: 0, //总条目数
      productCode: "",
      //   产品编码
      barcodeMemo: "",
      //   内部编码
      man: "",
      //   品牌
      desc: "",
      //   产品描述
      memo: "",
      //   产品备注
      options: [],
      //  品牌选项
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    init: function () {
      this.AddSpareParts = this.$store.state.Vuex.AddSpareParts;
      console.log(this.$store.state.Vuex.AddSpareParts);
    },
    //  获取品牌
    Manufacturer: function () {
      var obj = {
        url: this.$store.state.http + "System/GetBrand",
        api: "get",
      };
      this.$https(obj).then((res) => {
        this.options = res.Data;
        for (let index = 0; index < this.options.length; index++) {
          this.options[index]["value"] = this.options[index].Value;
        }
        console.log(this.options);
      });
    },

    // 键入
    querySearchPP(queryString, cb) {
      if (queryString == undefined) {
        queryString = "";
        cb(this.options);
        return false;
      }
      if (queryString == "") {
        cb(this.options);
        return false;
      }

      var Search = queryString;
      var Data2 = this.options;
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
    // 筛选客户
    querySearch(queryString, cb) {
      console.log(queryString);
      if (queryString == undefined) {
        queryString = "";
        return false;
      }
      if (queryString == "") {
        queryString = "北京";
      }
      var obj = {
        data: {
          search: queryString,
        },
        api: "get",
        url: this.$store.state.http + "CRM/GetCustomerMini",
        header: this.$store.state.token,
      };
      this.$https(obj).then((res) => {
        console.log(res.Data.Dtos);
        var asd = [];
        if (res.Data.Dtos.length == 0) {
          cb([]);
          return false;
        }
        for (var i = 0; i < res.Data.Dtos.length; i++) {
          res.Data.Dtos[i]["value"] = res.Data.Dtos[i].FullName;
        }
        cb(res.Data.Dtos);
      });
    },
    // 点击客户
    handleSelect(item) {
      console.log(item);
      this.CustomerId = item.CusId;
    },
    // 点击品牌
    handleSelectpp(item) {
      console.log(item);
      this.man = item.value;
    },
    // 底部分页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.select();
    },
    eacrh: function (row) {},
    // select
    select: function (i) {
      if (i != undefined || i != null) {
        this.pageNum = 1;
      }
      var obj = {
        api: "get",
        url: this.$store.state.http + "Product/GetProducts2",
        data: {
          pageNum: this.pageNum,
          numPerPage: this.pagesize,
          orderField: "",
          orderDirection: "",
          proType: "1",
          /// 产品类型 1：零配件 2：整机 3：耗材 4：通用
          // kitflag: true,
          //   规定参数：bool kitflag   true零配件   false整机
          productCode: this.productCode,
          //   产品编码
          barcodeMemo: this.barcodeMemo,
          //   内部编码
          man: this.man,
          //   品牌
          desc: this.desc,
          //   产品描述
          memo: this.memo,
          //   产品备注
        },
      };
      this.$https(obj).then((res) => {
        console.log();
        this.Data = res.Data.Dtos;

        this.total = res.Data.DataBars;
        this.gridData = res.Data.Dtos;
        for (let index = 0; index < this.gridData.length; index++) {
          this.gridData[index].UpdateDate =
            this.gridData[index].UpdateDate.split("T")[0];
        }
        console.log(this.gridData);
      });
    },

    //   关闭窗口
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },

    //输入第几页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.select();
    },
    // 切换 每页条数时触发  刷新
    handleSizeChange(val) {
      this.pagesize = val;
      this.select(1);
    },
    // 选择添加
    addscheck: function () {
      var List = this.$refs.multipleTable.selection;
      for (let index = 0; index < List.length; index++) {
        const element = List[index];
        this.adds(element);
      }
    },
    // 单个添加
    adds: function (res) {
      console.log(res);
      for (let index = 0; index < this.ZBData.length; index++) {
        if (res.ID == this.ZBData[index].ID) {
          this.$look("succus", "您已添加过此零件！");
          return false;
        }
      }
      this.ZBData.push(res);
    },
    // 删除
    Del: function (row) {
      console.log(row);
      for (let index = 0; index < this.ZBData.length; index++) {
        if (row.ID == this.ZBData[index].ID) {
          this.ZBData.splice(index, 1);
        }
      }
    },
    ApplicationLoan: function () {
      if (this.CustomerId == "") {
        this.$look("warning", "请选择客户！");
        return false;
      }

      var Type = this.ApprovalType == "整机申请" ? 1 : 2;
      var Data = [];
      console.log(this.CustomerId);
      console.log(Type);
      console.log(this.Reason);
      if (Type == 2) {
        for (let index = 0; index < this.ZBData.length; index++) {
          Data.push({
            proid: this.ZBData[index].ID,
          });
        }
        if (Data.length == 0) {
          this.$look("warning", "请选择零配件");
          return false;
        }
      }
      console.log(Data);

      var obj = {
        api: "post",
        url: this.$store.state.http + "StorageRoom/CreateStandbyApproval",
        data: {
          StandbyId: this.AddSpareParts.Id,
          CusId: this.CustomerId,
          Reason: this.Reason,
          ApprovalType: Type,
          SADetailDtos: Data,
        },
      };
      this.$https(obj).then((res) => {
        this.$emit("refresh"), this.$router.push({ path: "/ApplicatioPparts" });
        this.$msgs(0, "添加成功！");
      });
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.init();
    this.select();
    this.Manufacturer();
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
.Ul {
  width: 100%;
  padding-left: 20px;
  float: left;
  box-sizing: border-box;
  margin-top: 30px;
}

.textNB {
  width: 100%;
  float: left;
  .one {
    width: 500px;
    margin: 5px;
    .Tit {
      margin: -16px -20px;
      padding: 5px 20px;
      line-height: 20px;
      font-size: 13px;
      span {
        font-weight: bold;
      }
    }
  }
  .textBZ {
    width: 89px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    margin-top: 15px;
    background-color: #f5f7fa;
    color: #909399;
    // vertical-align: middle;
    // display: table-cell;
    // position: relative;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    // padding: 0 20px;
    // width: 1px;
    // white-space: nowrap;
    // font-weight: bold;
    font-size: 12px;
    // padding: 10px;
    // box-sizing: border-box;
  }
}
</style>