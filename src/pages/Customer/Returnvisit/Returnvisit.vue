<template>
  <div class="box">
    <router-view></router-view>
    <div class="TopSerch">
      <el-input style="width:193px" size="mini" v-model="search" placeholder="请输入内容"></el-input>
      <el-select size="mini" style="width:150px" @change="init(1)" v-model="select" placeholder="请选择状态">
        <el-option v-for="item in options" :key="item.index" :label="item.label" :value="item.value"></el-option>
      </el-select>

      <el-select size="mini" style="width:150px" @change="init(1)" v-model="satisfied" placeholder="请选择状态">
        <el-option v-for="item in optionssatisfied" :key="item.index" :label="item.label" :value="item.value"></el-option>
      </el-select>

      <el-select size="mini" style="width:120px" @change="init(1)" v-model="area" clearable placeholder="请选择区域">
        <el-option v-for="item in areaS" :key="item.Value" :label="item.Value" :value="item.Value"></el-option>
      </el-select>

      <el-input style="width:193px" size="mini" v-model="Timeweek" maxlength="2" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入当前日期在本年的周数"></el-input>
      <el-button type="primary" :loading='this.$store.state.Vuex.loading' size="mini" @click="init(1)">检索</el-button>
      <el-button type="success" style="float:right;" icon="el-icon-document-add" circle @click="Generaterecords()"></el-button>
    </div>

    <!--  -->
    <div class="content">
      <el-table :data="data" size="mini" :height="this.$store.state.TableOptimumHeight" highlight-current-row border style="width: 100%" :header-cell-style="{background:'#e1e1e1'}">
        <el-table-column fixed prop="CreateDate" label="创建日期" width="100"></el-table-column>
        <el-table-column prop="Creationweek" width="100" label="创建周"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="CusFullName" label="客户全称"></el-table-column>
        <el-table-column prop="Reporter" label="回访人" width="120"></el-table-column>
        <el-table-column prop="Score" label="得分" width="120"></el-table-column>
        <el-table-column prop="StateStr" label="当前状态" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <!-- 最后一格不给宽度，可自适应。给宽度后，屏宽过大会出现空白模块 -->
          <template slot-scope="scope">
            <el-button-group>
              <el-button v-if="scope.row.StateStr == '正在回访' || scope.row.StateStr == '等待中'" type="primary" size="mini" @click="edit(scope.row,1)">评分</el-button>
              <el-button v-if="scope.row.StateStr == '已完成'" type="primary" size="mini" @click="edit(scope.row,2)">查看</el-button>

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
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      // 检索选项
      search: "",
      options: [
        { label: "全部", value: 0, index: 1 },
        { label: "正在回访", value: 1, index: 2 },
        { label: "已回访", value: 2, index: 3 },
      ],
      optionssatisfied: [
        { label: "满意度", value: 0, index: 1 },
        { label: "不满意", value: 1, index: 2 },
        { label: "一般", value: 2, index: 3 },
        { label: "满意", value: 3, index: 4 },
      ],
      select: 1,
      satisfied: 0,
      Timeweek: "",
      pageNum: 1,
      pagesize: 10,
      total: 0,
      data: [],
      area: "",
      areaS: [],
      load: false,
    };
  },
  created() {
    this.init();
    this.initGetArea();
  },
  components: {},
  methods: {
    // 获取区域
    initGetArea: function () {
      var obj = {
        url: this.$store.state.http + "System/GetArea",
        api: "get",
      };
      this.$https(obj).then((res) => {
        this.areaS = res.Data;
      });
    },
    sele: function () {},
    // 获取记录
    init: function (res) {
      console.log(res);
      if (res == 1) {
        this.pageNum = 1;
      }
      // 周最低传0
      var Timeweekindex = 0;
      this.Timeweek == ""
        ? (Timeweekindex = 0)
        : (Timeweekindex = this.Timeweek);
      var obj = {
        data: {
          search: this.search,
          state: this.select,
          week: Timeweekindex,
          pageNum: this.pageNum, //当前页码
          numPerPage: this.pagesize, //分页条数
          satisfied: this.satisfied,
          area: this.area,
          orderField: "",
          orderDirection: "",
        },
        api: "get",
        url: this.$store.state.http + "CRM/GetCusSerVisits",
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.total = res.Data.DataBars;
        this.data = res.Data.Dtos;
        for (let index = 0; index < this.data.length; index++) {
          const element = this.data[index];
          element.CreateDate = element.CreateDate.split("T")[0];
          element["Creationweek"] = element.Year + " - " + element.Week;
        }
      });
    },
    // 创建记录
    Generaterecords: function () {
      var obj = {
        api: "post",
        url: this.$store.state.http + "CRM/CreateCusSerVisit",
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.init();
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
    edit: function (res, index) {
      this.$store.state.router_Returnvisitdetails_ID = res.Id;
      if (index == 1) {
        this.$router.push({ path: "/Customer_score" });
      } else {
        this.$router.push({ path: "/Customer_Returnvisitdetails" });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import url("./../../../assets/scss/Tool_database.scss");
</style>

