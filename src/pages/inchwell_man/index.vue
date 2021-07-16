<template>
  <div class='box'>
    <div class="TopSerch">
      <!-- 
      <el-autocomplete class="inline-input" size="mini" @input="initData(1)" v-model="GetInchwell.province" style="width: 200px" @select="selectGroup" :show-overflow-tooltip="true" :fetch-suggestions="querySearch"
        placeholder="请选择省份" clearable>
      </el-autocomplete> -->

      <el-select size="mini" style="width:150px" @change="initData(1)" v-model="GetInchwell.province" placeholder="请选择省份" clearable>
        <el-option v-for="item in Provinces" :key="item.value" :label="item.value" :value="item.key" clearable></el-option>
      </el-select>

      <el-select size="mini" style="width:150px" @change="initData(1)" v-model="GetInchwell.role" placeholder="请选择角色" clearable>
        <el-option v-for="item in Roles" :key="item.Name" :label="item.Name" :value="item.Name"></el-option>
      </el-select>

      <el-autocomplete class="inline-input" style="width:150px" size="mini" @input="initData(1)" v-model="GetInchwell.name" @select="selectGroups" :show-overflow-tooltip="true" :fetch-suggestions="querySearchname"
        placeholder="请选择姓名" clearable>
      </el-autocomplete>

      <el-button type="primary" :loading='this.$store.state.Vuex.loading' size="mini" @click="initData(1)">检索</el-button>
      <el-button type="success" style="float:right;" size="mini" @click="dialogTableVisible = true,EditandAdd= true">创建</el-button>
    </div>
    <el-table :data="data" :height="this.$store.state.TableOptimumHeight" size="mini" highlight-current-row border style="width: 100%" :header-cell-style="{background:'#e1e1e1'}">
      <el-table-column prop="Name" label="姓名" width="140"></el-table-column>
      <el-table-column prop="Role" label="角色" width="150"></el-table-column>
      <el-table-column prop="Provincelabel" label="省份" width="150"></el-table-column>
      <el-table-column prop="Mobile" label="手机号" width="100"></el-table-column>
      <el-table-column prop="Tel" label="座机" width="150"></el-table-column>
      <el-table-column prop="Other" label="备注" :show-overflow-tooltip="true"></el-table-column>

      <el-table-column fixed="right" label="操作" width="80">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="Edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加弹窗 -->
    <el-dialog title="添加联系人" :visible.sync="dialogTableVisible" :before-close="handleClose">
      <div class="dial" style="width:100%;height:350px">

        <div class="li">
          <el-autocomplete class="inline-input" size="mini" v-model="CJData.Name" style="width: 300px" @select="selectGroupsCJ" :show-overflow-tooltip="true" :fetch-suggestions="querySearchname" placeholder="选择员工"
            clearable>
            <template slot="prepend">选择员工</template>
          </el-autocomplete>
        </div>

        <div class="li">
          <div class="liLefttext">选择省份</div>
          <el-select size="mini" style="width:209px" v-model="CJData.Province" placeholder="请选择省份" clearable>
            <el-option v-for="item in Provinces" :key="item.value" :label="item.value" :value="item.key"></el-option>
          </el-select>
        </div>

        <div class="li">
          <div class="liLefttext">选择角色</div>
          <el-select size="mini" style="width:209px" v-model="CJData.Role" placeholder="请选择角色" clearable>
            <el-option v-for="item in Roles" :key="item.Name" :label="item.Name" :value="item.Name"></el-option>
          </el-select>
        </div>

        <div class="li">
          <el-input placeholder="请输入手机号" size="mini" style="width: 400px" v-model="CJData.Mobile">
            <template slot="prepend">手机号</template>
          </el-input>
        </div>

        <div class="li">
          <el-input placeholder="请输入座机" size="mini" style="width: 400px" v-model="CJData.Tel">
            <template slot="prepend">座机号</template>
          </el-input>
        </div>

        <div class="li">
          <el-input type="textarea" style="float:left;width:500px" :autosize="{ minRows: 2, maxRows: 4}" placeholder="备注" v-model="CJData.Other"> </el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="delCJData()">取 消</el-button>
        <el-button size="mini" type="primary" @click="AddOrder()">确 定</el-button>
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
import citys from "../../assets/json/citys.json";
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
export default {
  // 定义属性
  data() {
    return {
      GetInchwell: {
        pageNum: 1,
        numPerPage: 10,
        orderField: "",
        orderDirection: "",
        province: "",
        role: "",
        name: "",
      },
      total: 0,
      citys: citys,
      Provinces: [],
      Roles: [],
      Employ: [],
      data: [],
      dialogTableVisible: false,

      CJData: {
        Name: "",
        province: "",
        Role: "",
        Mobile: "",
        Tel: "",
        Other: "",
      },

      EditandAdd: true,
      // true 表示正在创建
      // false 表示编辑
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    // 底部分页
    handleCurrentChange(val) {
      this.GetInchwell.pageNum = val;
      this.initData();
    },
    // 切换 每页条数时触发  刷新
    handleSizeChange(val) {
      this.GetInchwell.numPerPage = val;
      this.initData();
    },
    // 获取列表数据
    initData: function (row) {
      // if (this.name == "") this.GetInchwell.name = "";
      // if (this.province == "") this.GetInchwell.province = "";

      if (row == 1) this.GetInchwell.pageNum = 1;
      var obj = {
        api: "get",
        url: this.$store.state.http + "System/GetInchwellLMs",
        data: this.GetInchwell,
      };
      this.$https(obj).then((res) => {
        this.total = res.Data.DataBars;
        this.data = res.Data.Dtos;

        for (let index = 0; index < this.data.length; index++) {
          const element = this.data[index];
          for (let ind = 0; ind < this.Provinces.length; ind++) {
            const item = this.Provinces[ind];
            if (element.Province == item.key)
              element["Provincelabel"] = item.value;
          }
        }
        console.log(this.data);
      });
    },
    // 获取检索所需数据
    init: function () {
      // 省份
      this.Provinces = [];
      for (let index = 0; index < this.citys.length; index++) {
        this.Provinces.push({
          value: this.citys[index].label,
          key: this.citys[index].value,
        });
      }
      // 角色
      var obj = {
        api: "get",
        url: this.$store.state.http + "System/GetRoles",
        data: {
          one: "",
        },
      };
      this.$https(obj).then((res) => {
        this.Roles = res.Data;
      });
      // 工程师名称
      var obj = {
        api: "get",
        url: this.$store.state.http + "System/GetEmployeeMini",
        data: {
          type: 3,
        },
      };
      this.$https(obj).then((res) => {
        this.Employ = res.Data;
        for (let index = 0; index < this.Employ.length; index++) {
          this.Employ[index]["value"] = this.Employ[index].Name;
        }
        console.log(this.Employ);
      });
    },

    // 选择省份
    selectGroup(val) {
      console.log(val);
      this.GetInchwell.province = val.key;
    },
    querySearch(queryString, cb) {
      if (queryString == undefined || queryString == "")
        return cb(this.Provinces);

      var Search = queryString;
      var Data2 = this.Provinces;
      var DataInit = [];

      for (let index = 0; index < Data2.length; index++) {
        const element = Data2[index];
        if (element.value.indexOf(Search) != -1) {
          DataInit.push(element);
          // break;
        }
      }

      cb(DataInit);
    },
    // 选择姓名
    selectGroups(val) {
      console.log(val);
      this.GetInchwell.name = val.value;
    },
    // 检索名称
    querySearchname(queryString, cb) {
      if (queryString == undefined || queryString == "") return cb(this.Employ);
      var Search = queryString;
      var Data2 = this.Employ;
      var DataInit = [];

      for (let index = 0; index < Data2.length; index++) {
        const element = Data2[index];
        if (element.value.indexOf(Search) != -1) {
          DataInit.push(element);
        }
      }

      cb(DataInit);
    },

    selectGroupsCJ(val) {
      console.log(val);
      this.CJData = val;
    },
    selectGroupCJ(val) {
      console.log(val);
      this.CJData.province = val.key;
    },
    querySearchRole(queryString, cb) {
      var Data = [];
      for (let index = 0; index < this.Roles.length; index++) {
        Data.push({
          value: this.Roles[index].Name,
        });
      }

      if (queryString == undefined || queryString == "") return cb(Data);

      var Search = queryString;
      var Data2 = Data;
      var DataInit = [];

      for (let index = 0; index < Data2.length; index++) {
        const element = Data2[index];
        if (element.value.indexOf(Search) != -1) {
          DataInit.push(element);
          // break;
        }
      }

      cb(DataInit);
    },

    AddOrder: function () {
      if (this.CJData.Name == "" || this.CJData.Name == null) {
        this.$look("warning", "请选择员工！");
        return false;
      }
      if (this.CJData.Province == "" || this.CJData.Province == null) {
        this.$look("warning", "请选择省份！");
        return false;
      }

      if (this.CJData.Role == "" || this.CJData.Role == null) {
        this.$look("warning", "请选择角色！");
        return false;
      }

      if (this.CJData.Mobile == "" || this.CJData.Mobile == null) {
        this.$look("warning", "请输入手机号！");
        return false;
      }

      if (this.CJData.Tel == "" || this.CJData.Tel == null) {
        this.$look("warning", "请输入座机号！");
        return false;
      }

      if (this.EditandAdd) {
        var obj = {
          api: "post",
          url: this.$store.state.http + "System/AddInchwellLM",
          data: this.CJData,
        };
      } else {
        var obj = {
          api: "post",
          url: this.$store.state.http + "System/UpdateInchwellLM",
          data: this.CJData,
        };
      }

      this.$https(obj).then((res) => {
        console.log(res);
        this.delCJData();
        this.initData();
      });
    },
    delCJData: function () {
      this.CJData = {};
      this.nameCJ = "";
      this.provinceCJ = "";
      this.dialogTableVisible = false;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
          this.delCJData();
        })
        .catch((_) => {});
    },

    // 编辑
    Edit: function (row) {
      this.CJData = JSON.parse(JSON.stringify(row));
      console.log(this.CJData);
      this.EditandAdd = false;
      this.dialogTableVisible = true;
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.init();
    this.initData();
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
.liLefttext {
  width: 89px;
  height: 26px;
  background-color: #f5f7fa;
  color: #909399;
  position: relative;
  border: 1px solid #dcdfe6;
  border-radius: 4px 0 0 4px;
  font-size: 12px;
  white-space: nowrap;
  line-height: 26px;
  text-align: center;
  float: left;
}
</style>