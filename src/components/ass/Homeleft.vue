<template>
  <div class="left-div">
    <div class="view animate__animated animate__backInLeft" v-for="(itemsss,keysss) of Datts" :key="keysss">
      <!-- 标题 -->
      <div class="collaps" @click="styles(keysss)" v-if="itemsss.Show" :style="{
        background:(keysss == itemsindex1?'#409EFF':'#dce1e2bd'),
        color:(keysss == itemsindex1?'#ffffff':'#000'),
      }">
        <i :class="itemsss.img" style="fontSize:18px"></i>
        {{itemsss.MenuName}}
        <i class="imgsasicon el-icon-caret-bottom" style="fontSize:18px" :style="{
          transition:'0.3s',
          transform:(keysss==showindex?' rotate(90deg)':' rotate(0deg)'),
        }"></i>
      </div>
      <!-- 子级 -->
      <div class="COPPNOT" v-show="itemss44.Show" :style="{
        color:(keysss+'0'+index666 == itemsindex?'#000':'#000'),
        height:(keysss==showindex?'30px':'0px'),
        transition:'0.2s',
        transform:(keysss==showindex?'scale(1)':'scale(0)'),
        background:(keysss+'0'+index666 == itemsindex?'#ffffffc4':'#ffffffc4'),
        borderBottom:(keysss==showindex?'1px solid #ccc':'1px #ccc')
      }" @click="con(itemss44,keysss,index666)" v-for="(itemss44, index666) in  itemsss.Submenus" :key="index666">
        <i v-show="itemsindex == keysss+'0'+index666" class="el-icon-bottom-right" style="color:red;font-weight: bolder;"></i>

        <!-- <img v-if="itemsindex == keysss+'0'+index666" class="this" src="../../assets/img-icon/this.png" alt /> -->
        {{keysss==showindex?itemss44.MenuName:itemss44.MenuName}}
      </div>
    </div>

    <p class='bei'>
      <el-link href="https://beian.miit.gov.cn" target="_blank">【京ICP备19034001号-1】</el-link>
    </p>

  </div>
