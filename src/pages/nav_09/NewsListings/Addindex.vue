<template>
  <div class='box_s'>

    <div class="view">

      <el-form label-width="80px" :model="formLabelAlign">
        <el-form-item label="标题">
          <el-input size="mini" v-model="formLabelAlign.Title"></el-input>
        </el-form-item>

        <el-form-item label="开始日期">
          <el-date-picker size="mini" value-format="yyyy-MM-dd" v-model="formLabelAlign.BeginTime" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="目标群体">
          <el-radio-group v-model="formLabelAlign.For">
            <el-radio label="内部员工"></el-radio>
            <el-radio label="客户"></el-radio>
            <el-radio label="全部"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="内容">
          <el-input type="textarea" class="textarea" size="mini" :autosize="{ minRows: 2, maxRows: 9999}" placeholder="请输入内容" v-model="formLabelAlign.Content">
          </el-input>
        </el-form-item>

        <el-form-item label="上传">
          <el-upload :action="uploadFileUrlapp" :data="{attachType: 0}" name='appFile' :limit="10" :multiple='true' :accept="'image/*,video/*'" :before-upload='beforeuploadMainGraph' :on-success="handleSuccessMainGraph"
            :on-preview="handlePreviewMainGraph" :before-remove='beforeremoveMainGraph' :on-remove="handleRemoveMainGraph" list-type="picture-card" :file-list="imageUrlList">
            <i class="el-icon-plus spc1"></i>
          </el-upload>
          <el-button size="mini" style="float:right" type="primary" @click="UpImgLeng()">上传</el-button>
        </el-form-item>

      </el-form>

      <!-- //图片放大时候用的 -->
      <el-dialog :visible.sync="dialogVisibleMainGraph" class='spc12' :modal-append-to-body="false">
        <img v-if="!(imageUrl.type == 'video/mp4') " width="100%" :src="imageUrl.url" alt="">
        <video v-if="imageUrl.type == 'video/mp4' " :src="imageUrl.url" class="avatar video-avatar" controls="controls">
          您的浏览器不支持视频播放
        </video>
      </el-dialog>

      <el-button size="mini" style="float:right" type="primary" @click="Good()">添加</el-button>

    </div>

    <div class="view_html">
      <div class="iphone" v-html="formLabelAlign.Content">

      </div>
      <div class="head">{{formLabelAlign.Title}} </div>

    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
export default {
  // 定义属性
  data() {
    return {
      formLabelAlign: {
        Title: "",
        Content: "",
        BeginTime: "",
        For: "",
      },
      uploadFileUrlapp: "https://httpbin.org/post",
      imageUrlList: [],
      imgVideoBase64List: [],
      dialogVisibleMainGraph: false,
      imageUrl: {},
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    Good: function () {
      //   var For = this.formLabelAlign.For;

      var data = JSON.parse(JSON.stringify(this.formLabelAlign));
      data.For = data.For == "内部员工" ? 1 : data.For == "客户" ? 2 : 3;
      console.log(data);

      var obj = {
        api: "post",
        url: this.$store.state.http + "System/AddJournalism",
        data: data,
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.$emit("refresh"),
          this.$router.push({
            path: "./NewsListings",
          });
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
      console.log(this.imgVideoBase64List);
    },

    UpImgLeng: function () {
      if (this.imgVideoBase64List.length == 0) {
        return false;
      }

      for (let index = 0; index < this.imgVideoBase64List.length; index++) {
        const element = this.imgVideoBase64List[index];
        this.Upimg(element);
      }
      this.imageUrlList = [];
      this.imgVideoBase64List = [];
    },
    Upimg: function (element) {
      var text = element.base64.split("base64")[0];
      console.log(text.split("video/mp4").length);
      var obj = {
        api: "post",
        url: this.$store.state.http + "System/UploadJournalism",
        data: {
          FileStr: element.base64,
          Type: text.split("video/mp4").length,
          /// <summary>
          /// 1：图片
          /// 2：视频
          /// </summary>
        },
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);
        if (res.Data.split("mp4").length == 1) {
          this.formLabelAlign.Content +=
            `<img src='http://icms.inchwell.com.cn/file/Message/` +
            res.Data +
            `'> `;
        } else {
          this.formLabelAlign.Content +=
            `<video src='http://icms.inchwell.com.cn/file/Message/` +
            res.Data +
            `' controls="controls"  >您的浏览器不支持 video 标签。</video> `;
        }
      });
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
  created() {},
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
.view {
  width: 50%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  float: left;
  overflow: auto;
}

.view::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.view::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}

.view::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}

.textarea::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.textarea::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}

.textarea::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}

.view_html {
  width: 50%;
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
  float: left;
  position: relative;
  .head {
    width: 350px;
    height: 50px;
    background: #29bdd9;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 999;
    border-radius: 20px 20px 0 0;
    text-align: center;
    line-height: 50px;
    font-weight: bolder;
    color: #fff;
    font-size: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.iphone {
  width: 350px;
  height: 700px;
  overflow: auto;
  border: 1px solid #ccc;
  border-bottom: 5px solid #7b7979;
  border-radius: 20px;
  padding: 10px;
  padding-top: 50px;
  margin: auto;
  box-sizing: border-box;
  -webkit-box-shadow: 9px 9px 6px #d9e7f1;
  -moz-box-shadow: 9px 9px 6px #d9e7f1;
  box-shadow: 9px 9px 6px #d9e7f1;
}
.iphone::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 3px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 90%;
}

.iphone::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}

.iphone::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}

.iphone >>> img,
.iphone >>> video {
  width: 100%;
}
</style>