webpackJsonp([99],{eJlk:function(t,a){},ibSB:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s={name:"",data:function(){return{data:[],textarea:"",colors:["#99A9BF","#F7BA2A","#FF9900"],rate:null}},created:function(){this.init()},components:{},filters:{DataTime:function(t){return t.split("T")[0]}},methods:{init:function(){var t=this,a={api:"get",url:this.$store.state.http+"CRM/GetCusSerVisit",data:{id:this.$store.state.router_Returnvisitdetails_ID}};this.$https(a).then(function(a){console.log(a.Data),t.data=a.Data;for(var e=0;e<t.data.CusSerVisitWorkDailyDtos.length;e++){var s=t.data.CusSerVisitWorkDailyDtos[e];s.Date=s.Date.split("T")[0]}})},Uprate:function(){var t=this;if(""==this.textarea)return this.$look("warning","请输入回访内容！"),!1;if(0==this.rate)return this.$look("warning","请输入评分！"),!1;var a={api:"post",url:this.$store.state.http+"CRM/CusSerVisitScoring",data:{id:this.$store.state.router_Returnvisitdetails_ID,Str:this.textarea,Type:this.rate}};this.$https(a).then(function(a){t.$router.push({path:"Customer_Returnvisit"})})}}},i={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"box_s"},[e("div",{staticClass:"segmentation"},[t._v("基础信息")]),t._v(" "),t.data.Dto?e("div",{staticClass:"classElement"},[e("div",{staticClass:"text"},[e("p",[t._v("客户名称 ：")]),t._v("\n      "+t._s(t.data.Dto.CusFullName)+"\n    ")]),t._v(" "),e("div",{staticClass:"text"},[e("p",[t._v("状态 ：")]),t._v("\n      "+t._s(t.data.Dto.StateStr||" - - ")+"\n    ")]),t._v(" "),e("div",{staticClass:"text"},[e("p",[t._v("创建周 ：")]),t._v("\n      "+t._s(t.data.Dto.Year+" - "+t.data.Dto.Week)+"\n    ")]),t._v(" "),e("div",{staticClass:"text"},[e("p",[t._v("时间 ：")]),t._v("\n      "+t._s(t._f("DataTime")(t.data.Dto.CreateDate))+"\n    ")]),t._v(" "),e("div",{staticClass:"text"},[e("p",[t._v("回访内容 ：")]),t._v("\n      "+t._s(t.data.Dto.Content||" - - ")+"\n    ")])]):t._e(),t._v(" "),e("div",{staticClass:"segmentation"},[t._v("相关工作日报信息")]),t._v(" "),e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.data.CusSerVisitWorkDailyDtos,size:"mini"}},[e("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},t._l(a.row.DetailDtos,function(a,s){return e("div",{key:s,staticClass:"textdiv"},[e("span",{staticClass:"ptext"},[t._v(t._s(s+1))]),t._v(" "+t._s(a))])}),0)]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"CusFullName",label:"客户全称"}}),t._v(" "),e("el-table-column",{attrs:{prop:"Type",label:"日报类型",width:"180"}}),t._v(" "),e("el-table-column",{attrs:{prop:"Emginner",label:"工程师",width:"180"}}),t._v(" "),e("el-table-column",{attrs:{prop:"Date",label:"服务日期",width:"180"}})],1),t._v(" "),e("div",{staticClass:"segmentation"},[t._v("回访内容")]),t._v(" "),e("div",{staticClass:"textareaDic"},[e("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入回访内容"},model:{value:t.textarea,callback:function(a){t.textarea=a},expression:"textarea"}})],1),t._v(" "),e("div",{staticClass:"segmentation"},[t._v("评分")]),t._v(" "),e("div",{staticClass:"textareaDic"},[e("el-rate",{attrs:{colors:t.colors},model:{value:t.rate,callback:function(a){t.rate=a},expression:"rate"}})],1),t._v(" "),e("div",{staticClass:"botton"},[e("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return t.Uprate()}}},[t._v("提交")])],1)],1)},staticRenderFns:[]};var r=e("VU/8")(s,i,!1,function(t){e("eJlk")},"data-v-0f80b6a6",null);a.default=r.exports}});