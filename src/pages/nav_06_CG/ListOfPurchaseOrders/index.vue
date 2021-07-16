<template>
  <div class='box'>
    <router-view @refresh="init"></router-view>
    <div class="TopSerch" style="padding:5px;">
      <!-- 合同号、销售 -->
      <el-input style="width:193px" size="mini" v-model="search.search" @change="init(1)" placeholder="合同号、销售"></el-input>
      <!-- 状态 -->
      <el-select size="mini" style="width:150px" @change="init(1)" v-model="search.state" placeholder="请选择状态">
        <el-option v-for="item in options" :key="item.index" :label="item.label" :value="item.value"></el-option>
      </el-select>

      <el-button type="primary" :loading='this.$store.state.Vuex.loading' size="mini" @click="init()">检索</el-button>
      <el-button type="success" style="float:right;" @click="Add()" size="mini">创建</el-button>
      <el-button type="success" style="float:right;" @click="exportExcel()" size="mini">导出Excel</el-button>
    </div>

    <el-table :data="Data" size="mini" :height="this.$store.state.TableOptimumHeight" highlight-current-row border style="width: 100%" :header-cell-style="{background:'#e1e1e1'}">
      <el-table-column prop="POCode" label="采购单号" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="PayType" label="付款方式" width="100"></el-table-column>
      <el-table-column prop="Creater" label="发起人" width="100"></el-table-column>
      <el-table-column prop="SendDate" label="发货日期" width="100"></el-table-column>
      <el-table-column prop="ReceiptDate" label="收货日期" width="100"></el-table-column>
      <!-- <el-table-column prop="SentStatusStr" label="状态" width="100"></el-table-column> -->

      <el-table-column fixed="right" label="状态" width="100">
        <template slot-scope="scope">
          <div v-if="scope.row.SentStatus == '1'" style="background:#ff9999">
            {{scope.row.SentStatusStr}}
          </div>
          <div v-if="scope.row.SentStatus == '6'" style="background:#f5db91">
            {{scope.row.SentStatusStr}}
          </div>
          <!-- <div v-if="!(scope.row.SentStatus == '1' || scope.row.SentStatus == '6')">
            {{scope.row.SentStatusStr}}
          </div> -->
          <div v-if="scope.row.SentStatus != '1' &&  scope.row.SentStatus != '6'">
            {{scope.row.SentStatusStr}}
          </div>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="付款" width="100">
        <template slot-scope="scope">
          <div v-if="scope.row.PayStatus == 3" style="background:#ff9999">
            {{scope.row.PayStatusStr}}
          </div>
          <div v-if="!(scope.row.PayStatus == 3)">
            {{scope.row.PayStatusStr}}
          </div>
        </template>
      </el-table-column>

      <el-table-column fixed="right" style="float: left" label="优惠后金额" width="100">
        <template slot-scope="scope">
          <p style="text-align:right">{{scope.row.Amount}}</p>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="160">
        <template slot-scope="scope">

          <el-button size="mini" type="info" @click="ExportExcelPo(scope.row)">报价单</el-button>
          <el-button v-if="scope.row.SentStatusStr == '已结单' || scope.row.SentStatusStr == '已撤单'  " size="mini" type="info" @click="Look(scope.row)">查看</el-button>
          <el-button v-if="!(scope.row.SentStatusStr == '已结单' || scope.row.SentStatusStr == '已撤单'  )" size="mini" type="primary" @click="Dit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-table :data="Data" style="width: 100%;display: none" size="mini" id="#out-table" :height="this.$store.state.TableOptimumHeight" highlight-current-row border :header-cell-style="{background:'#e1e1e1'}">
      <el-table-column prop="POCode" label="采购单号"></el-table-column>
      <el-table-column prop="PayType" label="付款方式" width="80"></el-table-column>
      <el-table-column prop="Creater" label="发起人" width="80"></el-table-column>
      <el-table-column prop="SendDate" label="发货日期" width="90"></el-table-column>
      <el-table-column prop="ReceiptDate" label="收货日期" width="90"></el-table-column>
      <el-table-column prop="SentStatusStr" label="状态" width="130"></el-table-column>
      <el-table-column prop="PayStatusStr" label="付款" width="100"></el-table-column>
    </el-table>

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

let Base64 = require("js-base64").Base64;

// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
export default {
  // 定义属性
  data() {
    return {
      search: {
        pageNum: "1",
        numPerPage: "10",
        orderField: "",
        orderDirection: "",
        search: "",
        state: "-1",
      },
      options: [
        {
          label: "全部",
          value: "-1",
        },
        {
          label: "采购申请中",
          value: "0",
        },
        {
          label: "已确认",
          value: "1",
        },
        {
          label: "全部发货",
          value: "2",
        },
        {
          label: "全部收货",
          value: "3",
        },
        {
          label: "已结单",
          value: "4",
        },
        {
          label: "已撤单",
          value: "5",
        },
        {
          label: "部分发货",
          value: "6",
        },
        {
          label: "部分收货",
          value: "7",
        },
        //  {
        //   label:'采购申请中',
        //   value:'8'
        // }
      ],
      Data: [],
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
        url: this.$store.state.http + "PO/GetPOs",
        data: this.search,
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.Data = res.Data.PoMiniDtos;
        this.total = res.Data.DataBars;

        for (let index = 0; index < this.Data.length; index++) {
          const element = this.Data[index];
          element.SendDate != null
            ? (element.SendDate = element.SendDate.split("T")[0])
            : (element.SendDate = " - - ");
          element.PayType == 1
            ? (element.PayType = "预付")
            : (element.PayType = "到付");
          element.ReceiptDate != null
            ? (element.ReceiptDate = element.ReceiptDate.split("T")[0])
            : (element.ReceiptDate = " - - ");
        }
      });
    },
    //输入第几页
    handleCurrentChange(val) {
      this.search.pageNum = val;
      this.init();
    },
    // 切换 每页条数时触发  刷新
    handleSizeChange(val) {
      this.search.numPerPage = val;
      this.init(1);
    },
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
          "未命名.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    Add: function () {
      this.$router.push({
        path: "/AddPurchase",
      });
    },
    Dit: function (row) {
      this.$store.state.Vuex.Id = row.Id;
      this.$router.push({
        path: "/DitPurchase",
      });
    },

    Look: function (row) {
      this.$store.state.Vuex.Id = row.Id;
      this.$router.push({
        path: "/LookPurchase",
      });
    },

    // 重置状态
    ResetPo: function (Row) {
      console.log(Row);
      var obj = {
        api: "post",
        url: this.$store.state.http + "PO/ResetPo",
        data: {
          Id: Row.Id,
        },
      };
      this.$https(obj).then((res) => {
        this.$look("success", "恢复成功！", Row.POCode + "单号的状态恢复！");
      });
    },

    // 打开excel
    ExportExcelPo: function (row) {
      const { href } = this.$router.resolve({
        path:
          this.$store.state.Vuex.TencentServer +
          "/PDF/" +
          "ExportExcelPo" +
          ".html",
        query: {
          url: Base64.encodeURI(this.$store.state.http + "PO/ExportExcelPo"),
          ID: Base64.encodeURI(row.Id),
          token: Base64.encodeURI(localStorage.getItem("token")),
        },
      });
      window.open(href.slice(2), "_blank");
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