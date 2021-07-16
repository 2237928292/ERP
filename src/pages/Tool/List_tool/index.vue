<template>
  <div class="box_s">
    <div class="topbut">
      <el-button type="success" style="background:#01000000;border:none;color:red" size="mini">
        <label for="int" @click="getFileTi()">↑ 上传文件</label>
        <input id="int" type="file" ref="referenceUpload" v-if="inputUp" @change="getFile($event)" style="margin-left:70px;display: none;" accept=".xlsx, .xls" />
      </el-button>

      <el-button type="success" style="float:right" size="mini" @click="UpStystm">上传系统</el-button>
    </div>

    <!--  -->
    <div class="content">
      <el-table :data="data" size="mini" :height="this.$store.state.TableOptimumHeight" highlight-current-row border style="width: 100%" :header-cell-style="{background:'#e1e1e1'}">
        <el-table-column fixed prop="xuhao" label="序号" width="70"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" fixed prop="工具编号" label="工具编号" width="150"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="详细编码" label="详细编码" width="120"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="工具描述" label="工具描述"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="单位" label="单位" width="120"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="销售单价" label="销售单价" width="120"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="标签" label="标签" width="120"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="设备分类" label="设备分类" width="120"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="校准" label="校准" width="80"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="可用状态" label="可用状态" width="80"></el-table-column>
      </el-table>
    </div>
    <div class="righterr">
      <p v-for="(item,index) in err" :key="index">{{item}}</p>
    </div>
    <div class="box_zhe" v-show="Zasozoa">
      <div class="xin">
        <el-progress type="circle" :percentage="percentage"></el-progress>
      </div>
    </div>

  </div>
</template>

<script>
import XLSX from "xlsx";

