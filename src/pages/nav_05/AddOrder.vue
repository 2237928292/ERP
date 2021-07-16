<template>
  <div class="box_s">
    <div class="TopClickHandelSE">
      <el-cascader
        style="width:100%;"
        v-model="GetAllAll"
        :options="options"
        placeholder="请选择零件图"
        :props="{ expandTrigger: 'hover' }"
        @change="handleChange"
        size="mini"
      ></el-cascader>
    </div>
    <div class="ifarCo">
      <iframe
        scrolling="no"
        :width="iframeData.width"
        :height="iframeData.height"
        :src="iframeData.http"
        frameborder="0"
      ></iframe>
    </div>
    <div class="ifarRi">
      <el-autocomplete
        class="inline-input"
        size="mini"
        style="width:100%"
        v-model="ToolObjectId "
        :show-overflow-tooltip="true"
        :fetch-suggestions="querySearch"
        placeholder="请选择客户"
        @select="handleSelect"
        clearable
      >
        <template slot="prepend">选择客户</template>
      </el-autocomplete>

      <el-autocomplete
        class="inline-input"
        size="mini"
        style="width:100%;marginTop:15px"
        v-model="Selectcontact "
        :show-overflow-tooltip="true"
        :fetch-suggestions="querySearchs"
        placeholder="请选择联系人"
        @select="handleSelects"
        clearable
      >
        <template slot="prepend">选择联系人</template>
      </el-autocomplete>

