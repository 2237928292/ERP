webpackJsonp([43],{ZkR9:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={name:"",data:function(){return{State:0,StateActive:0,Data:{},imgList:[],imageUrl:{},dialogVisibleMainGraph:!1,WoCodeCost:0,InState:"请选择在保状态",options:[{value:!0,label:"在保"},{value:!1,label:"不在保"}],Memo:"",Content:"",ActualCharge:"",DiscountFinalCharge:"",SName:"保存"}},created:function(){this.init()},components:{},methods:{init:function(){var t=this,e={url:this.$store.state.http+"WO/GetSRWODetail",api:"get",data:{woId:this.$store.state.Vuex.Id}};this.$https(e).then(function(e){console.log(e.Data),t.Data=e.Data;for(var a=0;a<t.Data.RepairCosts.length;a++){var i=t.Data.RepairCosts[a];i.TravelTravelInfo=i.Travel+" - "+i.TravelInfo}t.Memo=e.Data.RepairProcess.Memo,t.State=e.Data.RepairProcess.State,console.log("当前订单状态："+t.State);for(var s=[2,19,14,15,16,44,20,46,43,21,22],o=0;o<s.length;o++)t.State==s[o]&&(t.StateActive=o+1);console.log("我的状态:"+t.StateActive),1!=t.StateActive&&2!=t.StateActive||(t.SName="确认在保状态"),5!=t.StateActive&&8!=t.StateActive||(t.SName="转物流"),6==t.StateActive&&(t.SName="追加报价"),7==t.StateActive&&(t.SName="追加报价收款")})},Save:function(){var t=this;
//! 已受理
if(1==this.StateActive||2==this.StateActive){if(console.log(this.InState),console.log(this.itemID),"请选择在保状态"==this.InState)return this.$look("warning","警告！","请选择是否在保！"),!1;var e={url:this.$store.state.http+"WO/SRUnderInsurance",api:"post",data:{Id:this.Data.RepairProcess.WOId,Type:this.InState?1:0,Str:this.Memo}};this.$https(e).then(function(e){console.log(e.Data),t.$look("success","成功！","操作成功！"),t.$emit("refresh"),t.$router.push({path:"/WorkOrderTask"})})}if(5==this.StateActive||8==this.StateActive){e={url:this.$store.state.http+"WO/WOGotoLogistics",api:"post",data:{Id:this.Data.RepairProcess.WOId,Str:this.Memo}};this.$https(e).then(function(e){console.log(e.Data),t.$look("success","成功！","操作成功！"),t.$emit("refresh"),t.$router.push({path:"/WorkOrderTask"})})}if(6==this.StateActive){e={url:this.$store.state.http+"WO/QuoteFinal",api:"post",data:{WoId:this.Data.RepairProcess.WOId,ActualCharge:this.ActualCharge,DiscountFinalCharge:this.DiscountFinalCharge,Memo:this.Memo}};this.$https(e).then(function(e){console.log(e.Data),t.$look("success","成功！","操作成功！"),t.init()})}if(7==this.StateActive){e={url:this.$store.state.http+"WO/FSFinalConfirm",api:"post",data:{Id:this.Data.RepairProcess.WOId}};this.$https(e).then(function(e){console.log(e.Data),t.$look("success","成功！","操作成功！"),t.init()})}},MaintenanceCompleted:function(){var t=this,e={url:this.$store.state.http+"WO/SRFinishWO",api:"post",data:{Id:this.Data.RepairProcess.WOId,Str:this.Memo,Type:this.Content}};this.$https(e).then(function(e){console.log(e.Data),t.$look("success","成功！","操作成功！"),t.$emit("refresh"),t.$router.push({path:"/WorkOrderTask"})})},CreateAnOrder:function(){var t=this,e={url:this.$store.state.http+"WO/SRCreateSO",api:"post",data:{Id:this.Data.RepairProcess.WOId,Str:this.Memo}};this.$https(e).then(function(e){console.log(e.Data),t.$store.state.Vuex.SOId=e.Data,t.$router.push({path:"/EditOrder"}),t.$look("success","成功！","操作成功！"),t.init()})},IMGVIDEO:function(t){console.log(t),this.imageUrl=t,this.dialogVisibleMainGraph=!0},EndWorkOrder:function(){var t=this,e={url:this.$store.state.http+"WO/EndWorkOrder",api:"post",data:{Id:this.Data.RepairProcess.WOId,Str:this.Memo}};this.$https(e).then(function(e){console.log(e.Data),t.$look("success","成功！","操作成功！"),t.init()})},FSFinalConfirm:function(){var t=this,e={url:this.$store.state.http+"WO/FSFinalConfirm",api:"post",data:{Id:this.Data.RepairProcess.WOId}};this.$https(e).then(function(e){console.log(e.Data),t.$look("success","成功！","操作成功！"),t.init()})}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"box_s"},[13!=t.StateActive?a("el-steps",{attrs:{active:t.StateActive,id:"BottomTextStopes"}},[a("el-step",{attrs:{icon:"el-icon-caret-bottom",description:"已受理"}}),t._v(" "),a("el-step",{attrs:{icon:"el-icon-caret-bottom",description:"已收到设备"}}),t._v(" "),a("el-step",{attrs:{icon:"el-icon-caret-bottom",description:"在保状态已确认"}}),t._v(" "),a("el-step",{attrs:{icon:"el-icon-caret-bottom",description:"已选小件"}}),t._v(" "),a("el-step",{attrs:{icon:"el-icon-caret-bottom",description:"维修完毕"}}),t._v(" "),a("el-step",{attrs:{icon:"el-icon-caret-bottom",description:"待报最终价"}}),t._v(" "),a("el-step",{attrs:{icon:"el-icon-caret-bottom",description:"已报最终价"}}),t._v(" "),a("el-step",{attrs:{icon:"el-icon-caret-bottom",description:"已收款"}}),t._v(" "),a("el-step",{attrs:{icon:"el-icon-caret-bottom",description:"已转至物流部"}}),t._v(" "),a("el-step",{attrs:{icon:"el-icon-caret-bottom",description:"已结单"}})],1):t._e(),t._v(" "),11==t.StateActive?a("el-steps",{attrs:{active:1,"finish-status":"error",id:"BottomTextStopes"}},[a("el-step",{attrs:{icon:"el-icon-caret-bottom",description:"已撤单"}})],1):t._e(),t._v(" "),a("div",{staticClass:"boxj4bjb5hv65k43n53"},[t.Data.RepairBase?a("div",[a("div",{staticClass:"segmentation"},[t._v("\n        客户信息 【"+t._s(t.Data.RepairBase.CusName)+"】\n      ")]),t._v(" "),a("div",{staticClass:"itemmsgxx_document",staticStyle:{width:"100%"}},[a("p",[a("span",[t._v("报修单号:")]),t._v(t._s(t.Data.RepairBase.RepairCode))])]),t._v(" "),a("div",{staticClass:"itemmsgxx_document"},[a("p",[a("span",[t._v("报修人:")]),t._v(t._s(t.Data.RepairMan.RepairName))])]),t._v(" "),a("div",{staticClass:"itemmsgxx_document"},[a("p",[a("span",[t._v("英文名:")]),t._v(t._s(t.Data.RepairMan.RepairNameEn))])]),t._v(" "),a("div",{staticClass:"itemmsgxx_document"},[a("p",[a("span",[t._v("手机号码:")]),t._v(t._s(t.Data.RepairMan.MobilePhone))])]),t._v(" "),a("div",{staticClass:"itemmsgxx_document"},[a("p",[a("span",[t._v("固定号码:")]),t._v(t._s(t.Data.RepairMan.Tel))])]),t._v(" "),a("div",{staticClass:"itemmsgxx_document",staticStyle:{width:"600px"}},[a("p",[a("span",[t._v("邮箱:")]),t._v(t._s(t.Data.RepairMan.Email))])]),t._v(" "),a("div",{staticClass:"itemmsgxx_document",staticStyle:{width:"600px"}},[a("p",[a("span",[t._v("公司地址:")]),t._v(t._s(t.Data.RepairMan.AddressDetail))])]),t._v(" "),a("div",{staticClass:"itemmsgxx_documentText"},[a("p",{staticStyle:{"word-break":"break-all"}},[a("span",[t._v("客户备注:")]),t._v(t._s(t.Data.RepairBase.Remark))])])]):t._e(),t._v(" "),t.Data.RepairDeviceInfo?a("div",[a("div",{staticClass:"segmentation"},[t._v("\n        故障设备\n      ")]),t._v(" "),a("div",{staticClass:"itemmsgxx_document"},[a("p",[a("span",[t._v("产品编号:")]),t._v(t._s(t.Data.RepairDeviceInfo.DeviceCode))])]),t._v(" "),a("div",{staticClass:"itemmsgxx_document"},[a("p",[a("span",[t._v("序列号:")]),t._v(t._s(t.Data.RepairDeviceInfo.DeviceSN))])]),t._v(" "),a("div",{staticClass:"itemmsgxx_document"},[a("p",[a("span",[t._v("设备品牌:")]),t._v(t._s(t.Data.RepairDeviceInfo.DeviceBrand))])]),t._v(" "),a("div",{staticClass:"itemmsgxx_document",staticStyle:{width:"100%"}},[a("p",[a("span",[t._v("设备描述:")]),t._v(t._s(t.Data.RepairDeviceInfo.DeviceDesc))])]),t._v(" "),a("div",{staticClass:"itemmsgxx_documentText"},[a("p",{staticStyle:{"word-break":"break-all"}},[a("span",[t._v("故障描述:")]),t._v(t._s(t.Data.RepairBase.FaultDescribe))])])]):t._e(),t._v(" "),t.Data.RepairDeviceInfo?a("div",[a("div",{staticClass:"segmentation"},[t._v("\n        故障图片&视频\n      ")]),t._v(" "),t._l(t.Data.RepairFaultImages,function(e,i){return a("div",{key:i,staticClass:"demo-image__preview",staticStyle:{width:"200px",float:"left"},on:{click:function(a){return t.IMGVIDEO(e)}}},["picture"==e.Type?a("el-image",{staticStyle:{width:"100px",height:"100px"},attrs:{src:e.Path,fit:"fill","preview-src-list":t.imgList}}):t._e()],1)}),t._v(" "),t._l(t.Data.RepairFaultImages,function(e,i){return a("div",{key:i+123,staticClass:"demo-image__preview",staticStyle:{width:"200px",float:"left"},on:{click:function(e){return t.IMGVIDEO(t.upload)}}},["video"==e.Type?a("video",{staticClass:"avatar video-avatar",staticStyle:{width:"100%"},attrs:{src:e.Path,controls:"controls"}},[t._v("\n          您的浏览器不支持视频播放\n        ")]):t._e()])})],2):t._e(),t._v(" "),a("el-dialog",{staticClass:"spc12",attrs:{visible:t.dialogVisibleMainGraph,"modal-append-to-body":!1},on:{"update:visible":function(e){t.dialogVisibleMainGraph=e}}},["video/mp4"!=t.imageUrl.type?a("img",{attrs:{width:"100%",src:t.imageUrl.Path,alt:""}}):t._e(),t._v(" "),"video/mp4"==t.imageUrl.type?a("video",{staticClass:"avatar video-avatar",attrs:{src:t.imageUrl.Path,controls:"controls"}},[t._v("\n        您的浏览器不支持视频播放\n      ")]):t._e()]),t._v(" "),t.Data.RepairCosts?a("div",[a("div",{staticClass:"segmentation"},[t._v("\n        费用清单\n      ")]),t._v(" "),a("el-table",{staticStyle:{width:"100%",paddingLeft:"50px",fontSize:"12px"},attrs:{data:t.Data.RepairCosts}},[a("el-table-column",{attrs:{prop:"OrderTypeStr",label:"工单类型",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"WoCode",label:"工单单号",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"TravelTravelInfo",label:"差旅费",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"Service",label:"服务费"}}),t._v(" "),a("el-table-column",{attrs:{prop:"Cost",label:"合计"}})],1)],1):t._e(),t._v(" "),t.StateActive>4?a("div",[a("div",{staticClass:"segmentation"},[t._v("\n        工程师\n      ")]),t._v(" "),a("div",{staticClass:"itemmsgxx_document"},[a("p",[a("span",[t._v("工程师:")]),t._v(t._s(t.Data.RepairProcess.Enginner))])]),t._v(" "),a("div",{staticClass:"itemmsgxx_documentText"},[a("p",{staticStyle:{"word-break":"break-all"}},[a("span",[t._v("工作内容:")]),t._v(t._s(t.Data.RepairProcess.WorkContent))])])]):t._e(),t._v(" "),t.StateActive>2?a("div",[a("div",{staticClass:"segmentation"},[t._v("\n        在保状态\n      ")]),t._v(" "),a("div",{staticClass:"itemmsgxx_document"},[a("p",[a("span",[t._v("在保状态:")]),t._v(t._s(t.Data.RepairProcess.IsUnderWarranty?"在保":"不在保"))])])]):t._e(),t._v(" "),t.StateActive>5?a("div",[a("div",{staticClass:"segmentation"},[t._v("\n        追加报价\n      ")]),t._v(" "),6==t.StateActive?a("div",{staticClass:"itemmsgxx_document"},[a("span",{staticStyle:{float:"left"}},[t._v("追加报价:")]),t._v(" "),a("el-input",{staticStyle:{width:"193px",float:"left"},attrs:{size:"mini",placeholder:""},model:{value:t.ActualCharge,callback:function(e){t.ActualCharge=e},expression:"ActualCharge"}})],1):t._e(),t._v(" "),t.StateActive>6?a("div",{staticClass:"itemmsgxx_document"},[a("p",[a("span",[t._v("追加报价：")]),t._v(t._s(t.Data.RepairProcess.ActualCharge))])]):t._e()]):t._e(),t._v(" "),1==t.StateActive||2==t.StateActive?a("div",[a("div",{staticClass:"segmentation"},[t._v("\n        选择在保状态\n        ")]),t._v(" "),a("div",{staticClass:"itemmsgxx_documentSece"},[a("span",{staticClass:"leftSpan"},[t._v("在保状态:")]),t._v(" "),a("el-select",{staticStyle:{width:"150px"},attrs:{size:"mini",placeholder:"请选择"},model:{value:t.InState,callback:function(e){t.InState=e},expression:"InState"}},t._l(t.options,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1)]):t._e(),t._v(" "),a("div",[a("div",{staticClass:"segmentation"},[t._v("\n        备注\n        ")]),t._v(" "),a("el-input",{staticStyle:{float:"left",width:"500px",margin:"10px"},attrs:{type:"textarea",autosize:{minRows:2,maxRows:10},placeholder:"备注"},model:{value:t.Memo,callback:function(e){t.Memo=e},expression:"Memo"}})],1),t._v(" "),3==t.StateActive||4==t.StateActive?a("div",[a("div",{staticClass:"segmentation"},[t._v("\n        工作内容\n        ")]),t._v(" "),a("el-input",{staticStyle:{float:"left",width:"500px",margin:"10px"},attrs:{type:"textarea",autosize:{minRows:2,maxRows:10},placeholder:"工作内容"},model:{value:t.Content,callback:function(e){t.Content=e},expression:"Content"}})],1):t._e(),t._v(" "),a("div",{staticStyle:{width:"99%",height:"2px",float:"left",marginBottom:"100px"}},[1==t.StateActive||2==t.StateActive||5==t.StateActive||6==t.StateActive||7==t.StateActive||8==t.StateActive?a("el-button",{staticStyle:{margin:"10px",float:"right"},attrs:{loading:this.$store.state.Vuex.loading,type:"primary",size:"mini"},on:{click:t.Save}},[t._v("\n        "+t._s(t.SName))]):t._e(),t._v(" "),3==t.StateActive||4==t.StateActive?a("el-button",{staticStyle:{margin:"10px",float:"right"},attrs:{loading:this.$store.state.Vuex.loading,type:"primary",size:"mini"},on:{click:t.MaintenanceCompleted}},[t._v("维修完毕")]):t._e(),t._v(" "),3==t.StateActive?a("el-button",{staticStyle:{margin:"10px",float:"right"},attrs:{loading:this.$store.state.Vuex.loading,type:"success",size:"mini"},on:{click:t.CreateAnOrder}},[t._v("创建订单")]):t._e(),t._v(" "),11==t.StateActive?a("el-button",{staticStyle:{margin:"10px",float:"right"},attrs:{loading:this.$store.state.Vuex.loading,type:"primary",size:"mini"},on:{click:t.EndWorkOrder}},[t._v("结单")]):t._e()],1)],1)],1)},staticRenderFns:[]};var o=a("VU/8")(i,s,!1,function(t){a("bMAv")},"data-v-71ff3482",null);e.default=o.exports},bMAv:function(t,e){}});