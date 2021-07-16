<template>
  <div class="box_s">

    <el-form ref="form"  label-width="120px" >

        <el-form-item style="width:45%;float:left"  label="客户全称:">
            {{Dto.CusFullName}}
        </el-form-item>
        <el-form-item style="width:45%;float:left"  label="评定等级:">
            <el-select
                v-model="PDstat"
                size="mini"
                filterable
                placeholder="请选择状态"
                @change="ReviewPriorityCV()"
            >
                <el-option
                v-for="item in DtoTwo"
                :key="item.Id"
                :label="item.label"
                :value="item.value"
                >
                </el-option>
      </el-select>
        </el-form-item>

        <el-form-item style="width:300px;float:left"  label="拜访发起人:">
            {{Dto.VisiterName}}
        </el-form-item>
        
        <el-form-item style="width:300px;float:left"  label="当前状态:">
            {{Dto.StateStr }}
        </el-form-item>

        <el-form-item style="width:300px;float:left"  label="创建时间:">
            {{Dto.CreateDate }}
        </el-form-item>

        <el-form-item style="width:300px;float:left"  label="开始时间:">
            {{Dto.BeginTime }}
        </el-form-item>

        <el-form-item style="width:300px;float:left"  label="结束时间:">
            {{Dto.EndTime }}
        </el-form-item>

        <el-form-item style="width:100%;float:left"   label="售后产值:">
            {{Dto.OutputValue || ' - - ' + "(万)" }}
        </el-form-item>

        <el-form-item style="width:100%;float:left" class="el-form-item_li"  label="隶属集团:">
            {{Dto.AffiliatedGroup }}
        </el-form-item>

        <el-form-item style="width:100%;float:left" class="el-form-item_li"  label="建店年份:">
            {{Dto.BuildYear  }}
        </el-form-item>

        <el-form-item style="width:100%;float:left" class="el-form-item_li" label="设备概述:">
            <!-- <el-input
                type="textarea"
                autosize 
                placeholder="请输入内容"
                v-model="Dto.EquOverview"
                >
            </el-input> -->
            <div v-for="(item,index23) in Dto.EquOverviews"  :key='index23'>
                {{item}}
            </div>
        </el-form-item>

        <el-form-item style="width:100%;float:left" class="el-form-item_li" label="审批流程:">
            {{Dto.ApprovalProcess }}
        </el-form-item>

        <el-form-item style="width:100%;float:left" class="el-form-item_li" label="财务预算:">
            {{Dto.FinancialBudget }}
        </el-form-item>

        <el-form-item style="width:100%;float:left" class="el-form-item_li" label="其它信息:">
            {{Dto.OtherInfo }}
        </el-form-item>

   

    </el-form>
    <div style="width:100%;float:left" ></div>


    <el-card class="box-card" v-for="(item, index) in LinkMans" :key="index" style="width:300px;float:left;margin:10px"  > 
        <div slot="header" class="clearfix" style="fontSize:13px">
            <span>{{item.Name}}</span>
        </div>
        <div class="textfe">
            <span class="span1">英文名：</span>
            <span>{{item.NameEn || ' - -'}}</span>
        </div>
        <div class="textfe">
            <span class="span1">手机：</span>
            <div class="span2">{{item.Mobile || ' - - '}}</div>
        </div>
        <div class="textfe">
            <span class="span1">职位：</span>
            <div class="span2">{{item.Position || ' - - '}}</div>
        </div>
        <div class="textfe">
            <span class="span1">邮箱：</span>
            <div class="span2">{{item.Email || ' - - '}}</div>
        </div>
        <div class="textfe">
            <span class="span1">地址：</span>
            <div class="span2">{{item.Address || ' - - '}}</div>
        </div>
    </el-card>



    


  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
        Dto:{},
        LinkMans:[],
        PDstat:'',
        DtoTwo: [
        { label: "高", value: "高" },
        { label: "中", value: "中" },
        { label: "低", value: "低" },
        { label: "完成", value: "完成" },
      ],

    };
  },
  watch(){
      
  },
  created() {this.init()},
  components: {},
  methods: {
    //  初始化
      init:function(){
          var obj = {
          api : 'get',
          url: this.$store.state.http + 'CRM/GetCusVisit',
          data:{
              Id:this.$store.state.indexIdGetCusVisitsLook
          },
           };
           this.$https(obj).then(res => {
               console.log(res)
               this.Dto = res.Data.Dto
               this.Dto.CreateDate = this.Dto.CreateDate == '' || this.Dto.CreateDate == null ? ' - - '  : this.Dto.CreateDate.split('T')[0]
               this.Dto.BeginTime = this.Dto.BeginTime == '' || this.Dto.BeginTime == null ? ' - - '  : this.Dto.BeginTime.split('T')[0]
               this.Dto.EndTime = this.Dto.EndTime == '' || this.Dto.EndTime == null ? ' - - '  : this.Dto.EndTime.split('T')[0]
               this.Dto.EquOverviews = this.Dto.EquOverview.split('-----')
               console.log(this.Dto.EquOverviews)
               this.LinkMans = res.Data.LinkMans
               this.Dto.BuildYear == 0 ? this.Dto.BuildYear = '暂无' : ''
               this.PDstat = this.Dto.Priority
          });
      },
    //   ICMS.评定拜访优先级
    ReviewPriorityCV:function(){
        var obj = {
          api : 'post',
          url: this.$store.state.http + 'CRM/ReviewPriorityCV',
          data:{
              Id:this.$store.state.indexIdGetCusVisitsLook,
              Str : this.PDstat,
          },
           };
           this.$https(obj).then(res => {
               console.log(res)
          });
    }
  },
};
</script>

<style lang="scss" scoped>
.textfe{
    width: 100%;
    line-height: 20px;
    font-size: 12px;
    .span1{
        display: block;
        width: 100px;
        float: left;
    }
    .span2{
        width: 160px;
        float: left;
        word-break: break-all; 
	    word-wrap: break-word;
    }
}
.el-form-item_li{
    word-break: break-all; 
	word-wrap: break-word;
    padding-right: 30px;
    box-sizing: border-box;
}
</style>
