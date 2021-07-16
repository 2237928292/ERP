<template>
  <div class='box'>
    <router-view @refresh="init"></router-view>

    <div class="TopSerch">
      <el-input style="width: 193px" size="mini" v-model="GetTargetSalesList.title" @change="init(1)" placeholder="请输入标题"></el-input>

      <el-input style="width: 193px" size="mini" v-model="GetTargetSalesList.name" @change="init(1)" placeholder="请输入姓名"></el-input>

      <el-select size="mini" style="width: 120px" @change="init(1)" v-model="GetTargetSalesList.dep" clearable placeholder="请选择部门">
        <el-option v-for="item in Bumen" :key="item" :label="item" :value="item"></el-option>
      </el-select>

      <el-select size="mini" style="width: 120px" @change="init(1)" v-model="GetTargetSalesList.range" clearable placeholder="请选择时间">
        <el-option v-for="item in JTime" :key="item.key" :label="item.name" :value="item.key"></el-option>
      </el-select>

      <el-button type="primary" :loading="this.$store.state.Vuex.loading" size="mini" @click="init(1)">检索</el-button>

      <el-button type="success" size="mini" style="float: right" @click="dialogTableVisible = true">创建</el-button>
    </div>

    <el-table size="mini" :data="Data" highlight-current-row :height="this.$store.state.TableOptimumHeight" border style="width: 100%" :header-cell-style="{background:'#e1e1e1'}">
      <el-table-column fixed prop="Title" :show-overflow-tooltip="true" label="标题"></el-table-column>
      <el-table-column prop="Creater" width="150" label="创建人"></el-table-column>
      <el-table-column prop="Responsible" width="150" label="目标人"></el-table-column>
      <el-table-column prop="Department" width="100" label="隶属部门"></el-table-column>
      <!-- <el-table-column prop="Amount" width="100" label="目标金额"></el-table-column> -->

      <el-table-column width="150" label="目标金额">
        <template slot-scope="scope">
          <p class='textR'>￥{{parseInt(scope.row.Amount).toLocaleString()}}</p>
        </template>
      </el-table-column>

      <el-table-column prop="Begin" width="100" label="开始时间"></el-table-column>
      <el-table-column prop="End" width="100" label="结束时间"></el-table-column>

      <el-table-column fixed="right" width="100" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="msglook(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="创建目标" :visible.sync="dialogTableVisible" :before-close="handleClose">
      <div class="dial" style="width:100%;height:300px">

        <div class="li">
          <el-input placeholder="请输入标题" size="mini" style="width:350px" v-model="TargetSales.Title">
            <template slot="prepend">标题</template>
          </el-input>
        </div>

        <div class="li">
          <el-radio-group v-model="name" size="mini">
            <el-radio-button label="个人"></el-radio-button>
            <el-radio-button label="部门"></el-radio-button>
          </el-radio-group>
        </div>

        <div class="li" v-show="name == '个人' ">
          <el-autocomplete class="inline-input" size="mini" style="width:350px" v-model="Selectgeren" :show-overflow-tooltip="true" :fetch-suggestions="querySearch" placeholder="请输入关键词" @select="handleSelect" clearable>
            <template slot="prepend">选择员工</template>
          </el-autocomplete>
        </div>

        <div class="li" v-show="name != '个人' ">
          <el-select size="mini" style="width: 150px" v-model="SelectSector" clearable placeholder="请选择部门">
            <el-option v-for="item in Bumen" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </div>

        <div class="li">
          <el-input placeholder="请输入目标金额" size="mini" style="width:350px" v-model="TargetSales.Amount">
            <template slot="prepend">目标金额</template>
          </el-input>
        </div>

        <div class="li">
          <el-date-picker v-model="Time" value-format="yyyy-MM-dd" type="monthrange" size="mini" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份">
          </el-date-picker>
        </div>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogTableVisible = false">取 消</el-button>
        <el-button size="mini" @click="initMBJX" type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="目标进度" :visible.sync="dialogTableVisibleTrue" :before-close="handleClose">
      <div class="dial" style="width:100%;height:300px">

        <div class="li">
          <span>目标标题</span>{{item.Title}}
        </div>

        <div class="li">
          <span>目标人</span>{{item.Responsible}}
        </div>

        <div class="li">
          <span>目标部门</span>{{item.Department}}
        </div>

        <div class="li">
          <span>目标金额</span>￥{{parseInt(item.Amount).toLocaleString()}}
        </div>

        <div class="li">
          <span>实现金额</span>￥{{parseInt(item.Data).toLocaleString()}}
        </div>

        <div class="li">
          <span>时间范围</span>{{item.Begin + ' 至 ' + item.End}}
        </div>

        <div class="li">
          <span>目标进度</span>
          <div class="JD">
            <div id="JDT"></div>
          </div>
          <p style="float:right">{{item.JD}}</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogTableVisibleTrue = false" type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <nav style="text-align: center">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="this.$store.state.Vuex.pageSNumber" :page-size="100"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </nav>

  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
