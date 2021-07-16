<template>
  <div class="box">
    <!-- 头部检索 -->

    <div class="TopSerch">
      <!-- 检索内容 -->
      <el-date-picker v-model="DateTime" type="date" size="mini" placeholder="选择日期" @change="init()"></el-date-picker>
      <el-select v-model="limit" placeholder="请选择" size="mini" @change="init()">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>

      <el-select size="mini" style="width: 120px" @change="init()" v-model="areaId" clearable placeholder="请选择区域">
        <el-option v-for="item in areaS" :key="item.Value" :label="item.Value" :value="item.Id"></el-option>
      </el-select>

      <el-button type="primary" size="mini" :loading='this.$store.state.Vuex.loading' @click="init()">检索</el-button>
      <el-button type="info" style="float:right" size="mini" :loading='this.$store.state.Vuex.loading' @click="Excel()">导出</el-button>

    </div>

    <!-- 表格 -->
    <div class="content" style=" padding: 0px 25px;box-sizing: border-box;">
      <el-table :data="Data" :max-height="this.$store.state.TableOptimumHeight" size="mini" highlight-current-row border style="width: 100%" :header-cell-style="{background:'#e1e1e1'}">
        <el-table-column prop="Date" label="统计日期" sortable></el-table-column>
        <!-- <el-table-column fixed prop="Name" label="姓名" width="150"></el-table-column> -->
        <!-- <el-table-column :show-overflow-tooltip="true" prop="Content" label="ID"></el-table-column> -->
        <el-table-column prop="EngineerName" label="工程师"></el-table-column>
        <el-table-column prop="Count" label="打卡次数" sortable></el-table-column>
        <el-table-column prop="FirstTime" label="最初记录时间"></el-table-column>
        <el-table-column prop="LastTime" label="最后记录时间"></el-table-column>
      </el-table>
    </div>

    <div class="content" style="padding: 0px 25px;box-sizing: border-box;display: none;">
      <el-table :data="Data" id="out-table" :max-height="this.$store.state.TableOptimumHeight" size="mini" highlight-current-row border style="width: 100%" :header-cell-style="{background:'#e1e1e1'}">
        <el-table-column prop="Date" label="统计日期" sortable></el-table-column>
        <!-- <el-table-column fixed prop="Name" label="姓名" width="150"></el-table-column> -->
        <!-- <el-table-column :show-overflow-tooltip="true" prop="Content" label="ID"></el-table-column> -->
        <el-table-column prop="EngineerName" label="工程师"></el-table-column>
        <el-table-column prop="Count" label="打卡次数" sortable></el-table-column>
        <el-table-column prop="FirstTime" label="最初记录时间"></el-table-column>
        <el-table-column prop="LastTime" label="最后记录时间"></el-table-column>
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
      limit: 10,
      DateTime: "",
      areaId: "",
      areaS: [],
      options: [
        {
          value: 10,
          label: "十天",
        },
        {
          value: 30,
          label: "一月",
        },
        {
          value: 180,
          label: "半年",
        },
        {
          value: 360,
          label: "一年",
        },
      ],
    };
  },
  created() {
    this.init();
    this.initGetArea();
  },
  methods: {
    init: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "System/EngineerSR",
        data: {
          date: this.DateTime || "", //检索项
          limit: this.limit || "",
          areaId: this.areaId,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.Data = res.Data;
      });
    },

    initGetArea: function () {
      var obj = {
        url: this.$store.state.http + "System/GetArea",
        api: "get",
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);
        this.areaS = res.Data;
      });
    },

    Excel: function () {
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
          "打卡记录.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
  },
};
</script>
<style scope lang="scss">
@import url("../../../assets/scss/Tool_database.scss");

.top_init_data {
  width: 100%;
  height: 80px;
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
.div {
  width: 100%;
  // height: 400px;
  // background: rgb(228, 228, 228);
  margin-top: 20px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5px;
}
.div div {
  line-height: 20px;
}
</style>