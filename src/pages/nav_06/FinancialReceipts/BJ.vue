<template>
  <div class="box_s">
    <div class="segmentation">
      基础信息
    </div>
    <div class="itemmsgxx_document" style="width: 100%">
      <p><span>客户名称:</span>{{Data.CusName}}</p>
    </div>
    <div class="itemmsgxx_document">
      <p><span>合同号:</span>{{Data.MaintainCode}}</p>
    </div>
    <div class="itemmsgxx_document">
      <p><span>当前状态:</span>{{Data.StateStr}}</p>
    </div>
    <div class="itemmsgxx_document" style="width: calc(100% - 600px)">
      <p><span>创建时间:</span>{{Data.CreateDate}}</p>
    </div>
    <div class="itemmsgxx_document">
      <p><span>财务确认人:</span>{{Data.Confirmer}}</p>
    </div>
    <div class="itemmsgxx_document">
      <p><span>财务确认时间:</span>{{Data.ConfirmeDate}}</p>
    </div>
    <div class="segmentation">
      本次收款金额
      <el-button @click="TrueSK()" style="float:right" size="mini" type="primary">确认收款</el-button>
    </div>
    <div class="itemmsgxx_document">
      <p> <span style="font-size:50px;color:red;font-family:Arial;line-height:100px;margin-left:30px">{{Data.Amount}}</span></p>
    </div>

    <div class="segmentation" style="margin-top:80px">收款记录
      <p style="float: right; color: #000">
        (财务已确认：{{ FinancialConfirmed + " 元" }} ) &nbsp;&nbsp;
      </p>

      <p style="float: right; color: #000">
        (等待确认：{{ FinancialUnconfirmed + " 元" }} ) &nbsp;&nbsp;
      </p>
      <p style="float: right; color: #000">
        (合同总金额：{{ Data.ContractAmount + " 元" }} ) &nbsp;&nbsp;
      </p>

    </div>

    <div class="timeline">
      <el-timeline :reverse="reverse">
        <el-timeline-item :color="activity.State == 2? '#67C23A' : '#909399' " v-for="(activity, index) in GetMCPlistData" :key="index" :timestamp="activity.Other">
          {{ activity.Amount + " 元"  + ' - - ' + activity.StateStr}}
        </el-timeline-item>
      </el-timeline>
    </div>

  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      Data: this.$store.state.Vuex.GetFCollections,
      GetMCPlistDataList: 0,
      GetMCPlistData: [],
      reverse: true,
      FinancialConfirmed: 0,
      FinancialUnconfirmed: 0,
    };
  },
  created() {
    this.GetMCPlist();
  },
  components: {},
  methods: {
    GetMCPlist: function () {
      var obj = {
        api: "GET",
        url: this.$store.state.http + "maintain/GetMCPlist",
        data: {
          id: this.Data.MaintainId, // 主键
        },
      };
      this.$https(obj).then((res) => {
        this.GetMCPlistData = res.Data;
        console.log(res);
        this.GetMCPlistDataList = 0;
        for (let index = 0; index < this.GetMCPlistData.length; index++) {
          const element = this.GetMCPlistData[index];
          this.GetMCPlistDataList += element.Amount;
          if (element.State == 2) {
            console.log(element.Amount);
            this.FinancialConfirmed += element.Amount;
          } else {
            this.FinancialUnconfirmed += element.Amount;
          }
        }
      });
    },
    TrueSK: function () {
      var obj = {
        api: "post",
        url: this.$store.state.http + "maintain/MFCPay",
        data: {
          id: this.Data.Id, // 主键
        },
      };
      this.$https(obj).then((res) => {
        this.$look("success", "成功！", "确认收款成功！");
        this.$emit("refresh"),
          this.$router.push({ path: "/FinancialReceipts" });
      });
    },
  },
};
</script>

