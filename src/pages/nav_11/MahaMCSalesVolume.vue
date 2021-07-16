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

      <el-select size="mini" style="width:140px" @change="init(1)" v-model="mcType" clearable placeholder="请选择合同类型">
        <el-option v-for="item in mcTypes" :key="item + '4'" :label="item" :value="item"></el-option>
      </el-select>

      <el-button type="primary" size="mini" :loading="this.$store.state.Vuex.loading" style="float: right" @click="init()">检索</el-button>
    </div>

    <div id="myChart1" :style="{ width: '600px', height: '400px' }"></div>
    <div id="myChart2" :style="{ width: '480px', height: '320px' }"></div>

    <div style="width:80%;paddingBottom:5px;float:left;paddingLeft:50px;">
      <el-button type="primary" size="mini" style="float: left" @click="Delwd()">下载明细</el-button>
      <span style="  lineHeight: 28px;"> &nbsp;取值范围：付款日期在检索范围内的保养订单</span>
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
      msg: "赵鸿飞",

      area: "",
      areaS: [],

      Brandi: "Maha",

      CustomerType: "奥迪",
      mcType: "",
      mcTypes: ["MC", "AS"],
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
      // 当前选择总计
      ValueDataS: 0,
      // 销售额最多
      BIgtext: "",
      // 下载表格数据
      TableData: [],
      // 储存当前月份数组
      TimetableYUData: [],
    };
  },
  mounted() {
    this.init();
    this.initGetArea();
  },
  methods: {
    //  初始化
    init: function (isd) {
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
        url: this.$store.state.http + "Statistic/MCSalesVolume",
        data: {
          begin: this.begin, //开始时间
          end: this.end, //结束时间
          cusType: this.CustomerType, //客户类型 宝马、保时捷.....
          area: this.area, //区域
          brand: this.Brandi, //品牌
          mcType: this.mcType,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res.Data.StatDtos);
        this.TimeData = [];
        this.ValueData = [];
        this.ValueDataS = 0;
        var big = 0;
        var bigindex = "";
        this.TimetableYUData = [];
        var ydata = Number(this.begin.split("-")[0]);
        var ydati = Number(this.begin.split("-")[1]);

        for (let index = 0; index < res.Data.StatDtos.length; index++) {
          const element = res.Data.StatDtos[index].Key;
          const Valueli = res.Data.StatDtos[index].Value;

          // 展示数据 月份 and 数值
          this.TimeData.push(element);
          this.ValueData.push(Valueli);
          // 找出最高销售额
          this.ValueDataS += Number(Valueli);
          if (Valueli > big) {
            big = Valueli;
            bigindex = index;
          }
          if (ydati + index < 13) {
            this.TimetableYUData.push(ydata + "-" + (ydati + index));
          }
          if (ydati + index > 12 && ydati + index < 25) {
            this.TimetableYUData.push(ydata + 1 + "-" + (ydati + index - 12));
          }
          if (ydati + index > 24 && ydati + index < 37) {
            this.TimetableYUData.push(ydata + 2 + "-" + (ydati + index - 24));
          }
        }
        console.log(this.TimetableYUData);

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
            "年保养订单统计" +
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
    },
    // 图 二
    drawLinerwo: function () {
      let that = this;
      let myChart2 = that.$echarts.init(document.getElementById("myChart2"));
      myChart2.off("click");
      myChart2.setOption({
        title: {
          text: that.TimetableYU + "月保养客户签约比例",
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
    SOSalesByArea: function (DataTime) {
      console.log("SOSalesByArea");
      var obj = {
        url: this.$store.state.http + "Statistic/MCSalesByArea",
        api: "get",
        data: {
          date: this.TimetableYU,
          cusType: this.CustomerType, //客户类型 宝马、保时捷.....
          brand: "Maha",
          mcType: this.mcType,
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
        url: this.$store.state.http + "Statistic/MCSalesDetail",
        data: {
          begin: this.begin, //开始时间
          end: this.end, //结束时间
          cusType: this.CustomerType, //客户类型 宝马、保时捷.....
          area: this.area, //区域
          brand: "Maha", //品牌
          mcType: this.mcType,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);
        this.TableData = res.Data;
        let that = this;
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
          "保养销售额.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
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