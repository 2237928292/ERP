<template>
  <div class="box">
    <div class="top_init_data_INWEll" style="borderBottom: 1px solid #ccc;paddingBottom:5px">
      <!-- 选择年 -->
      <el-date-picker size="mini" v-model="year" @change="init('year')" style="width:100px" value-format="yyyy-MM" type="year" placeholder="选择年">
      </el-date-picker>
      <!-- 开始月份  结束月份 -->
      <el-date-picker v-model="monthrange" type="monthrange" size="mini" @change="init('monthrange')" value-format="yyyy-MM" style="width:200px" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份">
      </el-date-picker>

      <!-- 请选择区域 -->
      <el-select size="mini" style="width:120px" @change="init()" v-model="area" clearable placeholder="请选择区域">
        <el-option v-for="item in areaS" :key="item.Value" :label="item.Value" :value="item.Value"></el-option>
      </el-select>
      <!-- 请选择客户类型 -->
      <el-select size="mini" style="width:140px" @change="init(1)" v-model="CustomerType" clearable placeholder="请选择客户类型">
        <el-option v-for="item in CustomerTypes" :key="item + '2'" :label="item" :value="item"></el-option>
      </el-select>

      <el-autocomplete class="inline-input" size="mini" v-model="Brandi " style="width:200px" :show-overflow-tooltip="true" :fetch-suggestions="querySearch" placeholder="请选择品牌" @select="handleSelect" clearable>
      </el-autocomplete>

      <el-button type="primary" size="mini" :loading="this.$store.state.Vuex.loading" style="float: right" @click="init()">检索</el-button>
    </div>
    <!-- <p style="lineHeight: 28px;fontSize:13px">
      零配件销售额合计: <span v-if="SalesData[0]">{{SalesData[0].Title || '- -' }}</span> 元
      <br>
      差旅费销售额合计: <span v-if="SalesData[1]">{{SalesData[1].Title || '- -' }}</span> 元
      <br>
      维修费销售额合计: <span v-if="SalesData[2]">{{SalesData[2].Title || '- -' }}</span> 元
    </p> -->

    <el-divider content-position="left">零配件销售额合计: <span v-if="SalesData[0]">{{SalesData[0].Title || '- -' }}</span> 元 | 差旅费销售额合计: <span v-if="SalesData[1]">{{SalesData[1].Title || '- -' }}</span> 元 | 维修费销售额合计: <span
        v-if="SalesData[2]">{{SalesData[2].Title || '- -' }}</span> 元 </el-divider>

    <div id="myChart1" :style="{ width: '800px', height: '400px' }"></div>
    <div id="myChart2" :style="{ width: '480px', height: '320px' }"></div>

    <div style="width:80%;paddingBottom:5px;float:left;paddingLeft:50px;">

      <el-button type="primary" size="mini" @click="Delwd()">下载明细</el-button>

      <p style="lineHeight: 28px;fontSize:11px">
        零配件取值：已确认之后的订单(排除AS订单)
        <br>
        差旅费取值：已结单的工单
        <br>
        维修费取值：已结单的工单
      </p>
    </div>

    <div class="table" style="display: none">
      <el-table size="mini" :data="TableData" highlight-current-row :height="this.$store.state.TableOptimumHeight" border style="width: 100%" id="out-table" :header-cell-style="{ background: '#e1e1e1' }">

        <el-table-column prop="CusFullName" width="100" label="客户名称"></el-table-column>
        <el-table-column prop="SOCode" width="100" label="订单单号"></el-table-column>
        <el-table-column prop="PayDate" width="100" label="付款日期"></el-table-column>

        <el-table-column prop="ProductCode" width="100" label="产品型号"></el-table-column>

        <el-table-column prop="Number" width="100" label="数量"></el-table-column>

        <el-table-column prop="RealUnitPrice" width="100" label="价格"></el-table-column>

        <el-table-column prop="Characteristics" width="100" label="产品描述"></el-table-column>

      </el-table>
    </div>

    <!-- 选择年 -->
  </div>
