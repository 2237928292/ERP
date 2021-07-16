<template>
  <div class="box">
    <router-view></router-view>

    <div class="TopSerch">
      <el-input size="mini" style="width:180px" v-model="cusName" @change="init()" placeholder="请输入客户名称"></el-input>
      <el-input size="mini" style="width:180px" v-model="enginner" @change="init()" placeholder="请输入评定人"></el-input>
      <el-select v-model="area" clearable size="mini" @change="init()" filterable placeholder="请选择区域">
        <el-option v-for="item in DtoThree" :key="item.Value" :label="item.Value" :value="item.Value">
        </el-option>
      </el-select>
      <el-button type="success" size="mini" :loading='this.$store.state.Vuex.loading' style="float:right" @click="init()">检索</el-button>
    </div>

    <div class="table">
      <el-table size="mini" :data="Data" highlight-current-row :height="this.$store.state.TableOptimumHeight" border style="width: 100%" :header-cell-style="{background:'#e1e1e1'}">
        <el-table-column fixed prop="CusFullName" :show-overflow-tooltip="true" label="客户名称"></el-table-column>
        <el-table-column prop="EquModel" width="150" label="设备型号"></el-table-column>
        <el-table-column prop="EquSN" width="150" label="设备序列号"></el-table-column>
        <el-table-column prop="CusArea" width="100" label="区域"></el-table-column>
        <el-table-column prop="EquType" width="100" label="设备类型"></el-table-column>
        <el-table-column prop="Brand" width="100" label="品牌"></el-table-column>
        <el-table-column prop="Result" width="100" label="评定结果"></el-table-column>
        <el-table-column prop="Enginner" width="100" label="评定人"></el-table-column>
        <el-table-column fixed="right" width="100" label="Enable">
          <!-- 最后一格不给宽度，可自适应。给宽度后，屏宽过大会出现空白模块 -->
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="msglook(scope.row)">查看</el-button>
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
      pageNum: 1,
      pagesize: 10,
      total: 0,
      cusName: "",
      enginner: "",
      area: "",
      DtoTwo: [
        { label: "全部", value: "-1" },
        { label: "已创建", value: "1" },
        { label: "正在完善", value: "2" },
        { label: "完成", value: "3" },
      ],
      DtoThree: [],
      Data: [],
    };
  },
  created() {
    this.DtoThrees();
    this.init();
  },
  components: {},
  methods: {
    //   初始化
    init: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "CRM/GetCusEquEvaluates",
        data: {
          pageNum: this.pageNum,
          numPerPage: this.pagesize,
          orderField: "",
          orderDirection: "",
          cusName: this.cusName,
          enginner: this.enginner,
          area: this.area,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.Data = res.Data.Dtos;
        for (let index = 0; index < this.Data.length; index++) {
          const element = this.Data[index];
          if (element.BeginTime) {
            element.BeginTime = element.BeginTime.split("T")[0];
          } else {
            element.BeginTime = " - - ";
          }
          if (element.EndTime) {
            element.EndTime = element.EndTime.split("T")[0];
          } else {
            element.EndTime = " - - ";
          }
        }
        this.total = res.Data.DataBars;
      });
    },
    //   获取检索项
    DtoThrees: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "System/GetArea",
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);
        this.DtoThree = res.Data;
      });
    },
    // 切换 每页条数时触发  刷新
    handleSizeChange(val) {
      this.pagesize = val;
      this.init();
    },
    //输入第几页
    handleCurrentChange(val) {
      console.log(val);
      this.pageNum = val;
      this.init();
    },
    // 跳转查看详细页
    msglook: function (res) {
      console.log(res);
      this.$store.state.Vuex.lookEQUindex = res.Id;
      this.$router.push({ path: "/EquipmentEvaluationDetails" });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
