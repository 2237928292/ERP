webpackJsonp([31],{"5ZAG":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={data:function(){return{total:0,Data:[],GetTargetSalesList:{pageNum:1,numPerPage:10,orderField:"",orderDirection:"",title:"",name:"",dep:"",range:0},Bumen:["客服部","保养部","销售部"],JTime:[{key:0,name:"全部"},{key:1,name:"当前年"},{key:2,name:"当前季"},{key:3,name:"当前月"}],dialogTableVisible:!1,dialogTableVisibleTrue:!1,name:"个人",Time:"",Selectgeren:"",SelectStaff:{},SelectSector:"",TargetSales:{Responsible:"",ResponsibleId:"",Amount:"",Begin:"",End:"",Type:1,Title:""},YGList:[],item:{}}},computed:{},watch:{},methods:{formatPrice:function(e,t){!t&&(t=",");var a=e.toString().split(".");return a[0]=a[0].replace(/\B(?=(\d{3})+(?!\d))/g,t),a.join(".")},handleClose:function(e){var t=this;this.$confirm("确认关闭？").then(function(a){e(),t.deleteadddata()}).catch(function(e){})},handleCurrentChange:function(e){this.GetTargetSalesList.pageNum=e,this.init()},handleSizeChange:function(e){this.GetTargetSalesList.numPerPage=e,this.init(1)},init:function(e){var t=this;1==e&&(this.GetTargetSalesList.pageNum=1);var a={api:"get",url:this.$store.state.http+"PCenter/GetTargetSales",data:this.GetTargetSalesList};this.$https(a).then(function(e){console.log(e.Data),t.total=e.Data.DataBars,t.Data=e.Data.Dtos;for(var a=0;a<t.Data.length;a++){var i=t.Data[a];i.Begin=i.Begin.slice(0,7),i.End=i.End.slice(0,7)}})},inintYG:function(){var e=this,t={data:{type:3},api:"get",url:this.$store.state.http+"System/GetEmployeeMini"};this.$https(t).then(function(t){for(var a=0;a<t.Data.length;a++)t.Data[a].value=t.Data[a].Name;e.YGList=t.Data})},querySearch:function(e,t){if(void 0==e)return e="",!1;for(var a=[],i=0;i<this.YGList.length;i++){var l=this.YGList[i];-1!=l.value.indexOf(e)&&a.push(l)}t(a)},handleSelect:function(e){console.log(e),this.SelectStaff=e},initMBJX:function(){var e=this;if("个人"==this.name&&(this.TargetSales.Responsible=this.SelectStaff.Name,this.TargetSales.ResponsibleId=this.SelectStaff.EmployeeId),"部门"==this.name&&(this.TargetSales.Responsible=this.SelectSector,this.TargetSales.ResponsibleId=this.SelectSector),""==this.Time)return this.$look("warning","未选择时间！"),!1;this.TargetSales.Begin=this.Time[0],this.TargetSales.End=this.Time[1];var t={api:"post",url:this.$store.state.http+"PCenter/AddTargetSales",data:this.TargetSales};this.$https(t).then(function(t){e.TargetSales={},e.Selectgeren="",e.Time="",e.dialogTableVisible=!1,e.init()})},msglook:function(e){var t=this;this.item=e,console.log(e.ID);var a={api:"get",url:this.$store.state.http+"PCenter/StatTargetSales",data:{tsId:e.ID}};this.$https(a).then(function(e){console.log(e),t.item.Data=e.Data,t.item.JD=(Number(t.item.Data)/Number(t.item.Amount)*100).toFixed(2)+"%",t.dialogTableVisibleTrue=!0,setTimeout(function(){document.getElementById("JDT").style.width=t.item.JD},100)})}},created:function(){this.init(),this.inintYG()},mounted:function(){},beforeCreate:function(){},beforeMount:function(){},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},activated:function(){}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"box"},[a("router-view",{on:{refresh:e.init}}),e._v(" "),a("div",{staticClass:"TopSerch"},[a("el-input",{staticStyle:{width:"193px"},attrs:{size:"mini",placeholder:"请输入标题"},on:{change:function(t){return e.init(1)}},model:{value:e.GetTargetSalesList.title,callback:function(t){e.$set(e.GetTargetSalesList,"title",t)},expression:"GetTargetSalesList.title"}}),e._v(" "),a("el-input",{staticStyle:{width:"193px"},attrs:{size:"mini",placeholder:"请输入姓名"},on:{change:function(t){return e.init(1)}},model:{value:e.GetTargetSalesList.name,callback:function(t){e.$set(e.GetTargetSalesList,"name",t)},expression:"GetTargetSalesList.name"}}),e._v(" "),a("el-select",{staticStyle:{width:"120px"},attrs:{size:"mini",clearable:"",placeholder:"请选择部门"},on:{change:function(t){return e.init(1)}},model:{value:e.GetTargetSalesList.dep,callback:function(t){e.$set(e.GetTargetSalesList,"dep",t)},expression:"GetTargetSalesList.dep"}},e._l(e.Bumen,function(e){return a("el-option",{key:e,attrs:{label:e,value:e}})}),1),e._v(" "),a("el-select",{staticStyle:{width:"120px"},attrs:{size:"mini",clearable:"",placeholder:"请选择时间"},on:{change:function(t){return e.init(1)}},model:{value:e.GetTargetSalesList.range,callback:function(t){e.$set(e.GetTargetSalesList,"range",t)},expression:"GetTargetSalesList.range"}},e._l(e.JTime,function(e){return a("el-option",{key:e.key,attrs:{label:e.name,value:e.key}})}),1),e._v(" "),a("el-button",{attrs:{type:"primary",loading:this.$store.state.Vuex.loading,size:"mini"},on:{click:function(t){return e.init(1)}}},[e._v("检索")]),e._v(" "),a("el-button",{staticStyle:{float:"right"},attrs:{type:"success",size:"mini"},on:{click:function(t){e.dialogTableVisible=!0}}},[e._v("创建")])],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{size:"mini",data:e.Data,"highlight-current-row":"",height:this.$store.state.TableOptimumHeight,border:"","header-cell-style":{background:"#e1e1e1"}}},[a("el-table-column",{attrs:{fixed:"",prop:"Title","show-overflow-tooltip":!0,label:"标题"}}),e._v(" "),a("el-table-column",{attrs:{prop:"Creater",width:"150",label:"创建人"}}),e._v(" "),a("el-table-column",{attrs:{prop:"Responsible",width:"150",label:"目标人"}}),e._v(" "),a("el-table-column",{attrs:{prop:"Department",width:"100",label:"隶属部门"}}),e._v(" "),a("el-table-column",{attrs:{width:"150",label:"目标金额"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("p",{staticClass:"textR"},[e._v("￥"+e._s(parseInt(t.row.Amount).toLocaleString()))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"Begin",width:"100",label:"开始时间"}}),e._v(" "),a("el-table-column",{attrs:{prop:"End",width:"100",label:"结束时间"}}),e._v(" "),a("el-table-column",{attrs:{fixed:"right",width:"100",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return e.msglook(t.row)}}},[e._v("查看")])]}}])})],1),e._v(" "),a("el-dialog",{attrs:{title:"创建目标",visible:e.dialogTableVisible,"before-close":e.handleClose},on:{"update:visible":function(t){e.dialogTableVisible=t}}},[a("div",{staticClass:"dial",staticStyle:{width:"100%",height:"300px"}},[a("div",{staticClass:"li"},[a("el-input",{staticStyle:{width:"350px"},attrs:{placeholder:"请输入标题",size:"mini"},model:{value:e.TargetSales.Title,callback:function(t){e.$set(e.TargetSales,"Title",t)},expression:"TargetSales.Title"}},[a("template",{slot:"prepend"},[e._v("标题")])],2)],1),e._v(" "),a("div",{staticClass:"li"},[a("el-radio-group",{attrs:{size:"mini"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}},[a("el-radio-button",{attrs:{label:"个人"}}),e._v(" "),a("el-radio-button",{attrs:{label:"部门"}})],1)],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:"个人"==e.name,expression:"name == '个人' "}],staticClass:"li"},[a("el-autocomplete",{staticClass:"inline-input",staticStyle:{width:"350px"},attrs:{size:"mini","show-overflow-tooltip":!0,"fetch-suggestions":e.querySearch,placeholder:"请输入关键词",clearable:""},on:{select:e.handleSelect},model:{value:e.Selectgeren,callback:function(t){e.Selectgeren=t},expression:"Selectgeren"}},[a("template",{slot:"prepend"},[e._v("选择员工")])],2)],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:"个人"!=e.name,expression:"name != '个人' "}],staticClass:"li"},[a("el-select",{staticStyle:{width:"150px"},attrs:{size:"mini",clearable:"",placeholder:"请选择部门"},model:{value:e.SelectSector,callback:function(t){e.SelectSector=t},expression:"SelectSector"}},e._l(e.Bumen,function(e){return a("el-option",{key:e,attrs:{label:e,value:e}})}),1)],1),e._v(" "),a("div",{staticClass:"li"},[a("el-input",{staticStyle:{width:"350px"},attrs:{placeholder:"请输入目标金额",size:"mini"},model:{value:e.TargetSales.Amount,callback:function(t){e.$set(e.TargetSales,"Amount",t)},expression:"TargetSales.Amount"}},[a("template",{slot:"prepend"},[e._v("目标金额")])],2)],1),e._v(" "),a("div",{staticClass:"li"},[a("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd",type:"monthrange",size:"mini","range-separator":"至","start-placeholder":"开始月份","end-placeholder":"结束月份"},model:{value:e.Time,callback:function(t){e.Time=t},expression:"Time"}})],1)]),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini"},on:{click:function(t){e.dialogTableVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.initMBJX}},[e._v("确 定")])],1)]),e._v(" "),a("el-dialog",{attrs:{title:"目标进度",visible:e.dialogTableVisibleTrue,"before-close":e.handleClose},on:{"update:visible":function(t){e.dialogTableVisibleTrue=t}}},[a("div",{staticClass:"dial",staticStyle:{width:"100%",height:"300px"}},[a("div",{staticClass:"li"},[a("span",[e._v("目标标题")]),e._v(e._s(e.item.Title)+"\n      ")]),e._v(" "),a("div",{staticClass:"li"},[a("span",[e._v("目标人")]),e._v(e._s(e.item.Responsible)+"\n      ")]),e._v(" "),a("div",{staticClass:"li"},[a("span",[e._v("目标部门")]),e._v(e._s(e.item.Department)+"\n      ")]),e._v(" "),a("div",{staticClass:"li"},[a("span",[e._v("目标金额")]),e._v("￥"+e._s(parseInt(e.item.Amount).toLocaleString())+"\n      ")]),e._v(" "),a("div",{staticClass:"li"},[a("span",[e._v("实现金额")]),e._v("￥"+e._s(parseInt(e.item.Data).toLocaleString())+"\n      ")]),e._v(" "),a("div",{staticClass:"li"},[a("span",[e._v("时间范围")]),e._v(e._s(e.item.Begin+" 至 "+e.item.End)+"\n      ")]),e._v(" "),a("div",{staticClass:"li"},[a("span",[e._v("目标进度")]),e._v(" "),a("div",{staticClass:"JD"},[a("div",{attrs:{id:"JDT"}})]),e._v(" "),a("p",{staticStyle:{float:"right"}},[e._v(e._s(e.item.JD))])])]),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){e.dialogTableVisibleTrue=!1}}},[e._v("确 定")])],1)]),e._v(" "),a("nav",{staticStyle:{"text-align":"center"}},[a("el-pagination",{attrs:{"current-page":1,"page-sizes":this.$store.state.Vuex.pageSNumber,"page-size":100,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var s=a("VU/8")(i,l,!1,function(e){a("d77u")},"data-v-a2de24d8",null);t.default=s.exports},d77u:function(e,t){}});