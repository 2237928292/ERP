<template>
  <div class="box">
    <!-- 头部检索 -->
    <div class="TopSerch">
      <!-- 检索内容 -->
      <el-input style="width:193px" size="mini" v-model="search" @change="init()" placeholder="请输入内容" clearable></el-input>
      <!-- 类型选择项 -->
      <el-select size="mini" style="width:120px" @change="init()" v-model="type" placeholder="请选择类型" clearable>
        <el-option v-for="item in types" :key="item.index" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <!-- 状态选择项 -->
      <el-select size="mini" style="width:120px" @change="init()" v-model="state" placeholder="请选择状态" clearable>
        <el-option v-for="item in status" :key="item.index" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-button type="primary" :loading='this.$store.state.Vuex.loading' size="mini" @click="init()">检索</el-button>
      <el-button type="success" style="float:right;" size="mini" @click="diaing = true">添加</el-button>

      <!-- 提出意见 -->
      <el-dialog title="提出意见" :visible.sync="diaing" :before-close="handleClose">
        <el-select size="mini" style="width:150px" v-model="UpdaterType" placeholder="请选择意见类型">
          <el-option v-for="item in types" :key="item.index" :label="item.label" :value="item.value"></el-option>
        </el-select>

        <el-input type="textarea" style="marginTop:20px" min-height="30px" :autosize="{ minRows: 2, maxRows: 8}" placeholder="请输入内容" v-model="Content"></el-input>

        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="deleteadddata()">取 消</el-button>
          <el-button type="primary" size="mini" @click="addtrue()">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <!-- 列表操作 -->
    <div class="content">
      <el-table :data="Data" size="mini" :height="this.$store.state.TableOptimumHeight" highlight-current-row border style="width: 100%" :header-cell-style="{background:'#e1e1e1'}">
        <el-table-column fixed prop="Creater" label="提议者" width="150"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="Content" label="意见"></el-table-column>
        <el-table-column prop="UpdaterStateStr" label="意见状态" width="120"></el-table-column>
        <el-table-column prop="UpdaterTypeStr" label="意见类型" width="120"></el-table-column>
        <el-table-column prop="CreateDate" label="提议时间" width="120"></el-table-column>

        <el-table-column prop="BeginDate" label="开始时间" width="120"></el-table-column>
        <el-table-column prop="CompleteDate" label="完成时间" width="120"></el-table-column>

        <el-table-column fixed="right" label="审核" width="120">
          <!-- 最后一格不给宽度，可自适应。给宽度后，屏宽过大会出现空白模块 -->
          <template slot-scope="scope">
            <el-button-group>
              <el-button v-if="scope.row.UpdaterState == 1" type="primary" size="mini" @click="SHContent(scope.row)">审核</el-button>
              <el-button v-if="scope.row.UpdaterState == 2" type="primary" size="mini" @click="SHContent(scope.row)">开始研发</el-button>
              <el-button v-if="scope.row.UpdaterState == 3" type="primary" size="mini" @click="SHContent(scope.row)">完成</el-button>
              <el-button v-if="scope.row.UpdaterState == 4 || scope.row.UpdaterState == 5" type="primary" size="mini" @click="SHContent(scope.row)">查看</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 审核弹窗 -->
    <el-dialog title="审核意见" :visible.sync="diaingSH" :before-close="handleCloseSH">
      <!--  -->
      <el-input placeholder="请输入内容" size="mini" :disabled="true" v-model="SHitem.Creater">
        <template slot="prepend">提议者:</template>
      </el-input>
      <span style="line-height:30px;  font-size: 13px;">意见详情：</span>
      <el-input type="textarea" style="marginTop:0px" min-height="30px" :autosize="{ minRows: 2, maxRows: 8}" placeholder="请输入内容" v-model="SHitem.Content" :disabled="true"></el-input>
      <span v-if="SHitem.RefuseMsg != null" style="line-height:30px;font-size: 13px;">拒绝原因：</span>
      <el-input type="textarea" style="marginTop:0px" v-if="SHitem.RefuseMsg != null" min-height="30px" :autosize="{ minRows: 2, maxRows: 8}" placeholder="请输入内容" v-model="SHitem.RefuseMsg" :disabled="true"></el-input>

      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="diaingSH = false">取 消</el-button>
        <el-button v-if="SHitem.UpdaterState == 1" type="danger" size="mini" @click="Shtrue(2,2)">审核不通过</el-button>
        <el-button v-if="SHitem.UpdaterState == 1" type="primary" size="mini" @click="Shtrue(1,2)">审核通过</el-button>
        <el-button v-if="SHitem.UpdaterState == 2" type="primary" size="mini" @click="Shtrue(1,3)">开始研发</el-button>
        <el-button v-if="SHitem.UpdaterState == 3" type="primary" size="mini" @click="Shtrue(1,4)">完成</el-button>
        <!-- <el-button v-if="SHitem.UpdaterState == 4" type="primary" size="mini" @click="Shtrue('x')">查看</el-button> -->
        <!-- 
             当前 待审核PendingReview = 1,  审核 ->2----------传是否采纳
        当前 已审核Reviewed = 2,       开始研发 ->3
        当前 研发中Building = 3,       完成 ->4
        当前 已完成Completed = 4       查看
        -->
      </span>
    </el-dialog>

    <!--  -->
    <nav style="text-align: center">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="this.$store.state.Vuex.pageSNumber" :page-size="100"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </nav>
  </div>
