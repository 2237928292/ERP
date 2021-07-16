<template>
  <div class="box">
    <router-view @refresh="init"></router-view>
    <div class="TopSerch">
      <!-- 合同号、销售 -->
      <el-input style="width:193px" size="mini" v-model="search" @change="init(1)" placeholder="内容 合同号、任务单号"></el-input>
      <!-- 名称 -->
      <el-input style="width:193px" size="mini" v-model="cusFullName" @change="init(1)" placeholder="客户名称"></el-input>
      <!-- 状态 -->
      <el-select size="mini" style="width:150px" @change="init(1)" v-model="state" placeholder="请选择状态">
        <el-option v-for="item in options" :key="item.index" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <!-- 选择区域 -->
      <el-select size="mini" style="width:120px" @change="init(1)" v-model="area" clearable placeholder="请选择区域">
        <el-option v-for="item in areaS" :key="item.Value + '1' " :label="item.Value" :value="item.Value"></el-option>
      </el-select>

      <el-button type="primary" :loading='this.$store.state.Vuex.loading' size="mini" @click="init()">检索</el-button>
    </div>

    <div class="content">
      <el-table :data="Data" size="mini" :height="this.$store.state.TableOptimumHeight" highlight-current-row border style="width: 100%" :header-cell-style="{background:'#e1e1e1'}">
        <el-table-column prop="CusFullName" label="客户名称" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="ContractCode" label="合同号" width="180"></el-table-column>
        <el-table-column prop="OrderCode" label="任务单号" width="180"></el-table-column>
        <el-table-column prop="Area" label="区域" width="90"></el-table-column>
        <el-table-column prop="MSSOStateStr" label="状态" :show-overflow-tooltip="true" width="80"></el-table-column>
        <el-table-column fixed="right" label="操作" width="80">
          <template slot-scope="scope">
            <el-button @click="BJindex(scope.row)" size="mini" type="primary">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

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
      // 检索项
      search: "",
      cusFullName: "",
      area: "",
      state: -1,
      CustomerType: "",
      // 检索集合
      areaS: [],
      options: [
        { label: "全部", value: -1, index: 1 },
        { label: "等待耗材", value: 1, index: 2 },
        { label: "已发耗材", value: 2, index: 3 },
      ],
      pageNum: 1,
      pagesize: 10,
      total: 0,
      Data: [],
    };
  },
  created() {
    this.init();
    this.initGetArea();
    console.log(this.$router);
  },
  watch: {
    $route(to, from) {
      this.init(); //返回页面直接调取方法
    },
  },
  components: {},
  methods: {
    // 编辑
    BJindex: function (res) {
      console.log(res.Id);
      this.$store.state.Vuex.Delivery = res.Id;
      this.$router.push({
        path: "/Delivery",
      });
    },
    //   初始化
    init: function (i) {
      if (i != undefined || i != null) {
        this.pageNum = 1;
      }
      var obj = {
        api: "get",
        url: this.$store.state.http + "Maintain/GetMSSOs",
        data: {
          pageNum: this.pageNum,
          numPerPage: this.pagesize,
          orderField: "",
          orderDirection: "",
          search: this.search,
          state: this.state, // 状态
          cusFullName: this.cusFullName, // 客户名称
          area: this.area, // 区域
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.Data = res.Data.Dtos;
        this.total = res.Data.DataBars;
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
  },
};
</script>
