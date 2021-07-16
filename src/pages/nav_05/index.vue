<template>
  <div class="box">
    <router-view @refresh="init"></router-view>
    <div class="TopSerch" style="padding:5px;">
      <el-input style="width:193px" size="mini" v-model="search" @change="init(1)" placeholder="请输入客户、单号、报价单号"></el-input>
      <el-input style="width:193px" size="mini" v-model="enginner" @change="init(1)" placeholder="请输入工程师"></el-input>
      <el-select size="mini" style="width:150px" @change="init(1)" v-model="state" placeholder="请选择状态" clearable>
        <el-option v-for="item in options" :key="item.index" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-select size="mini" style="width:120px" @change="init(1)" v-model="area" clearable placeholder="请选择区域">
        <el-option v-for="item in areaS" :key="item.Value" :label="item.Value" :value="item.Value"></el-option>
      </el-select>

      <el-select size="mini" style="width:140px" @change="init(1)" v-model="CustomerType" clearable placeholder="请选择客户类型">
        <el-option v-for="item in this.$store.state.Vuex.CustomerTypes" :key="item + '2'" :label="item" :value="item"></el-option>
      </el-select>

      <el-button type="primary" :loading='this.$store.state.Vuex.loading' size="mini" @click="init(1)">检索</el-button>
      <el-button type="success" style="float:right;" size="mini" @click="AddOrder()">创建</el-button>
    </div>

    <!--  -->
    <el-table :data="Data" size="mini" :height="this.$store.state.TableOptimumHeight" highlight-current-row border style="width: 100%" :header-cell-style="{background:'#e1e1e1'}">
      <el-table-column prop="CusName" label="客户名" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="Amount" label="总金额" width="90"></el-table-column>
      <el-table-column prop="DiscountAmount" label="优惠价格" width="90"></el-table-column>
      <el-table-column prop="LogisticCharge" label="物流费" width="70"></el-table-column>
      <el-table-column prop="StateStr" label="状态" width="90"></el-table-column>
      <el-table-column prop="PayStatusStr" label="付款" width="90"></el-table-column>
      <el-table-column prop="CreateDateStr" label="创建日期" width="90"></el-table-column>
      <el-table-column prop="Area" label="区域" width="100"></el-table-column>
      <el-table-column prop="SOCode" label="订单编号" width="200"></el-table-column>
      <el-table-column prop="BelongEnginners" label="隶属工程师" :show-overflow-tooltip="true" width="100"></el-table-column>
      <el-table-column fixed='right' label="操作" width="130">
        <template slot-scope="scope">
          <el-button @click="routes(scope.row)" size="mini" type="primary" icon="el-icon-edit"></el-button>
          <el-button @click="userGCS(scope.row)" size="mini" type="primary" icon="el-icon-user"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <nav style="text-align: center">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="this.$store.state.Vuex.pageSNumber" :page-size="100"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </nav>
    <!--  -->
    <el-dialog title="修改隶属工程师" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-select v-model="value" filterable remote reserve-keyword placeholder="请输入关键词" @focus='focuss' @blur='blurs' :loading="loading" size="mini" style="width:80%" multiple :automatic-dropdown='true'>
        <el-option v-for="item in optionss" :key="item.UserName" :label="item.names" :value="item.UserName"></el-option>
      </el-select>

      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisibleTrueQK" type="danger">清空工程师</el-button>
        <el-button size="mini" @click="dialogFormVisibles">取 消</el-button>
        <el-button size="mini" @click="dialogFormVisibleTrue" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      pageNum: 1,
      pagesize: 10,
      search: "", // 检索项
      enginner: "", //工程师检索项
      area: "", //区域检索项
      state: "", //状态检索项
      areaS: [], //区域数据
      CustomerType: "",
      options: [
        { label: "临时创建", value: "0", index: 2 },
        { label: "已编辑", value: 1, index: 3 },
        { label: "已报价", value: 2, index: 4 },
        { label: "已确认", value: 3, index: 5 },
        { label: "已付款", value: 8, index: 10 },
        { label: "已发货", value: 4, index: 6 },
        { label: "已收货", value: 5, index: 7 },
        { label: "已结单", value: 6, index: 8 },
        { label: "已撤单", value: 7, index: 9 },
      ], // 状态数据
      total: 0, //总条数
      Data: [],
      optionss: [], // 获取到的gcs集合
      loading: false,
      value: "",

      dialogFormVisible: false,
      SOId: "",

      ddd: 0,
    };
  },
  created() {
    this.init();
    this.initGetArea();
  },
  components: {},
  methods: {
    focuss: function () {
      console.log(this.ddd);
      if (this.ddd == 0) {
        this.remoteMethod();
        this.ddd = 1;
      }
    },
    blurs: function () {
      this.ddd = 0;
    },
    remoteMethod(val) {
      console.log(val);
      if (val == "") {
        val = "x";
      }
      this.loading = true;
      var obj = {
        api: "get",
        url: this.$store.state.http + "System/GetEmployeeMini",
        data: {
          type: "2",
          search: val,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.optionss = res.Data;
        for (let index = 0; index < this.optionss.length; index++) {
          const element = this.optionss[index];
          element["names"] = element.Name + " - " + element.UserName;
        }
        this.loading = false;
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
          this.value = "";
        })
        .catch((_) => {});
    },
    // 清空gcs
    dialogFormVisibleTrueQK: function () {
      var obj = {
        api: "post",
        url: this.$store.state.http + "SO/SelectEnginnerToSo",
        data: {
          SOId: this.SOId,
          SubEnginnerGroup: "",
        },
      };
      this.$https(obj).then((res) => {
        this.dialogFormVisible = false;
        this.value = "";
        this.init();
      });
    },
    dialogFormVisibleTrue: function () {
      console.log(this.value);
      if (this.value.length == 0) {
        this.$look("warning", "未选择隶属工程师！");
        return false;
      }
      var GCSli = "";
      for (let index = 0; index < this.value.length; index++) {
        console.log(this.value[index]);
        if (GCSli == "") {
          GCSli = this.value[index];
        } else {
          GCSli += "," + this.value[index];
        }
      }
      console.log(GCSli);
      var obj = {
        api: "post",
        url: this.$store.state.http + "SO/SelectEnginnerToSo",
        data: {
          SOId: this.SOId,
          SubEnginnerGroup: GCSli,
        },
      };
      this.$https(obj).then((res) => {
        this.dialogFormVisible = false;
        this.value = "";
        this.init();
      });
    },
    dialogFormVisibles: function () {
      this.dialogFormVisible = false;
      this.value = "";
    },
    // userGCS 修改隶属工程师
    userGCS: function (res) {
      console.log(res.SOId);
      this.SOId = res.SOId;
      this.dialogFormVisible = true;
    },
    // 跳转
    routes: function (res) {
      console.log(res);
      this.$store.state.Vuex.SOId = res.SOId;
      this.$router.push({ path: "/EditOrder" });
    },
    // 初始
    init: function (res) {
      if (res == 1) {
        this.pageNum = 1;
      }
      var States = this.state;
      States == "" ? (States = -1) : (States = States);
      var obj = {
        api: "get",
        url: this.$store.state.http + "SO/GetSOForPCs",
        data: {
          pageNum: this.pageNum,
          numPerPage: this.pagesize,
          orderField: "",
          orderDirection: "",
          search: this.search,
          enginner: this.enginner,
          area: this.area,
          state: States,
          cusType: this.CustomerType,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.total = res.Data.DataBars;
        this.Data = res.Data.Dtos;
        this.Data.forEach((element) => {
          element.CreateDateStr = element.CreateDateStr.split(" ")[0];
        });
      });
    },
    // 获取区域
    initGetArea: function () {
      var obj = {
        url: this.$store.state.http + "System/GetArea",
        api: "get",
      };
      this.$https(obj).then((res) => {
        this.areaS = res.Data;
      });
    },
    //输入第几页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.init();
    },
    // 切换 每页条数时触发  刷新
    handleSizeChange(val) {
      this.pagesize = val;
      this.init(1);
    },
    AddOrder: function () {
      this.$router.push({
        path: "/AddOrder",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("../../assets/scss/Tool_database.scss");
</style>
