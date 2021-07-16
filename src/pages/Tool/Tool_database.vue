<template>
  <div class="box">
    <router-view></router-view>
    <!-- 工具资料库 -->
    <!-- 头部搜索区域 -->
    <div class="TopSerch">
      <el-input style="width:193px" size="mini" v-model="search" @change="Bai()" placeholder="请输入内容"></el-input>
      <el-select size="mini" style="width:100px" @change="sele()" v-model="select" placeholder="请选择">
        <el-option v-for="item in options" :key="item.index" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-button type="primary" :loading='this.$store.state.Vuex.loading' size="mini" @click="Bai()">检索</el-button>
      <el-button type="success" style="float:right;" size="mini" @click="addbsList()">批量添加</el-button>
      <el-button type="success" style="float:right;" size="mini" @click="addbs()">添加</el-button>

      <!-- 添加弹窗 -->
      <el-dialog title="添加工具" :visible.sync="dialogTableVisible" :before-close="handleClose">
        <div class="dial" style="width:100%;height:350px">
          <div class="li">
            <el-select size="mini" style="width:100px;marginRight:50px" v-model="optionsRtext" placeholder="请选择">
              <el-option v-for="item in optionsR" :key="item.index" :label="item.label" :value="item.value"></el-option>
            </el-select>

            <el-radio v-model="radio" label="1">不需要校准</el-radio>
            <el-radio v-model="radio" label="2">需要校准</el-radio>
          </div>
          <div class="li">
            <el-input placeholder="请输入厂商提供的简短编码" size="mini" v-model="ProductCode">
              <template slot="prepend">工具编号</template>
            </el-input>
          </div>
          <div class="li">
            <el-input placeholder="例如以VAS、000721、T 开头的厂商提供的编码" size="mini" v-model="ProductCodeDetail">
              <template slot="prepend">详细编码</template>
            </el-input>
          </div>
          <div class="li">
            <el-input placeholder="请输入工具描述" size="mini" v-model="ProductDesc">
              <template slot="prepend">工具描述</template>
            </el-input>
          </div>

          <div class="li">
            <el-input placeholder="请输入销售单价 （非必填）" size="mini" v-model="UnitPrice">
              <template slot="prepend">销售单价</template>
            </el-input>
          </div>
          <div class="li">
            <el-input placeholder="请输入单位" size="mini" v-model="Unit">
              <template slot="prepend">单&nbsp;&nbsp;位</template>
            </el-input>
          </div>
          <div class="li">
            <el-input placeholder="请输入标签 （非必填）" size="mini" v-model="ToolLabel">
              <template slot="prepend">标&nbsp;&nbsp;签</template>
            </el-input>
          </div>
          <!-- 上传图片 -->
          <upimg></upimg>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialogTableVisiblefalse()">取 消</el-button>
          <el-button size="mini" type="primary" @click="addtrue()">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <!--  -->
    <div class="content">
      <el-table :data="data" size="mini" :height="this.$store.state.TableOptimumHeight" highlight-current-row border style="width: 100%" :header-cell-style="{background:'#e1e1e1'}">
        <el-table-column fixed prop="ProductCode" label="工具编号" sortable width="150"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="ProductCodeDetail" width="200" label="详细编码"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="ProductDesc" label="工具描述"></el-table-column>
        <el-table-column prop="Unit" label="单位" width="120"></el-table-column>
        <el-table-column prop="UnitPrice" label="销售单价" width="120"></el-table-column>
        <el-table-column prop="ToolLabel" label="标签" width="120"></el-table-column>
        <el-table-column fixed="right" label="可用状态" width="120">
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
    <!-- <bottomclicklist></bottomclicklist> -->

    <!-- 分页 -->
    <div class="pagetion">
      <el-pagination class="pagition-li" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="this.$store.state.Vuex.pageSNumber" :page-size="pagesize"
        layout=" total , sizes, prev, pager, next, jumper " :total="total"></el-pagination>

    </div>

    <!--  -->
  </div>
