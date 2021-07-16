<template>
  <div class="box_s">

    <div class="top_init_data">
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
        <el-option v-for="item in options" :key="item.ID" :label="item.Name" :value="item.Name"></el-option>
      </el-select>
      <!-- 选择品牌 -->
    </div>

    <!-- 表格 -->
    <div class="content" style=" padding: 0px 25px;box-sizing: border;">
      <el-table :data="Data" :height="this.$store.state.TableOptimumHeight" size="mini" highlight-current-row border style="width: 100%" :header-cell-style="{background:'#e1e1e1'}">
        <el-table-column prop="ProductCode" label="产品编号" width="170"></el-table-column>
        <!-- <el-table-column fixed prop="Name" label="姓名" width="150"></el-table-column> -->
        <!-- <el-table-column :show-overflow-tooltip="true" prop="Content" label="ID"></el-table-column> -->
        <el-table-column prop="BarcodeMemo" label="内部编码" width="140"></el-table-column>
        <el-table-column prop="Manufacturer" label="品牌" width="120"></el-table-column>

        <el-table-column prop="Characteristics" label="产品描述" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="Unit" label="单位" width="120"></el-table-column>
        <el-table-column prop="UpdateDate" label="更新时间" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="80">
          <!-- 最后一格不给宽度，可自适应。给宽度后，屏宽过大会出现空白模块 -->
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="adds(scope.row)">添加</el-button>
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
    };
  },
  created() {
    this.init();
    // 初始化
    this.Manufacturer();
  },
  methods: {
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
        url: this.$store.state.http + "Product/GetProductsAsync",
        data: {
          pageNum: this.pageNum,
          numPerPage: this.pagesize,
          orderField: "",
          orderDirection: "",
          kitflag: true,
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
          this.Data[index].UpdateDate = this.Data[index].UpdateDate.split(
            "T"
          )[0];
        }
        console.log(res.Data.Dtos);
      });
    },
    adds: function (res) {
      console.log(res);
      var arr = res;
      // arr['index'] = 1
      this.$set(arr, "index", 1);
      this.$store.state.Vuex.AddindexequipmentList.push(arr);
      this.$emit("refresh"),
        this.$router.push({
          path: "/AddOrderindex",
        });
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

<style lang="scss" scoped>
@import url("../../../../assets/scss/Tool_database.scss");
</style>
