<template>
  <div class="box">
    <div class="TopSerch" style="width:100%;">
      <el-select size="mini" v-model="jiss.from" @change="getsearchsense" clearable placeholder="请选择角色">
        <el-option :label="item.Name" v-for="(item,index) in MemberRole" :key="index" :value="item.ID"></el-option>
      </el-select>
      <el-input style="width:193px" size="mini" v-model="jiss.input0" @change="getsearchsense" clearable placeholder="Controller "></el-input>
      <el-input style="width:193px" size="mini" v-model="jiss.input1" @change="getsearchsense" clearable placeholder="Action"></el-input>

      <el-button type="primary" icon="el-icon-search" size="mini" @click="getsearchsense" :loading="loading">搜索</el-button>
      <el-button type="success" icon="el-icon-search" style="float:right" size="mini" @click="addclick" :loading="loading">添加</el-button>
      <el-button size="mini" @click="forfinishing" type="success" icon="el-icon-refresh" :loading="loadingindex" circle></el-button>
    </div>

    <el-table size="mini" :data="IsIntegerList" :height="this.$store.state.TableOptimumHeight" highlight-current-row border style="width: 100%" :header-cell-style="{background:'#e1e1e1'}">
      <el-table-column fixed prop="RoleName" label="RoleName"></el-table-column>
      <el-table-column prop="Controller" label="Controller"></el-table-column>
      <el-table-column prop="Action" label="Action"></el-table-column>
      <el-table-column prop="ActionName" label="ActionName"></el-table-column>
      <el-table-column fixed="right" label="Enable">
        <!-- 最后一格不给宽度，可自适应。给宽度后，屏宽过大会出现空白模块 -->
        <template slot-scope="scope">
          <el-switch @change="elswit(scope.row)" v-model="scope.row.Enable"></el-switch>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <nav style="text-align: center">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="this.$store.state.Vuex.pageSNumber" :page-size="100"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </nav>

    <!--  -->

    <!-- 添加 -->
    <el-dialog title="添加权限" :visible.sync="diaing" :before-close="handleClose">
      <el-select size="mini" style="width:150px" v-model="RoleId" placeholder="请选择意见类型">
        <el-option v-for="item in MemberRole" :key="item.ID" :label="item.Name" :value="item.ID"></el-option>
      </el-select>
      <div class="tablediv">
        <div class="leftdiv">控制器</div>
        <div class="rightdiv">
          <el-input size="mini" v-model="Controller"></el-input>
        </div>
      </div>

      <div class="tablediv">
        <div class="leftdiv">方法</div>
        <div class="rightdiv">
          <el-input size="mini" v-model="Action"></el-input>
        </div>
      </div>

      <el-input type="textarea" style="marginTop:20px" min-height="30px" :autosize="{ minRows: 2, maxRows: 8}" placeholder="请输入描述" v-model="Content"></el-input>

      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="delefalde">取 消</el-button>
        <el-button type="primary" size="mini" @click="addtrue">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import $http from "axios";
export default {
  name: "GetPermis",
  data() {
    return {
      msg: "权限列表",
      areafunction: "",
      MemberRole: "",
      token: localStorage.getItem("token"), // Token值
      jiss: {
        input0: "",
        input1: "",
        from: "",
      }, //检索项 输入值,
      loading: false,
      loadingindex: true,
      pagesize: 10,
      pagec: 1,
      IsIntegerList: [],
      total: 0, //总条目数
      diaing: false,
      RoleId: "",
      Content: "", //描述
      Controller: "", //控制器
      Action: "", //方法
    };
  },
  created() {
    this.$$$http(this.$store.state.http + "System/GetRoles", this.MemberRole); //角色
    this.$$http();
  },
  mounted() {
    $http
      .get(this.$store.state.http + "System/GetRoles", {
        params: {},
        headers: { Token: this.token }, //设置header信息
      })
      .then((res) => {
        this.MemberRole = JSON.parse(res.data).Data;
        console.log(this.MemberRole);
      });
  },
  methods: {
    delefalde: function () {
      this.diaing = false;
      this.RoleId = "";
      this.Content = "";
      this.Action = "";
      this.Controller = "";
    },
    addtrue: function () {
      if (this.RoleId == "") {
        this.$msgnow("warning", "请选择类型！");
        return false;
      }

      if (this.Controller == "") {
        this.$msgnow("warning", "请输入控制器！");
        return false;
      }

      if (this.Action == "") {
        this.$msgnow("warning", "请输入方法！");
        return false;
      }

      if (this.Content == "") {
        this.$msgnow("warning", "请输入备注！");
        return false;
      }

      var obj = {
        api: "post",
        url: this.$store.state.http + "System/AddPermiss",
        data: {
          RoleId: this.RoleId,
          Controller: this.Controller,
          Action: this.Action,
          Desc: this.Content,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.$$http();
        this.delefalde();
      });

      // this.RoleId    //id
      // this.Content   //备注
      // this.Controller  // 控制器
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
          this.delefalde();
        })
        .catch((_) => {});
    },
    addclick: function () {
      this.diaing = true;
    },
    // 切换 每页条数时触发  刷新
    handleSizeChange(val) {
      this.pagesize = val;
      this.$$http();
    },
    //输入第几页
    handleCurrentChange(val) {
      console.log(val);
      this.pagec = val;
      this.$$http();
    },
    //按钮权限
    elswit(val) {
      $http
        .post(
          this.$store.state.http + "System/EnablePermis",
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
    //检索
    getsearchsense() {
      this.loading = true;
      this.$$http();
    },
    //刷新
    forfinishing() {
      this.loadingindex = true;
      this.$$$httsp(this.$store.state.http + "System/ArrangePermis");
    },
    //列表
    $$http() {
      $http
        .get(this.$store.state.http + "System/GetPermis", {
          params: {
            roleId: this.jiss.from,
            contrall: this.jiss.input0,
            action: this.jiss.input1,
            pageNum: this.pagec,
            numPerPage: this.pagesize,
            orderField: "",
            orderDirection: "",
          },
          headers: { Token: this.token }, //设置header信息
        })
        .then((res) => {
          this.IsIntegerList = JSON.parse(res.data).Data.Dtos;
          this.total = JSON.parse(res.data).Data.DataBars;
          this.loading = false;
        });
    },
    //调用
    $$$http(url, ad) {
      $http
        .get(url, {
          params: {},
          headers: { Token: this.token }, //设置header信息
        })
        .then((res) => {
          ad = JSON.parse(res.data);
          this.loadingindex = false;
        });
    },
    $$$httsp(url, ad) {
      $http
        .post(url, {
          params: {},
          headers: { Token: this.token }, //设置header信息
        })
        .then((res) => {
          ad = JSON.parse(res.data);
          this.loadingindex = false;
        });
    },
  },
};
</script>
<style src="../../assets/css/GetPermis.css" scoped></style>