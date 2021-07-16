<template>
  <div class="box">
    <router-view @refresh="initdata(1)"></router-view>
    <div class="TopSerch">
      <el-input style="width:193px" size="mini" v-model="search" @change="initdata(1)" placeholder="请输入客户名称、设备描述"></el-input>
      <el-input style="width:193px" size="mini" v-model="workOrderCode" @change="initdata(1)" placeholder="请输入工单单号"></el-input>

      <el-select style="width:140px" v-model="Area" @change="initdata(1)" clearable size="mini" placeholder="请选择区域">
        <el-option v-for="item in this.$store.state.Vuex.Area" :key="item.Value" :label="item.Value" :value="item.Value"></el-option>
      </el-select>

      <el-select style="width:140px" v-model="StateStr" @change="initdata(1)" size="mini" placeholder="请选择状态">
        <el-option v-for="item in StateSTR" :key="item.Value" :label="item.label" :value="item.Value"></el-option>
      </el-select>

      <el-select style="width:140px" v-model="orderType" @change="initdata(1)" size="mini" placeholder="请选择类型">
        <el-option v-for="item in options" :key="item.Value" :label="item.Name" :value="item.value"></el-option>
      </el-select>

      <el-autocomplete class="inline-input" size="mini" @input="initdata(1)" v-model="Brand" style="width: 200px" :show-overflow-tooltip="true" :fetch-suggestions="querySearch" placeholder="请选择品牌" clearable>
      </el-autocomplete>

      <!-- <el-button type="success" style="float:right" size="mini" @click="IWantBX">我要报修</el-button> -->
      <el-button type="primary" style="float:right;margin:0 30px" size="mini" @click="initdata(1)">检索</el-button>

    </div>

    <el-table :data="data" :height="this.$store.state.TableOptimumHeight" size="mini" highlight-current-row border style="width: 100%" :header-cell-style="{background:'#e1e1e1'}">

      <el-table-column prop="WorkOrderCode" label="工单单号" width="140"></el-table-column>
      <el-table-column prop="CustomerName" label="客户名称" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="Area" label="区域" width="100"></el-table-column>
      <el-table-column prop="Brand" label="品牌" width="200"></el-table-column>
      <el-table-column prop="RepairName" label="报修人" width="100"></el-table-column>
      <el-table-column prop="RepairDate" label="报修日期" width="100"></el-table-column>
      <el-table-column prop="AcceptanceDate" label="受理日期" width="100"></el-table-column>
      <el-table-column prop="FinishedWorkDate" label="完成日期" width="100"></el-table-column>
      <el-table-column prop="OrderTypeStr" label="工单类型" width="120"></el-table-column>
      <el-table-column prop="StatusStr" label="工单状态" width="100"></el-table-column>

      <el-table-column fixed="right" label="操作" width="80">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="Edit(scope.row)">处理</el-button>
        </template>
      </el-table-column>
    </el-table>

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
      options: [
        { Name: "全部", ID: 0, value: -1 },
        { Name: "现场维修", ID: 0, value: 0 },
        { Name: "小件维修", ID: 0, value: 1 },
        { Name: "MUL&DBL维修", ID: 0, value: 4 },
      ], //类型
      StateStr: -1,
      StateSTR: [
        { label: "全部", Value: -1 },
        { label: "申请中", Value: 1 },
        { label: "已受理", Value: 2 },
        { label: "在保状态确认", Value: 3 },
        { label: "已预报价", Value: 4 },
        { label: "预报价已确认", Value: 5 },
        { label: "已指派", Value: 6 },
        { label: "已接受任务", Value: 7 },
        { label: "已出发", Value: 8 },
        { label: "已到达", Value: 9 },
        { label: "工作已完成", Value: 10 },
        { label: "已报最终价", Value: 11 },
        { label: "已结单", Value: 12 },
        { label: "已撤单", Value: 13 },
        { label: "其它", Value: 14 },
      ],
      pageNum: 1,
      pagesize: 10,
      search: "",
      workOrderCode: "",
      Area: "",
      Brand: "",
      // 工单单号
      orderType: -1,
      total: 0,
      data: [],
      Optios: [],
    };
  },
  created() {
    this.initdata();
    this.Manufacturer();
  },
  components: {},
  methods: {
    // 键入 筛序客户
    querySearch(queryString, cb) {
      if (queryString == undefined) {
        queryString = "";
        cb(this.Optios);
        return false;
      }
      if (queryString == "") {
        cb(this.Optios);
        return false;
      }

      var Search = queryString;
      var Data2 = this.Optios;
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
    //  获取品牌
    Manufacturer: function () {
      var obj = {
        url: this.$store.state.http + "System/GetBrand",
        api: "get",
      };
      this.$https(obj).then((res) => {
        this.Optios = res.Data;
        for (let index = 0; index < this.Optios.length; index++) {
          this.Optios[index]["value"] = this.Optios[index].Value;
        }
        console.log(this.Optios);
      });
    },
    initdata: function (er) {
      if (er == 1) {
        this.pageNum = 1;
      }
      var obj = {
        url: this.$store.state.http + "WO/GetWOs",
        api: "get",
        data: {
          state: -1, //状态
          search: this.search, //检索项：客户名称、设备描述
          workOrderCode: this.workOrderCode, //工单单号
          orderType: this.orderType, //工单类型
          Area: this.Area, //区域
          Brand: this.Brand, //品牌
          state: this.StateStr,
          pageNum: this.pageNum,
          numPerPage: this.pagesize,
          orderField: "",
          orderDirection: "",
        },
      };
      this.$https(obj).then((res) => {
        console.log(res.Data.Dtos);
        this.total = res.Data.DataBars;
        this.data = res.Data.Dtos;
        for (let index = 0; index < this.data.length; index++) {
          const element = this.data[index];
          element.RepairDate = element.RepairDate.split("T")[0];
          if (element.AcceptanceDate) {
            element.AcceptanceDate = element.AcceptanceDate.split("T")[0];
          }
          if (element.FinishedWorkDate) {
            element.FinishedWorkDate = element.FinishedWorkDate.split("T")[0];
          }
        }
      });
    },
    // 底部分页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.initdata();
    },
    // 切换 每页条数时触发  刷新
    handleSizeChange(val) {
      this.pagesize = val;
      this.initdata();
    },

    Edit: function (row) {
      console.log(row);
      this.$store.state.Vuex.Id = row.WorkOrderId;
      // 现场维修
      if (row.OrderTypeStr == "现场维修") {
        this.$router.push({
          path: "/OnSiteMaintenance",
        });
      }
      if (row.OrderTypeStr == "小件维修") {
        this.$router.push({
          path: "/MinorMaintenance",
        });
      }
      if (row.OrderTypeStr == "MUL&DEU维修") {
        this.$router.push({
          path: "/DBLMaintenance",
        });
      }
    },
  },
};
</script>


<style lang="scss" scoped>
@import url("../../../assets/scss/Tool_database.scss");
</style>

