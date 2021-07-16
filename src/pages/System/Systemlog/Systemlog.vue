<template>
  <div class="box">
    <!-- 头部检索 -->
    <div class="TopSerch">
      <!-- 检索内容 -->
      <el-input style="width:193px" size="mini" v-model="search" @change="init()" placeholder="请输入内容" clearable></el-input>
      <!-- 类型选择项 -->
      <el-select size="mini" style="width:120px" @change="init()" v-model="type" clearable placeholder="请选择类型">
        <el-option v-for="item in types" :key="item.index" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-button type="primary" size="mini" :loading='this.$store.state.Vuex.loading' @click="init()">检索</el-button>
    </div>

    <!-- 表格 -->
    <div class="content" style=" padding: 0px 25px;box-sizing: border;">
      <el-table :data="Data" size="mini" :height="this.$store.state.TableOptimumHeight" highlight-current-row border style="width: 100%" :header-cell-style="{background:'#e1e1e1'}">
        <el-table-column fixed prop="Name" label="姓名" width="150"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="Content" label="ID"></el-table-column>
        <el-table-column prop="CreateDate" label="创建时间" width="120"></el-table-column>
        <el-table-column prop="Type" label="类型" width="120"></el-table-column>
      </el-table>
    </div>

    <!--  -->
    <nav style="text-align: center">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="this.$store.state.Vuex.pageSNumber" :page-size="100"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pagesize: 10, //每页显示条数
      pageNum: 1, //当前页码
      type: "", //检索类型
      search: "", //检索内容
      total: 0,
      types: [
        { label: "MessagePush", value: "MessagePush", index: 1 },
        { label: "ReturnVisit", value: "ReturnVisit", index: 2 },
        { label: "DownloadDocument", value: "DownloadDocument", index: 3 },
        { label: "LoginToken", value: "LoginToken", index: 4 },
      ], //类型可选项
      Data: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "System/GetSystemLogs",
        data: {
          pageNum: this.pageNum,
          numPerPage: this.pagesize,
          orderField: "",
          orderDirection: "",
          search: this.search, //检索项
          type: this.type, //下拉框
        },
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);
        this.Data = res.Data.Dtos;
        this.total = res.Data.DataBars;
        for (var i = 0; i < this.Data.length; i++) {
          this.Data[i].CreateDate = this.Data[i].CreateDate.split("T")[0];
        }
      });
    },

    handleCurrentChange(val) {
      this.pageNum = val;
      this.init();
    },
    // 切换 每页条数时触发  刷新
    handleSizeChange(val) {
      this.pagesize = val;
      this.init();
    },
  },
};
</script>
<style scope lang="">
.top_init_data {
  width: 100%;
  height: 100px;
  padding: 23px;
  box-sizing: border-box;
}
.pagetion {
  width: 300px;
  height: 40px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
</style>