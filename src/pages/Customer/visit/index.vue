<template>
  <div class="box">
    <router-view></router-view>

    <div class="TopSerch">
      <el-input size="mini" style="width: 180px" v-model="search" @change="init()" placeholder="请输入检索项"></el-input>
      <el-input size="mini" style="width: 180px" v-model="creater" @change="init()" placeholder="请输入发起人"></el-input>
      <el-select v-model="state" size="mini" @change="init()" filterable placeholder="请选择状态">
        <el-option v-for="item in DtoTwo" :key="item.Id" :label="item.label" :value="item.value">
        </el-option>
      </el-select>

      <el-select v-model="area" clearable size="mini" @change="init()" filterable placeholder="请选择区域">
        <el-option v-for="item in DtoThree" :key="item.Value" :label="item.Value" :value="item.Value">
        </el-option>

      </el-select>

      <el-select v-model="PDstate" clearable size="mini" @change="init()" filterable placeholder="请选择优先级">
        <el-option v-for="item in PDstates" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>

      <el-select v-model="cusType" clearable size="mini" @change="init()" filterable placeholder="请选择客户类型">
        <el-option v-for="item in this.$store.state.Vuex.CustomerTypes" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>

      <el-button type="success" size="mini" :loading='this.$store.state.Vuex.loading' style="float: right" @click="init()">检索</el-button>
      <el-button type="info" size="mini" style="float: right; marginRight: 10px" @click="exportExcelData">导出Excel</el-button>
    </div>

    <div class="table">
      <el-table size="mini" :data="Data" highlight-current-row :height="this.$store.state.TableOptimumHeight" border style="width: 100%" :header-cell-style="{ background: '#e1e1e1' }">
        <el-table-column fixed prop="CusFullName" :show-overflow-tooltip="true" label="客户名称"></el-table-column>
        <el-table-column prop="VisiterName" width="100" label="发起人"></el-table-column>
        <el-table-column prop="BeginTime" width="100" label="开始时间"></el-table-column>
        <el-table-column prop="EndTime" width="100" label="结束时间"></el-table-column>
        <el-table-column prop="Area" width="100" label="区域"></el-table-column>
        <el-table-column prop="StateStr" width="100" label="当前状态"></el-table-column>
        <el-table-column prop="Priority" width="100" label="优先级"></el-table-column>
        <el-table-column fixed="right" width="100" label="Enable">
          <!-- 最后一格不给宽度，可自适应。给宽度后，屏宽过大会出现空白模块 -->
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="msglook(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="table" style="display: none">
      <el-table size="mini" :data="DataBig" highlight-current-row :height="this.$store.state.TableOptimumHeight" border style="width: 100%" id="out-table" :header-cell-style="{ background: '#e1e1e1' }">
        <el-table-column prop="CusFullName" :show-overflow-tooltip="true" label="客户名称"></el-table-column>
        <el-table-column prop="VisiterName" width="100" label="发起人"></el-table-column>
        <el-table-column prop="BeginTime" width="100" label="开始时间"></el-table-column>
        <el-table-column prop="EndTime" width="100" label="结束时间"></el-table-column>
        <el-table-column prop="Area" width="100" label="区域"></el-table-column>
        <el-table-column prop="StateStr" width="100" label="当前状态"></el-table-column>
        <el-table-column prop="Priority" width="100" label="优先级"></el-table-column>

        <el-table-column prop="OutputValue" width="100" label="售后产值"></el-table-column>

        <el-table-column prop="AffiliatedGroup" width="100" label="隶属集团"></el-table-column>

        <el-table-column prop="BuildYear" width="100" label="建店年份"></el-table-column>

        <el-table-column prop="EquOverview" width="100" label="设备概述"></el-table-column>

        <el-table-column prop="ApprovalProcess" width="100" label="审批流程"></el-table-column>

        <el-table-column prop="FinancialBudget" width="100" label="财务预算"></el-table-column>

        <el-table-column prop="OtherInfo" width="100" label="其它信息"></el-table-column>

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
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  name: "",
  data() {
    return {
      pageNum: 1,
      pagesize: 10,
      total: 0,
      search: "",
      state: "-1",
      creater: "",
      area: "",
      cusType: "",
      PDstate: "",
      DtoTwo: [
        { label: "全部", value: "-1" },
        { label: "已创建", value: "1" },
        { label: "正在完善", value: "2" },
        { label: "完成", value: "3" },
      ],
      PDstates: [
        { label: "高", value: "高" },
        { label: "中", value: "中" },
        { label: "低", value: "低" },
        { label: "完成", value: "完成" },
      ],
      DtoThree: [],
      Data: [],
      DataBig: [],
    };
  },
  created() {
    this.DtoThrees();
    this.init();
  },
  components: {},
  methods: {
    //   初始化
    init: function (pageNum) {
      console.log(pageNum);
      if (pageNum == undefined) {
        this.pageNum = 1;
      }
      var obj = {
        api: "get",
        url: this.$store.state.http + "CRM/GetCusVisits",
        data: {
          pageNum: this.pageNum,
          numPerPage: this.pagesize,
          orderField: "",
          orderDirection: "",
          search: this.search,
          creater: this.creater,
          state: this.state,
          area: this.area,
          all: 1,
          cusType: this.cusType,
          priority: this.PDstate,
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
      this.init(val);
    },
    //输入第几页
    handleCurrentChange(val) {
      console.log(val);
      this.pageNum = val;
      this.init(val);
    },
    // 跳转查看详细页
    msglook: function (res) {
      console.log(res);
      this.$store.state.indexIdGetCusVisitsLook = res.Id;
      this.$router.push({ path: "/GetCusVisitsLook" });
    },
    // 获取当前检索项全部数据
    exportExcelData: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "CRM/GetCusVisits",
        data: {
          pageNum: 1,
          numPerPage: 999999,
          orderField: "",
          orderDirection: "",
          search: this.search,
          creater: this.creater,
          state: this.state,
          area: this.area,
          all: 1,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.DataBig = res.Data.Dtos;
        for (let index = 0; index < this.DataBig.length; index++) {
          const element = this.DataBig[index];
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
        var that = this;
        console.log(this.DataBig);
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
      console.log(wb);
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
          "客户拜访.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
