webpackJsonp([19],{"+DBO":function(t,e){},CAPG:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={data:function(){return{search:"",Data:[],pageNum:1,pagesize:10,total:0}},computed:{},watch:{},methods:{init:function(){var t=this,e={api:"get",url:this.$store.state.http+"System/GetJournalisms",data:{search:this.search,pageNum:this.pageNum,numPerPage:this.pagesize,orderField:"",orderDirection:""}};this.$https(e).then(function(e){console.log(e),t.Data=e.Data.Dtos,t.total=e.Data.DataBars,t.Data.forEach(function(t){t.For=1==t.For?"内部员工":2==t.For?"客户":"全部",t.BeginTime=t.BeginTime.split("T")[0]})})},handleCurrentChange:function(t){this.pageNum=t,this.init()},handleSizeChange:function(t){this.pagesize=t,this.init(1)},switchEnable:function(t){console.log(t)},Add:function(){this.$router.push({path:"/add_News"})},Delete:function(t){var e=this;this.$confirm("此操作将删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var n={api:"post",url:e.$store.state.http+"System/DelJournalism",data:{Id:t.ID}};e.$https(n).then(function(t){e.init(),e.$message({type:"success",message:"删除成功!"})})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})}},created:function(){this.init()},mounted:function(){},beforeCreate:function(){},beforeMount:function(){},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},activated:function(){}},a={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"box"},[n("router-view",{on:{refresh:t.init}}),t._v(" "),n("div",{staticClass:"top_init_data_INWEll"},[n("el-input",{staticStyle:{width:"193px"},attrs:{size:"mini",placeholder:"请输入标题"},on:{change:function(e){return t.init(1)}},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),t._v(" "),n("el-button",{staticStyle:{float:"right"},attrs:{type:"success",size:"mini"},on:{click:function(e){return t.Add()}}},[t._v("添加")]),t._v(" "),n("el-button",{staticStyle:{float:"righ","margin-right":"20px"},attrs:{type:"primary",size:"mini",loading:this.$store.state.Vuex.loading},on:{click:function(e){return t.init()}}},[t._v("检索")])],1),t._v(" "),n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.Data,size:"mini",height:this.$store.state.TableOptimumHeight,"highlight-current-row":"",border:"","header-cell-style":{background:"#e1e1e1"}}},[n("el-table-column",{attrs:{prop:"Title",label:"标题",width:"180","show-overflow-tooltip":!0}}),t._v(" "),n("el-table-column",{attrs:{prop:"Content",label:"内容","show-overflow-tooltip":!0}}),t._v(" "),n("el-table-column",{attrs:{prop:"For",label:"目标群体",width:"100"}}),t._v(" "),n("el-table-column",{attrs:{prop:"BeginTime",label:"开始日期",width:"100"}}),t._v(" "),n("el-table-column",{attrs:{fixed:"right",label:"可用性",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},on:{change:t.switchEnable},model:{value:e.row.Enable,callback:function(n){t.$set(e.row,"Enable",n)},expression:"scope.row.Enable"}})]}}])}),t._v(" "),n("el-table-column",{attrs:{fixed:"right",label:"操作",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"danger",size:"mini",icon:"el-icon-delete"},on:{click:function(n){return t.Delete(e.row)}}})]}}])})],1),t._v(" "),n("nav",{staticStyle:{"text-align":"center"}},[n("el-pagination",{attrs:{"current-page":1,"page-sizes":this.$store.state.Vuex.pageSNumber,"page-size":100,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var o=n("VU/8")(i,a,!1,function(t){n("+DBO")},"data-v-ee16be4c",null);e.default=o.exports}});