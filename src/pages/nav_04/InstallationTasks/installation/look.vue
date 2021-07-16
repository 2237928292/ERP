<template>
  <div class="box_s">
    <div class="lookitem" style="width:90%;borderBottom: 0.5px solid #ccc;">
      <div class="titlediv">客户：</div>
      <div v-if="Data.Dto">{{Data.Dto.CusFullName + '【' + Data.Dto.TypeStr + '】'}}</div>
    </div>


        <div v-if="Data.Dto" class="itemmsgxx_document"><p><span>创建者:</span>{{Data.Dto.Creater }}</p></div>
        <div v-if="Data.Dto" class="itemmsgxx_document"><p><span>区域经理:</span>{{Data.Dto.Manager }}</p></div>
        <div v-if="Data.Dto" class="itemmsgxx_document"><p><span>当前状态:</span>{{Data.Dto.StateStr  }}</p></div>
        <div v-if="Data.Dto" class="itemmsgxx_document"><p><span>创建时间:</span>{{Data.Dto.CreateDate  }}</p></div>
        <div v-if="Data.Dto" class="itemmsgxx_document"><p><span>指派时间:</span>{{Data.Dto.DeliveryDate }}</p></div>
        <div v-if="Data.Dto" class="itemmsgxx_document"><p><span>接受时间:</span>{{Data.Dto.AcceptDate }}</p></div>
        <div v-if="Data.Dto" class="itemmsgxx_document"><p><span>出发时间:</span>{{Data.Dto.GotoDate }}</p></div>
        <div v-if="Data.Dto" class="itemmsgxx_document"><p><span>到达时间:</span>{{Data.Dto.ArriveDate }}</p></div>
        <div v-if="Data.Dto" class="itemmsgxx_document"><p><span> 完成时间:</span>{{Data.Dto.CompleteDate }}</p></div>
        <div v-if="Data.Dto" class="itemmsgxx_document" style="width:100%"><p><span>来源:</span>{{Data.Dto.Origin}}</p></div>

    <!-- 分割线 -->
    <div class="lookitem" style="width:90%;borderBottom: 0.5px solid #ccc;">
      <div class="titlediv">工程师</div>
      <!-- <div v-if="Data.Dto">{{Data.Dto.CusFullName}}</div> -->
    </div>
    <!-- <div class="lookitem" style="width:90%;" v-if="Data.EnginnerDtos">
      <el-tag v-if="Data.EnginnerDtos.length == 0" type="danger">暂未指派工程师</el-tag>
      <el-tag v-for="(item,index) in  Data.EnginnerDtos" :key="index">{{item.Name}}</el-tag>
    </div>-->

    <el-table :data="Data.EnginnerDtos" style="width: 90%" size="mini">
      <el-table-column prop="Name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="StateStr" label="任务状态" width="180"></el-table-column>
      <el-table-column prop="OrderCode" label="任务编号"></el-table-column>
    </el-table>

    <div class="lookitem" style="width:90%;borderBottom: 0.5px solid #ccc;">
      <div class="titlediv">设备</div>
      <!-- <div v-if="Data.Dto">{{Data.Dto.CusFullName}}</div> -->
    </div>

    <el-table :data="Data.EquDtos" style="width: 90%" size="mini">
      <el-table-column prop="ProductCode" label="编号" width="180"></el-table-column>
      <el-table-column prop="Brand" label="品牌" width="180"></el-table-column>
      <el-table-column prop="Desc" label="描述" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="Number" label="数量" width="100"> </el-table-column>
    </el-table>

    <!-- 我是分割线 -->
    <div class="lookitem" style="width:90%;borderBottom: 0.5px solid #ccc;">
      <div class="titlediv">附件</div>
      <!-- <div v-if="Data.Dto"> 点击查看 </div> -->
    </div>

    <div v-if="Data.FileDtos" class="work">
      <img v-for="(item, index) in Data.FileDtos" :key="index" class="imgicon" :src="imgUrl" alt @click="link(item.Url)" />
    </div>

    <!-- 我是分割线 -->
    <div v-if="Data.Dto  && Data.Dto.Content != null" class="lookitem" style="width:90%;borderBottom: 0.5px solid #ccc;">
      <div class="titlediv">工作内容：</div>
      <!-- <div v-if="Data.Dto"> 点击查看 </div> -->
    </div>

    <div v-if="Data.Dto != null  && Data.Dto.Content != null" class="work" v-for="(item, index) in Data.FileDtos" :key="index">
      {{Data.Dto.Content}}
    </div>

    <!-- 我是分割线 -->
    <div class="lookitem" style="width:90%">

      <el-button v-if="this.$store.state.InstallationtasklookIDState == 1" type="primary" size="mini" style="float:right;marginRight:20px" @click="psgcs()">派送</el-button>
      <el-button v-if="this.$store.state.InstallationtasklookIDState == 1" type="warning" size="mini" style="float:right;marginRight:20px" @click="cheche()">撤单</el-button>

    </div>

  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      Data: {},
      imgUrl: require("../../../../assets/img-icon/PD.png"),
    };
  },
  created() {
    this.initData();
  },
  components: {},
  methods: {
    cheche: function () {
      console.log();
      var obj = {
        api: "post",
        url: this.$store.state.http + "WO/CancelEquInstallOrder",
        data: {
          Id: this.$store.state.InstallationtasklookID,
        },
      };
      this.$https(obj).then((res) => {
        this.$emit("refresh"),
        this.$router.push({ path: "/Installationtask" });
      });
    },
    psgcs: function () {
      var obj = {
        api: "post",
        url: this.$store.state.http + "WO/SentManageEquInstallOrder",
        data: {
          id: this.$store.state.InstallationtasklookID,
        },
      };
      this.$https(obj).then((res) => {
        this.$emit("refresh"),
        this.$router.push({ path: "/Installationtask" });
      });
    },
    // init  获取详情
    initData: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "WO/GetEquInstallOrder",
        data: {
          id: this.$store.state.InstallationtasklookID,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);
        this.Data = res.Data;

        var Time = this.Data.Dto;
        Time.CreateDate = this.timeLv(Time.CreateDate);
        Time.DeliveryDate = this.timeLv(Time.DeliveryDate);
        Time.AcceptDate = this.timeLv(Time.AcceptDate);
        Time.GotoDate = this.timeLv(Time.GotoDate);
        Time.ArriveDate = this.timeLv(Time.ArriveDate);
        Time.CompleteDate = this.timeLv(Time.CompleteDate);

        console.log(this.Data);
      });
    },
    // 过滤时间
    timeLv: function (res) {
      if (res == null || res == "") {
        return " - - ";
      } else {
        return res.split("T")[0];
      }
    },
    link: function (res) {
      window.open(res);
    },
  },
};
</script>

<style lang="scss" scoped>
.lookitem {
  width: 300px;
  padding: 10px;
  font-size: 13px;
  margin: 10px;
  float: left;
  box-sizing: border-box;
  .titlediv {
    width: 90px;
    float: left;
    font-weight: bold;
    color: red;
  }
  .leftdiv {
    width: 100px;
    float: left;
    font-weight: bold;
    text-align: right;
  }
}
.work {
  width: 100%;
  padding-left: 50px;
  color: #09c;
  margin-top: 10px;
  font-weight: bold;
  float: left;
  box-sizing: border-box;
  .imgicon {
    width: 50px;
    height: 50px;
    display: block;
    float: left;
  }
}
</style>
