webpackJsonp([35],{"/iMK":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l={data:function(){return{search:"",cusFullName:"",state:-1,pageNum:1,pagesize:10,Data:[],total:0,options:[{label:"全部",value:-1,index:1},{label:"培训室",value:"2",index:2},{label:"客服部",value:"1",index:3}],StateS:[{label:"全部",value:-1},{label:"申请中",value:"1"},{label:"已同意",value:"2"},{label:"已拒绝",value:"3"},{label:"已指派拆机",value:"4"},{label:"已拆机",value:"5"},{label:"已收货",value:"6"},{label:"已指派安装",value:"7"},{label:"已完成",value:"8"},{label:"已结单",value:"10"},{label:"已撤单",value:"9"}]}},computed:{},watch:{},methods:{init:function(e){var t=this;void 0==e&&null==e||(this.pageNum=1);var a={api:"get",url:this.$store.state.http+"StorageRoom/GetStandbyApprovals",data:{pageNum:this.pageNum,numPerPage:this.pagesize,orderField:"",orderDirection:"",proSearch:this.search,cusFullName:this.cusFullName,state:this.state}};this.$https(a).then(function(e){t.Data=e.Data.Dtos,console.log(t.Data),t.total=e.Data.DataBars;for(var a=0;a<t.Data.length;a++){var l=t.Data[a];l.CreateDate=l.CreateDate.split("T")[0],l.Belong=1==l.Belong?"客服部":2==l.Belong?"培训室":"未知"}})},handleCurrentChange:function(e){this.pageNum=e,this.init()},handleSizeChange:function(e){this.pagesize=e,this.init(1)},ApplicationForLoan:function(e){this.$store.state.Vuex.AddSparePartsID=e.Id,this.$router.push({path:"ApplicatioPpartsMsg"})}},created:function(){this.init()},mounted:function(){},beforeCreate:function(){},beforeMount:function(){},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},activated:function(){}},i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"box"},[a("router-view",{on:{refresh:e.init}}),e._v(" "),a("div",{staticClass:"TopSerch",staticStyle:{padding:"5px"}},[a("el-input",{staticStyle:{width:"193px"},attrs:{size:"mini",placeholder:"产品编码、产品描述",clearable:""},on:{change:function(t){return e.init(1)}},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}),e._v(" "),a("el-input",{staticStyle:{width:"193px"},attrs:{size:"mini",placeholder:"客户名称",clearable:""},on:{change:function(t){return e.init(1)}},model:{value:e.cusFullName,callback:function(t){e.cusFullName=t},expression:"cusFullName"}}),e._v(" "),a("el-select",{staticStyle:{width:"120px"},attrs:{size:"mini",placeholder:"请选择状态"},on:{change:function(t){return e.init(1)}},model:{value:e.state,callback:function(t){e.state=t},expression:"state"}},e._l(e.StateS,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),a("el-button",{attrs:{type:"primary",loading:this.$store.state.Vuex.loading,size:"mini"},on:{click:function(t){return e.init()}}},[e._v("检索")])],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.Data,size:"mini",height:this.$store.state.TableOptimumHeight,"highlight-current-row":"",border:"","header-cell-style":{background:"#e1e1e1"}}},[a("el-table-column",{attrs:{prop:"CreateDate",label:"创建日期",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"ProductCode",label:"产品编号",width:"180"}}),e._v(" "),a("el-table-column",{attrs:{prop:"ProductDesc",label:"产品描述","show-overflow-tooltip":!0}}),e._v(" "),a("el-table-column",{attrs:{prop:"Brand",label:"品牌",width:"180"}}),e._v(" "),a("el-table-column",{attrs:{prop:"StateStr",label:"当前状态",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"Memo",label:"备注",width:"200","show-overflow-tooltip":!0}}),e._v(" "),a("el-table-column",{attrs:{prop:"CusFullName",label:"正在使用的客户",width:"200","show-overflow-tooltip":!0}}),e._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){return e.ApplicationForLoan(t.row)}}},[e._v("编辑")])]}}])})],1),e._v(" "),a("nav",{staticStyle:{"text-align":"center"}},[a("el-pagination",{attrs:{"current-page":1,"page-sizes":this.$store.state.Vuex.pageSNumber,"page-size":100,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var n=a("VU/8")(l,i,!1,function(e){a("V/jw")},"data-v-91b87dc0",null);t.default=n.exports},"V/jw":function(e,t){}});