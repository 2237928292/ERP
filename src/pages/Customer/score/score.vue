<template>
  <div class="box_s">
    <div class="segmentation">基础信息</div>
    <div class="classElement" v-if="data.Dto">
      <div class="text">
        <p>客户名称 ：</p>
        {{data.Dto.CusFullName}}
      </div>
      <!-- <div class="text"> <p>得分 ：</p> {{data.Dto.Score}}</div> -->
      <div class="text">
        <p>状态 ：</p>
        {{data.Dto.StateStr || ' - - '}}
      </div>
      <div class="text">
        <p>创建周 ：</p>
        {{data.Dto.Year + ' - ' + data.Dto.Week }}
      </div>
      <div class="text">
        <p>时间 ：</p>
        {{data.Dto.CreateDate | DataTime}}
      </div>
      <div class="text">
        <p>回访内容 ：</p>
        {{data.Dto.Content || ' - - '}}
      </div>
    </div>

    <div class="segmentation">相关工作日报信息</div>

    <el-table :data="data.CusSerVisitWorkDailyDtos" style="width: 100%" size="mini">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <!-- <el-form-item v-for="(item,index) in props.row.DetailDtos" :key="index" label="描述" >
                <span>{{item}}</span>
            </el-form-item>-->
            <div
              class="textdiv"
              v-for="(item,index) in props.row.DetailDtos"
              :key="index"
            > <span class="ptext">{{index + 1}}</span> {{item}}</div>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="CusFullName" label="客户全称"></el-table-column>
      <el-table-column prop="Type" label="日报类型" width="180"></el-table-column>
      <el-table-column prop="Emginner" label="工程师" width="180"></el-table-column>
      <el-table-column prop="Date" label="服务日期" width="180"></el-table-column>
    </el-table>

    <div class="segmentation">回访内容</div>
    <div class="textareaDic">
      <el-input type="textarea" :rows="2" placeholder="请输入回访内容" v-model="textarea"></el-input>
    </div>

    <div class="segmentation">评分</div>
    <div class="textareaDic">
      <el-rate v-model="rate" :colors="colors"></el-rate>
    </div>

    <div class="botton">
      <el-button type="primary" size="mini" @click="Uprate()">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      data: [],
      textarea: "",
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"], // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
      rate: null,
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

        for (
          let index = 0;
          index < this.data.CusSerVisitWorkDailyDtos.length;
          index++
        ) {
          const element = this.data.CusSerVisitWorkDailyDtos[index];
          element.Date = element.Date.split("T")[0];
        }
      });
    },
    Uprate: function () {
      if (this.textarea == "") {
        this.$look("warning", "请输入回访内容！");
        return false;
      }
      if (this.rate == 0) {
        this.$look("warning", "请输入评分！");
        return false;
      }

      var obj = {
        api: "post",
        url: this.$store.state.http + "CRM/CusSerVisitScoring",
        data: {
          id: this.$store.state.router_Returnvisitdetails_ID,
          Str: this.textarea,
          Type: this.rate,
        },
      };
      this.$https(obj).then((res) => {
        this.$router.push({
          path: "Customer_Returnvisit",
        });
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
  margin-top: 30px;
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
.textareaDic {
  width: 700px;
  margin-top: 20px;
  padding-left: 30px;
  box-sizing: border-box;
}
.botton {
  width: 100%;
  margin-top: 50px;
  padding-right: 100px;
  box-sizing: border-box;
  button {
    float: right;
  }
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.textdiv {
  width: 100%;
  min-height: 25px;
  max-height: 200px;
  color: #000;
  font-size: 12px;
  line-height: 25px;
  text-indent:40px
}
.ptext{
  color: rgb(4, 94, 124);
  float: left;
}
</style>