</template>
<script>
import "../../assets/css/Homeleft.css";
export default {
  props: ["cdd"],
  name: "Homeleft",
  data() {
    return {
      data: this.$store.state.Left_Click,
      list: this.cdd, //组件传参  --  token  获取数据
      datt: "", //请求的数据
      // 状态变量
      showindex: 999,
      textindex: 999,
      itemsindex: 999,
      itemsindex1: 999,
      // 选中的一级
      Datts: [],
    };
  },
  watch: {
    $route(to, from) {
      // console.log(to.path);
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    styles: function (i) {
      if (this.showindex == i) {
        this.showindex = 999;
        return false;
      }
      this.showindex = i;
    },
    con: function (item, i1, i2) {
      // 选中的一级
      this.itemsindex1 = i1;
      // 选中的二级
      this.itemsindex = i1 + "0" + i2;

      if (item.URL == "") {
        return false;
      }
      this.$router.push({ path: item.URL });
    },

    // 接口
    init: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "System/GetMenus",
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);
        this.Datts = [];
        this.Datts = [
          //   1 -1
          {
            MenuName: "个人中心",
            img: "el-icon-user-solid",
            Show: false,
            Submenus: [
              {
                MenuName: "系统消息",
                URL: "/Systemmessage",
                Show: false,
              },
              {
                MenuName: "工作日报",
                URL: "/Mywork",
                Show: false,
              },
              {
                MenuName: "绩效考核",
                URL: "/GetKPIs",
                Show: false,
              },
              {
                MenuName: "出差补助",
                URL: "/TravelAllowance",
                Show: false,
              },
              {
                MenuName: "目标业绩",
                URL: "/TargetPerformance",
                Show: false,
              },
              {
                MenuName: "回访预警",
                URL: "/CustomerST",
                Show: false,
              },
              {
                MenuName: "工单催促",
                URL: "/UrgeWorkOrder",
                Show: false,
              },
              {
                MenuName: "打卡记录",
                URL: "/EngineerIPList",
                Show: false,
              },
            ],
          },
          //   2  -1
          {
            MenuName: "客户管理",
            img: "el-icon-s-custom",
            Show: false,
            Submenus: [
              {
                MenuName: "客户信息",
                URL: "/CustomerMsg",
                Show: false,
              },
              {
                MenuName: "客户回访",
                URL: "/Customer_Returnvisit",
                Show: false,
              },
              {
                MenuName: "客户拜访",
                URL: "/GetCusVisits",
                Show: false,
              },
              {
                MenuName: "设备评定",
                URL: "/EquipmentEvaluation",
                Show: false,
              },
            ],
          },
          //   3  -1
          {
            MenuName: "工具管理",
            img: "el-icon-s-cooperation",
            Show: false,
            Submenus: [
              {
                MenuName: "工具资料库",
                URL: "/Tool_database",
                Show: false,
              },
              {
                MenuName: "本店工具",
                URL: "/Shop_tools",
                Show: false,
              },
              {
                MenuName: "借用清单",
                URL: "/Borrowlist",
                Show: false,
              },
              {
                MenuName: "统计分析",
                URL: "/Statistical",
                Show: false,
              },
            ],
          },
          //   4  -1
          {
            MenuName: "工单管理",
            img: "el-icon-s-order",
            Show: false,
            Submenus: [
              {
                MenuName: "我要报修",
                URL: "/IWantRepair",
                Show: false,
              },
              {
                MenuName: "报修管理",
                URL: "/RepairManagement",
                Show: false,
              },
              {
                MenuName: "工单任务",
                URL: "/WorkOrderTask",
                Show: false,
              },
              {
                MenuName: "安装任务",
                URL: "/Installationtask",
                Show: false,
              },
              {
                MenuName: "旧件寄回",
                URL: "/GetRecoverys",
                Show: false,
              },
            ],
          },
          //   5  -1
          {
            MenuName: "订单管理",
            img: "el-icon-s-order",
            Show: false,
            Submenus: [
              {
                MenuName: "零配件订单",
                URL: "/SpareParts",
                Show: false,
              },
            ],
          },
          //   6  -1
          {
            MenuName: "采购管理",
            img: "el-icon-s-goods",
            Show: false,
            Submenus: [
              {
                MenuName: "采购单列表",
                URL: "/ListOfPurchaseOrders",
                Show: false,
              },
              {
                MenuName: "财务付款",
                URL: "/GetPOPays",
                Show: false,
              },
              {
                MenuName: "追货列表",
                URL: "/GetPOZhuis",
                Show: false,
              },
            ],
          },
          //   7  -1
          {
            MenuName: "保养管理",
            img: "el-icon-s-check",
            Show: false,
            Submenus: [
              {
                MenuName: "保养合同",
                URL: "/MaintenanceManagement",
                Show: false,
              },
              {
                MenuName: "财务收款",
                URL: "/FinancialReceipts",
                Show: false,
              },
            ],
          },
          //   8  -1
          {
            MenuName: "物流管理",
            img: "el-icon-s-promotion",
            Show: false,
            Submenus: [
              {
                MenuName: "零配件发货",
                URL: "/PartsDelivery",
                Show: false,
              },
              {
                MenuName: "耗材发货",
                URL: "/DeliveryOfConsumables",
                Show: false,
              },
            ],
          },
          //   9  -1
          {
            MenuName: "客户系统管理",
            img: "el-icon-s-platform",
            Show: false,
            Submenus: [
              {
                MenuName: "员工列表",
                URL: "/Customerstaff",
                Show: false,
              },
            ],
          },
          //   10  -1
          {
            MenuName: "仓储管理",
            img: "el-icon-s-home",
            Show: false,
            Submenus: [
              {
                MenuName: "零配件库",
                URL: "/dev",
                Show: false,
              },
              {
                MenuName: "设备库",
                URL: "/dev",
                Show: false,
              },
              {
                MenuName: "备件库",
                URL: "/SparePartsStorehouse",
                Show: false,
              },
              {
                MenuName: "库存出入记录",
                URL: "/dev",
                Show: false,
              },
              {
                MenuName: "备件借用申请",
                URL: "/ApplicatioPparts",
                Show: false,
              },
            ],
          },

          {
            MenuName: "基础数据",
            img: "el-icon-s-data",
            Show: false,
            Submenus: [
              {
                MenuName: "零配件资料",
                URL: "/Spareparts_page",
                Show: false,
              },
              {
                MenuName: "整机资料",
                URL: "/Machine_page",
                Show: false,
              },
              {
                MenuName: "耗材",
                URL: "/HC_Supplies",
                Show: false,
              },
              {
                MenuName: "通用",
                URL: "/TY_Universal",
                Show: false,
              },
              {
                MenuName: "设备分类",
                URL: "/EquipmentList", // GetEquType
                Show: false,
              },
            ],
          },
          //   11  -1
          {
            MenuName: "文档公告",
            img: "el-icon-s-fold",
            Show: false,
            Submenus: [
              {
                MenuName: "制度流程",
                URL: "/Doc_system",
                Show: false,
              },
              {
                MenuName: "新闻列表",
                URL: "/NewsListings",
                Show: false,
              },
            ],
          },
          //   12  -1
          {
            MenuName: "系统管理",
            img: "el-icon-s-platform",
            Show: false,
            Submenus: [
              {
                MenuName: "员工列表",
                URL: "/Employee_list",
                Show: false,
              },
              {
                MenuName: "接口列表",
                URL: "/Interface_list",
                Show: false,
              },
              {
                MenuName: "权限维护",
                URL: "/Permission_list",
                Show: false,
              },
              {
                MenuName: "系统维护",
                URL: "/system_Maintenance",
                Show: false,
              },
              {
                MenuName: "系统日志",
                URL: "/Systemlog",
                Show: false,
              },
              {
                MenuName: "英之杰联系人",
                URL: "/inchwell_man",
                Show: false,
              },
              {
                MenuName: "首页Banner",
                URL: "/Home_Swiper",
                Show: false,
              },
            ],
          },
          //   13  -1   综合统计
          {
            MenuName: "综合统计",
            img: "el-icon-menu",
            Show: false,
            Submenus: [
              {
                MenuName: "保养延迟",
                URL: "/statistics",
                Show: false,
              },
              {
                MenuName: "客服部销售额",
                URL: "/SOSalesVolume",
                Show: false,
              },
              {
                MenuName: "保养销售额",
                URL: "/MCSalesVolume",
                Show: false,
              },
              {
                MenuName: "Maha售后销售额",
                URL: "/MahaSOSalesVolume",
                Show: false,
              },
              {
                MenuName: "Maha保养销售额",
                URL: "/MahaMCSalesVolume",
                Show: false,
              },
              {
                MenuName: "综合统计",
                URL: "/ZongHeTongJi",
                Show: false,
              },
            ],
          },
        ];
        // 想要查看全部接口，取消标签的v-if          v-if="itemsss.Show"      v-if="itemss44.Show"
        if (res.Data.length == 0) {
          this.Datts = [];
          return false;
        }

        var S99 = [];
        this.$store.state.IPTopShow = false;
        for (var asd = 0; asd < res.Data.length; asd++) {
          var item = res.Data[asd];
          var in1 = item.Url.split("-")[0] - 1;
          var in2 = item.Url.split("-")[1] - 1;
          if (!(in1 + 1 == "99")) {
            // 判断是否为功能权限

            this.Datts[in1].Show = true;
            console.log(this.Datts[in1].Submenus.length, in2);
            // 判断前端是否包含此菜单
            if (this.Datts[in1].Submenus.length > in2) {
              this.Datts[in1].Submenus[in2].Show = true;
            }
          }
          // 判断是否有地图权限
          if (item.Name == "工程师地图") {
            this.$store.state.IPTopShow = true;
          }
        }
        // console.log(this.Datts);
      });
    },
  },
};
</script>
