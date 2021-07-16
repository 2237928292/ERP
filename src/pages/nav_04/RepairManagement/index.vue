<template>
  <div class="box">
    <router-view></router-view>
    <div class="TopSerch">
      <el-input style="width:210px" size="mini" v-model="search" @change="initdata(1)" placeholder="请输入客户名称、设备描述、单号"></el-input>
      <el-select style="width:140px" v-model="state" @change="initdata(1)" size="mini" placeholder="请选择状态">
        <el-option v-for="item in options" :key="item.value" :label="item.Name" :value="item.value"></el-option>
      </el-select>

      <el-select style="width:140px" v-model="Area" @change="initdata(1)" clearable size="mini" placeholder="请选择区域">
        <el-option v-for="item in this.$store.state.Vuex.Area" :key="item.Value" :label="item.Value" :value="item.Value"></el-option>
      </el-select>

      <el-select size="mini" style="width:140px" @change="initdata(1)" v-model="cusType" clearable placeholder="请选择客户类型">
        <el-option v-for="item in this.$store.state.Vuex.CustomerTypes" :key="item + '2'" :label="item" :value="item"></el-option>
      </el-select>

      <el-autocomplete class="inline-input" size="mini" @input="initdata(1)" v-model="Brand" style="width: 200px" :show-overflow-tooltip="true" :fetch-suggestions="querySearch" placeholder="请选择品牌" clearable>
      </el-autocomplete>

      <el-button type="success" style="float:right" size="mini" @click="IWantBX">我要报修</el-button>
      <el-button type="primary" style="float:right;margin:0 30px" size="mini" @click="initdata()">检索</el-button>

    </div>

    <el-table :data="data" :height="this.$store.state.TableOptimumHeight" size="mini" highlight-current-row border style="width: 100%" :header-cell-style="{background:'#e1e1e1'}">

      <el-table-column prop="RepairCode" label="报修单号" width="200"></el-table-column>
      <el-table-column prop="CusName" label="客户名称" width="230"></el-table-column>
      <el-table-column prop="ProductCode" label="设备型号" width="150"></el-table-column>
      <el-table-column prop="Desc" label="设备描述" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="CreateDate" label="创建日期" width="100"></el-table-column>
      <el-table-column prop="AcceptanceDate" label="受理时间" width="100"></el-table-column>
      <el-table-column prop="StatusStr" label="状态" width="120"></el-table-column>

      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="Edit(scope.row)">处理</el-button>
          <el-button v-if="scope.row.Status == 12 || scope.row.Status == 38 || scope.row.Status == 21" type="primary" size="mini" @click="Statement(scope.row)">取消结单</el-button>
          <el-button v-if="
          scope.row.IsOverRequest &&  !(scope.row.Status == 12 || scope.row.Status == 38 || scope.row.Status == 21)
          " type="primary" size="mini" @click="Statement(scope.row)">结单</el-button>
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
        { Name: "全部", ID: 0, value: 0 },
        { Name: "申请中", ID: 0, value: 1 },
        { Name: "已受理", ID: 0, value: 2 },
        { Name: "已结单", ID: 0, value: 3 },
        { Name: "已撤单", ID: 0, value: 4 },
      ], //状态选择
      pageNum: 1,
      pagesize: 10,
      search: "",
      state: 0,
      total: 0,
      Area: "",
      data: [],
      Brand: "",
      cusType: "",
    };
  },
  created() {
    this.initdata();
    this.Manufacturer();
  },
  components: {},
  methods: {
    initdata: function (md) {
      if (md == 1) {
        this.pageNum = 1;
      }
      var obj = {
        url: this.$store.state.http + "WO/GetRepareMinis",
        api: "get",
        data: {
          search: this.search,
          state: this.state,
          Area: this.Area,
          Brand: this.Brand,
          cusType: this.cusType,
          pageNum: this.pageNum,
          numPerPage: this.pagesize,
          orderField: "",
          orderDirection: "",
        },
      };
      this.$https(obj).then((res) => {
        console.log(res.Data.Dtos);
        this.data = res.Data.Dtos;
        for (let index = 0; index < this.data.length; index++) {
          const element = this.data[index];
          console.log(element);
          element.CreateDate = element.CreateDate.split("T")[0];
          if (element.AcceptanceDate) {
            element.AcceptanceDate = element.AcceptanceDate.split("T")[0];
          }
        }
        this.total = res.Data.DataBars;
      });
    },
    Statement: function (er) {
      if (
        er.IsOverRequest &&
        !(er.Status == 12 || er.Status == 38 || er.Status == 21)
      ) {
        var WO = "WO/FinishRequest";
      } else {
        var WO = "WO/CancelFinishRequest";
      }

      var obj = {
        api: "post",
        url: this.$store.state.http + WO,
        data: {
          Id: er.RepairId,
        },
      };
      this.$https(obj).then((res) => {
        this.$look("success", "成功！", "操作成功！");
        this.initdata();
      });
    },
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
    // 跳转到我要报修页面
    IWantBX: function () {
      this.$router.push({
        path: "/IWantRepair",
      });
    },
    Edit: function (row) {
      this.$store.state.Vuex.Id = row.RepairId;
      this.$router.push({
        path: "/RepairDetails",
      });
    },
  },
};
</script>


<style lang="scss" scoped>
@import url("../../../assets/scss/Tool_database.scss");
</style>

