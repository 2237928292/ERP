<template>
  <div class="box_s">
    <div class="box_Width" style="width: 800px">
      <el-autocomplete class="inline-input" size="mini" style="width: 100%" v-model="ToolObjectId" :show-overflow-tooltip="true" :fetch-suggestions="querySearch" placeholder="请选择客户" @select="handleSelect" clearable>
        <template slot="prepend">客 &nbsp; 户</template>
      </el-autocomplete>

      <el-autocomplete class="inline-input MTop" size="mini" v-model="Selectcontact" :show-overflow-tooltip="true" :fetch-suggestions="querySearchs" placeholder="请选择联系人" @select="handleSelects" clearable>
        <template slot="prepend">联系人</template>
      </el-autocomplete>

      <el-input placeholder="请输入手机" prop="Mobile" size="mini" class="Input_li" v-model="formLabelAlign.Mobile">
        <template slot="prepend">手 &nbsp; 机</template>
      </el-input>

      <!-- <el-input disabled placeholder="请输入电话" size="mini"  class="Input_li" v-model="formLabelAlign.Tel">
        <template slot="prepend">电话</template>
      </el-input> -->

      <!-- <el-input disabled placeholder="请输入地址" prop="Mobile" size="mini"  class="Input_li" v-model="formLabelAlign.Address">
        <template slot="prepend">地址</template>
      </el-input> -->

      <el-input placeholder="请输入邮箱" size="mini" class="Input_li" v-model="formLabelAlign.Email">
        <template slot="prepend">邮 &nbsp; 箱</template>
      </el-input>

      <div class="Input_li">
        <span style="fontsize: 12px">选择服务日期：</span>
        <el-date-picker v-model="formLabelAlign.ServiceDate" value-format="yyyy-MM-dd" size="mini" type="date" placeholder="选择日期" style="width: 220px">
        </el-date-picker>
      </div>

      <div class="Input_li">
        <span style="fontsize: 12px">选择服务类型：</span>
        <el-select v-model="formLabelAlign.ServiceType" size="mini" placeholder="请选择" style="width: 220px">
          <el-option v-for="item in options" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </div>

      <el-input v-if="formLabelAlign.ServiceType == '维修' " placeholder="请输入序列号" class="Input_li" prop="Mobile" size="mini" v-model="formLabelAlign.SerialNumber">
        <template slot="prepend">序列号</template>
      </el-input>

      <el-input v-if="formLabelAlign.ServiceType == '维修' " placeholder="请输入型号" class="Input_li" prop="Mobile" size="mini" v-model="formLabelAlign.Model">
        <template slot="prepend">型 &nbsp; 号</template>
      </el-input>

    </div>
    <el-button type="primary" :loading="this.$store.state.Vuex.loading" class="but" @click="InitWord()" size="mini">创建日报</el-button>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      ToolObjectId: "",
      ToolProId: "",
      Selectcontact: "",
      formLabelAlign: {
        Name: "",
        Email: "",
        Tel: "",
        LinkManId: "",
        Address: "",
        Default: "",
        Mobile: "",
        NameEn: "",
        SerialNumber: "",
        Model: "",
        ServiceDate: "",
        ServiceType: "",
      },
      options: [
        "保养",
        "维修",
        "安装",
        "培训",
        "VIP回访",
        "钣喷回访",
        "VIP与钣喷回访回访",
        "回访",
        "地基勘探",
        "乘车",
        "调休",
        "年假",
        "事假",
        "其他",
      ],
    };
  },
  created() {},
  components: {},
  methods: {
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
        console.log(res.Data.Dtos);
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
        console.log(res.Data.Dtos);
        cb(res.Data.Dtos);
      });
    },
    // 点击联系人
    handleSelects(res) {
      console.log(res);
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
    // 创建
    InitWord: function () {
      var Data = {
        CustomerId: this.ToolProId,
        ServiceDate: this.formLabelAlign.ServiceDate,
        ServiceType: this.formLabelAlign.ServiceType,
        LinkMan: this.Selectcontact,
        LinkTel: this.formLabelAlign.Mobile,
        LinkEmail: this.formLabelAlign.Email,
        SerialNumber: this.formLabelAlign.SerialNumber,
        Model: this.formLabelAlign.Model,
        Abscissa: 0,
        Ordinate: 0,
      };

      console.log(Data);

      if (this.ToolProId == "") {
        this.$look("warning", "警告！", "请选择客户！");
        return false;
      }
      if (this.Selectcontact == "") {
        this.$look("warning", "警告！", "请选择联系人！");
        return false;
      }

      if (this.formLabelAlign.Mobile == "") {
        this.$look("warning", "警告！", "请输入联系人手机号！");
        return false;
      }
      if (this.formLabelAlign.Email == "") {
        this.$look("warning", "警告！", "请输入联系人邮箱！");
        return false;
      }

      if (
        this.formLabelAlign.ServiceDate == "" ||
        this.formLabelAlign.ServiceDate == undefined
      ) {
        this.$look("warning", "警告！", "请选择服务日期！");
        return false;
      }
      if (
        this.formLabelAlign.ServiceType == "" ||
        this.formLabelAlign.ServiceType == undefined
      ) {
        this.$look("warning", "警告！", "请选择服务类型！");
        return false;
      }

      if (this.formLabelAlign.ServiceType == "维修") {
        if (
          this.formLabelAlign.SerialNumber == "" ||
          this.formLabelAlign.SerialNumber == undefined
        ) {
          this.$look("warning", "警告！", "请输入序列号！");
          return false;
        }
        if (
          this.formLabelAlign.Model == "" ||
          this.formLabelAlign.Model == undefined
        ) {
          this.$look("warning", "警告！", "请输入型号！");
          return false;
        }
      }

      var obj = {
        api: "post",
        url: this.$store.state.http + "PCenter/AddWorkDaily",
        data: Data,
      };
      this.$https(obj).then((res) => {
        this.$emit("refresh"),
          this.$router.push({
            path: "Mywork",
          });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.box_s {
  padding: 30px;
  box-sizing: border-box;
}
.MTop {
  width: 410px;
  margin-top: 15px;
}
.Input_li {
  margin-top: 15px;
  width: 51%;
}
.but {
  position: absolute;
  right: 30px;
  bottom: 30px;
}
</style>
