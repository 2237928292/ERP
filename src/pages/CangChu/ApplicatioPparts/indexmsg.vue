<template>
  <div class='box_s' v-loading="loading" element-loading-text="正在上传">

    <div class="segmentation">
      基础信息
    </div>

    <div class="itemmsgxx_document">
      <p><span>客户名称:</span>{{Data.CusFullName}}</p>
    </div>

    <div class="itemmsgxx_document">
      <p><span>发起人:</span>{{Data.Sponsor }}</p>
    </div>

    <div class="itemmsgxx_document">
      <p><span>审批人:</span>{{Data.Approved }}</p>
    </div>

    <div class="itemmsgxx_document">
      <p><span>审批时间:</span>{{Data.ApproveDate  }}</p>
    </div>

    <div class="itemmsgxx_document">
      <p><span>审批原因:</span>{{Data.Reason }}</p>
    </div>

    <div class="itemmsgxx_document">
      <p><span>状态:</span>{{Data.StateStr }}</p>
    </div>

    <div class="itemmsgxx_document">
      <p><span>申请类型:</span>{{Data.ApprovalType}}</p>
    </div>

    <div class="segmentation" v-if="Data.ApprovalType == '零配件申请' ">
      整机信息
    </div>

    <div class="itemmsgxx_document">
      <p><span>名称:</span>{{Data.ProductDesc}}</p>
    </div>

    <div class="itemmsgxx_document">
      <p><span>编码:</span>{{Data.ProductCode }}</p>
    </div>

    <div class="itemmsgxx_document">
      <p><span>品牌:</span>{{Data.Brand  }}</p>
    </div>

    <div class="itemmsgxx_document">
      <p><span>备注:</span>{{Data.Memo }}</p>
    </div>

    <div class="segmentation" v-if="Data.ApprovalType == '零配件申请' ">
      零配件信息
    </div>

    <!-- SADetailDto -->

    <el-table v-if="Data.ApprovalType == '零配件申请' " :data="Data.SADetailDtos" style="width: 100%">
      <el-table-column prop="ProductCode" label="产品编码" width="180">
      </el-table-column>
      <el-table-column prop="Brand" label="品牌" width="180">
      </el-table-column>
      <el-table-column prop="ProductDesc" label="产品描述" :show-overflow-tooltip="true">
      </el-table-column>
    </el-table>

    <div v-if="Data.State != 1">
      <div class="segmentation">
        照片
        <el-button v-if="Data.State == 2 ||  Data.State == 3 || Data.State == 4 || Data.State == 5 || Data.State == 6 || Data.State == 7 || Data.State == 8" size="mini" style="float:right" type="primary"
          @click="UpdataImg()">上传</el-button>
      </div>
      <el-image v-for="(item,index) in Data.SAImageDtos" :key='index' style="width: 100px; height: 100px;margin:10px" @click="FDimg(item.Image)"
        :src=" 'http://icms.inchwell.com.cn/File/EquInstallOrderFile/' + item.Image " fit="scale-down"></el-image>
      <el-upload v-if="Data.State == 2 ||  Data.State == 3 || Data.State == 4 || Data.State == 5 || Data.State == 6 || Data.State == 7 || Data.State == 8" style="margin:10px" action='https://httpbin.org/post'
        :data="{attachType: 0}" name='appFile' :limit="10" :multiple='true' :accept="'image/*,video/*'" :before-upload='beforeuploadMainGraph' :on-success="handleSuccessMainGraph" :on-preview="handlePreviewMainGraph"
        list-type="picture-card" :file-list="imageUrlList">
        <i class="el-icon-plus spc1"></i>
      </el-upload>
    </div>

    <!-- //图片放大时候用的 -->
    <el-dialog :visible.sync="dialogVisibleMainGraph" class='spc12' :modal-append-to-body="false">
      <img v-if="!(imageUrl.type == 'video/mp4') " width="100%" :src="imageUrl.url" alt="">
    </el-dialog>
    <!-- 审批 -->
    <div v-if="Data.State == 1" class="segmentation">审批</div>
    <div v-if="Data.State == 1" style="padding:20px;float:left">
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" style="width:500px" placeholder="请输入审批愿意 非必填" v-model="Reason">
      </el-input>
      <el-button-group style="float:right;padding: 20px;">
        <el-button size="mini" type="danger" @click="UpdateSAppState(3)">拒绝</el-button>
        <el-button size="mini" type="primary" @click="UpdateSAppState(2)">同意</el-button>
      </el-button-group>
    </div>
    <!-- 指派工程师 -->
    <div v-if="Data.State == 2 || Data.State == 6" class="segmentation">指派工程师</div>
    <div v-if="Data.State == 2 || Data.State == 6" style="padding:20px;float:left">
      <el-select v-model="EmployeeId" filterable placeholder="请选择" size="mini">
        <el-option v-for="item in options" :key="item.EmployeeId" :label="item.Name" :value="item.EmployeeId">
        </el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="UpdateEmployeeId()">确认</el-button>
    </div>

    <!-- 收货 -->

    <div v-if="Data.State == 5" class="segmentation">收货
      <el-button size="mini" style="float:right" type="primary" @click="UpdateSAppState(6)">收货</el-button>
    </div>

    <!-- 完成 -->

    <div v-if="Data.State == 8" class="segmentation">结单</div>
    <div v-if="Data.State == 8" style="padding:20px;float:left">
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" style="width:500px" placeholder="备注" v-model="Reason">
      </el-input>
      <el-button size="mini" type="primary" @click="UpdateSAppState(10)">结单</el-button>
    </div>

  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
