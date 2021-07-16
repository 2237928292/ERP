<template>
  <div class="box" id="boxx">
    <!-- <el-button  size="mini" type="success">添加</el-button> -->
    <div class="add">
      <img @click="Addone()" style="width:25px;float:right" src="../../assets/img-icon/add.png" alt />
    </div>
    <div class="custom-tree-container">
      <div class="block">
        <!-- <p>制度</p> -->
        <el-tree :data="Data" node-key="id" default-expand-all :expand-on-click-node="true">
          <span
            class="custom-tree-node"
            slot-scope="{ node, data }"
            @dblclick="!data.children? lookPDF(data) :''"
          >
            <span>{{ data.Value }}</span>
            <span>
              <el-button
                type="text"
                size="mini"
                @click="() => append(data)"
                style="color:#67c23a"
                v-if="data.children"
              >+ 添加</el-button>
              <el-button type="text" size="mini"    v-if="!data.children">
                <label for="int" @click="getFileTi(data.Id)">↑ 上传</label>
                <input
                  id="int"
                  type="file"
                  ref="clearFile"
                  @change="getFile($event)"
                  style="margin-left:70px;display: none;"
                  accept=".pdf"
                />
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click="() => remove(node, data)"
                style="color:#f56c6c"
              >- 删除</el-button>
            </span>
          </span>
        </el-tree>
      </div>
    </div>
  </div>
</template>
<script>
let id = 1000;
export default {
  data() {
    return {
      Data: [],
      imgSrc: {},
      imgInfo: {},
      ClickId:'',
    };
  },
  created() {
    this.init();
  },
  methods: {
    // 初始接口
    init: function() {
      var obj = {
        api: "get",
        url: this.$store.state.http + "System/GetServiceManage"
      };
      this.$https(obj).then(res => {
        console.log(res.Data[0]);
        this.AddId = res.Data[0].Id;
        this.Data = res.Data[0].TrainingCaseTwo;
        for (var i = 0; i < this.Data.length; i++) {
          this.Data[i].children = this.Data[i].TrainingCaseThree;
        }
      });
    },
    // 添加子集
    append(datas) {
      this.$prompt("请输入标题", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          // 此处确认添加
          var obj = {
            api: "post",
            url: this.$store.state.http + "System/AddMenuNode",
            data: {
              id: datas.Id,
              name: value,
              Grade: 3
            }
          };
          this.$https(obj).then(res => {
            this.init();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消添加"
          });
        });
    },
    // 删除节点
    remove(node, datas) {
      var obj = {
        api: "post",
        url: this.$store.state.http + "System/DelMenuNode",
        data: {
          id: datas.Id
        }
      };
      this.$https(obj).then(res => {
        this.init();
      });
    },
    // 双击打开PDF
    lookPDF: function(data) {
      if (data.Key != "") {
        window.open(data.Key);
      } else {
        this.$message({
          type: "warning",
          message: "您还没有添加文件"
        });
      }
    },
    getFileTi:function(data){
      console.log(data)
      this.ClickId = data
    },
    // 上传PDF文件Base64位
    getFile(event) {
      var file = event.target.files;
      const inputFile = file[0];
      var that = this;
      if (inputFile) {
        const reader = new FileReader();
        reader.readAsDataURL(inputFile);
        reader.onload = function(e) {
          var PDFbase64 = this.result;
          console.log(PDFbase64);
          var obj = {
            api: "post",
            url: that.$store.state.http + "System/UploadFileToMenuNode",
            data: {
              id: that.ClickId,
              Str: PDFbase64
            }
          };
          that.$https(obj).then(res => {
            that.init()
            that.$message({
              message: "上传成功，双击查看",
              type: "success"
            });
          });
        };
      }
    },
    // 添加一级菜单
    Addone: function() {
      this.$prompt("请输入标题", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          // 此处确认添加
          var obj = {
            api: "post",
            url: this.$store.state.http + "System/AddMenuNode",
            data: {
              id: this.AddId,
              name: value,
              Grade: 2
            }
          };
          this.$https(obj).then(res => {
            this.init();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消添加"
          });
        });
    }
  }
};
</script>
<style lang="scss" scope>
#boxx {
  position: relative;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.add {
  width: 100%;
  height: 30px;
  padding-right: 10px;
  border-bottom: 2px solid #cccccc;
  box-sizing: border-box;
}
</style>