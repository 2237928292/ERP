webpackJsonp([58],{IUPJ:function(t,e){},"M/EZ":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("mvHQ"),s=i.n(n),o=i("bOdI"),a=i.n(o),l=i("PXCl").Base64,r={name:"",data:function(){return{MaintainRHF:!1,BelongCompany:"",SoQuoteType:"",optionsASAndSP:[{value:"AS",label:"AS"},{value:"SP",label:"SP"},{value:"SC",label:"SC"}],options:[{value:"技术公司",label:"技术公司"},{value:"服务公司",label:"服务公司"}],afsdfsdf:[a()({name:"22"},"name","12")],Data:{},SOEquipmentList:[],TotalPrice:{},Consignee:{},State:"",pricesOfParts:0,TravelAmount:"",TravelAmounts:0,Discount:"",DiscountAmount:0,DiscountAmountIndex:!1,GoodsDH:"",ShipmentQuantity:[],DeliDetails:[],ShowAdd:!0,dialogTableVisible:!1,gridData:[]}},created:function(){this.init()},components:{},mounted:function(){console.log("00000")},watch:{$route:function(t,e){"/EditOrder"==t.path&&(this.ShowAdd=!0)}},methods:{ResetMC:function(){var t=this,e={api:"post",url:this.$store.state.http+"SO/ResetSO",data:{Id:this.$store.state.Vuex.SOId}};this.$https(e).then(function(e){t.$look("success","恢复成功！",Row.MaintainCode+"的状态已恢复！")})},ConsigneeS:function(t){console.log(t),this.Consignee.Name=t.Name,this.Consignee.EnginnerName=t.NameEn,this.Consignee.MobilePhone=t.Mobile,this.Consignee.Tel=t.Tel,this.Consignee.EMail=t.Email,this.Consignee.Address=t.Address,this.dialogTableVisible=!1},Invoice:function(){if(""==this.BelongCompany||null==this.BelongCompany||void 0==this.BelongCompany)return this.$look("warning","请选择隶属公司！"),!1;var t=this.$router.resolve({path:this.$store.state.Vuex.TencentServer+"/List/Delivery.html",query:{url:l.encodeURI(this.$store.state.http+"SO/GetSo"),soId:l.encodeURI(this.$store.state.Vuex.SOId),token:l.encodeURI(this.$store.state.token),index:l.encodeURI("技术公司"==this.BelongCompany?"1":"2")}}).href;console.log("000"),window.open(t.slice(2),"_blank")},SelectConsignee:function(){var t=this;console.log(this.CusId);var e={data:{cusId:this.CusId},api:"get",url:this.$store.state.http+"CRM/GetCusLinkManMini",header:this.$store.state.token};this.$https(e).then(function(e){console.log(e.Data.Dtos),t.gridData=e.Data.Dtos,t.dialogTableVisible=!0})},Orderlistmag:function(){if(console.log(this.BelongCompany),""==this.BelongCompany||null==this.BelongCompany||void 0==this.BelongCompany)return this.$look("warning","请选择隶属公司！"),!1;if("技术公司"===this.BelongCompany){var t=this.$router.resolve({path:this.$store.state.Vuex.TencentServer+"/List/technology.html",query:{url:l.encodeURI(this.$store.state.http+"SO/GetSo"),soId:l.encodeURI(this.$store.state.Vuex.SOId),token:l.encodeURI(this.$store.state.token)}}).href;window.open(t.slice(2),"_blank")}else{var e=this.$router.resolve({path:this.$store.state.Vuex.TencentServer+"/List/service.html",query:{url:l.encodeURI(this.$store.state.http+"SO/GetSo"),soId:l.encodeURI(this.$store.state.Vuex.SOId),token:l.encodeURI(this.$store.state.token)}}).href;window.open(e.slice(2),"_blank")}},NumberIndex:function(t){return"Number"+t},DeliverysHttp:function(t){var e=this.Data.Deliverys[t].LogisticsInfo;window.open("https://www.sf-express.com/cn/sc/dynamic_function/waybill/#search/bill-number/"+e,"_blank")},deliverGoods:function(){var t=this;if(""==this.GoodsDH)return this.$look("warning","请输入物流信息！"),!1;for(var e=[],i=0;i<this.SOEquipmentList.length;i++){this.SOEquipmentList[i].arr.map(function(t){""!=t.value&&0!=t.value&&e.push(t)})}for(var n=[],s=0;s<e.length;s++){var o=e[s];if(""==o.name)return this.$look("warning","没有库位不可发"),!1;n.push({Location:o.name.split("[")[0],Quantity:Number(o.value)})}console.log(n),0==n.length&&this.$look("warning","请输入发货数量");var a={api:"post",url:this.$store.state.http+"SO/ShipmentSO",data:{SOId:this.$store.state.Vuex.SOId,LogisticsInfo:this.GoodsDH,Dtos:n}};return this.$https(a).then(function(e){console.log(e),t.$emit("refresh"),t.$router.push({path:"/SpareParts"})}),!1},dele:function(t){var e=this;console.log(t);var i={api:"post",url:this.$store.state.http+"SO/DelSoGood",data:{Id:t.SOGoodId}};this.$https(i).then(function(t){e.init()})},handleSelect:function(t){this.TravelAmounts=t.Price,this.pricesOfPartsJS()},Qingk:function(){this.TravelAmounts="",this.TravelAmount="",this.pricesOfPartsJS()},InoutgB:function(t){2==t.split("-").length||(this.TravelAmounts=t),this.pricesOfPartsJS()},querySearch:function(t,e){"0"==t&&(t="");var i={data:{province:"",City:t},api:"get",url:this.$store.state.http+"System/GetTravelExpenses"};this.$https(i).then(function(t){console.log(t.Data);for(var i=0;i<t.Data.length;i++)t.Data[i].value=t.Data[i].City+" - "+t.Data[i].Price;console.log(t.Data),e(t.Data)})},pricesOfPartsJS:function(t){for(var e=0,i=0,n=0;n<this.SOEquipmentList.length;n++){var s=this.SOEquipmentList[n];console.log(s),"RMB"==s.BuyingCurrency?i+=Number(s.BuyingUnitPrice)*s.Number:i+=10*Number(s.BuyingUnitPrice)*s.Number,s.IsAssembly?e+=(s.AssemblyPeice+s.UnitPrice)*s.Number:e+=s.UnitPrice*s.Number}this.TotalPrice.NumberCG=i;var o=Number(this.Discount);if(void 0!=this.Discount&&""!=o||(o=0),this.TotalPrice.Amount=(Number(this.TotalPrice.LogisticCharge)+e+Number(this.TravelAmounts)).toFixed(2),0==this.DiscountAmountIndex)return this.DiscountAmountIndex=!0,!1;this.DiscountAmount=this.TotalPrice.Amount*(1-.01*o),"SaveOrderS"==t&&this.SaveOrderS()},SaveOrderS:function(){for(var t=[],e=0;e<this.SOEquipmentList.length;e++){var i=this.SOEquipmentList[e];console.log(i.SOGoodId);var n={};n.SOGoodId=i.SOGoodId,n.Number=i.Number,n.IsAssembly=i.IsAssembly,t.push(n)}var s={name:this.Consignee.Name,EnginnerName:this.Consignee.EnginnerName,Mobile:this.Consignee.MobilePhone,Tel:this.Consignee.Tel,Email:this.Consignee.EMail,Address:this.Consignee.Address};console.log(s),console.log(t),console.log(this.Data.Memo);var o={api:"post",url:this.$store.state.http+"SO/SaveSO",data:{Memo:this.Data.Memo,SOId:this.$store.state.Vuex.SOId,QuoteCode:this.Data.QuoteCode,Amount:this.TotalPrice.Amount,DiscountProportion:this.Discount,SaveSOConsignee:s,TravelAmount:this.TravelAmounts,LogisticCharge:this.TotalPrice.LogisticCharge,DiscountAmount:this.DiscountAmount,SaveSOGoodDtos:t,BelongCompany:this.BelongCompany}};console.log(o),this.$https(o).then(function(t){})},SaveOrder:function(t){var e=this;if(""==this.SoQuoteType||null==this.SoQuoteType||void 0==this.SoQuoteType)return this.$look("warning","无法保存！","请选择报价类型！"),!1;for(var i=[],n=0;n<this.SOEquipmentList.length;n++){var s=this.SOEquipmentList[n];console.log(s.SOGoodId);var o={};o.SOGoodId=s.SOGoodId,o.Number=s.Number,o.IsAssembly=s.IsAssembly,i.push(o)}var a={name:this.Consignee.Name,EnginnerName:this.Consignee.EnginnerName,Mobile:this.Consignee.MobilePhone,Tel:this.Consignee.Tel,Email:this.Consignee.EMail,Address:this.Consignee.Address};console.log(a),console.log(i),console.log(this.Data.Memo);var l={api:"post",url:this.$store.state.http+"SO/SaveSO",data:{Memo:this.Data.Memo,SOId:this.$store.state.Vuex.SOId,QuoteCode:this.Data.QuoteCode,Amount:this.TotalPrice.Amount,DiscountProportion:this.Discount,SaveSOConsignee:a,TravelAmount:this.TravelAmounts,LogisticCharge:this.TotalPrice.LogisticCharge,DiscountAmount:this.DiscountAmount,SaveSOGoodDtos:i,BelongCompany:this.BelongCompany,SoQuoteType:this.SoQuoteType}};console.log(l),this.$https(l).then(function(i){e.init(),void 0!=t&&e.Edit(t)})},RefreshOrderUnitPrice:function(){var t=this,e={api:"post",url:this.$store.state.http+"SO/SORefreshPrice",data:{Id:this.$store.state.Vuex.SOId}};this.$https(e).then(function(e){t.init()})},inits:function(){this.init(),this.pricesOfPartsJS(),this.ShowAdd=!0},init:function(){var t=this,e={api:"get",url:this.$store.state.http+"SO/GetSo",data:{soId:this.$store.state.Vuex.SOId}};this.$https(e).then(function(e){console.log(e.Data),t.CusId=e.Data.CusId,t.Data=JSON.parse(s()(e.Data)),console.log(t.Data),t.SOEquipmentList=e.Data.SOEquipmentList,console.log(t.SOEquipmentList),t.TotalPrice=e.Data.TotalPrice,t.Discount=Number(t.TotalPrice.DiscountProportion),t.TravelAmount=String(t.TotalPrice.TravelAmount),t.TravelAmounts=Number(t.TotalPrice.TravelAmount),t.Consignee=e.Data.Consignee,t.State=Number(e.Data.State),t.BelongCompany=e.Data.BelongCompany,t.SoQuoteType=e.Data.SoQuoteType,t.pricesOfPartsJS(),t.DiscountAmount=Number(t.TotalPrice.DiscountAmount),0==Number(t.TotalPrice.DiscountAmount)&&(t.DiscountAmountIndex=!0,t.pricesOfPartsJS());for(var i=[],n=0;n<t.Data.Deliverys.length;n++){for(var o=t.Data.Deliverys[n].DeliveryDetails,a=[],l=0,r=o.length;l<r;l++){for(var u=0,c=a.length;u<c;u++)if(o[l].ProductId===a[u].ProductId){a[u].Number+=o[l].Number;break}u===c&&a.push(o[l])}console.log(a),i.push(a)}console.log(i),t.DeliDetails=i;for(var h=0;h<i.length;h++)for(var p=i[h],d=0;d<p.length;d++){var m=p[d];console.log(h);for(var v=0;v<t.SOEquipmentList.length;v++){var g=t.SOEquipmentList[v].ProductId;console.log(t.SOEquipmentList[v].Locations);var S="Number"+h;m.ProductId==g&&(t.SOEquipmentList[v][S]=m.Number)}}console.log(t.SOEquipmentList);for(var f=0;f<t.SOEquipmentList.length;f++){var b=t.SOEquipmentList[f];b.PurchaseUnitPrice=b.BuyingUnitPrice+" "+b.BuyingCurrency;for(var _=b.Locations.split("、"),C=[],y=0;y<_.length;y++){var x=_[y];C[y]={name:x,Number:b.Number},t.$set(C[y],"value","")}b.arr=C}console.log(t.SOEquipmentList),t.ShipmentQuantity=[];for(var D=0,O=0;O<t.SOEquipmentList.length;O++){var w=t.SOEquipmentList[O];w.Locations=w.Locations.split("[")[0],"RMB"==w.BuyingCurrency?D+=Number(w.BuyingUnitPrice)*w.Number:D+=10*Number(w.BuyingUnitPrice)*w.Number}t.TotalPrice.NumberCG=D})},Edit:function(t){var e=this;if(console.log(t),""==this.BelongCompany||null==this.BelongCompany||void 0==this.BelongCompany)return this.$look("warning","请选择隶属公司！"),!1;if(""==this.Consignee.Name||null==this.Consignee.Name||void 0==this.Consignee.Name)return this.$look("warning","请输入收货人姓名！"),!1;if(""==this.Consignee.MobilePhone||null==this.Consignee.MobilePhone||void 0==this.Consignee.MobilePhone)return this.$look("warning","请输入收货人手机！"),!1;if(""==this.Consignee.Address||null==this.Consignee.Address||void 0==this.Consignee.Address)return this.$look("warning","请输入收货人地址！"),!1;var i={api:"post",url:this.$store.state.http+"SO/UpdateSOState",data:{SoId:this.$store.state.Vuex.SOId,SOStatus:t,QuoteCode:"",IsNeedInstall:""}};return 2==this.State||1==this.State?(this.$https(i).then(function(t){e.$emit("refresh"),e.$router.push({path:"/SpareParts"})}),!1):3==this.State?(this.$confirm(" 是否需要安装?","提示",{confirmButtonText:"需要",cancelButtonText:"不需要",distinguishCancelAndClose:!0,type:"warning"}).then(function(){i.data.IsNeedInstall=!0,e.$https(i).then(function(t){e.$emit("refresh"),e.$router.push({path:"/SpareParts"})})}).catch(function(t){if("cancel"!=t)return!1;i.data.IsNeedInstall=!1,e.$https(i).then(function(t){e.$emit("refresh"),e.$router.push({path:"/SpareParts"})})}),!1):void this.$https(i).then(function(t){e.$emit("refresh"),e.$router.push({path:"/SpareParts"})})},AddSb:function(){this.$router.push({path:"/AddOrderMsg"}),this.ShowAdd=!1}}},u={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"box_s"},[i("router-view",{on:{refresh:t.inits}}),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.ShowAdd,expression:"ShowAdd"}],staticStyle:{width:"100%；height：100%"}},[i("div",{staticClass:"segmentation"},[t._v("基础信息\n      "),i("div",{staticStyle:{width:"50px",height:"50px",float:"right","z-index":"99"},on:{mouseover:function(e){t.MaintainRHF=!0},mouseleave:function(e){t.MaintainRHF=!1}}},[i("el-button",{directives:[{name:"show",rawName:"v-show",value:t.MaintainRHF,expression:"MaintainRHF"}],staticStyle:{float:"right"},attrs:{size:"mini",type:"success",icon:"el-icon-refresh"},on:{click:function(e){return t.ResetMC()}}})],1)]),t._v(" "),i("div",{staticClass:"text itemxxxxX"},[i("p",[i("span",[t._v("客户:")]),t._v(t._s(t.Data.CusName+"【"+(t.Data.BelongEnginners||" - ")+"】"))])]),t._v(" "),i("div",{staticClass:"text itemxxxxx"},[i("p",[i("span",[t._v("订单单号:")]),t._v(t._s(t.Data.SOCode))])]),t._v(" "),i("div",{staticClass:"text itemxxxxx"},[i("p",[i("span",[t._v("报价单号:")]),t._v(t._s(t.Data.QuoteCode||" - "))])]),t._v(" "),i("div",{staticClass:"text itemxxxxx"},[i("p",[i("span",[t._v("状态:")]),t._v(t._s(t.Data.StateStr))])]),t._v(" "),i("div",{staticClass:"text itemxxxxx"},[i("p",[i("span",[t._v("是否需要安装:")]),t._v(t._s(t.Data.IsNeedInstall?"是":"否"))])]),t._v(" "),i("div",{staticClass:"text itemxxxxx"},[i("p",[i("span",[t._v("报价类型:")]),t._v(" "),i("el-select",{staticStyle:{width:"150px"},attrs:{size:"mini",placeholder:"请选择AS/SP"},model:{value:t.SoQuoteType,callback:function(e){t.SoQuoteType=e},expression:"SoQuoteType"}},t._l(t.optionsASAndSP,function(t){return i("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1)]),t._v(" "),i("div",{staticClass:"text itemxxxxx"},[i("p",[i("span",[t._v("隶属公司:")]),t._v(" "),i("el-select",{staticStyle:{width:"150px"},attrs:{size:"mini",placeholder:"请选择"},model:{value:t.BelongCompany,callback:function(e){t.BelongCompany=e},expression:"BelongCompany"}},t._l(t.options,function(t){return i("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1)]),t._v(" "),i("div",{staticClass:"text itemxxxx9"},[i("p",[i("span",[t._v("工程师备注:")]),t._v(t._s(t.Data.EngineerMemo)+"\n      ")])]),t._v(" "),i("div",{staticClass:"textNB"},[i("div",{staticStyle:{}},[t._v("备注：")]),t._v(" "),i("el-input",{staticStyle:{float:"left",width:"500px"},attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},placeholder:"请输入内容"},model:{value:t.Data.Memo,callback:function(e){t.$set(t.Data,"Memo",e)},expression:"Data.Memo"}})],1),t._v(" "),i("div",{staticClass:"segmentation"},[t._v("\n      设备清单\n      "),1==t.State||2==t.State||0==t.State?i("el-button",{staticStyle:{float:"right",marginLeft:"10px"},attrs:{size:"mini",type:"primary"},on:{click:function(e){return t.AddSb()}}},[t._v("添加设备")]):t._e(),t._v(" "),1==t.State||2==t.State||0==t.State?i("el-button",{staticStyle:{float:"right"},attrs:{size:"mini",type:"primary"},on:{click:t.RefreshOrderUnitPrice}},[t._v("刷新订单设备单价")]):t._e()],1),t._v(" "),i("el-table",{staticStyle:{width:"98%",marginTop:"10px",float:"left"},attrs:{data:t.SOEquipmentList,size:"mini","highlight-current-row":"",border:"","header-cell-style":{background:"#e1e1e1"}}},[i("el-table-column",{attrs:{prop:"ProcodeCode",label:"产品编号",width:"150"}}),t._v(" "),i("el-table-column",{attrs:{prop:"Brand",label:"品牌",width:"100"}}),t._v(" "),i("el-table-column",{attrs:{prop:"Desc",label:"描述","show-overflow-tooltip":!0}}),t._v(" "),i("el-table-column",{attrs:{label:"数量",width:"70"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("input",{directives:[{name:"model",rawName:"v-model",value:e.row.Number,expression:"scope.row.Number"}],staticStyle:{width:"100%"},attrs:{type:"text",min:1},domProps:{value:e.row.Number},on:{change:function(e){return t.pricesOfPartsJS("SaveOrderS")},input:function(i){i.target.composing||t.$set(e.row,"Number",i.target.value)}}})]}}])}),t._v(" "),i("el-table-column",{attrs:{prop:"Locations",label:"库位",width:"90"}}),t._v(" "),i("el-table-column",{attrs:{prop:"NetInventory",label:"库存",width:"70"}}),t._v(" "),i("el-table-column",{attrs:{prop:"PurchaseUnitPrice",label:"采购单价",width:"120"}}),t._v(" "),i("el-table-column",{attrs:{prop:"UnitPrice",label:"销售单价",width:"90"}}),t._v(" "),i("el-table-column",{attrs:{prop:"AssemblyPeice",label:"安装费单价",width:"90"}}),t._v(" "),i("el-table-column",{attrs:{label:"甲方安装",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},on:{change:t.pricesOfPartsJS},model:{value:e.row.IsAssembly,callback:function(i){t.$set(e.row,"IsAssembly",i)},expression:"scope.row.IsAssembly"}})]}}])}),t._v(" "),1==t.State||2==t.State?i("el-table-column",{attrs:{fixed:"right",label:"操作",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{size:"mini",type:"danger",icon:"el-icon-delete"},on:{click:function(i){return t.dele(e.row)}}})]}}],null,!1,4094896075)}):t._e()],1),t._v(" "),i("div",{staticClass:"segmentation"},[t._v("\n      费用合计\n      "),i("el-button",{staticStyle:{float:"right",marginLeft:"10px"},attrs:{size:"mini",type:"primary"},on:{click:function(e){return t.Orderlistmag()}}},[t._v("报价单")])],1),t._v(" "),i("div",{staticClass:"segation"},[i("el-input",{attrs:{placeholder:"",size:"mini"},on:{change:t.pricesOfPartsJS},model:{value:t.TotalPrice.LogisticCharge,callback:function(e){t.$set(t.TotalPrice,"LogisticCharge",e)},expression:"TotalPrice.LogisticCharge"}},[i("template",{slot:"prepend"},[t._v("空运费：￥")])],2),t._v(" "),i("el-autocomplete",{staticClass:"inline-input",staticStyle:{width:"250px"},attrs:{size:"mini","show-overflow-tooltip":!0,"fetch-suggestions":t.querySearch,placeholder:"请选择市区",clearable:"","automatic-dropdown":!0},on:{select:t.handleSelect,clear:t.Qingk,input:t.InoutgB},model:{value:t.TravelAmount,callback:function(e){t.TravelAmount=e},expression:"TravelAmount"}},[i("template",{slot:"prepend"},[t._v("差旅费：￥")])],2),t._v(" "),i("el-input",{attrs:{placeholder:"",size:"mini",disabled:""},model:{value:t.TotalPrice.NumberCG,callback:function(e){t.$set(t.TotalPrice,"NumberCG",e)},expression:"TotalPrice.NumberCG"}},[i("template",{slot:"prepend"},[t._v("采购总金额：￥")])],2),t._v(" "),i("el-input",{attrs:{placeholder:"",size:"mini",disabled:""},model:{value:t.TotalPrice.Amount,callback:function(e){t.$set(t.TotalPrice,"Amount",e)},expression:"TotalPrice.Amount"}},[i("template",{slot:"prepend"},[t._v("产品总金额：￥")])],2),t._v(" "),i("el-input",{attrs:{placeholder:"",size:"mini"},on:{change:t.pricesOfPartsJS},model:{value:t.Discount,callback:function(e){t.Discount=e},expression:"Discount"}},[i("template",{slot:"prepend"},[t._v("优惠比例（%）：")])],2),t._v(" "),i("el-input",{attrs:{placeholder:"",size:"mini"},model:{value:t.DiscountAmount,callback:function(e){t.DiscountAmount=e},expression:"DiscountAmount"}},[i("template",{slot:"prepend"},[t._v("优惠后金额：￥")])],2),t._v(" "),i("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"",size:"mini"},model:{value:t.Data.QuoteCode,callback:function(e){t.$set(t.Data,"QuoteCode",e)},expression:"Data.QuoteCode"}},[i("template",{slot:"prepend"},[t._v("报价单号：")])],2)],1),t._v(" "),4==t.State||8==t.State||6==t.State?i("div",[i("div",{staticClass:"segmentation"},[t._v("发货\n        "),t.Data.IsAS?i("span",{staticStyle:{float:"right",color:"red"}},[t._v("当前客户为保养大包(AS)客户，优先使用AS专用配件")]):t._e()]),t._v(" "),i("el-input",{staticStyle:{width:"400px",marginTop:"10px",float:"right"},attrs:{placeholder:"",size:"mini"},model:{value:t.GoodsDH,callback:function(e){t.GoodsDH=e},expression:"GoodsDH"}},[i("template",{slot:"prepend"},[t._v("物流信息:")])],2),t._v(" "),i("el-table",{staticStyle:{width:"100%",marginTop:"10px",float:"left"},attrs:{data:t.SOEquipmentList,size:"mini","highlight-current-row":"",border:"","header-cell-style":{background:"#e1e1e1"}}},[i("el-table-column",{attrs:{prop:"ProcodeCode",label:"产品编号",width:"150"}}),t._v(" "),i("el-table-column",{attrs:{prop:"Brand",label:"品牌",width:"150"}}),t._v(" "),i("el-table-column",{attrs:{prop:"Desc",label:"描述","show-overflow-tooltip":!0}}),t._v(" "),i("el-table-column",{attrs:{label:"库位",width:"90"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.row.arr,function(e,n){return i("p",{key:n},[t._v(t._s(e.name))])})}}],null,!1,1969620175)}),t._v(" "),i("el-table-column",{attrs:{prop:"NetInventory",label:"库存",width:"70"}}),t._v(" "),i("el-table-column",{attrs:{prop:"Number",label:"订单数量",width:"80"}}),t._v(" "),t._l(t.DeliDetails,function(e,n){return i("el-table-column",{key:n,attrs:{label:"物流",width:"100",prop:t.NumberIndex(n)}},[i("template",{slot:"header"},[i("p",{on:{click:function(e){return t.DeliverysHttp(n)}}},[t._v(t._s("物流"+(n+1)))])])],2)}),t._v(" "),8==t.State||4==t.State?i("el-table-column",{attrs:{fixed:"right",label:"发货",width:"90"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.row.arr,function(e,n){return i("input",{directives:[{name:"model",rawName:"v-model",value:e.value,expression:"item12.value"}],key:n,attrs:{type:"number",size:"mini"},domProps:{value:e.value},on:{input:function(i){i.target.composing||t.$set(e,"value",i.target.value)}}})})}}],null,!1,1848928233)}):t._e()],2),t._v(" "),8==t.State||4==t.State?i("el-button",{staticClass:"C33",attrs:{size:"mini",type:"primary"},on:{click:t.deliverGoods}},[t._v("发货")]):t._e(),t._v(" "),8==t.State||4==t.State||6==t.State?i("el-button",{staticClass:"C33",attrs:{size:"mini",type:"success"},on:{click:t.Invoice}},[t._v("发货单")]):t._e()],1):t._e(),t._v(" "),i("div",{staticClass:"segmentation"},[t._v("收货人\n      "),1==t.State||2==t.State||0==t.State?i("el-button",{staticStyle:{float:"right",marginLeft:"10px"},attrs:{size:"mini",type:"primary"},on:{click:function(e){return t.SelectConsignee()}}},[t._v("选择收货人")]):t._e()],1),t._v(" "),i("div",{staticClass:"consignee"},[i("span",[t._v("姓名：")]),t._v(" "),i("el-input",{attrs:{size:"mini"},model:{value:t.Consignee.Name,callback:function(e){t.$set(t.Consignee,"Name",e)},expression:"Consignee.Name"}})],1),t._v(" "),i("div",{staticClass:"consignee"},[i("span",[t._v("英文名：")]),t._v(" "),i("el-input",{attrs:{size:"mini"},model:{value:t.Consignee.EnginnerName,callback:function(e){t.$set(t.Consignee,"EnginnerName",e)},expression:"Consignee.EnginnerName"}})],1),t._v(" "),i("div",{staticClass:"consignee"},[i("span",[t._v("手机：")]),t._v(" "),i("el-input",{attrs:{size:"mini"},model:{value:t.Consignee.MobilePhone,callback:function(e){t.$set(t.Consignee,"MobilePhone",e)},expression:"Consignee.MobilePhone"}})],1),t._v(" "),i("div",{staticClass:"consignee"},[i("span",[t._v("电话：")]),t._v(" "),i("el-input",{attrs:{size:"mini"},model:{value:t.Consignee.Tel,callback:function(e){t.$set(t.Consignee,"Tel",e)},expression:"Consignee.Tel"}})],1),t._v(" "),i("div",{staticClass:"consignee"},[i("span",[t._v("邮箱：")]),t._v(" "),i("el-input",{attrs:{size:"mini"},model:{value:t.Consignee.EMail,callback:function(e){t.$set(t.Consignee,"EMail",e)},expression:"Consignee.EMail"}})],1),t._v(" "),i("div",{staticClass:"consignee",staticStyle:{width:"800px"}},[i("span",[t._v("地址：")]),t._v(" "),i("el-input",{attrs:{size:"mini"},model:{value:t.Consignee.Address,callback:function(e){t.$set(t.Consignee,"Address",e)},expression:"Consignee.Address"}})],1),t._v(" "),i("div",{staticStyle:{width:"98%",border:"1px solid #ccc",float:"left"}}),t._v(" "),0==t.State||1==t.State||2==t.State?i("el-button",{staticClass:"C33",attrs:{size:"mini",type:"danger"},on:{click:function(e){return t.SaveOrder(7)}}},[t._v("撤单")]):t._e(),t._v(" "),0==t.State?i("el-button",{staticClass:"C33",attrs:{size:"mini",type:"primary"},on:{click:function(e){return t.SaveOrder(1)}}},[t._v("确认")]):t._e(),t._v(" "),1==t.State||2==t.State?i("el-button",{staticClass:"C33",attrs:{size:"mini",type:"primary"},on:{click:function(e){return t.SaveOrder(2)}}},[t._v("报价")]):t._e(),t._v(" "),2==t.State?i("el-button",{staticClass:"C33",attrs:{size:"mini",type:"success"},on:{click:function(e){return t.SaveOrder(3)}}},[t._v("确认报价")]):t._e(),t._v(" "),3==t.State?i("el-button",{staticClass:"C33",attrs:{size:"mini",type:"primary"},on:{click:function(e){return t.SaveOrder(8)}}},[t._v("付款")]):t._e(),t._v(" "),1==t.State||2==t.State?i("el-button",{staticStyle:{float:"left",margin:"10px"},attrs:{size:"mini",type:"primary"},on:{click:t.SaveOrder}},[t._v("保存")]):t._e()],1),t._v(" "),i("el-dialog",{attrs:{title:"选择收货人",visible:t.dialogTableVisible,"modal-append-to-body":!1},on:{"update:visible":function(e){t.dialogTableVisible=e}}},[i("el-table",{attrs:{data:t.gridData},on:{"row-click":t.ConsigneeS}},[i("el-table-column",{attrs:{property:"Name",label:"姓名",width:"100"}}),t._v(" "),i("el-table-column",{attrs:{property:"Mobile",label:"手机",width:"100"}}),t._v(" "),i("el-table-column",{attrs:{property:"Email",label:"邮箱",width:"260"}}),t._v(" "),i("el-table-column",{attrs:{property:"Address",label:"地址"}})],1)],1)],1)},staticRenderFns:[]};var c=i("VU/8")(r,u,!1,function(t){i("IUPJ")},"data-v-59973258",null);e.default=c.exports}});