webpackJsonp([29],{FuV0:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("PXCl").Base64,s={name:"",data:function(){return{State:0,StateActive:0,Data:{},imgList:[],imageUrl:{},dialogVisibleMainGraph:!1,WoCodeCost:0,InState:"请选择在保状态",options:[{value:!0,label:"在保"},{value:!1,label:"不在保"}],TravelAmount:"",TravelAmounts:"",itemID:"",Memo:"",ActualCharge:"",DiscountFinalCharge:"",SName:"保存",TravelPriceOffer:""}},created:function(){this.init()},components:{},methods:{init:function(){var t=this,e={url:this.$store.state.http+"WO/GetRepairWODetail",api:"get",data:{woId:this.$store.state.Vuex.Id}};this.$https(e).then(function(e){console.log(e.Data),t.Data=e.Data;for(var a=0;a<t.Data.RepairCosts.length;a++){var i=t.Data.RepairCosts[a];i.TravelTravelInfo=i.Travel+" - "+i.TravelInfo}t.Memo=e.Data.RepairProcess.Memo,t.State=e.Data.RepairProcess.State,console.log("当前订单状态："+t.State);for(var s=[1,4,5,6,7,8,47,48,9,10,11,12,13],o=0;o<s.length;o++)t.State==s[o]&&(t.StateActive=o+1);if(console.log("我的状态:"+t.StateActive),1==t.StateActive&&(t.SName="报差旅费"),4==t.StateActive&&(t.SName="确认预报价"),4==t.StateActive&&(t.SName="派送区域经理"),9==t.StateActive&&(t.SName="报最终价"),10==t.StateActive&&(t.SName="确认最终价"),t.Data.RepairCosts)for(var n=0;n<t.Data.RepairCosts.length;n++)t.WoCodeCost+=t.Data.RepairCosts[n].Cost})},TravelForOnSiteMaintenance:function(t){console.log(t.WOId);var e=this.$router.resolve({path:this.$store.state.Vuex.TencentServer+"/List/TravelForOnSiteMaintenance.html",query:{url:i.encodeURI(this.$store.state.http+"WO/GetQutuoTrave"),ID:i.encodeURI(t.WOId),token:i.encodeURI(localStorage.getItem("token"))}}).href;console.log(e.slice(2)),window.open(e.slice(2),"_blank")},querySearch:function(t,e){"0"==t&&(t="");var a={data:{province:"",City:t},api:"get",url:this.$store.state.http+"System/GetTravelExpenses"};this.$https(a).then(function(t){console.log(t.Data);for(var a=0;a<t.Data.length;a++)t.Data[a].value=t.Data[a].City+" - "+t.Data[a].Price;console.log(t.Data),e(t.Data)})},handleSelect:function(t){this.itemID=t.ID,this.TravelAmounts=t.Price},Qingk:function(){this.TravelAmounts="",this.TravelAmount="",this.itemID=""},InoutgB:function(t){console.log(t),2==t.split("-").length||(this.TravelAmounts=t)},Save:function(){var t=this;
//! 已受理
if(console.log(this.StateActive),1==this.StateActive){if(console.log(this.InState),console.log(this.itemID),"请选择在保状态"==this.InState)return this.$look("warning","警告！","请选择是否在保！"),!1;if(""==this.TravelPriceOffer)return this.$look("warning","警告！","请输入报价单号!"),!1;var e={url:this.$store.state.http+"WO/QutuoTravel",api:"post",data:{WoId:this.Data.RepairProcess.WOId,TravelId:this.itemID,IsUnderWarranty:this.InState,TravelPriceOffer:this.TravelPriceOffer,Memo:this.Memo}};this.$https(e).then(function(e){console.log(e.Data),t.$look("success","成功！","操作成功！"),t.init()})}if(4==this.StateActive){e={url:this.$store.state.http+"WO/ServerToArea",api:"post",data:{Id:this.Data.RepairProcess.WOId}};this.$https(e).then(function(e){t.$look("success","成功！","操作成功！"),console.log(e.Data),t.$emit("refresh"),t.$router.push({path:"/WorkOrderTask"})})}if(9==this.StateActive&&this.QuoteFinal(),10==this.StateActive&&this.FSFinalConfirm(),4==this.StateActive){e={url:this.$store.state.http+"WO/WOConfirmQuote",api:"post",data:{Id:this.Data.RepairProcess.WOId,IsAccept:!0}};this.$https(e).then(function(e){t.$look("success","成功！","操作成功！"),console.log(e.Data),t.init()})}},IMGVIDEO:function(t){console.log(t),this.imageUrl=t,this.dialogVisibleMainGraph=!0},EndWorkOrder:function(){var t=this,e={url:this.$store.state.http+"WO/EndWorkOrder",api:"post",data:{Id:this.Data.RepairProcess.WOId,Str:this.Memo}};this.$https(e).then(function(e){console.log(e.Data),t.$look("success","成功！","操作成功！"),t.init()})},QuoteFinal:function(){var t=this,e={url:this.$store.state.http+"WO/QuoteFinal",api:"post",data:{WoId:this.Data.RepairProcess.WOId,ActualCharge:this.ActualCharge,DiscountFinalCharge:this.DiscountFinalCharge,Memo:this.Memo}};this.$https(e).then(function(e){console.log(e.Data),t.$look("success","成功！","操作成功！"),t.init()})},FSFinalConfirm:function(){var t=this,e={url:this.$store.state.http+"WO/FSFinalConfirm",api:"post",data:{Id:this.Data.RepairProcess.WOId}};this.$https(e).then(function(e){console.log(e.Data),t.$look("success","成功！","操作成功！"),t.init()})}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"box_s"},[13!=t.StateActive?a("el-steps",{attrs:{active:t.StateActive,id:"BottomTextStopes"}},[a("el-step",{attrs:{icon:"el-icon-caret-bottom",description:"已受理"}}),t._v(" "),a("el-step",{attrs:{icon:"el-icon-caret-bottom",description:"在保状态已确认"}}),t._v(" "),a("el-step",{attrs:{icon:"el-icon-caret-bottom",description:"已预报价"}}),t._v(" "),a("el-step",{attrs:{icon:"el-icon-caret-bottom",description:"预报价已确认"}}),t._v(" "),a("el-step",{attrs:{icon:"el-icon-caret-bottom",description:"已指派工程师"}}),t._v(" "),a("el-step",{attrs:{icon:"el-icon-caret-bottom",description:"已接受任务"}}),t._v(" "),a("el-step",{attrs:{icon:"el-icon-caret-bottom",description:"已出发"}}),t._v(" "),a("el-step",{attrs:{icon:"el-icon-caret-bottom",description:"已到达"}}),t._v(" "),a("el-step",{attrs:{icon:"el-icon-caret-bottom",description:"工作已完成"}}),t._v(" "),a("el-step",{attrs:{icon:"el-icon-caret-bottom",description:"已报最终价"}}),t._v(" "),a("el-step",{attrs:{icon:"el-icon-caret-bottom",description:"最终价已确认"}}),t._v(" "),a("el-step",{attrs:{icon:"el-icon-caret-bottom",description:"已结单"}})],1):t._e(),t._v(" "),13==t.StateActive?a("el-steps",{attrs:{active:1,"finish-status":"error",id:"BottomTextStopes"}},[a("el-step",{attrs:{icon:"el-icon-caret-bottom",description:"已撤单"}})],1):t._e(),t._v(" "),a("div",{staticClass:"boxj4bjb5hv65k43n53"},[t.Data.RepairBase?a("div",[a("div",{staticClass:"segmentation"},[t._v("\n        客户信息 【"+t._s(t.Data.RepairBase.CusName)+"】\n      ")]),t._v(" "),a("div",{staticClass:"itemmsgxx_document",staticStyle:{width:"100%"}},[a("p",[a("span",[t._v("报修单号:")]),t._v(t._s(t.Data.RepairBase.RepairCode))])]),t._v(" "),a("div",{staticClass:"itemmsgxx_document"},[a("p",[a("span",[t._v("报修人:")]),t._v(t._s(t.Data.RepairMan.RepairName))])]),t._v(" "),a("div",{staticClass:"itemmsgxx_document"},[a("p",[a("span",[t._v("英文名:")]),t._v(t._s(t.Data.RepairMan.RepairNameEn))])]),t._v(" "),a("div",{staticClass:"itemmsgxx_document"},[a("p",[a("span",[t._v("手机号码:")]),t._v(t._s(t.Data.RepairMan.MobilePhone))])]),t._v(" "),a("div",{staticClass:"itemmsgxx_document"},[a("p",[a("span",[t._v("固定号码:")]),t._v(t._s(t.Data.RepairMan.Tel))])]),t._v(" "),a("div",{staticClass:"itemmsgxx_document",staticStyle:{width:"600px"}},[a("p",[a("span",[t._v("邮箱:")]),t._v(t._s(t.Data.RepairMan.Email))])]),t._v(" "),a("div",{staticClass:"itemmsgxx_document",staticStyle:{width:"600px"}},[a("p",[a("span",[t._v("公司地址:")]),t._v(t._s(t.Data.RepairMan.AddressDetail))])]),t._v(" "),a("div",{staticClass:"itemmsgxx_documentText"},[a("p",{staticStyle:{"word-break":"break-all"}},[a("span",[t._v("客户备注:")]),t._v(t._s(t.Data.RepairBase.Remark))])])]):t._e(),t._v(" "),t.Data.RepairDeviceInfo?a("div",[a("div",{staticClass:"segmentation"},[t._v("\n        故障设备\n      ")]),t._v(" "),a("div",{staticClass:"itemmsgxx_document"},[a("p",[a("span",[t._v("产品编号:")]),t._v(t._s(t.Data.RepairDeviceInfo.DeviceCode))])]),t._v(" "),a("div",{staticClass:"itemmsgxx_document"},[a("p",[a("span",[t._v("序列号:")]),t._v(t._s(t.Data.RepairDeviceInfo.DeviceSN))])]),t._v(" "),a("div",{staticClass:"itemmsgxx_document"},[a("p",[a("span",[t._v("设备品牌:")]),t._v(t._s(t.Data.RepairDeviceInfo.DeviceBrand))])]),t._v(" "),a("div",{staticClass:"itemmsgxx_document",staticStyle:{width:"100%"}},[a("p",[a("span",[t._v("设备描述:")]),t._v(t._s(t.Data.RepairDeviceInfo.DeviceDesc))])]),t._v(" "),a("div",{staticClass:"itemmsgxx_documentText"},[a("p",{staticStyle:{"word-break":"break-all"}},[a("span",[t._v("故障描述:")]),t._v(t._s(t.Data.RepairBase.FaultDescribe))])])]):t._e(),t._v(" "),t.Data.RepairDeviceInfo?a("div",[a("div",{staticClass:"segmentation"},[t._v("\n        故障图片&视频\n      ")]),t._v(" "),t._l(t.Data.RepairFaultImages,function(e,i){return a("div",{key:i,staticClass:"demo-image__preview",staticStyle:{width:"200px",float:"left"},on:{click:function(a){return t.IMGVIDEO(e)}}},["picture"==e.Type?a("el-image",{staticStyle:{width:"100px",height:"100px"},attrs:{src:e.Path,fit:"fill","preview-src-list":t.imgList}}):t._e()],1)}),t._v(" "),t._l(t.Data.RepairFaultImages,function(e,i){return a("div",{key:i+123,staticClass:"demo-image__preview",staticStyle:{width:"200px",float:"left"},on:{click:function(e){return t.IMGVIDEO(t.upload)}}},["video"==e.Type?a("video",{staticClass:"avatar video-avatar",staticStyle:{width:"100%"},attrs:{src:e.Path,controls:"controls"}},[t._v("\n          您的浏览器不支持视频播放\n        ")]):t._e()])})],2):t._e(),t._v(" "),a("el-dialog",{staticClass:"spc12",attrs:{visible:t.dialogVisibleMainGraph,"modal-append-to-body":!1},on:{"update:visible":function(e){t.dialogVisibleMainGraph=e}}},["video/mp4"!=t.imageUrl.type?a("img",{attrs:{width:"100%",src:t.imageUrl.Path,alt:""}}):t._e(),t._v(" "),"video/mp4"==t.imageUrl.type?a("video",{staticClass:"avatar video-avatar",attrs:{src:t.imageUrl.Path,controls:"controls"}},[t._v("\n        您的浏览器不支持视频播放\n      ")]):t._e()]),t._v(" "),t.Data.RepairCosts?a("div",[a("div",{staticClass:"segmentation"},[t._v("\n        费用清单\n      ")]),t._v(" "),a("el-table",{staticStyle:{width:"100%",paddingLeft:"50px",fontSize:"12px"},attrs:{data:t.Data.RepairCosts},on:{"row-click":t.TravelForOnSiteMaintenance}},[a("el-table-column",{attrs:{prop:"OrderTypeStr",label:"工单类型",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"WoCode",label:"工单单号",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"TravelTravelInfo",label:"差旅费",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"Service",label:"服务费"}}),t._v(" "),a("el-table-column",{attrs:{prop:"QupteCode",label:"报价单号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"Cost",label:"合计"}}),t._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"报价单",width:"150"}},[[a("p",{staticStyle:{color:"#409EFF"}},[t._v("点击查看报价单")])]],2)],1)],1):t._e(),t._v(" "),t.StateActive>4?a("div",[a("div",{staticClass:"segmentation"},[t._v("\n        工程师\n      ")]),t._v(" "),a("div",{staticClass:"itemmsgxx_document"},[a("p",[a("span",[t._v("工程师:")]),t._v(t._s(t.Data.RepairProcess.Enginner))])]),t._v(" "),a("div",{staticClass:"itemmsgxx_documentText"},[a("p",{staticStyle:{"word-break":"break-all"}},[a("span",[t._v("备注:")]),t._v(t._s(t.Data.RepairProcess.WorkContent))])])]):t._e(),t._v(" "),t.StateActive>8?a("div",[a("div",{staticClass:"segmentation"},[t._v("\n        最终价\n      ")]),t._v(" "),9==t.StateActive||10==t.StateActive?a("div",{staticClass:"itemmsgxx_document"},[a("span",{staticStyle:{float:"left"}},[t._v("最终价:")]),t._v(" "),a("el-input",{staticStyle:{width:"193px",float:"left"},attrs:{size:"mini",placeholder:""},model:{value:t.ActualCharge,callback:function(e){t.ActualCharge=e},expression:"ActualCharge"}})],1):t._e(),t._v(" "),9==t.StateActive||10==t.StateActive?a("div",{staticClass:"itemmsgxx_document"},[a("span",[t._v("最终优惠价:")]),t._v(" "),a("el-input",{staticStyle:{width:"193px"},attrs:{size:"mini",placeholder:""},model:{value:t.DiscountFinalCharge,callback:function(e){t.DiscountFinalCharge=e},expression:"DiscountFinalCharge"}})],1):t._e(),t._v(" "),t.StateActive>10?a("div",{staticClass:"itemmsgxx_document"},[a("p",[a("span",[t._v("最终价：")]),t._v(t._s(t.Data.RepairProcess.ActualCharge))])]):t._e(),t._v(" "),t.StateActive>10?a("div",{staticClass:"itemmsgxx_document"},[a("p",[a("span",[t._v("最终优惠价：")]),t._v(t._s(t.Data.RepairProcess.DiscountFinalCharge))])]):t._e()]):t._e(),t._v(" "),a("div",[a("div",{staticClass:"segmentation"},[t._v("\n        差旅费报价单\n      ")]),t._v(" "),1==t.StateActive?a("div",{staticClass:"itemmsgxx_document"},[a("span",[t._v("差旅费报价单:")]),t._v(" "),a("el-input",{staticStyle:{width:"193px"},attrs:{size:"mini",placeholder:""},model:{value:t.TravelPriceOffer,callback:function(e){t.TravelPriceOffer=e},expression:"TravelPriceOffer"}})],1):t._e()]),t._v(" "),a("div",[a("div",{staticClass:"segmentation"},[t._v("\n        在保状态\n        ")]),t._v(" "),1==t.State?a("div",{staticClass:"itemmsgxx_documentSece"},[a("span",{staticClass:"leftSpan"},[t._v("选择在保状态:")]),t._v(" "),a("el-select",{staticStyle:{width:"150px"},attrs:{size:"mini",placeholder:"请选择"},model:{value:t.InState,callback:function(e){t.InState=e},expression:"InState"}},t._l(t.options,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1):t._e(),t._v(" "),1!=t.State&&t.Data.RepairProcess?a("div",{staticClass:"itemmsgxx_document"},[a("p",[a("span",[t._v("在保状态:")]),t._v(t._s(t.Data.RepairProcess.IsUnderWarranty?"在保":"不在保"))])]):t._e()]),t._v(" "),1==t.State?a("div",[a("div",{staticClass:"segmentation"},[t._v("\n        选择差旅费\n        ")]),t._v(" "),a("el-autocomplete",{staticClass:"inline-input",staticStyle:{width:"250px",float:"left",margin:"10px"},attrs:{size:"mini","show-overflow-tooltip":!0,"fetch-suggestions":t.querySearch,placeholder:"请选择市区",clearable:"","automatic-dropdown":!0},on:{select:t.handleSelect,clear:t.Qingk,input:t.InoutgB},model:{value:t.TravelAmount,callback:function(e){t.TravelAmount=e},expression:"TravelAmount"}},[a("template",{slot:"prepend"},[t._v("差旅费：￥")])],2)],1):t._e(),t._v(" "),a("div",[a("div",{staticClass:"segmentation"},[t._v("\n        备注\n        ")]),t._v(" "),a("el-input",{staticStyle:{float:"left",width:"500px",margin:"10px"},attrs:{type:"textarea",autosize:{minRows:2,maxRows:10},placeholder:"备注"},model:{value:t.Memo,callback:function(e){t.Memo=e},expression:"Memo"}})],1),t._v(" "),a("div",{staticStyle:{width:"99%",height:"2px",float:"left",marginBottom:"100px"}},[1==t.StateActive||4==t.StateActive&&!this.Data.RepairProcess.ServiceToArea||9==t.StateActive||10==t.StateActive?a("el-button",{staticStyle:{margin:"10px",float:"right"},attrs:{loading:this.$store.state.Vuex.loading,type:"primary",size:"mini"},on:{click:t.Save}},[t._v("\n        "+t._s(t.SName))]):t._e(),t._v(" "),11==t.StateActive?a("el-button",{staticStyle:{margin:"10px",float:"right"},attrs:{loading:this.$store.state.Vuex.loading,type:"primary",size:"mini"},on:{click:t.EndWorkOrder}},[t._v("结单")]):t._e()],1)],1)],1)},staticRenderFns:[]};var n=a("VU/8")(s,o,!1,function(t){a("ZgZB")},"data-v-ada077da",null);e.default=n.exports},ZgZB:function(t,e){}});