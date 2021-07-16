<template>
  <div class="box">
    <!-- 头部检索 -->
    <div class="TopSerch">
      <el-input style="width:193px" size="mini" v-model="search" placeholder="请输入内容"></el-input>
      <!-- 选择是否可用 -->
      <el-select size="mini" style="width:100px" v-model="select" @change="sele()" placeholder="请选择">
        <el-option v-for="item in options" :key="item.index" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-button type="primary" :loading='this.$store.state.Vuex.loading' size="mini" @click="init()">检索</el-button>
      <el-button type="success" style="float:right;" size="mini" @click="dialogTableVisible = true">添加</el-button>
    </div>

    <!-- 中部 -->

    <el-table :data="data" size="mini" :height="this.$store.state.TableOptimumHeight" highlight-current-row border style="width: 100%" :header-cell-style="{background:'#e1e1e1'}">
      <el-table-column fixed prop="UserName" label="登录名" width="150"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="Memo" label="姓名"></el-table-column>

      <el-table-column label="身份">
        <template slot-scope="scope">{{scope.row.Roles | capitalize}}</template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button-group>
            <el-switch v-model="scope.row.Enable" @change="switchs(scope.row)" class="an" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-button-group>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="密码重置" width="120">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" size="mini" @click="PassWordG(scope.row)">重置</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加弹窗 -->
    <!-- 添加弹窗 -->
    <el-dialog title="添加工具" :visible.sync="dialogTableVisible" :before-close="handleClose">
      <div class="dial" style="width:100%;height:300px">
        <div class="templi">
          <el-input placeholder="请输入内容" size="mini" v-model="UserName">
            <template slot="prepend">用户名</template>
          </el-input>
        </div>
        <div class="templi">
          <el-input placeholder="请输入内容" size="mini" v-model="Memo">
            <template slot="prepend">名&nbsp;字</template>
          </el-input>
        </div>
        <div class="templi">
          <el-input placeholder="请输入内容" size="mini" v-model="PassWord" show-password>
            <template slot="prepend">密&nbsp;码</template>
          </el-input>
        </div>
        <!-- 二次确认框 -->
        <div class="templi">
          <el-input placeholder="请输入内容" size="mini" v-model="PassWordtwo" show-password>
            <template slot="prepend">确认密码</template>
          </el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="addtrue()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: "", //检索项
      state: "", //检索状态

      data: [],
      options: [
        { label: "可用", value: true, index: 1 },
        { label: "不可用", value: false, index: 2 },
      ],
      select: true,
      dialogTableVisible: false, //弹窗

      UserName: "", // 用户名
      Memo: "", //这是姓名
      PassWord: "", //明文密码
      PassWordtwo: "", //二次输入确认密码
    };
  },
  created() {
    this.init();
  },
  filters: {
    capitalize: function (value) {
      var xxx = "";
      for (var i = 0; i < value.length; i++) {
        //这里的str就是为了获取每次循环的arr中的值
        xxx += value[i].Name + " ";
      } //就相当于 String str=arr[i]        }
      return xxx;
    },
  },
  methods: {
    // 重置密码
    PassWordG: function (row) {},
    //   初始化
    init: function () {
      if (localStorage.getItem("sf") != "kehu") {
        return false;
      }
      var obj = {
        data: {
          cusId: JSON.parse(localStorage.getItem("Logo")).CusId,
          enable: this.select,
          role: "",
          search: this.search,
        },
        api: "get",
        url: this.$store.state.http + "CRM/GetCusAccounts",
      };
      this.$https(obj).then((res) => {
        console.log(res.Data.Dtos);
        this.data = res.Data.Dtos;
      });
    },
    // 更改客户状态
    switchs: function (rew) {
      var obj = {
        data: {
          Str: rew.Id,
        },
        api: "post",
        url: this.$store.state.http + "CRM/SetCusAccount",
      };
      this.$https(obj).then((res) => {
        this.init();
        this.$message({
          message: "修改状态成功",
          type: "success",
        });
      });
    },
    //选择检索状态
    sele: function () {
      this.init();
    },
    // 确认添加客户数据
    addtrue: function () {
      if (this.UserName == "" || this.Memo == "" || this.PassWord == "") {
        this.$msgnow("warning", "请输入完整");
        return false;
      }

      if (this.PassWord != this.PassWordtwo) {
        this.$msgnow("warning", "密码输入不一致");
        return false;
      }

      var obj = {
        data: {
          cusId: JSON.parse(localStorage.getItem("Logo")).CusId,
          UserName: this.UserName, // 用户名
          Memo: this.Memo, //这是姓名
          PassWord: this.PassWord, //明文密码
          Role: "客户",
        },
        api: "post",
        url: this.$store.state.http + "CRM/AddCusAccount",
      };
      this.$https(obj).then((res) => {
        this.dialogTableVisible = false;
        this.init();
        (this.UserName = ""), (this.PassWord = ""), (this.Memo = "");
      });
    },
    // 点击外围关闭当前弹窗
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
          this.deleteadddata();
        })
        .catch((_) => {});
    },
  },
};
</script>
<style lang="scss" scoped>
@import url("../../assets/scss/Tool_database.scss");
.templi {
  width: 100%;
  height: 50px;
  padding: 10px 0px;
  box-sizing: border-box;
}
</style>