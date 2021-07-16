<template>
  <div class="box_s">
    <router-view @refresh="Suat"></router-view>
    <div class="dial" style="width:100%;height:350px" v-show="Dials">
      <div class="segmentation">选择客户</div>

      <div class="demo">
        <!-- 检索内容 -->
        <div>选择客户:</div>
        <el-select v-model="value" filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading" size="mini" style="width:300px" @change="CusiD">
          <el-option v-for="item in optionss" :key="item.CusId" :label="item.FullName" :value="item.CusId"></el-option>
        </el-select>
      </div>
      <div class="segmentation">选择类型</div>

      <!-- 选择任务类型 -->
      <div class="demo">
        <div>选择类型:</div>
        <el-select style="width:200px" v-model="stateType" placeholder="请选择任务类型" clearable size="mini">
          <el-option v-for="item in optionsType" :key="item.value" :label="item.Name" :value="item.value"></el-option>
        </el-select>
      </div>

      <!-- 添加设备 -->
      <div class="segmentation">选择设备
        <el-button type="primary" size="mini" style="float:right;" @click="addtProuder()">添加设备</el-button>

      </div>

      <div style="width:95%;margin:auto">
        <el-table :data="tableData" size="mini" :height="this.$store.state.TableOptimumHeight" highlight-current-row border style="width: 100%;marginTop:10px;float:left" :header-cell-style="{background:'#e1e1e1'}">
          <el-table-column fixed prop="Manufacturer" label="品牌" width="120"></el-table-column>
          <el-table-column fixed prop="Characteristics" label="描述" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column fixed prop="Unit" label="单位" width="80"></el-table-column>
          <el-table-column fixed label="数量" width="151">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.index" size="mini" :min="1" label="描述文字"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column fixed label="操作" width="151">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="deleteDD(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="segmentation">上传附件</div>

      <!-- 上传文件 -->
      <div class="dome2">
        <div class="leftdiv">上传文件：</div>
        <div class="rightdiv">
          <el-button type="text" size="mini">
            <label for="int">↑ 上传</label>
            <input id="int" type="file" ref="clearFile" @change="getFile($event)" style="margin-left:70px;display: none;" accept=".pdf" />
          </el-button>

          <div class="work" v-for="(itemwo,index) in UploadEquInstallOrderFile" :key="index">{{ index + ' - ' + itemwo.name}}</div>
        </div>
      </div>
      <el-button type="primary" size="mini" style="float:right;marginRight:30px" @click="addtrue()">创建</el-button>

    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      optionss: [], // 获取到的客户集合
      value: [], // 选择客户容器  闲置
      kehuCusiD: "",
      loading: false,
      UploadEquInstallOrderFile: [],
      stateType: 1,
      optionsType: [
        { Name: "整机安装", ID: 0, value: 1 },
        { Name: "零配件安装", ID: 0, value: 2 },
        { Name: "设备拆装服务", ID: 0, value: 3 },
      ], //状态选择
      tableData: [],
      Dials: true,
    };
  },
  created() {},
  components: {},
  watch: {
    $route(to, from) {
      if (to.path == "/AddOrderindex") {
        this.Dials = true;
      }
    },
  },
  methods: {
    //
    deleteDD: function (res) {
      console.log(res);
      for (let index = 0; index < this.tableData.length; index++) {
        const element = this.tableData[index];
        if (element.ID == res.ID) {
          this.tableData.splice(index, 1);
        }
      }
    },
    //
    Suat: function () {
      var Arrquipment = this.$store.state.Vuex.AddindexequipmentList;
      this.$store.state.Vuex.AddindexequipmentList = [];
      console.log(Arrquipment);
      if (this.tableData.length == 0) {
        this.tableData = Arrquipment;
        return false;
      }
      for (let index = 0; index < this.tableData.length; index++) {
        const element = this.tableData[index];
        if (element.ID == Arrquipment[0].ID) {
          return false;
        }
      }
      this.tableData.push(Arrquipment[0]);
    },

    // 添加设备
    addtProuder: function () {
      this.$router.push({
        path: "/Addindexequipment",
      });
      this.Dials = false;
    },
    // 确认添加事件
    addtrue: function () {
      console.log(this.kehuCusiD);
      console.log(this.stateType);
      console.log(this.UploadEquInstallOrderFile);
      console.log(this.tableData);
      //  首先注册任务
      //  成功回调后上传附件
      if (this.kehuCusiD == "") {
        this.$look("warning", "请选择客户！");
        return false;
      }
      // if (this.tableData.length == 0) {
      //   this.$look("warning", "请选择设备！");
      //   return false;
      // }
      var EquList = [];
      for (let index = 0; index < this.tableData.length; index++) {
        const element = this.tableData[index];
        EquList.push({
          ProductId: element.ID,
          Number: element.index,
        });
      }
      // 注册
      var obj = {
        api: "post",
        url: this.$store.state.http + "WO/CreateEquInstallOrder",
        data: {
          CusId: this.kehuCusiD,
          Type: this.stateType,
          EquList: EquList,
        },
      };
      this.$https(obj).then((res) => {
        // 检查是否上传附件
        if (this.UploadEquInstallOrderFile.length == 0) {
          this.$look("success", "消息！", "创建成功未上传附件！");
          this.UploadEquInstallOrderFile = [];
          this.kehuCusiD = "";
          this.$emit("refresh"),
            this.$router.push({
              path: "/Installationtask",
            });
          return false;
        }
        this.$look("success", "消息！", "创建成功正在上传附件！");
        // 开始上传附件
        this.UploadEquInstallOrderFilefunction(res.Data);
        this.$emit("refresh"),
          this.$router.push({
            path: "/Installationtask",
          });
      });
    },
    // 上传附件
    UploadEquInstallOrderFilefunction: function (res) {
      var indextrue = this.UploadEquInstallOrderFile.length;
      for (
        let index = 0;
        index < this.UploadEquInstallOrderFile.length;
        index++
      ) {
        var obj = {
          api: "post",
          url: this.$store.state.http + "WO/UploadEquInstallOrderFile",
          data: {
            Id: res,
            Str: this.UploadEquInstallOrderFile[index].base64,
            Type: this.UploadEquInstallOrderFile[index].type,
          },
        };
        this.$https(obj).then((res) => {
          indextrue -= 1;
          if (indextrue == 0) {
            this.$look("success", "消息！", "创建完成！");
            this.UploadEquInstallOrderFile = [];
            this.kehuCusiD = "";
            this.value = "";
          }
        });
      }
    },
    // 搜索客户
    remoteMethod(val) {
      console.log(val);
      if (val == "") {
        val = "北京";
      }
      this.loading = true;
      var obj = {
        api: "get",
        url: this.$store.state.http + "CRM/GetCustomerMini",
        data: {
          search: val,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.optionss = res.Data.Dtos;
        this.loading = false;
      });
    },
    // 当前选择客户iD
    CusiD: function (e) {
      console.log(e);
      this.kehuCusiD = e;
    },
    // 上传
    getFile(event) {
      var file = event.target.files;
      const inputFile = file[0];
      console.log(inputFile);
      var that = this;
      if (inputFile) {
        const reader = new FileReader();
        reader.readAsDataURL(inputFile);
        reader.onload = function (e) {
          var PDFbase64 = this.result;
          that.UploadEquInstallOrderFile.push({
            name: inputFile.name,
            base64: PDFbase64,
            type: "." + inputFile.type.split("/")[1],
          });
        };
      }
      console.log(that.UploadEquInstallOrderFile);
    },
  },
};
</script>

<style lang="scss" scoped>
.segmentation {
  width: 99%;
  height: 30px;
  border-bottom: 2px solid #ccc;
  line-height: 30px;
  padding-left: 20px;
  box-sizing: border-box;
  color: #09c;
  font-size: 13px;
  margin-top: 20px;
  font-weight: bold;
  float: left;
}
.demo {
  width: 450px;
  float: left;
  margin: 10px;
  div {
    width: 120px;
    float: left;
    text-align: right;
    padding-right: 10px;
    box-sizing: border-box;
    line-height: 28px;
    font-size: 14px;
  }
}
.dome2 {
  width: 99%;
  float: left;
  margin: 10px;
  .leftdiv {
    width: 120px;
    float: left;
    text-align: right;
    padding-right: 10px;
    // box-sizing: border-box;
    line-height: 28px;
    font-size: 14px;
  }
  .rightdiv {
    float: left;
    width: calc(100% - 150px);
  }
}
.work {
  color: #09c;
  line-height: 18px;
  margin-top: 10px;
}
</style>