<!-- 
     <el-input placeholder="请输入联系人" size="mini" style="marginTop:15px;width:32%" v-model="formLabelAlign.Name">
      <template slot="prepend">联系人</template>
    </el-input> -->

      <el-input disabled placeholder="请输入手机"  prop="Mobile" size="mini" style="marginTop:15px;width:48%" v-model="formLabelAlign.Mobile">
      <template slot="prepend">手机</template>
    </el-input>

      <el-input disabled placeholder="请输入电话" size="mini" style="marginTop:15px;width:48%" v-model="formLabelAlign.Tel">
      <template slot="prepend">电话</template>
    </el-input>


     <el-input disabled placeholder="请输入地址"  prop="Mobile" size="mini" style="marginTop:15px;width:48%" v-model="formLabelAlign.Address">
      <template slot="prepend">地址</template>
    </el-input>

      <el-input disabled placeholder="请输入邮箱" size="mini" style="marginTop:15px;width:48%" v-model="formLabelAlign.Email">
      <template slot="prepend">邮箱</template>
    </el-input>


      <el-form
        :label-position="labelPosition"
        status-icon
        ref="formLabelAlign"
        label-width="80px"
        size="mini"
        style="marginTop:20px"
        :model="formLabelAlign"
      >

        <el-form-item label>
          <el-table :data="tableData" style="width: 100%" max-height="250" size="mini">
            <el-table-column
              fixed
              prop="Describe"
              label="品牌"
              :show-overflow-tooltip="true"
              width="200"
            ></el-table-column>
            <el-table-column
              fixed
              prop="ProductCode"
              label="编码"
              :show-overflow-tooltip="true"
              width="150"
            ></el-table-column>
            <!-- <el-table-column fixed prop="Number" label="数量" :show-overflow-tooltip="true" width="50"></el-table-column> -->
            <el-table-column fixed="right" label="数量">
              <template slot-scope="scope">
                <el-input-number
                  name="Attributes"
                  v-model="scope.row.Number"
                  size="mini"
                  controls-position="right"
                  :min="1"
                ></el-input-number>
              </template>
            </el-table-column>
               <el-table-column fixed="right" label="甲方安装" width="80">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.switch"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
              </template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="80">
              <template slot-scope="scope">
                <el-button @click="deleteRow(scope.row)" type="text" size="small">移除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="Trues()">提交</el-button>
          <el-button @click="Dele()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {


    return {
    

      // iframe参数
      iframeData: {
        width: "100%",
        height: "99%",
        https: "./index.html",
        http:'',
      },
      ToolObjectId: "", //当前选择的客户名称
      ToolProId: "", //当前选择的客户id
      GetAllAll: [], //选择的储存区
      options: [], // 供选择零件三级集合
      Selectcontact: "",
      timer: "",
      labelPosition: "right",
      formLabelAlign: {
        Name: "",
        Email: "",
        Tel: "",
        LinkManId: "",
        Address: "",
        Default: "",
        Mobile: "",
        NameEn: "",
      },
      tableData: [], //已选择的货物
    };
  },
  created() {
    this.GetAllAllPartDrawing(); //获取零件图三级菜单
  },
  mounted() {
    let that = this;
    window.addEventListener("message", function (e) {
      if (
        String(e.data).substring(0, 7) == "webpack" ||
        String(e.data).substring(0, 7) == "[object"
      ) {
      } else {
        that.HTMLtoVue(e.data);
      }
    });
  },

  components: {},
  methods: {
    // 提交
    Trues: function () {
      console.log(this.ToolProId);
      console.log(this.formLabelAlign);
      console.log(this.tableData);

      var GoodsInfo = []

      for (let index = 0; index < this.tableData.length; index++) {
        const element = this.tableData[index];
        var xx = {}
        xx.ProductId  = element.ProductId
        xx.Number   = element.Number
        xx.IsAssembly   = element.switch
        GoodsInfo.push(xx)
      }
   
      // if(this.tableData.length == 0){
      //   this.$look('warning','未选择物品！')
      //   return false
      // }
       var obj = {
        data: {
          AddressId : this.formLabelAlign.LinkManId,
          Type : 2,
          CustomerId : this.ToolProId,
          WorkorderId :'',
          GoodsInfos:GoodsInfo,

        },
        api: "post",
        url: this.$store.state.http + "CRM/SubmitOrder",
      };
      this.$https(obj).then((res) => {
        console.log(res)
        this.$emit("refresh"),
         this.$router.push({ path: "/SpareParts" });
      });
    },
    // 重置  清空已选择的值
    Dele: function () {
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
      this.Selectcontact = "";
      this.ToolObjectId = "";
      this.ToolProId = "";
    },
    // 判断纯数字
    validate: function (obj) {
      var reg = /^[0-9]*$/;
      return reg.test(Number(obj));
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
      this.Selectcontact = ''
      this.formLabelAlign =  {
        Name: "",
        Email: "",
        Tel: "",
        LinkManId: "",
        Address: "",
        Default: "",
        Mobile: "",
        NameEn: "",
      }
    },
    // 接受HTML 传值后调用
    HTMLtoVue: function (res) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      var obj = {
        data: {
          productCodce: res.replace(/^\s+|\s+$/g, ""),
        },
        api: "get",
        url: this.$store.state.http + "Product/GetProductMini",
        header: this.$store.state.token,
      };
      this.$https(obj).then((res) => {
        res.Data["Number"] = 1;
        res.Data['switch'] = true
        for (let index = 0; index < this.tableData.length; index++) {
          const element = this.tableData[index];
          if (element.ProductCode == res.Data.ProductCode) {
            element.Number += 1;
            loading.close();
            return false;
          }
        }
        //
        this.tableData.push(res.Data);
        loading.close();
      });
    },
    // 删除已选择的货物
    deleteRow: function (res) {
      console.log(res.ProductCode);
      for (let index = 0; index < this.tableData.length; index++) {
        if (this.tableData[index].ProductCode == res.ProductCode) {
          this.tableData.splice(index, 1);
        }
      }
    },
    // 获取零件图
    GetAllAllPartDrawing: function () {
      var obj = {
        data: {},
        api: "get",
        url: this.$store.state.http + "System/GetAllAllPartDrawing",
        header: this.$store.state.token,
      };
      this.$https(obj).then((res) => {
        for (let index = 0; index < res.Data.length; index++) {
          const element = res.Data[index];
          element.label = element.Valus;
          element.value = element.Key;
          element.children = element.TwoDtos;
          for (let indexs = 0; indexs < element.children.length; indexs++) {
            const elements = element.children[indexs];
            elements.label = elements.Valus;
            elements.children = elements.ThreeDtos;
            elements.value = elements.Key;
            for (
              let indexss = 0;
              indexss < elements.children.length;
              indexss++
            ) {
              const elementss = elements.children[indexss];
              elementss.label = elementss.Key;
              elementss.value = elementss.Valus;
              // elementss.value = elementss.Key;
            }
          }
        }
        console.log(res.Data);
        this.options = res.Data;
      });
    },
    // 点击三级零件图
    handleChange(value) {
      console.log(value[2]);
      this.iframeData.http =
        this.$store.state.httpData +
        "content/pcpartsdrawing/productView/" +
        value[2];
        console.log(this.iframeData.http)
    },
  },
};
</script>

<style lang="scss" scoped>
.ifarRi {
  width: 800px;
  height: 100%;
  float: left;
  padding: 10px;
  box-sizing: border-box;
  -webkit-box-shadow: 3px 3px 3px #c8c8c8;
  -moz-box-shadow: 3px 3px 3px #c8c8c8;
  box-shadow: 3px 3px 3px #c8c8c8;
}
.ifarCo {
  width: calc(100% - 800px);
  height: 100%;
  background: #f2f2f2;
  float: left;
  border-right: 10px solid #f2f2f2;
  box-sizing: border-box;
}
.TopClickHandelSE {
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  background: #ffffff;
  padding: 10px;
  border-radius: 10px;
  -webkit-box-shadow: 0px 3px 3px #c8c8c8;
  -moz-box-shadow: 0px 3px 3px #c8c8c8;
  box-shadow: 0px 3px 3px #c8c8c8;
}
.Attributes {
  width: 50px;
}
</style>
