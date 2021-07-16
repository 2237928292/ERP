<template>
  <div class="box">
    <div class="conter">
      <div class="head">员工账户信息</div>
      <div class="inp">
        <p class="baiop">登录名</p>
        <el-input
          placeholder="必填"
          size="mini"
          style="width:50%"
          v-model="registerEmail.UserName"
          clearable
        ></el-input>
      </div>
      <div class="inp">
        <p class="baiop">角色</p>
        <div class="jains">
          <el-select
            v-model="registerEmail.Roles"
            multiple
            style="width:50%"
            size="mini"
            clearable
            placeholder="必填"
          >
            <el-option
              :label="item.Name"
              v-for="(item,index) in MemberRole"
              :key="index"
              :value="item.Id"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="inp">
        <p class="baiop">密码</p>
        <el-input
          show-password
          placeholder="必填"
          size="mini"
          style="width:50%"
          v-model="registerEmail.password"
          clearable
        ></el-input>
      </div>
      <div class="inp">
        <p class="baiop">确认密码</p>
        <el-input
          show-password
          placeholder="必填"
          size="mini"
          style="width:50%"
          v-model="registerEmail.password2"
          clearable
        ></el-input>
      </div>

      <div class="head">员工个人信息</div>

      <div class="inp">
        <p class="baiop">姓名</p>
        <el-input
          placeholder="必填"
          size="mini"
          style="width:50%"
          v-model="registerEmail.ChineseName"
          clearable
        ></el-input>
      </div>
      <div class="inp">
        <p class="baiop">英文名</p>
        <el-input
          placeholder="必填"
          size="mini"
          style="width:50%"
          v-model="registerEmail.EnglishName"
          clearable
        ></el-input>
      </div>
      <div class="inp">
        <p class="baiop">性别</p>
        <el-radio-group size="mini" v-model="registerEmail.Sex  ">
          <el-radio-button label="男"></el-radio-button>
          <el-radio-button label="女"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="inp">
        <p class="baiop">隶属区域</p>
        <div class="jains">
          <el-select
            v-model="registerEmail.ServiceArea"
            style="width:50%;"
            size="mini"
            clearable
            placeholder="必填"
          >
            <el-option :label="item" v-for="(item,index) in howregion" :key="index" :value="item"></el-option>
          </el-select>
        </div>
      </div>
      <div class="inp">
        <p class="baiop">隶属部门</p>
        <div class="jains">
          <el-select
            v-model="registerEmail.Department"
            style="width:50%;"
            size="mini"
            clearable
            placeholder="必填"
          >
            <el-option
              :label="item"
              v-for="(item,index) in DepartmentID"
              :key="index"
              :value="item"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="inp">
        <p class="baiop">生日</p>
        <el-date-picker
          v-model="registerEmail.Birthday"
          size="mini"
          style="width:50%"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </div>
      <div class="inp">
        <p class="baiop">职位</p>
        <el-input
          placeholder="必填"
          size="mini"
          style="width:50%"
          v-model="registerEmail.Position"
          clearable
        ></el-input>
      </div>
      <div class="inp">
        <p class="baiop">入职时间</p>
        <el-date-picker
          v-model="registerEmail.Entryday"
          size="mini"
          style="width:50%"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </div>
      <div class="inp">
        <p class="baiop">民族</p>
        <div class="jains">
          <el-select
            v-model="registerEmail.Nation"
            style="width:50%;"
            size="mini"
            clearable
            placeholder="必填"
          >
            <el-option :label="item.name" v-for="(item,index) in showNations" :key="index" :value="item.name"></el-option>
          </el-select>
        </div>
      </div>
      <div class="inp">
        <p class="baiop">省&市/县&区</p>
        <el-cascader :options="axx" size="mini" v-model="registerEmail.Province" clearable></el-cascader>
      </div>
      <div class="inp">
        <p class="baiop">详细地址</p>
        <el-input
          placeholder="必填"
          size="mini"
          style="width:50%"
          v-model="registerEmail.Address"
          clearable
        ></el-input>
      </div>

      <div class="inp">
        <p class="baiop">邮编</p>
        <el-input
          placeholder="可选"
          size="mini"
          style="width:50%"
          v-model="registerEmail.Post"
          clearable
        ></el-input>
      </div>
      <div class="inp">
        <p class="baiop">EMail</p>
        <el-input
          placeholder="必填"
          size="mini"
          style="width:50%"
          v-model="registerEmail.EMail"
          clearable
        ></el-input>
      </div>
      <div class="inp">
        <p class="baiop">电话</p>
        <el-input
          placeholder="可选"
          size="mini"
          style="width:50%"
          v-model="registerEmail.Tel"
          clearable
        ></el-input>
      </div>
      <div class="inp">
        <p class="baiop">手机</p>
        <el-input
          placeholder="必填"
          size="mini"
          style="width:50%"
          v-model="registerEmail.MobilePhone"
          clearable
        ></el-input>
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
import ax from "../../../assets/json/citys.json";   //  地区
import mz from '../../../assets/json/min.json'
export default {
  name: "registeredstart",
  data() {
    return {
      registerEmail: {
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
        Province: "", //省市县
        Address: "", //详细地址
        Post: "", //邮编
        telephone: "", //电话
        MobilePhone: "", //手机
        EMail: ""
      },
      showNations:[],
      shengfen: [],
      from: {
        input: ""
      },
      age: ["男", "女"],
      token: localStorage.getItem("token"), // Token值
      value1: [],
      MemberRole: [], //角色
      howregion: [], //区域
      DepartmentID: [], //部门
      axx: [],
      post: "",
    };
  },
  mounted() {
    this.$$$http();
    this.$$$howregion();
    this.$$$DepartmentID();
    this.axx = ax;
    this.showNations = mz.data
  },
  methods: {
    route() {
      this.$router.push({ path: "/User/GetEmployee" });
    },
    //角色
    $$$http() {
      $http
        .get( this.$store.state.http + "System/GetRoles", {
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
    submission() {
        this.post = this.$store.state.http + "User/Register";
        if (this.registerEmail.password == this.registerEmail.password2) {
          $http
            .post(
              this.post,
              {
                ServiceArea: this.registerEmail.ServiceArea,
                Department: this.registerEmail.Department,
                ChineseName: this.registerEmail.ChineseName,
                EnglishName: this.registerEmail.EnglishName,
                Birthday: this.registerEmail.Birthday,
                Entryday: this.registerEmail.Entryday,
                Sex: this.registerEmail.Sex, //性别
                Position: this.registerEmail.Position,
                Nation: this.registerEmail.Nation,
                Province: this.registerEmail.Province.toString(),
                Address: this.registerEmail.Address,
                Post: this.registerEmail.Post,
                EMail: this.registerEmail.EMail,
                Tel: this.registerEmail.Tel,
                EMail: this.registerEmail.EMail,
                MobilePhone: this.registerEmail.MobilePhone,
                UserName: this.registerEmail.UserName,
                Password: this.registerEmail.Password,
                Roles: this.registerEmail.Roles.toString()
              },
              {
                headers: {
                  token: this.token
                }
              }
            )
            .then(res => {
              this.$router.push({ path: "/User/GetEmployee" });
            })
            .catch(er => {
              console.log(er);
            });
        } else {
          alert("密码输入不同");
        }
      }
  
  }
};
</script>

<style src="../../../assets/css/registeredstart.css" scoped></style>