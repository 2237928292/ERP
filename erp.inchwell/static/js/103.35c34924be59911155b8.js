webpackJsonp([103],{k8Jc:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("a52U"),i=e.n(s),l={name:"registeredstart",data:function(){return{CusData:{FullName:"",Type:"",FullNameEnglish:"",ShortName:"",Description:"",LegalPerson:"",LegalPersonTel:"",FoundDate:"",Address:"",ReturnVisit:21,AddressCode:[],ReturnEnginner:"",ServiceRegional:"",Characteristics:"",Province:""},from:{input:""},token:localStorage.getItem("token"),howregion:[],axx:[],Customercharacteristics:["普通","VIP","钣喷","VIP与钣喷"],CUstomerType:["宝马","保时捷","奥迪","奔驰","劳斯莱斯","路虎","自由市场","其他"],dialogTableVisible:!1,GcsListData:[],GCS:[],GCSID:""}},mounted:function(){},created:function(){this.axx=i.a,this.initGetArea()},methods:{handleClose:function(t){var a=this;this.$confirm("确认关闭？").then(function(e){t(),a.value=""}).catch(function(t){})},TF:function(){return""==this.CusData.FullName?(this.$look("warning","提示！","请输入客户全名！"),!1):""==this.CusData.Type?(this.$look("warning","提示！","请选择客户类型！"),!1):""==this.CusData.FullNameEnglish?(this.$look("warning","提示！","请输入客户英文名！"),!1):""==this.CusData.ShortName?(this.$look("warning","提示！","请输入客户简称！"),!1):""==this.CusData.ServiceRegional?(this.$look("warning","提示！","请选择客户隶属区域！"),!1):this.CusData.AddressCode==[]||null==this.CusData.AddressCode||0==this.CusData.AddressCode.length?(this.$look("warning","提示！","请选择省区级！"),!1):""==this.CusData.Address?(this.$look("warning","提示！","请输入客户地址！"),!1):""==this.CusData.FullName||""==this.CusData.Type||""==this.CusData.FullNameEnglish||""==this.CusData.ShortName||""==this.CusData.ServiceRegional||""==this.CusData.Address||this.CusData.AddressCode==[]||null==this.CusData.AddressCode||0==this.CusData.AddressCode.length?(this.$look("warning","提示！","请补全必填项！"),!1):void this.AddCus()},AddCus:function(){var t=this;console.log(this.CusData),this.GCSID;var a=this.CusData;a.ReturnEnginner=this.GCSID;var e={api:"post",url:this.$store.state.http+"CRM/AddCustomer",data:a};this.$https(e).then(function(a){console.log(a),t.$emit("refresh"),t.$router.push({path:"/CustomerMsg"})})},initGetArea:function(){var t=this,a={url:this.$store.state.http+"System/GetArea",api:"get"};this.$https(a).then(function(a){t.howregion=a.Data})},ReturnVisitCommissioner:function(){var t=this;if(console.log(this.CusData.ServiceRegional),""==this.CusData.ServiceRegional)return this.$look("warning","提示！","请先选择区域！"),!1;var a={api:"get",url:this.$store.state.http+"System/GetAreaEmployeeMini",data:{area:this.CusData.ServiceRegional}};this.$https(a).then(function(a){console.log(a.Data),t.GcsListData=a.Data,t.dialogTableVisible=!0})},TRUEGCS:function(){console.log(this.GCS),this.CusData.ReturnEnginner="",this.GCSID="";for(var t=0;t<this.GCS.length;t++)""==this.GCSID?(this.CusData.ReturnEnginner+=this.GCS[t].Name,this.GCSID+=this.GCS[t].EmployeeId):(this.CusData.ReturnEnginner+=","+this.GCS[t].Name,this.GCSID+=","+this.GCS[t].EmployeeId);this.dialogTableVisible=!1},changeFun:function(t){console.log(t),this.GCS=t}}},n={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"box_s box_22021_5_25"},[e("div",{staticClass:"NIE"},[e("div",{staticClass:"head"},[t._v("新增客户")]),t._v(" "),e("div",{staticClass:"inp BItian"},[e("p",{staticClass:"baiop"},[t._v("客户全名")]),t._v(" "),e("el-input",{staticStyle:{width:"50%"},attrs:{placeholder:"必填",size:"mini",clearable:""},model:{value:t.CusData.FullName,callback:function(a){t.$set(t.CusData,"FullName",a)},expression:"CusData.FullName"}})],1),t._v(" "),e("div",{staticClass:"inp"},[e("p",{staticClass:"baiop"},[t._v("客户类型")]),t._v(" "),e("div",{staticClass:"jains"},[e("el-select",{staticStyle:{width:"50%"},attrs:{size:"mini",clearable:"",placeholder:"必填"},model:{value:t.CusData.Type,callback:function(a){t.$set(t.CusData,"Type",a)},expression:"CusData.Type"}},t._l(t.CUstomerType,function(t,a){return e("el-option",{key:a,attrs:{label:t,value:t}})}),1)],1)]),t._v(" "),e("div",{staticClass:"inp"},[e("p",{staticClass:"baiop"},[t._v("客户英文名称")]),t._v(" "),e("el-input",{staticStyle:{width:"50%"},attrs:{placeholder:"必填",size:"mini",clearable:""},model:{value:t.CusData.FullNameEnglish,callback:function(a){t.$set(t.CusData,"FullNameEnglish",a)},expression:"CusData.FullNameEnglish"}})],1),t._v(" "),e("div",{staticClass:"inp"},[e("p",{staticClass:"baiop"},[t._v("客户简称")]),t._v(" "),e("el-input",{staticStyle:{width:"50%"},attrs:{placeholder:"必填",size:"mini",clearable:""},model:{value:t.CusData.ShortName,callback:function(a){t.$set(t.CusData,"ShortName",a)},expression:"CusData.ShortName"}})],1),t._v(" "),e("div",{staticClass:"inp"},[e("p",{staticClass:"baiop"},[t._v("售后总监")]),t._v(" "),e("el-input",{staticStyle:{width:"50%"},attrs:{placeholder:"选填",size:"mini",clearable:""},model:{value:t.CusData.LegalPerson,callback:function(a){t.$set(t.CusData,"LegalPerson",a)},expression:"CusData.LegalPerson"}})],1),t._v(" "),e("div",{staticClass:"inp"},[e("p",{staticClass:"baiop"},[t._v("售后总监电话")]),t._v(" "),e("el-input",{staticStyle:{width:"50%"},attrs:{placeholder:"选填",size:"mini",clearable:""},model:{value:t.CusData.LegalPersonTel,callback:function(a){t.$set(t.CusData,"LegalPersonTel",a)},expression:"CusData.LegalPersonTel"}})],1),t._v(" "),e("div",{staticClass:"inp"},[e("p",{staticClass:"baiop"},[t._v("成立日期")]),t._v(" "),e("el-date-picker",{staticStyle:{width:"50%"},attrs:{placeholder:"选填",size:"mini",clearable:"","value-format":"yyyy-MM-dd",format:"yyyy 年 MM 月 dd 日",type:"date"},model:{value:t.CusData.FoundDate,callback:function(a){t.$set(t.CusData,"FoundDate",a)},expression:"CusData.FoundDate"}})],1),t._v(" "),e("div",{staticClass:"inp"},[e("p",{staticClass:"baiop"},[t._v("隶属区域")]),t._v(" "),e("div",{staticClass:"jains"},[e("el-select",{staticStyle:{width:"50%"},attrs:{size:"mini",clearable:"",placeholder:"必填"},model:{value:t.CusData.ServiceRegional,callback:function(a){t.$set(t.CusData,"ServiceRegional",a)},expression:"CusData.ServiceRegional"}},t._l(t.howregion,function(t,a){return e("el-option",{key:a,attrs:{label:t.Value,value:t.Value}})}),1)],1)]),t._v(" "),e("div",{staticClass:"inp"},[e("p",{staticClass:"baiop"},[t._v("客户特征")]),t._v(" "),e("div",{staticClass:"jains"},[e("el-select",{staticStyle:{width:"50%"},attrs:{size:"mini",clearable:"",placeholder:"选填"},model:{value:t.CusData.Characteristics,callback:function(a){t.$set(t.CusData,"Characteristics",a)},expression:"CusData.Characteristics"}},t._l(t.Customercharacteristics,function(t,a){return e("el-option",{key:a,attrs:{label:t,value:t}})}),1)],1)]),t._v(" "),e("div",{staticClass:"inp"},[e("p",{staticClass:"baiop"},[t._v("回访周期")]),t._v(" "),e("div",{staticClass:"jains"},[e("el-input-number",{attrs:{min:0,size:"mini",max:9999,label:"描述文字"},model:{value:t.CusData.ReturnVisit,callback:function(a){t.$set(t.CusData,"ReturnVisit",a)},expression:"CusData.ReturnVisit"}})],1)]),t._v(" "),e("br"),t._v(" "),e("br"),t._v(" "),e("div",{staticClass:"inp",staticStyle:{width:"100%"}},[e("p",{staticClass:"baiop"},[t._v("省&市/县&区")]),t._v(" "),e("el-cascader",{staticStyle:{width:"50%"},attrs:{options:t.axx,size:"mini",placeholder:"必填",clearable:""},model:{value:t.CusData.AddressCode,callback:function(a){t.$set(t.CusData,"AddressCode",a)},expression:"CusData.AddressCode"}})],1),t._v(" "),e("br"),t._v(" "),e("div",{staticClass:"inp",staticStyle:{width:"100%"}},[e("p",{staticClass:"baiop"},[t._v("客户地址")]),t._v(" "),e("el-input",{staticStyle:{width:"50%"},attrs:{placeholder:"必填",size:"mini",clearable:""},model:{value:t.CusData.Address,callback:function(a){t.$set(t.CusData,"Address",a)},expression:"CusData.Address"}})],1),t._v(" "),e("br"),t._v(" "),e("div",{staticClass:"inp",staticStyle:{width:"100%"}},[e("p",{staticClass:"baiop"},[t._v("回访专员")]),t._v(" "),e("el-input",{staticStyle:{width:"50%"},attrs:{type:"textarea",autosize:"",placeholder:"选填",size:"mini",clearable:""},on:{focus:t.ReturnVisitCommissioner},model:{value:t.CusData.ReturnEnginner,callback:function(a){t.$set(t.CusData,"ReturnEnginner",a)},expression:"CusData.ReturnEnginner"}})],1),t._v(" "),e("br"),t._v(" "),e("div",{staticClass:"inp",staticStyle:{width:"100%"}},[e("p",{staticClass:"baiop"},[t._v("描述")]),t._v(" "),e("el-input",{staticStyle:{width:"50%"},attrs:{placeholder:"选填",size:"mini",clearable:""},model:{value:t.CusData.Description,callback:function(a){t.$set(t.CusData,"Description",a)},expression:"CusData.Description"}})],1)]),t._v(" "),e("div",{staticClass:"zhu"},[e("el-button",{attrs:{size:"mini",type:"danger"}},[t._v("取消")]),t._v(" "),e("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){return t.TF()}}},[t._v("确认")])],1),t._v(" "),e("el-dialog",{attrs:{title:"修改隶属工程师",visible:t.dialogTableVisible,"before-close":t.handleClose,"modal-append-to-body":!1},on:{"update:visible":function(a){t.dialogTableVisible=a}}},[e("el-table",{staticStyle:{width:"100%"},attrs:{height:"250",data:t.GcsListData},on:{"selection-change":t.changeFun}},[e("el-table-column",{attrs:{type:"selection",width:"55"}}),t._v(" "),e("el-table-column",{attrs:{prop:"Name",label:"姓名",width:"180"}}),t._v(" "),e("el-table-column",{attrs:{prop:"UserName",label:"UserName"}})],1),t._v(" "),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{attrs:{size:"mini"},on:{click:function(a){t.dialogTableVisible=!1}}},[t._v("取 消")]),t._v(" "),e("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.TRUEGCS}},[t._v("确认")])],1)],1)],1)},staticRenderFns:[]};var o=e("VU/8")(l,n,!1,function(t){e("wNwi")},"data-v-073a3378",null);a.default=o.exports},wNwi:function(t,a){}});