<template>
  <div class='box'>
    <router-view @refresh="init"></router-view>

    <div class="TopSerch">
      <el-input style="width: 193px" size="mini" v-model="GetKPIsEsach.name" @change="init(1)" placeholder="请输入姓名"></el-input>

      <el-date-picker v-model="month" @change="init(1)" value-format="yyyy-MM" size="mini" type="month" placeholder="选择月">
      </el-date-picker>
      <el-select size="mini" style="width: 120px" @change="init(1)" v-model="GetKPIsEsach.state" placeholder="请选择状态">
        <el-option v-for="item in StateList" :key="item.Value" :label="item.name" :value="item.value"></el-option>
      </el-select>

      <el-select size="mini" style="width: 120px" @change="init(1)" v-model="GetKPIsEsach.area" clearable placeholder="请选择区域">
        <el-option v-for="item in areaS" :key="item.Value" :label="item.Value" :value="item.Value"></el-option>
      </el-select>
      <el-button type="primary" :loading="this.$store.state.Vuex.loading" size="mini" @click="init(1)">检索</el-button>
      <el-button type="info" :loading="this.$store.state.Vuex.loading" size="mini" @click="Excel()">导出Excel</el-button>

      <el-button type="success" size="mini" style="float: right" @click="initKPI()">创建</el-button>
    </div>

    <el-table :data="Data" size="mini" :height="this.$store.state.TableOptimumHeight" :row-class-name="tableRowClassName" highlight-current-row border style="width: 100%" :header-cell-style="{ background: '#e1e1e1' }">
      <el-table-column prop="Date" label="月份" sortable></el-table-column>
      <el-table-column prop="Quyu" label="区域" sortable></el-table-column>
      <el-table-column prop="EnginnerName" label="工程师" sortable></el-table-column>
      <el-table-column prop="Days" label="天数"></el-table-column>
      <el-table-column prop="FirstInspection" label="初审人"></el-table-column>
      <el-table-column prop="ToReview" label="复核人"></el-table-column>
      <el-table-column prop="StatusStr" label="状态"></el-table-column>
      <el-table-column fixed="right" label="操作" width="70">
        <template slot-scope="scope">
          <el-button v-if="scope.row.Status == 2" @click="look(scope.row)" size="mini" type="info" icon="el-icon-search"></el-button>
          <el-button v-if="scope.row.Status == 1" @click="edit(scope.row)" size="mini" type="primary" icon="el-icon-edit"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="content" style="display: none">
      <el-table :data="DataStr" size="mini" id="#out-table" :height="this.$store.state.TableOptimumHeight" :row-class-name="tableRowClassName" highlight-current-row border style="width: 100%"
        :header-cell-style="{ background: '#e1e1e1' }">
        <el-table-column prop="Date" label="月份" sortable></el-table-column>
        <el-table-column prop="Quyu" label="区域" sortable></el-table-column>
        <el-table-column prop="EnginnerName" label="工程师" sortable></el-table-column>
        <el-table-column prop="Days" label="天数"></el-table-column>
        <el-table-column prop="FirstInspection" label="初审人"></el-table-column>
        <el-table-column prop="ToReview" label="复核人"></el-table-column>
        <el-table-column prop="StatusStr" label="状态"></el-table-column>
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
import FileSaver from "file-saver";
import XLSX from "xlsx";
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
export default {
  // 定义属性
  data() {
    return {
      month: "",
      GetKPIsEsach: {
        pageNum: 1,
        numPerPage: 10,
        orderField: "",
        orderDirection: "",
        month: "",
        name: "",
        area: "",
        state: "-1",
      },
      DataStr: [],
      areaS: [],
      total: 0,
      StateList: [
        { name: "全部", value: "-1" },
        { name: "已初核", value: "1" },
        { name: "已复核", value: "2" },
      ],
      Data: [],
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    tableRowClassName({ row }) {
      if (row.Status == 1) {
        return "color568248533242";
      } else {
        return "";
      }
    },
    // 初始化
    init: function () {
      this.month == null
        ? (this.GetKPIsEsach.month = "")
        : (this.GetKPIsEsach.month = this.month);

      var obj = {
        api: "get",
        url: this.$store.state.http + "PCenter/GetTravelAllowances",
        data: this.GetKPIsEsach,
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);
        this.Data = res.Data.Dtos;
        this.total = res.Data.DataBars;
        for (let index = 0; index < this.Data.length; index++) {
          const element = this.Data[index];
          element.Status == 1
            ? (element["StatusStr"] = "已初核")
            : (element["StatusStr"] = "已复核");
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
        this.areaS = res.Data;
      });
    },
    //输入第几页
    handleCurrentChange(val) {
      this.GetKPIsEsach.pageNum = val;
      this.init();
    },
    // 切换 每页条数时触发  刷新
    handleSizeChange(val) {
      this.GetKPIsEsach.numPerPage = val;
      this.init(1);
    },
    // 创建KPI
    initKPI: function () {
      this.$router.push({
        path: "AddTravelAllowance",
      });
    },
    // look
    look: function (kpiId) {
      this.$store.state.Vuex.Id = kpiId.Id;
      this.$router.push({
        path: "PreserverLook",
      });
    },
    // edit
    edit: function (kpiId) {
      this.$store.state.Vuex.Id = kpiId.Id;
      this.$router.push({
        path: "Preserver",
      });
    },
    Excel: function () {
      this.month == null
        ? (this.GetKPIsEsach.month = "")
        : (this.GetKPIsEsach.month = this.month);

      var KPIsdata = this.GetKPIsEsach;
      KPIsdata.pageNum = 1;
      KPIsdata.numPerPage = 999;
      var obj = {
        api: "get",
        url: this.$store.state.http + "PCenter/GetTravelAllowances",
        data: KPIsdata,
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);
        this.DataStr = res.Data.Dtos;
        for (let index = 0; index < this.Data.length; index++) {
          const element = this.Data[index];
          element.Status == 1
            ? (element["StatusStr"] = "已初核")
            : (element["StatusStr"] = "已复核");
        }
        var that = this;
        setTimeout(function () {
          that.exportExcel();
        }, 500);
      });
    },

    //定义导出Excel表格事件
    exportExcel() {
      /* 从表生成工作簿对象 */
      let xlsxParam = { raw: true }; //转换成excel时，使用原始的格式
      var wb = XLSX.utils.table_to_book(
        document.getElementById("#out-table"),
        xlsxParam
      );
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          //Blob 对象表示一个不可变、原始数据的类文件对象。
          //Blob 表示的不一定是JavaScript原生格式的数据。
          //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: "application/octet-stream" }),
          //设置导出文件名称
          "index.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    console.log("😀🤗🤗🤗🤗🤗🤗🤗🤗");
    this.init();
    this.initGetArea();
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

<style lang='scss'>
.el-table .color568248533242 {
  background: #f1eabf;
}
</style>