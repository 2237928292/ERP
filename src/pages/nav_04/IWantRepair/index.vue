<template>
  <div class="box_s  managementHTbox_s" v-loading="loading" element-loading-text='努力创建中 ···'>

    <div class="select">
      <el-autocomplete class="inline-input" size="mini" style="width:350px" v-model="Want.FullName" :show-overflow-tooltip="true" :fetch-suggestions="querySearch" placeholder="请选择客户" @select="handleSelect" clearable>
        <template slot="prepend">选择客户</template>
      </el-autocomplete>
    </div>

    <div class="select">
      <el-autocomplete class="inline-input" size="mini" style="width:350px" v-model="Want.RepairName" :show-overflow-tooltip="true" :fetch-suggestions="querySearchs" placeholder="请选择联系人" @select="handleSelects"
        clearable>
        <template slot="prepend">联 系 人</template>
      </el-autocomplete>
    </div>

    <div class="select">
      <el-input placeholder="请输入英文名" style="width:350px" prop="Mobile" size="mini" v-model="Want.RepairNameEn">
        <template slot="prepend">英 文 名</template>
      </el-input>
    </div>

    <div class="select">
      <el-input placeholder="请输入手机" style="width:350px" prop="Mobile" size="mini" v-model="Want.MobilePhone">
        <template slot="prepend">手 &nbsp; 机</template>
      </el-input>
    </div>
    <div class="select">
      <el-input placeholder="请输入电话" style="width:350px" prop="Mobile" size="mini" v-model="Want.Tel">
        <template slot="prepend">电 &nbsp; 话</template>
      </el-input>
    </div>
    <div class="select">
      <el-input placeholder="请输入邮箱" style="width:350px" prop="Mobile" size="mini" v-model="Want.Email">
        <template slot="prepend">邮 &nbsp; 箱</template>
      </el-input>
    </div>
    <div class="select">
      <el-input placeholder="请输入详细地址" style="width:350px" prop="Mobile" size="mini" v-model="Want.AddressDetail">
        <template slot="prepend">详细地址</template>
      </el-input>
    </div>

    <div class="textNB">
      <div class="textBZ" style="cursor:pointer;" @click="select()">选择设备</div>
      <!-- <el-input type="textarea" style="float:left;width:500px" :autosize="{ minRows: 2, maxRows: 4}" placeholder="设备信息" v-model="Want.FaultDescription">
      </el-input> -->
      <el-card class="box-card one">
        <div slot="header">
          <div class="Tit">
            <span>{{X.ProdcutCode  ||  '未选择' }}</span>
          </div>
        </div>
        <div class="bot">
          <p style="fontSize:12px">{{X.Desc ||  '未选择' }}</p>
        </div>
      </el-card>
    </div>

    <div class="textNB">
      <div class="textBZ">故障描述</div>
      <el-input type="textarea" style="float:left;width:500px" :autosize="{ minRows: 2, maxRows: 4}" placeholder="故障描述" v-model="Want.FaultDescription">
      </el-input>
    </div>
    <div class="textNB">
      <div class="textBZ">客户备注</div>
      <el-input type="textarea" style="float:left;width:500px" :autosize="{ minRows: 2, maxRows: 4}" placeholder="客户备注" v-model="Want.CustomerRemark">
      </el-input>
    </div>
    <div class="textNB">

      <el-upload :action="uploadFileUrlapp" :data="{attachType: 0}" name='appFile' :limit="10" :multiple='true' :accept="'image/*,video/*'" :before-upload='beforeuploadMainGraph' :on-success="handleSuccessMainGraph"
        :on-preview="handlePreviewMainGraph" :before-remove='beforeremoveMainGraph' :on-remove="handleRemoveMainGraph" list-type="picture-card" :file-list="imageUrlList">
        <i class="el-icon-plus spc1"></i>
      </el-upload>
      <!-- //图片放大时候用的 -->
      <el-dialog :visible.sync="dialogVisibleMainGraph" class='spc12' :modal-append-to-body="false">
        <img v-if="!(imageUrl.type == 'video/mp4') " width="100%" :src="imageUrl.url" alt="">
        <video v-if="imageUrl.type == 'video/mp4' " :src="imageUrl.url" class="avatar video-avatar" controls="controls">
          您的浏览器不支持视频播放
        </video>
      </el-dialog>
    </div>

    <div class="bottom_but">
      <el-button type="primary" size="mini" @click="submitForm()">立即创建</el-button>
    </div>

    <el-dialog title="客户设备" :visible.sync="dialogTableVisible" :modal-append-to-body="false">
      <el-table :data="gridData" @row-click='RowClick' style="marginBottom:20px">
        <el-table-column property="SN" label="SN" width="150" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column property="Brand" label="品牌" width="130" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column property="ProdcutCode" label="产品编码" width="150" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column align="right" :show-overflow-tooltip="true">
          <template slot="header" slot-scope="scope">
            <el-input v-model="searchHeader" size="mini" @input="eacrh(scope.row)" placeholder="输入关键字搜索" />
          </template>
          <template slot-scope="scope">
            <p style="textAlign: left;">{{scope.row.Desc}}</p>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagetion" style="marginTop:0px;height:50px;">
        <el-pagination class="pagition-li" @current-change="handleCurrentChange" :current-page="1" layout=" total ,  prev, pager, next, jumper " :total="total"></el-pagination>
      </div>

    </el-dialog>

  </div>
