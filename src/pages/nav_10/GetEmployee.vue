<template>
  <div class="Get-box">
    <!-- <router-view></router-view> -->
    <div class="TopSerch" style="height:120px;">
      <div class="jains">
        <el-select v-model="jiss.value0" size="mini" @change='retrieve' clearable placeholder="请选择区域">
          <el-option v-for="(item,index) in objetosArea.Data" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </div>
      <div class="jains">
        <el-select v-model="jiss.value1 " size="mini" @change='retrieve' clearable placeholder="请选择角色">
          <el-option :label="item.Name" v-for="(item,index) in MemberRole" :key="index" size="mini" :value="item.Id"></el-option>
        </el-select>
      </div>
      <div class="jains">
        <el-input class="jiss" size="mini" v-model="jiss.UserName" @change='retrieve' placeholder="UserName" clearable></el-input>
      </div>
      <div class="jains">
        <el-input class="jiss" size="mini" v-model="jiss.ChineseName" @change='retrieve' placeholder="ChineseName" clearable></el-input>
      </div>

      <el-button type="primary" icon="el-icon-search" class="jss" @click="retrieve" :loading="loading" size="mini">搜索</el-button>

      <el-button type="success" size="mini" @click="Registered" class="xinz">注册</el-button>
    </div>
    <!-- 展示 -->
    <el-table :data="tableData" highlight-current-row border style="width: 100%" size="mini" :header-cell-style="{background:'#e1e1e1'}">
      <el-table-column fixed prop="UserName" label="UserName"></el-table-column>
      <el-table-column prop="ServiceArea" label="ServiceArea"></el-table-column>
      <el-table-column prop="Department" label="Department"></el-table-column>
      <el-table-column prop="Roles" label="Roles"></el-table-column>
      <el-table-column prop="ChineseName" label="ChineseName"></el-table-column>
      <el-table-column prop="Position" label="Position"></el-table-column>
      <el-table-column prop="MobilePhone" label="MobilePhone"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <!-- 最后一格不给宽度，可自适应。给宽度后，屏宽过大会出现空白模块 -->
        <template slot-scope="scope">
          <el-switch @change="elswit(scope.row)" v-model="scope.row.Enable"></el-switch>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <!-- 最后一格不给宽度，可自适应。给宽度后，屏宽过大会出现空白模块 -->
        <template slot-scope="scope">
          <el-button type="primary" @click="ODBEditorBundleIdentifier(scope.row)" icon="el-icon-edit"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <nav style="text-align: center">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="this.$store.state.Vuex.pageSNumber" :page-size="100"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </nav>
  </div>
</template>
<script>
import $http from "axios";
export default {
  name: "GetEmployee",
  data() {
    return {
      loading: false, // 过渡
      token: localStorage.getItem("token"), // Token值
      tableData: [], //表格内容   注：必须为数组，不可为其他项
      jiss: {
        //检索的输入值
        ChineseName: "",
        UserName: "",
        value0: "",
        value1: "",
      }, //检索项 输入值
      pagec: 1, //当前页码
      pagesize: 10, //每页显示条数
      total: 0, //总条数
      objetosArea: [], //区域
      MemberRole: [], //角色
    };
  },
  created() {
    this.$$$http();
  },
  mounted() {
    this.$$$objetosArea();
    this.initialize();
  },
  methods: {
    ODBEditorBundleIdentifier(i) {
      this.$router.push({
        path: "/registeredstart",
        params: {
          name: "name",
        },
      });
      localStorage.setItem("Pagedata", JSON.stringify(i));
    },
    retrieve() {
      this.loading = true;
      this.initialize();
      console.log(this.jiss);
    },
    //注册
    Registered() {
      this.$router.push({ path: "/registeredstars" });
    },
    //按钮权限
    elswit(val) {
      console.log(val);
      $http
        .post(
          this.$store.state.httpurl + "User/EnableUserAsynv",
          {
            Id: val.Id,
          },
          {
            headers: {
              token: this.token,
            },
          }
        )
        .then((res) => {
          console.log(res);
        });
    },
    //分页站位
    handleSizeChange(val) {
      this.pagesize = val;
      $http
        .get(this.$store.state.httpurl + "User/GetEmployee", {
          params: {
            servicearea: this.jiss.value0,
            roleId: this.jiss.value1,
            username: this.jiss.UserName,
            chineseName: this.jiss.ChineseName,
            pageNum: this.pagec, //当前页码
            numPerPage: this.pagesize, //分页条数
            orderField: "",
            orderDirection: "",
          },
          headers: { Token: this.token }, //设置header信息
        })
        .then((res) => {
          this.tableData = JSON.parse(res.data).Data;
        });
    },
    handleCurrentChange(val) {
      this.pagec = val;
      $http
        .get(this.$store.state.httpurl + "User/GetEmployee", {
          params: {
            servicearea: this.jiss.value0,
            roleId: this.jiss.value1,
            username: this.jiss.UserName,
            chineseName: this.jiss.ChineseName,
            pageNum: this.pagec, //当前页码
            numPerPage: this.pagesize, //分页条数
            orderField: "",
            orderDirection: "",
          },
          headers: { Token: this.token }, //设置header信息
        })
        .then((res) => {
          this.tableData = JSON.parse(res.data).Data;
        });
    },
    //初始化
    initialize() {
      $http
        .get(this.$store.state.httpurl + "User/GetEmployee", {
          params: {
            servicearea: this.jiss.value0,
            roleId: this.jiss.value1,
            username: this.jiss.UserName,
            chineseName: this.jiss.ChineseName,
            pageNum: this.pagec, //当前页码
            numPerPage: this.pagesize, //分页条数
            orderField: "",
            orderDirection: "",
          },
          headers: { Token: this.token }, //设置header信息
        })
        .then((res) => {
          this.tableData = JSON.parse(res.data).Data;
          this.total = this.tableData.length;
          this.loading = false;
        });
    },
    //区域
    $$$objetosArea() {
      $http
        .get(this.$store.state.httpurl + "System/GetServiceAreas", {
          params: {},
          headers: { Token: this.token }, //设置header信息
        })
        .then((res) => {
          this.objetosArea = JSON.parse(res.data);
          // console.log(this.objetosArea);
        });
    },
    //角色
    $$$MemberRole() {
      $http
        .get(this.$store.state.httpurl + "System/GetDepartments", {
          params: {},
          headers: { Token: this.token }, //设置header信息
        })
        .then((res) => {
          this.MemberRole = JSON.parse(res.data);
          console.log(this.MemberRole);
        });
    },
    //调用
    $$$http() {
      $http
        .get(this.$store.state.http + "System/GetRoles", {
          params: {},
          headers: { Token: this.token }, //设置header信息
        })
        .then((res) => {
          this.MemberRole = JSON.parse(res.data).Data;
        });
    },
  },
};
</script>
<style src="../../assets/css/GetEmployee.css" scoped></style>