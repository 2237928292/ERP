<template>
  <div class="box">
    <router-view @refresh="init"></router-view>
    <div class="TopSerch">
      <el-input style="width: 193px" size="mini" v-model="initData.fullname" @change="init(1)" placeholder="请输入客户"></el-input>
      <el-input style="width: 193px" size="mini" v-model="initData.enginner" @change="init(1)" placeholder="请输入工程师"></el-input>

      <el-select size="mini" style="width: 120px" @change="init(1)" v-model="initData.area" clearable placeholder="请选择区域">
        <el-option v-for="item in areaS" :key="item.Value" :label="item.Value" :value="item.Value"></el-option>
      </el-select>

      <el-select size="mini" style="width: 140px" @change="init(1)" v-model="initData.type" clearable placeholder="请选择类型">
        <el-option v-for="item in CustomerTypes" :key="item + '2'" :label="item" :value="item"></el-option>
      </el-select>

      <el-date-picker v-model="pickerDate" type="datetimerange" size="mini" @change="pick" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" :default-time="['12:00:00']"></el-date-picker>

      <el-button type="primary" :loading="this.$store.state.Vuex.loading" size="mini" @click="init(1)">检索</el-button>

      <el-button type="success" size="mini" style="float: right" @click="initMyWord()">创建日报</el-button>
      <el-button type="info" :loading="this.$store.state.Vuex.loading" size="mini" style="float: right" @click="Excel()">导出Excel</el-button>
    </div>

    <!--  -->
    <el-table :data="Data" :row-class-name="tableRowClassName" size="mini" :height="this.$store.state.TableOptimumHeight" highlight-current-row border style="width: 100%" :header-cell-style="{ background: '#e1e1e1' }">

      <el-table-column prop="CustomerName" label="客户名" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="Area" label="区域" width="100"></el-table-column>
      <el-table-column prop="ServiceType" label="类型" width="70"></el-table-column>
      <el-table-column prop="Engineer" label="工程师" width="90"></el-table-column>
      <el-table-column prop="CreateDate" label="创建日期" width="100"></el-table-column>
      <el-table-column prop="ServiceDate" label="服务日期" width="100"></el-table-column>
      <el-table-column prop="LinkMan" label="联系人" width="90" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="Tel" label="电话" width="120"></el-table-column>
      <el-table-column prop="Email" label="邮箱" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="IsOver" label="是否完结" width="90"></el-table-column>

      <el-table-column fixed="right" label="操作" width="140">
        <template slot-scope="scope">
          <el-button v-if="scope.row.State" @click="look(scope.row)" size="mini" type="info" icon="el-icon-search"></el-button>
          <el-button v-if="!(scope.row.State)" @click="edit(scope.row)" size="mini" type="primary" icon="el-icon-edit"></el-button>
          <el-button @click="DeleWork(scope.row)" size="mini" type="danger" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- excel -->
    <div class="content" style="display: none">
      <el-table :data="DataExcel" size="mini" id="out-table" :height="this.$store.state.TableOptimumHeight" highlight-current-row border style="width: 100%" :header-cell-style="{ background: '#e1e1e1' }">
        <el-table-column prop="CustomerName" label="客户名" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="Area" label="区域" width="100"></el-table-column>
        <el-table-column prop="ServiceType" label="类型" width="70"></el-table-column>
        <el-table-column prop="Engineer" label="工程师" width="90"></el-table-column>
        <el-table-column prop="CreateDate" label="创建日期" width="100"></el-table-column>
        <el-table-column prop="ServiceDate" label="服务日期" width="100"></el-table-column>
        <el-table-column prop="LinkMan" label="联系人" width="90"></el-table-column>
        <el-table-column prop="Tel" label="电话" width="120"></el-table-column>
        <el-table-column prop="Email" label="邮箱" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="IsOver" label="是否完结" width="90"></el-table-column>
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
export default {
  data() {
    return {
      initData: {
        pageNum: 1,
        numPerPage: 10,
        orderField: "",
        orderDirection: "",
        fullname: "", //客户名称
        enginner: "", //工程师姓名
        begin: "", //开始日期
        end: "", //结束日期
        area: "", //区域
        type: "", //类型
      },
      Data: [],
      DataExcel: [],
      total: 0,
      areaS: [],
      pickerDate: "",
      CustomerTypes: [
        "保养",
        "维修",
        "安装",
        "培训",
        "VIP回访",
        "钣喷回访",
        "VIP与钣喷回访回访",
        "回访",
        "地基勘探",
        "乘车",
        "调休",
        "年假",
        "事假",
        "其他",
      ],
    };
  },
  mounted() {
    this.init();
    this.initGetArea();
  },
  methods: {
    init: function (st) {
      if (st == "1") {
        this.initData.pageNum = 1;
      }
      var obj = {
        api: "get",
        url: this.$store.state.http + "PCenter/GetWorkDailiys",
        data: this.initData,
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.Data = res.Data.WorkDailyDtos;
        this.total = res.Data.DataBars;
        this.Data.forEach((element) => {
          element.CreateDate = element.CreateDate.split("T")[0];
          element.ServiceDate = element.ServiceDate.split("T")[0];
        });
      });
    },

    tableRowClassName({ row }) {
      if (!row.State) {
        return "color568248533242";
      }
    },

    // 选择时间
    pick: function (val) {
      console.log(val);
      if (val == null) {
        this.initData.begin = "";
        this.initData.end = "";
      } else {
        this.initData.begin = val[0];
        this.initData.end = val[1];
      }
      this.init();
    },
    //输入第几页
    handleCurrentChange(val) {
      this.initData.pageNum = val;
      this.init();
    },
    // 切换 每页条数时触发  刷新
    handleSizeChange(val) {
      this.initData.numPerPage = val;
      this.init(1);
    }, // 获取区域
    initGetArea: function () {
      var obj = {
        url: this.$store.state.http + "System/GetArea",
        api: "get",
      };
      this.$https(obj).then((res) => {
        this.areaS = res.Data;
      });
    },
    look: function (fei) {
      console.log(fei.WorkdailyId);
      this.$store.state.Vuex.Id = fei.WorkdailyId;
      this.$router.push({
        path: "WorkLook",
      });
    },

    DeleWork: function (Row) {
      console.log(Row);

      var obj = {
        api: "post",
        url: this.$store.state.http + "PCenter/DelWorkDaily",
        data: {
          Id: Row.WorkdailyId,
        },
      };
      this.$https(obj).then((res) => {
        this.$look("success", "删除成功！");
        this.init();
      });
    },
    // 编辑
    edit: function (fei) {
      console.log(fei.WorkdailyId);
      this.$store.state.Vuex.Id = fei.WorkdailyId;
      this.$router.push({
        path: "WorkCon",
      });
    },
    Excel: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "PCenter/GetWorkDailiys",
        data: {
          pageNum: 1,
          numPerPage: 99999,
          orderField: "",
          orderDirection: "",
          fullname: this.initData.fullname, //客户名称
          enginner: this.initData.enginner, //工程师姓名
          begin: this.initData.begin, //开始日期
          end: this.initData.end, //结束日期
          area: this.initData.area, //区域
          type: this.initData.type, //类型
        },
      };
      this.$https(obj).then((res) => {
        console.log(res.Data.WorkDailyDtos);
        var Data = res.Data.WorkDailyDtos;

        Data.forEach((element) => {
          element.CreateDate = element.CreateDate.split("T")[0];
        });

        this.DataExcel = Data;
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
        document.querySelector("#out-table"),
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
          "工作日报.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    // 创建工作日报
    initMyWord: function () {
      this.$router.push({
        path: "AddMyWord",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.el-table .color568248533242 {
  background: #f1eabf;
}
</style>
