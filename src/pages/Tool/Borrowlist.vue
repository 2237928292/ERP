<template>
  <div class="box">
    <router-view @refresh="init"></router-view>
    <!-- 头部检索 -->
    <div class="TopSerch">
      <el-input style="width:193px" size="mini" v-model="search" placeholder="请输入记录编号、借用人"></el-input>
      <el-select size="mini" style="width:100px" v-model="select" @change="initShutter(select)" placeholder="请选择">
        <el-option v-for="item in options" :key="item.index" :label="item.label" :value="item.value"></el-option>
      </el-select>

      <el-date-picker v-model="value1" type="datetimerange" size="mini" @change="pick" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" :default-time="['12:00:00']"></el-date-picker>

      <el-button type="primary" :loading='this.$store.state.Vuex.loading' size="mini" @click="init()">检索</el-button>
      <el-button type="success" style="float:right;" size="mini" @click="urlAddlist()">添加</el-button>
      <el-button type="info" style="float:right;" size="mini" @click="exportrecord()">导出借用记录</el-button>
      <el-button type="info" style="float:right;" size="mini" @click="exportTool(2)">从工具纬度统计</el-button>
      <el-button type="info" style="float:right;" size="mini" @click="exportTool(1)">从借用人纬度统计</el-button>
    </div>

    <!-- 弹窗 -->

    <el-dialog v-if="CusToolRecDto_BorrowListDtos.CusToolRecDto" title="审核信息" :visible.sync="dialogTableVisible" :before-close="handleClose">
      <div class="dial" style="width:100%;height:500px">
        <div class="msg">基础信息</div>
        <div class="msgul">
          <div class="lefts">
            <p>借用人：</p>
            {{CusToolRecDto_BorrowListDtos.CusToolRecDto.Borrower}}
          </div>
          <div class="lefts">
            <p>记录编号：</p>
            {{CusToolRecDto_BorrowListDtos.CusToolRecDto.BorrowRecoreCode}}
          </div>
          <div class="lefts">
            <p>状态：</p>
            {{CusToolRecDto_BorrowListDtos.CusToolRecDto.StateStr}}
          </div>
          <div class="lefts">
            <p>申请时间：</p>
            {{CusToolRecDto_BorrowListDtos.CusToolRecDto.ApplyTime}}
          </div>
          <div class="lefts">
            <p>借出时间：</p>
            {{CusToolRecDto_BorrowListDtos.CusToolRecDto.LendTime || '-- --'}}
          </div>
          <div class="lefts">
            <p>归还时间：</p>
            {{CusToolRecDto_BorrowListDtos.CusToolRecDto.ReturnTime || '-- --'}}
          </div>
        </div>
        <div class="msg">工具信息({{CusToolRecDto_BorrowListDtos.BorrowListDtos.length}})</div>
        <div class="gonhgju msgul">
          <div class="gjli" v-for="(item,index) in CusToolRecDto_BorrowListDtos.BorrowListDtos" :key="index">
            <div class="title">工具{{index+1}} ---- {{CusToolRecDto_BorrowListDtos.BorrowListDtos[index].ProductCode}}</div>
            <div class="lefts">
              <p>库位：</p>
              {{CusToolRecDto_BorrowListDtos.BorrowListDtos[index].Storehouse}}
            </div>
            <div class="lefts">
              <p>单价：</p>
              {{CusToolRecDto_BorrowListDtos.BorrowListDtos[index].Unit}}
            </div>
            <div class="lefts">
              <p>标签：</p>
              {{CusToolRecDto_BorrowListDtos.BorrowListDtos[index].ToolLabel}}
            </div>
            <div class="wei">说明：{{CusToolRecDto_BorrowListDtos.BorrowListDtos[index].ProductDesc}}</div>
            <div class="divimage">
              <el-image style="width: 100px; height: 100px" :preview-src-list="['http://icms.inchwell.com.cn/File/CusTool/' + CusToolRecDto_BorrowListDtos.BorrowListDtos[index].ImageUrl]"
                :src=" 'http://icms.inchwell.com.cn/File/CusTool/' + CusToolRecDto_BorrowListDtos.BorrowListDtos[index].ImageUrl" fit="fill"></el-image>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" v-if="CusToolRecDto_BorrowListDtos.CusToolRecDto.State == 1" @click="addtrue()">借 出</el-button>
        <el-button type="primary" v-if="CusToolRecDto_BorrowListDtos.CusToolRecDto.State == 2" @click="addtrue()">归 还</el-button>
        <el-button type="primary" v-if="CusToolRecDto_BorrowListDtos.CusToolRecDto.State == 3" @click="addtrue()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 表格 -->
    <div class="content">
      <el-table :data="data" size="mini" :height="this.$store.state.TableOptimumHeight" highlight-current-row border id="out-table" style="width: 100%" :row-class-name="tableRowClassName"
        :header-cell-style="{background:'#e1e1e1'}">
        <el-table-column prop="UserName" label="借用人" width="120"></el-table-column>
        <el-table-column prop="BorrowRecoreCode" label="记录编号" width="150"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="StateStr" label="状态"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="ApplyTime" label="申请时间"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="LendTime" label="借出时间"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="ReturnTime" label="归还时间"></el-table-column>
        <el-table-column width="200px" label="操作">
          <!-- 最后一格不给宽度，可自适应。给宽度后，屏宽过大会出现空白模块 -->
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="primary" v-if="scope.row.State == 1" size="mini" @click="edit(scope.row)">借出</el-button>
              <el-button type="primary" v-if="scope.row.State == 2" size="mini" @click="edit(scope.row)">归还</el-button>
              <el-button type="primary" v-if="scope.row.State == 3" size="mini" @click="edit(scope.row)">查看</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 表格   展示 -->
    <div class="content" v-show="false">
      <el-table :data="DataShow" size="mini" :height="this.$store.state.TableOptimumHeight" highlight-current-row border id="Table_one" style="width: 100%" :row-class-name="tableRowClassName"
        :header-cell-style="{background:'#e1e1e1'}">
        <el-table-column prop="UserName" label="借用人" width="120"></el-table-column>
        <el-table-column prop="BorrowRecoreCode" label="记录编号" width="150"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="StateStr" label="状态"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="ApplyTime" label="申请时间"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="LendTime" label="借出时间"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="ReturnTime" label="归还时间"></el-table-column>
      </el-table>
    </div>

    <!-- 表格   展示 -->
    <div class="content" v-show="false">
      <el-table :data="DataShowTool" size="mini" :height="this.$store.state.TableOptimumHeight" highlight-current-row border id="Table_Tool" style="width: 100%" :row-class-name="tableRowClassName"
        :header-cell-style="{background:'#e1e1e1'}">
        <el-table-column prop="Count" label="次数" width="120"></el-table-column>
        <el-table-column prop="Key" label="工程师" width="150"></el-table-column>
      </el-table>
    </div>

    <!-- 表格   展示 -->
    <div class="content" v-show="false">
      <el-table :data="DataShowTool1" size="mini" :height="this.$store.state.TableOptimumHeight" highlight-current-row border id="Table_Tool1" style="width: 100%" :row-class-name="tableRowClassName"
        :header-cell-style="{background:'#e1e1e1'}">
        <el-table-column prop="Count" label="次数" width="120"></el-table-column>
        <el-table-column prop="Key" label="工具编码" width="150"></el-table-column>
        <el-table-column prop="Key2" label="详细编码" width="150"></el-table-column>
        <el-table-column prop="Key3" label="工具描述" width="150"></el-table-column>
      </el-table>
    </div>

    <!-- 




      
      gcs


      工具编码
      详细编码
      工具描述
     -->

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
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      search: "", //检索项
      state: "", //检索状态
      pagesize: 100, //分页条数
      pageNum: 1, //当前页码
      value1: ["", ""],
      select: "",
      options: [
        { label: "全部", value: "", index: 1 },
        { label: "申请中", value: 1, index: 2 },
        { label: "已借出", value: 2, index: 3 },
        { label: "已归还", value: 3, index: 4 },
      ],
      data: [],
      DataShow: [],
      DataShowTool: [],
      DataShowTool1: [],
      // 以下是分页参数
      pageNum: 1, //当前页码
      pagesize: 10, //分页条数
      total: 0, //总条目数
      pagesize: 10, //每页显示条数

      dialogTableVisible: false,
      CusToolRecDto_BorrowListDtos: [], //当前展示详细信息的集合
      begin: "",
      end: "",
    };
  },
  created() {
    this.init();
  },

  methods: {
    // 导出借用记录
    exportrecord: function () {
      var obj = {
        data: {
          cusId: this.$store.state.CusId,
          search: this.search, //检索项
          state: this.state, //检索状态  全部：0，申请中：1使用中：2已归还：3
          pageNum: 1, //当前页码
          numPerPage: 10000, //分页条数
          orderField: "",
          orderDirection: "",
          begin: this.begin,
          end: this.end,
        },
        api: "get",
        url: this.$store.state.http + "CusTool/GetCusToolRecs",
      };
      this.$https(obj).then((res) => {
        console.log(res.Data.DataBars);
        this.total = res.Data.DataBars; //总条数    用于切换页
        this.DataShow = res.Data.Dtos;
        for (var i = 0; i < this.DataShow.length; i++) {
          this.DataShow[i].ApplyTime = this.DataShow[i].ApplyTime.split("T")[0];
          if (this.DataShow[i].LendTime === null) {
            this.DataShow[i].LendTime = " -  -";
          } else {
            this.DataShow[i].LendTime = this.DataShow[i].LendTime.split("T")[0];
          }

          if (this.DataShow[i].ReturnTime === null) {
            this.DataShow[i].ReturnTime = " -  -";
          } else {
            this.DataShow[i].ReturnTime = this.DataShow[i].ReturnTime.split(
              "T"
            )[0];
          }
        }
        setTimeout(() => {
          this.exportExcel("#Table_one", "借用记录");
        }, 1000);
      });
    },
    // 从工具纬度统计 或 从借用人纬度统计
    exportTool: function (stat) {
      var obj = {
        data: {
          type: stat,
          begin: this.begin,
          end: this.end,
        },
        api: "get",
        url: this.$store.state.http + "CusTool/StatCusToolRec",
      };
      this.$https(obj).then((res) => {
        if (stat == 1) {
          this.DataShowTool = res.Data;
          setTimeout(() => {
            this.exportExcel("#Table_Tool", "从借用人纬度统计");
          }, 1000);
        } else {
          this.DataShowTool1 = res.Data;
          setTimeout(() => {
            this.exportExcel("#Table_Tool1", "从工具纬度统计");
          }, 1000);
        }
      });
    },
    //定义导出Excel表格事件
    exportExcel(res, name) {
      let xlsxParam = { raw: true }; //转换成excel时，使用原始的格式
      var wb = XLSX.utils.table_to_book(document.querySelector(res), xlsxParam);
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          name + ".xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },

    tableRowClassName({ row }) {
      if (row.State == 1) {
        return "code1";
      } else if (row.State === 2) {
        return "code2";
      } else if (row.State === 3) {
        return "code3";
      }
      return "";
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
    // 点击检索百叶窗
    initShutter: function (rew) {
      this.state = rew;
      this.init();
    },
    // 初始
    init: function () {
      var obj = {
        data: {
          cusId: this.$store.state.CusId,
          search: this.search, //检索项
          state: this.state, //检索状态  全部：0，申请中：1使用中：2已归还：3
          pageNum: this.pageNum, //当前页码
          numPerPage: this.pagesize, //分页条数
          orderField: "",
          orderDirection: "",
          begin: this.begin,
          end: this.end,
        },
        api: "get",
        url: this.$store.state.http + "CusTool/GetCusToolRecs",
      };
      this.$https(obj).then((res) => {
        console.log(res.Data.DataBars);
        this.total = res.Data.DataBars; //总条数    用于切换页
        this.data = res.Data.Dtos;
        for (var i = 0; i < this.data.length; i++) {
          this.data[i].ApplyTime = this.data[i].ApplyTime.split("T")[0];
          if (this.data[i].LendTime === null) {
            this.data[i].LendTime = " -  -";
          } else {
            this.data[i].LendTime = this.data[i].LendTime.split("T")[0];
          }

          if (this.data[i].ReturnTime === null) {
            this.data[i].ReturnTime = " -  -";
          } else {
            this.data[i].ReturnTime = this.data[i].ReturnTime.split("T")[0];
          }
        }
      });
    },
    //表格编辑
    edit: function (rew) {
      // 通过Id获取详细信息
      console.log(rew);
      var obj = {
        data: {
          Id: rew.Id,
        },
        api: "get",
        url: this.$store.state.http + "CusTool/GetCusToolRec",
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);
        this.CusToolRecDto_BorrowListDtos = res.Data;
      });
      this.dialogTableVisible = true;
    },
    //输入第几页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.init();
    },
    // 切换 每页条数时触发  刷新
    handleSizeChange(val) {
      this.pagesize = val;
      this.init();
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
          this.deleteadddata();
        })
        .catch((_) => {});
    },
    // 弹窗确定
    addtrue: function () {
      var CurrentstatusCode_State = this.CusToolRecDto_BorrowListDtos
        .CusToolRecDto;
      if (CurrentstatusCode_State.State == 3) {
        this.dialogTableVisible = false;
        return false;
      }
      var obj = {
        data: {
          BorrowRecId: CurrentstatusCode_State.Id,
          State: CurrentstatusCode_State.State + 1,
        },
        api: "post",
        url: this.$store.state.http + "CusTool/UpdateBorrowRecState",
      };
      this.$https(obj).then((res) => {
        this.dialogTableVisible = false;
        this.init();
      });
    },
    // 前往添加页面
    urlAddlist: function () {
      this.$router.push({ path: "/Addlist" });
    },
  },
};
</script>
<style lang="">
.el-table .code1 {
  background: #f1eabf;
}

.el-table .code2 {
  background: #ffd5d5;
}

.el-table .code3 {
  background: #9ef1c6;
}
</style>
<style lang="scss" scoped>
@import url("../../assets/scss/Borrowlist.scss");
@import url("../../assets/scss/Tool_database.scss");
</style>