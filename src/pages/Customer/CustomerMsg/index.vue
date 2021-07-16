<template>
  <div class="box">
    <router-view @refresh="init"></router-view>
    <div class="TopSerch">

      <!-- 检索 -->
      <el-input style="width:193px" clearable size="mini" v-model="search" placeholder="客户全称、客户简称"></el-input>

      <!-- 客户等级 -->
      <el-select size="mini" style="width:150px" clearable @change="init(1)" v-model="grade" placeholder="请选择客户特征">
        <el-option v-for="(itemGrade,indexGrade) in options" :key="indexGrade" :label="itemGrade.label" :value="itemGrade.value"></el-option>
      </el-select>

      <!-- 区域 -->
      <el-select size="mini" style="width:150px" clearable @change="init(1)" v-model="area" placeholder="请选择区域">
        <el-option v-for="(itemArea,indexArea) in Region" :key="indexArea" :label="itemArea.Value" :value="itemArea.Value"></el-option>
      </el-select>

      <!-- 客户类型 -->
      <el-select size="mini" style="width:140px" @change="init(1)" v-model="type" clearable placeholder="请选择客户类型">
        <el-option v-for="(itemType,indexType) in Typeofcustomer" :key="indexType" :label="itemType.label" :value="itemType.label"></el-option>
      </el-select>

      <!-- 是否可用 -->
      <el-select size="mini" style="width:100px" @change="init(1)" v-model="enable" placeholder="是否可用">
        <el-option v-for="(item,index) in Isitavailable" :key="index" :label="item.label" :value="item.value"></el-option>
      </el-select>

      <el-button type="primary" :loading='this.$store.state.Vuex.loading' size="mini" @click="init(1)">检索</el-button>
      <el-button type="success" style="float:right" size="mini" @click="Newcustomers()">新增客户</el-button>
    </div>

    <!--  -->
    <div class="content">
      <el-table :data="data" size="mini" :height="this.$store.state.TableOptimumHeight" highlight-current-row border style="width: 100%" :header-cell-style="{background:'#e1e1e1'}">
        <el-table-column fixed prop="FullName" label="客户全名" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="ShortName" width="120" label="客户简称"></el-table-column>
        <el-table-column prop="Type" width="120" label="客户类型"></el-table-column>
        <el-table-column prop="ServiceRegional" label="隶属区域" width="120"></el-table-column>
        <el-table-column prop="Characteristics" label="客户特征" width="140"></el-table-column>
        <el-table-column fixed="right" label="禁用/启用" width="100">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.DeleteFlag" @change="Switch(scope.row)" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="Operation(scope.row,1)">编辑</el-button>
            <!-- <el-button type="warning" size="mini" @click="Operation(scope.row,2)">查看</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <nav style="text-align: center">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="this.$store.state.Vuex.pageSNumber" :page-size="100"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </nav>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      // 客户等级
      options: [
        { label: "普通", value: "普通" },
        { label: "VIP", value: "VIP" },
        { label: "钣喷", value: "钣喷" },
        { label: "VIP与钣喷", value: "VIP与钣喷" },
      ],

      // 是否可用
      Isitavailable: [
        { label: "可用", value: true },
        { label: "不可用", value: false },
      ],

      //   客户类型
      Typeofcustomer: [
        { label: "宝马" },
        { label: "保时捷" },
        { label: "奥迪" },
        { label: "奔驰" },
        { label: "劳斯莱斯" },
        { label: "路虎" },
        { label: "自由市场" },
        { label: "其他" },
      ],
      //   区域
      Region: [],

      //  分页
      pageNum: 1,
      pagesize: 10,
      search: "",
      grade: "",
      area: "",
      type: "",
      enable: true,
      //
      data: [],
      total: 0,
    };
  },
  created() {
    this.initGetArea();
    this.init();
  },
  components: {},
  methods: {
    init: function (xff) {
      xff == 1 ? (this.pageNum = 1) : "";
      var obj = {
        api: "get",
        url: this.$store.state.http + "CRM/GetCustomers",
        data: {
          pageNum: this.pageNum,
          numPerPage: this.pagesize,
          orderField: "",
          orderDirection: "",
          search: this.search, // 客户全称、客户简称
          grade: this.grade, // 客户等级：下拉框：普通、VIP、钣喷
          area: this.area, // 区域
          type: this.type, // 客户类型：宝马、保时捷、...
          enable: this.enable, // 是否可用 默认传true
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.data = res.Data.Dtos;
        this.total = res.Data.DataBars;
        // 置反
        for (let index = 0; index < this.data.length; index++) {
          const element = this.data[index];
          element.DeleteFlag = !element.DeleteFlag;
        }
      });
    },

    // 获取区域
    initGetArea: function () {
      var obj = {
        url: this.$store.state.http + "System/GetArea",
        api: "get",
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);
        this.Region = res.Data;
      });
    },

    // Operation
    Operation: function (xff1, xff2) {
      //编辑
      if (xff2 == 1) {
        this.$store.state.Vuex.Id = xff1.CusId;
        this.$router.push({ path: "/BJCustomerMsg" });
      }
    },

    //输入第几页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.init();
    },

    // 切换 每页条数时触发  刷新
    handleSizeChange(val) {
      this.pagesize = val;
      this.init();
    },

    // 跳转新增
    Newcustomers: function () {
      this.$router.push({ path: "/AddCustomerMsg" });
    },

    // 启动禁用客户
    Switch: function (xff) {
      console.log(xff.CusId);
      var obj = {
        api: "post",
        url: this.$store.state.http + "CRM/SetCustomer",
        data: {
          Id: xff.CusId,
        },
      };
      this.$https(obj).then((res) => {
        this.init();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("./../../../assets/scss/Tool_database.scss");
</style>
