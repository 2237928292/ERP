<template>
  <div class='box'>

    <router-view @refresh="init"></router-view>
    <div class="top_init_data_INWEll">
      <el-input style="width:193px" size="mini" v-model="search" @change="init(1)" placeholder="请输入标题"></el-input>
      <el-button type="success" size="mini" style="float: right" @click="Add()">添加</el-button>

      <el-button type="primary" size="mini" :loading="this.$store.state.Vuex.loading" style="float: righ;margin-right:20px" @click="init()">检索</el-button>
    </div>

    <el-table :data="Data" size="mini" :height="this.$store.state.TableOptimumHeight" highlight-current-row border style="width: 100%" :header-cell-style="{background:'#e1e1e1'}">
      <el-table-column prop="Title" label="标题" width="180" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="Content" label="内容" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="For" label="目标群体" width="100"></el-table-column>

      <el-table-column prop="BeginTime" label="开始日期" width="100"></el-table-column>
      <!-- <el-table-column prop="Enable" label="可用性" width="90"></el-table-column> -->
      <el-table-column fixed="right" label="可用性" width="100">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.Enable" @change="switchEnable" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="Delete(scope.row)" type="danger" size="mini" icon="el-icon-delete"></el-button>
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
      Data: [],
      pageNum: 1,
      pagesize: 10,
      total: 0,
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    init: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "System/GetJournalisms",
        data: {
          search: this.search,
          pageNum: this.pageNum,
          numPerPage: this.pagesize,
          orderField: "",
          orderDirection: "",
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.Data = res.Data.Dtos;
        this.total = res.Data.DataBars;
        this.Data.forEach((element) => {
          element.For =
            element.For == 1 ? "内部员工" : element.For == 2 ? "客户" : "全部";
          element.BeginTime = element.BeginTime.split("T")[0];
        });
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
    //
    switchEnable: function (e) {
      console.log(e);
    },
    //
    Add: function () {
      this.$router.push({
        path: "/add_News",
      });
    },
    //
    Delete: function (Row) {
      this.$confirm("此操作将删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          var obj = {
            api: "post",
            url: this.$store.state.http + "System/DelJournalism",
            data: {
              Id: Row.ID,
            },
          };
          this.$https(obj).then((res) => {
            this.init();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
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