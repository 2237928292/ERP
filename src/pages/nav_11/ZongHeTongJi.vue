<template>
  <div class='box'>

    <el-card class="box-card">
      <div slot="header" class="clearfix" style="margin:-10px">
        <span>统计大包成本</span>
        <el-button style="float: right; padding: 3px 0" @click="DekExcel()" type="text">导出</el-button>
      </div>
      <div class="text item" style="margin:-10px;fontSize:12px">
        {{'请输入保养合同号:'}}
        <el-input v-model="Str" style="width:400px" size="mini" placeholder="请输入保养合同号"></el-input>

      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix" style="margin:-10px">
        <span>导出租赁工具</span>
        <el-button style="float: right; padding: 3px 0" @click="StatLeaseTools()" type="text">导出</el-button>
      </div>

    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix" style="margin:-10px">
        <span>导出实时库存</span>
        <el-button style="float: right; padding: 3px 0" @click="StatStock()" type="text">导出</el-button>
      </div>

    </el-card>

  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
export default {
  // 定义属性
  data() {
    return {
      // 导出大包
      Str: "",
      BaleTable: [],
      inchwellimg: require("../../assets/images/favicon.png"),
      // 查询实时租赁工具
      ToolsData: [],
      //   查询实时库存
      StockData: [],
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    //   金额格式化
    permil1: function (num) {
      var parts = num.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    },
    // 获取打包统计数据
    DekExcel: function () {
      var obj = {
        api: "post",
        url: this.$store.state.http + "Maintain/ASCostStat",
        data: {
          Str: this.Str,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);
        this.BaleTable = res.Data;
        this.DekExcel1();
      });
    },
    // 导出的打包统计
    DekExcel1: function () {
      // 标题
      let tiuelestyle =
        "width:165px;height:150px;line-height:120px;color:#0000ff;font-size:40px;padding-left:180px;box-sizing:border-box;font-family:宋体;font-weight:bolder;";
      // 标椎
      let wh = "width:165px;min-height:80px;line-height:50px;";
      //   序号
      let wh1 = "width:50px;min-height:80px;line-height:50px;";
      //   服务次数记录
      let w40 = "width:250px;min-height:40px;line-height:50px;";
      //   合同号
      let wh200 = "width:250px;min-height:80px;line-height:50px;";
      //   服务内容
      let wh400 = "width:400px;padding:30px 0 30px 0;box-sizing:border-box;";
      //   居中
      let tac = "text-align:center;";
      // 字体
      let fontST = 'font-family: "宋体";';
      let uri = "data:application/vnd.ms-excel;base64,";

      let title = "北京英之杰天祥汽车技术服务有限公司 ";
      let title2 =
        "Repair case for " +
        this.BaleTable.ContractNo +
        " in " +
        this.BaleTable.Begin.split("T")[0] +
        " to " +
        this.BaleTable.End.split("T")[0] +
        "";
      let mingxi = "上门总次数：" + this.BaleTable.ComeTotalDtos.TotalCount;
      let title2Style =
        "width:165px;height:70;background:#f60;line-height:70px;font-size:30px;text-align:center;font-weight:bolder;";
      let spanStyle = "font-family:none;font-size:30px;font-weight:bolder;";
      let Tr1 =
        "background:#ee0;font-weight:bolder;font-size:20px;height:100px;line-height:33px;";
      // 插入合同
      let mains = "";

      let mani = 0;
      let Cost = 0;
      for (
        let index = 0;
        index < this.BaleTable.ASCostStatPartDtos.length;
        index++
      ) {
        var row = this.BaleTable.ASCostStatPartDtos[index];
        mani += row.TotalPrice;
        Cost += row.TotalCost;

        var Detailstxt = "";

        for (let index = 0; index < row.Details.length; index++) {
          Detailstxt +=
            '<span style="color:#0000ff;" >' +
            (index + 1) +
            "</span>" +
            ".  " +
            row.Details[index] +
            "<br>";
        }

        mains += `
                    <tr>
                        <td style='${wh1 + tac}'>${index + 1}</td>
                        <td style='${wh200 + tac}'>${row.SOCode}</td>
                        <td style='${wh400}'>${Detailstxt}</td>
                         <td style='${wh + tac}'>${this.permil1(
          row.TotalCost
        )}</td>
                        <td style='${wh + tac}'>${this.permil1(
          row.TotalPrice
        )}</td>
                        <td style='${wh + tac}'>${row.ContactINF}</td>
                        <td style='${wh + tac}'>${
          row.Engineers == null ? " - " : row.Engineers
        }</td>
                        <td style='${wh + tac}'>${row.Remark}</td>
                    </tr>
                `;
      }

      mains += `
                    <tr>
                        <td  colspan='3' style='${wh + tac}' > TOTAL</td>
                        <td style='${wh + tac}'>${this.permil1(Cost)}</td>
                        <td style='${wh + tac}'>${this.permil1(mani)}</td>
                        <td style='${wh + tac}'></td>
                        <td style='${wh + tac}'></td>
                        <td style='${wh + tac}'></td>
                    </tr>
                `;
      //   插入上门记录
      let Smen = `
                    <tr>
                        <td  ></td>
                        <td style='${
                          w40 + tac + "color:#0000ff;"
                        }'>服务内容</td>
                        <td ></td>
                        <td ></td>
                        <td ></td>
                        <td ></td>
                        <td ></td>
                        <td ></td>
                    </tr>
                `;
      for (
        let index = 0;
        index < this.BaleTable.ComeTotalDtos.CountDetail.length;
        index++
      ) {
        var row = this.BaleTable.ComeTotalDtos.CountDetail[index];

        Smen += `
                    <tr>
                        <td ></td>
                        <td style='${w40 + tac}'>${row}</td>
                        <td ></td>
                        <td ></td>
                        <td ></td>
                        <td ></td>
                        <td ></td>
                        <td ></td>
                    </tr>
                `;
      }

      Smen += `
                    <tr>
                        <td ></td>
                        <td style='${
                          w40 + tac + "color:#0000ff;"
                        }'>服务人员</td>
                        <td ></td>
                        <td ></td>
                        <td ></td>
                        <td ></td>
                        <td ></td>
                        <td ></td>
                    </tr>
                `;

      for (
        let index = 0;
        index < this.BaleTable.ComeTotalDtos.EngineerDetail.length;
        index++
      ) {
        var row = this.BaleTable.ComeTotalDtos.EngineerDetail[index];

        Smen += `
                    <tr>
                        <td ></td>
                        <td style='${w40 + tac}'>${row}</td>
                        <td ></td>
                        <td ></td>
                        <td ></td>
                        <td ></td>
                        <td ></td>
                        <td ></td>
                    </tr>
                `;
      }

      let template = `
			<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
			<head>
				<meta charset="utf-8">
			</head>
			<body>
                <table border=1 style="${fontST}">
                    <tr>    
                    <img src="http://39.101.201.199:8005/images/inchwell.png" alt=""   />
                        <td colspan='8' style='${tiuelestyle}'>
                        <p>北京英之杰天祥汽车技术服务有限公司 <br> <span  style='${spanStyle}'> INCHWELL T & S (BEIJING) CO., LTD.</span> </p>
                       
                        </td>
                    </tr>


                    <tr>
                        <td colspan='8' style='${title2Style}'>${title2}</td>
                    </tr>

                    <tr >
                        <td style='${wh1 + tac + Tr1}'>序号 <br> PO.</td>
                        <td style='${
                          wh200 + tac + Tr1
                        }'>订单单号 <br> SOcode </td>
                        <td style='${wh + tac + Tr1}'>维修内容 <br> Details</td>
                        <td style='${
                          wh + tac + Tr1
                        }'>成本合计 <br> TotalCost</td>
                        <td style='${wh + tac + Tr1}'>合同金额 <br> TOTAL</td>
                        <td style='${
                          wh + tac + Tr1
                        }'>客户联系方式 <br> CONTACT INF.</td>
                         <td style='${
                           wh + tac + Tr1
                         }'>维修工程师 <br> ENGINEERS FOR REPAIRING</td>
                        <td style='${wh + tac + Tr1}'>备注 <br> REMARKS</td>
                    </tr>
                    ${mains}
                     <tr>
                        <td colspan='8' style='${title2Style}'>${mingxi}</td>
                    </tr>
                    ${Smen}


               

                </table>
			</body>
			</html>`;
      var ele = document.createElement("a");
      ele.download = title + ".xls"; //下载文件的名字
      ele.href = uri + window.btoa(unescape(encodeURIComponent(template)));
      document.body.appendChild(ele);
      ele.click();
      document.body.removeChild(ele);
    },

    // 查询实时租赁工具
    StatLeaseTools: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "Statistic/StatLeaseTools",
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);
        this.ToolsData = res.Data.Dtos;
        this.ExportTools();
      });
    },
    ExportTools: function () {
      //表头
      let bt = "width:165px;min-height:150px;line-height:150px;background:#ed7";

      // 标椎
      let wh = "width:180px;min-height:80px;line-height:50px;text-align:left;";

      let w99 = "width:1000px;min-height:80px;line-height:50px;";

      //   居中
      let tac = "text-align:center;";
      // 字体
      let fontST = 'font-family: "宋体";';
      let uri = "data:application/vnd.ms-excel;base64,";

      let Tr1 =
        "background:#ee0;font-weight:bolder;font-size:20px;height:100px;line-height:33px;";

      //
      let Smen = "";
      for (let index = 0; index < this.ToolsData.length; index++) {
        var row = this.ToolsData[index];

        Smen += `
                    <tr>
                        <td style='${wh}' >${row.ToolCode}</td>
                        <td style='${wh}' >${row.BMWCode}</td>
                        <td style='${wh}' >${row.StateStr}</td>
                        <td style='${wh}' >${row.Location}</td>
                        <td style='${wh}' >${row.Capital}</td>
                        <td style='${wh}' >${row.LeaseMoney}</td>
                        <td style='${wh}' >${row.GuZiCode}</td>
                        <td style='${wh}' >${row.Belong}</td>
                        <td style='${wh}' >${row.StorageDate}</td>
                        <td style='${w99}' >${row.Describe}</td>
                    </tr>
                `;
      }

      //    <td style='${w40 + tac}'>${row}</td>

      let template = `
			<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
			<head>
				<meta charset="utf-8">
			</head>
			<body>
                <table border=1 style="${fontST}">
                    <tr >
                        <td style='${bt + tac + Tr1}'>工具编号</td>
                        <td style='${bt + tac + Tr1}'>宝马工具编号</td>
                        <td style='${bt + tac + Tr1}'>状态</td>
                        <td style='${bt + tac + Tr1}'>仓库位置</td>
                        <td style='${bt + tac + Tr1}'>本金</td>
                        <td style='${bt + tac + Tr1}'>租赁费</td>
                        <td style='${bt + tac + Tr1}'>固资号</td>
                        <td style='${bt + tac + Tr1}'>所属</td>
                        <td style='${bt + tac + Tr1}'>入库日期</td>
                        <td style='${bt + tac + Tr1}'>描述</td>
                    </tr>
                  
                    ${Smen}


               

                </table>
			</body>
			</html>`;
      var ele = document.createElement("a");
      ele.download = "实时租赁工具.xls"; //下载文件的名字
      ele.href = uri + window.btoa(unescape(encodeURIComponent(template)));
      document.body.appendChild(ele);
      ele.click();
      document.body.removeChild(ele);
    },

    // 查询实时库存
    StatStock: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "Statistic/StatStock",
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);
        this.StockData = res.Data.StockDtos;
        this.ExportStockData();
      });
    },

    ExportStockData: function () {
      //表头
      let bt = "width:165px;min-height:150px;line-height:150px;background:#ed7";

      // 标椎
      let wh = "width:180px;min-height:80px;line-height:50px;text-align:left;";

      // 标椎
      let wh250 =
        "width:250px;min-height:80px;line-height:50px;text-align:left;";

      let w99 = "width:1000px;min-height:80px;line-height:50px;";

      //   居中
      let tac = "text-align:center;";
      // 字体
      let fontST = 'font-family: "宋体";';
      let uri = "data:application/vnd.ms-excel;base64,";

      let Tr1 =
        "background:#ee0;font-weight:bolder;font-size:20px;height:100px;line-height:33px;";

      //
      let Smen = "";
      for (let index = 0; index < this.StockData.length; index++) {
        var row = this.StockData[index];

        row.BarcodeMemo = "&nbsp;" + row.BarcodeMemo.toString();

        Smen += `
                    <tr>
                        <td style='${wh}' >${row.CodeMemo}</td>
                        <td style='${wh}' >${row.Number}</td>
                        <td style='${wh250}' >${row.ProductCode}</td>
                        <td style='${wh250}' >${row.BarcodeMemo}</td>
                        <td style='${wh}' >${row.BuyingUnitPrice}</td>
                        <td style='${wh}' >${row.BuyingCurrency}</td>
                        <td style='${wh}' >${row.UnitPrice}</td>
                        <td style='${w99}' >${row.Characteristics}</td>
                    </tr>
                `;
      }

      //    <td style='${w40 + tac}'>${row}</td>

      let template = `
			<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
			<head>
				<meta charset="utf-8">
			</head>
			<body>
                <table border=1 style="${fontST}">
                    <tr >
                        <td style='${bt + tac + Tr1}'>库位</td>
                        <td style='${bt + tac + Tr1}'>数量</td>
                        <td style='${bt + tac + Tr1}'>产品编码</td>
                        <td style='${bt + tac + Tr1}'>内部编码</td>
                        <td style='${bt + tac + Tr1}'>采购价</td>
                        <td style='${bt + tac + Tr1}'>采购价单位</td>
                        <td style='${bt + tac + Tr1}'>售出价</td>
                        <td style='${bt + tac + Tr1}'>产品描述</td>
                    </tr>
                  
                    ${Smen}


               

                </table>
			</body>
			</html>`;
      var ele = document.createElement("a");
      ele.download = "实时库存.xls"; //下载文件的名字
      ele.href = uri + window.btoa(unescape(encodeURIComponent(template)));
      document.body.appendChild(ele);
      ele.click();
      document.body.removeChild(ele);
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
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
.box {
  padding: 30px;
  box-sizing: border-box;
  .box-card {
    margin-top: 15px;
  }
}
</style>