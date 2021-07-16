<template>
  <div class='box_s'>

    <div style="width:800px">

      <el-form ref="form" :model="form" label-width="80px">

        <el-form-item label="产品">
          <el-button v-if="GDProIdData.Characteristics == undefined" size="mini" type="primary" @click="GDProId">选择产品</el-button>

          <el-card v-if="GDProIdData.Characteristics != undefined" class="box-card" size='mini'>
            <div slot="header" class="clearfix" style="margin:-10px">
              <span>{{GDProIdData.Characteristics}}</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click='GDProId'>重新选择</el-button>
            </div>
            <div style="margin:-15px">
              <p> <span style="marginRight:100px">产品编号</span> {{ GDProIdData.ProductCode }}</p>
              <p> <span style="marginRight:100px">内部编码</span> {{ GDProIdData.BarcodeMemo }}</p>
              <p> <span style="marginRight:100px">{{ '品牌' + '&emsp;&emsp;'  }} </span> {{ GDProIdData.Manufacturer }}</p>

            </div>
          </el-card>

        </el-form-item>

        <el-form-item label="库位">
          <el-input v-model="form.Position" size="mini" style="width:300px"></el-input>
          <el-link :underline="false" type="info">如果此库位不存在，系统会自动添加库位</el-link>

        </el-form-item>

        <el-form-item label="隶属">
          <el-radio-group v-model="form.Belong" size="mini">
            <el-radio label="客服部"></el-radio>
            <el-radio label="培训室"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="备注">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" size="mini" v-model="form.Memo"></el-input>
        </el-form-item>

        <el-form-item>

          <el-button size="mini" @click="onSubmitON">取消</el-button>
          <el-button size="mini" type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 弹窗 -->

    <el-drawer :visible.sync="drawer" direction="ltr" :modal="false" style="width: 200%" title="添加设备" :before-close="handleClose">

      <div class="top_init_data" style="marginbottom: 10px">
        <!-- 检索内容 -->
        <el-input style="width: 193px" size="mini" v-model="productCode" @change="select()" placeholder="请输入产品编码"></el-input>
        <!-- 产品编码 -->
        <el-input style="width: 193px" size="mini" v-model="barcodeMemo" @change="select()" placeholder="请输入内部编码"></el-input>
        <!-- 内部编码 -->
        <el-input style="width: 193px" size="mini" v-model="desc" @change="select()" placeholder="请输入产品描述"></el-input>
        <!-- 描述 -->
        <el-input style="width: 193px" size="mini" v-model="memo" @change="select()" placeholder="请输入产品备注"></el-input>
        <!-- 备注 -->
        <el-autocomplete class="inline-input" size="mini" v-model="man" style="width: 200px" :show-overflow-tooltip="true" :fetch-suggestions="querySearchPP" placeholder="请选择品牌" @select="handleSelect" clearable>
        </el-autocomplete>

        <el-button size="mini" type="primary" @click="select()" style="float: right">检索</el-button>
        <!-- 选择品牌 -->
      </div>

      <!-- 表格 -->
      <el-table :data="Data" size="mini" :height="this.$store.state.TableOptimumHeight" border style="marginbottom: 10px" ref="multipleTable" :header-cell-style="{ background: '#e1e1e1' }">
        <el-table-column prop="ProductCode" label="产品编号" width="170"></el-table-column>
        <el-table-column prop="BarcodeMemo" label="内部编码" width="140"></el-table-column>
        <el-table-column prop="SN" label="序列号" width="130"></el-table-column>
        <el-table-column prop="Manufacturer" label="品牌" width="120"></el-table-column>
        <el-table-column prop="Characteristics" label="产品描述" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column fixed="right" label="操作" width="80">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="adds(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <nav style="text-align: center">
        <el-pagination class="pagition-li" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="this.$store.state.Vuex.pageSNumber" :page-size="pagesize"
          layout=" total , sizes, prev, pager, next, jumper " :total="total"></el-pagination>
      </nav>
    </el-drawer>

  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
export default {
  // 定义属性
  data() {
    return {
      form: {
        Position: "",
        Belong: "",
        Memo: "",
      },
      drawer: false,

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
      GDProIdData: {},
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    //  获取品牌
    Manufacturer: function () {
      var obj = {
        url: this.$store.state.http + "System/GetBrand",
        api: "get",
      };
      this.$https(obj).then((res) => {
        this.options = res.Data;
        for (let index = 0; index < this.options.length; index++) {
          this.options[index]["value"] = this.options[index].Value;
        }
        console.log(this.options);
      });
    },

    // 键入
    querySearchPP(queryString, cb) {
      if (queryString == undefined) {
        queryString = "";
        cb(this.options);
        return false;
      }
      if (queryString == "") {
        cb(this.options);
        return false;
      }

      var Search = queryString;
      var Data2 = this.options;
      var DataInit = [];
      var input = Search.split("")[0];

      for (let index = 0; index < Data2.length; index++) {
        const element = Data2[index];
        if (element.value.indexOf(Search) != -1) {
          DataInit.push(element);
          // break;
        }
      }

      cb(DataInit);
    },

    // 点击客户
    handleSelect(item) {
      console.log(item);
      this.man = item.value;
    },
    onSubmit: function () {
      if (this.GDProIdData.Characteristics == undefined) {
        this.$look("warning", "请选择整机！");
        return false;
      }

      if (this.form.Position == "") {
        this.$look("warning", "请输入库位！");
        return false;
      }

      if (this.form.Belong == "") {
        this.$look("warning", "请选择隶属");
        return false;
      }

      var obj = {
        api: "post",
        url: this.$store.state.http + "StorageRoom/AddStandby",
        data: {
          ProId: this.GDProIdData.ID,
          Position: this.form.Position,
          Memo: this.form.Memo,
          Belong: this.form.Belong == "客服部" ? 1 : 2,
        },
      };
      this.$https(obj).then((res) => {
        this.$emit("refresh"),
          this.$router.push({ path: "/SparePartsStorehouse" });
        this.$msgs(0, "添加成功！");
      });
    },

    GDProId: function () {
      this.drawer = true;
    },

    select: function (i) {
      if (i != undefined || i != null) {
        this.pageNum = 1;
      }
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
          // kitflag: true,
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
        console.log();
        this.Data = res.Data.Dtos;

        this.total = res.Data.DataBars;
        this.gridData = res.Data.Dtos;
        for (let index = 0; index < this.gridData.length; index++) {
          this.gridData[index].UpdateDate =
            this.gridData[index].UpdateDate.split("T")[0];
        }
        console.log(this.gridData);
      });
    },
    //   关闭窗口
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },

    onSubmitON: function () {
      this.$emit("refresh"),
        this.$router.push({ path: "/SparePartsStorehouse" });
    },

    //输入第几页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.select();
    },
    // 切换 每页条数时触发  刷新
    handleSizeChange(val) {
      this.pagesize = val;
      this.select(1);
    },

    // 单个添加
    adds: function (res) {
      console.log(res);
      this.GDProIdData = res;
      this.drawer = false;
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.select();
    this.Manufacturer();
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang='scss' scoped>
</style>