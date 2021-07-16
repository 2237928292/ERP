<template>
  <div class="box">
    <p class="p92387623635457">
      判断逻辑：启动日期 晚于 预计日期 | 数据总数： <span>{{this.Data.length}}</span>

    </p>
    <p class="p92387623635457">
      无启动日期表示保养任务还未启动，需要区域经理根据实际情况启动任务
      有启动日期但无完成日期表示任务已启动，但还未完成
    </p>

    <!-- 头部检索 -->
    <div class="TopSerch">
      <!-- 检索内容 -->
      <el-input style="width:193px" size="mini" v-model="search" @change="init()" placeholder="请输入内容" clearable></el-input>
      <!-- 类型选择项 -->
      <el-select size="mini" style="width:120px" @change="init()" v-model="type" placeholder="请选择类型">
        <el-option v-for="item in types" :key="item.index" :label="item.label" :value="item.value"></el-option>
      </el-select>

      <el-select size="mini" style="width:120px" @change="init()" v-model="area" clearable placeholder="请选择区域">
        <el-option v-for="item in areaS" :key="item.Value" :label="item.Value" :value="item.Value"></el-option>
      </el-select>

      <el-button type="primary" :loading='this.$store.state.Vuex.loading' size="mini" @click="init()">检索</el-button>
      <el-button type="info" size="mini" style="float:right" @click="exportExcel">导出Excel</el-button>
    </div>

    <div class="content" style=" padding: 0px 25px;box-sizing: border;">
      <el-table :data="Data" size="mini" :height="this.$store.state.TableOptimumHeight" highlight-current-row border style="width: 100%" :row-class-name="tableRowClassName" :header-cell-style="{background:'#e1e1e1'}"
        id="out-table">

        <el-table-column prop="Area" label="区域" width="150"></el-table-column>
        <el-table-column prop="CustomerFullName" :show-overflow-tooltip="true" label="客户名称"></el-table-column>
        <el-table-column prop="TaskCode" label="任务编号" width="150"></el-table-column>
        <el-table-column prop="ContractCode" label="合同编码" width="250"></el-table-column>
        <el-table-column prop="EstimateDate" label="预估时间" width="120"></el-table-column>
        <el-table-column prop="ActualDateTime" label="启动日期" width="120"></el-table-column>
        <el-table-column prop="OrderOverTimeSTR" label="完成时间" width="120"></el-table-column>
        <el-table-column prop="Overtime" label="超时天数" width="80"></el-table-column>
      </el-table>
    </div>

  </div>
</template>
<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      Data: [],
      search: "",
      types: [
        { label: "全部", value: "-1", index: 1 },
        { label: "未启动", value: "0", index: 2 },
        { label: "已启动", value: "1", index: 3 },
        { label: "已完成", value: "2", index: 4 },
      ], //类型可选项
      type: "0",
      area: "",
      areaS: [],
    };
  },
  created() {
    this.init();
    this.initGetArea();
  },

  methods: {
    init: function () {
      if (this.area == "全部" || this.area == "") {
        this.area = "";
      }
      var obj = {
        url: this.$store.state.http + "Statistic/GetMCDelay",
        api: "get",
        data: {
          search: this.search,
          area: this.area,
          state: this.type,
        },
      };
      this.$https(obj).then((res) => {
        this.Data = res.Data.Dtos;
        console.log(this.Data);
        for (let index = 0; index < this.Data.length; index++) {
          this.Data[index].EstimateDate = this.Data[index].EstimateDate.split(
            "T"
          )[0];

          this.Data[index].ActualDate == null
            ? (this.Data[index]["ActualDateTime"] = "- - ")
            : (this.Data[index]["ActualDateTime"] = this.Data[
                index
              ].ActualDate.split("T")[0]);

          this.Data[index].OrderOverTime == null
            ? (this.Data[index]["OrderOverTimeSTR"] = "- - ")
            : (this.Data[index]["OrderOverTimeSTR"] = this.Data[
                index
              ].OrderOverTimeSTR.split("T")[0]);
        }
      });
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
    tableRowClassName({ row }) {
      if (row.ActualDate == null) {
        if (row.Overtime <= 7) {
          return "color568248533242";
          return false;
        }
        if (row.Overtime > 7 && row.Overtime <= 14) {
          return "code2345u56584784";
          return false;
        }
        if (row.Overtime > 14) {
          return "code345678998765";
          return false;
        }
      }
      return "";
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
          "保养延迟.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
  },
};
</script>
<style lang="scss">
.p92387623635457 {
  width: 100%;
  line-height: 20px;
  font-size: 12px;
  span {
    color: #09c;
  }
}
.p92387623635456 {
  color: #828282;
  font-size: 12px;
  position: absolute;
  top: 2px;
  left: 2px;
  span {
    color: #09c;
  }
}

.top_init_data {
  width: 100%;
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
// 黄 红  大

.el-table .color568248533242 {
  background: #f1eabf;
}
.el-table .code2345u56584784 {
  background: #ffd5d5;
}
.el-table .code345678998765 {
  background: #ff6868;
}
</style>