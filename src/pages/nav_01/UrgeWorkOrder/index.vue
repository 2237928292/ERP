<template>
  <div class="box">
    <!-- 头部检索 -->

    <div class="TopSerch">

      <el-select size="mini" style="width: 120px" @change="init()" v-model="area" clearable placeholder="请选择区域">
        <el-option v-for="item in areaS" :key="item.Value" :label="item.Value" :value="item.Value"></el-option>
      </el-select>

      <el-button type="primary" size="mini" :loading='this.$store.state.Vuex.loading' @click="init()">检索</el-button>

    </div>

    <!-- 表格 -->
    <div class="content" style=" padding: 0px 25px;box-sizing: border-box;">
      <el-table :data="Data" :max-height="this.$store.state.TableOptimumHeight" size="mini" highlight-current-row border style="width: 100%" :header-cell-style="{background:'#e1e1e1'}">
        <el-table-column prop="CusName" label="客户名称" :show-overflow-tooltip="true" sortable></el-table-column>
        <!-- <el-table-column fixed prop="Name" label="姓名" width="150"></el-table-column> -->
        <!-- <el-table-column :show-overflow-tooltip="true" prop="Content" label="ID"></el-table-column> -->
        <el-table-column prop="Area" label="区域" width='100' sortable></el-table-column>
        <el-table-column prop="OrderType" label="任务类型" width='110' sortable></el-table-column>
        <el-table-column prop="OrderCode" label="任务单号" width='150' sortable></el-table-column>
        <el-table-column prop="AcceptDate" label="接受时间" width='110' sortable></el-table-column>
        <el-table-column prop="Duration" label="历时天数" width='100' sortable></el-table-column>
        <el-table-column prop="Warn" label="预警阈值" width='80'></el-table-column>
        <el-table-column prop="Engineer" label="工程师" width='110'></el-table-column>
        <el-table-column prop="Manager" label="区域经理" width='110'></el-table-column>
        <el-table-column prop="ManagerMobile" label="区域经理电话" width='110'></el-table-column>
      </el-table>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      Data: [],
      limit: 10,
      DateTime: "",
      area: "",
      areaS: [],
      options: [
        {
          value: 10,
          label: "十天",
        },
        {
          value: 30,
          label: "一月",
        },
        {
          value: 180,
          label: "半年",
        },
        {
          value: 360,
          label: "一年",
        },
      ],
    };
  },
  created() {
    this.init();
    this.initGetArea();
  },
  methods: {
    init: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "System/UrgeWorkOrder",
        data: {
          area: this.area,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.Data = res.Data;
        for (let index = 0; index < this.Data.length; index++) {
          const element = this.Data[index];
          if (element.AcceptDate != null) {
            element.AcceptDate = element.AcceptDate.split("T")[0];
          }
        }
      });
    },

    initGetArea: function () {
      var obj = {
        url: this.$store.state.http + "System/GetArea",
        api: "get",
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);
        this.areaS = res.Data;
      });
    },
  },
};
</script>
<style scope lang="scss">
@import url("../../../assets/scss/Tool_database.scss");

.top_init_data {
  width: 100%;
  height: 80px;
  padding: 23px;
  box-sizing: border-box;
}
.pagetion {
  width: 300px;
  height: 40px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.div {
  width: 100%;
  // height: 400px;
  // background: rgb(228, 228, 228);
  margin-top: 20px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5px;
}
.div div {
  line-height: 20px;
}
</style>