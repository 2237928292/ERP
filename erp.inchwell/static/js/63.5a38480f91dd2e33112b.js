webpackJsonp([63],{uTug:function(t,e){},vpqd:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("mtWM"),s=i.n(n),a={name:"GetPermis",data:function(){return{msg:"权限列表",areafunction:"",MemberRole:"",token:localStorage.getItem("token"),jiss:{input0:"",input1:"",from:""},loading:!1,loadingindex:!0,pagesize:10,pagec:1,IsIntegerList:[],total:0,diaing:!1,RoleId:"",Content:"",Controller:"",Action:""}},created:function(){this.$$$http(this.$store.state.http+"System/GetRoles",this.MemberRole),this.$$http()},mounted:function(){var t=this;s.a.get(this.$store.state.http+"System/GetRoles",{params:{},headers:{Token:this.token}}).then(function(e){t.MemberRole=JSON.parse(e.data).Data,console.log(t.MemberRole)})},methods:{delefalde:function(){this.diaing=!1,this.RoleId="",this.Content="",this.Action="",this.Controller=""},addtrue:function(){var t=this;if(""==this.RoleId)return this.$msgnow("warning","请选择类型！"),!1;if(""==this.Controller)return this.$msgnow("warning","请输入控制器！"),!1;if(""==this.Action)return this.$msgnow("warning","请输入方法！"),!1;if(""==this.Content)return this.$msgnow("warning","请输入备注！"),!1;var e={api:"post",url:this.$store.state.http+"System/AddPermiss",data:{RoleId:this.RoleId,Controller:this.Controller,Action:this.Action,Desc:this.Content}};this.$https(e).then(function(e){console.log(e),t.$$http(),t.delefalde()})},handleClose:function(t){var e=this;this.$confirm("确认关闭？").then(function(i){t(),e.delefalde()}).catch(function(t){})},addclick:function(){this.diaing=!0},handleSizeChange:function(t){this.pagesize=t,this.$$http()},handleCurrentChange:function(t){console.log(t),this.pagec=t,this.$$http()},elswit:function(t){s.a.post(this.$store.state.http+"System/EnablePermis",{Id:t.Id},{headers:{token:this.token}}).then(function(t){console.log(t)})},getsearchsense:function(){this.loading=!0,this.$$http()},forfinishing:function(){this.loadingindex=!0,this.$$$httsp(this.$store.state.http+"System/ArrangePermis")},$$http:function(){var t=this;s.a.get(this.$store.state.http+"System/GetPermis",{params:{roleId:this.jiss.from,contrall:this.jiss.input0,action:this.jiss.input1,pageNum:this.pagec,numPerPage:this.pagesize,orderField:"",orderDirection:""},headers:{Token:this.token}}).then(function(e){t.IsIntegerList=JSON.parse(e.data).Data.Dtos,t.total=JSON.parse(e.data).Data.DataBars,t.loading=!1})},$$$http:function(t,e){var i=this;s.a.get(t,{params:{},headers:{Token:this.token}}).then(function(t){JSON.parse(t.data),i.loadingindex=!1})},$$$httsp:function(t,e){var i=this;s.a.post(t,{params:{},headers:{Token:this.token}}).then(function(t){JSON.parse(t.data),i.loadingindex=!1})}}},o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"box"},[i("div",{staticClass:"TopSerch",staticStyle:{width:"100%"}},[i("el-select",{attrs:{size:"mini",clearable:"",placeholder:"请选择角色"},on:{change:t.getsearchsense},model:{value:t.jiss.from,callback:function(e){t.$set(t.jiss,"from",e)},expression:"jiss.from"}},t._l(t.MemberRole,function(t,e){return i("el-option",{key:e,attrs:{label:t.Name,value:t.ID}})}),1),t._v(" "),i("el-input",{staticStyle:{width:"193px"},attrs:{size:"mini",clearable:"",placeholder:"Controller "},on:{change:t.getsearchsense},model:{value:t.jiss.input0,callback:function(e){t.$set(t.jiss,"input0",e)},expression:"jiss.input0"}}),t._v(" "),i("el-input",{staticStyle:{width:"193px"},attrs:{size:"mini",clearable:"",placeholder:"Action"},on:{change:t.getsearchsense},model:{value:t.jiss.input1,callback:function(e){t.$set(t.jiss,"input1",e)},expression:"jiss.input1"}}),t._v(" "),i("el-button",{attrs:{type:"primary",icon:"el-icon-search",size:"mini",loading:t.loading},on:{click:t.getsearchsense}},[t._v("搜索")]),t._v(" "),i("el-button",{staticStyle:{float:"right"},attrs:{type:"success",icon:"el-icon-search",size:"mini",loading:t.loading},on:{click:t.addclick}},[t._v("添加")]),t._v(" "),i("el-button",{attrs:{size:"mini",type:"success",icon:"el-icon-refresh",loading:t.loadingindex,circle:""},on:{click:t.forfinishing}})],1),t._v(" "),i("el-table",{staticStyle:{width:"100%"},attrs:{size:"mini",data:t.IsIntegerList,height:this.$store.state.TableOptimumHeight,"highlight-current-row":"",border:"","header-cell-style":{background:"#e1e1e1"}}},[i("el-table-column",{attrs:{fixed:"",prop:"RoleName",label:"RoleName"}}),t._v(" "),i("el-table-column",{attrs:{prop:"Controller",label:"Controller"}}),t._v(" "),i("el-table-column",{attrs:{prop:"Action",label:"Action"}}),t._v(" "),i("el-table-column",{attrs:{prop:"ActionName",label:"ActionName"}}),t._v(" "),i("el-table-column",{attrs:{fixed:"right",label:"Enable"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-switch",{on:{change:function(i){return t.elswit(e.row)}},model:{value:e.row.Enable,callback:function(i){t.$set(e.row,"Enable",i)},expression:"scope.row.Enable"}})]}}])})],1),t._v(" "),i("nav",{staticStyle:{"text-align":"center"}},[i("el-pagination",{attrs:{"current-page":1,"page-sizes":this.$store.state.Vuex.pageSNumber,"page-size":100,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),i("el-dialog",{attrs:{title:"添加权限",visible:t.diaing,"before-close":t.handleClose},on:{"update:visible":function(e){t.diaing=e}}},[i("el-select",{staticStyle:{width:"150px"},attrs:{size:"mini",placeholder:"请选择意见类型"},model:{value:t.RoleId,callback:function(e){t.RoleId=e},expression:"RoleId"}},t._l(t.MemberRole,function(t){return i("el-option",{key:t.ID,attrs:{label:t.Name,value:t.ID}})}),1),t._v(" "),i("div",{staticClass:"tablediv"},[i("div",{staticClass:"leftdiv"},[t._v("控制器")]),t._v(" "),i("div",{staticClass:"rightdiv"},[i("el-input",{attrs:{size:"mini"},model:{value:t.Controller,callback:function(e){t.Controller=e},expression:"Controller"}})],1)]),t._v(" "),i("div",{staticClass:"tablediv"},[i("div",{staticClass:"leftdiv"},[t._v("方法")]),t._v(" "),i("div",{staticClass:"rightdiv"},[i("el-input",{attrs:{size:"mini"},model:{value:t.Action,callback:function(e){t.Action=e},expression:"Action"}})],1)]),t._v(" "),i("el-input",{staticStyle:{marginTop:"20px"},attrs:{type:"textarea","min-height":"30px",autosize:{minRows:2,maxRows:8},placeholder:"请输入描述"},model:{value:t.Content,callback:function(e){t.Content=e},expression:"Content"}}),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{size:"mini"},on:{click:t.delefalde}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.addtrue}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var l=i("VU/8")(a,o,!1,function(t){i("uTug")},"data-v-5417554b",null);e.default=l.exports}});