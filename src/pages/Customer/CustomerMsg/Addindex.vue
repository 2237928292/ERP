<template>
  <div class="box_s box_22021_5_25">
    <div class="NIE">
      <div class="head">新增客户</div>

      <div class="inp BItian">
        <p class="baiop">客户全名</p>
        <el-input placeholder="必填" size="mini" style="width:50%" v-model="CusData.FullName" clearable></el-input>
        <!-- <i class="el-icon-warning" style="color:#e6a23c"></i> -->
      </div>

      <div class="inp">
        <p class="baiop">客户类型</p>
        <div class="jains">
          <el-select v-model="CusData.Type" style="width:50%;" size="mini" clearable placeholder="必填">
            <el-option :label="item" v-for="(item,index) in CUstomerType" :key="index" :value="item"></el-option>
          </el-select>
        </div>
      </div>

      <div class="inp">
        <p class="baiop">客户英文名称</p>
        <el-input placeholder="必填" size="mini" style="width:50%" v-model="CusData.FullNameEnglish" clearable></el-input>
      </div>

      <div class="inp">
        <p class="baiop">客户简称</p>
        <el-input placeholder="必填" size="mini" style="width:50%" v-model="CusData.ShortName" clearable></el-input>
      </div>

      <div class="inp">
        <p class="baiop">售后总监</p>
        <el-input placeholder="选填" size="mini" style="width:50%" v-model="CusData.LegalPerson" clearable></el-input>
      </div>

      <div class="inp">
        <p class="baiop">售后总监电话</p>
        <el-input placeholder="选填" size="mini" style="width:50%" v-model="CusData.LegalPersonTel" clearable></el-input>
      </div>

      <div class="inp">
        <p class="baiop">成立日期</p>
        <!-- <el-input  clearable></el-input> -->
        <el-date-picker placeholder="选填" size="mini" style="width:50%" v-model="CusData.FoundDate" clearable value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date">
        </el-date-picker>
      </div>

      <div class="inp">
        <p class="baiop">隶属区域</p>
        <div class="jains">
          <el-select v-model="CusData.ServiceRegional" style="width:50%;" size="mini" clearable placeholder="必填">
            <el-option :label="item.Value" v-for="(item,index) in howregion" :key="index" :value="item.Value"></el-option>
          </el-select>
        </div>
      </div>

      <!-- 客户特征 -->

      <div class="inp">
        <p class="baiop">客户特征</p>
        <div class="jains">
          <el-select v-model="CusData.Characteristics" style="width:50%;" size="mini" clearable placeholder="选填">
            <el-option :label="item" v-for="(item,index) in Customercharacteristics" :key="index" :value="item"></el-option>
          </el-select>
        </div>
      </div>

      <div class="inp">
        <p class="baiop">回访周期</p>
        <div class="jains">
          <el-input-number v-model="CusData.ReturnVisit" :min="0" size="mini" :max="9999" label="描述文字"></el-input-number>
        </div>
      </div>

      <br>

      <br>
      <div class="inp" style="width:100%">
        <p class="baiop">省&市/县&区</p>
        <el-cascader :options="axx" size="mini" placeholder="必填" style="width:50%" v-model="CusData.AddressCode" clearable></el-cascader>
      </div>

      <br>
      <div class="inp" style="width:100%">
        <p class="baiop">客户地址</p>
        <el-input placeholder="必填" size="mini" style="width:50%" v-model="CusData.Address" clearable></el-input>
      </div>

      <br>
      <div class="inp" style="width:100%">
        <p class="baiop">回访专员</p>
        <el-input type="textarea" autosize @focus='ReturnVisitCommissioner' placeholder="选填" size="mini" style="width:50%" v-model="CusData.ReturnEnginner" clearable></el-input>
      </div>

      <br>
      <div class="inp" style="width:100%">
        <p class="baiop">描述</p>
        <el-input placeholder="选填" size="mini" style="width:50%" v-model="CusData.Description" clearable></el-input>
      </div>

    </div>

    <div class="zhu">
      <el-button size="mini" type="danger">取消</el-button>
      <el-button @click="TF()" size="mini" type="primary">确认</el-button>
    </div>

    <!-- 工程师选择弹窗 -->

    <el-dialog title="修改隶属工程师" :visible.sync="dialogTableVisible" :before-close="handleClose" :modal-append-to-body='false'>
      <el-table height="250" :data="GcsListData" style="width: 100%" @selection-change="changeFun">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="Name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="UserName" label="UserName">
        </el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogTableVisible = false">取 消</el-button>
        <el-button size="mini" @click="TRUEGCS" type="primary">确认</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import ax from "../../../assets/json/citys.json";
