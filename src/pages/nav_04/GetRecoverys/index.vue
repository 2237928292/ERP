<template>
  <div class='box'>
    <router-view @refresh="init"></router-view>

    <!-- 头部检索 -->
    <div class="TopSerch">
      <el-input style="width:193px" size="mini" v-model="GetRecoverysData.search" placeholder="请输入客户名称  物流单号" @change="init(1)"></el-input>
      <!-- 选择是否可用 -->
      <el-select size="mini" style="width:100px" v-model="GetRecoverysData.state" @change="init(1)" placeholder="请选择">
        <el-option v-for="item in options" :key="item.index" :label="item.label" :value="item.value"></el-option>
      </el-select>

      <el-select size="mini" style="width:120px" @change="init(1)" v-model="GetRecoverysData.area" clearable placeholder="请选择区域">
        <el-option v-for="item in areaS" :key="item.Value + '1' " :label="item.Value" :value="item.Value"></el-option>
      </el-select>

      <el-button type="primary" :loading='this.$store.state.Vuex.loading' size="mini" @click="init(1)">检索</el-button>
    </div>

    <el-table :data="Data" size="mini" :height="this.$store.state.TableOptimumHeight" highlight-current-row border style="width: 100%" :header-cell-style="{background:'#e1e1e1'}">
      <el-table-column prop="CusFullName" label="客户全称" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="Area" label="区域" width="150"></el-table-column>
      <el-table-column prop="EquInstallOrderCode" label="安装任务编号" width="200"></el-table-column>
      <el-table-column prop="Creater" label="创建者" width="100"></el-table-column>
      <el-table-column prop="Receiver" label="回收者" width="100"></el-table-column>
      <el-table-column prop="StateStr" label="状态" width="100"></el-table-column>

      <el-table-column fixed="right" label="操作" width="80">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="Dit(scope.row)">编辑</el-button>
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
      areaS: [],
      options: [
        { label: "全部", value: -1, index: -1 },
        { label: "寄回途中", value: 1, index: 1 },
        { label: "已寄回", value: 2, index: 2 },
      ],
      GetRecoverysData: {
        search: "",
        area: "",
        state: -1,
        pageNum: 1,
        numPerPage: 10,
        orderField: "",
        orderDirection: "",
      },
      total: 0,
      Data: [],
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    init: function (row) {
      if (row == 1) this.GetRecoverysData.pageNum = 1;

      var obj = {
        url: this.$store.state.http + "WO/GetRecoverys",
        api: "get",
        data: this.GetRecoverysData,
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.Data = res.Data.Dtos;
      });
    },

    Dit: function (row) {
      this.$store.state.Vuex.Id = row.Id;
      this.$router.push({
        path: "/SendBackDetails",
      });
    },
    handleCurrentChange(val) {
      this.GetRecoverysData.pageNum = val;
      this.init();
    },
    // 切换 每页条数时触发  刷新
    handleSizeChange(val) {
      this.GetRecoverysData.numPerPage = val;
      this.init(1);
    },
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
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.initGetArea();
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