<template>
  <div class="box_s">
    <router-view @refresh="init"></router-view>

    <div class="NIE">
      <div class="head">客户信息</div>

      <div class="inp">
        <p class="baiop">客户全名</p>
        <el-input placeholder="必填" size="mini" style="width:50%" v-model="CusData.FullName" clearable></el-input>
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
      <div class="inp" style="width:100%">
        <p class="baiop">省&市/县&区</p>
        <el-cascader :options="axx" size="mini" style="width:50%" v-model="CusData.AddressCode" clearable></el-cascader>
      </div>

      <br>
      <div class="inp" style="width:100%">
        <p class="baiop">描述</p>
        <el-input placeholder="选填" size="mini" style="width:50%" v-model="CusData.Description" clearable></el-input>
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

      <div class="head">客户联系人
        <el-button style="float:right" type="success" size="mini" @click="CusAddpoShow = true,ManTitle = '添加联系人' " round>添加</el-button>
      </div>
      <el-table :data="LinkMans" style="width: 100%">
        <el-table-column prop="Name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="Position" label="职位" width="120"></el-table-column>
        <el-table-column prop="Mobile" label="手机" width="120"></el-table-column>
        <el-table-column prop="Email" label="邮箱"></el-table-column>
        <!-- <el-table-column prop="Address" label="地址"></el-table-column> -->
        <el-table-column fixed="right" label="默认联系人" width="100">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.Default" @change="Switch(scope.row)" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="编辑" width="100">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="Codeman(scope.row)" icon="el-icon-edit"></el-button>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="删除" width="100">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="DEL(scope.row)" icon="el-icon-delete"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="head">保养大包回访明细</div>
      <div v-for="(item,index) in RVDtos" :key='index' class="Paddletable">
        <h6 style="color:#1989fa">{{item.Title}}</h6>
        <el-table :data="item.StatDtos" style="width: 100%">
          <el-table-column prop="Key" label="工程师" width="100"></el-table-column>
          <el-table-column prop="Other" label="类型" width="120"></el-table-column>
          <el-table-column prop="Describe" label="时间" width="250"></el-table-column>
        </el-table>
      </div>

      <!-- RVDtos -->

      <div class="head">客户账号
        <el-button style="float:right" type="success" size="mini" @click="AddCusAccountShow = true " round>添加</el-button>
      </div>
      <el-table :data="Accounts" style="width: 100%">
        <el-table-column prop="UserName" label="登录名" width="150"></el-table-column>
        <!-- <el-table-column prop="Rolesstr" label="角色" width="200"></el-table-column> -->
        <el-table-column prop="Enabletr" label="是否启用" width="250"></el-table-column>
        <el-table-column prop="Memo" label="备注"></el-table-column>
        <el-table-column fixed="right" label="设置" width="100">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.Enable" @change="SHzhi(scope.row)" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
      </el-table>

      <div class="head">设备清单
        <el-button style="float:right;marginLeft:20px" type="success" size="mini" @click="drawer = true " round>添加</el-button>
        <el-button size="mini" type="primary" style="float:right;" @click="lookCusState()">模拟设备升降</el-button>
        <el-button size="mini" type="primary" :loading='this.$store.state.Vuex.loading' style="float:right;margin-right:20px" @click="init()">刷新设备数据</el-button>
      </div>
      <el-table :data="CustomerEquDetails" style="width: 100%">
        <!-- <el-table-column prop="Type2" label="类别" width="100" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="Type3" label="品牌" width="100" :show-overflow-tooltip="true"></el-table-column> -->

        <el-table-column prop="Name" label="名称" width="100" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="Brand" label="品牌" width="100" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="ProdcutCode" label="编号" width="170" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="SN" label="序列号" width="150" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="BeganRunDate" label="安装日期" width="100" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="Count" label="升降总数" width="100" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="CurrentState" label="升降状态" width="100" :show-overflow-tooltip="true"></el-table-column>
        <!-- <el-table-column prop="GuaranteeDeadline" label="保质期" width="100"></el-table-column> -->
        <el-table-column prop="Desc" label="描述" :show-overflow-tooltip="true"></el-table-column>

      </el-table>
      <!-- 占位 -->
      <div style="width:100%;height:150px"></div>
    </div>

    <div class="zhu" style="background:#ffffff;zIndex:666">
      <el-button size="mini" type="danger">取消</el-button>
      <el-button @click="TF()" size="mini" type="primary">确认</el-button>
    </div>
    <!-- 添加设备 -->

    <el-drawer :visible.sync="drawer" direction="ltr" :modal="false" style="width: 200%" title="添加设备" :before-close="handleClose">
      <div class="top_init_data" style="marginbottom: 10px">
        <!-- 检索内容 -->
        <el-input style="width: 193px" size="mini" v-model="productCode" @change="initsss(1)" placeholder="请输入产品编码"></el-input>
        <!-- 产品编码 -->
        <el-input style="width: 193px" size="mini" v-model="barcodeMemo" @change="initsss(1)" placeholder="请输入内部编码"></el-input>
        <!-- 内部编码 -->
        <el-input style="width: 193px" size="mini" v-model="desc" @change="initsss(1)" placeholder="请输入产品描述"></el-input>
        <!-- 描述 -->
        <el-input style="width: 193px" size="mini" v-model="memo" @change="initsss(1)" placeholder="请输入产品备注"></el-input>

        <el-select v-model="man" @change="initsss(1)" clearable size="mini" placeholder="请选择品牌">
          <el-option v-for="item in  options" :key="item.ID" :label="item.Name" :value="item.Name"></el-option>
        </el-select>

        <el-button size="mini" type="primary" @click="initsss()" style="float: right">检索</el-button>
        <!-- 选择品牌 -->
      </div>

      <!-- 表格 -->
      <el-table :data="Datatable" size="mini" :height="this.$store.state.TableOptimumHeight" border style="marginbottom: 10px" ref="multipleTable" :header-cell-style="{ background: '#e1e1e1' }">
        <el-table-column prop="ProductCode" label="产品编号" width="170"></el-table-column>
        <el-table-column prop="BarcodeMemo" label="内部编码" width="140"></el-table-column>
        <el-table-column prop="SN" label="序列号" width="130"></el-table-column>
        <el-table-column prop="Manufacturer" label="品牌" width="120"></el-table-column>
        <el-table-column prop="Characteristics" label="产品描述" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column fixed="right" label="操作" width="80">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="adds(scope.row)">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->

      <nav style="text-align: center">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="this.$store.state.Vuex.pageSNumber" :page-size="100"
          layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </nav>
    </el-drawer>

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
        <el-button size="mini" @click="FALSEGCS">取 消</el-button>
        <el-button size="mini" @click="TRUEGCS" type="primary">确认</el-button>
      </div>
    </el-dialog>

    <!-- 添加 编辑联系人  -->

    <el-dialog :title="ManTitle" :visible.sync="CusAddpoShow" :before-close="handleClose" :modal-append-to-body='false'>
      <el-form :model="CusAddpo" size="mini" label-position='left' :inline="true">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="CusAddpo.Name" autocomplete="off" placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item label="英文名" :label-width="formLabelWidth">
          <el-input v-model="CusAddpo.NameEn" autocomplete="off" placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth">
          <el-input v-model="CusAddpo.Position" autocomplete="off" placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="CusAddpo.Mobile" autocomplete="off" placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="CusAddpo.Tel" autocomplete="off" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="CusAddpo.Email" autocomplete="off" placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="CusAddpo.Address" style="width:245%" placeholder="必填" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- ,CusAddpo = {}  -->
        <el-button size="mini" @click="CusAddpoShowFalse()">取 消</el-button>
        <el-button size="mini" @click="TreLXr" type="primary">确认</el-button>
      </div>
    </el-dialog>

    <!-- 添加 and 设置客户账号  -->

    <el-dialog title="添加客户账号" :visible.sync="AddCusAccountShow" :before-close="handleClose" :modal-append-to-body='false'>
      <el-form :model="AddCusAccount" size="mini" label-position='left'>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="AddCusAccount.UserName" autocomplete="off" placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="AddCusAccount.Memo" autocomplete="off" placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="AddCusAccount.PassWord" autocomplete="off" placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" :label-width="formLabelWidth">
          <el-input type="password" v-model="AddCusAccount.PassWord2" autocomplete="off" placeholder="必填"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="CusAddpoShowFalse()">取 消</el-button>
        <el-button size="mini" @click="KHmsg" type="primary">确认</el-button>
      </div>
    </el-dialog>

    <!-- 添加客户设备 -->

    <el-dialog title="添加客户设备" :visible.sync="DatatableState" :before-close="handleClose" :modal-append-to-body='false'>
      <el-form :model="AddCusAccount" size="mini" label-position='left'>

        <el-form-item label="设备" :label-width="formLabelWidth2">
          <p>{{SheBeiData.Characteristics}}</p>
        </el-form-item>
        <!-- SheBeiData -->
        <el-form-item label="自定义名称" :label-width="formLabelWidth2">
          <el-input v-model="DeviceName" autocomplete="off" placeholder="必填"></el-input>
        </el-form-item>

        <el-form-item label="日期" :label-width="formLabelWidth2">
          <el-date-picker size="mini" v-model="AddTime" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期" :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>

        <el-form-item label=" 序列号" :label-width="formLabelWidth2">
          <el-input v-model="SerialNumber" autocomplete="off" placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="checkPass" :label-width="formLabelWidth2">

          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="选填" v-model="Remark">
          </el-input>
        </el-form-item>

        <!--  bool false -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="NOADDpoudet()">取 消</el-button>
        <el-button size="mini" @click="ADDpoudet()" type="primary">确认</el-button>
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
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      formLabelWidth: "70px",
      formLabelWidth2: "100px",
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
        ReturnVisit: "",
        // ! 回访专员,多个人时，使用小写逗号分隔 暂时传字符串
        AddressCode: [],
        ReturnEnginner: "",
        ServiceRegional: "",
        Characteristics: "",
      },
      RVDtos: [],
      //   联系人信息
      LinkMans: [],
      //   客户账号
      Accounts: [],
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
      // 此刻选择的攻城狮
      GCS: [],
      GCSID: "", // 攻城狮实际选择Id
      dialogTableVisible: false,
      CusAddpoShow: false,
      GcsListData: [],
      // ! 添加客户联系人  信息
      ManTitle: "",
      CusAddpo: {
        CusId: "",
        Name: "",
        NameEn: "",
        Position: "",
        Mobile: "",
        Email: "",
        Address: "",
        Tel: "",
      },
      CusId: "",

      // 账号
      AddCusAccount: {
        UserName: "",
        Memo: "",
        PassWord: "",
        Role: "",
        PassWord2: "",
      },
      AddCusAccountShow: false,
      CustomerEquDetails: [],

      drawer: false,
      productCode: "",
      barcodeMemo: "",
      desc: "",
      memo: "",
      man: "",
      total: 0,
      pageNum: 1,
      pagesize: 10,
      options: [],

      Datatable: [],
      DatatableState: false,

      // 选择的设备信息
      SheBeiData: {},
      AddTime: "",
      DeviceName: "",
      SerialNumber: "",
      Remark: "",
    };
  },
  mounted() {},
  created() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    this.AddTime = year + "-" + month + "-" + day;

    // import 地区阶级
    this.axx = ax;
    // 获取区域
    this.initGetArea();
    // 获取客户信息信息
    this.init();
    this.initsss();
    this.Manufacturer();
  },
  methods: {
    // 确认添加设备
    ADDpoudet: function () {
      console.log(this.AddTime);
      console.log(this.$store.state.Vuex.Id);
      console.log(this.DeviceName);
      console.log(this.SerialNumber);
      console.log(this.Remark);
      if (this.DeviceName == "") {
        this.DeviceName = " - ";
      }

      if (this.AddTime == "") {
        this.$look("warning", "提示！", "请选择安装日期");
        return false;
      }

      // this.SheBeiData.ID
      if (this.SerialNumber == "") {
        this.$look("warning", "提示！", "请输入序列号！");
        return false;
      }

      var obj = {
        api: "post",
        url: this.$store.state.http + "CRM/AddCusDevice",
        data: {
          CustomerId: this.$store.state.Vuex.Id,
          DeviceName: this.DeviceName,
          ProductId: this.SheBeiData.ID,
          SerialNumber: this.SerialNumber,
          InstallationDate: this.AddTime,
          Remark: this.Remark,
          bool: false,
        },
      };
      this.$https(obj).then((res) => {
        console.log("0000000000");
        this.NOADDpoudet();

        this.$message({
          message: "添加成功！",
          type: "success",
        });
      });
    },
    // 取消添加后清空内容
    NOADDpoudet: function () {
      this.DatatableState = false;
      this.AddTime = "";
      this.DeviceName = "";
      this.SerialNumber = "";
      this.Remark = "";
    },
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
    //输入第几页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.initsss();
    },

    adds: function (row) {
      console.log(row);
      this.SheBeiData = row;
      this.drawer = false;
      this.DatatableState = true;
    },
    // 切换 每页条数时触发  刷新
    handleSizeChange(val) {
      this.pagesize = val;
      this.initsss(1);
    },
    initsss: function (code2) {
      if (code2 == 1) {
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
          // kitflag: false,
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
        this.Datatable = res.Data.Dtos;
        for (let index = 0; index < this.Datatable.length; index++) {
          this.Datatable[index].UpdateDate =
            this.Datatable[index].UpdateDate.split("T")[0];
        }
        console.log(this.Datatable);
      });
    },
    lookCusState: function () {
      // this.$store.state.Vuex.LookCusState = ,
      this.$router.push({ path: "/EquipmentStatus" });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
          this.CusAddpoShowFalse();
          this.value = "";
        })
        .catch((_) => {});
    },
    init: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "CRM/GetCustomer",
        data: {
          cusId: this.$store.state.Vuex.Id,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.RVDtos = res.Data.RVDtos;
        console.log(this.RVDtos);
        this.CusData = res.Data.BaseInfo;
        this.CusId = res.Data.BaseInfo.CusId;
        console.log(res.Data.BaseInfo.CusId);
        this.LinkMans = res.Data.LinkMans;
        this.Accounts = res.Data.Accounts;
        this.CustomerEquDetails = res.Data.CustomerEquDetails;

        for (let index = 0; index < this.CustomerEquDetails.length; index++) {
          const element = this.CustomerEquDetails[index];
          element.BeganRunDate = element.BeganRunDate.split("T")[0];
        }

        // BeganRunDate
        for (let index = 0; index < this.Accounts.length; index++) {
          const element = this.Accounts[index];
          element.Enable
            ? (element["Enabletr"] = "是")
            : (element["Enabletr"] = "否");
          if (element.Roles) {
            element["Rolesstr"] = "";
            for (let index = 0; index < element.Roles.length; index++) {
              element.Rolesstr += element.Roles[index];
            }
          }
        }
        console.log(this.Accounts);
        this.CusAddpoShowFalse();
      });
    },
    youbian: function (er) {
      console.log(er);
    },
    //   关闭窗口
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    TF: function () {
      console.log(this.CusData.AddressCode);
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

      this.AddCus();
    },
    //  编辑
    AddCus: function () {
      console.log(this.CusData);
      var Data = this.CusData;
      // 判断回访专员是否被修改
      if (this.GCSID == "") {
        Data.ReturnEnginner = Data.ReturnEnginnerIds;
      } else {
        Data.ReturnEnginner = this.GCSID;
      }

      var obj = {
        api: "post",
        url: this.$store.state.http + "CRM/UpdateCustomer",
        data: this.CusData,
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
    // 判断是取消操作
    FALSEGCS: function () {
      this.dialogTableVisible = false;
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
    // 确认 添加联系人
    TreLXr: function () {
      this.CusAddpo.CusId = this.CusId;
      if (
        this.CusAddpo.Name == "" ||
        this.CusAddpo.NameEn == "" ||
        this.CusAddpo.Position == "" ||
        this.CusAddpo.Mobile == "" ||
        this.CusAddpo.Email == "" ||
        this.CusAddpo.Address == ""
      ) {
        this.$look("warning", "提示！", "请补全必填项！");
        return false;
      }

      if (this.ManTitle == "添加联系人") {
        var obj = {
          api: "post",
          url: this.$store.state.http + "CRM/AddCustomerLinkman",
          data: this.CusAddpo,
        };
      } else {
        var obj = {
          api: "post",
          url: this.$store.state.http + "CRM/UpdateCustomerLinkman",
          data: this.CusAddpo,
        };
      }

      this.$https(obj).then((res) => {
        this.CusAddpoShow = false;
        this.init();
      });
    },
    // ! 000
    Switch: function (mako) {
      console.log(mako.LinkManId);
      var obj = {
        api: "post",
        url: this.$store.state.http + "CRM/DefaultCustomerLinkman",
        data: {
          Id: mako.LinkManId,
        },
      };
      this.$https(obj).then((res) => {
        this.init();
      });
    },
    // 编辑联系人
    Codeman: function (res) {
      (this.CusAddpoShow = true),
        (this.ManTitle = "编辑联系人"),
        (this.CusAddpo = res);
    },
    // 取消编辑   / 添加
    CusAddpoShowFalse: function () {
      this.CusAddpo = {
        CusId: "",
        Name: "",
        NameEn: "",
        Position: "",
        Mobile: "",
        Email: "",
        Address: "",
        Tel: "",
      };

      this.AddCusAccount = {
        UserName: "",
        Memo: "",
        PassWord: "",
        Role: "",
        PassWord2: "",
      };
      this.CusAddpoShow = false;
      this.AddCusAccountShow = false;
    },
    // 删除客户联系人
    DEL: function (mako) {
      console.log(mako.LinkManId);
      var obj = {
        api: "post",
        url: this.$store.state.http + "CRM/DelCustomerLinkman",
        data: {
          Id: mako.LinkManId,
        },
      };
      this.$https(obj).then((res) => {
        this.init();
      });
    },
    // 添加客户
    KHmsg: function () {
      if (
        this.AddCusAccount.UserName == "" ||
        this.AddCusAccount.Memo == "" ||
        this.AddCusAccount.PassWord == "" ||
        this.AddCusAccount.PassWord2 == ""
      ) {
        this.$look("warning", "提示！", "请补全必填项！");
        return false;
      }

      if (
        this.AddCusAccount.PassWord != this.AddCusAccount.PassWord2 &&
        this.AddCusAccount.PassWord2 != "" &&
        this.AddCusAccount.PassWord2 != undefined
      ) {
        this.$look("warning", "提示！", "密码不一致！");
        return false;
      }
      this.AddCusAccount["Role"] = "客户";
      this.AddCusAccount["CusId"] = this.CusId;
      var obj = {
        api: "post",
        url: this.$store.state.http + "CRM/AddCusAccount",
        data: this.AddCusAccount,
      };
      this.$https(obj).then((res) => {
        this.init();
      });
    },
    // 设置客户账号
    SHzhi: function (res) {
      var obj = {
        api: "post",
        url: this.$store.state.http + "CRM/SetCusAccount",
        data: {
          Str: res.Id,
        },
      };
      this.$https(obj).then((res) => {
        this.init();
      });
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
  margin: auto;
  background: #000;
  border: 1px solid #ccc;
  position: absolute;
  border-radius: 10px;
  box-shadow: 3px 3px 3px 3px #ccc;
  bottom: 50px;
  right: 80px;
  padding: 20px;
}
.el-cascader {
  width: 50%;
  font-size: 10px;
  line-height: 20px;
  height: 20px;
}
.Paddletable {
  width: 100%;
  padding-left: 30px;
  box-sizing: border-box;
}
</style>

