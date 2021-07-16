<template>
  <div class="Get-box" id="uc-ap">
    <!-- 检索区域 -->
    <div class="TopSerch" style="width:90%;height:120px;">
      <div class="jains">
        <el-input class="jiss" size="mini" @change='jkjs' v-model="jiss.input0" placeholder="ActionName" clearable></el-input>
      </div>
      <div class="jains">
        <el-input class="jiss" size="mini" @change='jkjs' v-model="jiss.input1" placeholder="Controller" clearable></el-input>
      </div>
      <div class="jains">
        <el-input class="jiss" size="mini" @change='jkjs' v-model="jiss.input2" placeholder="Action" clearable></el-input>
      </div>
      <el-button type="primary" icon="el-icon-search" class="jss" @click="jkjs" size="mini" :loading="loading">搜索</el-button>

      <el-button type="success" size="mini" @click="dialogFormVisibleon" class="xinz">新增按钮</el-button>
    </div>
    <!-- 新增对话框 -->
    <el-dialog :title="this.Change" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="方法名称" :label-width="formLabelWidth">
          <el-input size="mini" v-model="form.ActionName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="控制器" :label-width="formLabelWidth">
          <el-input size="mini" v-model="form.Controller" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="方法" :label-width="formLabelWidth">
          <el-input size="mini" v-model="form.Action" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="参数" :label-width="formLabelWidth">
          <el-input size="mini" type="textarea" :rows="6" v-model="form.Parameters" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="请求类型" :label-width="formLabelWidth">
          <el-select v-model="form.RequestType" placeholder="请选择请求类型">
            <el-option label="GET" value="get"></el-option>
            <el-option label="POST" value="post"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input size="mini" type="textarea" autocomplete="off" :rows="2" v-model="form.Memo"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisiblefalse">取 消</el-button>
        <el-button type="primary" @click="dialogFormdata">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 展示 -->
    <el-table :data="tableData" size="mini" highlight-current-row border style="width: 100%" :header-cell-style="{background:'#e1e1e1'}">
      <el-table-column fixed prop="ActionName" label="ActionName"></el-table-column>
      <el-table-column prop="Controller" label="Controller"></el-table-column>
      <el-table-column prop="Action" label="Action"></el-table-column>
      <el-table-column prop="RequestType" label="RequestType"></el-table-column>
      <el-table-column prop="CreateTime" label="CreateTime"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <!-- 最后一格不给宽度，可自适应。给宽度后，屏宽过大会出现空白模块 -->
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" style="borderColor:#fff" icon="el-icon-edit" size="mini" @click="handleClickOut(scope.row)"></el-button>
            <el-button type="primary" style="background:#f44336c4;borderColor:#fff" icon="el-icon-delete" size="mini" @click="handleClickdel(scope.row)"></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <!--  -->

    <!-- 弹出层 -->
    <el-dialog :visible.sync="dialogTableVisible">
      <div class v-html="ttanchh"></div>
    </el-dialog>
    <!--  -->

    <!-- 分页 -->
    <nav style="text-align: center">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="this.$store.state.Vuex.pageSNumber" :page-size="100"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </nav>

    <!--  -->
  </div>
</template>
<script>
import $http from "axios";