</template>
<script>
export default {
  // 系统维护主页面
  data() {
    return {
      Data: [], //数据
      total: 0, //总条目数
      pagesize: 10, //每页显示条数
      pageNum: 1, //当前页码
      search: "", //检索内容
      type: "", //检索类型
      state: "", //检索状态
      types: [
        { label: "工程师App", value: 1, index: 1 },
        { label: "客户端App", value: 2, index: 2 },
        { label: "电脑端网站", value: 3, index: 3 },
        { label: "其它", value: 4, index: 4 },
      ], //类型可选项

      status: [
        { label: "等待审核", value: 1, index: 1 },
        { label: "已审核", value: 2, index: 2 },
        { label: "研发中", value: 3, index: 3 },
        { label: "已完成", value: 4, index: 4 },
        { label: "未采纳", value: 5, index: 5 },
      ], //状态可选项
      diaing: false, //意见窗的状态
      diaingSH: false, //审核意见弹窗状态
      UpdaterType: "", //提出的意见类型
      Content: "", //提出的意见内容
      SHitem: {}, //正在审核的内容
    };
  },
  created() {
    this.init();
  },

  methods: {
    // 初始化
    init: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "System/GetITUpdaterRec",
        data: {
          search: this.search, //检索项
          type: this.type, // 类型
          state: this.state, // 状态
          pageNum: this.pageNum,
          numPerPage: this.pagesize,
          orderField: "",
          orderDirection: "",
        },
      };
      this.$https(obj).then((res) => {
        this.total = res.Data.DataBars;
        this.Data = res.Data.Dtos;
        for (var i = 0; i < this.Data.length; i++) {
          this.Data[i].CreateDate = this.Data[i].CreateDate.split("T")[0];

          if (this.Data[i].BeginDate != null) {
            this.Data[i].BeginDate = this.Data[i].BeginDate.split("T")[0];
          } else {
            this.Data[i].BeginDate = "   -   -";
          }

          if (this.Data[i].CompleteDate != null) {
            this.Data[i].CompleteDate = this.Data[i].CompleteDate.split("T")[0];
          } else {
            this.Data[i].CompleteDate = "   -   -";
          }
        }
        console.log(res.Data.Dtos);
      });
    },

    // 点击选择项，可改为直接init
    sele: function () {
      console.log(this.type);
    },
    //添加弹窗确认事件
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
          this.deleteadddata();
        })
        .catch((_) => {});
    },
    //审核意见弹窗取消
    handleCloseSH(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    //取消弹窗并清空
    deleteadddata: function () {
      this.Content = "";
      this.UpdaterType = "";
      this.diaing = false;
      // 弹窗清空事件
    },
    //弹窗确认事件
    addtrue: function () {
      //非空判断

      if (this.UpdaterType == "") {
        this.$msgs("1", "请选择类型");
        return false;
      }
      if (this.Content == "") {
        this.$msgs("1", "请输入内容");
        return false;
      }

      // 上传意见
      var obj = {
        api: "post",
        url: this.$store.state.http + "System/MakeSuggestion",
        data: {
          Content: this.Content,
          UpdaterType: this.UpdaterType,
        },
      };
      this.$https(obj).then((res) => {
        this.$msgs("0", "我们将会尽快审核");
        this.deleteadddata();
        this.init();
      });
    },
    //审核意见
    SHContent: function (item) {
      this.diaingSH = true;
      this.SHitem = item;
    },
    // 审核结果
    Shtrue: function (row, rew) {
      if (row == 2 && rew == 2) {
        this.$prompt("请输入拒绝原因", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        })
          .then(({ value }) => {
            var obj = {
              api: "post",
              url: this.$store.state.http + "System/UpdateSuggestion",
              data: {
                Id: this.SHitem.ID,
                Adopt: row,
                ToBeState: rew,
                RefuseMsg: value,
              },
            };
            this.$https(obj).then((res) => {
              this.diaingSH = false;
              this.init();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "未审核",
            });
          });
      } else {
        var obj = {
          api: "post",
          url: this.$store.state.http + "System/UpdateSuggestion",
          data: {
            Id: this.SHitem.ID,
            Adopt: row,
            ToBeState: rew,
          },
        };
        this.$https(obj).then((res) => {
          this.diaingSH = false;
          this.init();
        });
      }
    },

    handleCurrentChange(val) {
      this.pageNum = val;
      this.init();
    },
    // 切换 每页条数时触发  刷新
    handleSizeChange(val) {
      this.pagesize = val;
      this.init();
    },
  },
};
</script>
<style scope lang="scss">
.top_init_data {
  width: 100%;
  height: 100px;
  padding: 23px;
  box-sizing: border-box;
}
.content {
  padding: 0px 25px;
  box-sizing: border;
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
</style>