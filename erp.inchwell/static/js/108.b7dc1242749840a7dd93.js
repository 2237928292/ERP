webpackJsonp([108],{"5jmi":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a("pFYg"),n=a.n(o),i={name:"",data:function(){return{search:"",CustomerName:"",area:"",state:"",CustomerType:"",monthrange:"",areaS:[],options:[{label:"全部",value:"-1",index:1},{label:"创建中",value:"0",index:2},{label:"已确认保养设备",value:1,index:3},{label:"销售已报价",value:2,index:4},{label:"价格已确认",value:3,index:5},{label:"已收款",value:4,index:6},{label:"执行中",value:5,index:7},{label:"已撤销",value:6,index:11},{label:"客户拒绝价格",value:7,index:8},{label:"合同已结单",value:9,index:9}],pageNum:1,pagesize:10,total:0,Data:[]}},created:function(){this.init(),this.initGetArea(),console.log(this.$router)},watch:{$route:function(t,e){this.init()}},components:{},methods:{BJindex:function(t){console.log(t.Id),this.$store.state.Vuex.MaintenanceContractDetailsID=t.Id,this.$router.push({path:"/ModificationOfCntract"})},lookma:function(t){console.log(t.Id),this.$store.state.Vuex.MaintenanceContractDetailsID=t.Id,this.$router.push({path:"/ViewContract"})},init:function(t){var e=this;void 0==t&&null==t||(this.pageNum=1),null!=this.monthrange&&""!=this.monthrange||(this.monthrange=["",""]);var a={url:this.$store.state.http+"Maintain/GetMCs",api:"get",data:{pageNum:this.pageNum,numPerPage:this.pagesize,orderField:"",orderDirection:"",search:this.search,state:this.state||"-1",cusFullName:this.CustomerName,area:this.area,cusType:this.CustomerType,begin:this.monthrange[0],end:this.monthrange[1]}};this.$https(a).then(function(t){e.total=t.Data.DataBars,e.Data=t.Data.Dtos;for(var a=0;a<e.Data.length;a++){var o=e.Data[a];o.CreateDate=o.CreateDate.split("T")[0],o.AcceptDate=null==o.AcceptDate?" - - ":o.AcceptDate.split("T")[0],o.PayDate=null==o.PayDate?" - - ":o.PayDate.split("T")[0]}})},handleCurrentChange:function(t){this.pageNum=t,this.init()},handleSizeChange:function(t){this.pagesize=t,this.init(1)},initGetArea:function(){var t=this,e={url:this.$store.state.http+"System/GetArea",api:"get"};this.$https(e).then(function(e){t.areaS=e.Data})},EditContract:function(){this.$store.state.Vuex.CusId="010101",this.$router.push({path:"/EditContract"})},Cpindex:function(t){console.log(t),this.$store.state.Vuex.CusId=t.CusId+"010101"+t.CusFullName+"010101"+t.Id,this.$router.push({path:"/EditContract"})},DCExcel:function(){null!=this.monthrange&&""!=this.monthrange||(this.monthrange=["",""]);var t={url:this.$store.state.http+"Maintain/GetMCExecutingData",api:"get",data:{pageNum:this.pageNum,numPerPage:this.pagesize,orderField:"",orderDirection:"",search:this.search,state:this.state||"-1",cusFullName:this.CustomerName,area:this.area,cusType:this.CustomerType,begin:this.monthrange[0],end:this.monthrange[1]}};this.$https(t).then(function(t){console.log(t.Data.Dtos)})},ExportByXML:function(){var t='<Worksheet ss:Name="Sheet1">  <Table ss:ExpandedColumnCount="2" ss:ExpandedRowCount="2" x:FullColumns="1"   x:FullRows="1" ss:DefaultColumnWidth="54" ss:DefaultRowHeight="14.25">   <Row>    <Cell><Data ss:Type="Number">111</Data></Cell>   </Row>   <Row>    <Cell ss:Index="2" ss:StyleID="s62"><Data ss:Type="Number">222</Data></Cell>   </Row>  </Table>  <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">   <PageSetup>    <Header x:Margin="0.3"/>    <Footer x:Margin="0.3"/>    <PageMargins x:Bottom="0.75" x:Left="0.7" x:Right="0.7" x:Top="0.75"/>   </PageSetup>   <Print>    <ValidPrinterInfo/>    <PaperSizeIndex>9</PaperSizeIndex>    <HorizontalResolution>600</HorizontalResolution>    <VerticalResolution>600</VerticalResolution>   </Print>   <Selected/>   <Panes>    <Pane>     <Number>3</Number>     <ActiveRow>4</ActiveRow>     <ActiveCol>8</ActiveCol>    </Pane>   </Panes>   <ProtectObjects>False</ProtectObjects>   <ProtectScenarios>False</ProtectScenarios>  </WorksheetOptions> </Worksheet>',e='<Styles><Style ss:ID="Default" ss:Name="Normal"> <Alignment ss:Vertical="Bottom"/> <Borders/> <Font ss:FontName="等线" x:CharSet="134" ss:Size="11" ss:Color="#000000"/> <Interior/> <NumberFormat/> <Protection/></Style><Style ss:ID="s62"> <Interior ss:Color="#FFFF00" ss:Pattern="Solid"/></Style></Styles>';console.log('<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40"> <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">  <Author>赵鸿飞</Author>  <LastAuthor>86178</LastAuthor>  <Created>2015-06-05T18:17:20Z</Created>  <LastSaved>2020-12-21T03:24:49Z</LastSaved>  <Version>16.00</Version> </DocumentProperties> <OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office">  <AllowPNG/> </OfficeDocumentSettings> <ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">  <WindowHeight>11610</WindowHeight>  <WindowWidth>21600</WindowWidth>  <WindowTopX>7740</WindowTopX>  <WindowTopY>1035</WindowTopY>  <ProtectStructure>False</ProtectStructure>  <ProtectWindows>False</ProtectWindows> </ExcelWorkbook>'),console.log(e),console.log(t),console.log(n()(t));var a={url:this.$store.state.http+"System/ExportByXML",api:"post",data:{xml:t,styles:e,header:""}};this.$https(a).then(function(t){console.log(t)})}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"box"},[a("router-view",{on:{refresh:t.init}}),t._v(" "),a("div",{staticClass:"TopSerch",staticStyle:{padding:"5px"}},[a("el-input",{staticStyle:{width:"193px"},attrs:{size:"mini",placeholder:"合同号、销售"},on:{change:function(e){return t.init(1)}},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),t._v(" "),a("el-input",{staticStyle:{width:"193px"},attrs:{size:"mini",placeholder:"客户名称"},on:{change:function(e){return t.init(1)}},model:{value:t.CustomerName,callback:function(e){t.CustomerName=e},expression:"CustomerName"}}),t._v(" "),a("el-select",{staticStyle:{width:"150px"},attrs:{size:"mini",placeholder:"请选择状态",clearable:""},on:{change:function(e){return t.init(1)}},model:{value:t.state,callback:function(e){t.state=e},expression:"state"}},t._l(t.options,function(t){return a("el-option",{key:t.index,attrs:{label:t.label,value:t.value}})}),1),t._v(" "),a("el-select",{staticStyle:{width:"120px"},attrs:{size:"mini",clearable:"",placeholder:"请选择区域"},on:{change:function(e){return t.init(1)}},model:{value:t.area,callback:function(e){t.area=e},expression:"area"}},t._l(t.areaS,function(t){return a("el-option",{key:t.Value+"1",attrs:{label:t.Value,value:t.Value}})}),1),t._v(" "),a("el-select",{staticStyle:{width:"120px"},attrs:{size:"mini",clearable:"",placeholder:"请选择客户类型"},on:{change:function(e){return t.init(1)}},model:{value:t.CustomerType,callback:function(e){t.CustomerType=e},expression:"CustomerType"}},t._l(this.$store.state.Vuex.CustomerTypes,function(t){return a("el-option",{key:t+"2",attrs:{label:t,value:t}})}),1),t._v(" "),a("el-date-picker",{staticStyle:{width:"200px"},attrs:{type:"datetimerange",size:"mini","value-format":"yyyy-MM-dd","range-separator":"至","start-placeholder":"开始月份","end-placeholder":"结束月份"},on:{change:function(e){return t.init(1)}},model:{value:t.monthrange,callback:function(e){t.monthrange=e},expression:"monthrange"}}),t._v(" "),a("el-button",{attrs:{type:"primary",loading:this.$store.state.Vuex.loading,size:"mini"},on:{click:function(e){return t.init()}}},[t._v("检索")]),t._v(" "),a("el-button",{staticStyle:{float:"right"},attrs:{type:"success",size:"mini"},on:{click:function(e){return t.EditContract()}}},[t._v("创建")]),t._v(" "),a("el-button",{staticStyle:{float:"right"},attrs:{type:"success",size:"mini"},on:{click:function(e){return t.ExportByXML()}}},[t._v("导出保养执行汇总")])],1),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.Data,size:"mini",height:this.$store.state.TableOptimumHeight,"highlight-current-row":"",border:"","header-cell-style":{background:"#e1e1e1"}}},[a("el-table-column",{attrs:{prop:"ContractType",label:"合同类型",width:"90"}}),t._v(" "),a("el-table-column",{attrs:{prop:"MaintainCode",label:"合同号",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"CusFullName",label:"客户名称","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{prop:"Area",label:"区域",width:"90"}}),t._v(" "),a("el-table-column",{attrs:{prop:"EquCount",label:"数量","show-overflow-tooltip":!0,width:"50"}}),t._v(" "),a("el-table-column",{attrs:{prop:"CreateDate",label:"创建日期",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"AcceptDate",label:"报价日期",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"PayDate",label:"付款日期",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"StateStr",label:"当前状态",width:"130"}}),t._v(" "),a("el-table-column",{attrs:{prop:"PreferentialAmount",label:"优惠后金额",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"SalesPerson",label:"销售员",width:"70"}}),t._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"220"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"info"},on:{click:function(a){return t.lookma(e.row)}}},[t._v("查看")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){return t.BJindex(e.row)}}},[t._v("编辑")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"success"},on:{click:function(a){return t.Cpindex(e.row)}}},[t._v("复制")])]}}])})],1),t._v(" "),a("nav",{staticStyle:{"text-align":"center"}},[a("el-pagination",{attrs:{"current-page":1,"page-sizes":this.$store.state.Vuex.pageSNumber,"page-size":100,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)},staticRenderFns:[]},l=a("VU/8")(i,s,!1,null,null,null);e.default=l.exports}});