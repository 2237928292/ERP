webpackJsonp([46],{aQSR:function(t,e){},g1AD:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l={name:"",data:function(){return{iframeData:{width:"100%",height:"99%",https:"./index.html",http:""},ToolObjectId:"",ToolProId:"",GetAllAll:[],options:[],Selectcontact:"",timer:"",labelPosition:"right",formLabelAlign:{Name:"",Email:"",Tel:"",LinkManId:"",Address:"",Default:"",Mobile:"",NameEn:""},tableData:[]}},created:function(){this.GetAllAllPartDrawing()},mounted:function(){var t=this;window.addEventListener("message",function(e){"webpack"==String(e.data).substring(0,7)||"[object"==String(e.data).substring(0,7)||t.HTMLtoVue(e.data)})},components:{},methods:{Trues:function(){var t=this;console.log(this.ToolProId),console.log(this.formLabelAlign),console.log(this.tableData);for(var e=[],a=0;a<this.tableData.length;a++){var l=this.tableData[a],o={};o.ProductId=l.ProductId,o.Number=l.Number,o.IsAssembly=l.switch,e.push(o)}var i={data:{AddressId:this.formLabelAlign.LinkManId,Type:2,CustomerId:this.ToolProId,WorkorderId:"",GoodsInfos:e},api:"post",url:this.$store.state.http+"CRM/SubmitOrder"};this.$https(i).then(function(e){console.log(e),t.$emit("refresh"),t.$router.push({path:"/SpareParts"})})},Dele:function(){this.formLabelAlign={Name:"",Email:"",Tel:"",LinkManId:"",Address:"",Default:"",Mobile:"",NameEn:""},this.Selectcontact="",this.ToolObjectId="",this.ToolProId=""},validate:function(t){return/^[0-9]*$/.test(Number(t))},querySearchs:function(t,e){if(""==this.ToolProId)return console.log("0000bj"),!1;var a={data:{cusId:this.ToolProId},api:"get",url:this.$store.state.http+"CRM/GetCusLinkManMini",header:this.$store.state.token};this.$https(a).then(function(t){console.log(t.Data.Dtos);if(0==t.Data.Dtos.length)return e([]),!1;for(var a=0;a<t.Data.Dtos.length;a++)t.Data.Dtos[a].value=t.Data.Dtos[a].Name;console.log(t.Data.Dtos),e(t.Data.Dtos)})},querySearch:function(t,e){if(console.log(t),void 0==t)return t="",!1;""==t&&(t="北京");var a={data:{search:t},api:"get",url:this.$store.state.http+"CRM/GetCustomerMini",header:this.$store.state.token};this.$https(a).then(function(t){console.log(t.Data.Dtos);if(0==t.Data.Dtos.length)return e([]),!1;for(var a=0;a<t.Data.Dtos.length;a++)t.Data.Dtos[a].value=t.Data.Dtos[a].FullName;console.log(t.Data.Dtos),e(t.Data.Dtos)})},handleSelects:function(t){console.log(t),this.formLabelAlign=t},handleSelect:function(t){null!=t.ImageUrl?this.StoreHttp=this.$store.state.Filehttp+"CusTool/"+t.ImageUrl:this.StoreHttp="",this.item=[],this.item[0]=t,this.ToolProId=t.CusId,console.log(this.ToolProId),this.Selectcontact="",this.formLabelAlign={Name:"",Email:"",Tel:"",LinkManId:"",Address:"",Default:"",Mobile:"",NameEn:""}},HTMLtoVue:function(t){var e=this,a=this.$loading({lock:!0,text:"Loading",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"}),l={data:{productCodce:t.replace(/^\s+|\s+$/g,"")},api:"get",url:this.$store.state.http+"Product/GetProductMini",header:this.$store.state.token};this.$https(l).then(function(t){t.Data.Number=1,t.Data.switch=!0;for(var l=0;l<e.tableData.length;l++){var o=e.tableData[l];if(o.ProductCode==t.Data.ProductCode)return o.Number+=1,a.close(),!1}e.tableData.push(t.Data),a.close()})},deleteRow:function(t){console.log(t.ProductCode);for(var e=0;e<this.tableData.length;e++)this.tableData[e].ProductCode==t.ProductCode&&this.tableData.splice(e,1)},GetAllAllPartDrawing:function(){var t=this,e={data:{},api:"get",url:this.$store.state.http+"System/GetAllAllPartDrawing",header:this.$store.state.token};this.$https(e).then(function(e){for(var a=0;a<e.Data.length;a++){var l=e.Data[a];l.label=l.Valus,l.value=l.Key,l.children=l.TwoDtos;for(var o=0;o<l.children.length;o++){var i=l.children[o];i.label=i.Valus,i.children=i.ThreeDtos,i.value=i.Key;for(var s=0;s<i.children.length;s++){var n=i.children[s];n.label=n.Key,n.value=n.Valus}}}console.log(e.Data),t.options=e.Data})},handleChange:function(t){console.log(t[2]),this.iframeData.http=this.$store.state.httpData+"content/pcpartsdrawing/productView/"+t[2],console.log(this.iframeData.http)}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"box_s"},[a("div",{staticClass:"TopClickHandelSE"},[a("el-cascader",{staticStyle:{width:"100%"},attrs:{options:t.options,placeholder:"请选择零件图",props:{expandTrigger:"hover"},size:"mini"},on:{change:t.handleChange},model:{value:t.GetAllAll,callback:function(e){t.GetAllAll=e},expression:"GetAllAll"}})],1),t._v(" "),a("div",{staticClass:"ifarCo"},[a("iframe",{attrs:{scrolling:"no",width:t.iframeData.width,height:t.iframeData.height,src:t.iframeData.http,frameborder:"0"}})]),t._v(" "),a("div",{staticClass:"ifarRi"},[a("el-autocomplete",{staticClass:"inline-input",staticStyle:{width:"100%"},attrs:{size:"mini","show-overflow-tooltip":!0,"fetch-suggestions":t.querySearch,placeholder:"请选择客户",clearable:""},on:{select:t.handleSelect},model:{value:t.ToolObjectId,callback:function(e){t.ToolObjectId=e},expression:"ToolObjectId "}},[a("template",{slot:"prepend"},[t._v("选择客户")])],2),t._v(" "),a("el-autocomplete",{staticClass:"inline-input",staticStyle:{width:"100%",marginTop:"15px"},attrs:{size:"mini","show-overflow-tooltip":!0,"fetch-suggestions":t.querySearchs,placeholder:"请选择联系人",clearable:""},on:{select:t.handleSelects},model:{value:t.Selectcontact,callback:function(e){t.Selectcontact=e},expression:"Selectcontact "}},[a("template",{slot:"prepend"},[t._v("选择联系人")])],2),t._v(" "),a("el-input",{staticStyle:{marginTop:"15px",width:"48%"},attrs:{disabled:"",placeholder:"请输入手机",prop:"Mobile",size:"mini"},model:{value:t.formLabelAlign.Mobile,callback:function(e){t.$set(t.formLabelAlign,"Mobile",e)},expression:"formLabelAlign.Mobile"}},[a("template",{slot:"prepend"},[t._v("手机")])],2),t._v(" "),a("el-input",{staticStyle:{marginTop:"15px",width:"48%"},attrs:{disabled:"",placeholder:"请输入电话",size:"mini"},model:{value:t.formLabelAlign.Tel,callback:function(e){t.$set(t.formLabelAlign,"Tel",e)},expression:"formLabelAlign.Tel"}},[a("template",{slot:"prepend"},[t._v("电话")])],2),t._v(" "),a("el-input",{staticStyle:{marginTop:"15px",width:"48%"},attrs:{disabled:"",placeholder:"请输入地址",prop:"Mobile",size:"mini"},model:{value:t.formLabelAlign.Address,callback:function(e){t.$set(t.formLabelAlign,"Address",e)},expression:"formLabelAlign.Address"}},[a("template",{slot:"prepend"},[t._v("地址")])],2),t._v(" "),a("el-input",{staticStyle:{marginTop:"15px",width:"48%"},attrs:{disabled:"",placeholder:"请输入邮箱",size:"mini"},model:{value:t.formLabelAlign.Email,callback:function(e){t.$set(t.formLabelAlign,"Email",e)},expression:"formLabelAlign.Email"}},[a("template",{slot:"prepend"},[t._v("邮箱")])],2),t._v(" "),a("el-form",{ref:"formLabelAlign",staticStyle:{marginTop:"20px"},attrs:{"label-position":t.labelPosition,"status-icon":"","label-width":"80px",size:"mini",model:t.formLabelAlign}},[a("el-form-item",{attrs:{label:""}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,"max-height":"250",size:"mini"}},[a("el-table-column",{attrs:{fixed:"",prop:"Describe",label:"品牌","show-overflow-tooltip":!0,width:"200"}}),t._v(" "),a("el-table-column",{attrs:{fixed:"",prop:"ProductCode",label:"编码","show-overflow-tooltip":!0,width:"150"}}),t._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"数量"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-input-number",{attrs:{name:"Attributes",size:"mini","controls-position":"right",min:1},model:{value:e.row.Number,callback:function(a){t.$set(e.row,"Number",a)},expression:"scope.row.Number"}})]}}])}),t._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"甲方安装",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.row.switch,callback:function(a){t.$set(e.row,"switch",a)},expression:"scope.row.switch"}})]}}])}),t._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.deleteRow(e.row)}}},[t._v("移除")])]}}])})],1)],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.Trues()}}},[t._v("提交")]),t._v(" "),a("el-button",{on:{click:function(e){return t.Dele()}}},[t._v("重置")])],1)],1)],1)])},staticRenderFns:[]};var i=a("VU/8")(l,o,!1,function(t){a("aQSR")},"data-v-680e8545",null);e.default=i.exports}});