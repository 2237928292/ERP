<template>
  <div class="box">
    <div class="TopSerch">
      <el-input style="width:193px" size="mini" v-model="search" placeholder="请输入内容"></el-input>
      <el-button type="primary" :loading='this.$store.state.Vuex.loading' size="mini" @click="initdata()">检索</el-button>
      <el-button type="success" style="float:right;" size="mini" @click="AddData()">添加</el-button>
    </div>

    <!-- 添加弹窗 -->
    <el-dialog title="添加工具" :visible.sync="dialogTableVisible" :before-close="handleClose">
      <div class="dial" style="width:100%;height:500px">
        <div class="li" v-if="!dangqian">
          <!-- <div class="div">工具 :</div> -->
          <el-autocomplete class="inline-input" size="mini" style="width:100%" v-model="ToolObjectId " :show-overflow-tooltip="true" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect" clearable>
            <template slot="prepend">当前工具</template>
          </el-autocomplete>
        </div>

        <div class="li" v-if="dangqian">
          <el-input v-model="Godo" size="mini" :disabled="true" placeholder="请输入内容">
            <template slot="prepend">当前工具</template>
          </el-input>
        </div>

        <div class="lis" v-if="item[0]">
          <el-table :data="item" size="mini" style="width:100%">
            <el-table-column prop="ProductCode" label="编码" width="160px"></el-table-column>
            <el-table-column prop="ProductDesc" label="说明" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="Unit" label="单位" width="80px"></el-table-column>
            <el-table-column prop="ToolLabel" label="标签" width="80px"></el-table-column>
            <el-table-column prop="UnitPrice" label="单价" width="80px"></el-table-column>
          </el-table>
        </div>
        <div class="li">
          <el-input placeholder="请输入内容" size="mini" v-model="Storehouse">
            <template slot="prepend">库位</template>
          </el-input>
        </div>
        <div class="li">
          <el-input placeholder="请输入内容" size="mini" v-model="Name">
            <template slot="prepend">别名</template>
          </el-input>
        </div>
        <div class="li">
          <el-input placeholder="请输入备注 （非必填）" size="mini" v-model="Memo">
            <template slot="prepend">备注</template>
          </el-input>
        </div>
        <img :src="StoreHttp" alt />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dale()">取 消</el-button>
        <el-button type="primary" @click="getaddtrue()">确 定</el-button>
      </span>
    </el-dialog>

    <!--  -->
    <div class="content">
      <el-table :data="data" size="mini" :height="this.$store.state.TableOptimumHeight" highlight-current-row border style="width: 100%" :header-cell-style="{background:'#e1e1e1'}">
        <el-table-column :show-overflow-tooltip="true" fixed prop="ProductCode" label="工具编号" width="150"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="ProductDesc" label="工具描述"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="Storehouse" label="库位" width="120"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="Name" label="别名" width="120"></el-table-column>
        <el-table-column fixed="right" label="可用性" width="120">
          <!-- 最后一格不给宽度，可自适应。给宽度后，屏宽过大会出现空白模块 -->
          <template slot-scope="scope">
            <el-button-group>
              <el-switch v-model="scope.row.Enable" @change="switchs(scope.row)" class="an" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-button-group>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="120">
          <!-- 最后一格不给宽度，可自适应。给宽度后，屏宽过大会出现空白模块 -->
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </div>

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
export default {
  data() {
    return {
      data: [],
      pageNum: 1, //当前页码
      pagesize: 10, //分页参数
      total: 0, //总条数
      search: "",
      ToolObjectId: "",
      dialogTableVisible: false, //弹窗
      ToolProId: "", //ID
      Storehouse: "", //库位
      Name: "", //别名
      Memo: "", //备
      dangqian: false, // 修改时起效
      Godo: "",
      item: [], //添加选择的项目
      StoreHttp: "",
    };
  },
  created() {
    this.initdata();
  },
  methods: {
    // init
    initdata: function () {
      if (localStorage.getItem("sf") != "kehu") {
        return false;
      }
      var obj = {
        api: "get",
        url: this.$store.state.http + "CusTool/GetToolObjects",
        header: this.$store.state.token,
        data: {
          cusId: JSON.parse(localStorage.getItem("Logo")).CusId, //客户id
          search: this.search, //检索内容
          pageNum: this.pageNum, //当前页码
          numPerPage: this.pagesize, //分页条数
          InStore: "",
          orderField: "",
          orderDirection: "",
        },
      };
      this.$https(obj).then((res) => {
        this.total = res.Data.DataBars;
        this.data = res.Data.Dtos;
        console.log(res.Data.Dtos);
      });
    },
    //输入第几页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.initdata();
    },
    // 切换 每页条数时触发  刷新
    handleSizeChange(val) {
      this.pagesize = val;
      this.initdata();
    },
    AddData: function () {
      this.dialogTableVisible = true;
      this.StoreHttp = "";
    },
    // 关闭窗口
    dale: function () {
      this.dialogTableVisible = false;
      this.delete();
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
          this.delete();
        })
        .catch((_) => {});
    },
    // 确认添加
    getaddtrue: function () {
      // 判断  修改 || 添加
      if (this.dangqian) {
        var obj = {
          api: "post",
          url: "http://39.101.201.199:6001/api/CusTool/UpdateToolObject",
          data: {
            ToolObjectId: this.ToolObjectId,
            ToolProId: this.ToolProId,
            Storehouse: this.Storehouse,
            Name: this.Name,
            Memo: this.Memo,
          },
        };
        this.$https(obj).then((res) => {
          console.log(res);
          this.dialogTableVisible = false;
          this.initdata();
          this.delete();
        });

        return false;
      }
      if (this.ToolProId == "" || this.Storehouse == "" || this.Name == "") {
        this.$message({
          message: "检查必须项",
          type: "warning",
        });
        return false;
      }

      var obj = {
        url: this.$store.state.http + "CusTool/AddToolObject",
        api: "post",
        data: {
          ToolObjectId: "",
          ToolProId: this.ToolProId,
          Storehouse: this.Storehouse,
          Name: this.Name,
          Memo: this.Memo,
          FixedAssetsCode: "固定资产",
        },
      };

      this.$https(obj).then((res) => {
        console.log(res);
        this.dialogTableVisible = false;
        this.initdata();
        this.delete();
      });
    },
    //选择工具
    querySearch(queryString, cb) {
      console.log(queryString);
      var obj = {
        data: {
          search: queryString,
          enable: true,
          pageNum: 1, //当前页码
          numPerPage: 100, //分页条数
          orderField: "",
          orderDirection: "",
        },
        api: "get",
        url: this.$store.state.http + "CusTool/GetCusTools",
        header: this.$store.state.token,
      };
      this.$https(obj).then((res) => {
        console.log(res.Data.Dtos);
        var asd = [];
        if (res.Data.Dtos.length == 0) {
          cb([]);
          // this.$msgs('1','没有此工具')
          return false;
        }
        for (var i = 0; i < res.Data.Dtos.length; i++) {
          res.Data.Dtos[i]["value"] =
            "[" +
            res.Data.Dtos[i].ProductCode +
            "]" +
            " - " +
            res.Data.Dtos[i].ProductDesc;
        }
        console.log(res.Data.Dtos);
        cb(res.Data.Dtos);
      });
    },
    handleSelect(item) {
      if (item.ImageUrl != null) {
        this.StoreHttp =
          this.$store.state.Filehttp + "CusTool/" + item.ImageUrl;
      } else {
        this.StoreHttp = "";
      }
      this.item = [];
      console.log(item);
      this.item[0] = item;
      this.ToolProId = item.ID;
    },

    switchs: function (res) {
      console.log(res);
      var obj = {
        data: {
          Id: res.ToolObjectId,
        },
        api: "post",
        url: this.$store.state.http + "CusTool/SetToolObject",
      };
      this.$https(obj).then((res) => {
        this.$msg();
      });
    },

    edit: function (res) {
      console.log(res);
      this.dialogTableVisible = true;
      this.ToolProId = res.ToolProId;
      this.ToolObjectId = res.ToolObjectId;
      this.Storehouse = res.Storehouse;
      this.Name = res.Name;
      this.Memo = res.Memo;
      this.Godo = res.ProductDesc;
      this.dangqian = true;
      if (res.ImageUrl != "") {
        this.StoreHttp = this.$store.state.Filehttp + "CusTool/" + res.ImageUrl;
      } else {
        this.StoreHttp = "";
      }
    },
    // 清空操作
    delete: function () {
      this.ToolObjectId = "";
      this.ToolProId = "";
      this.Storehouse = "";
      this.Name = "";
      this.Memo = "";
      this.Godo = "";
      this.dangqian = false;
      this.item = [];
    },
  },
};
</script>
<style lang="scss" scoped>
// @import url("../../assets/scss/Shop_tools.scss");
@import url("../../assets/scss/Tool_database.scss");
</style>