<template>
  <div class="box">
    <router-view @refresh="initdata"></router-view>
    <div class="TopSerch">
      <!-- 检索内容 -->
      <el-input style="width:193px" size="mini" v-model="search" @change="initdata()" placeholder="请输入客户名称、工程师"></el-input>

      <el-date-picker v-model="value1" type="datetimerange" size="mini" @change="pick" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" :default-time="['12:00:00']"></el-date-picker>

      <el-select style="width:140px" v-model="state" @change="initdata()" clearable size="mini" placeholder="请选择状态">
        <el-option v-for="item in options" :key="item.value" :label="item.Name" :value="item.value"></el-option>
      </el-select>
      <el-select style="width:120px" v-model="stateType" @change="initdata()" clearable size="mini" placeholder="请选择类型">
        <el-option v-for="item in optionsType" :key="item.value" :label="item.Name" :value="item.value"></el-option>
      </el-select>

      <!-- 选择区域 -->
      <el-select size="mini" style="width:120px" @change="initdata(1)" v-model="area" clearable placeholder="请选择区域">
        <el-option v-for="item in areaS" :key="item.Value + '1' " :label="item.Value" :value="item.Value"></el-option>
      </el-select>
      <!-- 选择品牌 -->
      <el-button @click="initdata()" :loading='this.$store.state.Vuex.loading' type="primary" size="mini">检索</el-button>

      <el-button type="success" style="float:right" @click="addbs()" size="mini">创建</el-button>
      <!-- 添加弹窗 -->
      <!-- 添加弹窗 -->
      <el-dialog title="创建任务" :visible.sync="dialogTableVisible" :before-close="handleClose">
        <div class="dial" style="width:100%;height:350px">
          <div class="demo">
            <!-- 检索内容 -->
            <div>选择客户:</div>
            <el-select v-model="value" filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading" size="mini" style="width:300px" @change="CusiD">
              <el-option v-for="item in optionss" :key="item.CusId" :label="item.FullName" :value="item.CusId"></el-option>
            </el-select>
          </div>
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
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisiblefalse()">取 消</el-button>
          <el-button type="primary" @click="addtrue()">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <!-- 表格 -->
    <!-- <div class="content"      style=" padding: 0px 25px;box-sizing: border;"> -->
    <el-table :data="Data" :height="this.$store.state.TableOptimumHeight" size="mini" highlight-current-row border style="width: 100%" :header-cell-style="{background:'#e1e1e1'}">
      <el-table-column prop="CreateDate" label="创建时间" width="100"></el-table-column>
      <!-- <el-table-column fixed prop="Name" label="姓名" width="150"></el-table-column> -->
      <!-- <el-table-column :show-overflow-tooltip="true" prop="Content" label="ID"></el-table-column> -->
      <el-table-column prop="Creater" label="创建者" width="80"></el-table-column>
      <el-table-column prop="OrderCode" label="任务编号" width="140"></el-table-column>

      <el-table-column prop="CusFullName" label="客户" :show-overflow-tooltip="true"></el-table-column>

      <el-table-column prop="TypeStr" label="任务类型" width="120"></el-table-column>

      <el-table-column prop="StateStr" label="当前状态" width="120"></el-table-column>

      <el-table-column prop="DeliveryDate" label="指派时间" width="100"></el-table-column>

      <el-table-column prop="ArriveDate" label="到达时间" width="100"></el-table-column>

      <el-table-column prop="CompleteDate" label="完成时间" width="100"></el-table-column>

      <el-table-column fixed="right" label="操作" width="150">
        <!-- 最后一格不给宽度，可自适应。给宽度后，屏宽过大会出现空白模块 -->
        <template slot-scope="scope">
          <el-button v-if="scope.row.State == 1" type="primary" size="mini" @click="lookitem(scope.row)">派送</el-button>
          <el-button v-if="scope.row.State == 1" type="warning" size="mini" @click="lookitem(scope.row)">撤单</el-button>
          <el-button v-if="scope.row.State != 1" type="info" size="mini" @click="lookitem(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- </div> -->

    <!-- 分页 -->

    <nav style="text-align: center">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="this.$store.state.Vuex.pageSNumber" :page-size="100"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </nav>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      pageNum: 1, //第几页
      pagesize: 10, //每页显示条数
      total: 0, //总条目数
      search: "", //检索项
      state: 0, // 状态
      begin: "", //开始时间
      end: "", //结束时间
      area: "",
      areaS: [],
      value1: "", //时间选择器 容器
      dialogTableVisible: false, //添加弹窗
      stateType: -1,
      Data: [],
      options: [
        { Name: "全部", ID: 0, value: 0 },
        { Name: "已创建任务", ID: 0, value: 1 },
        { Name: "已派送区域经理", ID: 0, value: 2 },
        { Name: "已指派工程师", ID: 0, value: 3 },
        { Name: "接接受任务", ID: 0, value: 4 },
        { Name: "已拒绝", ID: 0, value: 5 },
        { Name: "已发出", ID: 0, value: 6 },
        { Name: "已到达", ID: 0, value: 7 },
        { Name: "已结单", ID: 0, value: 8 },
      ], //状态选择
      optionsType: [
        { Name: "全部", ID: 0, value: -1 },
        { Name: "整机安装", ID: 0, value: 1 },
        { Name: "零配件安装", ID: 0, value: 2 },
        { Name: "设备拆装服务", ID: 0, value: 3 },
      ], //状态选择

      optionss: [], // 获取到的客户集合
      value: [], // 选择客户容器  闲置
      kehuCusiD: "",
      loading: false,
      UploadEquInstallOrderFile: [], //待上传的文件
    };
  },
  created() {
    this.initdata();
    this.initGetArea();
  },
  components: {},
  methods: {
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
    cheche: function (res) {
      console.log(res);
      var obj = {
        api: "post",
        url: this.$store.state.http + "WO/CancelEquInstallOrder",
        data: {
          Id: res.ID,
        },
      };
      this.$https(obj).then((res) => {
        this.initdata();
      });
    },
    //   ICMS.获取安装任务列表
    initdata: function () {
      var states = this.state;
      if (states == "") {
        states = 0;
      }

      var obj = {
        api: "get",
        url: this.$store.state.http + "WO/GetEquInstallOrders",
        data: {
          pageNum: this.pageNum,
          numPerPage: this.pagesize,
          orderField: "",
          orderDirection: "",
          type: this.stateType,
          search: this.search, //检索项
          state: states, // 状态
          begin: this.begin, //开始时间
          end: this.end, //结束时间
          area: this.area,
        },
      };
      this.$https(obj).then((res) => {
        this.Data = res.Data.Dtos;
        this.total = res.Data.DataBars;
        // 时间过滤
        for (let index = 0; index < this.Data.length; index++) {
          var Time = this.Data[index];
          Time.CreateDate = this.timeLv(Time.CreateDate);
          Time.DeliveryDate = this.timeLv(Time.DeliveryDate);
          Time.AcceptDate = this.timeLv(Time.AcceptDate);
          Time.GotoDate = this.timeLv(Time.GotoDate);
          Time.ArriveDate = this.timeLv(Time.ArriveDate);
          Time.CompleteDate = this.timeLv(Time.CompleteDate);
        }
      });
    },
    // 选择时间
    pick: function (val) {
      console.log(val);
      if (val == null) {
        this.begin = "";
        this.end = "";
      } else {
        this.begin = val[0];
        this.end = val[1];
      }
      this.initdata();
    },
    // 添加
    addbs: function () {
      // this.dialogTableVisible = true;
      this.$router.push({
        path: "/AddOrderindex",
      });
    },
    // 退出弹窗
    dialogTableVisiblefalse: function () {
      this.dialogTableVisible = false;
      this.UploadEquInstallOrderFile = [];
      this.kehuCusiD = "";
      this.value = "";
      //   this.deleteadddata();
    },
    // 二次确认
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          // 取消后同时清除创建和指派的窗口
          done(),
            (this.UploadEquInstallOrderFile = []),
            (this.kehuCusiD = ""),
            (this.value = "");
        })
        .catch((_) => {});
    },
    // 确认添加事件
    addtrue: function () {
      console.log(this.kehuCusiD);
      console.log(this.UploadEquInstallOrderFile);
      //  首先注册任务
      //  成功回调后上传附件
      if (this.kehuCusiD == "") {
        this.$look("warning", "请选择客户！");
      }
      // 注册
      var obj = {
        api: "post",
        url: this.$store.state.http + "WO/CreateEquInstallOrder",
        data: {
          CusId: this.kehuCusiD,
        },
      };
      this.$https(obj).then((res) => {
        // 检查是否上传附件
        if (this.UploadEquInstallOrderFile.length == 0) {
          this.$look("success", "消息！", "创建成功未上传附件！");
          this.dialogTableVisible = false;
          this.UploadEquInstallOrderFile = [];
          this.kehuCusiD = "";
          this.initdata();
          return false;
        }
        this.$look("success", "消息！", "创建成功正在上传附件！");
        // 开始上传附件
        this.UploadEquInstallOrderFilefunction(res.Data);
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
            this.dialogTableVisible = false;
            this.UploadEquInstallOrderFile = [];
            this.kehuCusiD = "";
            this.initdata();
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
    // 时间过滤
    timeLv: function (res) {
      if (res == null || res == "") {
        return " - - ";
      } else {
        return res.split("T")[0];
      }
    },
    // 底部分页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.initdata();
    },
    // 切换 每页条数时触发  刷新
    handleSizeChange(val) {
      this.pagesize = val;
      this.initdata();
    },
    // 派送区域经理
    psgcs: function (val) {
      console.log(val.ID);
      var obj = {
        api: "post",
        url: this.$store.state.http + "WO/SentManageEquInstallOrder",
        data: {
          id: val.ID,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.initdata();
      });
    },
    lookitem: function (data) {
      // 前往查看页面
      this.$store.state.InstallationtasklookID = data.ID;
      this.$store.state.InstallationtasklookIDState = data.State;
      this.$router.push({ path: "/Installationtasklook" });
    },
  },
};
</script>
<style lang="scss" scoped>
@import url("../../../../assets/scss/Tool_database.scss");
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
  width: 100%;
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
