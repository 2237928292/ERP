<template>
  <div class="box">
    <!-- 前往子页面 -->
    <router-view @refresh="init"></router-view>

    <div class="TopSerch">
      <!-- 检索内容 -->
      <el-input style="width:193px" size="mini" v-model="productCode" @change="init()" placeholder="请输入产品编码"></el-input>
      <!-- 产品编码 -->

      <el-input style="width:193px" size="mini" v-model="barcodeMemo" @change="init()" placeholder="请输入内部编码"></el-input>
      <!-- 内部编码 -->

      <el-input style="width:193px" size="mini" v-model="desc" @change="init()" placeholder="请输入产品描述"></el-input>
      <!-- 描述 -->

      <el-input style="width:193px" size="mini" v-model="memo" @change="init()" placeholder="请输入产品备注"></el-input>
      <!-- 备注 -->

      <el-select v-model="man" @change="init()" clearable size="mini" placeholder="请选择品牌">
        <el-option v-for="item in  options" :key="item.ID" :label="item.Name" :value="item.Name"></el-option>
      </el-select>
      <!-- 选择品牌 -->
      <el-button type="primary" size="mini" @click="init()">检索</el-button>
      <el-button type="success" style="float:right" size="mini" @click="add()">添加</el-button>

      <!-- <el-button type="primary" size="mini" @click="init()">刷新</el-button> -->
    </div>

    <!-- 表格 -->
    <div class="content" style=" padding: 0px 25px;box-sizing: border-box;">
      <el-table :data="Data" :height="this.$store.state.TableOptimumHeight" size="mini" highlight-current-row border style="width: 100%" :header-cell-style="{background:'#e1e1e1'}">
        <el-table-column prop="ProductCode" label="产品编号" width="170"></el-table-column>
        <!-- <el-table-column fixed prop="Name" label="姓名" width="150"></el-table-column> -->
        <!-- <el-table-column :show-overflow-tooltip="true" prop="Content" label="ID"></el-table-column> -->
        <el-table-column prop="BarcodeMemo" label="内部编码" width="140"></el-table-column>
        <el-table-column prop="Manufacturer" label="品牌" width="120"></el-table-column>

        <el-table-column prop="Characteristics" label="产品描述" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="Unit" label="单位" width="120"></el-table-column>
        <el-table-column prop="UpdateDate" label="更新时间" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="250">
          <!-- 最后一格不给宽度，可自适应。给宽度后，屏宽过大会出现空白模块 -->
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="adds(scope.row)">编辑</el-button>
            <el-button type="info" size="mini" @click="look(scope.row)">查看</el-button>
            <el-button type="primary" size="mini" @click="qihaun(scope.row)">切换类型</el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="切换类型" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-radio v-model="radio" label="1">零配件</el-radio>
      <el-radio v-model="radio" label="2">整机</el-radio>
      <el-radio v-model="radio" label="3">耗材</el-radio>
      <el-radio v-model="radio" label="4">通用</el-radio>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="UpdateProductType()">确 定</el-button>
      </span>
    </el-dialog>

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
  data() {
    return {
      search: "",
      Data: [], //表格数据
      pageNum: 1, //
      pagesize: 10, //每页显示条数
      total: 0, //总条目数
      productCode: "",
      //   产品编码
      barcodeMemo: "",
      //   内部编码
      man: "",
      //   品牌
      desc: "",
      //   产品描述
      memo: "",
      //   产品备注
      options: [],
      //  品牌选项
      dialogVisible: false,
      radio: 0,
      QHid: "",
    };
  },
  created() {
    this.init();
    this.Manufacturer();
  },
  methods: {
    UpdateProductType: function () {
      if (this.radio == 0) {
        this.$look("warning", "提示！", "请选择一种类型或取消修改！");
        return false;
      }
      var obj = {
        api: "post",
        url: this.$store.state.http + "Product/UpdateProductType",
        data: {
          Id: this.QHid,
          Type: this.radio,
        },
      };
      this.$https(obj).then((res) => {
        this.QHid = "";
        this.dialogVisible = false;
        this.radio = 0;
        this.init();
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    qihaun: function (row) {
      console.log(row);
      this.QHid = row.ID;
      this.dialogVisible = true;
      this.radio = 0;
    },
    // 获取品牌信息
    Manufacturer: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "Product/GetManufacturer",
      };
      this.$https(obj).then((res) => {
        this.options = res.Data;
      });
    },
    // 初始化
    init: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "Product/GetProducts2",
        data: {
          pageNum: this.pageNum,
          numPerPage: this.pagesize,
          orderField: "",
          orderDirection: "",
          proType: "2",
          /// 产品类型 1：零配件 2：整机 3：耗材 4：通用
          // kitflag: false,
          //   规定参数：bool kitflag   true零配件   false整机
          productCode: this.productCode,
          //   产品编码
          barcodeMemo: this.barcodeMemo,
          //   内部编码
          man: this.man,
          //   品牌
          desc: this.desc,
          //   产品描述
          memo: this.memo,
          //   产品备注
        },
      };
      this.$https(obj).then((res) => {
        this.total = res.Data.DataBars;
        this.Data = res.Data.Dtos;
        for (let index = 0; index < this.Data.length; index++) {
          this.Data[index].UpdateDate =
            this.Data[index].UpdateDate.split("T")[0];
        }
        console.log(res.Data.Dtos);
      });
    },
    add: function () {
      // 跳转添加页面
      this.$router.push({ path: "/Machine_add_Homepage" });
    },
    adds: function (res) {
      console.log(res);
      res.ManufacturerAddress = res.ManufacturerId;
      this.$store.state.HomepageData = res;
      this.$router.push({ path: "/Machine_akk_Homepage" });
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
    // 查看
    look: function (res) {
      this.$store.state.HomepageData = res;
      this.$router.push({ path: "/Machine_look" });
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("../../../assets/scss/Tool_database.scss");
</style>>
