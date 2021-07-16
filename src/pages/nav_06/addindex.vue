<template>
  <div class="box_s  managementHTbox_s">

    <div class="select">
      <el-autocomplete class="inline-input" size="mini" v-model="ToolObjectId " style="width:350px" :show-overflow-tooltip="true" :fetch-suggestions="querySearch" placeholder="请选择客户" @select="handleSelect" clearable>
        <template slot="prepend">选择客户</template>
      </el-autocomplete>
    </div>

    <div class="select">
      <el-autocomplete class="inline-input" size="mini" style="width:350px" v-model="Selectcontact " :show-overflow-tooltip="true" :fetch-suggestions="querySearchs" placeholder="请选择联系人" @select="handleSelects" clearable>
        <template slot="prepend">联 系 人</template>
      </el-autocomplete>
    </div>

    <div class="select">
      <el-input placeholder="请输入英文名" style="width:350px" prop="Mobile" size="mini" v-model="formLabelAlign.NameEn">
        <template slot="prepend">英 文 名</template>
      </el-input>
    </div>

    <div class="select">
      <el-input placeholder="请输入手机" style="width:350px" prop="Mobile" size="mini" v-model="formLabelAlign.Mobile">
        <template slot="prepend">手 &nbsp; 机</template>
      </el-input>
    </div>

    <div class="select">
      <el-input placeholder="请输入合同编号" style="width:350px" prop="Mobile" size="mini" v-model="ContractNo">
        <template slot="prepend">合同编号</template>
      </el-input>
    </div>

    <div class="select">
      <span>隶属公司：</span>
      <el-select size="mini" style="width:150px" v-model="company" placeholder="请选择隶属公司" clearable>
        <el-option v-for="item in options" :key="item.index" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>

    <div class="select">
      <span>合同类型：</span>
      <el-select size="mini" style="width:150px" v-model="ContractType" placeholder="请选择合同类型" clearable>
        <el-option v-for="item in optionss" :key="item.index" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>

    <div class="bottom_but">
      <el-button type="primary" size="mini" @click="submitForm()">立即创建</el-button>
      <!-- <el-button @click="resetForm()">重置</el-button> -->
    </div>

  </div>
