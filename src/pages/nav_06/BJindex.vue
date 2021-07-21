<template>
  <div class="box_s BJmanagementHTbox_s">

    <!-- 基础信息   这里不用修改 -->
    <div v-if="Data.MCBaseInfo">
      <div class="segmentation">
        保养合同基础信息 【 {{ Data.MCBaseInfo.MaintainCode }} 】
        <div @mouseover="MaintainRHF = true" @mouseleave="MaintainRHF = false" style="width:50px;height:50px;float:right;z-index:99">
          <el-button v-show="MaintainRHF" size="mini" style="float:right" type="success" @click="ResetMC()" icon="el-icon-refresh"></el-button>
        </div>
      </div>
      <div class="itemmsgxx_document" style="width: 600px">
        <p><span>客户名称:</span>{{ Data.MCBaseInfo.CusFullName }}</p>
      </div>
      <div class="itemmsgxx_document">
        <p><span>合同类型:</span>{{ Data.MCBaseInfo.ContractType }}</p>
      </div>
      <div class="itemmsgxx_document">
        <p><span>合同号:</span>{{ Data.MCBaseInfo.MaintainCode }}</p>
      </div>
      <div class="itemmsgxx_document">
        <p><span>区域:</span>{{ Data.MCBaseInfo.Area }}</p>
      </div>
      <div class="itemmsgxx_document">
        <p><span>设备数量:</span>{{ Data.MCBaseInfo.EquCount }}</p>
      </div>
      <div class="itemmsgxx_document">
        <p><span>创建日期:</span>{{ Data.MCBaseInfo.CreateDate | TimeCode }}</p>
      </div>
      <div class="itemmsgxx_document">
        <p><span>报价日期:</span>{{ Data.MCBaseInfo.AcceptDate | TimeCode }}</p>
      </div>
      <div class="itemmsgxx_document">
        <p><span>付款日期:</span>{{ Data.MCBaseInfo.PayDate | TimeCode }}</p>
      </div>
      <div class="itemmsgxx_document">
        <p><span>结单日期:</span>{{ Data.MCBaseInfo.EndDate | TimeCode }}</p>
      </div>
      <div class="itemmsgxx_document">
        <p><span>销售员:</span>{{ Data.MCBaseInfo.SalesPerson }}</p>
      </div>
      <div class="itemmsgxx_document">
        <p><span>当前状态:</span>{{ Data.MCBaseInfo.StateStr }}</p>
      </div>
      <div class="itemmsgxx_document">
        <p><span>联系人:</span>{{ Data.MCBaseInfo.LinkMan }}</p>
      </div>
      <div class="itemmsgxx_document">
        <p><span>联系人英文名:</span>{{ Data.MCBaseInfo.LinkManEngilsh }}</p>
      </div>
      <div class="itemmsgxx_document">
        <p><span> 联系人手机号:</span>{{ Data.MCBaseInfo.Mobile }}</p>
      </div>
      <div class="itemmsgxX_document">
        <p><span>备注信息:</span>{{ Data.MCBaseInfo.Memo }}</p>
      </div>
      <div class="segmentation">
        保养设备信息
        <el-button @click="MyEquipmentDatabase(true, '1')" size="mini" type="warning">我的设备资料库</el-button>
        <el-button @click="EquipmentDatabase(false, '1')" size="mini" type="success">设备资料库</el-button>
      </div>
      <!-- MC -->
      <div id="LEtetabe">
        <el-table ref="MC" @sort-change='sortchange(1)' :data="EquDtos1" border row-key="id" size="mini" :header-cell-style="{ background: '#e1e1e1' }" align="left">
          <el-table-column v-for="(item, index) in col" :key="`col_${item.label}`" :prop="dropCol[index].prop" :sortable='item.sortable' :width="dropCol[index].width" :show-overflow-tooltip="dropCol[index].widths"
            :label="item.label">
          </el-table-column>

          <el-table-column fixed="right" label="数量" width="105">
            <template slot-scope="scope">
              <div v-if="!scope.row.BelongToCustomer" id="Number_input">
                <div class="div_icon_text" @click="EditMCEqu(scope.row, 'Del','MC')">
                  <i class="el-icon-minus"></i>
                </div>
                <div class="div_icon_textConter">
                  <span>{{ scope.row.Number_s }}</span>
                </div>
                <div class="div_icon_text" @click="EditMCEqu(scope.row, 'Add','MC')">
                  <i class="el-icon-plus"></i>
                </div>
              </div>
              <div style="width: 100%; textalign: center" v-if="scope.row.BelongToCustomer">
                {{ scope.row.Number_s }}
              </div>
            </template>
          </el-table-column>

          <el-table-column fixed="right" label="保养次数" width="105">
            <template slot-scope="scope">
              <div id="Number_input">
                <div class="div_icon_text" @click="EditMCEquMN(scope.row, 'Del')">
                  <i class="el-icon-minus"></i>
                </div>
                <div class="div_icon_textConter">
                  <span>{{ scope.row.MaintainCount }}</span>
                </div>
                <div class="div_icon_text" @click="EditMCEquMN(scope.row, 'Add')">
                  <i class="el-icon-plus"></i>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="80">
            <template slot-scope="scope">
              <el-button @click="delescoped(scope.row,'MC')" size="mini" type="info">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="itemmsgxx_document">
        <span>合同年限:</span>
        <el-input size="mini" style="width: 50%" v-model="Data.MCEquInfo.YearLife"></el-input>
      </div>

      <div class="itemmsgxx_document">
        <span>保养次数:</span>
        <div id="Number_input">
          <div class="div_icon_text" @click="EditMCN('Del')">
            <i class="el-icon-minus"></i>
          </div>
          <div class="div_icon_textConter">
            <span style="width: 100%">{{ Data.MCEquInfo.MaintainCount }}</span>
          </div>
          <div class="div_icon_text" @click="EditMCN('Add')">
            <i class="el-icon-plus"></i>
          </div>
        </div>
      </div>

      <div class="itemmsgxx_document">
        <span>差旅费:</span>
        <el-input size="mini" @input="CTTAMC" style="width: 50%" v-model="Data.MCEquInfo.TravelExpenses"></el-input>
      </div>

      <div class="itemmsgxx_document">
        <span>差旅次数:</span>
        <div id="Number_input">
          <div class="div_icon_text" @click="EditMCTN('Del')">
            <i class="el-icon-minus"></i>
          </div>
          <div class="div_icon_textConter">
            <span style="width: 100%">{{ Data.MCEquInfo.TraveTime }}</span>
          </div>
          <div class="div_icon_text" @click="EditMCTN('Add')">
            <i class="el-icon-plus"></i>
          </div>
        </div>
      </div>

      <div class="itemmsgxX_document" style="height: 1px; margin: 0; padding: 0"></div>
      <div class="itemmsgxx_document">
        <p><span>总金额(RMB):</span>{{ Data.MCEquInfo.AmountTotal.toFixed(2) }}</p>
      </div>

      <div class="itemmsgxx_document">
        <span>优惠比例(%):</span>
        <el-input size="mini" @input="CTTAMC" style="width: 50%" v-model="Data.MCEquInfo.PreferentialRatio"></el-input>
      </div>

      <div class="itemmsgxx_document">
        <span>优惠后金额:</span>
        <el-input size="mini" style="width: 50%" v-model="Data.MCEquInfo.PreferentialAmount"></el-input>
      </div>

      <div class="itemmsgxX_document" style="height: 1px; margin: 0; padding: 0"></div>
      <div class="itemmsgxx_document">
        <p>
          <span style="width: 200px">是否在合同中显示折扣率:</span>
          <el-switch v-model="Data.MCEquInfo.IsShowDiscount" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </p>
      </div>
      <!-- 大包 -->
      <div v-if="
          Data.MCBaseInfo.ContractType == '服务公司AS' ||
          Data.MCBaseInfo.ContractType == '技术公司AS'
        ">
        <div class="segmentation">
          大包设备信息
          <el-button @click="MyEquipmentDatabase(true, '2')" size="mini" type="warning">我的设备资料库</el-button>
          <el-button @click="EquipmentDatabase(false, '2')" size="mini" type="success">设备资料库</el-button>
        </div>

        <div id="LEtetabes">
          <el-table ref="AS" @sort-change='sortchange(2)' :data="EquDtos" border row-key="ids" size="mini" :header-cell-style="{ background: '#e1e1e1' }" align="left">
            <el-table-column v-for="(item, index) in col" :key="`col_${index}`" :prop="dropCol[index].prop" :sortable='item.sortable' :width="dropCol[index].width" :show-overflow-tooltip="dropCol[index].widths"
              :label="item.label">
            </el-table-column>

            <el-table-column fixed="right" label="数量" width="105">
              <template slot-scope="scope">
                <div v-if="!scope.row.BelongToCustomer" id="Number_input">
                  <div class="div_icon_text" @click="EditMCEqu(scope.row, 'Del','AS')">
                    <i class="el-icon-minus"></i>
                  </div>
                  <div class="div_icon_textConter">
                    <span>{{ scope.row.Number_s }}</span>
                  </div>
                  <div class="div_icon_text" @click="EditMCEqu(scope.row, 'Add','AS')">
                    <i class="el-icon-plus"></i>
                  </div>
                </div>
                <div style="width: 100%; textalign: center" v-if="scope.row.BelongToCustomer">
                  {{ scope.row.Number_s }}
                </div>
              </template>
            </el-table-column>

            <!-- <el-table-column fixed="right" label="保养次数" width="105">
              <template slot-scope="scope">
                <div id="Number_input">
                  <div class="div_icon_text" @click="EditMCEquMN(scope.row, 'Del')">
                    <i class="el-icon-minus"></i>
                  </div>
                  <div class="div_icon_textConter">
                    <span>{{ scope.row.MaintainCount }}</span>
                  </div>
                  <div class="div_icon_text" @click="EditMCEquMN(scope.row, 'Add')">
                    <i class="el-icon-plus"></i>
                  </div>
                </div>
              </template>
            </el-table-column> -->

            <el-table-column fixed="right" label="操作" width="80">
              <template slot-scope="scope">
                <el-button @click="delescoped(scope.row,'AS')" size="mini" type="info">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="itemmsgxx_document">
          <span>建店年份:</span>
          <el-input size="mini" @input="ChangeASPreferentialAmount" style="width: 50%" v-model="Data.ASEquInfo.YearOfEstablishment"></el-input>
        </div>

        <div class="itemmsgxx_documentLength">
          <span>去年售后维修花费:</span>
          <el-input size="mini" @input="ChangeASPreferentialAmount" style="width: 50%" v-model="Data.ASEquInfo.QNHF"></el-input>
        </div>

        <div class="itemmsgxx_document">
          <span>举升机数量:</span>
          <el-input size="mini" @input="ChangeASPreferentialAmount" style="width: 50%" v-model="Data.ASEquInfo.TotalNumberOfLifts"></el-input>
        </div>

        <div class="itemmsgxx_document">
          <span>空压机数量:</span>
          <el-input size="mini" @input="ChangeASPreferentialAmount" style="width: 50%" v-model="Data.ASEquInfo.TotalNumberOfAirCompressor"></el-input>
        </div>

        <div class="itemmsgxx_document">
          <span>烤漆房数量:</span>
          <el-input size="mini" @input="ChangeASPreferentialAmount" style="width: 50%" v-model="Data.ASEquInfo.TotalNumberOfSprayBooth"></el-input>
        </div>
        <div class="itemmsgxX_document" style="height: 1px; margin: 0; padding: 0"></div>

        <div class="itemmsgxx_document">
          <span>AS金额合计:</span>
          {{ Data.ASEquInfo.ASAmountTotal.toFixed(2) }}
        </div>

        <div class="itemmsgxx_document">
          <span>AS优惠后金额:</span>
          <el-input size="mini" style="width: 50%" v-model="Data.ASEquInfo.ASPreferentialAmount"></el-input>
        </div>
      </div>
      <!-- 下载合同 -->
      <div class="segmentation" v-if="StateStr == 2 || StateStr == 3 || StateStr == 4 || StateStr == 5 || StateStr == 9  ">下载合同</div>
      <div class="div" style="width:100%;float:left" v-if="StateStr == 2 || StateStr == 3 || StateStr == 4 || StateStr == 5 || StateStr == 9  ">
        <div class="Fl" v-if="
          Data.MCBaseInfo.ContractType == '服务公司MC' ||
          Data.MCBaseInfo.ContractType == '技术公司MC'
        ">
          <!-- MC -->
          <el-link @click="httpTXFWQBYHT('MC')" type="primary">合同</el-link>
          <el-link @click="httpTXFWQBYHT('MC2')" type="primary">附件2</el-link>
        </div>
        <div class="Fl" v-if="
          Data.MCBaseInfo.ContractType == '服务公司AS' ||
          Data.MCBaseInfo.ContractType == '技术公司AS'
        ">
          <!-- AS -->
          <el-link @click="httpTXFWQBYHT('ASs')" type="primary">AS预报价方案</el-link>
          <el-link @click="httpTXFWQBYHT('AS')" type="primary">合同</el-link>
          <el-link @click="httpTXFWQBYHT('AS2')" type="primary">附件2</el-link>
          <el-link @click="httpTXFWQBYHT('AS3')" type="primary">附件3</el-link>
        </div>
      </div>
      <!-- ! 收款记录 -->

      <div class="segmentation" v-if="StateStr == 4 || StateStr == 5 || StateStr == 9">收款记录
        <el-button type="success" style="float: right" size="mini" @click="MCCollections()">发起收款</el-button>
        <p style="float: right; color: #000">&nbsp;&nbsp;</p>
        <el-input size="mini" style="width: 100px; float: right" v-model="MCCollectionss" placeholder="元 / 人民币"></el-input>

        <p style="float: right; color: #000">
          (财务已确认：{{ FinancialConfirmed + " 元" }} ) &nbsp;&nbsp;
        </p>

        <p style="float: right; color: #000">
          (等待确认：{{ FinancialUnconfirmed + " 元" }} ) &nbsp;&nbsp;
        </p>

        <p style="float: right; color: #000">
          (共计应收：{{ PreferentialAmountSD + " 元" }}
          )&nbsp;&nbsp;&nbsp;
        </p>
      </div>

      <div class="timeline" v-if="StateStr == 4 || StateStr == 5 || StateStr == 9">
        <el-timeline :reverse="reverse">
          <el-timeline-item :color="activity.State == 2? '#67C23A' : '#909399' " v-for="(activity, index) in GetMCPlistData" :key="index" :timestamp="activity.Other">
            {{ activity.Amount + " 元"  + ' - - ' + activity.StateStr}}
          </el-timeline-item>
        </el-timeline>
      </div>

      <div class="itemmsgxX_document" style="height: 1px; margin: 0; padding: 0"></div>
      <!-- 任务列表 -->
      <div v-if="StateStr == 4 || StateStr == 5 || StateStr == 9" class="segmentation">
        任务列表
        <el-button @click="AddMCOrderDtos()" size="mini" type="success" style="float: right">添加任务</el-button>
        <el-date-picker v-model="Time1" type="date" size="mini" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" style="float: right" placeholder="选择日期，添加任务">
        </el-date-picker>
        <el-button @click="SkipTheMaintenanceTask()" v-if="StateStr == 4" size="mini" type="danger" style="float: right;marginRight:50px">跳过保养任务</el-button>

      </div>
      <div id="LEtetabes" v-if="StateStr == 4 || StateStr == 5 || StateStr == 9">
        <el-table :data="MCOrderDtos" size="mini" highlight-current-row border style="width: 100%" :header-cell-style="{ background: '#e1e1e1' }">
          <el-table-column fixed prop="EstimatedTime" label="预计时间" width="200"></el-table-column>
          <el-table-column fixed prop="ActualTime" label="启动时间" width="200"></el-table-column>
          <el-table-column fixed prop="EndTime" label="完成时间" width="200"></el-table-column>
          <el-table-column fixed prop="Enginners" label="工程师" width="100"></el-table-column>
          <el-table-column fixed prop="StateStr" label="状态"></el-table-column>
        </el-table>
      </div>
      <!-- 备注 -->
      <div class="segmentation">备注</div>
      <el-input type="textarea" :rows="5" style="margin: 10px 20px 50px 20px; width: 500px" placeholder="请输入内容" v-model="Data.MCBaseInfo.Memo">
      </el-input>
      <!-- 功能键 -->
      <el-button v-if="StateStr == 0 || StateStr == 1 || StateStr == 2" size="mini" type="danger" @click="saveMCAS(6,'撤单')" style="float: right; margin: 20px" :loading="this.$store.state.Vuex.loading">撤单</el-button>
      <el-button v-if="StateStr == 0 || StateStr == 1 || StateStr == 2" size="mini" type="primary" @click="saveMCAS()" style="float: right; margin: 20px" :loading="this.$store.state.Vuex.loading">保存</el-button>
      <el-button v-if="StateStr == 0 || StateStr == 1 || StateStr == 2" size="mini" type="warning" @click="saveMCAS(2,'向客户报价')" style="float: right; margin: 20px" :loading="this.$store.state.Vuex.loading">向客户报价
      </el-button>
      <el-button v-if="StateStr == 2" size="mini" type="danger" @click="saveMCAS(3,'替客户确认报价')" style="float: right; margin: 20px" :loading="this.$store.state.Vuex.loading">替客户确认报价</el-button>

      <el-popover placement="top" width="160" v-model="WhetherToRenew">
        <p>这是一段内容这是一段内容确定删除吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="WhetherToRenew = false">取消</el-button>
          <el-button type="primary" size="mini" @click="WhetherToRenew = false">确定</el-button>
        </div>

      </el-popover>

      <el-button slot="reference" v-if="StateStr == 3" size="mini" type="primary" @click="confirmOldContracts()" style="float: right; margin: 20px" :loading="this.$store.state.Vuex.loading">收款</el-button>

      <el-button slot="reference" v-if="StateStr == 10" size="mini" type="primary" @click="Receivables(4,'收款')" style="float: right; margin: 20px" :loading="this.$store.state.Vuex.loading">收款</el-button>

      <!-- 弹窗 -->

      <el-drawer :visible.sync="drawer" direction="ltr" :modal="false" style="width: 200%" :title="titlebatch" :before-close="handleClose">
        <div class="top_init_data" v-if="this.BelongToCustomer == true" style="marginbottom: 10px">
          <!-- 检索内容 -->
          <el-input style="width: 193px" size="mini" v-model="searchs" @change="initsss()" placeholder="序列号、别名、产品描述"></el-input>
          <!-- 产品编码 -->

          <el-select size="mini" style="width:140px" @change="initsss()" v-model="CustomerType" placeholder="是否有序列号">
            <el-option v-for="item in CustomerTypes" :key="item.value + '99'" :label="item.name" :value="item.value"></el-option>
          </el-select>

          <el-button size="mini" type="primary" @click="initsss()" style="float: right">检索</el-button>
          <!-- 选择品牌 -->
        </div>

        <div class="top_init_data" v-if="this.BelongToCustomer == false" style="marginbottom: 10px">
          <!-- 检索内容 -->
          <el-input style="width: 193px" size="mini" v-model="productCode" @change="initss()" placeholder="请输入产品编码"></el-input>
          <!-- 产品编码 -->
          <el-input style="width: 193px" size="mini" v-model="barcodeMemo" @change="initss()" placeholder="请输入内部编码"></el-input>
          <!-- 内部编码 -->
          <el-input style="width: 193px" size="mini" v-model="desc" @change="initss()" placeholder="请输入产品描述"></el-input>
          <!-- 描述 -->
          <el-input style="width: 193px" size="mini" v-model="memo" @change="initss()" placeholder="请输入产品备注"></el-input>
          <!-- 备注 -->
          <el-autocomplete class="inline-input" size="mini" v-model="man" style="width: 200px" :show-overflow-tooltip="true" :fetch-suggestions="querySearch" placeholder="请选择品牌" @select="handleSelect" clearable>
          </el-autocomplete>

          <el-button size="mini" type="primary" @click="initss()" style="float: right">检索</el-button>
          <!-- 选择品牌 -->
        </div>

        <!-- 表格 -->
        <el-table :data="Datatable" size="mini" :height="this.$store.state.TableOptimumHeight" border style="marginbottom: 10px" ref="multipleTable" :header-cell-style="{ background: '#e1e1e1' }">
          <el-table-column prop="ProductCode" label="产品编号" width="170"></el-table-column>
          <el-table-column prop="BarcodeMemo" v-if="this.BelongToCustomer == false" label="内部编码" width="140"></el-table-column>
          <el-table-column prop="SN" v-if="this.BelongToCustomer == true" label="序列号" width="130"></el-table-column>
          <el-table-column prop="Manufacturer" label="品牌" width="120"></el-table-column>
          <el-table-column prop="Characteristics" label="产品描述" :show-overflow-tooltip="true"></el-table-column>
          <!-- <el-table-column prop="Unit" label="单位" width="120"></el-table-column> -->
          <!-- <el-table-column prop="UpdateDate" label="更新时间" width="120"></el-table-column> -->
          <el-table-column fixed="right" style="float: left" type="selection" width="55"></el-table-column>
          <el-table-column fixed="right" style="float: left" label="添加数量" width="154" v-if="this.BelongToCustomer == false">
            <template slot-scope="scope">
              <el-input-number :min="1" size="mini" v-model="scope.row.Numberindex1"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="80">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="adds(scope.row)">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" size="mini" style="float: right" @click="addscheck()">添加选择</el-button>
        <!-- 分页 -->
        <nav style="text-align: center">
          <el-pagination class="pagition-li" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="this.$store.state.Vuex.pageSNumber" :page-size="pagesize"
            layout=" total , sizes, prev, pager, next, jumper " :total="total"></el-pagination>
        </nav>
      </el-drawer>
    </div>

    <el-dialog title="请选择被续签的合同" :visible.sync="ContractWithOptionOfRenewal" :modal-append-to-body='false' :height="this.$store.state.TableOptimumHeight">
      <el-table :data="DataList" ref="SelectedContracts">

        <el-table-column prop="ContractType" label="合同类型"></el-table-column>
        <el-table-column prop="MaintainCode" label="合同号"></el-table-column>
        <el-table-column prop="Area" label="区域"></el-table-column>
        <el-table-column prop="EquCount" label="数量" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="CreateDate" label="创建日期"></el-table-column>
        <el-table-column prop="StateStr" label="当前状态"></el-table-column>
        <el-table-column prop="SalesPerson" label="销售员"></el-table-column>
        <el-table-column type="selection" width="55">
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="ContractWithOptionOfRenewal = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="IveChosen()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Sortable from "sortablejs";
let Base64 = require("js-base64").Base64;
export default {
  name: "",
  data() {
    return {
      // 是否续签
      WhetherToRenew: false,
      MaintainRHF: false,
      reverse: true,
      drawer: false,
      col: [
        {
          label: "序号",
          prop: "Pos",
          width: "80",

          sortable: true,
        },
        {
          label: "设备编码",
          prop: "ProductCode",
          width: "150",
          sortable: true,
        },
        {
          label: "品牌",
          prop: "Brand",
          width: "150",
          sortable: true,
        },
        {
          label: "描述",
          prop: "Desc",
          width: "",
          widths: true,
          sortable: true,
        },
        {
          label: "保养单价",
          prop: "MaintainPrice",
          width: "100",
          sortable: false,
        },
        {
          label: "序列号",
          prop: "SN",
          width: "150",
          sortable: true,
        },
      ],
      dropCol: [
        {
          label: "序号",
          prop: "Pos",
          width: "80",
          sortable: true,
        },
        {
          label: "设备编码",
          prop: "ProductCode",
          width: "150",
          sortable: true,
        },
        {
          label: "品牌",
          prop: "Brand",
          width: "150",
          sortable: true,
        },
        {
          label: "描述",
          prop: "Desc",
          width: "",
          widths: true,
          sortable: true,
        },
        {
          label: "保养单价",
          prop: "MaintainPrice",
          width: "100",
          sortable: false,
        },
        {
          label: "序列号",
          prop: "SN",
          width: "150",
          sortable: true,
        },
      ],
      CustomerType: "2",
      CustomerTypes: [
        { name: "全部", value: "1" },
        { name: "有序列号", value: "2" },
        { name: "无序列号", value: "3" },
      ],
      Data: [],
      EquDtos: [],
      EquDtos1: [],
      search: "",
      Datatable: [], //表格数据
      pageNum: 1, //
      pagesize: 10, //每页显示条数
      total: 0, //总条目数
      productCode: "",
      //   产品编码
      barcodeMemo: "",
      //   内部编码
      man: "",
      //   品牌
      desc: "",
      //   产品描述
      memo: "",
      //   产品备注
      options: [],
      //  品牌选项
      titlebatch: "",
      Type: "",
      BelongToCustomer: true,
      searchs: "", // 客户设备检索
      CTTAMCAS: 0,
      loading: false,
      StateStr: "",
      MCCollectionss: "", // 发起收款
      GetMCPlistData: [],
      GetMCPlistDataList: 0, // 已收金额
      EquDtosList: [], // 排序数据
      EquDtos1List: [], // 排序数据
      MCOrderDtos: [], // 任务
      Time1: "", //创建的任务时间
      PreferentialAmountSD: 0,
      tableheight: 300,
      MyEquipmentDatabaseState: 0,
      code2: "", // 我的设备资料库   区分AS  MC
      FinancialConfirmed: 0, // 财务已确认
      FinancialUnconfirmed: 0, // 财务未确认
      DataList: [],
      ContractWithOptionOfRenewal: false,
    };
  },
  filters: {
    TimeCode(res) {
      if (res == null || res == undefined || res == "") {
        return " - - ";
      }
      return res.split("T")[0];
    },
  },
  created() {
    var that = this;
    that.CTTAMCAS = 0; //  第一次判断不进行优惠计算    使用后台数据
    // that.GetMCPlist();
    window.onresize = () => {
      return (() => {
        var docuwidth = document.body.clientWidth;
        if (that.$store.state.docuwidth < 1400) {
          that.tableheight = "400";
        } else {
          that.tableheight = "700";
        }
      })();
    };
  },
  mounted() {
    this.initMaintenan();
  },
  methods: {
    // 选择前身合同
    IveChosen: function () {
      console.log(this.$refs.SelectedContracts.selection);
      if (this.$refs.SelectedContracts.selection.length == 0) {
        this.$look("warning", "提示！", "请至少选择一份合同！");
        return false;
      }
      var ASList = [];

      for (
        let index = 0;
        index < this.$refs.SelectedContracts.selection.length;
        index++
      ) {
        const element = this.$refs.SelectedContracts.selection[index];
        ASList.push(element.Id);
      }

      console.log(ASList);
      var obj = {
        api: "post",
        url: this.$store.state.http + "Maintain/MCBeRenewed",
        data: {
          MCId: this.$store.state.Vuex.MaintenanceContractDetailsID,
          BeRenewedIds: ASList,
        },
      };
      this.$https(obj).then((res) => {
        this.ContractWithOptionOfRenewal = false;
        this.initMaintenan();
        this.$look("success", "成功", "请继续操作！");
      });
    },

    confirmOldContracts: function () {
      this.$confirm("当前合同为续签合同还是新建合同？", "提示", {
        confirmButtonText: "新建合同",
        cancelButtonText: "续签合同",
        type: "warning",
      })
        .then(() => {
          this.Receivables(4, "收款");
        })
        .catch(() => {
          var obj = {
            url: this.$store.state.http + "Maintain/GetMCs",
            api: "get",
            data: {
              pageNum: 1,
              numPerPage: 99999,
              orderField: "",
              orderDirection: "",
              search: "",
              state: "-1",
              cusFullName: this.Data.MCBaseInfo.CusFullName,
              area: "",
              cusType: "",
              begin: "",
              end: "",
            },
          };
          this.$https(obj).then((res) => {
            // this.total = res.Data.DataBars;
            this.DataList = res.Data.Dtos;

            // 剔除本身合同
            for (let index = 0; index < this.DataList.length; index++) {
              const element = this.DataList[index];
              if (
                element.Id ==
                this.$store.state.Vuex.MaintenanceContractDetailsID
              ) {
                this.DataList.splice(index, 1);
              }
            }

            for (let index = 0; index < this.DataList.length; index++) {
              const element = this.DataList[index];

              element.CreateDate = element.CreateDate.split("T")[0];
              element.AcceptDate =
                element.AcceptDate == null || ""
                  ? " - - "
                  : element.AcceptDate.split("T")[0];
              element.PayDate =
                element.PayDate == null || ""
                  ? " - - "
                  : element.PayDate.split("T")[0];
            }
            console.log(this.DataList);
            this.ContractWithOptionOfRenewal = true;
          });
        });
    },
    ResetMC: function () {
      var obj = {
        api: "post",
        url: this.$store.state.http + "Maintain/ResetMC",
        data: {
          Id: this.$store.state.Vuex.MaintenanceContractDetailsID,
        },
      };
      this.$https(obj).then((res) => {
        this.$look(
          "success",
          "恢复成功！",
          Row.MaintainCode + "的状态已恢复！"
        );
      });
    },
    // 键入
    querySearch(queryString, cb) {
      if (queryString == undefined) {
        queryString = "";
        cb(this.options);
        return false;
      }
      if (queryString == "") {
        cb(this.options);
        return false;
      }

      var Search = queryString;
      var Data2 = this.options;
      var DataInit = [];
      var input = Search.split("")[0];

      for (let index = 0; index < Data2.length; index++) {
        const element = Data2[index];
        if (element.value.indexOf(Search) != -1) {
          DataInit.push(element);
          // break;
        }
      }

      cb(DataInit);
    },
    // 点击  选择品牌
    handleSelect(item) {
      this.initss();
    },
    // ICMS.保存保养收款
    MCCollections: function () {
      if (this.MCCollectionss == "" || this.MCCollectionss == 0) {
        this.$look("warning", "提示！", '请输入收款金额！（不可为 "0" ）');
        return false;
      }
      var MCCo = Number(this.MCCollectionss) + Number(this.GetMCPlistDataList);
      console.log(MCCo);
      if (MCCo > this.PreferentialAmountSD) {
        console.log(this.PreferentialAmountSD, Number(this.GetMCPlistDataList));
        this.$look(
          "warning",
          "收款超出应收金额！",
          "剩余待收款" +
            (this.PreferentialAmountSD - Number(this.GetMCPlistDataList)) +
            "元"
        );
        return false;
      }
      var obj = {
        api: "post",
        url: this.$store.state.http + "maintain/MCCollections",
        data: {
          Id: this.$store.state.Vuex.MaintenanceContractDetailsID, // 主键
          Str: this.MCCollectionss,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res);
        this.GetMCPlist();
        this.$look("success", "成功！", "已发起收款！");
      });
    },
    // ICMS.获取保养合同回款列表
    GetMCPlist: function () {
      var obj = {
        api: "GET",
        url: this.$store.state.http + "maintain/GetMCPlist",
        data: {
          id: this.$store.state.Vuex.MaintenanceContractDetailsID, // 主键
        },
      };
      this.$https(obj).then((res) => {
        this.GetMCPlistData = res.Data;
        console.log(this.GetMCPlistData);
        this.GetMCPlistDataList = 0;

        for (let index = 0; index < this.GetMCPlistData.length; index++) {
          const element = this.GetMCPlistData[index];
          this.GetMCPlistDataList += element.Amount;
          if (element.State == 2) {
            console.log(element.Amount);
            this.FinancialConfirmed += element.Amount;
          } else {
            this.FinancialUnconfirmed += element.Amount;
          }
        }
      });
    },
    // 跳过保养任务
    SkipTheMaintenanceTask: function () {
      this.loading = true;
      var obj = {
        api: "post",
        url: this.$store.state.http + "maintain/UpdateMCState",
        data: {
          MCId: this.$store.state.Vuex.MaintenanceContractDetailsID, // 主键
          State: 5,
        },
      };
      this.$https(obj).then((res) => {
        this.$look("success", "成功！", "已跳过保养任务！");
        this.$router.push({
          path: "/MaintenanceManagement",
        });
        this.loading = false;
      });
    },
    // ICMS.修改状态
    Receivables: function (res, tit) {
      this.CTTAMCAS = 0;
      if (this.loading) {
        return false;
      } else {
        this.loading = true;
      }
      var obj = {
        api: "post",
        url: this.$store.state.http + "maintain/UpdateMCState",
        data: {
          MCId: this.$store.state.Vuex.MaintenanceContractDetailsID, // 主键
          State: res,
        },
      };
      this.$https(obj).then((res) => {
        this.$look("success", "成功！", tit + "成功！");
        this.initMaintenan();
        this.loading = false;
      });
    },
    // ? ICMS.保存
    saveMCAS: function (HF, tit) {
      if (this.loading) {
        return false;
      } else {
        this.loading = true;
      }
      var obj = {
        url: this.$store.state.http + "Maintain/SaveMC",
        api: "post",
        data: {
          MCBaseInfo: {
            Id: this.$store.state.Vuex.MaintenanceContractDetailsID, // 主键
            MaintainCode: this.Data.MCBaseInfo.MaintainCode, // 合同号
            Memo: this.Data.MCBaseInfo.Memo, // 备注
            LinkMan: this.Data.MCBaseInfo.LinkMan, // 联系人
            LinkManEngilsh: this.Data.MCBaseInfo.LinkManEngilsh, // 英文名
            Mobile: this.Data.MCBaseInfo.Mobile, // 手机号
          },
          MCEquInfo: {
            YearLife: this.Data.MCEquInfo.YearLife,
            MaintainCount: this.Data.MCEquInfo.MaintainCount,
            AmountTotal: this.Data.MCEquInfo.AmountTotal,
            PreferentialAmount: this.Data.MCEquInfo.PreferentialAmount,
            PreferentialRatio: this.Data.MCEquInfo.PreferentialRatio,
            IsShowDiscount: this.Data.MCEquInfo.IsShowDiscount,
            TravelExpenses: this.Data.MCEquInfo.TravelExpenses,
            TraveTime: this.Data.MCEquInfo.TraveTime,
          },
          ASEquInfo: {
            ASAmountTotal: this.Data.ASEquInfo.ASAmountTotal,
            ASPreferentialAmount: this.Data.ASEquInfo.ASPreferentialAmount,
            ASPreferentialRatio: this.Data.ASEquInfo.ASPreferentialRatio,
            YearOfEstablishment: this.Data.ASEquInfo.YearOfEstablishment,
            TotalNumberOfLifts: this.Data.ASEquInfo.TotalNumberOfLifts,
            QNHF: this.Data.ASEquInfo.QNHF,
            TotalNumberOfAirCompressor:
              this.Data.ASEquInfo.TotalNumberOfAirCompressor,
            TotalNumberOfSprayBooth:
              this.Data.ASEquInfo.TotalNumberOfSprayBooth,
          },
        },
      };
      this.$https(obj).then((res) => {
        this.CTTAMCAS = 0;
        if (HF == 2 || HF == 3 || HF == 6 || HF == 5) {
          // 保存完修改状态
          var obj = {
            api: "post",
            url: this.$store.state.http + "maintain/UpdateMCState",
            data: {
              MCId: this.$store.state.Vuex.MaintenanceContractDetailsID, // 主键
              State: HF,
            },
          };
          this.$https(obj).then((res) => {
            this.$look("success", "成功！", tit + "成功！");
            this.initMaintenan();
            this.loading = false;
          });
        } else {
          // 单纯保存
          this.$look("success", "成功！", "保存成功！");
          this.initMaintenan();
          this.loading = false;
        }
      });
    },

    saveMCASNO: function (HF, tit) {
      var obj = {
        url: this.$store.state.http + "Maintain/SaveMC",
        api: "post",
        data: {
          MCBaseInfo: {
            Id: this.$store.state.Vuex.MaintenanceContractDetailsID, // 主键
            MaintainCode: this.Data.MCBaseInfo.MaintainCode, // 合同号
            Memo: this.Data.MCBaseInfo.Memo, // 备注
            LinkMan: this.Data.MCBaseInfo.LinkMan, // 联系人
            LinkManEngilsh: this.Data.MCBaseInfo.LinkManEngilsh, // 英文名
            Mobile: this.Data.MCBaseInfo.Mobile, // 手机号
          },
          MCEquInfo: {
            YearLife: this.Data.MCEquInfo.YearLife,
            MaintainCount: this.Data.MCEquInfo.MaintainCount,
            AmountTotal: this.Data.MCEquInfo.AmountTotal,
            PreferentialAmount: this.Data.MCEquInfo.PreferentialAmount,
            PreferentialRatio: this.Data.MCEquInfo.PreferentialRatio,
            IsShowDiscount: this.Data.MCEquInfo.IsShowDiscount,
            TravelExpenses: this.Data.MCEquInfo.TravelExpenses,
            TraveTime: this.Data.MCEquInfo.TraveTime,
          },
          ASEquInfo: {
            ASAmountTotal: this.Data.ASEquInfo.ASAmountTotal,
            ASPreferentialAmount: this.Data.ASEquInfo.ASPreferentialAmount,
            ASPreferentialRatio: this.Data.ASEquInfo.ASPreferentialRatio,
            YearOfEstablishment: this.Data.ASEquInfo.YearOfEstablishment,
            TotalNumberOfLifts: this.Data.ASEquInfo.TotalNumberOfLifts,
            QNHF: this.Data.ASEquInfo.QNHF,
            TotalNumberOfAirCompressor:
              this.Data.ASEquInfo.TotalNumberOfAirCompressor,
            TotalNumberOfSprayBooth:
              this.Data.ASEquInfo.TotalNumberOfSprayBooth,
          },
        },
      };
      this.$https(obj).then((res) => {});
    },
    // 实时更新AS优惠后金额
    ChangeASPreferentialAmount: function () {
      var MaintainCount = this.Data.MCEquInfo.MaintainCount; // 保养次数
      var YearOfEstablishment = this.Data.ASEquInfo.YearOfEstablishment; //建店年份
      var TotalNumberOfLifts = this.Data.ASEquInfo.TotalNumberOfLifts; //举升机数量
      var TotalNumberOfAirCompressor =
        this.Data.ASEquInfo.TotalNumberOfAirCompressor; //空压机数量
      var TotalNumberOfSprayBooth = this.Data.ASEquInfo.TotalNumberOfSprayBooth; //烤漆房数量

      if (
        YearOfEstablishment == "" || //建店年份
        TotalNumberOfLifts == "" || //举升机数量
        TotalNumberOfAirCompressor == "" || //空压机数量
        TotalNumberOfSprayBooth == "" //烤漆房数量
      ) {
        this.$look("warning", "提示！", "补全AS信息！");
      } else {
        var kqfxishu =
          this.Data.MCBaseInfo.CusType == "宝马"
            ? 31400
            : this.Data.MCBaseInfo.CusType == "保时捷"
            ? 100000
            : 0;
        var kyjxishu = 20000;

        var dateTIME = new Date();
        var y = dateTIME.getFullYear();
        var ninaxishu =
          (9 - (y - this.Data.ASEquInfo.YearOfEstablishment)) * 0.05;

        if (ninaxishu < 0) {
          ninaxishu = 0;
        }
        if (ninaxishu > 0.3) {
          ninaxishu = 0.3;
        }

        var jsjxishu = (this.Data.ASEquInfo.TotalNumberOfLifts - 10) * 0.0125;
        if (jsjxishu < 0) {
          jsjxishu = 0;
        }
        if (jsjxishu > 0.2) {
          jsjxishu = 0.2;
        }
        var jichudabaoxishu = 35; //基础大包日系数

        var dabaoxishu = (1 - jsjxishu - ninaxishu) * jichudabaoxishu;

        this.Data.ASEquInfo.ASAmountTotal =
          (TotalNumberOfLifts * jichudabaoxishu * 300 +
            TotalNumberOfSprayBooth * kqfxishu +
            TotalNumberOfAirCompressor * kyjxishu) *
          MaintainCount;

        this.Data.ASEquInfo.ASPreferentialAmount = (
          (TotalNumberOfLifts * dabaoxishu * 300 +
            TotalNumberOfSprayBooth * kqfxishu +
            TotalNumberOfAirCompressor * kyjxishu) *
          MaintainCount
        ).toFixed(2);
      }
    },
    // ICMS.Calculate the total amount of MC  计算MC总金额  and 优惠金额
    CTTAMC: function () {
      var MCNumberQB = 0;
      var listMc = this.Data.MCEquInfo.EquDtos;
      for (let index = 0; index < listMc.length; index++) {
        const element = listMc[index];
        MCNumberQB +=
          element.Number * element.MaintainPrice * element.MaintainCount;
      }
      var PreferentialRatio = this.Data.MCEquInfo.PreferentialRatio;
      this.Data.MCEquInfo.AmountTotal =
        MCNumberQB +
        this.Data.MCEquInfo.TravelExpenses * this.Data.MCEquInfo.TraveTime;
      if (this.CTTAMCAS == 1) {
        this.Data.MCEquInfo.PreferentialAmount = (
          MCNumberQB *
          ((100 - PreferentialRatio) * 0.01)
        ).toFixed(2);
      }
      // this.saveMCASNO();
    },
    // ICMS.修改保养合同差旅次数
    EditMCTN: function (res) {
      if (this.Data.MCEquInfo.TraveTime == 0 && res == "Del") {
        return false;
      }
      var obj = {
        url: this.$store.state.http + "Maintain/EditMCTN",
        api: "post",
        data: {
          Id: this.$store.state.Vuex.MaintenanceContractDetailsID,
          Type: res,
          Str: this.Data.MCEquInfo.TravelExpenses,
        },
      };
      this.$https(obj).then((res) => {
        this.initMaintenan();
      });
    },
    // 修改总保养次数
    EditMCN: function (res) {
      if (this.Data.MCEquInfo.MaintainCount == 0 && res == "Del") {
        this.$look("warning", "提示！", "已达到最低保养次数！");
        return false;
      }
      var obj = {
        url: this.$store.state.http + "Maintain/EditMCN",
        api: "post",
        data: {
          Id: this.$store.state.Vuex.MaintenanceContractDetailsID,
          Type: res,
        },
      };
      this.$https(obj).then((res) => {
        this.initMaintenan();
      });
    },
    // 增删设备保养数量
    EditMCEquMN: function (row, AL) {
      if (row.MaintainCount == 0 && AL == "Del") {
        this.$look("warning", "提示！", "已达到最低保养次数！");
        return false;
      }
      console.log(row, AL);
      var obj = {
        url: this.$store.state.http + "Maintain/EditMCEquMN",
        api: "post",
        data: {
          Id: row.MCEquId,
          Type: AL,
        },
      };
      this.$https(obj).then((res) => {
        this.initMaintenan();
      });
    },
    // 增删设备数量
    EditMCEqu: function (row, AL, MCAS) {
      console.log(row, AL);
      // 判断是否为最后一个
      if (row.Number_s == 1 && AL == "Del") {
        this.delescoped(row, MCAS);
        return false;
      }
      var obj = {
        url: this.$store.state.http + "Maintain/EditMCEqu",
        api: "post",
        data: {
          Id: row.MCEquId,
          Type: AL,
        },
      };
      this.$https(obj).then((res) => {
        // 重新排序
        this.initMaintenan();
      });
    },
    // 删除设备
    delescoped: function (res, TM) {
      let _this = this;
      var obj = {
        url: _this.$store.state.http + "Maintain/DelEquToMC",
        api: "post",
        data: {
          Id: res.MCEquId,
        },
      };
      _this.$https(obj).then((rss) => {
        // 判断删除MC？AS
        var EqList = [];
        TM == "MC"
          ? (EqList = _this.$refs.MC.tableData)
          : (EqList = _this.$refs.AS.tableData);
        // 从现有的设备中删除设备
        EqList.forEach((item, index) => {
          console.log(item.ProductId);
          if (item.ProductId == res.ProductId) {
            EqList.splice(index, 1);
          }
        });
        // 创建新的集合
        var EquDtosList = [];
        EqList.forEach((item, index) => {
          EquDtosList[index] = {
            MaintainEquId: item.MCEquId,
            Desc: item.Desc,
            Pos: item.Pos,
            Sort: index + 1,
          };
        });
        var obj = {
          url: _this.$store.state.http + "Maintain/AfreshEquSort",
          api: "post",
          data: {
            MaintainId: _this.$store.state.Vuex.MaintenanceContractDetailsID,
            Dtos: EquDtosList,
          },
        };
        _this.$https(obj).then((xxx) => {
          setTimeout(function () {
            _this.initMaintenan();
          }, 500);
        });
      });
    },
    //   关闭窗口
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    //  我的设备资料库
    MyEquipmentDatabase: function (code1, code2) {
      (this.pageNum = 1), (this.pagesize = 10);

      this.initsss(code2);
      this.code2 = code2;
      this.Manufacturer();
      this.titlebatch = "我的设备资料库";
      this.drawer = true;
      this.Type = code2;
      this.BelongToCustomer = code1;
    },
    EquipmentDatabase: function (code1, code2) {
      (this.pageNum = 1), (this.pagesize = 10);
      this.initss();
      this.Manufacturer();
      this.titlebatch = "设备资料库";
      this.drawer = true;
      this.Type = code2;
      this.BelongToCustomer = code1;
    },
    // 初始数据
    initMaintenan: function () {
      var obj = {
        url: this.$store.state.http + "Maintain/GetMC",
        api: "get",
        data: {
          Id: this.$store.state.Vuex.MaintenanceContractDetailsID,
        },
      };
      this.$https(obj).then((res) => {
        this.Data = res.Data;
        console.log(this.Data);
        // 展示数据
        // console.log(res.Data.ASEquInfo.EquDtos)

        this.EquDtos1 = this.mergeArr(res.Data.MCEquInfo.EquDtos);
        this.EquDtos = this.mergeArr(res.Data.ASEquInfo.EquDtos);
        console.log(this.EquDtos1);
        // this.EquDtos = res.Data.ASEquInfo.EquDtos
        // 任务列表
        this.MCOrderDtos = res.Data.MCOrderDtos;
        // 排序数据
        this.EquDtos1List = this.mergeArr(res.Data.MCEquInfo.EquDtos);
        this.EquDtosList = this.mergeArr(res.Data.ASEquInfo.EquDtos);
        this.StateStr = this.Data.MCBaseInfo.State;
        if (
          res.Data.MCBaseInfo.ContractType == "服务公司AS" ||
          res.Data.MCBaseInfo.ContractType == "技术公司AS"
        ) {
          this.PreferentialAmountSD =
            res.Data.ASEquInfo.ASPreferentialAmount +
            res.Data.MCEquInfo.TravelExpenses * res.Data.MCEquInfo.TraveTime;
        } else {
          this.PreferentialAmountSD =
            res.Data.MCEquInfo.PreferentialAmount +
            res.Data.MCEquInfo.TravelExpenses * res.Data.MCEquInfo.TraveTime;
        }
        var _this = this;
        this.CTTAMC(); // 计算总金额
        setTimeout(function () {
          _this.rowDrop();
        }, 500);
        setTimeout(function () {
          _this.rowDrops();
        }, 500);
        this.GetMCPlist();
        this.CTTAMCAS = 1;
      });
    },
    // 合并同类项
    mergeArr(arr) {
      var newArr = [];
      console.log(arr);
      arr.forEach((item) => {
        item["Number_s"] = 1;
        // BelongToCustomer 值 为 true 则不合并  直接添加
        if (item.BelongToCustomer) {
          newArr.push(item);
          return true;
        }
        // 如果 newArr 还没有值  第一个值直接放入
        if (newArr.length == 0) {
          newArr.push(item);
          return true;
        }
        // 判断newArr内是否存在 item 如果有直接加数量  , 没有  直接push
        var itemsBoo = true;
        newArr.forEach((items) => {
          if (
            items.ProductId == item.ProductId &&
            items.BelongToCustomer == false
          ) {
            items.Number_s += 1;
            itemsBoo = false;
            return false;
          }
        });
        // 没有相同 item 直接添加
        if (itemsBoo) {
          newArr.push(item);
        }
      });
      return newArr;
    },

    // MC
    rowDrop() {
      const tbody = document.querySelector(
        "#LEtetabe .el-table__body-wrapper tbody"
      );
      const _this = this;
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          var currRow = {};
          console.log(newIndex, oldIndex);
          if (newIndex == oldIndex) {
            return false;
          }

          var EqList = _this.EquDtos1List;
          var Topitem = EqList[oldIndex];

          EqList.splice(oldIndex, 1);
          EqList.splice(newIndex, 0, Topitem);

          var EquDtosList = [];
          for (let index = 0; index < EqList.length; index++) {
            const element = EqList[index];
            EquDtosList[index] = {
              MaintainEquId: element.MCEquId,
              Sort: index + 1,
            };
          }

          var obj = {
            url: _this.$store.state.http + "Maintain/AfreshEquSort",
            api: "post",
            data: {
              MaintainId: _this.$store.state.Vuex.MaintenanceContractDetailsID,
              Dtos: EquDtosList,
            },
          };
          _this.$https(obj).then((res) => {
            _this.EquDtos1 = [];
            _this.initMaintenan();
          });
        },
      });
    },
    // AS
    rowDrops() {
      const tbody = document.querySelector(
        "#LEtetabes .el-table__body-wrapper tbody"
      );
      const _this = this;
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          //  位置相同 表示轻微挪动
          if (newIndex == oldIndex) {
            return false;
          }
          // console.log(newIndex, oldIndex);
          var EqList = _this.EquDtosList;
          var Topitem = EqList[oldIndex];

          EqList.splice(oldIndex, 1);
          EqList.splice(newIndex, 0, Topitem);

          var EquDtosList = [];
          for (let index = 0; index < EqList.length; index++) {
            const element = EqList[index];
            EquDtosList[index] = {
              MaintainEquId: element.MCEquId,
              Sort: index + 1,
            };
          }

          var obj = {
            url: _this.$store.state.http + "Maintain/AfreshEquSort",
            api: "post",
            data: {
              MaintainId: _this.$store.state.Vuex.MaintenanceContractDetailsID,
              Dtos: EquDtosList,
            },
          };
          _this.$https(obj).then((res) => {
            _this.EquDtos = [];
            _this.initMaintenan();
          });
        },
      });
    },
    //  获取品牌
    Manufacturer: function () {
      var obj = {
        url: this.$store.state.http + "System/GetBrand",
        api: "get",
      };
      this.$https(obj).then((res) => {
        this.options = res.Data;
        for (let index = 0; index < this.options.length; index++) {
          this.options[index]["value"] = this.options[index].Value;
        }
        console.log(this.options);
      });
    },
    // 初始化 弹窗
    initss: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "Product/GetProducts2",
        data: {
          pageNum: this.pageNum,
          numPerPage: this.pagesize,
          orderField: "",
          orderDirection: "",
          kitflag: false,
          protype: 2,
          //   规定参数：bool kitflag   true零配件   false整机
          productCode: this.productCode,
          //   产品编码
          barcodeMemo: this.barcodeMemo,
          //   内部编码
          man: this.man,
          //   品牌
          desc: this.desc,
          //   产品描述
          memo: this.memo,
          //   产品备注
        },
      };
      this.$https(obj).then((res) => {
        this.total = res.Data.DataBars;
        this.Datatable = res.Data.Dtos;
        for (let index = 0; index < this.Datatable.length; index++) {
          this.Datatable[index].UpdateDate =
            this.Datatable[index].UpdateDate.split("T")[0];
          this.$set(this.Datatable[index], "Numberindex1", 1);
        }
        console.log(res.Data.Dtos);
      });
    },
    initsss: function (code2) {
      var obj = {
        api: "get",
        url: this.$store.state.http + "CRM/GetCustomerEqus",
        data: {
          pageNum: this.pageNum,
          numPerPage: this.pagesize,
          orderField: "",
          orderDirection: "",
          search: this.searchs,
          cusId: this.$store.state.CusId || this.Data.MCBaseInfo.CusId,
          onlyhavesn: this.CustomerType,
          otherType: code2,
          sourceId: this.$store.state.Vuex.MaintenanceContractDetailsID,
        },
      };
      this.$https(obj).then((res) => {
        this.total = res.Data.DataBars;
        this.Datatable = res.Data.Dtos;
        for (let index = 0; index < this.Datatable.length; index++) {
          this.Datatable[index].Characteristics = this.Datatable[index].Desc;
          this.Datatable[index].UpdateDate =
            this.Datatable[index].BeganRunDate.split("T")[0];
          this.Datatable[index].Unit = "无";
          this.Datatable[index].ProductCode = this.Datatable[index].ProdcutCode;
          this.Datatable[index].Manufacturer = this.Datatable[index].Brand;
          this.Datatable[index].BarcodeMemo = " - ";

          this.$set(this.Datatable[index], "Numberindex1", 1);
        }

        console.log(this.Datatable);
      });
    },
    // 选择添加
    addscheck: function () {
      console.log(this.$refs.multipleTable.selection);
      var arr = [],
        List = this.$refs.multipleTable.selection;
      for (let index = 0; index < List.length; index++) {
        const element = List[index];
        arr.push({
          BelongToCustomer: this.BelongToCustomer,
          EquId: element.ID || element.Id,
          Type: this.Type,
          Number: element.Numberindex1,
        });
      }
      var obj = {
        api: "post",
        url: this.$store.state.http + "Maintain/AddEquToMC",
        data: {
          MCId: this.$store.state.Vuex.MaintenanceContractDetailsID,
          EquToMCDtos: arr,
        },
      };
      this.$https(obj).then((res) => {
        this.drawer = false;
        this.initMaintenan();
      });
    },
    // 单个添加
    adds: function (res) {
      console.log(res);
      var obj = {
        api: "post",
        url: this.$store.state.http + "Maintain/AddEquToMC",
        data: {
          MCId: this.$store.state.Vuex.MaintenanceContractDetailsID,
          EquToMCDtos: [
            {
              BelongToCustomer: this.BelongToCustomer,
              EquId: res.ID || res.Id,
              Type: this.Type,
              Number: res.Numberindex1,
            },
          ],
        },
      };
      this.$https(obj).then((res) => {
        this.drawer = false;
        this.initMaintenan();
      });
    },

    handleCurrentChange(val) {
      this.pageNum = val;
      if (this.BelongToCustomer == false) {
        this.initss();
      } else {
        this.initsss(this.code2);
      }
    },
    // 切换 每页条数时触发  刷新
    handleSizeChange(val) {
      this.pagesize = val;
      if (this.BelongToCustomer == false) {
        this.initss();
      } else {
        this.initsss(this.code2);
      }
    },
    Numberindexadddel: function (e, res) {
      console.log(e);
      console.log(res);
    },
    // 创建保养任务
    AddMCOrderDtos: function () {
      if (this.Time1 == "" || this.Time1 == null || this.Time1 == undefined) {
        this.$look("warning", "提示！", "请选择日期！");
        return false;
      }
      var obj = {
        url: this.$store.state.http + "Maintain/CreateMCOrder",
        api: "post",
        data: {
          Id: this.$store.state.Vuex.MaintenanceContractDetailsID,
          Str: this.Time1,
        },
      };
      this.$https(obj).then((adds) => {
        this.initMaintenan();
      });
    },

    // 下载保养合同
    httpTXFWQBYHT: function (index) {
      if (index == "MC" || index == "AS") {
        // 合同
        const { href } = this.$router.resolve({
          path:
            this.$store.state.Vuex.TencentServer + "/AS&MC/" + index + ".html",
          query: {
            url: Base64.encodeURI(
              this.$store.state.http + "Maintain/GetMaintainContract"
            ),
            ID: Base64.encodeURI(
              this.$store.state.Vuex.MaintenanceContractDetailsID
            ),
            token: Base64.encodeURI(localStorage.getItem("token")),
          },
        });
        window.open(href.slice(2), "_blank");
      } else if (index == "ASs") {
        // 合同
        const { href } = this.$router.resolve({
          path:
            this.$store.state.Vuex.TencentServer + "/AS&MC/" + index + ".html",
          query: {
            url: Base64.encodeURI(this.$store.state.http + "Maintain/GetMCYu"),
            ID: Base64.encodeURI(
              this.$store.state.Vuex.MaintenanceContractDetailsID
            ),
            token: Base64.encodeURI(localStorage.getItem("token")),
          },
        });
        window.open(href.slice(2), "_blank");
      } else {
        // 附件
        const { href } = this.$router.resolve({
          path:
            this.$store.state.Vuex.TencentServer + "/AS&MC/" + index + ".html",
          query: {
            url: Base64.encodeURI(
              this.$store.state.http + "Maintain/GetMCAppendix"
            ),
            ID: Base64.encodeURI(
              this.$store.state.Vuex.MaintenanceContractDetailsID
            ),
            token: Base64.encodeURI(localStorage.getItem("token")),
          },
        });
        window.open(href.slice(2), "_blank");
      }
    },
    // 筛选排序
    sortchange: function (MA) {
      let _this = this;
      if (MA == 1) {
        var EqList = _this.$refs.MC.tableData;
      } else {
        var EqList = _this.$refs.AS.tableData;
      }
      var EquDtosList = [];
      for (let index = 0; index < EqList.length; index++) {
        const element = EqList[index];
        EquDtosList[index] = {
          MaintainEquId: element.MCEquId,
          Desc: element.Desc,
          Pos: element.Pos,
          Sort: index + 1,
        };
      }
      console.log(EquDtosList);
      var obj = {
        url: _this.$store.state.http + "Maintain/AfreshEquSort",
        api: "post",
        data: {
          MaintainId: _this.$store.state.Vuex.MaintenanceContractDetailsID,
          Dtos: EquDtosList,
        },
      };
      _this.$https(obj).then((res) => {
        _this.EquDtos1 = [];
        setTimeout(function () {
          _this.initMaintenan();
        }, 500);
      });
    },
  },
};
</script>
<style>
</style>