export default {
  // 定义属性
  data() {
    return {
      Data: [],
      url: [
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      ],
      Reason: "",
      options: [],

      EmployeeId: "",
      imageUrlList: [],
      imgVideoBase64List: [],
      imageUrl: {},
      dialogVisibleMainGraph: false,
      loading: false,
      UpImgdata: 0,
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    // FDimg
    FDimg: function (row) {
      console.log("000900");
      this.imageUrl.url =
        "http://icms.inchwell.com.cn/File/EquInstallOrderFile/" + row;
      this.imageUrl.type = "jpg";
      this.dialogVisibleMainGraph = true;
    },
    init: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "StorageRoom/GetStandbyApproval",
        data: {
          Id: this.$store.state.Vuex.AddSparePartsID,
        },
      };
      this.$https(obj).then((res) => {
        this.Data = res.Data.StandbyApprovalDto;
        console.log(this.Data.State);
        console.log(this.Data);
        this.Data.ApprovalType =
          this.Data.ApprovalType == 1 ? "整机申请" : "零配件申请";
      });
    },
    // 审批申请
    UpdateSAppState: function (row) {
      console.log(row);
      var obj = {
        api: "post",
        url: this.$store.state.http + "StorageRoom/UpdateSAppState",
        data: {
          Id: this.$store.state.Vuex.AddSparePartsID,
          ToState: row,
          Reason: this.Reason,
        },
      };
      this.$https(obj).then((res) => {
        this.init();

        if (row == 3) {
          this.$look("success", "操作成功！", "已拒绝！");
        }
        if (row == 2) {
          this.$look("success", "操作成功！", "已同意！");
        }
        if (row == 6) {
          this.$look("success", "操作成功！", "已收货！");
        }
        if (row == 10) {
          this.$look("success", "操作成功！", "已结单！");
        }
      });
    },
    // 获取所有工程师
    GetEmployeeMini: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "System/GetEmployeeMini",
        data: { type: 2 },
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);
        this.options = res.Data;
      });
    },
    // 指派工程师
    UpdateEmployeeId: function () {
      if (this.EmployeeId == "") {
        this.$look("erorr", "请选择工程师！");
        return false;
      }

      var obj = {
        api: "post",
        url: this.$store.state.http + "StorageRoom/AssignSApp",
        data: {
          Id: this.$store.state.Vuex.AddSparePartsID,
          Str: String(this.EmployeeId),
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.$look("success", "操作成功！", "指派成功！");
        this.init();
      });
    },

    //用这些方法时候还是建议直接去官网看，更加方便清晰
    //上传前
    beforeuploadMainGraph(file) {
      var Size = (file.size / 1024 / 1024).toFixed(3);
      console.log(Size + "MB");
      console.log(file);
      if (Size > 5 && file.type == "video/mp4") {
        this.$look("warning", "提示！", "视频文件大小不得超过5MB");
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
        console.log(_this.imgVideoBase64List);
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

    UpdataImg: function () {
      if (this.imgVideoBase64List.length == 0) {
        this.$look("warning", "请选择图片 或 等待图片解压完成！");
        return false;
      }

      this.loading = true;
      for (let index = 0; index < this.imgVideoBase64List.length; index++) {
        const element = this.imgVideoBase64List[index];
        this.UploadSAppImage(element);
      }
    },
    UploadSAppImage: function (FileStrLI) {
      var obj = {
        api: "post",
        url: this.$store.state.http + "StorageRoom/UploadSAppImage",
        data: {
          Id: this.$store.state.Vuex.AddSparePartsID,
          FileStr: FileStrLI.base64,
          Type: 1,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.UpImgdata += 1;
        this.SHnagchuanWanchang();
      });
    },

    //
    SHnagchuanWanchang: function () {
      if (this.UpImgdata == this.imgVideoBase64List.length) {
        this.loading = false;
        this.UpImgdata = 0;
        this.imgVideoBase64List = [];
        this.imageUrlList = [];
        this.init();
      }
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.init();
    this.GetEmployeeMini();
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
</style>