export default {
  props: {
    type: String,
    default: "选择excel文件",
  },
  name: "",
  data() {
    return {
      data: [],
      Zasozoa: false,
      percentage: 0, //上传百分百数值
      IfUpDataindex: 0,
      err: [],
      inputUp: true,
      UpIf: true,
    };
  },
  created() {},
  methods: {
    getFileTi: function () {},
    getFile(event) {
      var file = event.target.files;
      const inputFile = file[0];
      console.log(inputFile);
      this.exportData(inputFile);
      event.target.value = "";
    },
    btnClick() {
      document.querySelector(".input-file").click();
    },
    exportData(f) {
      const that = this;
      //   // 拿取文件对象
      // 用FileReader来读取
      var reader = new FileReader();
      // 重写FileReader上的readAsBinaryString方法
      FileReader.prototype.readAsBinaryString = function (f) {
        var binary = "";
        var wb; // 读取完成的数据
        var outdata; // 你需要的数据
        var reader = new FileReader();
        reader.onload = function (e) {
          // 读取成Uint8Array，再转换为Unicode编码（Unicode占两个字节）
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          // 接下来就是xlsx了，具体可看api
          wb = XLSX.read(binary, {
            type: "binary",
          });
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
          // 自定义方法向父组件传递数据
          console.log(outdata);
          that.data = outdata;

          for (let index = 0; index < that.data.length; index++) {
            const Dataindex = that.data[index];
            Dataindex["xuhao"] = index + 2;
          }
          that.ChinesetoEnglish(outdata);
          that.$emit("getResult", outdata);
        };
        reader.readAsArrayBuffer(f);
      };
      reader.readAsBinaryString(f);
    },
    // 将中文转义英文
    ChinesetoEnglish: function (res) {
      var xls = [];
    },

    //上传到系统
    UpStystm: function () {
      console.log(this.data);
      if (this.data.length == 0) {
        this.$look("error", "错误提示！", "未检测到数据！");
        return false;
      }
      var DataXls = [];
      // 将中文数据转为英译
      for (let index = 0; index < this.data.length; index++) {
        const xlsindex = this.data[index];
        var Dax = {
          ProductCode: xlsindex["工具编号"],
          ProductDesc: xlsindex["工具描述"],
          Unit: xlsindex["单位"],
          UnitPrice: xlsindex["销售单价"],
          ToolLabel: xlsindex["标签"],
          Enable: xlsindex["可用状态"],
          optionsRtext: xlsindex["设备分类"],
          Calibrations: xlsindex["校准"],
          ProductCodeDetail: xlsindex["详细编码"],
        };
        DataXls.push(Dax);
      }
      console.log(DataXls);
      // 判断数据无误
      this.UpIf = true;
      // var overTime = this.err
      for (let index = 0; index < DataXls.length; index++) {
        const xlsindex = DataXls[index];
        if (xlsindex.Enable == "可用" || xlsindex.Enable == "不可用") {
          if (xlsindex.Enable == "可用") {
            xlsindex["Enables"] = true;
          } else {
            xlsindex["Enables"] = false;
          }
        } else {
          this.err.unshift(
            "第" + (index + 1) + "条数据的（可用状态）有误！ \n"
          );
          this.UpIf = false;
        }
        if (xlsindex.Unit == "" || xlsindex.Unit == undefined) {
          this.err.unshift("第" + (index + 1) + "条数据的（单位）有误！ \n");
          this.UpIf = false;
        }
        if (xlsindex.ProductDesc == "" || xlsindex.ProductDesc == undefined) {
          this.err.unshift(
            "第" + (index + 1) + "条数据的（工具描述）有误！ \n"
          );
          this.UpIf = false;
        }
        if (xlsindex.ProductCode == "" || xlsindex.ProductCode == undefined) {
          this.err.unshift(
            "第" + (index + 1) + "条数据的（工具编号）有误！ \n"
          );
          this.UpIf = false;
        }
        // if (xlsindex.ToolLabel == "" || xlsindex.ToolLabel == undefined) {
        //   this.err.unshift("第" + (index + 1) + "条数据的（标签）有误！ \n")
        //    this.UpIf = false
        // }
        if (
          xlsindex.ProductCodeDetail == "" ||
          xlsindex.ProductCodeDetail == undefined
        ) {
          this.err.unshift(
            "第" + (index + 1) + "条数据的（详细编码）有误！ \n"
          );
          this.UpIf = false;
        }
        if (
          xlsindex.optionsRtext == "电子设备" ||
          xlsindex.optionsRtext == "机械设备"
        ) {
        } else {
          this.err.unshift(
            "第" + (index + 1) + "条数据的（设备分类）有误！ \n"
          );
          this.UpIf = false;
        }
        if (
          xlsindex.Calibrations == "需要" ||
          xlsindex.Calibrations == "不需要"
        ) {
          if (xlsindex.Calibrations == "需要") {
            xlsindex["Calibrationss"] = true;
          } else {
            xlsindex["Calibrationss"] = false;
          }
        } else {
          this.err.unshift("第" + (index + 1) + "条数据的（校准）有误！ \n");
          this.UpIf = false;
        }
      }

      if (this.UpIf == false) {
        this.err.unshift("--------------------------------------- \n");
        // this.$look("error", "错误提示！", errdata);
        return false;
      }

      // console.log(DataXls);
      this.Zasozoa = true;
      this.IfUpDataindex = 0;
      this.IfUpData(DataXls);
    },
    // 判断上传
    IfUpData: function (res) {
      // console.log(res.length,this.IfUpDataindex)
      if (res.length == this.IfUpDataindex) {
        this.Zasozoa = false;
        if (this.err == "") {
          this.$look(
            "success",
            "上传完成！",
            "所有数据已经上传成功，返回查看！"
          );
        } else {
          //  this.errdatd += this.err
          // this.$look("error", "错误提示！", this.err);
        }
      } else {
        this.UpDataList(res);
      }
    },
    UpDataList: function (DataList) {
      var index = Number(this.IfUpDataindex);
      // console.log(DataList[index])
      var obj = {
        data: {
          AssetsType: DataList[index].optionsRtext, //设备分类
          Calibration: DataList[index].Calibrationss, //是否需要校准
          ProductCodeDetail: DataList[index].ProductCodeDetail, // 详细编码
          ProductCode: DataList[index].ProductCode, //产品编号
          ProductDesc: DataList[index].ProductDesc, //产品描述
          Unit: DataList[index].Unit, //单位
          UnitPrice: DataList[index].UnitPrice, //销售单价(非必填项)
          ToolLabel: DataList[index].ToolLabel, //标签
          Enable: DataList[index].Enables, //可用性     bool
        },
        api: "post",
        url: this.$store.state.http + "CusTool/AddCusTool",
        header: this.$store.state.token,
      };
      this.$httpsUp(obj).then((res) => {
        if (res.Code == 2) {
          this.err.unshift(
            `第 ${this.IfUpDataindex + 2} 条数据上传失败, ${
              res.Msg.split("：")[1]
            }`
          );
        }
        // console.log(res)
        this.IfUpDataindex += 1;
        this.percentage = Number(
          ((this.IfUpDataindex / DataList.length) * 100).toFixed(2)
        );
        console.log(this.percentage);
        this.IfUpData(DataList);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("../../../assets/scss/Tool_database.scss");

.input-file {
  display: none;
}
.box_s {
  padding: 10px;
  box-sizing: border-box;
}
.box_zhe {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #0000003d;
  top: 0;
  left: 0;
  z-index: 100;
  .xin {
    width: 150px;
    height: 150px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
.topbut {
  width: 100%;
  float: left;
  // padding: 5px;
  box-sizing: border-box;
}
.content {
  width: calc(100% - 500px);
  float: left;
  padding: 5px;
  box-sizing: border-box;
}
.righterr {
  width: 500px;
  height: calc(100% - 200px);
  float: left;
  border: 0.5px solid #cccccc;
  box-sizing: border-box;
  border-radius: 10px;
  overflow: auto;
  padding: 10px;
  font-size: 13px;
  line-height: 20px;
  color: red;
}
.righterr::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.righterr::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2);
  background: #535353;
}
.righterr::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background: #ededed;
}
</style>
