webpackJsonp([72],{"07mm":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={name:"",data:function(){return{pageNum:1,pagesize:10,search:"",enginner:"",area:"",state:"",areaS:[],CustomerType:"",options:[{label:"临时创建",value:"0",index:2},{label:"已编辑",value:1,index:3},{label:"已报价",value:2,index:4},{label:"已确认",value:3,index:5},{label:"已付款",value:8,index:10},{label:"已发货",value:4,index:6},{label:"已收货",value:5,index:7},{label:"已结单",value:6,index:8},{label:"已撤单",value:7,index:9}],total:0,Data:[],optionss:[],loading:!1,value:"",dialogFormVisible:!1,SOId:"",ddd:0}},created:function(){this.init(),this.initGetArea()},components:{},methods:{focuss:function(){console.log(this.ddd),0==this.ddd&&(this.remoteMethod(),this.ddd=1)},blurs:function(){this.ddd=0},remoteMethod:function(e){var t=this;console.log(e),""==e&&(e="x"),this.loading=!0;var i={api:"get",url:this.$store.state.http+"System/GetEmployeeMini",data:{type:"2",search:e}};this.$https(i).then(function(e){console.log(e),t.optionss=e.Data;for(var i=0;i<t.optionss.length;i++){var a=t.optionss[i];a.names=a.Name+" - "+a.UserName}t.loading=!1})},handleClose:function(e){var t=this;this.$confirm("确认关闭？").then(function(i){e(),t.value=""}).catch(function(e){})},dialogFormVisibleTrueQK:function(){var e=this,t={api:"post",url:this.$store.state.http+"SO/SelectEnginnerToSo",data:{SOId:this.SOId,SubEnginnerGroup:""}};this.$https(t).then(function(t){e.dialogFormVisible=!1,e.value="",e.init()})},dialogFormVisibleTrue:function(){var e=this;if(console.log(this.value),0==this.value.length)return this.$look("warning","未选择隶属工程师！"),!1;for(var t="",i=0;i<this.value.length;i++)console.log(this.value[i]),""==t?t=this.value[i]:t+=","+this.value[i];console.log(t);var a={api:"post",url:this.$store.state.http+"SO/SelectEnginnerToSo",data:{SOId:this.SOId,SubEnginnerGroup:t}};this.$https(a).then(function(t){e.dialogFormVisible=!1,e.value="",e.init()})},dialogFormVisibles:function(){this.dialogFormVisible=!1,this.value=""},userGCS:function(e){console.log(e.SOId),this.SOId=e.SOId,this.dialogFormVisible=!0},routes:function(e){console.log(e),this.$store.state.Vuex.SOId=e.SOId,this.$router.push({path:"/EditOrder"})},init:function(e){var t=this;1==e&&(this.pageNum=1);var i=this.state;i=""==i?-1:i;var a={api:"get",url:this.$store.state.http+"SO/GetSOForPCs",data:{pageNum:this.pageNum,numPerPage:this.pagesize,orderField:"",orderDirection:"",search:this.search,enginner:this.enginner,area:this.area,state:i,cusType:this.CustomerType}};this.$https(a).then(function(e){console.log(e),t.total=e.Data.DataBars,t.Data=e.Data.Dtos,t.Data.forEach(function(e){e.CreateDateStr=e.CreateDateStr.split(" ")[0]})})},initGetArea:function(){var e=this,t={url:this.$store.state.http+"System/GetArea",api:"get"};this.$https(t).then(function(t){e.areaS=t.Data})},handleCurrentChange:function(e){this.pageNum=e,this.init()},handleSizeChange:function(e){this.pagesize=e,this.init(1)},AddOrder:function(){this.$router.push({path:"/AddOrder"})}}},n={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"box"},[i("router-view",{on:{refresh:e.init}}),e._v(" "),i("div",{staticClass:"TopSerch",staticStyle:{padding:"5px"}},[i("el-input",{staticStyle:{width:"193px"},attrs:{size:"mini",placeholder:"请输入客户、单号、报价单号"},on:{change:function(t){return e.init(1)}},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}),e._v(" "),i("el-input",{staticStyle:{width:"193px"},attrs:{size:"mini",placeholder:"请输入工程师"},on:{change:function(t){return e.init(1)}},model:{value:e.enginner,callback:function(t){e.enginner=t},expression:"enginner"}}),e._v(" "),i("el-select",{staticStyle:{width:"150px"},attrs:{size:"mini",placeholder:"请选择状态",clearable:""},on:{change:function(t){return e.init(1)}},model:{value:e.state,callback:function(t){e.state=t},expression:"state"}},e._l(e.options,function(e){return i("el-option",{key:e.index,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),i("el-select",{staticStyle:{width:"120px"},attrs:{size:"mini",clearable:"",placeholder:"请选择区域"},on:{change:function(t){return e.init(1)}},model:{value:e.area,callback:function(t){e.area=t},expression:"area"}},e._l(e.areaS,function(e){return i("el-option",{key:e.Value,attrs:{label:e.Value,value:e.Value}})}),1),e._v(" "),i("el-select",{staticStyle:{width:"140px"},attrs:{size:"mini",clearable:"",placeholder:"请选择客户类型"},on:{change:function(t){return e.init(1)}},model:{value:e.CustomerType,callback:function(t){e.CustomerType=t},expression:"CustomerType"}},e._l(this.$store.state.Vuex.CustomerTypes,function(e){return i("el-option",{key:e+"2",attrs:{label:e,value:e}})}),1),e._v(" "),i("el-button",{attrs:{type:"primary",loading:this.$store.state.Vuex.loading,size:"mini"},on:{click:function(t){return e.init(1)}}},[e._v("检索")]),e._v(" "),i("el-button",{staticStyle:{float:"right"},attrs:{type:"success",size:"mini"},on:{click:function(t){return e.AddOrder()}}},[e._v("创建")])],1),e._v(" "),i("el-table",{staticStyle:{width:"100%"},attrs:{data:e.Data,size:"mini",height:this.$store.state.TableOptimumHeight,"highlight-current-row":"",border:"","header-cell-style":{background:"#e1e1e1"}}},[i("el-table-column",{attrs:{prop:"CusName",label:"客户名","show-overflow-tooltip":!0}}),e._v(" "),i("el-table-column",{attrs:{prop:"Amount",label:"总金额",width:"90"}}),e._v(" "),i("el-table-column",{attrs:{prop:"DiscountAmount",label:"优惠价格",width:"90"}}),e._v(" "),i("el-table-column",{attrs:{prop:"LogisticCharge",label:"物流费",width:"70"}}),e._v(" "),i("el-table-column",{attrs:{prop:"StateStr",label:"状态",width:"90"}}),e._v(" "),i("el-table-column",{attrs:{prop:"PayStatusStr",label:"付款",width:"90"}}),e._v(" "),i("el-table-column",{attrs:{prop:"CreateDateStr",label:"创建日期",width:"90"}}),e._v(" "),i("el-table-column",{attrs:{prop:"Area",label:"区域",width:"100"}}),e._v(" "),i("el-table-column",{attrs:{prop:"SOCode",label:"订单编号",width:"200"}}),e._v(" "),i("el-table-column",{attrs:{prop:"BelongEnginners",label:"隶属工程师","show-overflow-tooltip":!0,width:"100"}}),e._v(" "),i("el-table-column",{attrs:{fixed:"right",label:"操作",width:"130"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{size:"mini",type:"primary",icon:"el-icon-edit"},on:{click:function(i){return e.routes(t.row)}}}),e._v(" "),i("el-button",{attrs:{size:"mini",type:"primary",icon:"el-icon-user"},on:{click:function(i){return e.userGCS(t.row)}}})]}}])})],1),e._v(" "),i("nav",{staticStyle:{"text-align":"center"}},[i("el-pagination",{attrs:{"current-page":1,"page-sizes":this.$store.state.Vuex.pageSNumber,"page-size":100,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),i("el-dialog",{attrs:{title:"修改隶属工程师",visible:e.dialogFormVisible,"before-close":e.handleClose},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[i("el-select",{staticStyle:{width:"80%"},attrs:{filterable:"",remote:"","reserve-keyword":"",placeholder:"请输入关键词",loading:e.loading,size:"mini",multiple:"","automatic-dropdown":!0},on:{focus:e.focuss,blur:e.blurs},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},e._l(e.optionss,function(e){return i("el-option",{key:e.UserName,attrs:{label:e.names,value:e.UserName}})}),1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{size:"mini",type:"danger"},on:{click:e.dialogFormVisibleTrueQK}},[e._v("清空工程师")]),e._v(" "),i("el-button",{attrs:{size:"mini"},on:{click:e.dialogFormVisibles}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.dialogFormVisibleTrue}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var l=i("VU/8")(a,n,!1,function(e){i("6o0C")},"data-v-49ee1210",null);t.default=l.exports},"6o0C":function(e,t){}});