webpackJsonp([65],{HcQ4:function(t,e){},hhaF:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("t4zo"),i=a.n(l),n=a("uXZL"),o=a.n(n),r={data:function(){return{Data:[],limit:10,DateTime:"",areaId:"",areaS:[],options:[{value:10,label:"十天"},{value:30,label:"一月"},{value:180,label:"半年"},{value:360,label:"一年"}]}},created:function(){this.init(),this.initGetArea()},methods:{init:function(){var t=this,e={api:"get",url:this.$store.state.http+"System/EngineerSR",data:{date:this.DateTime||"",limit:this.limit||"",areaId:this.areaId}};this.$https(e).then(function(e){console.log(e),t.Data=e.Data})},initGetArea:function(){var t=this,e={url:this.$store.state.http+"System/GetArea",api:"get"};this.$https(e).then(function(e){console.log(e.Data),t.areaS=e.Data})},Excel:function(){var t=o.a.utils.table_to_book(document.querySelector("#out-table"),{raw:!0}),e=o.a.write(t,{bookType:"xlsx",bookSST:!0,type:"array"});try{i.a.saveAs(new Blob([e],{type:"application/octet-stream"}),"打卡记录.xlsx")}catch(t){"undefined"!=typeof console&&console.log(t,e)}return e}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"box"},[a("div",{staticClass:"TopSerch"},[a("el-date-picker",{attrs:{type:"date",size:"mini",placeholder:"选择日期"},on:{change:function(e){return t.init()}},model:{value:t.DateTime,callback:function(e){t.DateTime=e},expression:"DateTime"}}),t._v(" "),a("el-select",{attrs:{placeholder:"请选择",size:"mini"},on:{change:function(e){return t.init()}},model:{value:t.limit,callback:function(e){t.limit=e},expression:"limit"}},t._l(t.options,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1),t._v(" "),a("el-select",{staticStyle:{width:"120px"},attrs:{size:"mini",clearable:"",placeholder:"请选择区域"},on:{change:function(e){return t.init()}},model:{value:t.areaId,callback:function(e){t.areaId=e},expression:"areaId"}},t._l(t.areaS,function(t){return a("el-option",{key:t.Value,attrs:{label:t.Value,value:t.Id}})}),1),t._v(" "),a("el-button",{attrs:{type:"primary",size:"mini",loading:this.$store.state.Vuex.loading},on:{click:function(e){return t.init()}}},[t._v("检索")]),t._v(" "),a("el-button",{staticStyle:{float:"right"},attrs:{type:"info",size:"mini",loading:this.$store.state.Vuex.loading},on:{click:function(e){return t.Excel()}}},[t._v("导出")])],1),t._v(" "),a("div",{staticClass:"content",staticStyle:{padding:"0px 25px","box-sizing":"border-box"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.Data,"max-height":this.$store.state.TableOptimumHeight,size:"mini","highlight-current-row":"",border:"","header-cell-style":{background:"#e1e1e1"}}},[a("el-table-column",{attrs:{prop:"Date",label:"统计日期",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"EngineerName",label:"工程师"}}),t._v(" "),a("el-table-column",{attrs:{prop:"Count",label:"打卡次数",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"FirstTime",label:"最初记录时间"}}),t._v(" "),a("el-table-column",{attrs:{prop:"LastTime",label:"最后记录时间"}})],1)],1),t._v(" "),a("div",{staticClass:"content",staticStyle:{padding:"0px 25px","box-sizing":"border-box",display:"none"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.Data,id:"out-table","max-height":this.$store.state.TableOptimumHeight,size:"mini","highlight-current-row":"",border:"","header-cell-style":{background:"#e1e1e1"}}},[a("el-table-column",{attrs:{prop:"Date",label:"统计日期",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"EngineerName",label:"工程师"}}),t._v(" "),a("el-table-column",{attrs:{prop:"Count",label:"打卡次数",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"FirstTime",label:"最初记录时间"}}),t._v(" "),a("el-table-column",{attrs:{prop:"LastTime",label:"最后记录时间"}})],1)],1)])},staticRenderFns:[]};var c=a("VU/8")(r,s,!1,function(t){a("HcQ4")},null,null);e.default=c.exports}});