</template>
<script>
// import bottomclicklist from '../../components/BottomClickList/index'
import upimg from "../../components/ass/Tool_data_upload-img";
export default {
  components: {
    upimg: upimg,
    // bottomclicklist:bottomclicklist
  },
  data() {
    return {
      orderField: "",
      ProductCodeDetail: "", //详细编码
      search: "",
      select: true,
      pageNum: 1, //当前页码
      options: [
        { label: "可用", value: true, index: 1 },
        { label: "不可用", value: false, index: 2 },
      ],
      optionsR: [
        { label: "电子设备", value: "电子设备", index: 1 },
        { label: "机械设备", value: "机械设备", index: 2 },
      ],
      optionsRtext: "电子设备",
      radio: "1",
      //     工具增加分类：string AssetsType 下拉框 工具分类
      //
      //
      // 字段：是否需要标定/校准 bool Calibration
      dialogTableVisible: false, //添加弹窗
      ProductCode: "", //添加编号
      ProductDesc: "", //产品描述
      Unit: "", //单位
      UnitPrice: "", //销售单价
      ToolLabel: "", //标签
      Enable: true, //可用性
      data: [], //数据
      Data: [], //展示数据
      total: 0, //总条目数
      pagesize: 10, //每页显示条数

      // 修改信息
      edits: {},
      editsindex: false, //判断修改接口
      fileList: [],
    };
  },
  created() {
    this.initda();
  },
  methods: {
    // 批量添加
    addbsList: function () {
      this.$router.push({ path: "/List_tool" });
    },
    // 最上面检索
    Bai: function () {
      console.log(this.search, this.select);
      this.pageNum = 1;
      this.initda();
    },
    //初始数据
    initda: function () {
      var obj = {
        data: {
          search: this.search,
          enable: this.select,
          pageNum: this.pageNum, //当前页码
          numPerPage: this.pagesize, //分页条数
          orderField: "",
          orderDirection: "",
        },
        api: "get",
        url: this.$store.state.http + "CusTool/GetCusTools",
        header: this.$store.state.token,
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);
        this.data = res.Data.Dtos;
        this.total = res.Data.DataBars;
      });
    },
    // 添加
    addbs: function () {
      this.dialogTableVisible = true;
      this.editsindex = false;
    },
    // 确认添加
    addtrue: function () {
      console.log(this.$store.state.Tool_data_imageBase64);

      // 进入判断是修改模式  跳出是新增模式
      if (this.editsindex) {
        var obj = {
          data: {
            ID: this.edits.ID,
            ProductCodeDetail: this.ProductCodeDetail,
            ProductCode: this.ProductCode, //产品编号
            ProductDesc: this.ProductDesc, //产品描述
            Unit: this.Unit, //单位
            UnitPrice: this.UnitPrice, //销售单价(非必填项)
            ToolLabel: this.ToolLabel, //标签
            Enable: this.Enable, //可用性     bool
          },
          api: "post",
          url: this.$store.state.http + "CusTool/UpdateCusTool",
          header: this.$store.state.token,
        };
        this.$https(obj).then((res) => {
          if (this.$store.state.Tool_data_imageBase64 == "") {
            this.dialogTableVisible = false;
            this.deleteadddata();
            this.initda();
          } else {
            this.upimgData(res.Data);
          }
        });
        return false;
      }
      // 判断输入完整
      console.log(this.optionsRtext);
      if (
        this.optionsRtext == "" ||
        this.ProductCode == "" ||
        this.ProductDesc == "" ||
        this.Unit == "" ||
        this.ProductCodeDetail == ""
      ) {
        alert("请输入完整");
        return false;
      }

      var Calibrations = false;
      if (this.radio == "2") {
        Calibrations = true;
      }
      // 调用添加接口
      var obj = {
        data: {
          AssetsType: this.optionsRtext, //设备分类
          Calibration: Calibrations, //是否需要校准
          ProductCodeDetail: this.ProductCodeDetail,
          ProductCode: this.ProductCode, //产品编号
          ProductDesc: this.ProductDesc, //产品描述
          Unit: this.Unit, //单位
          UnitPrice: this.UnitPrice, //销售单价(非必填项)
          ToolLabel: this.ToolLabel, //标签
          Enable: this.Enable, //可用性     bool
        },
        api: "post",
        url: this.$store.state.http + "CusTool/AddCusTool",
        header: this.$store.state.token,
      };
      this.$https(obj).then((res) => {
        this.upimgData(res.Data);
      });
    },
    upimgData: function (res) {
      var obj = {
        data: {
          Id: res,
          FileStr: this.$store.state.Tool_data_imageBase64,
        },
        api: "post",
        url: this.$store.state.http + "CusTool/UploadToolProPhoto",
        header: this.$store.state.token,
      };
      this.$https(obj).then((res) => {
        this.dialogTableVisible = false;
        this.deleteadddata();
        this.initda();
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
    // 清空添加数据
    deleteadddata: function () {
      this.ProductCode = "";
      this.ProductDesc = "";
      this.Unit = "";
      this.UnitPrice = "";
      this.ToolLabel = "";
      this.ProductCodeDetail = "";
      this.$store.state.imgArr = [];
      this.$store.state.Tool_data_imageBase64 = "";
    },
    //点击改变状态
    switchs: function (res) {
      console.log(res);
      var obj = {
        data: {
          Id: res.ID,
        },
        api: "post",
        url: this.$store.state.http + "CusTool/SetCusTool",
        header: this.$store.state.token,
      };
      this.$https(obj).then((res) => {
        this.$msg();
      });
    },
    //输入第几页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.initda();
    },
    // 切换 每页条数时触发  刷新
    handleSizeChange(val) {
      this.pagesize = val;
      this.initda();
    },
    //编辑信息
    edit: function (res) {
      this.$store.state.imgArr = [];

      if (res.ImageUrl != null) {
        this.$store.state.imgArr[0] =
          this.$store.state.Filehttp + "CusTool/" + res.ImageUrl;
      }

      console.log(res);
      this.edits = res;
      this.ProductCodeDetail = res.ProductCodeDetail;
      this.ProductCode = res.ProductCode;
      this.ProductDesc = res.ProductDesc; //产品描述
      this.Unit = res.Unit; //单位
      this.UnitPrice = res.UnitPrice; //销售单价(非必填项)
      this.ToolLabel = res.ToolLabel; //标签
      this.Enable = res.Enable; //可用性     bool

      this.editsindex = true;
      this.dialogTableVisible = true;
    },
    dialogTableVisiblefalse: function () {
      this.dialogTableVisible = false;
      this.deleteadddata();
    },
    //切换检索选择项
    sele: function () {
      console.log(this.select);
      this.initda();
    },
  },
};
</script>
<style lang="scss" scoped>
@import url("../../assets/scss/Tool_database.scss");

.inp {
  width: 75%;
  float: left;
}
.div {
  width: 80px;
  line-height: 30px;
  float: right;
}
</style>