export default {
  name: "registeredstart",
  data() {
    return {
      CusData: {
        FullName: "",
        Type: "",
        FullNameEnglish: "",
        ShortName: "",
        Description: "",
        LegalPerson: "",
        LegalPersonTel: "",
        FoundDate: "", //Data Time
        Address: "",
        /// 回访周期 不显示 默认传21
        ReturnVisit: 21,

        AddressCode: [],
        //  回访专员,多个人时，使用小写逗号分隔 暂时传字符串
        ReturnEnginner: "",
        ServiceRegional: "",
        Characteristics: "",
        Province: "",
      },
      from: {
        input: "",
      },
      token: localStorage.getItem("token"), // Token
      howregion: [], //区域
      axx: [], //选择地区
      Customercharacteristics: ["普通", "VIP", "钣喷", "VIP与钣喷"],
      CUstomerType: [
        "宝马",
        "保时捷",
        "奥迪",
        "奔驰",
        "劳斯莱斯",
        "路虎",
        "自由市场",
        "其他",
      ],
      dialogTableVisible: false,
      GcsListData: [],

      // 此刻选择的攻城狮
      GCS: [],
      GCSID: "", // 攻城狮实际选择Id
    };
  },
  mounted() {},
  created() {
    this.axx = ax;
    this.initGetArea();
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
          this.value = "";
        })
        .catch((_) => {});
    },
    TF: function () {
      if (this.CusData.FullName == "") {
        this.$look("warning", "提示！", "请输入客户全名！");
        return false;
      }

      if (this.CusData.Type == "") {
        this.$look("warning", "提示！", "请选择客户类型！");
        return false;
      }

      if (this.CusData.FullNameEnglish == "") {
        this.$look("warning", "提示！", "请输入客户英文名！");
        return false;
      }

      if (this.CusData.ShortName == "") {
        this.$look("warning", "提示！", "请输入客户简称！");
        return false;
      }

      if (this.CusData.ServiceRegional == "") {
        this.$look("warning", "提示！", "请选择客户隶属区域！");
        return false;
      }

      if (
        this.CusData.AddressCode == [] ||
        this.CusData.AddressCode == null ||
        this.CusData.AddressCode.length == 0
      ) {
        this.$look("warning", "提示！", "请选择省区级！");
        return false;
      }

      if (this.CusData.Address == "") {
        this.$look("warning", "提示！", "请输入客户地址！");
        return false;
      }

      if (
        this.CusData.FullName == "" ||
        this.CusData.Type == "" ||
        this.CusData.FullNameEnglish == "" ||
        this.CusData.ShortName == "" ||
        this.CusData.ServiceRegional == "" ||
        this.CusData.Address == "" ||
        this.CusData.AddressCode == [] ||
        this.CusData.AddressCode == null ||
        this.CusData.AddressCode.length == 0
      ) {
        this.$look("warning", "提示！", "请补全必填项！");
        return false;
      }
      this.AddCus();
    },
    //   新增
    AddCus: function () {
      console.log(this.CusData);
      this.GCSID;
      var Data = this.CusData;
      Data.ReturnEnginner = this.GCSID;
      var obj = {
        api: "post",
        url: this.$store.state.http + "CRM/AddCustomer",
        data: Data,
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.$emit("refresh");
        this.$router.push({ path: "/CustomerMsg" });
      });
    },
    // 获取区域
    initGetArea: function () {
      var obj = {
        url: this.$store.state.http + "System/GetArea",
        api: "get",
      };
      this.$https(obj).then((res) => {
        this.howregion = res.Data;
      });
    },
    // 获取回访专员
    ReturnVisitCommissioner: function () {
      // 判断是否选择了区域
      console.log(this.CusData.ServiceRegional);
      if (this.CusData.ServiceRegional == "") {
        this.$look("warning", "提示！", "请先选择区域！");
        return false;
      }
      // 查询当前区域的工程师
      var obj = {
        api: "get",
        url: this.$store.state.http + "System/GetAreaEmployeeMini",
        data: {
          area: this.CusData.ServiceRegional,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);
        this.GcsListData = res.Data;
        this.dialogTableVisible = true;
      });
    },
    // 选择已勾选工程师
    TRUEGCS: function () {
      console.log(this.GCS);
      this.CusData.ReturnEnginner = "";
      this.GCSID = "";
      for (let index = 0; index < this.GCS.length; index++) {
        if (this.GCSID == "") {
          this.CusData.ReturnEnginner += this.GCS[index].Name;
          this.GCSID += this.GCS[index].EmployeeId;
        } else {
          this.CusData.ReturnEnginner += "," + this.GCS[index].Name;
          this.GCSID += "," + this.GCS[index].EmployeeId;
        }
      }
      this.dialogTableVisible = false;
    },
    //复选框状态改变
    changeFun(val) {
      console.log(val);
      this.GCS = val;
    },
  },
};
</script>

<style  scoped>
.NIE {
  width: 95%;
  height: 98%;
  margin: auto;
  overflow: auto;
}
.inp {
  width: 400px;
  height: 30px;
  margin: 5px 0;
  padding-left: 40px;
  box-sizing: border-box;
  float: left;
  display: block;
}
.head {
  width: 100%;
  border-bottom: 2px solid #ccc;
  color: #000;
  font-weight: bold;
  line-height: 30px;
  margin: 10px 0;
  box-sizing: border-box;
  float: left;
  font-size: 10px;
}
.baiop {
  width: 120px;
  height: 30px;
  display: block;
  float: left;
  line-height: 28px;
  font-size: 12px;
}
.zhu {
  width: 170px;
  margin: auto;
  height: 100px;
  position: absolute;
  bottom: 0;
  right: 50px;
}
.el-cascader {
  width: 50%;
  font-size: 10px;
  line-height: 20px;
  height: 20px;
}

/deep/ .BItian::-webkit-input-placeholder {
  color: #09c;
}
/deep/ input::-moz-input-placeholder {
  color: #09c;
}
/deep/ input::-ms-input-placeholder {
  color: #09c;
}
</style>