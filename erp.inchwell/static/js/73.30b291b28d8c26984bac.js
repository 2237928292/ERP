webpackJsonp([73],{"6gwh":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={data:function(){return{pagesize:10,pageNum:1,search:"",total:0,Data:[],dialogTableVisible:!1,Datas:[],areaS:[],CustomerType:"",area:""}},created:function(){this.init(),this.initGetArea()},methods:{initGetArea:function(){var t=this,e={url:this.$store.state.http+"System/GetArea",api:"get"};this.$https(e).then(function(e){t.areaS=e.Data})},init:function(){var t=this,e={api:"get",url:this.$store.state.http+"System/GetReturnVisit",data:{search:this.search,area:this.area,custype:this.CustomerType}};this.$https(e).then(function(e){console.log(e),t.total=e.Data.length,t.Data=e.Data})},warn:function(){var t=this,e={api:"post",url:this.$store.state.http+"System/UrgeReturnVisit"};this.$https(e).then(function(e){t.dialogTableVisible=!0,t.Datas=e.Data.Dtos;for(var a=0;a<t.Datas.length;a++)t.Datas[a].list=t.Datas[a].Content.split("，");console.log(t.Datas)})},handleClose:function(t){var e=this;this.$confirm("确认关闭？").then(function(a){t(),e.deleteadddata()}).catch(function(t){})}}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"box"},[a("div",{staticClass:"TopSerch"},[a("el-input",{staticStyle:{width:"193px"},attrs:{size:"mini",clearable:"",placeholder:"请输入内容"},on:{change:function(e){return t.init(1)}},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),t._v(" "),a("el-select",{staticStyle:{width:"120px"},attrs:{size:"mini",clearable:"",placeholder:"请选择区域"},on:{change:function(e){return t.init(1)}},model:{value:t.area,callback:function(e){t.area=e},expression:"area"}},t._l(t.areaS,function(t){return a("el-option",{key:t.Value,attrs:{label:t.Value,value:t.Value}})}),1),t._v(" "),a("el-select",{staticStyle:{width:"120px"},attrs:{size:"mini",clearable:"",placeholder:"请选择客户类型"},on:{change:function(e){return t.init(1)}},model:{value:t.CustomerType,callback:function(e){t.CustomerType=e},expression:"CustomerType"}},t._l(this.$store.state.Vuex.CustomerTypes,function(t){return a("el-option",{key:t+"2",attrs:{label:t,value:t}})}),1),t._v(" "),a("el-button",{staticStyle:{float:"right"},attrs:{type:"warning",size:"mini"},on:{click:function(e){return t.warn()}}},[t._v("回访预警")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"mini",loading:this.$store.state.Vuex.loading},on:{click:function(e){return t.init()}}},[t._v("检索")])],1),t._v(" "),a("div",{staticClass:"content",staticStyle:{padding:"0px 25px","box-sizing":"border-box"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.Data,"max-height":this.$store.state.TableOptimumHeight,size:"mini","highlight-current-row":"",border:"","header-cell-style":{background:"#e1e1e1"}}},[a("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"CusFullName",label:"客户"}}),t._v(" "),a("el-table-column",{attrs:{prop:"LimitDate",label:"剩余时间",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"EarlyWarning",label:"预警时间",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"LastVisit",label:"最后访问",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"Cycle",label:"周期",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"Characteristics",label:"类型",width:"120"}})],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"回访预警",visible:t.dialogTableVisible,"before-close":t.handleClose},on:{"update:visible":function(e){t.dialogTableVisible=e}}},[a("div",{staticClass:"dial",staticStyle:{width:"100%",height:"300px",overflow:"auto",marginTop:"0px"}},t._l(t.Datas,function(e,i){return a("div",{key:i,staticClass:"div"},[a("h4",{staticStyle:{marginBottom:"10px"}},[t._v(t._s(e.Name+"----"+e.Mobile))]),t._v(" "),t._l(e.list,function(e,i){return a("div",{key:i},[t._v(t._s(e))])})],2)}),0),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogTableVisible=!1}}},[t._v("确 定")])],1)])],1)},staticRenderFns:[]};var s=a("VU/8")(i,l,!1,function(t){a("wFlN")},null,null);e.default=s.exports},wFlN:function(t,e){}});