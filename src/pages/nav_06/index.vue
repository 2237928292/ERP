<template>
  <div class="box">
    <router-view @refresh="init"></router-view>
    <div class="TopSerch" style="padding:5px;">
      <!-- 合同号、销售 -->
      <el-input style="width:193px" size="mini" v-model="search" @change="init(1)" placeholder="合同号、销售"></el-input>
      <!-- 名称 -->
      <el-input style="width:193px" size="mini" v-model="CustomerName" @change="init(1)" placeholder="客户名称"></el-input>
      <!-- 状态 -->
      <el-select size="mini" style="width:150px" @change="init(1)" v-model="state" placeholder="请选择状态" clearable>
        <el-option v-for="item in options" :key="item.index" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <!-- 选择区域 -->
      <el-select size="mini" style="width:120px" @change="init(1)" v-model="area" clearable placeholder="请选择区域">
        <el-option v-for="item in areaS" :key="item.Value + '1' " :label="item.Value" :value="item.Value"></el-option>
      </el-select>
      <!-- 客户类型 -->
      <el-select size="mini" style="width:120px" @change="init(1)" v-model="CustomerType" clearable placeholder="请选择客户类型">
        <el-option v-for="item in this.$store.state.Vuex.CustomerTypes" :key="item + '2'" :label="item" :value="item"></el-option>
      </el-select>

      <el-date-picker v-model="monthrange" type="datetimerange" size="mini" @change="init(1)" value-format="yyyy-MM-dd" style="width:200px" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份">
      </el-date-picker>

      <el-button type="primary" :loading='this.$store.state.Vuex.loading' size="mini" @click="init()">检索</el-button>
      <el-button type="success" style="float:right;" @click="EditContract()" size="mini">创建</el-button>
      <el-button type="success" style="float:right;" @click="ExportByXML()" size="mini">导出保养执行汇总</el-button>
    </div>

    <el-table :data="Data" size="mini" :height="this.$store.state.TableOptimumHeight" highlight-current-row border style="width: 100%" :header-cell-style="{background:'#e1e1e1'}">
      <el-table-column prop="ContractType" label="合同类型" width="90"></el-table-column>
      <el-table-column prop="MaintainCode" label="合同号" width="180"></el-table-column>
      <el-table-column prop="CusFullName" label="客户名称" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="Area" label="区域" width="90"></el-table-column>
      <el-table-column prop="EquCount" label="数量" :show-overflow-tooltip="true" width="50"></el-table-column>
      <el-table-column prop="CreateDate" label="创建日期" width="100"></el-table-column>
      <el-table-column prop="AcceptDate" label="报价日期" width="100"></el-table-column>
      <el-table-column prop="PayDate" label="付款日期" width="100"></el-table-column>
      <el-table-column prop="StateStr" label="当前状态" width="130"></el-table-column>
      <el-table-column prop="PreferentialAmount" label="优惠后金额" width="100"></el-table-column>
      <el-table-column prop="SalesPerson" label="销售员" width="70"></el-table-column>
      <el-table-column fixed="right" label="操作" width="220">
        <template slot-scope="scope">
          <el-button @click="lookma(scope.row)" size="mini" type="info">查看</el-button>
          <el-button @click="BJindex(scope.row)" size="mini" type="primary">编辑</el-button>
          <el-button @click="Cpindex(scope.row)" size="mini" type="success">复制</el-button>
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
      // 检索项
      search: "",
      CustomerName: "",
      area: "",
      state: "",
      CustomerType: "",
      monthrange: "",
      // 检索集合
      areaS: [],
      options: [
        { label: "全部", value: "-1", index: 1 },
        { label: "创建中", value: "0", index: 2 },
        { label: "已确认保养设备", value: 1, index: 3 },
        { label: "销售已报价", value: 2, index: 4 },
        { label: "价格已确认", value: 3, index: 5 },
        { label: "已收款", value: 4, index: 6 },
        { label: "执行中", value: 5, index: 7 },
        { label: "已撤销", value: 6, index: 11 },
        { label: "客户拒绝价格", value: 7, index: 8 },
        { label: "合同已结单", value: 9, index: 9 },
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
      this.$store.state.Vuex.MaintenanceContractDetailsID = res.Id;
      this.$router.push({
        path: "/ModificationOfCntract",
      });
    },
    //   查看
    lookma: function (res) {
      console.log(res.Id);
      this.$store.state.Vuex.MaintenanceContractDetailsID = res.Id;
      this.$router.push({
        path: "/ViewContract",
      });
    },
    //   初始化
    init: function (i) {
      if (i != undefined || i != null) {
        this.pageNum = 1;
      }
      // 判断是否选择了时间
      if (this.monthrange == null || this.monthrange == "") {
        this.monthrange = ["", ""];
      }
      var obj = {
        url: this.$store.state.http + "Maintain/GetMCs",
        api: "get",
        data: {
          pageNum: this.pageNum,
          numPerPage: this.pagesize,
          orderField: "",
          orderDirection: "",
          search: this.search,
          state: this.state || "-1",
          cusFullName: this.CustomerName,
          area: this.area,
          cusType: this.CustomerType,
          begin: this.monthrange[0],
          end: this.monthrange[1],
        },
      };
      this.$https(obj).then((res) => {
        this.total = res.Data.DataBars;
        this.Data = res.Data.Dtos;
        for (let index = 0; index < this.Data.length; index++) {
          const element = this.Data[index];
          element.CreateDate = element.CreateDate.split("T")[0];
          element.AcceptDate =
            element.AcceptDate == null || ""
              ? " - - "
              : element.AcceptDate.split("T")[0];
          element.PayDate =
            element.PayDate == null || ""
              ? " - - "
              : element.PayDate.split("T")[0];
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
    // 创建
    EditContract: function () {
      this.$store.state.Vuex.CusId = "010101";
      this.$router.push({
        path: "/EditContract",
      });
    },
    // 复制创建
    Cpindex: function (HF) {
      console.log(HF);
      this.$store.state.Vuex.CusId =
        HF.CusId + "010101" + HF.CusFullName + "010101" + HF.Id;
      this.$router.push({
        path: "/EditContract",
      });
    },
    // 导出DCExcel
    DCExcel: function () {
      // 判断是否选择了时间
      if (this.monthrange == null || this.monthrange == "") {
        this.monthrange = ["", ""];
      }
      var obj = {
        url: this.$store.state.http + "Maintain/GetMCExecutingData",
        api: "get",
        data: {
          pageNum: this.pageNum,
          numPerPage: this.pagesize,
          orderField: "",
          orderDirection: "",
          search: this.search,
          state: this.state || "-1",
          cusFullName: this.CustomerName,
          area: this.area,
          cusType: this.CustomerType,
          begin: this.monthrange[0],
          end: this.monthrange[1],
        },
      };
      this.$https(obj).then((res) => {
        console.log(res.Data.Dtos);
      });
    },

    ExportByXML: function () {
      var header1 =
        '<?xml version="1.0"?>' +
        '<?mso-application progid="Excel.Sheet"?>' +
        '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"' +
        ' xmlns:o="urn:schemas-microsoft-com:office:office"' +
        ' xmlns:x="urn:schemas-microsoft-com:office:excel"' +
        ' xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"' +
        ' xmlns:html="http://www.w3.org/TR/REC-html40">' +
        ' <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">' +
        "  <Author>赵鸿飞</Author>" +
        "  <LastAuthor>86178</LastAuthor>" +
        "  <Created>2015-06-05T18:17:20Z</Created>" +
        "  <LastSaved>2020-12-21T03:24:49Z</LastSaved>" +
        "  <Version>16.00</Version>" +
        " </DocumentProperties>" +
        ' <OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office">' +
        "  <AllowPNG/>" +
        " </OfficeDocumentSettings>" +
        ' <ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">' +
        "  <WindowHeight>11610</WindowHeight>" +
        "  <WindowWidth>21600</WindowWidth>" +
        "  <WindowTopX>7740</WindowTopX>" +
        "  <WindowTopY>1035</WindowTopY>" +
        "  <ProtectStructure>False</ProtectStructure>" +
        "  <ProtectWindows>False</ProtectWindows>" +
        " </ExcelWorkbook>";
      var xml1 =
        '<Worksheet ss:Name="Sheet1">' +
        '  <Table ss:ExpandedColumnCount="2" ss:ExpandedRowCount="2" x:FullColumns="1"' +
        '   x:FullRows="1" ss:DefaultColumnWidth="54" ss:DefaultRowHeight="14.25">' +
        "   <Row>" +
        '    <Cell><Data ss:Type="Number">111</Data></Cell>' +
        "   </Row>" +
        "   <Row>" +
        '    <Cell ss:Index="2" ss:StyleID="s62"><Data ss:Type="Number">222</Data></Cell>' +
        "   </Row>" +
        "  </Table>" +
        '  <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">' +
        "   <PageSetup>" +
        '    <Header x:Margin="0.3"/>' +
        '    <Footer x:Margin="0.3"/>' +
        '    <PageMargins x:Bottom="0.75" x:Left="0.7" x:Right="0.7" x:Top="0.75"/>' +
        "   </PageSetup>" +
        "   <Print>" +
        "    <ValidPrinterInfo/>" +
        "    <PaperSizeIndex>9</PaperSizeIndex>" +
        "    <HorizontalResolution>600</HorizontalResolution>" +
        "    <VerticalResolution>600</VerticalResolution>" +
        "   </Print>" +
        "   <Selected/>" +
        "   <Panes>" +
        "    <Pane>" +
        "     <Number>3</Number>" +
        "     <ActiveRow>4</ActiveRow>" +
        "     <ActiveCol>8</ActiveCol>" +
        "    </Pane>" +
        "   </Panes>" +
        "   <ProtectObjects>False</ProtectObjects>" +
        "   <ProtectScenarios>False</ProtectScenarios>" +
        "  </WorksheetOptions>" +
        " </Worksheet>";
      var styles1 =
        "<Styles>" +
        '<Style ss:ID="Default" ss:Name="Normal">' +
        ' <Alignment ss:Vertical="Bottom"/>' +
        " <Borders/>" +
        ' <Font ss:FontName="等线" x:CharSet="134" ss:Size="11" ss:Color="#000000"/>' +
        " <Interior/>" +
        " <NumberFormat/>" +
        " <Protection/>" +
        "</Style>" +
        '<Style ss:ID="s62">' +
        ' <Interior ss:Color="#FFFF00" ss:Pattern="Solid"/>' +
        "</Style>" +
        "</Styles>";
      console.log(header1);
      console.log(styles1);
      console.log(xml1);
      console.log(typeof xml1);

      var obj = {
        url: this.$store.state.http + "System/ExportByXML",
        api: "post",
        data: {
          xml: xml1,
          styles: styles1,
          header: "",
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>
