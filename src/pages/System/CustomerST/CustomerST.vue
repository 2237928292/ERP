<template>
  <div class="box">

    <!-- 头部检索 -->
    <div class="TopSerch">
      <!-- 检索内容 -->
      <el-input style="width:193px" size="mini" v-model="search" @change="init(1)" clearable placeholder="请输入内容"></el-input>

      <el-select size="mini" style="width: 120px" @change="init(1)" v-model="area" clearable placeholder="请选择区域">
        <el-option v-for="item in areaS" :key="item.Value" :label="item.Value" :value="item.Value"></el-option>
      </el-select>

      <!-- 客户类型 -->
      <el-select size="mini" style="width:120px" @change="init(1)" v-model="CustomerType" clearable placeholder="请选择客户类型">
        <el-option v-for="item in this.$store.state.Vuex.CustomerTypes" :key="item + '2'" :label="item" :value="item"></el-option>
      </el-select>

      <el-button type="warning" style="float:right" size="mini" @click="warn()">回访预警</el-button>

      <el-button type="primary" size="mini" :loading='this.$store.state.Vuex.loading' @click="init()">检索</el-button>
    </div>

    <!-- 表格 -->
    <div class="content" style=" padding: 0px 25px;box-sizing: border-box;">
      <el-table :data="Data" :max-height="this.$store.state.TableOptimumHeight" size="mini" highlight-current-row border style="width: 100%" :header-cell-style="{background:'#e1e1e1'}">
        <el-table-column :show-overflow-tooltip="true" prop="CusFullName" label="客户"></el-table-column>
        <!-- <el-table-column fixed prop="Name" label="姓名" width="150"></el-table-column> -->
        <!-- <el-table-column :show-overflow-tooltip="true" prop="Content" label="ID"></el-table-column> -->
        <el-table-column prop="LimitDate" label="剩余时间" width="120"></el-table-column>
        <el-table-column prop="EarlyWarning" label="预警时间" width="120"></el-table-column>
        <el-table-column prop="LastVisit" label="最后访问" width="120"></el-table-column>
        <el-table-column prop="Cycle" label="周期" width="120"></el-table-column>
        <el-table-column prop="Characteristics" label="类型" width="120"></el-table-column>
      </el-table>
    </div>

    <!-- 预警弹窗 -->

    <el-dialog title="回访预警" :visible.sync="dialogTableVisible" :before-close="handleClose">
      <div class="dial" style="width:100%;height:300px;overflow:auto;marginTop:0px">
        <div class="div" v-for="(item,index) in Datas" :key="index">
          <h4 style="marginBottom:10px">{{item.Name +  '----'  + item.Mobile}}</h4>
          <div v-for="(items,indexs) in item.list" :key="indexs">{{items}}</div>
          <!-- <span v-for="(items,indexs) in item.list" :key="indexs">{{items}}</span> -->
        </div>

      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogTableVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pagesize: 10, //每页显示条数
      pageNum: 1, //当前页码
      search: "", //检索内容
      total: 0,
      Data: [], //总数据
      dialogTableVisible: false,
      Datas: [],
      areaS: [],
      CustomerType: "",
      area: "",
    };
  },
  created() {
    this.init();
    this.initGetArea();
  },
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
    init: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "System/GetReturnVisit",
        data: {
          search: this.search, //检索项
          area: this.area,
          custype: this.CustomerType,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.total = res.Data.length;
        this.Data = res.Data;
      });
    },

    // 回访预警
    warn: function () {
      var obj = {
        api: "post",
        url: this.$store.state.http + "System/UrgeReturnVisit",
      };
      this.$https(obj).then((res) => {
        this.dialogTableVisible = true;
        this.Datas = res.Data.Dtos;
        for (var i = 0; i < this.Datas.length; i++) {
          this.Datas[i]["list"] = this.Datas[i].Content.split("，");
        }
        console.log(this.Datas);
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
          this.deleteadddata();
        })
        .catch((_) => {});
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