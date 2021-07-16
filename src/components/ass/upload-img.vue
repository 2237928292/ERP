<template>
  <div class="com-upload-img">
    <div class="img_group">
      <div class="img_box" v-if="allowAddImg">

        <!-- <div class="img_box" v-for="(item,index) in imgArr" :key="index">
          <div class="img_show_box">
            <img :src="item" alt />
            <i class="img_delete" @click="deleteImg(index)"></i>
          </div>
        </div> -->
        <a href="javascript:;" class="a-upload">
          <input type="file" multiple="multiple" @change="changeImg($event)" name id />点击这里上传文件
        </a>
        <!-- <input
          type="file"
          class="imp"
          accept="image/*"
          multiple="multiple"
          @change="changeImg($event)"
        />-->
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "ComUpLoad",
  data() {
    return {
      imgData: "",
      imgArr: [],
      imgSrc: "",
      allowAddImg: true
    };
  },
  methods: {
    changeImg: function(e) {
      var _this = this;
      var imgLimit = 1024;
      var files = e.target.files;
      var image = new Image();
      if (files.length > 0) {
        var dd = 0;
        var timer = setInterval(function() {
          if (
            files.item(dd).type != "image/png" &&
            files.item(dd).type != "image/jpeg" &&
            files.item(dd).type != "image/gif"
          ) {
            return false;
          }

          if (files.item(dd).size > imgLimit * 102400) {
            //to do sth
          } else {
            image.src = window.URL.createObjectURL(files.item(dd));
            image.onload = function() {
              // 默认按比例压缩
              var w = image.width,
                h = image.height,
                scale = w / h;
              w = 200;
              h = w / scale;
              // 默认图片质量为0.7，quality值越小，所绘制出的图像越模糊
              var quality = 0.7;
              //生成canvas
              var canvas = document.createElement("canvas");
              var ctx = canvas.getContext("2d");
              // 创建属性节点
              var anw = document.createAttribute("width");
              anw.nodeValue = w;
              var anh = document.createAttribute("height");
              anh.nodeValue = h;
              canvas.setAttributeNode(anw);
              canvas.setAttributeNode(anh);
              ctx.drawImage(image, 0, 0, w, h);
              var ext = image.src
                .substring(image.src.lastIndexOf("."))
                .toLowerCase(); //图片格式
              var base64 = canvas.toDataURL("image/" + ext, quality);
			  // 回调函数返回base64的值
              if (_this.imgArr.length <= 1000) {
                // _this.imgArr.unshift("");
                _this.imgArr.push(base64); //替换数组数据的方法，此处不能使用：this.imgArr[index] = url;
                // console.log(_this.imgArr,_this.imgData)
              }
            };
          }
          if (dd < files.length - 1) {
            dd++;
          } else {
            clearInterval(timer);
			_this.$emit("parentFunction", _this.imgArr);
            setTimeout(function() {
					_this.imgArr = []
			}, 1000);
          }
        }, 10);
      }
    },
    deleteImg: function(index) {
      this.imgArr.splice(index, 1);
      if (this.imgArr.length < 5) {
        this.allowAddImg = true;
      }
    }
  }
};
</script>
<style scoped lang="">
.com-upload-img {
  width: 100%;
  float: left;
}
.imp {
  width: 150px;
  height: 150px;
  background: #09c;
  border-radius: 10px;
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
.img_show_box {
  width: 150px;
  height: 150px;
  float: left;
}
.img_show_box img {
  width: 100%;
  height: 100%;
}

.a-upload {
  padding: 4px 10px;
  height: 20px;
  line-height: 20px;
  position: relative;
  cursor: pointer;
  color: #888;
  background: #fafafa;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  display: inline-block;
  *display: inline;
  *zoom: 1;
}
.a-upload input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
  filter: alpha(opacity=0);
  cursor: pointer;
}
.a-upload:hover {
  color: #444;
  background: #eee;
  border-color: #ccc;
  text-decoration: none;
}
</style>
