webpackJsonp([39],{"5zRU":function(t,e){},Z1CL:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("mtWM"),o=i.n(a),s={name:"GetApis",data:function(){return{tableData:[],ttanchh:"",dialogTableVisible:!1,loading:!1,total:0,pagesize:10,dialogFormVisible:!1,formLabelWidth:"120px",isClear:!1,detail:"",token:localStorage.getItem("token"),AdminEditViewModel:!0,Change:"新增接口",idAUTHORIZATIONACCOUNTID:"0000",pagec:1,form:{ActionName:"",Controller:"",Action:"",Parameters:"",RequestType:"",Memo:""},jiss:{input0:"",input1:"",input2:""}}},created:function(){this.$$$http()},methods:{handleClickOut:function(t){this.Change="编辑接口",this.AdminEditViewModel=!1,this.idAUTHORIZATIONACCOUNTID=t.Id,this.form.ActionName=t.ActionName,this.form.Controller=t.Controller,this.form.Action=t.Action,this.form.Parameters=t.Parameters,this.form.RequestType=t.RequestType,this.form.Memo=t.Memo,this.dialogFormVisible=!0},dialogFormVisibleon:function(){this.Change="新增接口",this.dialogFormVisible=!0,this.dele(),this.AdminEditViewModel=!0},jkjs:function(){this.loading=!0,this.$$$http()},handleCurrentChange:function(t){this.pagec=t,this.$$$http()},handleSizeChange:function(t){this.pagesize=t,this.$$$http()},dialogFormVisiblefalse:function(){this.dialogFormVisible=!1},dele:function(){this.form.ActionName="",this.form.Controller="",this.form.Action="",this.form.Parameters="",this.form.RequestType="",this.form.Memo=""},dialogFormdata:function(){var t=this;this.AdminEditViewModel?this.form.ActionName&&this.form.Controller&&this.form.Action&&this.form.Parameters&&this.form.RequestType?(o.a.post(this.$store.state.http+"System/AddApi",{ActionName:this.form.ActionName,Controller:this.form.Controller,Action:this.form.Action,Parameters:this.form.Parameters,RequestType:this.form.RequestType,Memo:this.form.Memo},{headers:{token:this.token}}).then(function(e){console.log(JSON.parse(e.data).Msg),"2：已存在此接口"==JSON.parse(e.data).Msg?t.$message({message:"已存在此接口",type:"warning"}):t.$$$http()}),this.dialogFormVisiblefalse()):alert("请输入完整"):o.a.post(this.$store.state.http+"System/UpdateApi",{ActionName:this.form.ActionName,Controller:this.form.Controller,Action:this.form.Action,Parameters:this.form.Parameters,RequestType:this.form.RequestType,Memo:this.form.Memo,Id:this.idAUTHORIZATIONACCOUNTID},{headers:{token:this.token}}).then(function(e){t.dialogFormVisiblefalse(),t.$$$http()})},handleClickdel:function(t){var e=this;this.idAUTHORIZATIONACCOUNTID=t.Id,this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){o.a.post(e.$store.state.http+"System/DelApi",{Id:e.idAUTHORIZATIONACCOUNTID},{headers:{token:e.token}}).then(function(t){e.$$$http()}),e.$message({type:"success",message:"删除成功!"})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},$$$http:function(){var t=this;o.a.get("http://39.101.201.199:6006/api/System/GetApis",{params:{ActionName:this.jiss.input0,controllername:this.jiss.input1,action:this.jiss.input2,pageNum:this.pagec,numPerPage:this.pagesize,orderField:"",orderDirection:""},headers:{Token:this.token}}).then(function(e){t.tableData=JSON.parse(e.data).Data.Apis;for(var i=0;i<t.tableData.length;i++)t.tableData[i].CreateTime=t.tableData[i].CreateTime.split("T")[0];t.total=JSON.parse(e.data).Data.DataBars,t.loading=!1})}}},l={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"Get-box",attrs:{id:"uc-ap"}},[i("div",{staticClass:"TopSerch",staticStyle:{width:"90%",height:"120px"}},[i("div",{staticClass:"jains"},[i("el-input",{staticClass:"jiss",attrs:{size:"mini",placeholder:"ActionName",clearable:""},on:{change:t.jkjs},model:{value:t.jiss.input0,callback:function(e){t.$set(t.jiss,"input0",e)},expression:"jiss.input0"}})],1),t._v(" "),i("div",{staticClass:"jains"},[i("el-input",{staticClass:"jiss",attrs:{size:"mini",placeholder:"Controller",clearable:""},on:{change:t.jkjs},model:{value:t.jiss.input1,callback:function(e){t.$set(t.jiss,"input1",e)},expression:"jiss.input1"}})],1),t._v(" "),i("div",{staticClass:"jains"},[i("el-input",{staticClass:"jiss",attrs:{size:"mini",placeholder:"Action",clearable:""},on:{change:t.jkjs},model:{value:t.jiss.input2,callback:function(e){t.$set(t.jiss,"input2",e)},expression:"jiss.input2"}})],1),t._v(" "),i("el-button",{staticClass:"jss",attrs:{type:"primary",icon:"el-icon-search",size:"mini",loading:t.loading},on:{click:t.jkjs}},[t._v("搜索")]),t._v(" "),i("el-button",{staticClass:"xinz",attrs:{type:"success",size:"mini"},on:{click:t.dialogFormVisibleon}},[t._v("新增按钮")])],1),t._v(" "),i("el-dialog",{attrs:{title:this.Change,visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[i("el-form",{attrs:{model:t.form}},[i("el-form-item",{attrs:{label:"方法名称","label-width":t.formLabelWidth}},[i("el-input",{attrs:{size:"mini",autocomplete:"off"},model:{value:t.form.ActionName,callback:function(e){t.$set(t.form,"ActionName",e)},expression:"form.ActionName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"控制器","label-width":t.formLabelWidth}},[i("el-input",{attrs:{size:"mini",autocomplete:"off"},model:{value:t.form.Controller,callback:function(e){t.$set(t.form,"Controller",e)},expression:"form.Controller"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"方法","label-width":t.formLabelWidth}},[i("el-input",{attrs:{size:"mini",autocomplete:"off"},model:{value:t.form.Action,callback:function(e){t.$set(t.form,"Action",e)},expression:"form.Action"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"参数","label-width":t.formLabelWidth}},[i("el-input",{attrs:{size:"mini",type:"textarea",rows:6,autocomplete:"off"},model:{value:t.form.Parameters,callback:function(e){t.$set(t.form,"Parameters",e)},expression:"form.Parameters"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"请求类型","label-width":t.formLabelWidth}},[i("el-select",{attrs:{placeholder:"请选择请求类型"},model:{value:t.form.RequestType,callback:function(e){t.$set(t.form,"RequestType",e)},expression:"form.RequestType"}},[i("el-option",{attrs:{label:"GET",value:"get"}}),t._v(" "),i("el-option",{attrs:{label:"POST",value:"post"}})],1)],1),t._v(" "),i("el-form-item",{attrs:{label:"备注","label-width":t.formLabelWidth}},[i("el-input",{attrs:{size:"mini",type:"textarea",autocomplete:"off",rows:2},model:{value:t.form.Memo,callback:function(e){t.$set(t.form,"Memo",e)},expression:"form.Memo"}})],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:t.dialogFormVisiblefalse}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.dialogFormdata}},[t._v("确 定")])],1)],1),t._v(" "),i("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,size:"mini","highlight-current-row":"",border:"","header-cell-style":{background:"#e1e1e1"}}},[i("el-table-column",{attrs:{fixed:"",prop:"ActionName",label:"ActionName"}}),t._v(" "),i("el-table-column",{attrs:{prop:"Controller",label:"Controller"}}),t._v(" "),i("el-table-column",{attrs:{prop:"Action",label:"Action"}}),t._v(" "),i("el-table-column",{attrs:{prop:"RequestType",label:"RequestType"}}),t._v(" "),i("el-table-column",{attrs:{prop:"CreateTime",label:"CreateTime"}}),t._v(" "),i("el-table-column",{attrs:{fixed:"right",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button-group",[i("el-button",{staticStyle:{borderColor:"#fff"},attrs:{type:"primary",icon:"el-icon-edit",size:"mini"},on:{click:function(i){return t.handleClickOut(e.row)}}}),t._v(" "),i("el-button",{staticStyle:{background:"#f44336c4",borderColor:"#fff"},attrs:{type:"primary",icon:"el-icon-delete",size:"mini"},on:{click:function(i){return t.handleClickdel(e.row)}}})],1)]}}])})],1),t._v(" "),i("el-dialog",{attrs:{visible:t.dialogTableVisible},on:{"update:visible":function(e){t.dialogTableVisible=e}}},[i("div",{domProps:{innerHTML:t._s(t.ttanchh)}})]),t._v(" "),i("nav",{staticStyle:{"text-align":"center"}},[i("el-pagination",{attrs:{"current-page":1,"page-sizes":this.$store.state.Vuex.pageSNumber,"page-size":100,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var r=i("VU/8")(s,l,!1,function(t){i("5zRU")},"data-v-7c26b44a",null);e.default=r.exports}});