</template>
<script>
export default {
  data() {
    return {
      Want: {
        FullName: "", // 客户展示名称
        CustomerId: "",
        RepairName: "",
        RepairNameEn: "",
        MobilePhone: "",
        Tel: "",
        Email: "",
        AddressDetail: "",
        FaultDescription: "",
        CustomerRemark: "",
        RequestType: "1",
        DeviceId: "",
      },
      // 变量
      dialogTableVisible: false,
      // 设备检索项
      search: "",
      searchHeader: "", //设备列表的头部检索项
      gridData: [],
      pageNum: 1,
      total: 0,
      X: {},
      // 以下实验

      dialogVisibleMainGraph: false,
      imageUrlList: [],
      imageUrl: {
        type: "",
        url: "",
      },
      uploadFileUrlapp: "https://httpbin.org/post",
      imgVideoBase64List: [],

      // 记录上传文件进度
      UpFileDataLength: 0,
      UpImgVideoId: "",
      loading: false,
      // 储存res 等待创建完成 跳转详细页
      res: {},
    };
  },
  created() {},
  //转化为base64格式的

  methods: {
    //用这些方法时候还是建议直接去官网看，更加方便清晰
    //上传前
    beforeuploadMainGraph(file) {
      var Size = (file.size / 1024 / 1024).toFixed(3);
      console.log(Size + "MB");
      console.log(file);
      if (Size > 10 && file.type == "video/mp4") {
        this.$look("warning", "提示！", "视频文件大小不得超过10MB");
        return false;
      }
      let _this = this;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        let newUrl = reader.result; //图片路径
        _this.imgVideoBase64List.push({
          uid: file.uid,
          base64: newUrl,
        });
      };
    },
    //上传成功
    handleSuccessMainGraph(response, file, fileList) {
      this.imageUrlList = fileList;
    },
    //点击文件列表中已上传的文件
    handlePreviewMainGraph(file) {
      this.imageUrl.type = file.raw.type;
      this.imageUrl.url = file.url;
      console.log(file);
      this.dialogVisibleMainGraph = true;
    },
    //删除文件前
    beforeremoveMainGraph(file, fileList) {},
    //删除文件时
    handleRemoveMainGraph(file, fileList) {
      console.log(file.uid);
      for (let index = 0; index < this.imgVideoBase64List.length; index++) {
        const element = this.imgVideoBase64List[index];
        if (element.uid === file.uid) {
          this.imgVideoBase64List.splice(index, 1);
        }
      }
      console.log(this.imgVideoBase64List);
    },

    // 以上实验
    // 点击表格行
    RowClick: function (e) {
      console.log(e);
      this.X = e;
      this.Want.DeviceId = e.Id;
      this.dialogTableVisible = false;
    },
    // 底部分页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.select();
    },

    // 检索设备列表
    eacrh: function () {
      console.log(this.searchHeader);
      this.pageNum = 1;
      this.search = this.searchHeader;
      this.select();
    },
    // 压缩
    // ! 暂时没做压缩

    // 点击创建
    submitForm: function () {
      console.log(this.Want);

      if (this.Want.CustomerId === "") {
        this.$look("warning", "警告！", "请选择客户！");
        return false;
      }
      if (this.Want.RepairName === "") {
        this.$look("warning", "警告！", "请选择报修人！");
        return false;
      }
      if (this.Want.RepairNameEn === "") {
        this.$look("warning", "警告！", "请输入报修人英文名！");
        return false;
      }
      if (this.Want.MobilePhone === "") {
        this.$look("warning", "警告！", "请输入报修人手机号！");
        return false;
      }
      if (this.Want.Email === "") {
        this.$look("warning", "警告！", "请输入报修人邮箱！");
        return false;
      }
      if (this.Want.AddressDetail === "") {
        this.$look("warning", "警告！", "请输入详细地址！");
        return false;
      }
      if (this.Want.DeviceId === "") {
        this.$look("warning", "警告！", "请选择客户设备！");
        return false;
      }
      if (this.Want.FaultDescription === "") {
        this.$look("warning", "警告！", "请输入故障描述");
        return false;
      }

      this.CreateMC();
    },
    // 直接创建
    CreateMC: function () {
      var obj = {
        api: "post",
        url: this.$store.state.http + "WO/CusApplyRepair",
        data: this.Want,
      };
      this.$https(obj).then((res) => {
        this.res = res;
        //判断是否上传了图片以及视频
        if (this.imgVideoBase64List.length == 0) {
          //!没上传直接跳转到列表
          this.$store.state.Vuex.Id = this.res.Data;
          this.$router.push({
            path: "/RepairDetails",
          });
        } else {
          // 开始上传
          this.loading = true;
          this.UpImgVideoId = res.Data;
          this.IfImgVideoMB();
        }
      });
    },

    // 上传视频
    IfImgVideoMB: function () {
      // 执行命令
      this.UpImgVideo(this.imgVideoBase64List[this.UpFileDataLength].base64);
    },

    // 上传视频图片
    UpImgVideo: function (Data) {
      var text = Data.split("base64")[0];
      var obj = {
        api: "post",
        url: this.$store.state.http + "WO/UploadRepairImage",
        data: {
          Id: this.UpImgVideoId,
          FileStr: Data,
          Type: text.split("video/mp4").length,
        },
      };
      this.$https(obj).then((res) => {
        // 判断是否上传完成
        if (this.UpFileDataLength + 1 == this.imgVideoBase64List.length) {
          // !上传完成
          console.log("上传完成！");
          this.$store.state.Vuex.Id = this.res.Data;
          this.$router.push({
            path: "/RepairDetails",
          });
        } else {
          // 继续上传
          this.UpFileDataLength += 1;
          this.IfImgVideoMB();
        }
      });
    },
    // 选择设备
    select: function () {
      if (this.Want.CustomerId === "") {
        this.$look("warning", "警告！", "请先选择客户！");
        return false;
      }
      var obj = {
        api: "GET",
        url: this.$store.state.http + "CRM/GetCustomerEqus",
        data: {
          pageNum: this.pageNum,
          numPerPage: 10,
          orderField: "",
          orderDirection: "",
          search: this.search,
          cusId: this.Want.CustomerId,
          onlyhavesn: 1, // 是否有英之杰序列号
          sourceId: "",
          otherType: "",
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.gridData = res.Data.Dtos;
        this.total = res.Data.DataBars;
      });

      this.dialogTableVisible = true;
    },
    // 筛选联系人
    querySearchs(queryString, cb) {
      if (this.Want.CustomerId == "") {
        return false;
      }
      var obj = {
        data: {
          cusId: this.Want.CustomerId,
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
      console.log(res);
      this.Want.RepairName = res.Name;
      this.Want.RepairNameEn = res.NameEn;
      this.Want.MobilePhone = res.Mobile;
      this.Want.Tel = res.Tel;
      this.Want.Email = res.Email;
      this.Want.AddressDetail = res.Address;
    },
    // 点击客户
    handleSelect(item) {
      console.log(item);
      this.Want.CustomerId = item.CusId;
      // 考虑重新选择客户后是否清空其他信息
    },
  },
};
</script>
<style lang="scss" scoped>
.textNB {
  width: 100%;
  float: left;
  margin-left: 10px;
  .one {
    width: 500px;
    margin: 5px;
    .Tit {
      margin: -16px -20px;
      padding: 5px 20px;
      line-height: 20px;
      font-size: 13px;
      span {
        font-weight: bold;
      }
    }
  }
  .textBZ {
    width: 89px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    margin-top: 15px;
    background-color: #f5f7fa;
    color: #909399;
    // vertical-align: middle;
    // display: table-cell;
    // position: relative;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    // padding: 0 20px;
    // width: 1px;
    // white-space: nowrap;
    // font-weight: bold;
    font-size: 12px;
    // padding: 10px;
    // box-sizing: border-box;
  }
}
</style>
