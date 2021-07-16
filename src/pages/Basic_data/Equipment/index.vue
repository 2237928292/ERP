<template>
  <div class="box">
    <!-- toubu -->
    <div class="TopSerch">
      <el-select v-model="valueOne" clearable size="mini" @change="init" filterable placeholder="请选择供应商">
        <el-option v-for="item in DtoOne" :key="item.Id" :label="item.label" :value="item.Value">
        </el-option>
      </el-select>
      <el-select v-model="valueTwo" clearable size="mini" @change="init" filterable placeholder="请选择类型">
        <el-option v-for="item in DtoTwo" :key="item.Id" :label="item.label" :value="item.Value">
        </el-option>
      </el-select>
      <el-select v-model="valueThree" clearable size="mini" @change="init" filterable placeholder="请选择品牌">
        <el-option v-for="item in DtoThree" :key="item.Id" :label="item.label" :value="item.Value">
        </el-option>
      </el-select>
      <el-input style="width:180px" size="mini" @change="init" v-model="Search" placeholder="检索项 " clearable></el-input>

      <el-button type="primary" size="mini" :loading='this.$store.state.Vuex.loading' @click="init">检索</el-button>
      <el-button type="info" size="mini" style="float:right" @click="exportExcel">导出Excel</el-button>

      <el-button type="success" size="mini" style="float:right" @click="dialogVisible = true">添加</el-button>
    </div>
    <div class="content" style=" padding: 0px 25px;box-sizing: border;">
      <el-table id="out-table" :data="Data" :height="this.$store.state.TableOptimumHeight" size="mini" highlight-current-row border style="width: 100%" :header-cell-style="{background:'#e1e1e1'}">
        <el-table-column prop="One" label="第一级" width="80"></el-table-column>
        <el-table-column prop="Two" label="第二级" width="140"></el-table-column>
        <el-table-column prop="Three" label="第三级" width="120"></el-table-column>
        <el-table-column prop="ProeuctCode" label="产品编码" width="200"></el-table-column>
        <el-table-column prop="Brand" label="品牌" width="120"></el-table-column>
        <el-table-column prop="Desc" label="产品描述" :show-overflow-tooltip="true"></el-table-column>
      </el-table>
    </div>

    <el-dialog title="添加" :visible.sync="dialogVisible" width="500px" :before-close="handleClose">

      <div style="width:100%;margin:10px 0">
        <div style="width:130px;float:left;lineHeight:24px">请选择供应商:</div>
        <el-select v-model="valueOnes" clearable size="mini" filterable placeholder="请选择供应商">
          <el-option v-for="item in DtoOne" :key="item.Id" :label="item.Value" :value="item.Id">
          </el-option>
        </el-select>
      </div>

      <div style="width:100%;margin:10px 0">
        <div style="width:130px;float:left;lineHeight:24px">请选择类型:</div>
        <el-select v-model="valueTwos" clearable size="mini" filterable placeholder="请选择类型">
          <el-option v-for="item in DtoTwo" :key="item.Id" :label="item.Value" :value="item.Id">
          </el-option>
        </el-select>
      </div>

      <div style="width:100%;margin:10px 0">
        <div style="width:130px;float:left;lineHeight:24px">请选择品牌:</div>
        <el-select v-model="valueThrees" clearable size="mini" filterable placeholder="请选择品牌">
          <el-option v-for="item in DtoThree" :key="item.Id" :label="item.Value" :value="item.Id">
          </el-option>
        </el-select>
      </div>

      <div style="width:100%;margin:10px 0">
        <div style="width:130px;float:left;lineHeight:24px">请输入产品编码:</div>
        <el-input size="mini" style="width:193px" clearable placeholder="请输入产品编码" v-model="ProeuctCodeINput"></el-input>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="deletes()">取 消</el-button>
        <el-button type="primary" :loading='this.$store.state.Vuex.loading' @click="Add()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      loading: false,
      value: "",
      Data: [],
      valueOne: "",
      valueTwo: "",
      valueThree: "",
      DtoOne: [],
      DtoTwo: [],
      DtoThree: [],
      dialogVisible: false,
      valueOnes: "",
      valueTwos: "",
      valueThrees: "",
      ProeuctCodeINput: "",
      butling: false,
      Search: "",
    };
  },
  created() {
    this.init();
    this.initeacth();
  },

  methods: {
    init: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "Product/GetEquType",
        data: {
          one: this.valueOne,
          two: this.valueTwo,
          three: this.valueThree,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res.Data.Dtos);
        if (this.Search == "") {
          this.Data = res.Data.Dtos;
        } else {
          var Data2 = res.Data.Dtos;
          var DataInit = [];
          for (let index = 0; index < Data2.length; index++) {
            const element = Data2[index];
            for (var ins in element) {
              if (element[ins].indexOf(this.Search) != -1) {
                DataInit.push(element);
                break;
              }
            }
          }
          this.Data = DataInit;
        }
      });
    },
    initeacth: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "Product/GetProductType12",
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.DtoOne = res.Data.DtoOne;
        this.DtoTwo = res.Data.DtoTwo;
        this.DtoThree = res.Data.DtoThree;
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
          this.deletes();
        })
        .catch((_) => {});
    },
    Add: function () {
      console.log(this.valueOnes);

      if (this.valueOnes == "") {
        this.$look("warning", "警告！", "请选择供应商！");
        return false;
      }
      if (this.valueTwos == "") {
        this.$look("warning", "警告！", "请选择类型！");
        return false;
      }
      if (this.valueThrees == "") {
        this.$look("warning", "警告！", "请选择品牌！");
        return false;
      }
      if (this.ProeuctCodeINput == "") {
        this.$look("warning", "警告！", "请输入产品编码！");
        return false;
      }

      this.butling = false;

      var obj = {
        api: "post",
        url: this.$store.state.http + "Product/AddEquType",
        data: {
          one: this.valueOnes,
          two: this.valueTwos,
          three: this.valueThrees,
          ProeuctCode: this.ProeuctCodeINput,
        },
      };
      this.$https(obj).then((res) => {
        this.butling = true;
        this.deletes();
        this.$look("success", "成功！", "添加成功！");
      });
    },
    deletes: function () {
      this.dialogVisible = false;
      (this.valueOnes = ""),
        (this.valueTwos = ""),
        (this.valueThrees = ""),
        (this.ProeuctCodeINput = "");
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
          "设备分类.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
  },
};
</script>
<style>
</style>