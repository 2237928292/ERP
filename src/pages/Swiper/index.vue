<template>
  <div class='box' v-loading="loading">

    <!-- Tab -->
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="客户端App" name="first"></el-tab-pane>
      <el-tab-pane label="工程师端App" name="second"></el-tab-pane>
      <el-tab-pane label="ERP 系统" name="third"></el-tab-pane>
    </el-tabs>
    <!-- Swiper -->
    <el-carousel ref="carouse" :autoplay='autoplay' :initial-index="oIndex" :interval="4000" type="card" height="300px" style="width:1300px;margin:auto">
      <el-carousel-item v-for="(itemurl,index) in tableData" :key="index">
        <img :src=" 'http://icms.inchwell.com.cn/file/IndexBanner/'+ itemurl.Image" alt="" style="height:100%;border-radius: 10px;">
      </el-carousel-item>
    </el-carousel>

    <div style="width:100%;height:70px;margin: 50px 0;display: flex; justify-content: center	;">

      <img v-for="(iteurl,indexd) in tableData" :key="indexd" :src=" 'http://icms.inchwell.com.cn/file/IndexBanner/'+ iteurl.Image" alt="" style="height:100%;border-radius: 10px;margin:0px 10px"
        @mouseover="clickChange(indexd)" @mouseleave="autoplay = true">

    </div>

    <div id="Swiper" style="width:531px;margin:auto">
      <el-table ref="MC" @sort-change='sortchange(1)' :data="tableData" border row-key="id" size="mini" :header-cell-style="{ background: '#e1e1e1' }" align="left">

        <el-table-column v-for="(item, index) in col" :key="`col_${item.label}`" :prop="dropCol[index].prop" :width="dropCol[index].width" :show-overflow-tooltip="dropCol[index].widths" :label="item.label">
        </el-table-column>
        <el-table-column align="right">
          <template slot="header">
            <el-button type="success" size="mini" @click="UpTitle='',dialogVisible = true,imageUrlList = [],imgVideoBase64List = []">添加</el-button>
          </template>
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">

      <div>
        <el-input placeholder="请输入内容" size="mini" v-model="UpTitle">
          <template slot="prepend">标题：</template>
        </el-input>
      </div>

      <el-divider content-position="left">上传图片 / 视频</el-divider>
      <el-upload :action="uploadFileUrlapp" :data="{attachType: 0}" name='appFile' :limit="2" :multiple='true' :accept="'image/*,video/*'" :before-upload='beforeuploadMainGraph' :on-success="handleSuccessMainGraph"
        :on-preview="handlePreviewMainGraph" :on-remove="handleRemoveMainGraph" list-type="picture-card" :file-list="imageUrlList">
        <i class="el-icon-plus spc1"></i>
      </el-upload>
      <!-- //图片放大时候用的 -->
      <el-dialog :visible.sync="dialogVisibleMainGraph" class='spc12' :modal-append-to-body="false">
        <img v-if="!(imageUrl.type == 'video/mp4') " width="100%" :src="imageUrl.url" alt="">
        <video v-if="imageUrl.type == 'video/mp4' " :src="imageUrl.url" class="avatar video-avatar" style="width:100%" controls="controls">
          您的浏览器不支持视频播放
        </video>
      </el-dialog>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="UpImgVideo()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import Sortable from "sortablejs";

// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
export default {
  // 定义属性
  data() {
    return {
      autoplay: true,
      oIndex: 0,
      To: 1,
      loading: true,
      dialogVisible: false,
      dialogVisibleMainGraph: false,
      activeName: "first",
      uploadFileUrlapp: "https://httpbin.org/post",

      UpTitle: "",
      col: [
        {
          label: "序号",
          prop: "Pos",
          width: "50",

          sortable: true,
        },
        {
          label: "标题",
          prop: "ProductCode",
          width: "200",
          sortable: true,
        },
        {
          label: "创建时间",
          prop: "Brand",
          width: "200",
          sortable: true,
        },
      ],
      dropCol: [
        {
          label: "删除",
          prop: "Pos",
          width: "50",
          sortable: true,
        },
        {
          label: "标题",
          prop: "Title",
          width: "200",
          sortable: true,
        },
        {
          label: "创建时间",
          prop: "CreateDate",
          width: "200",
          sortable: true,
        },
      ],
      tableData: [],
      imageUrlList: [],
      imgVideoBase64List: [],
      imageUrl: {},
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    clickChange(index) {
      //参数index为图片索引
      (this.autoplay = false), (this.oIndex = index);
      this.$refs.carouse.setActiveItem(index); //调动setActiveItem方法，动态切换图片
      // this.articleTitle = this.list[index]["articleTitle"];
    },
    // 删除
    handleDelete: function (row) {
      console.log(row.ID);
      var obj = {
        api: "post",
        url: this.$store.state.http + "System/DelIndexBanner",
        data: {
          Id: row.ID,
        },
      };
      this.$https(obj).then((res) => {
        this.init();
        this.$look("success", "提示！", "删除成功！");
      });
    },
    UpImgVideo: function () {
      console.log(this.UpTitle, this.imageUrlList);

      if (this.UpTitle == "") {
        this.$look("warning", "提示！", "请输入标题！");
        return false;
      }
      if (this.imageUrlList.length == 0) {
        this.$look("warning", "提示！", "请上传资源或等待资源加载完成！");
        return false;
      }
      if (
        this.imageUrlList.length == 1 &&
        this.imageUrlList[0].raw.type.indexOf("video") != -1
      ) {
        this.$look("warning", "提示！", "不可单独上传视频！");
        return false;
      }

      var obj = {
        api: "post",
        url: this.$store.state.http + "System/AddIndexBanner",
        data: {
          For: this.To,
          Type: this.imageUrlList.length == 1 ? 1 : 2,
          Title: this.UpTitle,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);
        this.UpimgBase64(res.Data, 0);
        if (this.imageUrlList.length == 2) {
          this.UpimgBase64(res.Data, 1);
          console.log("两个");
        }
        // "06d3df18-19dc-4e26-b6f0-a21eecf80cfb"
      });
    },

    UpimgBase64: function (uId, row) {
      var _this = this;
      var obj = {
        api: "post",
        url: _this.$store.state.http + "System/UploadIndexBanner",
        data: {
          Id: uId,
          FileStr: _this.imgVideoBase64List[row].base64,
          Type: _this.imageUrlList[row].raw.type.indexOf("video") != -1 ? 2 : 1,
        },
      };
      console.log(obj);
      _this.$https(obj).then((res) => {
        _this.dialogVisible = false;
        this.init();
      });
    },

    compress: function (img) {
      //新建一个img标签
      var image = new Image();
      image.src = img;
      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");
      //压缩后图片的大小
      var data;
      var imageWidth = image.width * 0.8;
      var imageHeight = image.height * 0.8;
      canvas.width = imageWidth;
      canvas.height = imageHeight;
      context.drawImage(image, 0, 0, imageWidth, imageHeight);
      data = canvas
        .toDataURL("image/jpeg")
        .replace("data:image/jpeg;base64,", "");
      var length = data.toString().length;
      if (length > 1024 * 200) {
        return compress(data);
      }
      console.log(data);
      return data;
    },

    //用这些方法时候还是建议直接去官网看，更加方便清晰
    //上传前
    beforeuploadMainGraph(file) {
      if (this.imageUrlList.length == 1) {
        if (
          this.imageUrlList[0].raw.type.indexOf(file.type.split("/")[0]) != -1
        ) {
          this.$look("warning", "提示！", "类型重复！");
          return false;
        }
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

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handleClick(tab, event) {
      console.log(tab.index, event);
      this.To = Number(tab.index) + 1;
      this.init();
    },

    init: function () {
      var that = this;
      var obj = {
        api: "get",
        url: that.$store.state.http + "System/GetIndexBanners",
        data: {
          to: that.To,
        },
      };
      that.$https(obj).then((res) => {
        console.log(res.Data.Dtos);

        var Data = res.Data.Dtos;
        for (let index = 0; index < Data.length; index++) {
          const element = Data[index];
          element.CreateDate = element.CreateDate.split("T")[0];
          element["Pos"] = index + 1;
        }
        that.tableData = Data;
        that.loading = false;
        that.rowDrops();
      });
    },

    sortchange: function (MA) {
      let _this = this;
      console.log(MA);
    },

    // AS
    rowDrops() {
      const tbody = document.querySelector(
        "#Swiper .el-table__body-wrapper tbody"
      );
      const _this = this;
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          //  位置相同 表示轻微挪动
          // 先插入 再删除

          console.log(newIndex, oldIndex);
          if (newIndex == oldIndex) {
            return false;
          }
          _this.loading = true;

          var EqList = _this.tableData;
          var Topitem = EqList[oldIndex];

          EqList.splice(oldIndex, 1);
          EqList.splice(newIndex, 0, Topitem);

          var EquDtosList = [];
          for (let index = 0; index < EqList.length; index++) {
            const element = EqList[index];
            console.log(element.Title, element.ID);
            EquDtosList[index] = {
              Id: element.ID,
              Sort: index + 1,
            };
          }

          var obj = {
            url: _this.$store.state.http + "System/SortIndexBanner",
            api: "post",
            data: {
              Dtos: EquDtosList,
            },
          };
          _this.$https(obj).then((res) => {
            _this.tableData = [];
            _this.init();
          });
        },
      });
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.init();
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
.el-carousel__item:nth-child(2n) {
  img {
    display: block;
    margin: auto;
  }
}

.el-carousel__item:nth-child(2n + 1) {
  img {
    display: block;
    margin: auto;
  }
}
</style>