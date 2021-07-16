<template>
  <div class="box_s">
    <!-- 左侧选择客户 -->
    <div class="Leftside">
      <div class="LeftsideTop">
        <div style="width:100%">
          <el-input style="width:193px" size="mini" v-model="search" placeholder="请输入内容"></el-input>
          <el-button type="primary" size="mini" @click="init(1)">检索</el-button>
        </div>
        <!-- xxxx -->
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width:100%" @selection-change="handleSelectionChange" max-height="370px">
          <el-table-column type="selection" :show-overflow-tooltip="true" width="55"></el-table-column>
          <el-table-column prop="ProductCode" :show-overflow-tooltip="true" label="工具编码" width="120"></el-table-column>
          <el-table-column prop="ToolLabel" :show-overflow-tooltip="true" label="标签" width="120"></el-table-column>
          <el-table-column prop="ProductDesc" :show-overflow-tooltip="true" label="工具描述"></el-table-column>
        </el-table>

        <!-- <div class="pageQiHH">
          
        </div> -->
        <el-pagination class="pagition-li" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="this.$store.state.Vuex.pageSNumber" :page-size="pagesize"
          layout="total, prev, pager, next" :total="total"></el-pagination>

        <!-- 选择操作 -->
        <div style="float:right;">
          <el-button type="warning" size="mini" @click="toggleSelection()">取消选择</el-button>
          <el-button type="primary" size="mini" @click="toggleSelections()">确认</el-button>
        </div>
      </div>
      <!-- 选择技师 -->
      <div class="LeftsideBottom">
        <div style="width:100%">
          <el-input style="width:193px" size="mini" v-model="searchs" placeholder="请输入内容"></el-input>
          <el-button type="primary" size="mini" @click="initjishi()">检索</el-button>
        </div>
        <!--  -->
        <el-button v-for="(item5,indexd) in jishidata" :key="indexd" type="primary" size="mini" class="butclass" v-if="item5.Memo != ''" @click="initjishis(item5)">{{item5.Memo}}</el-button>
      </div>
      <!--  -->
    </div>
    <!-- 右侧确认事件 -->
    <div class="Rightside">
      <el-table @cell-mouse-enter="cellMouseEnter" @cell-mouse-leave="cellMouseEnterNO" :data="multipleSelectioninits" style="width: 100%" max-height="600px">
        <el-table-column :show-overflow-tooltip="true" prop="ProductCode" label="工具编码" width="120">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="left">
              <el-image style="width: 100px; height: 100px; bottom: 0px" :preview-src-list="['http://icms.inchwell.com.cn/File/CusTool/' + scope.row.ImageUrl]"
                :src="'http://icms.inchwell.com.cn/File/CusTool/' + scope.row.ImageUrl"></el-image>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.ProductCode }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="Storehouse" label="库位" width="120"></el-table-column>
        <el-table-column prop="ProductDesc" :show-overflow-tooltip="true" label="工具描述"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="tablejishi" title="已选择技师">
        <p style="fontWeight:bold;float:left;lineHeight:30px;fontSize:12px;">当前选择技师为：</p>
        <el-tag v-if="jishiitem.UserName">{{jishiitem.UserName}}</el-tag>
      </div>
      <div style="marginTop:20px;float:right;">
        <el-button type="primary" @click="Confirmationlist()">保存清单 确认借用</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchs: "", //
      jishidata: [],
      tableData: [],
      multipleSelection: [],
      data: [], // Data
      pageNum: 1, // Num
      pagesize: 8, // 展示条数
      search: "", //  检索项

      multipleSelectioninit: [], //准备区
      multipleSelectioninits: [],
      indexi_location: 0,

      Datx: [], //库位集合
      jishiitem: {}, //准备的技师
      total: 0,
      fits: ["fill", "contain", "cover", "none", "scale-down"],
    };
  },
  created() {
    this.init();
    this.initjishi();
  },
  methods: {
    initjishis: function (item) {
      console.log(item);
      this.jishiitem = item;
    },
    // 初始获取维修技师
    initjishi: function () {
      var obj = {
        data: {
          cusId: JSON.parse(localStorage.getItem("Logo")).CusId,
          enable: this.select,
          role: "客户",
          search: this.searchs,
        },
        api: "get",
        url: this.$store.state.http + "CRM/GetCusAccounts",
      };
      this.$https(obj).then((res) => {
        console.log(res.Data.Dtos);
        this.jishidata = res.Data.Dtos;
      });
    },
    //
    init: function (res) {
      if (res == 1) {
        this.pageNum = 1;
      }
      var obj = {
        api: "get",
        url: this.$store.state.http + "CusTool/GetCusToolObjects",
        data: {
          cusId: JSON.parse(localStorage.getItem("Logo")).CusId,
          search: this.search,
          pageNum: this.pageNum, //当前页码
          numPerPage: this.pagesize, //分页条数
          orderField: "",
          orderDirection: "",
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        // console.log(res.Data.DataBars);
        this.tableData = res.Data.Dtos;
        this.total = res.Data.DataBars;
      });
    },
    // 取消选择
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 确认选择
    toggleSelections: function () {
      console.log(this.multipleSelectioninit.length);
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "请选择",
          type: "warning",
        });
        return false;
      }
      // 如果数组为空直接储存
      if (this.multipleSelectioninit.length == 0) {
        this.multipleSelectioninit = this.multipleSelection;
        this.toggleSelection();
        this.id_location();
        return false;
      }
      this.multipleSelectioninit.push(...this.multipleSelection);
      this.multipleSelectioninit = Array.from(
        new Set(this.multipleSelectioninit)
      );
      console.log(this.multipleSelectioninit);
      this.toggleSelection();
      //   直接获取库位
      this.id_location();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    //删除已选择
    handleDelete(i, ii) {
      console.log(i, ii);
      this.multipleSelectioninit.splice(i, 1);
    },
    Confirmationlist: function () {
      if (!this.jishiitem.Id) {
        this.$message({
          message: "请选择维修技师",
          type: "warning",
        });
        return false;
      }
      if (this.multipleSelectioninit.length == 0) {
        this.$message({
          message: "您好像没有选择物品",
          type: "warning",
        });
        return false;
      }
      this.trueData();
    },
    // 通过id 获取产品库位
    id_location: function () {
      if (this.indexi_location == this.multipleSelectioninit.length) {
        console.log(this.Datx);
        this.indexi_location = 0;
        this.multipleSelectioninits = this.multipleSelectioninit;
        return false;
      }
      console.log(this.indexi_location);
      var obj = {
        api: "get",
        url: this.$store.state.http + "CusTool/GetCusToolByToolPro",
        data: {
          cusId: JSON.parse(localStorage.getItem("Logo")).CusId,
          toolProId: this.multipleSelectioninit[this.indexi_location].ID,
        },
      };
      this.$https(obj).then((res) => {
        // this.Datx[this.indexi_location] = { Storehouse: "" };
        console.log(res.Data.ProId);
        this.Datx[this.indexi_location] = res.Data.ProId;
        this.multipleSelectioninit[this.indexi_location]["Storehouse"] =
          res.Data.Storehouse;
        this.indexi_location++;
        this.id_location();
      });
    },

    trueData: function () {
      // 删除对象的循环引用，错误的编码方式。
      var List = [];
      for (var i = 0; i < this.Datx.length; i++) {
        console.log(this.Datx[i]);
        List.push(this.Datx[i]);
      }
      // console.log(JSON.stringify(List));
      var obj = {
        api: "post",
        url: this.$store.state.http + "CusTool/CreateBorrowRec",
        data: {
          CurrentUserId: this.jishiitem.Id,
          cusId: JSON.parse(localStorage.getItem("Logo")).CusId,
          ProIds: List,
        },
      };
      this.$https(obj).then((res) => {
        this.$message({
          message: "添加成功",
          type: "success",
        });
        this.$emit("refresh"), this.$router.push({ path: "/Borrowlist" });
      });
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
    cellMouseEnter: function (res) {
      console.log(res.ImageUrl);
    },
    cellMouseEnterNO: function () {
      console.log("退出了");
    },
  },
};
</script>
<style lang="scss" scoped>
@import url("../../../assets/scss/Addlist/Addlist.scss");
.LeftsideTop {
  position: relative;
}
</style>