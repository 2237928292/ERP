webpackJsonp([94],{"8oJF":function(t,e){},fYeR:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r={data:function(){return{options:[{value:"6",label:"半年"},{value:"12",label:"一年"},{value:"18",label:"一年半"},{value:"24",label:"两年"}],optionss:[],Product:{Recovery:!1,ProductCode:"",ProductionYear:"",GuaranteePeriodMonths:"",Characteristics:"",MaintainContent:"",KitFlag:!1,MinInventoryAlert:"",MaxInventoryAlert:"",OptimalInventory:"",Unit:"",UnitPrice:"",AssemblyUnitPriceTime:"",AssemblyUnitPrice:"0",BuyingUnitPrice:"",BuyingCurrency:"RMB",Barcode:"",BarcodeMemo:"",RepairCharge:"",ReapirChargeEUR:"",MaintainPrice:"",MaintainHours:"",BMBSJ:"35",Manufacturer:""},state1:"",restaurants:[]}},mounted:function(){this.Manufacturer()},methods:{Manufacturer:function(){var t=this,e={api:"get",url:this.$store.state.http+"Product/GetManufacturer"};this.$https(e).then(function(e){t.optionss=e.Data;for(var i=[],r=0;r<e.Data.length;r++)i.push({value:e.Data[r].Name,address:e.Data[r].ID});t.restaurants=i,console.log(i)})},querySearch:function(t,e){var i=this.restaurants;e(t?i.filter(this.createFilter(t)):i)},createFilter:function(t){return function(e){return 0===e.value.toLowerCase().indexOf(t.toLowerCase())}},BuyingUnitPrice:function(){console.log(9*this.Product.ReapirChargeEUR*1.06),this.Product.RepairCharge=(9*this.Product.ReapirChargeEUR*1.06).toFixed(2)},AssemblyUnitPriceTimeMN:function(t){this.Product.AssemblyUnitPrice=(14*this.Product.AssemblyUnitPriceTime*1.17).toFixed(2)},MaintainPrice:function(){this.Product.MaintainPrice=(this.Product.MaintainHours*this.Product.BMBSJ).toFixed(2)},handleSelect:function(t){console.log(t.address),this.Product.ManufacturerAddress=t.address},BuyingUnitPriceOnclick:function(){console.log(this.Product),"85d3cebb-c6be-4940-8037-8a38d70edf22"==this.Product.ManufacturerAddress?(this.Product.UnitPrice=.7*this.Product.BuyingUnitPrice*1.15*1.15*1.17*1.001*1.02*8.7809/.5,this.Product.UnitPrice=this.Product.UnitPrice.toFixed(2)):"5db92775-3cfb-466c-b414-d9c647d2f9b0"==this.Product.ManufacturerAddress?this.Product.UnitPrice=(this.Product.BuyingUnitPrice/.75*1.1).toFixed(2):"63501f26-7e48-41ae-bc11-5862cf4e1783"==this.Product.ManufacturerAddress?this.Product.UnitPrice=(this.Product.BuyingUnitPrice/.65).toFixed(2):"9dfeb543-a782-4ba5-a9ec-8f2a6bacd7f1"==this.Product.ManufacturerAddress?this.Product.UnitPrice=(this.Product.BuyingUnitPrice/.65).toFixed(2):"8c2befd7-36cb-4974-b905-e0a494ecf9c3"==this.Product.ManufacturerAddress?this.Product.UnitPrice=(this.Product.BuyingUnitPrice/.55).toFixed(2):"D0D9DDB9-18E5-43C0-97AA-CE538F0685AD"==this.Product.ManufacturerAddress?this.Product.UnitPrice=(this.Product.BuyingUnitPrice/.6).toFixed(2):("RMB"==this.Product.BuyingCurrency&&(this.Product.UnitPrice=this.Product.BuyingUnitPrice/.5,this.Product.UnitPrice=this.Product.UnitPrice.toFixed(2)),"EUR"==this.Product.BuyingCurrency&&(this.Product.UnitPrice=1.25*this.Product.BuyingUnitPrice*1.15*1.17*1.001*1.02*8.7809/.5,this.Product.UnitPrice=this.Product.UnitPrice.toFixed(2)))},add:function(){var t=this;if(""==this.Product.ProductCode)return this.$msgs(1,"请输入产品编号！");if(""==this.Product.BarcodeMemo)return this.$msgs(1,"请输入内部编码！");if(""==this.Product.Manufacturer)return this.$msgs(1,"请输入品牌！");if(""==this.Product.BuyingUnitPrice)return this.$msgs(1,"请输入采购单价！");if(""==this.Product.Characteristics)return this.$msgs(1,"请输入产品描述！");this.$msgs(0,"正在添加，请勿重复点击！");var e={api:"post",url:this.$store.state.http+"Product/AddProduct",data:{ProductCode:this.Product.ProductCode,ProductionYear:Number(this.Product.ProductionYear),GuaranteePeriodMonths:this.Product.GuaranteePeriodMonths,Characteristics:this.Product.Characteristics,MaintainContent:this.Product.MaintainContent,KitFlag:!0,proType:1,MinInventoryAlert:Number(this.Product.MinInventoryAlert),MaxInventoryAlert:Number(this.Product.MaxInventoryAlert),OptimalInventory:Number(this.Product.OptimalInventory),Unit:this.Product.Unit,UnitPrice:Number(this.Product.UnitPrice),AssemblyUnitPrice:Number(this.Product.AssemblyUnitPrice),BuyingUnitPrice:Number(this.Product.BuyingUnitPrice),BuyingCurrency:this.Product.BuyingCurrency,Barcode:this.Product.Barcode,BarcodeMemo:this.Product.BarcodeMemo,RepairCharge:Number(this.Product.RepairCharge),ReapirChargeEUR:Number(this.Product.ReapirChargeEUR),MaintainPrice:Number(this.Product.MaintainPrice),MaintainHours:Number(this.Product.MaintainHours),Manufacturer:this.Product.Manufacturer,Recovery:this.Product.Recovery}};this.$https(e).then(function(e){0==e.Code&&(t.$emit("refresh"),t.$router.push({path:"/Spareparts_page"}),t.$msgs(0,"添加成功！"))})}}},a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"box_s"},[i("div",{staticClass:"Data_1"},[t._v("基础数据")]),t._v(" "),i("div",{staticClass:"demo"},[i("div",[t._v("产品编号:")]),t._v(" "),i("el-input",{attrs:{size:"mini"},model:{value:t.Product.ProductCode,callback:function(e){t.$set(t.Product,"ProductCode",e)},expression:"Product.ProductCode"}})],1),t._v(" "),i("div",{staticClass:"demo"},[i("div",[t._v("内部编码:")]),t._v(" "),i("el-input",{attrs:{size:"mini"},model:{value:t.Product.BarcodeMemo,callback:function(e){t.$set(t.Product,"BarcodeMemo",e)},expression:"Product.BarcodeMemo"}})],1),t._v(" "),i("div",{staticClass:"demo"},[i("div",[t._v("品牌:")]),t._v(" "),i("el-row",{staticClass:"demo-autocomplete"},[i("el-col",[i("el-autocomplete",{staticClass:"inline-input input",attrs:{size:"mini","fetch-suggestions":t.querySearch,placeholder:"请输入内容"},on:{select:t.handleSelect,input:t.BuyingUnitPriceOnclick},model:{value:t.Product.Manufacturer,callback:function(e){t.$set(t.Product,"Manufacturer",e)},expression:"Product.Manufacturer"}})],1)],1)],1),t._v(" "),i("div",{staticClass:"demo"},[i("div",[t._v("年份:")]),t._v(" "),i("el-date-picker",{staticStyle:{width:"180px",background:"#FFF"},attrs:{type:"year",size:"mini","value-format":"yyyy",placeholder:"选择年"},model:{value:t.Product.ProductionYear,callback:function(e){t.$set(t.Product,"ProductionYear",e)},expression:"Product.ProductionYear"}})],1),t._v(" "),i("div",{staticClass:"demo"},[i("div",[t._v("保质期:")]),t._v(" "),i("el-select",{attrs:{size:"mini",placeholder:"请选择"},model:{value:t.Product.GuaranteePeriodMonths,callback:function(e){t.$set(t.Product,"GuaranteePeriodMonths",e)},expression:"Product.GuaranteePeriodMonths"}},t._l(t.options,function(t){return i("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),i("div",{staticClass:"demo"},[i("div",[t._v("库存量下限:")]),t._v(" "),i("el-input",{staticClass:"no-number",attrs:{type:"number",size:"mini"},model:{value:t.Product.MinInventoryAlert,callback:function(e){t.$set(t.Product,"MinInventoryAlert",e)},expression:"Product.MinInventoryAlert"}})],1),t._v(" "),i("div",{staticClass:"demo"},[i("div",[t._v("库存量上限:")]),t._v(" "),i("el-input",{staticClass:"no-number",attrs:{type:"number",size:"mini"},model:{value:t.Product.MaxInventoryAlert,callback:function(e){t.$set(t.Product,"MaxInventoryAlert",e)},expression:"Product.MaxInventoryAlert"}})],1),t._v(" "),i("div",{staticClass:"demo"},[i("div",[t._v("最佳库存量:")]),t._v(" "),i("el-input",{staticClass:"no-number",attrs:{type:"number",size:"mini"},model:{value:t.Product.OptimalInventory,callback:function(e){t.$set(t.Product,"OptimalInventory",e)},expression:"Product.OptimalInventory"}})],1),t._v(" "),i("div",{staticClass:"demo"},[i("div",[t._v("单位:")]),t._v(" "),i("el-input",{attrs:{size:"mini"},model:{value:t.Product.Unit,callback:function(e){t.$set(t.Product,"Unit",e)},expression:"Product.Unit"}})],1),t._v(" "),i("div",{staticClass:"demo"},[i("div",[t._v("是否回收:")]),t._v(" "),i("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:t.Product.Recovery,callback:function(e){t.$set(t.Product,"Recovery",e)},expression:"Product.Recovery"}})],1),t._v(" "),i("div",{staticClass:"Data_1"},[t._v("价格属性")]),t._v(" "),i("div",{staticClass:"Data_2"},[i("div",{staticClass:"demo2"},[i("div",{staticClass:"div_567876"},[t._v("采购单价:")]),t._v(" "),i("el-input",{staticClass:"input-with-select no-number",staticStyle:{width:"calc(100% - 120px)"},attrs:{placeholder:"请输入内容",size:"mini",type:"number"},on:{input:t.BuyingUnitPriceOnclick},model:{value:t.Product.BuyingUnitPrice,callback:function(e){t.$set(t.Product,"BuyingUnitPrice",e)},expression:"Product.BuyingUnitPrice "}},[i("el-select",{staticStyle:{width:"120px"},attrs:{slot:"prepend",size:"mini",placeholder:"请选择币种"},on:{change:t.BuyingUnitPriceOnclick},slot:"prepend",model:{value:t.Product.BuyingCurrency,callback:function(e){t.$set(t.Product,"BuyingCurrency",e)},expression:"Product.BuyingCurrency"}},[i("el-option",{attrs:{label:"RMB",value:"RMB"}}),t._v(" "),i("el-option",{attrs:{label:"EUR",value:"EUR"}})],1)],1)],1),t._v(" "),i("div",{staticClass:"demo"},[i("div",[t._v("销售单价:")]),t._v(" "),i("el-input",{staticClass:"no-number",attrs:{type:"number",size:"mini"},model:{value:t.Product.UnitPrice,callback:function(e){t.$set(t.Product,"UnitPrice",e)},expression:"Product.UnitPrice"}})],1)]),t._v(" "),i("div",{staticClass:"Data_2"},[i("div",{staticClass:"demo2"},[i("div",{staticClass:"div_567876"},[t._v("保养工时:")]),t._v(" "),i("el-input",{staticClass:"input-with-select a1 no-number",staticStyle:{width:"calc(100% - 120px)"},attrs:{placeholder:"请输入内容",size:"mini",type:"number"},on:{input:t.MaintainPrice},model:{value:t.Product.MaintainHours,callback:function(e){t.$set(t.Product,"MaintainHours",e)},expression:"Product.MaintainHours"}},[i("el-select",{staticStyle:{width:"120px"},attrs:{slot:"prepend",size:"mini",placeholder:"请选择系数"},on:{change:t.MaintainPrice},slot:"prepend",model:{value:t.Product.BMBSJ,callback:function(e){t.$set(t.Product,"BMBSJ",e)},expression:"Product.BMBSJ"}},[i("el-option",{attrs:{label:"宝马",value:"35"}}),t._v(" "),i("el-option",{attrs:{label:"保时捷",value:"45"}})],1)],1)],1),t._v(" "),i("div",{staticClass:"demo"},[i("div",[t._v("保养价格:")]),t._v(" "),i("el-input",{staticClass:"no-number",attrs:{type:"number",size:"mini"},model:{value:t.Product.MaintainPrice,callback:function(e){t.$set(t.Product,"MaintainPrice",e)},expression:"Product.MaintainPrice"}})],1)]),t._v(" "),i("div",{staticClass:"Data_2"},[i("div",{staticClass:"demo"},[i("div",[t._v("维修费欧元价:")]),t._v(" "),i("el-input",{staticClass:"no-number",attrs:{type:"number",size:"mini"},on:{input:function(e){return t.BuyingUnitPrice()}},model:{value:t.Product.ReapirChargeEUR,callback:function(e){t.$set(t.Product,"ReapirChargeEUR",e)},expression:"Product.ReapirChargeEUR"}})],1),t._v(" "),i("div",{staticClass:"demo"},[i("div",[t._v("维修费:")]),t._v(" "),i("el-input",{staticClass:"no-number",attrs:{type:"number",size:"mini"},model:{value:t.Product.RepairCharge,callback:function(e){t.$set(t.Product,"RepairCharge",e)},expression:"Product.RepairCharge"}})],1)]),t._v(" "),i("div",{staticClass:"Data_2"},[i("div",{staticClass:"demo"},[i("div",[t._v("安装工时:")]),t._v(" "),i("el-input",{staticClass:"no-number",attrs:{size:"mini",type:"number"},on:{input:function(e){return t.AssemblyUnitPriceTimeMN()}},model:{value:t.Product.AssemblyUnitPriceTime,callback:function(e){t.$set(t.Product,"AssemblyUnitPriceTime",e)},expression:"Product.AssemblyUnitPriceTime"}})],1),t._v(" "),i("div",{staticClass:"demo"},[i("div",[t._v("安装费:")]),t._v(" "),i("el-input",{staticClass:"no-number",attrs:{type:"number",size:"mini"},model:{value:t.Product.AssemblyUnitPrice,callback:function(e){t.$set(t.Product,"AssemblyUnitPrice",e)},expression:"Product.AssemblyUnitPrice"}})],1)]),t._v(" "),i("div",{staticClass:"Data_1"},[t._v("描述，内容，备注")]),t._v(" "),i("div",{staticClass:"bottom"},[i("div",{staticClass:"Memo"},[i("div",[t._v("产品描述：")]),t._v(" "),i("el-input",{attrs:{type:"textarea",placeholder:"请输入内容","show-word-limit":""},model:{value:t.Product.Characteristics,callback:function(e){t.$set(t.Product,"Characteristics",e)},expression:"Product.Characteristics"}})],1),t._v(" "),i("div",{staticClass:"Memo"},[i("div",[t._v("保养内容：")]),t._v(" "),i("el-input",{attrs:{type:"textarea",placeholder:"请输入内容","show-word-limit":""},model:{value:t.Product.MaintainContent,callback:function(e){t.$set(t.Product,"MaintainContent",e)},expression:"Product.MaintainContent"}})],1),t._v(" "),i("div",{staticClass:"Memo"},[i("div",[t._v("备注：")]),t._v(" "),i("el-input",{attrs:{type:"textarea",placeholder:"请输入内容","show-word-limit":""},model:{value:t.Product.Barcode,callback:function(e){t.$set(t.Product,"Barcode",e)},expression:"Product.Barcode"}})],1)]),t._v(" "),i("div",{staticClass:"true"},[i("el-button",{staticStyle:{float:"right"},attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.add()}}},[t._v("确认添加")])],1)])},staticRenderFns:[]};var c=i("VU/8")(r,a,!1,function(t){i("8oJF")},"data-v-1cd12700",null);e.default=c.exports}});