webpackJsonp([43],{Zwfg:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=o("uXZL"),a=o.n(i),r={props:{type:String,default:"选择excel文件"},name:"",data:function(){return{data:[],Zasozoa:!1,percentage:0,IfUpDataindex:0,err:[],inputUp:!0,UpIf:!0}},created:function(){},methods:{getFileTi:function(){},getFile:function(t){var e=t.target.files[0];console.log(e),this.exportData(e),t.target.value=""},btnClick:function(){document.querySelector(".input-file").click()},exportData:function(t){var e=this,o=new FileReader;FileReader.prototype.readAsBinaryString=function(t){var o,i,r="",s=new FileReader;s.onload=function(t){for(var n=new Uint8Array(s.result),l=n.byteLength,c=0;c<l;c++)r+=String.fromCharCode(n[c]);o=a.a.read(r,{type:"binary"}),i=a.a.utils.sheet_to_json(o.Sheets[o.SheetNames[0]]),console.log(i),e.data=i;for(var h=0;h<e.data.length;h++){e.data[h].xuhao=h+2}e.ChinesetoEnglish(i),e.$emit("getResult",i)},s.readAsArrayBuffer(t)},o.readAsBinaryString(t)},ChinesetoEnglish:function(t){},UpStystm:function(){if(console.log(this.data),0==this.data.length)return this.$look("error","错误提示！","未检测到数据！"),!1;for(var t=[],e=0;e<this.data.length;e++){var o=this.data[e],i={ProductCode:o["工具编号"],ProductDesc:o["工具描述"],Unit:o["单位"],UnitPrice:o["销售单价"],ToolLabel:o["标签"],Enable:o["可用状态"],optionsRtext:o["设备分类"],Calibrations:o["校准"],ProductCodeDetail:o["详细编码"]};t.push(i)}console.log(t),this.UpIf=!0;for(var a=0;a<t.length;a++){var r=t[a];"可用"==r.Enable||"不可用"==r.Enable?"可用"==r.Enable?r.Enables=!0:r.Enables=!1:(this.err.unshift("第"+(a+1)+"条数据的（可用状态）有误！ \n"),this.UpIf=!1),""!=r.Unit&&void 0!=r.Unit||(this.err.unshift("第"+(a+1)+"条数据的（单位）有误！ \n"),this.UpIf=!1),""!=r.ProductDesc&&void 0!=r.ProductDesc||(this.err.unshift("第"+(a+1)+"条数据的（工具描述）有误！ \n"),this.UpIf=!1),""!=r.ProductCode&&void 0!=r.ProductCode||(this.err.unshift("第"+(a+1)+"条数据的（工具编号）有误！ \n"),this.UpIf=!1),""!=r.ProductCodeDetail&&void 0!=r.ProductCodeDetail||(this.err.unshift("第"+(a+1)+"条数据的（详细编码）有误！ \n"),this.UpIf=!1),"电子设备"==r.optionsRtext||"机械设备"==r.optionsRtext||(this.err.unshift("第"+(a+1)+"条数据的（设备分类）有误！ \n"),this.UpIf=!1),"需要"==r.Calibrations||"不需要"==r.Calibrations?"需要"==r.Calibrations?r.Calibrationss=!0:r.Calibrationss=!1:(this.err.unshift("第"+(a+1)+"条数据的（校准）有误！ \n"),this.UpIf=!1)}if(0==this.UpIf)return this.err.unshift("--------------------------------------- \n"),!1;this.Zasozoa=!0,this.IfUpDataindex=0,this.IfUpData(t)},IfUpData:function(t){t.length==this.IfUpDataindex?(this.Zasozoa=!1,""==this.err&&this.$look("success","上传完成！","所有数据已经上传成功，返回查看！")):this.UpDataList(t)},UpDataList:function(t){var e=this,o=Number(this.IfUpDataindex),i={data:{AssetsType:t[o].optionsRtext,Calibration:t[o].Calibrationss,ProductCodeDetail:t[o].ProductCodeDetail,ProductCode:t[o].ProductCode,ProductDesc:t[o].ProductDesc,Unit:t[o].Unit,UnitPrice:t[o].UnitPrice,ToolLabel:t[o].ToolLabel,Enable:t[o].Enables},api:"post",url:this.$store.state.http+"CusTool/AddCusTool",header:this.$store.state.token};this.$httpsUp(i).then(function(o){2==o.Code&&e.err.unshift("第 "+(e.IfUpDataindex+2)+" 条数据上传失败, "+o.Msg.split("：")[1]),e.IfUpDataindex+=1,e.percentage=Number((e.IfUpDataindex/t.length*100).toFixed(2)),console.log(e.percentage),e.IfUpData(t)})}}},s={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"box_s"},[o("div",{staticClass:"topbut"},[o("el-button",{staticStyle:{background:"#01000000",border:"none",color:"red"},attrs:{type:"success",size:"mini"}},[o("label",{attrs:{for:"int"},on:{click:function(e){return t.getFileTi()}}},[t._v("↑ 上传文件")]),t._v(" "),t.inputUp?o("input",{ref:"referenceUpload",staticStyle:{"margin-left":"70px",display:"none"},attrs:{id:"int",type:"file",accept:".xlsx, .xls"},on:{change:function(e){return t.getFile(e)}}}):t._e()]),t._v(" "),o("el-button",{staticStyle:{float:"right"},attrs:{type:"success",size:"mini"},on:{click:t.UpStystm}},[t._v("上传系统")])],1),t._v(" "),o("div",{staticClass:"content"},[o("el-table",{staticStyle:{width:"100%"},attrs:{data:t.data,size:"mini",height:this.$store.state.TableOptimumHeight,"highlight-current-row":"",border:"","header-cell-style":{background:"#e1e1e1"}}},[o("el-table-column",{attrs:{fixed:"",prop:"xuhao",label:"序号",width:"70"}}),t._v(" "),o("el-table-column",{attrs:{"show-overflow-tooltip":!0,fixed:"",prop:"工具编号",label:"工具编号",width:"150"}}),t._v(" "),o("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"详细编码",label:"详细编码",width:"120"}}),t._v(" "),o("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"工具描述",label:"工具描述"}}),t._v(" "),o("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"单位",label:"单位",width:"120"}}),t._v(" "),o("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"销售单价",label:"销售单价",width:"120"}}),t._v(" "),o("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"标签",label:"标签",width:"120"}}),t._v(" "),o("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"设备分类",label:"设备分类",width:"120"}}),t._v(" "),o("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"校准",label:"校准",width:"80"}}),t._v(" "),o("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"可用状态",label:"可用状态",width:"80"}})],1)],1),t._v(" "),o("div",{staticClass:"righterr"},t._l(t.err,function(e,i){return o("p",{key:i},[t._v(t._s(e))])}),0),t._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:t.Zasozoa,expression:"Zasozoa"}],staticClass:"box_zhe"},[o("div",{staticClass:"xin"},[o("el-progress",{attrs:{type:"circle",percentage:t.percentage}})],1)])])},staticRenderFns:[]};var n=o("VU/8")(r,s,!1,function(t){o("vfPb")},"data-v-757c5a55",null);e.default=n.exports},vfPb:function(t,e){}});