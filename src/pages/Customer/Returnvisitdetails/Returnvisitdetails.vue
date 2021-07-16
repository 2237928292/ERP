<template>
  <div class="box_s">
     <div class="segmentation"> 基础信息 </div>
      <div class="classElement" v-if="data.Dto">
                <div class="text"> <p>客户名称 ：</p> {{data.Dto.CusFullName}}</div>
                
                <div class="text"> <p>状态 ：</p> {{data.Dto.StateStr || ' - - '}}</div>
                <div class="text"> <p>创建周 ：</p> {{data.Dto.Year + ' - ' + data.Dto.Week }}</div>
                <div class="text"> <p>时间 ：</p> {{data.Dto.CreateDate | DataTime}}</div>
                <div class="text"> <p>回访内容 ：</p> {{data.Dto.Content || ' - - '}}</div>
                <div class="text"> <p>得分 ：</p>    
                  <el-rate
                      v-model="data.Dto.Score"
                      :colors="colors">
                  </el-rate></div>
      </div>

    <div class="segmentation">相关工作日报信息</div>

    <el-table :data="data.CusSerVisitWorkDailyDtos" style="width: 100%" size='mini' > 
      <el-table-column prop="CusFullName" label="客户全称"></el-table-column>
      <el-table-column prop="Type" label="日报类型" width="180"></el-table-column>
      <el-table-column prop="Emginner" label="工程师" width="180"></el-table-column>
    <el-table-column prop="Date" label="服务日期" width="180"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      data: [],
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'] ,// 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
    };
  },
  created() {
    this.init();
  },
  components: {},
  filters: {
    DataTime: function (res) {
      return res.split("T")[0];
    },
  },
  methods: {
    init: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "CRM/GetCusSerVisit",
        data: {
          id: this.$store.state.router_Returnvisitdetails_ID,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);
        this.data = res.Data;

        for (let index = 0; index <  this.data.CusSerVisitWorkDailyDtos.length; index++) {
            const element = this.data.CusSerVisitWorkDailyDtos[index];
            element.Date =  element.Date.split("T")[0];
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.segmentation {
  width: 99%;
  height: 30px;
  border-bottom: 2px solid #ccc;
  line-height: 30px;
  padding-left: 20px;
  box-sizing: border-box;
  color: #727272;
  font-size: 13px;
  font-weight: bold;
}
.classElement {
  width: 100%;
  .text {
    padding: 10px;
    font-size: 13px;
    margin-left: 50px;
    p {
      width: 100px;
      color: #000;
      font-weight: bold;
      float: left;
    }
  }
}
</style>

