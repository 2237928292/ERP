<template>
  <!-- 备件库 -->
  <div class='box'>

    <router-view @refresh="init"></router-view>
    <div class="TopSerch" style="padding:5px;">
      <el-input style="width:193px" size="mini" v-model="search" @change="init(1)" placeholder="产品编码、产品描述" clearable></el-input>

      <el-input style="width:193px" size="mini" v-model="cusFullName" @change="init(1)" placeholder="客户名称" clearable></el-input>

      <el-select size="mini" style="width:120px" @change="init(1)" v-model="state" placeholder="请选择状态">
        <el-option v-for="item1 in StateS" :key="item1.value " :label="item1.label" :value="item1.value"></el-option>
      </el-select>

      <el-button type="primary" :loading='this.$store.state.Vuex.loading' size="mini" @click="init()">检索</el-button>
      <!-- <el-button type="success" style="float:right;" @click="EditContract()" size="mini">创建</el-button> -->
    </div>

    <el-table :data="Data" size="mini" :height="this.$store.state.TableOptimumHeight" highlight-current-row border style="width: 100%" :header-cell-style="{background:'#e1e1e1'}">
      <el-table-column prop="CreateDate" label="创建日期" width="100"></el-table-column>

      <el-table-column prop="ProductCode" label="产品编号" width="180"></el-table-column>
      <el-table-column prop="ProductDesc" label="产品描述" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="Brand" label="品牌" width="180"></el-table-column>
      <el-table-column prop="StateStr" label="当前状态" width="100"></el-table-column>
      <el-table-column prop="Memo" label="备注" width="200" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="CusFullName" label="正在使用的客户" width="200" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="ApplicationForLoan(scope.row)" size="mini" type="primary">编辑</el-button>
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
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
export default {
  // 定义属性
  data() {
    return {
      search: "",
      cusFullName: "",
      state: -1,
      pageNum: 1,
      pagesize: 10,
      Data: [],
      total: 0,
      options: [
        { label: "全部", value: -1, index: 1 },
        { label: "培训室", value: "2", index: 2 },
        { label: "客服部", value: "1", index: 3 },
      ],
      StateS: [
        { label: "全部", value: -1 },
        { label: "申请中", value: "1" },
        { label: "已同意", value: "2" },
        { label: "已拒绝", value: "3" },
        { label: "已指派拆机", value: "4" },
        { label: "已拆机", value: "5" },
        { label: "已收货", value: "6" },
        { label: "已指派安装", value: "7" },
        { label: "已完成", value: "8" },
        { label: "已结单", value: "10" },
        { label: "已撤单", value: "9" },
      ],
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    //   ICMS.获取备用机集合
    init: function (i) {
      if (i != undefined || i != null) {
        this.pageNum = 1;
      }

      var obj = {
        api: "get",
        url: this.$store.state.http + "StorageRoom/GetStandbyApprovals",
        data: {
          pageNum: this.pageNum,
          numPerPage: this.pagesize,
          orderField: "",
          orderDirection: "",
          proSearch: this.search,
          cusFullName: this.cusFullName,
          state: this.state,
        },
      };
      this.$https(obj).then((res) => {
        this.Data = res.Data.Dtos;
        console.log(this.Data);
        this.total = res.Data.DataBars;
        for (let index = 0; index < this.Data.length; index++) {
          const row = this.Data[index];
          row.CreateDate = row.CreateDate.split("T")[0];
          row.Belong =
            row.Belong == 1 ? "客服部" : row.Belong == 2 ? "培训室" : "未知";
        }
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

    // ApplicationForLoan
    ApplicationForLoan: function (row) {
      this.$store.state.Vuex.AddSparePartsID = row.Id;
      this.$router.push({
        path: "ApplicatioPpartsMsg",
      });
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.init();
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
</style>