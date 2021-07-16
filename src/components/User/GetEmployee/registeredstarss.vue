<template>
  <div class="box">
    <div class="conter">
      <div class="head">员工账户信息</div>
      <div class="headad" style="width:500px;">
           <el-form
        :model="ruleForm"
        :rules="rules"
        size="mini"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="登录名" prop="UserName">
          <el-input v-model="ruleForm.UserName"></el-input>
        </el-form-item>

        <el-form-item label="角色" prop="Roles">
          <el-select  clearable v-model="ruleForm.Roles" placeholder="角色">
             <el-option
              :label="item.Name"
              v-for="(item,index) in MemberRole"
              :key="index"
              :value="item.Id"
            ></el-option>
          </el-select>
        </el-form-item>
        
        <div class="head" style="width:300%">员工个人信息</div>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.ChineseName"></el-input>
        </el-form-item>
        <el-form-item label="英文名" prop="name">
          <el-input v-model="ruleForm.EnglishName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="Sex">
          <el-radio-group v-model="ruleForm.Sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="隶属地区" prop="ServiceArea">
          <el-select
            v-model="ruleForm.ServiceArea"
            style="width:50%;"
            size="mini"
            clearable
            placeholder="必填"
          >
            <el-option :label="item" v-for="(item,index) in howregion" :key="index" value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="隶属部门" prop="Department">
          <el-select
            v-model="ruleForm.Department"
            style="width:50%;"
            size="mini"
            clearable
            placeholder="必填"
          >
            <el-option
              :label="item"
              v-for="(item,index) in DepartmentID"
              :key="index"
              value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="ruleForm.birthday"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>        
        </el-form-item>
        <el-form-item label="职位" prop="name">
          <el-input v-model="ruleForm.Position"></el-input>
        </el-form-item>
        <el-form-item label="入职时间" required>
          <el-col :span="11">
            <el-form-item prop="Entryday">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="ruleForm.Entryday"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>        
        </el-form-item>
         <el-form-item label="民族" prop="type">
          <el-select
            v-model="ruleForm.Nation"
            style="width:50%;"
            size="mini"
            clearable
            placeholder="必填"
          >
            <el-option :label="item" v-for="(item,index) in showNations" :key="index" value="item"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="省市区" prop="type">
          <el-cascader :options="axx" size="mini" v-model="ruleForm.Province" clearable></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="name">
          <el-input v-model="ruleForm.Address"></el-input>
        </el-form-item>
        <el-form-item label="邮编" prop="name">
          <el-input v-model="ruleForm.Post"></el-input>
        </el-form-item>
        <el-form-item label="EMail" prop="name">
          <el-input v-model="ruleForm.EMail"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="name">
          <el-input v-model="ruleForm.telephone"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="name">
          <el-input v-model="ruleForm.MobilePhone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      </div>
    </div>
    <div class="zhu">
      <el-button @click="route" size="mini" type="danger">取消</el-button>
      <el-button @click="submission" size="mini" type="primary">确认</el-button>
    </div>
  </div>
