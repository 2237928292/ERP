webpackJsonp([62],{JvtK:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s={name:"",data:function(){return{data:[],colors:["#99A9BF","#F7BA2A","#FF9900"]}},created:function(){this.init()},components:{},filters:{DataTime:function(t){return t.split("T")[0]}},methods:{init:function(){var t=this,a={api:"get",url:this.$store.state.http+"CRM/GetCusSerVisit",data:{id:this.$store.state.router_Returnvisitdetails_ID}};this.$https(a).then(function(a){console.log(a.Data),t.data=a.Data;for(var e=0;e<t.data.CusSerVisitWorkDailyDtos.length;e++){var s=t.data.CusSerVisitWorkDailyDtos[e];s.Date=s.Date.split("T")[0]}})}}},i={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"box_s"},[e("div",{staticClass:"segmentation"},[t._v(" 基础信息 ")]),t._v(" "),t.data.Dto?e("div",{staticClass:"classElement"},[e("div",{staticClass:"text"},[e("p",[t._v("客户名称 ：")]),t._v(" "+t._s(t.data.Dto.CusFullName))]),t._v(" "),e("div",{staticClass:"text"},[e("p",[t._v("状态 ：")]),t._v(" "+t._s(t.data.Dto.StateStr||" - - "))]),t._v(" "),e("div",{staticClass:"text"},[e("p",[t._v("创建周 ：")]),t._v(" "+t._s(t.data.Dto.Year+" - "+t.data.Dto.Week))]),t._v(" "),e("div",{staticClass:"text"},[e("p",[t._v("时间 ：")]),t._v(" "+t._s(t._f("DataTime")(t.data.Dto.CreateDate)))]),t._v(" "),e("div",{staticClass:"text"},[e("p",[t._v("回访内容 ：")]),t._v(" "+t._s(t.data.Dto.Content||" - - "))]),t._v(" "),e("div",{staticClass:"text"},[e("p",[t._v("得分 ：")]),t._v(" "),e("el-rate",{attrs:{colors:t.colors},model:{value:t.data.Dto.Score,callback:function(a){t.$set(t.data.Dto,"Score",a)},expression:"data.Dto.Score"}})],1)]):t._e(),t._v(" "),e("div",{staticClass:"segmentation"},[t._v("相关工作日报信息")]),t._v(" "),e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.data.CusSerVisitWorkDailyDtos,size:"mini"}},[e("el-table-column",{attrs:{prop:"CusFullName",label:"客户全称"}}),t._v(" "),e("el-table-column",{attrs:{prop:"Type",label:"日报类型",width:"180"}}),t._v(" "),e("el-table-column",{attrs:{prop:"Emginner",label:"工程师",width:"180"}}),t._v(" "),e("el-table-column",{attrs:{prop:"Date",label:"服务日期",width:"180"}})],1)],1)},staticRenderFns:[]};var l=e("VU/8")(s,i,!1,function(t){e("NwWM")},"data-v-55988e18",null);a.default=l.exports},NwWM:function(t,a){}});