export default {
  // 定义属性
  data() {
    return {
      total: 0,
      Data: [],
      GetTargetSalesList: {
        pageNum: 1,
        numPerPage: 10,
        orderField: "",
        orderDirection: "",
        title: "",
        name: "",
        dep: "",
        range: 0,
        /// 0：全部
        /// 1：当前年
        /// 2：当前季
        /// 3：当前月
      },
      Bumen: ["客服部", "保养部", "销售部"],
      JTime: [
        { key: 0, name: "全部" },
        { key: 1, name: "当前年" },
        { key: 2, name: "当前季" },
        { key: 3, name: "当前月" },
      ],

      dialogTableVisible: false,
      dialogTableVisibleTrue: false,
      name: "个人",
      Time: "",
      // 选择的员工 部门

      Selectgeren: "",
      SelectStaff: {},
      SelectSector: "",
      TargetSales: {
        Responsible: "",
        // 目标人
        ResponsibleId: "",
        // 目标人ID
        Amount: "",
        // 目标金额
        Begin: "",
        End: "",
        // 时间范围
        Type: 1,
        Title: "",
      },
      YGList: [],

      item: {},
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    formatPrice: function (number, sign) {
      !sign && (sign = ",");
      var parts = number.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, sign);
      return parts.join(".");
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
          this.deleteadddata();
        })
        .catch((_) => {});
    },
    //输入第几页
    handleCurrentChange(val) {
      this.GetTargetSalesList.pageNum = val;
      this.init();
    },
    // 切换 每页条数时触发  刷新
    handleSizeChange(val) {
      this.GetTargetSalesList.numPerPage = val;
      this.init(1);
    },
    init: function (num) {
      if (num == 1) {
        this.GetTargetSalesList.pageNum = 1;
      }
      var obj = {
        api: "get",
        url: this.$store.state.http + "PCenter/GetTargetSales",
        data: this.GetTargetSalesList,
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);
        this.total = res.Data.DataBars;
        this.Data = res.Data.Dtos;
        for (let index = 0; index < this.Data.length; index++) {
          const element = this.Data[index];
          element.Begin = element.Begin.slice(0, 7);
          element.End = element.End.slice(0, 7);
        }
      });
    },
    inintYG: function () {
      var obj = {
        data: {
          type: 3,
        },
        api: "get",
        url: this.$store.state.http + "System/GetEmployeeMini",
      };
      this.$https(obj).then((res) => {
        for (var i = 0; i < res.Data.length; i++) {
          res.Data[i]["value"] = res.Data[i].Name;
        }
        this.YGList = res.Data;
      });
    },
    querySearch(queryString, cb) {
      if (queryString == undefined) {
        queryString = "";
        return false;
      }

      var DataInit = [];

      for (let index = 0; index < this.YGList.length; index++) {
        const element = this.YGList[index];
        if (element.value.indexOf(queryString) != -1) {
          DataInit.push(element);
        }
      }
      cb(DataInit);
    },
    handleSelect(item) {
      console.log(item);
      this.SelectStaff = item;
    },
    // 创建
    initMBJX: function () {
      if (this.name == "个人")
        (this.TargetSales.Responsible = this.SelectStaff.Name),
          (this.TargetSales.ResponsibleId = this.SelectStaff.EmployeeId);
      if (this.name == "部门")
        (this.TargetSales.Responsible = this.SelectSector),
          (this.TargetSales.ResponsibleId = this.SelectSector);

      if (this.Time == "") {
        this.$look("warning", "未选择时间！");
        return false;
      }

      this.TargetSales.Begin = this.Time[0];
      this.TargetSales.End = this.Time[1];

      var obj = {
        api: "post",
        url: this.$store.state.http + "PCenter/AddTargetSales",
        data: this.TargetSales,
      };
      this.$https(obj).then((res) => {
        this.TargetSales = {};
        this.Selectgeren = "";
        this.Time = "";
        this.dialogTableVisible = false;
        this.init();
      });
    },
    // 查看
    msglook: function (item) {
      this.item = item;
      console.log(item.ID);
      var obj = {
        api: "get",
        url: this.$store.state.http + "PCenter/StatTargetSales",
        data: { tsId: item.ID },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.item.Data = res.Data;
        this.item.JD =
          ((Number(this.item.Data) / Number(this.item.Amount)) * 100).toFixed(
            2
          ) + "%";
        this.dialogTableVisibleTrue = true;
        setTimeout(() => {
          //设置延迟执行
          var JDT = document.getElementById("JDT");
          JDT.style.width = this.item.JD;
        }, 100);
      });
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.init();
    this.inintYG();
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
.li {
  span {
    width: 100px;
    display: block;
    float: left;
    font-size: 13px;
    font-weight: bold;
  }
  .JD {
    width: calc(100% - 200px);
    height: 7px;
    background-color: #ebeef5;
    border-radius: 5px;
    margin-top: 5px;
    overflow: hidden;
    float: left;
    div {
      height: 100%;
      transition: 2s;
      background-color: #409eff;
    }
  }
}
.textR {
  text-align: right;
}
</style>