</template>
<script>
import Sortable from "sortablejs";
export default {
  data() {
    return {
      ToolObjectId: "", //公司展示
      ToolProId: "", //公司ID
      Selectcontact: "", // 联系人 __ 展示
      ContractNo: "", // 合同编号
      company: "", // 隶属公司
      ContractType: "", // 合同类型
      formLabelAlign: {
        Name: "",
        Mobile: "",
        NameEn: "",
      },
      options: [
        { label: "技术公司", value: "技术公司", index: 2 },
        { label: "服务公司", value: "服务公司", index: 3 },
      ], // 状态数据
      optionss: [
        { label: "AS", value: "AS", index: 2 },
        { label: "MC", value: "MC", index: 3 },
      ], // 状态数据
    };
  },
  created() {
    var CuiId = this.$store.state.Vuex.CusId;
    if (CuiId != "010101") {
      this.ToolProId = CuiId.split("010101")[0];
      this.ToolObjectId = CuiId.split("010101")[1];
    }
  },
  methods: {
    submitForm: function () {
      if (this.ToolProId === "") {
        this.$look("warning", "警告！", "请选择客户！");
        return false;
      }
      if (this.formLabelAlign.Name === "") {
        this.$look("warning", "警告！", "请补全联系人！");
        return false;
      }
      if (this.formLabelAlign.NameEn === "") {
        this.$look("warning", "警告！", "请补全联系人英文名！");
        return false;
      }
      if (this.formLabelAlign.Mobile === "") {
        this.$look("warning", "警告！", "请补全联系人手机号！");
        return false;
      }
      if (this.ContractNo === "") {
        this.$look("warning", "警告！", "请输入合同编号！");
        return false;
      }
      if (this.company === "") {
        this.$look("warning", "警告！", "请选择隶属公司！");
        return false;
      }
      if (this.ContractType === "") {
        this.$look("warning", "警告！", "请选择合同类型！");
        return false;
      }
      if (
        this.ContractNo.substring(this.ContractNo.length - 2) !=
        this.ContractType
      ) {
        this.$look("warning", "警告！", "合同编号与合同类型不符！");
        return false;
      }

      // 判断是否为 复制创建
      var CuiId = this.$store.state.Vuex.CusId;
      if (CuiId != "010101") {
        this.CopyMaintain();
      } else {
        this.CreateMC();
      }
    },
    // 复制创建
    CopyMaintain: function () {
      var CuiId = this.$store.state.Vuex.CusId;
      var obj = {
        api: "post",
        url: this.$store.state.http + "Maintain/CopyMaintain",
        data: {
          // ! 差异  旧合同ID
          OldMaintainId: CuiId.split("010101")[2],
          CusId: this.ToolProId,
          LinkMan: this.formLabelAlign.Name,
          LinkManEngilsh: this.formLabelAlign.NameEn,
          Mobile: this.formLabelAlign.Mobile,
          Belong: this.company,
          ConrtractType: this.ContractType,
          MaintainCode: this.ContractNo,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.$emit("refresh"),
          this.$router.push({ path: "/MaintenanceManagement" });
      });
    },
    // 直接创建
    CreateMC: function () {
      var obj = {
        api: "post",
        url: this.$store.state.http + "Maintain/CreateMC",
        data: {
          CusId: this.ToolProId,
          LinkMan: this.formLabelAlign.Name,
          LinkManEngilsh: this.formLabelAlign.NameEn,
          Mobile: this.formLabelAlign.Mobile,
          Belong: this.company,
          ConrtractType: this.ContractType,
          MaintainCode: this.ContractNo,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.$emit("refresh"),
          this.$router.push({ path: "/MaintenanceManagement" });
      });
    },
    //筛选联系人
    querySearchs(queryString, cb) {
      if (this.ToolProId == "") {
        console.log("0000bj");
        return false;
      }
      var obj = {
        data: {
          cusId: this.ToolProId,
        },
        api: "get",
        url: this.$store.state.http + "CRM/GetCusLinkManMini",
        header: this.$store.state.token,
      };
      this.$https(obj).then((res) => {
        console.log(res.Data.Dtos);
        var asd = [];
        if (res.Data.Dtos.length == 0) {
          cb([]);
          return false;
        }
        for (var i = 0; i < res.Data.Dtos.length; i++) {
          res.Data.Dtos[i]["value"] = res.Data.Dtos[i].Name;
        }
        cb(res.Data.Dtos);
      });
    },
    // 筛选客户
    querySearch(queryString, cb) {
      console.log(queryString);
      if (queryString == undefined) {
        queryString = "";
        return false;
      }
      if (queryString == "") {
        queryString = "北京";
      }
      var obj = {
        data: {
          search: queryString,
        },
        api: "get",
        url: this.$store.state.http + "CRM/GetCustomerMini",
        header: this.$store.state.token,
      };
      this.$https(obj).then((res) => {
        console.log(res.Data.Dtos);
        var asd = [];
        if (res.Data.Dtos.length == 0) {
          cb([]);
          return false;
        }
        for (var i = 0; i < res.Data.Dtos.length; i++) {
          res.Data.Dtos[i]["value"] = res.Data.Dtos[i].FullName;
        }
        cb(res.Data.Dtos);
      });
    },
    // 点击联系人
    handleSelects(res) {
      this.formLabelAlign = res;
    },
    // 点击客户
    handleSelect(item) {
      if (item.ImageUrl != null) {
        this.StoreHttp =
          this.$store.state.Filehttp + "CusTool/" + item.ImageUrl;
      } else {
        this.StoreHttp = "";
      }
      this.item = [];
      this.item[0] = item;
      this.ToolProId = item.CusId;
      console.log(this.ToolProId);
      this.Selectcontact = "";
      this.formLabelAlign = {
        Name: "",
        Email: "",
        Tel: "",
        LinkManId: "",
        Address: "",
        Default: "",
        Mobile: "",
        NameEn: "",
      };
    },
  },
};
</script>
<style scoped>
</style>
