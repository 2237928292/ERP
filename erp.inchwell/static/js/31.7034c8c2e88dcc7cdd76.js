webpackJsonp([31],{"4fR4":function(e,t){},qGWh:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("bOdI"),l=a.n(r),i={name:"",data:function(){return{options:[{Name:"全部",ID:0,value:-1},{Name:"现场维修",ID:0,value:0},{Name:"小件维修",ID:0,value:1},{Name:"MUL&DBL维修",ID:0,value:4}],StateStr:-1,StateSTR:[{label:"全部",Value:-1},{label:"申请中",Value:1},{label:"已受理",Value:2},{label:"在保状态确认",Value:3},{label:"已预报价",Value:4},{label:"预报价已确认",Value:5},{label:"已指派",Value:6},{label:"已接受任务",Value:7},{label:"已出发",Value:8},{label:"已到达",Value:9},{label:"工作已完成",Value:10},{label:"已报最终价",Value:11},{label:"已结单",Value:12},{label:"已撤单",Value:13},{label:"其它",Value:14}],pageNum:1,pagesize:10,search:"",workOrderCode:"",Area:"",Brand:"",orderType:-1,total:0,data:[],Optios:[]}},created:function(){this.initdata(),this.Manufacturer()},components:{},methods:{querySearch:function(e,t){if(void 0==e)return e="",t(this.Optios),!1;if(""==e)return t(this.Optios),!1;for(var a=e,r=this.Optios,l=[],i=(a.split("")[0],0);i<r.length;i++){var n=r[i];-1!=n.value.indexOf(a)&&l.push(n)}t(l)},Manufacturer:function(){var e=this,t={url:this.$store.state.http+"System/GetBrand",api:"get"};this.$https(t).then(function(t){e.Optios=t.Data;for(var a=0;a<e.Optios.length;a++)e.Optios[a].value=e.Optios[a].Value;console.log(e.Optios)})},initdata:function(e){var t,a=this;1==e&&(this.pageNum=1);var r={url:this.$store.state.http+"WO/GetWOs",api:"get",data:(t={state:-1,search:this.search,workOrderCode:this.workOrderCode,orderType:this.orderType,Area:this.Area,Brand:this.Brand},l()(t,"state",this.StateStr),l()(t,"pageNum",this.pageNum),l()(t,"numPerPage",this.pagesize),l()(t,"orderField",""),l()(t,"orderDirection",""),t)};this.$https(r).then(function(e){console.log(e.Data.Dtos),a.total=e.Data.DataBars,a.data=e.Data.Dtos;for(var t=0;t<a.data.length;t++){var r=a.data[t];r.RepairDate=r.RepairDate.split("T")[0],r.AcceptanceDate&&(r.AcceptanceDate=r.AcceptanceDate.split("T")[0]),r.FinishedWorkDate&&(r.FinishedWorkDate=r.FinishedWorkDate.split("T")[0])}})},handleCurrentChange:function(e){this.pageNum=e,this.initdata()},handleSizeChange:function(e){this.pagesize=e,this.initdata()},Edit:function(e){console.log(e),this.$store.state.Vuex.Id=e.WorkOrderId,"现场维修"==e.OrderTypeStr&&this.$router.push({path:"/OnSiteMaintenance"}),"小件维修"==e.OrderTypeStr&&this.$router.push({path:"/MinorMaintenance"}),"MUL&DEU维修"==e.OrderTypeStr&&this.$router.push({path:"/DBLMaintenance"})}}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"box"},[a("router-view",{on:{refresh:function(t){return e.initdata(1)}}}),e._v(" "),a("div",{staticClass:"TopSerch"},[a("el-input",{staticStyle:{width:"193px"},attrs:{size:"mini",placeholder:"请输入客户名称、设备描述"},on:{change:function(t){return e.initdata(1)}},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}),e._v(" "),a("el-input",{staticStyle:{width:"193px"},attrs:{size:"mini",placeholder:"请输入工单单号"},on:{change:function(t){return e.initdata(1)}},model:{value:e.workOrderCode,callback:function(t){e.workOrderCode=t},expression:"workOrderCode"}}),e._v(" "),a("el-select",{staticStyle:{width:"140px"},attrs:{clearable:"",size:"mini",placeholder:"请选择区域"},on:{change:function(t){return e.initdata(1)}},model:{value:e.Area,callback:function(t){e.Area=t},expression:"Area"}},e._l(this.$store.state.Vuex.Area,function(e){return a("el-option",{key:e.Value,attrs:{label:e.Value,value:e.Value}})}),1),e._v(" "),a("el-select",{staticStyle:{width:"140px"},attrs:{size:"mini",placeholder:"请选择状态"},on:{change:function(t){return e.initdata(1)}},model:{value:e.StateStr,callback:function(t){e.StateStr=t},expression:"StateStr"}},e._l(e.StateSTR,function(e){return a("el-option",{key:e.Value,attrs:{label:e.label,value:e.Value}})}),1),e._v(" "),a("el-select",{staticStyle:{width:"140px"},attrs:{size:"mini",placeholder:"请选择类型"},on:{change:function(t){return e.initdata(1)}},model:{value:e.orderType,callback:function(t){e.orderType=t},expression:"orderType"}},e._l(e.options,function(e){return a("el-option",{key:e.Value,attrs:{label:e.Name,value:e.value}})}),1),e._v(" "),a("el-autocomplete",{staticClass:"inline-input",staticStyle:{width:"200px"},attrs:{size:"mini","show-overflow-tooltip":!0,"fetch-suggestions":e.querySearch,placeholder:"请选择品牌",clearable:""},on:{input:function(t){return e.initdata(1)}},model:{value:e.Brand,callback:function(t){e.Brand=t},expression:"Brand"}}),e._v(" "),a("el-button",{staticStyle:{float:"right",margin:"0 30px"},attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.initdata(1)}}},[e._v("检索")])],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.data,height:this.$store.state.TableOptimumHeight,size:"mini","highlight-current-row":"",border:"","header-cell-style":{background:"#e1e1e1"}}},[a("el-table-column",{attrs:{prop:"WorkOrderCode",label:"工单单号",width:"140"}}),e._v(" "),a("el-table-column",{attrs:{prop:"CustomerName",label:"客户名称","show-overflow-tooltip":!0}}),e._v(" "),a("el-table-column",{attrs:{prop:"Area",label:"区域",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"Brand",label:"品牌",width:"200"}}),e._v(" "),a("el-table-column",{attrs:{prop:"RepairName",label:"报修人",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"RepairDate",label:"报修日期",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"AcceptanceDate",label:"受理日期",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"FinishedWorkDate",label:"完成日期",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"OrderTypeStr",label:"工单类型",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{prop:"StatusStr",label:"工单状态",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return e.Edit(t.row)}}},[e._v("处理")])]}}])})],1),e._v(" "),a("nav",{staticStyle:{"text-align":"center"}},[a("el-pagination",{attrs:{"current-page":1,"page-sizes":this.$store.state.Vuex.pageSNumber,"page-size":100,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var o=a("VU/8")(i,n,!1,function(e){a("4fR4")},"data-v-a3159aae",null);t.default=o.exports}});