<template>
  <div class="box_s">
    <el-button type="info" size="mini" style="float: right" @click="exportExcel">导出Excel</el-button>

    <table id="out-table">
      <thead>
        <tr>
          <th colspan="6">
            <div class="title">{{ head.EquType }}设备状况评估报告</div>
          </th>
        </tr>
        <tr>
          <th>经销商CKD</th>
          <th class="cel">{{ head.CusCKD }}</th>
          <th>经销商名称</th>
          <th class="cel">{{ head.CusFullName }}</th>
          <th>经销商联系信息</th>
          <th class="cel">{{ head.CusLinkInfo }}</th>
        </tr>
        <tr>
          <th>设备类型</th>
          <th class="cel">{{ head.EquType }}</th>
          <th>设备品牌</th>
          <th class="cel">{{ head.Brand }}</th>
          <th>设备型号</th>
          <th class="cel">{{ head.EquModel }}</th>
        </tr>
        <tr>
          <th>序列号</th>
          <th class="cel">{{ head.EquSN }}</th>
          <th>安装方式</th>
          <th class="cel">{{ head.InstallType }}</th>
          <th colspan="2"></th>
        </tr>
        <tr>
          <th>安装年份</th>
          <th class="cel">{{ head.InstallYear }}</th>
          <th>累积设备使用年份</th>
          <th class="cel">{{ head.CumulativeUse }}</th>
          <th>评估日期</th>
          <th v-if="head.CreateDate" class="cel">
            {{ head.CreateDate.split("T")[0] }}
          </th>
        </tr>
        <tr>
          <th>评估项目</th>
          <th>正常</th>
          <th>异常</th>
          <th>故障</th>
          <th colspan="2">备注</th>
        </tr>
      </thead>

      <tbody v-if="Data != null">
        <tr v-for="(item, index) in Data" :key="index">
          <td class="td">
            <div style="padding: 5px">{{ item.Name }}</div>
          </td>
          <td class="td">
            <div class="td_textcon">{{ item.Result == "正常" ? "√" : "" }}</div>
          </td>
          <td class="td">
            <div class="td_textcon">{{ item.Result == "异常" ? "√" : "" }}</div>
          </td>
          <td class="td">
            <div class="td_textcon">{{ item.Result == "故障" ? "√" : "" }}</div>
          </td>
          <td class="td" colspan="2"></td>
        </tr>
      </tbody>
      <thead>
        <tr>
          <th>设备评估建议</th>
          <th>1：工况正常 {{ head.Result == "工况正常" ? "√" : "" }}</th>
          <th>2：建议维修 {{ head.Result == "建议维修" ? "√" : "" }}</th>
          <th>3: 建议更换 {{ head.Result == "建议更换" ? "√" : "" }}</th>
          <th colspan="2"></th>
        </tr>
        <tr>
          <th>其他备注</th>
          <th colspan="5">
            <div>{{ head.OtherInfo }}</div>
          </th>
        </tr>
      </thead>
    </table>
  </div>
</template>
<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
import XLSXS from "xlsx-style";
export default {
  name: "",
  data() {
    return {
      head: {},
      Data: [],
    };
  },
  created() {
    this.init();
  },
  components: {},
  methods: {
    init: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "CRM/GetCusEquEvaluate",
        data: {
          Id: this.$store.state.Vuex.lookEQUindex,
        },
      };
      this.$https(obj).then((res) => {
        this.head = res.Data.Dto;
        this.Data = res.Data.Dto.EvaluateProjectDtos;
        console.log(this.head);
      });
    },

    //定义导出Excel表格事件
    exportExcel() {
      const { href } = this.$router.resolve({
        path:
          this.$store.state.Vuex.TencentServer +
          "/Excel/EquipmentEvaluation.html",
        query: {
          name:
            this.$store.state.Vuex.lookEQUindex +
            "010101" +
            "1" +
            this.$store.state.token,
        },
      });
      window.open(href.slice(2), "_blank");

      return false;

      /* 从表生成工作簿对象 */
      let xlsxParam = { raw: true }; //转换成excel时，使用原始的格式
      var wb = XLSX.utils.table_to_book(
        document.querySelector("#out-table"),
        xlsxParam
      );
      console.log(wb);

      // 标题
      wb.Sheets.Sheet1["A1"].s = {
        font: {
          name: "宋体",
          sz: 22,
          bold: true,
          italic: false,
          underline: false,
        },
      };
      var wbout = XLSXS.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "buffer",
      });
      //   /* 获取二进制字符串作为输出 */
      //   var wbout = XLSX.write(wb, {
      //     bookType: "xlsx",
      //     bookSST: true,
      //     type: "array",
      //   });

      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "设备评定.xlsx"
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
.box_s {
  padding: 10px;
  box-sizing: border-box;
  table {
  }
  #out-table {
    border: 1px solid #afacac;
    border-collapse: collapse;
    background: #fff;
    tbody tr td,
    thead tr th {
      width: 200px;
      border: 1px solid #afacac;
      padding: 5px;
      text-align: left;
      font-size: 14px;
    }
    thead tr .cel {
      font-weight: normal;
      font-size: 12px;
      color: #525252;
    }
    tbody tr .td {
      padding: 5px;
      background: #fff;
    }

    .title {
      width: 100%;
      line-height: 50px;
      height: 50px;
      text-align: center;
      font-size: 30px;
      letter-spacing: 20px;
      background: #ccc;
    }
    .td_textcon {
      text-align: center;
    }
  }
}
</style>
