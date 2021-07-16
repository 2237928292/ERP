<template>
  <div class="box_s" v-loading="loading" :element-loading-text="loadingText">
    <div class="head">日报基础信息</div>

    <div class="inp">
      <p class="baiop">客户：</p>
      <span>{{WorkDailyDetailDto.CustomerName}}</span>
    </div>

    <div class="inp">
      <p class="baiop">服务日期：</p>
      <span>{{WorkDailyDetailDto.ServiceDate}}</span>
    </div>

    <div class="inp">
      <p class="baiop">创建时间：</p>
      <span v-if="WorkDailyDetailDto.CreateDate">{{WorkDailyDetailDto.CreateDate.split('T')[0]}}</span>
    </div>

    <div class="inp">
      <p class="baiop">工程师：</p>
      <span>{{WorkDailyDetailDto.Engineer}}</span>
    </div>

    <div class="head">联系人</div>

    <div class="inp">
      <p class="baiop">联系人：</p>
      <span>{{WorkDailyDetailDto.LinkMan}}</span>
    </div>

    <div class="inp">
      <p class="baiop">电话：</p>
      <span>{{WorkDailyDetailDto.LinkTel}}</span>
    </div>

    <div class="inp">
      <p class="baiop">邮箱：</p>
      <span>{{WorkDailyDetailDto.LinkEmail}}</span>
    </div>

    <div class="head">是否完结</div>

    <div class="inp">
      <el-switch v-model="Isitover" active-text="已完结" inactive-color='red' inactive-text="未完结">
      </el-switch>
    </div>

    <div class="head">工作描述/预计工作安排</div>
    <!-- 描述 -->
    <div class="ForTextHead">工作描述 &nbsp; <i class="el-icon-circle-plus-outline Add" @click="Describe.push({ text: '' })"></i></div>
    <div class="ForText" v-for="(item,index) in Describe" :key="index +  'sss' ">
      <i class="el-icon-delete-solid del" @click="Describe.splice(index,1)"></i>
      <el-input type="textarea" style="marginTop:5px" autosize placeholder="请输入工作描述" v-model="item.text"></el-input>
    </div>
    <!-- 安排 -->
    <div class="ForTextHead">工作安排 &nbsp; <i class="el-icon-circle-plus-outline Add" @click="Arrange.push({ text: '' })"></i></div>
    <div class="ForText" v-for="(Arrangeitem,Arrangeindex) in Arrange" :key="Arrangeindex">
      <i class="el-icon-delete-solid del" @click="Arrange.splice(Arrangeindex,1)"></i>
      <el-input type="textarea" style="marginTop:5px" autosize placeholder="请输入预计工作安排" v-model="Arrangeitem.text"></el-input>
    </div>

    <div class="head">图片</div>

    <el-upload :action="uploadFileUrlapp" :data="{attachType: 0}" name='appFile' :limit="10" :multiple='true' :accept="'image/*,video/*'" :before-upload='beforeuploadMainGraph' :on-success="handleSuccessMainGraph"
      :on-preview="handlePreviewMainGraph" :before-remove='beforeremoveMainGraph' :on-remove="handleRemoveMainGraph" list-type="picture-card" :file-list="imageUrlList">
      <i class="el-icon-plus spc1"></i>
    </el-upload>

    <el-button style="float:right" size="mini" type="primary" @click="UpdataIf()">上传</el-button>

  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
export default {
  // 定义属性
  data() {
    return {
      // 基础信息
      WorkDailyDetailDto: {},
      imageUrlList: [],
      uploadFileUrlapp: "https://httpbin.org/post",
      imgVideoBase64List: [],
      // 描述and安排
      Describe: [],
      Arrange: [],
      // 已上传张数
      ImagesPage: 0,
      loading: false,
      loadingText: "",
      // 是否完结
      Isitover: false,
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    UpdataIf: function () {
      this.$confirm("上传后不可修改, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.UpaData();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    UpaData: function () {
      console.log(this.imgVideoBase64List);
      // 剔除空白项
      var DescribeData = [];
      var ArrangeData = [];
      for (let index = 0; index < this.Describe.length; index++) {
        const element = this.Describe[index].text;
        if (element != "" && element != undefined) {
          DescribeData.push(element);
        }
      }
      for (let index = 0; index < this.Arrange.length; index++) {
        const element = this.Arrange[index].text;
        if (element != "" && element != undefined) {
          ArrangeData.push(element);
        }
      }

      console.log(DescribeData);
      console.log(ArrangeData);
      this.loading = true;
      this.loadingText = "正在上传文字内容 ~ ";
      var obj = {
        api: "post",
        url: this.$store.state.http + "PCenter/AddWorkDailyContent",
        data: {
          WorkDailyId: this.$store.state.Vuex.Id,
          Contents: DescribeData,
          Plans: ArrangeData,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        if (this.imgVideoBase64List.length != 0) {
          this.iFbase64();
          this.loadingText = "正在上传图片 ~ ";
        } else {
          this.loading = false;
          this.loadingText = "";
          this.Code0();
        }
      });
    },
    // 判断是否上传图片，第几张，是否上传完成
    iFbase64: function () {
      if (this.imgVideoBase64List.length == this.ImagesPage) {
        this.loading = false;
        this.loadingText = "上传完成！";
        console.log("上传完成！");
        this.Code0();
      } else {
        this.Upimages();
        this.ImagesPage += 1;
        this.loadingText = "正在上传第" + this.ImagesPage + "张图片 ~ ";
      }
    },
    // 上传图片
    Upimages: function () {
      var tedg = this.imgVideoBase64List[this.ImagesPage].base64;
      var obj = {
        api: "post",
        url: this.$store.state.http + "PCenter/UploadWorkDailyPhoto",
        data: {
          Id: this.$store.state.Vuex.Id,
          FileStr: tedg,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.iFbase64();
      });
    },
    // 完成
    Code0: function () {
      var obj = {
        api: "post",
        url: this.$store.state.http + "PCenter/UploadWorkDaily",
        data: {
          Id: this.$store.state.Vuex.Id,
          type: this.Isitover ? 1 : 0,
        },
      };
      this.$https(obj).then((res) => {
        this.$emit("refresh"),
          this.$router.push({
            path: "Mywork",
          });
      });
    },
    // 初始化
    getRBData: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "PCenter/GetWorlDaily",
        data: {
          workdailyId: this.$store.state.Vuex.Id,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);
        this.WorkDailyDetailDto = res.Data.WorkDailyDetailDto;
      });
    },

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
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    console.log(this.$store.state.Vuex.Id);
    this.getRBData();
  },
};
</script>

<style lang='scss' scoped>
.box_s {
  padding: 0 2.5%;
  box-sizing: border-box;
}

.inp {
  width: 400px;
  height: 30px;
  margin: 5px 0;
  padding-left: 40px;
  box-sizing: border-box;
  float: left;
  display: block;
  span {
    font-size: 12px;
  }
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
.ForText {
  width: 100%;
  float: left;
  padding-left: 100px;
  box-sizing: border-box;
  .del {
    color: red;
    float: left;
    margin-left: -20px;
    margin-top: 15px;
    cursor: pointer; //悬浮时变手指
  }
}
.ForTextHead {
  float: left;
  font-size: 12px;
  padding-left: 20px;
  margin-top: 10px;
  box-sizing: border-box;
  .Add {
    color: #7ece27;
    font-weight: bolder;
    font-size: 15px;
    cursor: pointer; //悬浮时变手指
  }
}
</style>