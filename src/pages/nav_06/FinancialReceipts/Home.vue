<template>
  <div class="box">
    <router-view @refresh="init"></router-view>
    <div class="TopSerch">
      <!-- 合同号、销售 -->
      <el-input style="width:193px" size="mini" v-model="search" @change="init(1)" placeholder="客户名称、合同号"></el-input>
      <!-- 状态 -->
      <el-select size="mini" style="width:150px" @change="init(1)" v-model="state" placeholder="请选择状态">
        <el-option v-for="item in options" :key="item.index" :label="item.label" :value="item.value"></el-option>
      </el-select>

      <el-button type="primary" :loading='this.$store.state.Vuex.loading' size="mini" @click="init()">检索</el-button>
    </div>

    <el-table :data="Data" size="mini" :height="this.$store.state.TableOptimumHeight" highlight-current-row border style="width: 100%" :header-cell-style="{background:'#e1e1e1'}">
      <el-table-column prop="CusName" label="客户名称" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="MaintainCode" label="合同号" width="180"></el-table-column>
      <el-table-column prop="Amount" label="付款金额" width="100"></el-table-column>

      <el-table-column prop="StateStr" label="当前状态" width="100"></el-table-column>

      <el-table-column prop="CreateDate" label="创建时间" width="100"></el-table-column>

      <el-table-column prop="Confirmer" label="财务确认人" width="100"></el-table-column>

      <el-table-column prop="ConfirmeDate" label="财务确认时间" width="100"></el-table-column>
      <el-table-column fixed="right" label="操作" width="80">
        <template slot-scope="scope">
          <el-button @click="BJindex(scope.row)" size="mini" type="primary">编辑</el-button>
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
      pageNum: 1,
      pagesize: 10,
      state: 1,
      search: "",
      total: 0,
      Data: [],
      options: [
        {
          label: "全部",
          value: -1,
        },
        {
          label: "等待财务确认",
          value: 1,
        },
        {
          label: "财务已确认",
          value: 2,
        },
      ],
    };
  },
  created() {
    this.init();
  },
  components: {},
  methods: {
    init: function (i) {
      if (i != undefined || i != null) {
        this.pageNum = 1;
      }
      var obj = {
        api: "get",
        url: this.$store.state.http + "Maintain/GetFCollections",
        data: {
          pageNum: this.pageNum,
          numPerPage: this.pagesize,
          orderField: "",
          orderDirection: "",
          search: this.search,
          state: this.state,
        },
      };
      this.$https(obj).then((res) => {
        this.total = res.Data.DataBars;
        console.log(res);
        this.Data = res.Data.Dtos;
        for (let index = 0; index < this.Data.length; index++) {
          const element = this.Data[index];

          element.CreateDate = element.CreateDate.split("T")[0];
          if (element.ConfirmeDate != "" && element.ConfirmeDate != null) {
            element.ConfirmeDate = element.ConfirmeDate.split("T")[0];
          }
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
      this.init(1);
    },
    BJindex: function (res) {
      console.log(res);
      this.$store.state.Vuex.GetFCollections = res;
      this.$router.push({
        path: "/CollectionDetails",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
