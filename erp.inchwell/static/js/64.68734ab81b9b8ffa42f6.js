webpackJsonp([64],{FvVc:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={data:function(){return{AutomaticComputing:"",GcsListWork:[],Data:{}}},computed:{},watch:{},methods:{FH:function(){var t=this,e=this.Data.Dto.Date;""!=this.AutomaticComputing&&(e=this.AutomaticComputing);var a={api:"post",url:this.$store.state.http+"Pcenter/ExamineTA",data:{Id:this.$store.state.Vuex.Id,Str:e}};this.$https(a).then(function(e){t.$emit("refresh"),t.$router.push({path:"TravelAllowance"})})},init:function(){var t=this,e={api:"get",url:this.$store.state.http+"Pcenter/GetTADetailDetail",data:{taId:this.$store.state.Vuex.Id}};this.$https(e).then(function(e){console.log(e),t.Data=e.Data,t.GcsListWork=e.Data.TravelInfos,t.AutomaticComputing=e.Data.Dto.Days,t.Data.Dto.Days=0;for(var a=0;a<t.GcsListWork.length;a++)t.Data.Dto.Days+=t.GcsListWork[a].Days})}},created:function(){this.init()},mounted:function(){},beforeCreate:function(){},beforeMount:function(){},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},activated:function(){}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"box_s"},["Success"==t.Data.Msg?a("table",{staticClass:"borderTable"},[a("tbody",[t._m(0),t._v(" "),a("tr",[a("td",{staticClass:"DJCCXXRY",on:{click:function(e){t.dialogTableVisible=!0}}},[t._v("\n          "+t._s(t.Data.Dto.EnginnerName)+"\n        ")]),t._v(" "),a("td",{staticStyle:{"text-align":"right"}},[t._v("申请月份：")]),t._v(" "),a("td",[t._v("\n          "+t._s(t.Data.Dto.Date)+"\n        ")])]),t._v(" "),t._m(1),t._v(" "),t._l(t.GcsListWork,function(e,s){return a("tr",{key:s},[a("td",{staticStyle:{width:"25%"}},[a("span",[t._v(t._s(e.Date.split("T")[0]))])]),t._v(" "),a("td",{staticStyle:{width:"60%","text-align":"left"}},[a("span",[a("span",[t._v(t._s(e.Info))]),a("br")])]),t._v(" "),a("td",{staticStyle:{width:"15%"}},[a("span",[t._v(t._s(e.Days))])])])}),t._v(" "),a("tr",[a("td",[t._v("合计")]),t._v(" "),t._m(2),t._v(" "),a("td",[a("el-input",{staticClass:"JS",attrs:{size:"mini",disabled:""},model:{value:t.Data.Dto.Days,callback:function(e){t.$set(t.Data.Dto,"Days",e)},expression:"Data.Dto.Days"}},[a("template",{staticStyle:{color:"#000"},slot:"prepend"},[t._v("自动计算天数：")])],2),t._v(" "),a("br"),t._v(" "),a("el-input",{staticClass:"JS",attrs:{size:"mini",disabled:""},model:{value:t.AutomaticComputing,callback:function(e){t.AutomaticComputing=e},expression:"AutomaticComputing"}},[a("template",{slot:"prepend"},[t._v("手动修改天数：")])],2)],1)]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"},attrs:{colspan:"3"}},[t._v("    初核人："+t._s(t.Data.Dto.FirstInspection))])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"},attrs:{colspan:"3"}},[t._v("    复核人："+t._s(t.Data.Dto.ToReview))])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"},attrs:{colspan:"3"}},[t._v("    日期："+t._s(t.Data.Dto.CreateDate))])])],2)]):t._e()])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("tr",[e("td",{staticStyle:{"font-weight":"800"},attrs:{colspan:"3"}},[this._v("员工出差补助申请表")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("tr",[e("td",{staticStyle:{"font-weight":"800"}},[this._v("出差日期")]),this._v(" "),e("td",{staticStyle:{"font-weight":"800"}},[this._v("出差事由")]),this._v(" "),e("td",{staticStyle:{"font-weight":"800"}},[this._v("出差天数")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",{staticStyle:{"text-align":"left",color:"red"}},[e("span",[this._v("    【自动计算天数】是系统自送根据工作日报计算得出；")]),this._v(" "),e("br"),this._v(" "),e("span",[this._v("    【手动修改天数】是审核人根据实际情况核算天数，财务计算补助以【手动修改天数】为准；")])])}]};var n=a("VU/8")(s,i,!1,function(t){a("Im29")},"data-v-53f2d600",null);e.default=n.exports},Im29:function(t,e){}});