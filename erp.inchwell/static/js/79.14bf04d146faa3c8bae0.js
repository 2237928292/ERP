webpackJsonp([79],{ao0q:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s,i=a("bOdI"),o=a.n(i),l={data:function(){return{ZBData:[],FullName:"",CustomerId:"",ApprovalType:"整机申请",Reason:"",X:{},drawer:!1,productDesc:"",search:"",Data:[],pageNum:1,pagesize:10,total:0,productCode:"",barcodeMemo:"",man:"",desc:"",memo:"",options:[]}},computed:{},watch:{},methods:(s={init:function(){this.AddSpareParts=this.$store.state.Vuex.AddSpareParts,console.log(this.$store.state.Vuex.AddSpareParts)},Manufacturer:function(){var t=this,e={url:this.$store.state.http+"System/GetBrand",api:"get"};this.$https(e).then(function(e){t.options=e.Data;for(var a=0;a<t.options.length;a++)t.options[a].value=t.options[a].Value;console.log(t.options)})},querySearchPP:function(t,e){if(void 0==t)return t="",e(this.options),!1;if(""==t)return e(this.options),!1;for(var a=t,s=this.options,i=[],o=(a.split("")[0],0);o<s.length;o++){var l=s[o];-1!=l.value.indexOf(a)&&i.push(l)}e(i)},querySearch:function(t,e){if(console.log(t),void 0==t)return t="",!1;""==t&&(t="北京");var a={data:{search:t},api:"get",url:this.$store.state.http+"CRM/GetCustomerMini",header:this.$store.state.token};this.$https(a).then(function(t){console.log(t.Data.Dtos);if(0==t.Data.Dtos.length)return e([]),!1;for(var a=0;a<t.Data.Dtos.length;a++)t.Data.Dtos[a].value=t.Data.Dtos[a].FullName;e(t.Data.Dtos)})},handleSelect:function(t){console.log(t),this.CustomerId=t.CusId},handleSelectpp:function(t){console.log(t),this.man=t.value},handleCurrentChange:function(t){this.pageNum=t,this.select()},eacrh:function(t){},select:function(t){var e=this;void 0==t&&null==t||(this.pageNum=1);var a={api:"get",url:this.$store.state.http+"Product/GetProducts2",data:{pageNum:this.pageNum,numPerPage:this.pagesize,orderField:"",orderDirection:"",proType:"1",productCode:this.productCode,barcodeMemo:this.barcodeMemo,man:this.man,desc:this.desc,memo:this.memo}};this.$https(a).then(function(t){console.log(),e.Data=t.Data.Dtos,e.total=t.Data.DataBars,e.gridData=t.Data.Dtos;for(var a=0;a<e.gridData.length;a++)e.gridData[a].UpdateDate=e.gridData[a].UpdateDate.split("T")[0];console.log(e.gridData)})},handleClose:function(t){this.$confirm("确认关闭？").then(function(e){t()}).catch(function(t){})}},o()(s,"handleCurrentChange",function(t){this.pageNum=t,this.select()}),o()(s,"handleSizeChange",function(t){this.pagesize=t,this.select(1)}),o()(s,"addscheck",function(){for(var t=this.$refs.multipleTable.selection,e=0;e<t.length;e++){var a=t[e];this.adds(a)}}),o()(s,"adds",function(t){console.log(t);for(var e=0;e<this.ZBData.length;e++)if(t.ID==this.ZBData[e].ID)return this.$look("succus","您已添加过此零件！"),!1;this.ZBData.push(t)}),o()(s,"Del",function(t){console.log(t);for(var e=0;e<this.ZBData.length;e++)t.ID==this.ZBData[e].ID&&this.ZBData.splice(e,1)}),o()(s,"ApplicationLoan",function(){var t=this;if(""==this.CustomerId)return this.$look("warning","请选择客户！"),!1;var e="整机申请"==this.ApprovalType?1:2,a=[];if(console.log(this.CustomerId),console.log(e),console.log(this.Reason),2==e){for(var s=0;s<this.ZBData.length;s++)a.push({proid:this.ZBData[s].ID});if(0==a.length)return this.$look("warning","请选择零配件"),!1}console.log(a);var i={api:"post",url:this.$store.state.http+"StorageRoom/CreateStandbyApproval",data:{StandbyId:this.AddSpareParts.Id,CusId:this.CustomerId,Reason:this.Reason,ApprovalType:e,SADetailDtos:a}};this.$https(i).then(function(e){t.$emit("refresh"),t.$router.push({path:"/ApplicatioPparts"}),t.$msgs(0,"添加成功！")})}),s),created:function(){this.init(),this.select(),this.Manufacturer()},mounted:function(){},beforeCreate:function(){},beforeMount:function(){},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},activated:function(){}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"box_s"},[a("div",{staticClass:"segmentation"},[t._v("\n    设备信息\n  ")]),t._v(" "),a("div",{staticClass:"itemmsgxx_document"},[a("p",[a("span",[t._v("产品编号:")]),t._v(t._s(t.AddSpareParts.ProductCode))])]),t._v(" "),a("div",{staticClass:"itemmsgxx_document"},[a("p",[a("span",[t._v("品牌:")]),t._v(t._s(t.AddSpareParts.Brand))])]),t._v(" "),a("div",{staticClass:"itemmsgxx_document"},[a("p",[a("span",[t._v("当前状态:")]),t._v(t._s(t.AddSpareParts.StateStr))])]),t._v(" "),a("div",{staticClass:"itemmsgxx_document"},[a("p",[a("span",[t._v("库位:")]),t._v(t._s(t.AddSpareParts.Position))])]),t._v(" "),a("div",{staticClass:"itemmsgxx_document"},[a("p",[a("span",[t._v("创建日期:")]),t._v(t._s(t.AddSpareParts.CreateDate))])]),t._v(" "),a("div",{staticClass:"itemmsgxx_document"},[a("p",[a("span",[t._v("正在使用的客户:")]),t._v(t._s(t.AddSpareParts.CusFullName))])]),t._v(" "),a("div",{staticClass:"itemmsgxx_document"},[a("p",[a("span",[t._v("隶属:")]),t._v(t._s(t.AddSpareParts.Belong))])]),t._v(" "),a("div",{staticClass:"segmentation"},[t._v("\n    申请信息\n\n  ")]),t._v(" "),a("div",{staticClass:"Ul"},[a("div",{staticClass:"select"},[a("el-autocomplete",{staticClass:"inline-input",staticStyle:{width:"350px"},attrs:{size:"mini","show-overflow-tooltip":!0,"fetch-suggestions":t.querySearch,placeholder:"请选择客户",clearable:""},on:{select:t.handleSelect},model:{value:t.FullName,callback:function(e){t.FullName=e},expression:"FullName"}},[a("template",{slot:"prepend"},[t._v("选择客户")])],2)],1),t._v(" "),a("div",{staticClass:"textNB"},[a("div",{staticClass:"textBZ",staticStyle:{float:"left"}},[t._v("申请类型")]),t._v(" "),a("el-radio-group",{staticStyle:{marginTop:"20px",marginLeft:"20px"},model:{value:t.ApprovalType,callback:function(e){t.ApprovalType=e},expression:"ApprovalType"}},[a("el-radio",{attrs:{label:"整机申请"}}),t._v(" "),a("el-radio",{attrs:{label:"零配件申请"}})],1)],1),t._v(" "),a("div",{staticClass:"textNB"},[a("div",{staticClass:"textBZ",staticStyle:{width:"160px"}},[t._v("审批结果的原因/发起原因")]),t._v(" "),a("el-input",{staticStyle:{float:"left",width:"500px"},attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},placeholder:"审批结果的原因/发起原因"},model:{value:t.Reason,callback:function(e){t.Reason=e},expression:"Reason"}})],1),t._v(" "),"零配件申请"==t.ApprovalType?a("div",{staticClass:"textNB"},[a("div",{staticClass:"textBZ",staticStyle:{cursor:"pointer"},on:{click:function(e){t.select(),t.drawer=!0}}},[t._v("点击选择设备")]),t._v(" "),0==t.ZBData.length?a("p",{staticStyle:{"line-height":"40px"}},[t._v("未选择设备")]):t._e(),t._v(" "),0!=t.ZBData.length?a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.ZBData}},[a("el-table-column",{attrs:{prop:"ProductCode",label:"产品编号",width:"170"}}),t._v(" "),a("el-table-column",{attrs:{prop:"BarcodeMemo",label:"内部编码",width:"140"}}),t._v(" "),a("el-table-column",{attrs:{prop:"Manufacturer",label:"品牌",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"Characteristics",label:"产品描述","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{prop:"Unit",label:"单位",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"UpdateDate",label:"更新时间",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){return t.Del(e.row)}}},[a("i",{staticClass:"el-icon-delete"})])]}}],null,!1,679070027)})],1):t._e()],1):t._e(),t._v(" "),a("div",[a("el-button",{staticStyle:{float:"right",marginRight:"30px"},attrs:{size:"mini",type:"primary"},on:{click:function(e){return t.ApplicationLoan()}}},[t._v("申请借用")])],1)]),t._v(" "),a("el-drawer",{staticStyle:{width:"200%"},attrs:{visible:t.drawer,direction:"ltr",modal:!1,title:"添加设备","before-close":t.handleClose},on:{"update:visible":function(e){t.drawer=e}}},[a("div",{staticClass:"top_init_data",staticStyle:{marginbottom:"10px"}},[a("el-input",{staticStyle:{width:"193px"},attrs:{size:"mini",placeholder:"请输入产品编码"},on:{change:function(e){return t.select()}},model:{value:t.productCode,callback:function(e){t.productCode=e},expression:"productCode"}}),t._v(" "),a("el-input",{staticStyle:{width:"193px"},attrs:{size:"mini",placeholder:"请输入内部编码"},on:{change:function(e){return t.select()}},model:{value:t.barcodeMemo,callback:function(e){t.barcodeMemo=e},expression:"barcodeMemo"}}),t._v(" "),a("el-input",{staticStyle:{width:"193px"},attrs:{size:"mini",placeholder:"请输入产品描述"},on:{change:function(e){return t.select()}},model:{value:t.desc,callback:function(e){t.desc=e},expression:"desc"}}),t._v(" "),a("el-input",{staticStyle:{width:"193px"},attrs:{size:"mini",placeholder:"请输入产品备注"},on:{change:function(e){return t.select()}},model:{value:t.memo,callback:function(e){t.memo=e},expression:"memo"}}),t._v(" "),a("el-autocomplete",{staticClass:"inline-input",staticStyle:{width:"200px"},attrs:{size:"mini","show-overflow-tooltip":!0,"fetch-suggestions":t.querySearchPP,placeholder:"请选择品牌",clearable:""},on:{change:function(e){return t.select()},select:t.handleSelectpp},model:{value:t.man,callback:function(e){t.man=e},expression:"man"}}),t._v(" "),a("el-button",{staticStyle:{float:"right"},attrs:{size:"mini",type:"primary"},on:{click:function(e){return t.select()}}},[t._v("检索")])],1),t._v(" "),a("el-table",{ref:"multipleTable",staticStyle:{marginbottom:"10px"},attrs:{data:t.Data,size:"mini",height:this.$store.state.TableOptimumHeight,border:"","header-cell-style":{background:"#e1e1e1"}}},[a("el-table-column",{attrs:{prop:"ProductCode",label:"产品编号",width:"170"}}),t._v(" "),a("el-table-column",{attrs:{prop:"BarcodeMemo",label:"内部编码",width:"140"}}),t._v(" "),a("el-table-column",{attrs:{prop:"SN",label:"序列号",width:"130"}}),t._v(" "),a("el-table-column",{attrs:{prop:"Manufacturer",label:"品牌",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"Characteristics",label:"产品描述","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{staticStyle:{float:"left"},attrs:{fixed:"right",type:"selection",width:"55"}}),t._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return t.adds(e.row)}}},[t._v("添加")])]}}])})],1),t._v(" "),a("el-button",{staticStyle:{float:"right"},attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.addscheck()}}},[t._v("添加选择")]),t._v(" "),a("nav",{staticStyle:{"text-align":"center"}},[a("el-pagination",{staticClass:"pagition-li",attrs:{"current-page":1,"page-sizes":this.$store.state.Vuex.pageSNumber,"page-size":t.pagesize,layout:" total , sizes, prev, pager, next, jumper ",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)],1)},staticRenderFns:[]};var r=a("VU/8")(l,n,!1,function(t){a("vfq0")},"data-v-3e19e7bf",null);e.default=r.exports},vfq0:function(t,e){}});