</template>
<script>
import $http from "axios";
import ax from "../../../assets/json/citys.json";
export default {
  name: "registeredstart",
  data() {
    return {
      ruleForm: {
        UserName: "", //登录名
        Roles: [], //角色
        password: "", //密码
        password2: "", //二次密码
        ChineseName: "", //姓名
        EnglishName: "", //英文名
        Sex: "", //性别
        ServiceArea: "", //区域
        Department: "", //部门
        birthday: "", //生日
        Position: "", //职位
        Entryday: "", //入职时间
        Nation: "", //民族
        Province: [], //省市县
        Address: "", //详细地址
        Post: "", //邮编
        telephone: "", //电话
        MobilePhone: "", //手机
        EMail: ""
      },
      showNations: [
        "汉族",
        "蒙古族",
        "回族",
        "藏族",
        "维吾尔族",
        "苗族",
        "彝族",
        "壮族",
        "布依族",
        "朝鲜族",
        "满族",
        "侗族",
        "瑶族",
        "白族",
        "土家族",
        "哈尼族",
        "哈萨克族",
        "傣族",
        "黎族",
        "傈僳族",
        "佤族",
        "畲族",
        "高山族",
        "拉祜族",
        "水族",
        "东乡族",
        "纳西族",
        "景颇族",
        "柯尔克孜族",
        "土族",
        "达斡尔族",
        "仫佬族",
        "羌族",
        "布朗族",
        "撒拉族",
        "毛南族",
        "仡佬族",
        "锡伯族",
        "阿昌族",
        "普米族",
        "塔吉克族",
        "怒族",
        "乌孜别克族",
        "俄罗斯族",
        "鄂温克族",
        "德昂族",
        "保安族",
        "裕固族",
        "京族",
        "塔塔尔族",
        "独龙族",
        "鄂伦春族",
        "赫哲族",
        "门巴族",
        "珞巴族",
        "基诺族"
      ],
      shengfen: [],
      from: {
        input: ""
      },
      age: ["男", "女"],
      token: localStorage.getItem("token") || this.ruleForm, // Token值
  
      MemberRole: [], //角色
      howregion: [], //区域
      DepartmentID: [], //部门
      axx: [],
      i: JSON.parse(localStorage.getItem('Pagedata')) || {} ,
      // dialogVisible: false, //弹窗
      TiShi: "",
      post: "",
      rules: {
        UserName: [
          { required: true, message: "请输入登录名", trigger: "blur" },
          { min: 0, max: 100, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "blur" }
        ],
        Entryday: [
          {
            required: true,
            message: "请选择日期",
            trigger: "blur"
          }
        ],
        date2: [
          {
            required: true,
            message: "请选择时间",
            trigger: "blur"
          }
        ],
        Department: [
          {
            required: true,
            message: "请选择一个部门",
            trigger: "blur"
          }
        ],
        ServiceArea: [
          {
            required: true,
            message: "请选择一个地区",
            trigger: "blur"
          }
        ],
        Roles: [
          {
            required: true,
            message: "请至少选择一个角色",
            trigger: "blur"
          }
        ],
        Sex: [
          { required: true, message: "请选择性别", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  mounted() {
      // console.log('mskn;skdsk',this.$route)
    this.$$$http();    //角色
    this.$$$howregion();   // 区域
    this.$$$DepartmentID();   //部门
    this.axx = ax;            // 省市县
  },
  methods: {
    submitForm(formName) {
      console.log(this.ruleForm)
      this.$refs[formName].validate(valid => {
        if (valid) {
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    //取消   退回
    route() {
      this.$router.push({ path: "/User/GetEmployee" });
    },
    //角色
    $$$http() {
      $http
        .get(this.$store.state.http + "System/GetRoles", {
          params: {},
          headers: { Token: this.token } //设置header信息
        })
        .then(res => {
          this.MemberRole = JSON.parse(res.data).Data;
        });
    },
    //区域
    $$$howregion() {
      $http
        .get(this.$store.state.http + "System/GetServiceAreas", {
          params: {},
          headers: { Token: this.token } //设置header信息
        })
        .then(res => {
          this.howregion = JSON.parse(res.data).Data;
        });
    },
    //部门
    $$$DepartmentID() {
      $http
        .get(this.$store.state.http + "System/GetDepartments", {
          params: {},
          headers: { Token: this.token } //设置header信息
        })
        .then(res => {
          this.DepartmentID = JSON.parse(res.data).Data;
        });
    },
    //修改+添加
    submission() {
      if (this.i) {
        this.TiShi = "修改";
        this.post = this.$store.state.http + "User/UpdateUser";
        $http
          .post(
            this.post,
            {
              Id: this.i.Id,
              ServiceArea: this.ruleForm.ServiceArea,
              Department: this.ruleForm.Department,
              ChineseName: this.ruleForm.ChineseName,
              EnglishName: this.ruleForm.EnglishName,
              Birthday: this.ruleForm.Birthday,
              Entryday: this.ruleForm.Entryday,
              Sex: this.ruleForm.Sex,
              Position: this.ruleForm.Position,
              Nation: this.ruleForm.Nation,
              Province: this.ruleForm.Province.toString(),
              Address: this.ruleForm.Address,
              Post: this.ruleForm.Post,
              EMail: this.ruleForm.EMail,
              Tel: this.ruleForm.Tel,
              EMail: this.ruleForm.EMail,
              MobilePhone: this.ruleForm.MobilePhone,
              UserName: this.ruleForm.UserName,
              Roles: this.ruleForm.Roles.toString()
            },
            {
              headers: {
                token: this.token
              }
            }
          )
          .then(res => {
            this.route();
          })
          .catch(er => {
            console.log(er);
          });
      } else {
        this.TiShi = "添加";
        this.post = this.$store.state.http + "User/Register";
        if (this.ruleForm.password == this.ruleForm.password2) {
          $http
            .post(
              this.post,
              {
                ServiceArea: this.ruleForm.ServiceArea,
                Department: this.ruleForm.Department,
                ChineseName: this.ruleForm.ChineseName,
                EnglishName: this.ruleForm.EnglishName,
                Birthday: this.ruleForm.Birthday,
                Entryday: this.ruleForm.Entryday,
                Sex: this.ruleForm.Sex, //性别
                Position: this.ruleForm.Position,
                Nation: this.ruleForm.Nation,
                Province: this.ruleForm.Province.toString(),
                Address: this.ruleForm.Address,
                Post: this.ruleForm.Post,
                EMail: this.ruleForm.EMail,
                Tel: this.ruleForm.Tel,
                EMail: this.ruleForm.EMail,
                MobilePhone: this.ruleForm.MobilePhone,
                UserName: this.ruleForm.UserName,
                Password: this.ruleForm.Password,
                Roles: this.ruleForm.Roles.toString()
              },
              {
                headers: {
                  token: this.token
                }
              }
            )
            .then(res => {
              this.route();
            })
            .catch(er => {
              console.log(er);
            });
        } else {
          alert("密码输入不同");
        }
      }
    }
  }
};
</script>

<style src="../../../assets/css/registeredstart.css" scoped></style>