webpackJsonp([33],{ElVj:function(t,i){},Kxqx:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n={data:function(){return{AddKpi:{Date:"",EmployeeId:"",EmployeeName:"",Pone:0,Cone:0,Mone:"",Ptwo:0,Ctwo:0,Mtwo:"",Pthree:0,Cthree:0,Mthree:"",Pfour:0,Cfour:0,Mfour:"",Pfive:0,Cfive:0,Mfive:"",Psix:0,Csix:0,Msix:"",SpecialJia:"",SpecialJiaM:"",SpecialJian:"",SpecialJianM:"",IsManQin:"1"},InitialCore:100,Review:100}},computed:{},watch:{},methods:{ExamineKpi:function(){var t=this,i={api:"post",url:this.$store.state.http+"PCenter/ExamineKpi",data:{Id:this.AddKpi.Id}};this.$https(i).then(function(i){console.log(i),t.$emit("refresh"),t.$router.push({path:"GetKPIs"})})},UpdateKpi:function(t){var i=this,e={api:"post",url:this.$store.state.http+"PCenter/UpdateKpi",data:this.AddKpi};this.$https(e).then(function(e){var n=i;"1"==t?n.ExamineKpi():(n.$emit("refresh"),n.$router.push({path:"GetKPIs"}))})},InitialCoreCalc:function(){this.InitialCore=100+this.AddKpi.Pone+this.AddKpi.Ptwo+this.AddKpi.Pthree+this.AddKpi.Pfour+this.AddKpi.Pfive+this.AddKpi.Psix},ReviewCalc:function(){this.Review=100+this.AddKpi.Cone+this.AddKpi.Ctwo+this.AddKpi.Cthree+this.AddKpi.Cfour+this.AddKpi.Cfive+this.AddKpi.Csix},init:function(){var t=this,i={api:"get",url:this.$store.state.http+"PCenter/GetKPI",data:{kpiId:this.$store.state.Vuex.Id}};this.$https(i).then(function(i){console.log(i.Data),t.AddKpi=i.Data,t.AddKpi.IsManQin=String(t.AddKpi.IsManQin),t.InitialCoreCalc(),t.ReviewCalc()})}},created:function(){this.init()},mounted:function(){},beforeCreate:function(){},beforeMount:function(){},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},activated:function(){}},s={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"box_s"},[e("div",{staticClass:"KPITable"},[e("table",{staticClass:"borderTable",staticStyle:{width:"100%"}},[e("tbody",[e("tr",[e("td",{staticStyle:{lineHeight:"40px"},attrs:{colspan:"6"}},[e("h3",[t._v(t._s(t.AddKpi.Date.split("-")[0]+"年"+t.AddKpi.Date.split("-")[1]+"月")+"售后员工考核表")])])]),t._v(" "),e("tr",[e("td",[t._v("姓名")]),t._v(" "),e("td",{staticClass:"DJCCXXRY",attrs:{colspan:"2"}},[t._v("\n            "+t._s(this.AddKpi.EmployeeName?this.AddKpi.EmployeeName:"未查询到工程师姓名")+"\n\n          ")]),t._v(" "),e("td",{attrs:{rowspan:"2"}},[t._v("初核")]),t._v(" "),e("td",{attrs:{rowspan:"2"}},[t._v("复核")]),t._v(" "),e("td",{attrs:{rowspan:"2"}},[t._v("备注")])]),t._v(" "),t._m(0),t._v(" "),e("tr",[e("td",[t._v("客户满意度")]),t._v(" "),e("td",[t._v("20")]),t._v(" "),e("td",{staticClass:"Conter"},[t._v("\n             任何有关客户的投诉及不满意，直接扣20分。\n          ")]),t._v(" "),e("td",[e("el-input-number",{attrs:{size:"mini",min:-100,max:0,disabled:!0},model:{value:t.AddKpi.Pone,callback:function(i){t.$set(t.AddKpi,"Pone",i)},expression:"AddKpi.Pone"}})],1),t._v(" "),e("td",[e("el-input-number",{attrs:{size:"mini",min:-100,max:0},on:{change:function(i){return t.ReviewCalc()}},model:{value:t.AddKpi.Cone,callback:function(i){t.$set(t.AddKpi,"Cone",i)},expression:"AddKpi.Cone"}})],1),t._v(" "),e("td",[e("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},placeholder:"请输入备注",size:"mini"},model:{value:t.AddKpi.Mone,callback:function(i){t.$set(t.AddKpi,"Mone",i)},expression:"AddKpi.Mone"}})],1)]),t._v(" "),e("tr",[t._m(1),t._v(" "),e("td",[t._v("10")]),t._v(" "),t._m(2),t._v(" "),e("td",[e("el-input-number",{attrs:{size:"mini",min:-100,max:0,disabled:!0},model:{value:t.AddKpi.Ptwo,callback:function(i){t.$set(t.AddKpi,"Ptwo",i)},expression:"AddKpi.Ptwo"}})],1),t._v(" "),e("td",[e("el-input-number",{attrs:{size:"mini",min:-100,max:0},on:{change:function(i){return t.ReviewCalc()}},model:{value:t.AddKpi.Ctwo,callback:function(i){t.$set(t.AddKpi,"Ctwo",i)},expression:"AddKpi.Ctwo"}})],1),t._v(" "),e("td",[e("el-input",{attrs:{type:"textarea",autosize:{minRows:3,maxRows:4},placeholder:"请输入备注",size:"mini"},model:{value:t.AddKpi.Mtwo,callback:function(i){t.$set(t.AddKpi,"Mtwo",i)},expression:"AddKpi.Mtwo"}})],1)]),t._v(" "),e("tr",[t._m(3),t._v(" "),e("td",[t._v("10")]),t._v(" "),t._m(4),t._v(" "),e("td",[e("el-input-number",{attrs:{size:"mini",min:-100,max:0,disabled:!0},model:{value:t.AddKpi.Pthree,callback:function(i){t.$set(t.AddKpi,"Pthree",i)},expression:"AddKpi.Pthree"}})],1),t._v(" "),e("td",[e("el-input-number",{attrs:{size:"mini",min:-100,max:0},on:{change:function(i){return t.ReviewCalc()}},model:{value:t.AddKpi.Cthree,callback:function(i){t.$set(t.AddKpi,"Cthree",i)},expression:"AddKpi.Cthree"}})],1),t._v(" "),e("td",[e("el-input",{attrs:{type:"textarea",autosize:{minRows:3,maxRows:4},placeholder:"请输入备注",size:"mini"},model:{value:t.AddKpi.Mthree,callback:function(i){t.$set(t.AddKpi,"Mthree",i)},expression:"AddKpi.Mthree"}})],1)]),t._v(" "),e("tr",[t._m(5),t._v(" "),e("td",[t._v("40")]),t._v(" "),t._m(6),t._v(" "),e("td",[e("el-input-number",{attrs:{size:"mini",min:-100,max:0,disabled:!0},model:{value:t.AddKpi.Pfour,callback:function(i){t.$set(t.AddKpi,"Pfour",i)},expression:"AddKpi.Pfour"}})],1),t._v(" "),e("td",[e("el-input-number",{attrs:{size:"mini",min:-100,max:0},on:{change:function(i){return t.ReviewCalc()}},model:{value:t.AddKpi.Cfour,callback:function(i){t.$set(t.AddKpi,"Cfour",i)},expression:"AddKpi.Cfour"}})],1),t._v(" "),e("td",[e("el-input",{attrs:{type:"textarea",autosize:{minRows:6,maxRows:6},placeholder:"请输入备注",size:"mini"},model:{value:t.AddKpi.Mfour,callback:function(i){t.$set(t.AddKpi,"Mfour",i)},expression:"AddKpi.Mfour"}})],1)]),t._v(" "),e("tr",[t._m(7),t._v(" "),e("td",[t._v("10")]),t._v(" "),t._m(8),t._v(" "),e("td",[e("el-input-number",{attrs:{size:"mini",min:-100,max:0,disabled:!0},model:{value:t.AddKpi.Pfive,callback:function(i){t.$set(t.AddKpi,"Pfive",i)},expression:"AddKpi.Pfive"}})],1),t._v(" "),e("td",[e("el-input-number",{attrs:{size:"mini",min:-100,max:0},on:{change:function(i){return t.ReviewCalc()}},model:{value:t.AddKpi.Cfive,callback:function(i){t.$set(t.AddKpi,"Cfive",i)},expression:"AddKpi.Cfive"}})],1),t._v(" "),e("td",[e("el-input",{attrs:{type:"textarea",autosize:{minRows:3,maxRows:4},placeholder:"请输入备注",size:"mini"},model:{value:t.AddKpi.Mfive,callback:function(i){t.$set(t.AddKpi,"Mfive",i)},expression:"AddKpi.Mfive"}})],1)]),t._v(" "),e("tr",[t._m(9),t._v(" "),e("td",[t._v("10")]),t._v(" "),e("td",{staticClass:"Conter"},[t._v("\n             24小时内处理网上报修\n          ")]),t._v(" "),e("td",[e("el-input-number",{attrs:{size:"mini",min:-100,max:0,disabled:!0},model:{value:t.AddKpi.Psix,callback:function(i){t.$set(t.AddKpi,"Psix",i)},expression:"AddKpi.Psix"}})],1),t._v(" "),e("td",[e("el-input-number",{attrs:{size:"mini",min:-100,max:0},on:{change:function(i){return t.ReviewCalc()}},model:{value:t.AddKpi.Csix,callback:function(i){t.$set(t.AddKpi,"Csix",i)},expression:"AddKpi.Csix"}})],1),t._v(" "),e("td",[e("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},placeholder:"请输入备注",size:"mini"},model:{value:t.AddKpi.Msix,callback:function(i){t.$set(t.AddKpi,"Msix",i)},expression:"AddKpi.Msix"}})],1)]),t._v(" "),e("tr",[e("td",{attrs:{colspan:"3"}},[t._v("合计得分")]),t._v(" "),e("td",[t._v("\n            "+t._s(t.InitialCore)+"\n          ")]),t._v(" "),e("td",[t._v("\n            "+t._s(t.Review)+"\n          ")]),t._v(" "),e("td")]),t._v(" "),e("tr",[e("td",{attrs:{colspan:"3"}},[t._v("除年假外本月是否满勤（是否上浮20%）")]),t._v(" "),e("td",{attrs:{colspan:"2"}},[e("el-radio",{attrs:{label:"1"},model:{value:t.AddKpi.IsManQin,callback:function(i){t.$set(t.AddKpi,"IsManQin",i)},expression:"AddKpi.IsManQin"}},[t._v("满勤")]),t._v(" "),e("el-radio",{attrs:{label:"0"},model:{value:t.AddKpi.IsManQin,callback:function(i){t.$set(t.AddKpi,"IsManQin",i)},expression:"AddKpi.IsManQin"}},[t._v("未满勤")])],1),t._v(" "),e("td")]),t._v(" "),e("tr",[e("td",{attrs:{colspan:"3"}},[t._v("新员工减绩效总成绩")]),t._v(" "),e("td",[t._v("\n            "+t._s(t.AddKpi.SpecialJian)+"\n          ")]),t._v(" "),e("td",[e("el-input",{staticClass:"inp",attrs:{size:"mini",placeholder:"请输入姓名"},on:{input:function(i){""!=t.AddKpi.SpecialJianM?t.AddKpi.SpecialJian="-20":t.AddKpi.SpecialJian=""}},model:{value:t.AddKpi.SpecialJianM,callback:function(i){t.$set(t.AddKpi,"SpecialJianM",i)},expression:"AddKpi.SpecialJianM"}})],1),t._v(" "),e("td")]),t._v(" "),e("tr",[e("td",{attrs:{colspan:"3"}},[t._v("老员工加新员工培训效总成绩")]),t._v(" "),e("td",[t._v("\n            "+t._s(t.AddKpi.SpecialJia)+"\n          ")]),t._v(" "),e("td",[e("el-input",{staticClass:"inp",attrs:{size:"mini",placeholder:"请输入姓名"},on:{input:function(i){""!=t.AddKpi.SpecialJiaM?t.AddKpi.SpecialJia="20":t.AddKpi.SpecialJia=""}},model:{value:t.AddKpi.SpecialJiaM,callback:function(i){t.$set(t.AddKpi,"SpecialJiaM",i)},expression:"AddKpi.SpecialJiaM"}})],1),t._v(" "),e("td")]),t._v(" "),t._m(10)])]),t._v(" "),e("el-button",{staticStyle:{float:"right",margin:"30px 30px"},attrs:{type:"success",loading:this.$store.state.Vuex.loading,size:"mini"},on:{click:function(i){return t.UpdateKpi("1")}}},[t._v("复核")]),t._v(" "),e("el-button",{staticStyle:{float:"right",marginTop:"30px"},attrs:{type:"primary",loading:this.$store.state.Vuex.loading,size:"mini"},on:{click:function(i){return t.UpdateKpi()}}},[t._v("保存")])],1)])},staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("tr",[i("td",[this._v("考核项目")]),this._v(" "),i("td",[this._v("分数")]),this._v(" "),i("td",[this._v("评定标准")])])},function(){var t=this.$createElement,i=this._self._c||t;return i("td",[this._v("工作日报"),i("br"),this._v("（完整、清晰）")])},function(){var t=this.$createElement,i=this._self._c||t;return i("td",{staticClass:"Conter"},[this._v("\n             每日的工作要以文字及图片的形式发日报给区域经理确认。"),i("br"),this._v("\n             日报清晰详细，语法通顺，无错别字，且客户方的联系人必须真实准确。"),i("br"),this._v("\n             工作过程中出现任何问题及时与区域经理及客户沟通，"),i("br"),this._v("\n             不得瞒报。所有工作日报均需已Excel表格形式发送，并注意格式。\n          ")])},function(){var t=this.$createElement,i=this._self._c||t;return i("td",[this._v("工作态度"),i("br"),this._v("（认真、好学）")])},function(){var t=this.$createElement,i=this._self._c||t;return i("td",{staticClass:"Conter"},[this._v("\n             上班时间：尽量做到跟4S店上班时间一致，有特殊情况提前报告；若车间情况特殊，也需保证一天正常工作量"),i("br"),this._v("\n             沟通：需耐心细致地跟客户&公司员工沟通；安装、保养、维修工作上门之前需跟客户提前沟通，以保证工作顺利开展。"),i("br"),this._v("\n             学习：公司内部培训不认真学习，平时工作中不好学好问"),i("br"),this._v("\n             积极性：工作有积极性，工作态度好\n          ")])},function(){var t=this.$createElement,i=this._self._c||t;return i("td",[this._v("工作效率"),i("br"),this._v("（质量、效率）")])},function(){var t=this.$createElement,i=this._self._c||t;return i("td",{staticClass:"Conter"},[this._v("\n             维修工作：无极其特殊原因上门维修两次以上（包含2次）"),i("br"),this._v("\n             配件报件：报件不符，多报或少报配件"),i("br"),this._v("\n             保养&安装效率：效率低，磨洋工（保养标准详情见批注）"),i("br"),this._v("\n             培训：回访时客户反馈不满意，不全面（最多2次）"),i("br"),this._v("\n             没有择优选择乘车方式"),i("br"),this._v("\n             保养安排没有最大限度节约成本"),i("br"),this._v("\n             对工作有热忱，不拖沓，尽最大努力把本职工作做好。每月售后员工完成工作量对比来评判工作效率。\n          ")])},function(){var t=this.$createElement,i=this._self._c||t;return i("td",[this._v("安装、保养记录"),i("br"),this._v("（完整、全面）")])},function(){var t=this.$createElement,i=this._self._c||t;return i("td",{staticClass:"Conter"},[this._v("\n             安装&培训工作：举升机、拆胎机、平衡机、KDS、制动试验台，冷媒机等需要保修的大设备安装验收单（连带序列号），"),i("br"),this._v("\n             培训记录单，清点单，客户签字盖章后原件均需邮寄给客服存档；新店数据采集（责任人最后培训人）"),i("br"),this._v("\n             保养工作：认真完成保养记录、设备保养与检修报告，客户签字后原件邮寄给客服。 "),i("br"),this._v("\n             保养记录不准确，保养耗材提前发货未能及时统计\n          ")])},function(){var t=this.$createElement,i=this._self._c||t;return i("td",[this._v("网上报修"),i("br"),this._v("（及时、有效）")])},function(){var t=this.$createElement,i=this._self._c||t;return i("tr",[i("td",{staticClass:"Conter",attrs:{colspan:"6"}},[this._v("\n             注："),i("br"),this._v("\n             (1)实习期员工无绩效考核(入职3个月内)"),i("br"),this._v("\n             (2)实习期员工正式入职后6个月内绩效考核中最终成绩的20%绩效工资给区域经理；同时区域经理需认真教新同事工作，若发现区域经理态度不端正绩效考核直接为0分；同时若区域经理没有监督到位跟员工一并在绩效考核中扣分。（若员工学习能力强，工作能力全面，区域经理可以提前打申请，员工提前转正）"),i("br"),this._v("\n             (3)区域经理权利和义务相符，区域经理在做好自己工作安排的同时有权利和义务监督员工的一切工作；在执行权利的同时也需做好带头领导作用，若没能监督好员工工作将从重处理\n          ")])])}]};var a=e("VU/8")(n,s,!1,function(t){e("ElVj")},"data-v-9b85cb60",null);i.default=a.exports}});