export default {
  name: "GetApis",
  data() {
    return {
      tableData: [], //表格内容   注：必须为数组，不可为其他项
      ttanchh: "", //点击查看时弹出的内容
      dialogTableVisible: false, //查看弹窗的显示和隐藏
      loading: false, //检索进行时 button 过渡动画
      total: 0, //总条目数
      pagesize: 10, //每页显示条数
      dialogFormVisible: false, //新增接口
      formLabelWidth: "120px", //Element UI 默认样式
      isClear: false, //窗口
      detail: "",
      token: localStorage.getItem("token"), // Token值
      AdminEditViewModel: true,
      Change: "新增接口", //标题
      idAUTHORIZATIONACCOUNTID: "0000", //id
      pagec: 1,
      form: {
        //检索内容
        ActionName: "",
        Controller: "",
        Action: "",
        Parameters: "",
        RequestType: "",
        Memo: "",
      },
      jiss: {
        input0: "",
        input1: "",
        input2: "",
      }, //检索项 输入值
    };
  },
  //初始
  created() {
    this.$$$http();
  },
  methods: {
    //编辑弹出
    handleClickOut(row) {
      this.Change = "编辑接口";
      this.AdminEditViewModel = false;
      (this.idAUTHORIZATIONACCOUNTID = row.Id),
        (this.form.ActionName = row.ActionName),
        (this.form.Controller = row.Controller),
        (this.form.Action = row.Action),
        (this.form.Parameters = row.Parameters),
        (this.form.RequestType = row.RequestType),
        (this.form.Memo = row.Memo),
        (this.dialogFormVisible = true);
    },
    //新增
    dialogFormVisibleon() {
      this.Change = "新增接口";
      this.dialogFormVisible = true;
      this.dele(), (this.AdminEditViewModel = true);
    },
    //检索
    jkjs() {
      this.loading = true;
      this.$$$http();
    },
    //输入第几页
    handleCurrentChange(val) {
      this.pagec = val;
      this.$$$http();
    },
    // 切换 每页条数时触发  刷新
    handleSizeChange(val) {
      this.pagesize = val;
      this.$$$http();
    },
    //关闭表单
    dialogFormVisiblefalse() {
      this.dialogFormVisible = false;
    },
    //清空表单
    dele() {
      this.form.ActionName = "";
      this.form.Controller = "";
      this.form.Action = "";
      this.form.Parameters = "";
      this.form.RequestType = "";
      this.form.Memo = "";
    },
    //确认新增
    dialogFormdata() {
      if (this.AdminEditViewModel) {
        if (
          this.form.ActionName &&
          this.form.Controller &&
          this.form.Action &&
          this.form.Parameters &&
          this.form.RequestType
        ) {
          $http
            .post(
              this.$store.state.http + "System/AddApi",
              {
                ActionName: this.form.ActionName,
                Controller: this.form.Controller,
                Action: this.form.Action,
                Parameters: this.form.Parameters,
                RequestType: this.form.RequestType,
                Memo: this.form.Memo,
              },
              {
                headers: {
                  token: this.token,
                },
              }
            )
            .then((res) => {
              console.log(JSON.parse(res.data).Msg);
              if (JSON.parse(res.data).Msg == "2：已存在此接口") {
                this.$message({
                  message: "已存在此接口",
                  type: "warning",
                });
              } else {
                this.$$$http();
              }
            });
          this.dialogFormVisiblefalse();
        } else {
          alert("请输入完整");
        }
      } else {
        //确认编辑
        $http
          .post(
            this.$store.state.http + "System/UpdateApi",
            {
              ActionName: this.form.ActionName,
              Controller: this.form.Controller,
              Action: this.form.Action,
              Parameters: this.form.Parameters,
              RequestType: this.form.RequestType,
              Memo: this.form.Memo,
              Id: this.idAUTHORIZATIONACCOUNTID,
            },
            {
              headers: {
                token: this.token,
              },
            }
          )
          .then((res) => {
            this.dialogFormVisiblefalse();
            this.$$$http();
          });
      }
    },
    //删除
    handleClickdel(row) {
      this.idAUTHORIZATIONACCOUNTID = row.Id;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          $http
            .post(
              this.$store.state.http + "System/DelApi",
              {
                Id: this.idAUTHORIZATIONACCOUNTID,
              },
              {
                headers: {
                  token: this.token,
                },
              }
            )
            .then((res) => {
              this.$$$http();
            });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //刷新   封装函数
    $$$http() {
      $http
        .get("http://39.101.201.199:6006/api/" + "System/GetApis", {
          params: {
            ActionName: this.jiss.input0,
            controllername: this.jiss.input1,
            action: this.jiss.input2,
            pageNum: this.pagec, //当前页码
            numPerPage: this.pagesize, //分页条数
            orderField: "",
            orderDirection: "",
          },
          headers: { Token: this.token }, //设置header信息
        })
        .then((res) => {
          this.tableData = JSON.parse(res.data).Data.Apis;
          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i].CreateTime = this.tableData[i].CreateTime.split(
              "T"
            )[0]; //时间格式化
          }
          this.total = JSON.parse(res.data).Data.DataBars; // 信息总条数
          this.loading = false;
        });
    },
  },
};
</script>
<style src="../../assets/css/GetApis.css" scoped></style>