</template>
<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  name: "Ech",
  data() {
    return {
      Data: [],
      msg: "赵鸿飞",
      area: "",
      areaS: [],

      Brandi: "",
      Brand: [],

      CustomerType: "",
      CustomerTypes: [
        "宝马",
        "保时捷",
        "奥迪",
        "奔驰",
        "劳斯莱斯",
        "路虎",
        "自由市场",
        "其它",
      ],
      // 返回值   月份  数值
      TimeData: [],
      ValueData: [],
      // 选择年月检索项
      year: "",
      monthrange: "",
      // 处理后的检索项
      begin: "", // 开始时间
      end: "", // 结束时间

      Time: "",
      // 表二展示区域
      myChart2data: [],
      seriesdata: [],
      // 表格展示年
      Timetable: "",
      // 表格展示年月
      TimetableYU: "",
      // 图表展示类型
      ValueType: "",
      // 当前选择总计
      ValueDataS: 0,
      // 销售额最多
      BIgtext: "",
      // 下载表格数据
      TableData: [],
      // 储存当前月份数组
      TimetableYUData: [],
      // 销售额合计
      SalesData: [],
    };
  },
  mounted() {
    this.init();
    this.initGetArea();
    this.GetBrand();
  },
  methods: {
    //  初始化
    init: function (isd) {
      console.log(isd);
      // 选择月份
      if (isd === "monthrange" && this.monthrange != null) {
        this.begin = this.monthrange[0];
        this.end = this.monthrange[1];
        this.Timetable = this.begin + "-" + this.end;
        this.year = "";
      }
      // 选择年份
      if (isd === "year" && this.year != null) {
        console.log(this.year);
        this.begin = this.year;
        // 判断是不是本年   如果是添加本年最后一个月
        if (new Date().getFullYear() == this.year.split("-")[0]) {
          // 是本年 获取现在月份
          this.end =
            new Date().getFullYear() +
            "-" +
            (Number(new Date().getMonth()) + 1);
        } else {
          // 不是本年 获取现在月份
          this.end = this.year.split("-")[0] + "-12";
        }

        this.Timetable = this.begin.split("-")[0];
      }
      // 没有选择  默认本年and现在这个月
      if (this.begin == "") {
        this.year = new Date().getFullYear() + "-" + "1";
        this.begin = new Date().getFullYear() + "-" + "1";
        this.end =
          new Date().getFullYear() + "-" + (Number(new Date().getMonth()) + 1);
        this.Timetable = this.begin.split("-")[0];
      }
      var obj = {
        api: "get",
        url: this.$store.state.http + "Statistic/SOSalesVolume",
        data: {
          begin: this.begin, //开始时间
          end: this.end, //结束时间
          cusType: this.CustomerType, //客户类型 宝马、保时捷.....
          area: this.area, //区域
          brand: this.Brandi, //品牌
        },
      };
      this.$https(obj).then((res) => {
        this.SalesData = res.Data;
        console.log(res.Data);
        this.TimeData = [];
        this.ValueData = [];
        this.ValueDataS = 0;
        var big = 0;
        var bigindex = "";
        this.TimetableYUData = [];
        var ydata = Number(this.begin.split("-")[0]);
        var ydati = Number(this.begin.split("-")[1]);

        // 拿出三份数据
        var SpareParts = res.Data[0].StatDtos;
        var TravelExpenses = res.Data[1].StatDtos;
        var MaintenanceFees = res.Data[2].StatDtos;
        this.ValueData = [["product", "零配件", "维修费", "差旅费"]];

        for (let index = 0; index < SpareParts.length; index++) {
          const element = SpareParts[index].Key;

          const Valueli1 = Number(SpareParts[index].Value);
          const Valueli2 = Number(MaintenanceFees[index].Value);
          const Valueli3 = Number(TravelExpenses[index].Value);

          // 展示数据 月份 and 数值
          this.TimeData.push(element);
          this.ValueData.push([element, Valueli1, Valueli2, Valueli3]);

          // 找出最高销售额
          // this.ValueDataS += Number(Valueli);
          // if (Valueli > big) {
          //   big = Valueli;
          //   bigindex = index;
          // }

          // 计算月份
          if (ydati + index < 13) {
            this.TimetableYUData.push(ydata + "-" + (ydati + index));
          }
          if (ydati + index > 12 && ydati + index < 25) {
            this.TimetableYUData.push(ydata + 1 + "-" + (ydati + index - 12));
          }
          if (ydati + index > 24 && ydati + index < 37) {
            this.TimetableYUData.push(ydata + 2 + "-" + (ydati + index - 24));
          }
          // this.TimetableYUData  月份
        }

        console.log(this.ValueData);
        // 如果销售额全为0 则没有最佳销售额

        if (big == 0) {
          this.BIgtext = "没有最佳销售额";
        } else {
          this.BIgtext =
            this.TimeData[bigindex] + "销售额最多:" + this.ValueData[bigindex];
        }
        console.log(this.begin);
        this.drawLine();
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
    //  获取品牌
    GetBrand: function () {
      var obj = {
        url: this.$store.state.http + "System/GetBrand",
        api: "get",
      };
      this.$https(obj).then((res) => {
        this.Brand = res.Data;
        for (let index = 0; index < this.Brand.length; index++) {
          this.Brand[index]["value"] = this.Brand[index].Value;
        }
        console.log(this.Brand);
      });
    },

    // 键入 筛序客户
    querySearch(queryString, cb) {
      console.log(queryString);
      if (queryString == undefined) {
        queryString = "";
        return false;
      }
      if (queryString == "") {
        cb(this.Brand);
        this.init();
        return false;
      }

      var Search = queryString;
      var Data2 = this.Brand;
      var DataInit = [];
      var input = Search.split("")[0];

      for (let index = 0; index < Data2.length; index++) {
        const element = Data2[index];
        if (element.value.indexOf(Search) != -1) {
          DataInit.push(element);
          break;
        }
      }

      console.log(DataInit);
      cb(DataInit);
    },
    // 点击
    handleSelect(item) {
      this.init();
    },

    // 图 一
    drawLine() {
      // 基于准备好的dom，初始化echarts实例

      let that = this;
      let myChart1 = that.$echarts.init(document.getElementById("myChart1"));
      myChart1.off("click");

      // 第一个
      myChart1.setOption({
        legend: {},
        tooltip: {},
        dataset: {
          source: this.ValueData,
        },
        xAxis: { type: "category" },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          {
            type: "bar",
            itemStyle: {
              normal: {
                color: "#5470c6",
              },
            },
          },
          {
            type: "bar",
            itemStyle: {
              normal: {
                color: "#91cc75",
              },
            },
          },
          {
            type: "bar",
            itemStyle: {
              normal: {
                color: "#fac858",
              },
            },
          },
        ],
      });

      myChart1.on("click", function (params) {
        console.log(params);
        that.TimetableYU = that.TimetableYUData[params.dataIndex];
        that.ValueType = params.seriesName;
        that.SOSalesByArea(params.seriesIndex + 1);
      });
      return false;

      // 第一个
      myChart1.setOption({
        color: ["#3398DB"],
        xAxis: {
          type: "category",
          data: that.TimeData,
        },

        yAxis: {
          type: "value",
        },
        title: {
          x: "center",
          text:
            that.Timetable +
            "年零配件订单统计" +
            "（总计：" +
            that.ValueDataS.toFixed(2) +
            "）",
          subtext: that.BIgtext, //副标题文本，'\n'指定换行
          subtextStyle: {
            color: "red",
          },
        },
        tooltip: {},
        series: [
          {
            data: that.ValueData,
            name: "",
            type: "bar",
            itemStyle: {
              normal: {
                color: function (params) {
                  // 给出颜色组
                  var colorList = [
                    "#cca272",
                    "#74608f",
                    "#d7a02b",
                    "#c8ba23",
                    "#9bca63",
                    "#fe8463",
                    "#fcce10",
                    "#cca272",
                    "#74608f",
                    "#d7a02b",
                    "#c8ba23",
                    "#9bca63",
                    "#fe8463",
                    "#fcce10",
                    "#FF0099",
                    "#cca272",
                    "#74608f",
                    "#d7a02b",
                    "#c8ba23",
                    "#9bca63",
                    "#fe8463",
                    "#fcce10",
                    "#FF0099",
                    "#FF0099",
                    "#d8a056",
                    "#909399",
                    "#67C23A",
                    "#F56C6C",
                  ];
                  return colorList[params.dataIndex];
                },
              },
              label: {
                show: true, // 开启显示
                rotate: 70, // 旋转70度
                position: "top", // 在上方显示
                distance: 20, // 距离图形元素的距离。当 position 为字符描述值（如 'top'、'insideRight'）时候有效。
                verticalAlign: "middle",
                textStyle: {
                  // 数值样式
                  color: "black",
                  fontSize: 12,
                },
              },
            },
          },
        ],
      }),
        myChart1.on("click", function (params) {
          console.log(params);
          that.TimetableYU = that.TimetableYUData[params.dataIndex];
          var DataTime =
            that.begin.split("-")[0] +
            "-" +
            Number(params.name.split("")[0]) +
            "-1";
          that.SOSalesByArea(DataTime);
        });
      // 第二个
    },
    // 图 二
    drawLinerwo: function () {
      let that = this;
      let myChart2 = that.$echarts.init(document.getElementById("myChart2"));
      myChart2.off("click");
      myChart2.setOption({
        title: {
          text: that.TimetableYU + "月 " + that.ValueType + " 销售额",
          // subtext: "英之杰",
          x: "center",
        },
        color: [
          "#cca272",
          "#74608f",
          "#d7a02b",
          "#c8ba23",
          "#9bca63",
          "#fe8463",
          "#fcce10",
          "#FF0099",
          "#d8a056",
          "#909399",
          "#67C23A",
          "#F56C6C",
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: that.myChart2data,
        },
        series: [
          {
            name: "标题!",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],

            data: that.seriesdata,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
              },
            },
          },
        ],
      });
    },

    // 获取当月销售额详细比例
    SOSalesByArea: function (Type) {
      console.log("SOSalesByArea");
      var obj = {
        url: this.$store.state.http + "Statistic/SOSalesByArea",
        api: "get",
        data: {
          date: this.TimetableYU,
          cusType: this.CustomerType, //客户类型 宝马、保时捷.....
          brand: "",
          type: Type,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res.Data.StatDtos);
        var DataSta = res.Data.StatDtos;
        this.myChart2data = [];
        this.seriesdata = [];
        for (let index = 0; index < DataSta.length; index++) {
          this.myChart2data.push(DataSta[index].Key);
          this.seriesdata.push({
            value: DataSta[index].Value,
            name: DataSta[index].Key,
          });
        }
        console.log(this.myChart2data);
        this.drawLinerwo();
      });
    },
    // 下载明细
    Delwd: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "Statistic/SOSalesDetail",
        data: {
          begin: this.begin, //开始时间
          end: this.end, //结束时间
          cusType: this.CustomerType, //客户类型 宝马、保时捷.....
          area: this.area, //区域
          brand: this.Brandi, //品牌
        },
      };
      this.$https(obj).then((res) => {
        this.Data = res.Data.Dtos;
        console.log(this.Data);

        let that = this;
        setTimeout(function () {
          that.DekExcel1();
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
          "零配件销售额.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },

    transNum: function (a) {
      return a.replace(/^(\d+)(?:.(\d+))*eE(\d+)/, (_, a, a1, p, n) => {
        a1 = a1 || "";
        if (p === "-" && n > 0) {
          return "0." + "0".repeat(n - 1) + a + a1;
        } else {
          return (
            a +
            (a1.length > n
              ? a1.substr(0, n) + "." + a1.substr(n)
              : a1 + "0".repeat(n - a1.length))
          );
        }
      });
    },

    DekExcel1: function () {
      // 标题
      let TitStyle =
        "height:30px;line-height:30px;font-size:25px;padding-left:180px;box-sizing:border-box;font-weight:bolder;text-align:center;";

      // 标椎
      let bz = "height:30px;line-height:30px;";
      let bt1 = "width:400px;height:30px;line-height:30px;";
      let bt2 = "width:1000px;height:30px;line-height:30px;";

      // 字体
      let style = 'font-family: "宋体";border: 1px solid #333';
      let uri = "data:application/vnd.ms-excel;base64,";

      var T1 = ` <tr>    
                        <td colspan='7' style='${TitStyle}'>
                          <p>零配件部分</p>
                        </td>
                    </tr>`;
      var T2 = ` <tr>    
                        <td colspan='7' style='${TitStyle}'>
                          <p>差旅费部分</p>
                        </td>
                    </tr>`;
      var T3 = ` <tr>    
                        <td colspan='7' style='${TitStyle}'>
                          <p>维修费部分</p>
                        </td>
                    </tr>`;
      var Bt = `<tr>    
                        <td style='${bz}'>
                          <p>客户名称</p>
                        </td>
                         <td style='${bz}'>
                          <p>订单单号</p>
                        </td>
                         <td style='${bz}'>
                          <p>付款日期</p>
                        </td>
                         <td style='${bz}'>
                          <p>产品型号</p>
                        </td>
                         <td style='${bz}'>
                          <p>数量</p>
                        </td>
                         <td style='${bz}'>
                          <p>价格</p>
                        </td>
                         <td style='${bz}'>
                          <p>产品描述</p>
                        </td>
                    </tr>`;

      var Value = "";

      Value += T1;
      Value += Bt;

      for (let index = 0; index < this.Data[0].Dtos.length; index++) {
        const element = this.Data[0].Dtos[index];
        Value += `<tr>    
                        <td style='${bt1}'>
                          <p>${element.CusFullName}</p>
                        </td>
                         <td style='${bz}'>
                          <p>${element.Code}</p>
                        </td>
                         <td style='${bz}'>
                          <p>${element.Date.split("T")[0]}</p>
                        </td>
                        <td style='vnd.ms-excel.numberformat:@' style='${bz}'>
                          <p>${element.ProductCode + "\t"}</p>
                        </td>
                         <td style='${bz}'>
                          <p>${element.Number}</p>
                        </td>
                         <td style='${bz}'>
                          <p>${element.Price}</p>
                        </td>
                         <td style='${bt2}'>
                          <p>${element.ProDesc}</p>
                        </td>
                    </tr>`;
      }

      Value += T2;
      Value += Bt;

      for (let index = 0; index < this.Data[1].Dtos.length; index++) {
        const element = this.Data[1].Dtos[index];
        Value += `<tr>    
                        <td style='${bt1}'>
                          <p>${element.CusFullName}</p>
                        </td>
                         <td style='${bz}'>
                          <p>${element.Code}</p>
                        </td>
                         <td style='${bz}'>
                          <p>${element.Date.split("T")[0]}</p>
                        </td>
                        <td style='vnd.ms-excel.numberformat:@' style='${bz}'>
                          <p>${element.ProductCode + "\t"}</p>
                        </td>
                         <td style='${bz}'>
                          <p>${element.Number}</p>
                        </td>
                         <td style='${bz}'>
                          <p>${element.Price}</p>
                        </td>
                         <td style='${bt2}'>
                          <p>${element.ProDesc}</p>
                        </td>
                    </tr>`;
      }

      Value += T3;
      Value += Bt;

      for (let index = 0; index < this.Data[2].Dtos.length; index++) {
        const element = this.Data[2].Dtos[index];
        Value += `<tr>    
                        <td style='${bt1}'>
                          <p>${element.CusFullName}</p>
                        </td>
                         <td style='${bz}'>
                          <p>${element.Code}</p>
                        </td>
                         <td style='${bz}'>
                          <p>${element.Date.split("T")[0]}</p>
                        </td>
                        <td style='vnd.ms-excel.numberformat:@' style='${bz}'>
                          <p>${element.ProductCode + "\t"}</p>
                        </td>
                         <td style='${bz}'>
                          <p>${element.Number}</p>
                        </td>
                         <td style='${bz}'>
                          <p>${element.Price}</p>
                        </td>
                         <td style='${bt2}'>
                          <p>${element.ProDesc}</p>
                        </td>
                    </tr>`;
      }

      let template = `
			<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
			<head>
				<meta charset="utf-8">
			</head>
			<body>
                <table border=1 style="${style}">
                    ${Value}
                </table>
			</body>
			</html>`;
      var ele = document.createElement("a");
      ele.download = "销售额" + ".xls"; //下载文件的名字
      ele.href = uri + window.btoa(unescape(encodeURIComponent(template)));
      document.body.appendChild(ele);
      ele.click();
      document.body.removeChild(ele);
    },
  },
};
</script>
<style  scoped>
* {
  margin: none;
}

.box {
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 5px;
  overflow: auto;
}
.box::-webkit-scrollbar {
  display: none;
}
.box img {
  width: 600px;
  display: block;
  float: left;
}
#myChart1,
#myChart2,
#myChart3 {
  float: left;
}
</style>