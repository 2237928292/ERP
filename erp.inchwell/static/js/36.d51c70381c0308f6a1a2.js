webpackJsonp([36],{Y3IS:function(e,t){},biX6:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("t4zo"),i=a.n(l),r=a("uXZL"),o=a.n(r),n={name:"",data:function(){return{pageNum:1,pagesize:10,total:0,search:"",state:"-1",creater:"",area:"",cusType:"",PDstate:"",DtoTwo:[{label:"全部",value:"-1"},{label:"已创建",value:"1"},{label:"正在完善",value:"2"},{label:"完成",value:"3"}],PDstates:[{label:"高",value:"高"},{label:"中",value:"中"},{label:"低",value:"低"},{label:"完成",value:"完成"}],DtoThree:[],Data:[],DataBig:[]}},created:function(){this.DtoThrees(),this.init()},components:{},methods:{init:function(e){var t=this;console.log(e),void 0==e&&(this.pageNum=1);var a={api:"get",url:this.$store.state.http+"CRM/GetCusVisits",data:{pageNum:this.pageNum,numPerPage:this.pagesize,orderField:"",orderDirection:"",search:this.search,creater:this.creater,state:this.state,area:this.area,all:1,cusType:this.cusType,priority:this.PDstate}};this.$https(a).then(function(e){console.log(e),t.Data=e.Data.Dtos;for(var a=0;a<t.Data.length;a++){var l=t.Data[a];l.BeginTime?l.BeginTime=l.BeginTime.split("T")[0]:l.BeginTime=" - - ",l.EndTime?l.EndTime=l.EndTime.split("T")[0]:l.EndTime=" - - "}t.total=e.Data.DataBars})},DtoThrees:function(){var e=this,t={api:"get",url:this.$store.state.http+"System/GetArea"};this.$https(t).then(function(t){console.log(t.Data),e.DtoThree=t.Data})},handleSizeChange:function(e){this.pagesize=e,this.init(e)},handleCurrentChange:function(e){console.log(e),this.pageNum=e,this.init(e)},msglook:function(e){console.log(e),this.$store.state.indexIdGetCusVisitsLook=e.Id,this.$router.push({path:"/GetCusVisitsLook"})},exportExcelData:function(){var e=this,t={api:"get",url:this.$store.state.http+"CRM/GetCusVisits",data:{pageNum:1,numPerPage:999999,orderField:"",orderDirection:"",search:this.search,creater:this.creater,state:this.state,area:this.area,all:1}};this.$https(t).then(function(t){console.log(t),e.DataBig=t.Data.Dtos;for(var a=0;a<e.DataBig.length;a++){var l=e.DataBig[a];l.BeginTime?l.BeginTime=l.BeginTime.split("T")[0]:l.BeginTime=" - - ",l.EndTime?l.EndTime=l.EndTime.split("T")[0]:l.EndTime=" - - "}var i=e;console.log(e.DataBig),setTimeout(function(){i.exportExcel()},500)})},exportExcel:function(){var e=o.a.utils.table_to_book(document.querySelector("#out-table"),{raw:!0});console.log(e);var t=o.a.write(e,{bookType:"xlsx",bookSST:!0,type:"array"});try{i.a.saveAs(new Blob([t],{type:"application/octet-stream"}),"客户拜访.xlsx")}catch(e){"undefined"!=typeof console&&console.log(e,t)}return t}}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"box"},[a("router-view"),e._v(" "),a("div",{staticClass:"TopSerch"},[a("el-input",{staticStyle:{width:"180px"},attrs:{size:"mini",placeholder:"请输入检索项"},on:{change:function(t){return e.init()}},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}),e._v(" "),a("el-input",{staticStyle:{width:"180px"},attrs:{size:"mini",placeholder:"请输入发起人"},on:{change:function(t){return e.init()}},model:{value:e.creater,callback:function(t){e.creater=t},expression:"creater"}}),e._v(" "),a("el-select",{attrs:{size:"mini",filterable:"",placeholder:"请选择状态"},on:{change:function(t){return e.init()}},model:{value:e.state,callback:function(t){e.state=t},expression:"state"}},e._l(e.DtoTwo,function(e){return a("el-option",{key:e.Id,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),a("el-select",{attrs:{clearable:"",size:"mini",filterable:"",placeholder:"请选择区域"},on:{change:function(t){return e.init()}},model:{value:e.area,callback:function(t){e.area=t},expression:"area"}},e._l(e.DtoThree,function(e){return a("el-option",{key:e.Value,attrs:{label:e.Value,value:e.Value}})}),1),e._v(" "),a("el-select",{attrs:{clearable:"",size:"mini",filterable:"",placeholder:"请选择优先级"},on:{change:function(t){return e.init()}},model:{value:e.PDstate,callback:function(t){e.PDstate=t},expression:"PDstate"}},e._l(e.PDstates,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),a("el-select",{attrs:{clearable:"",size:"mini",filterable:"",placeholder:"请选择客户类型"},on:{change:function(t){return e.init()}},model:{value:e.cusType,callback:function(t){e.cusType=t},expression:"cusType"}},e._l(this.$store.state.Vuex.CustomerTypes,function(e){return a("el-option",{key:e,attrs:{label:e,value:e}})}),1),e._v(" "),a("el-button",{staticStyle:{float:"right"},attrs:{type:"success",size:"mini",loading:this.$store.state.Vuex.loading},on:{click:function(t){return e.init()}}},[e._v("检索")]),e._v(" "),a("el-button",{staticStyle:{float:"right",marginRight:"10px"},attrs:{type:"info",size:"mini"},on:{click:e.exportExcelData}},[e._v("导出Excel")])],1),e._v(" "),a("div",{staticClass:"table"},[a("el-table",{staticStyle:{width:"100%"},attrs:{size:"mini",data:e.Data,"highlight-current-row":"",height:this.$store.state.TableOptimumHeight,border:"","header-cell-style":{background:"#e1e1e1"}}},[a("el-table-column",{attrs:{fixed:"",prop:"CusFullName","show-overflow-tooltip":!0,label:"客户名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"VisiterName",width:"100",label:"发起人"}}),e._v(" "),a("el-table-column",{attrs:{prop:"BeginTime",width:"100",label:"开始时间"}}),e._v(" "),a("el-table-column",{attrs:{prop:"EndTime",width:"100",label:"结束时间"}}),e._v(" "),a("el-table-column",{attrs:{prop:"Area",width:"100",label:"区域"}}),e._v(" "),a("el-table-column",{attrs:{prop:"StateStr",width:"100",label:"当前状态"}}),e._v(" "),a("el-table-column",{attrs:{prop:"Priority",width:"100",label:"优先级"}}),e._v(" "),a("el-table-column",{attrs:{fixed:"right",width:"100",label:"Enable"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return e.msglook(t.row)}}},[e._v("查看")])]}}])})],1)],1),e._v(" "),a("div",{staticClass:"table",staticStyle:{display:"none"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{size:"mini",data:e.DataBig,"highlight-current-row":"",height:this.$store.state.TableOptimumHeight,border:"",id:"out-table","header-cell-style":{background:"#e1e1e1"}}},[a("el-table-column",{attrs:{prop:"CusFullName","show-overflow-tooltip":!0,label:"客户名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"VisiterName",width:"100",label:"发起人"}}),e._v(" "),a("el-table-column",{attrs:{prop:"BeginTime",width:"100",label:"开始时间"}}),e._v(" "),a("el-table-column",{attrs:{prop:"EndTime",width:"100",label:"结束时间"}}),e._v(" "),a("el-table-column",{attrs:{prop:"Area",width:"100",label:"区域"}}),e._v(" "),a("el-table-column",{attrs:{prop:"StateStr",width:"100",label:"当前状态"}}),e._v(" "),a("el-table-column",{attrs:{prop:"Priority",width:"100",label:"优先级"}}),e._v(" "),a("el-table-column",{attrs:{prop:"OutputValue",width:"100",label:"售后产值"}}),e._v(" "),a("el-table-column",{attrs:{prop:"AffiliatedGroup",width:"100",label:"隶属集团"}}),e._v(" "),a("el-table-column",{attrs:{prop:"BuildYear",width:"100",label:"建店年份"}}),e._v(" "),a("el-table-column",{attrs:{prop:"EquOverview",width:"100",label:"设备概述"}}),e._v(" "),a("el-table-column",{attrs:{prop:"ApprovalProcess",width:"100",label:"审批流程"}}),e._v(" "),a("el-table-column",{attrs:{prop:"FinancialBudget",width:"100",label:"财务预算"}}),e._v(" "),a("el-table-column",{attrs:{prop:"OtherInfo",width:"100",label:"其它信息"}})],1)],1),e._v(" "),a("nav",{staticStyle:{"text-align":"center"}},[a("el-pagination",{attrs:{"current-page":1,"page-sizes":this.$store.state.Vuex.pageSNumber,"page-size":100,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var c=a("VU/8")(n,s,!1,function(e){a("Y3IS")},"data-v-7f7dfe56",null);t.default=c.exports}});