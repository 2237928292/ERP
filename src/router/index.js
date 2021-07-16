import Vue from 'vue' // vue
import Router from 'vue-router' // router
Vue.use(Router)

export default new Router({
    // Order_List
    routes: [

        { path: '/', name: 'Logo', component: resolve => require(['@/pages/Logo/Logo'], resolve), },
        {
            path: 'KH',
            name: 'KH',
            component: resolve => require(['@/pages/KH/index'], resolve),
            // redirect: '/user',
            // children: []
        },
        {
            path: '/Home',
            name: 'Home',
            component: resolve => require(['@/pages/Home/Home'], resolve),
            redirect: '/user',
            children: [
                // 主页
                { path: '/user', name: 'Homeuser ', component: resolve => require(['@/components/User/Homeuser'], resolve), },
                // 接口列表
                { path: '/Interface_list', name: 'GetApis  ', component: resolve => require(['@/pages/nav_10/GetApis'], resolve), meta: { keepAlive: true, title: '接口列表' }, },
                // 权限列表
                { path: '/Permission_list', name: 'GetPermis', component: resolve => require(['@/pages/nav_10/GetPermis'], resolve), meta: { keepAlive: true, title: '权限维护' }, },
                //! 个人中心

                // 系统消息
                // { path: '/Systemmessage', name: 'Systemmessage', component: resolve => require(['@/pages/nav_01/Systemmessage'], resolve), meta: { keepAlive: true, title: '系统消息' }, },
                // 工作日报
                {
                    path: '/Mywork',
                    name: 'Mywork',
                    component: resolve => require(['@/pages/nav_01/Mywork/Mywork'], resolve),
                    meta: { keepAlive: true, title: '工作日报' },
                    children: [
                        { path: '/AddMyWord', name: 'AddMyWord', component: resolve => require(['@/pages/nav_01/Mywork/AddMyWord'], resolve), meta: { keepAlive: true, title: '创建工作日报' }, },
                        { path: '/WorkCon', name: 'WorkCon', component: resolve => require(['@/pages/nav_01/Mywork/WorkCon'], resolve), meta: { keepAlive: true, title: '编辑工作日报' }, },
                        { path: '/WorkLook', name: 'WorkLook', component: resolve => require(['@/pages/nav_01/Mywork/WorkLook'], resolve), meta: { keepAlive: true, title: '查看工作日报' }, },

                    ]
                },
                // 打卡记录
                {
                    path: '/EngineerIPList',
                    name: 'EngineerIPList',
                    component: resolve => require(['@/pages/nav_01/EngineerIPList/index'], resolve),
                    meta: { keepAlive: true, title: '打卡记录' },
                    // children: [
                    //     { path: '/AddMyWord', name: 'AddMyWord', component: resolve => require(['@/pages/nav_01/Mywork/AddMyWord'], resolve), meta: { keepAlive: true, title: '创建工作日报' }, },
                    // ]
                },


                // 工单催促
                {
                    path: '/UrgeWorkOrder',
                    name: 'UrgeWorkOrder',
                    component: resolve => require(['@/pages/nav_01/UrgeWorkOrder/index'], resolve),
                    meta: { keepAlive: true, title: '工单催促' },
                    // children: [
                    //     { path: '/AddMyWord', name: 'AddMyWord', component: resolve => require(['@/pages/nav_01/Mywork/AddMyWord'], resolve), meta: { keepAlive: true, title: '创建工作日报' }, },
                    // ]
                },
                // 绩效审核
                {
                    path: '/GetKPIs',
                    name: 'GetKPIs',
                    component: resolve => require(['@/pages/nav_01/GetKPIs/index'], resolve),
                    meta: { keepAlive: true, title: '绩效审核' },
                    children: [
                        { path: '/AddKPI', name: 'AddKPI', component: resolve => require(['@/pages/nav_01/GetKPIs/AddKPI'], resolve), meta: { keepAlive: true, title: '创建KPI' }, },
                        { path: '/EditKPI', name: 'EditKPI', component: resolve => require(['@/pages/nav_01/GetKPIs/PreserveKPI'], resolve), meta: { keepAlive: true, title: '复核KPI' }, },
                        { path: '/LookKPI', name: 'LookKPI', component: resolve => require(['@/pages/nav_01/GetKPIs/LookKPI'], resolve), meta: { keepAlive: true, title: '查看KPI' }, },

                    ]
                },
                // 出差补助
                {
                    path: '/TravelAllowance',
                    name: 'TravelAllowance',
                    component: resolve => require(['@/pages/nav_01/TravelAllowance/index'], resolve),
                    meta: { keepAlive: true, title: '出差补助' },
                    children: [
                        { path: '/AddTravelAllowance', name: 'AddTravelAllowance', component: resolve => require(['@/pages/nav_01/TravelAllowance/Addindex'], resolve), meta: { keepAlive: true, title: '创建出差补助' }, },
                        { path: '/Preserver', name: 'Preserver', component: resolve => require(['@/pages/nav_01/TravelAllowance/Preserver'], resolve), meta: { keepAlive: true, title: '复核出差补助' }, },
                        { path: '/PreserverLook', name: 'PreserverLook', component: resolve => require(['@/pages/nav_01/TravelAllowance/look'], resolve), meta: { keepAlive: true, title: '查看出差补助' }, },

                    ]
                },

                {
                    path: '/TargetPerformance',
                    name: 'TargetPerformance',
                    component: resolve => require(['@/pages/nav_01/TargetPerformance/index'], resolve),
                    meta: { keepAlive: true, title: '目标绩效' },
                    children: []
                },

                // 员工列表
                { path: '/Employee_list', name: 'GetEmployee', component: resolve => require(['@/pages/nav_10/GetEmployee'], resolve), meta: { keepAlive: true, title: '员工列表' }, },
                // 员工注册
                { path: '/registeredstars', name: 'Registeredstars', component: resolve => require(['@/pages/nav_10/registeredstars'], resolve), meta: { keepAlive: true, title: '员工注册' }, },
                // 编辑信息
                { path: '/registeredstart', name: 'Registeredstart', component: resolve => require(['@/pages/nav_10/registeredstart'], resolve), meta: { keepAlive: true, title: '编辑信息' }, },
                // ! 订单管理
                // 产品列表
                {
                    path: '/SpareParts',
                    name: 'SpareParts',
                    component: resolve => require(['@/pages/nav_05/index'], resolve),
                    meta: { keepAlive: true, title: '零配件订单' },
                    children: [
                        { path: '/AddOrder', name: 'AddOrder', component: resolve => require(['@/pages/nav_05/AddOrder'], resolve), meta: { keepAlive: true, title: '创建' }, },
                        {
                            path: '/EditOrder',
                            name: 'EditOrder',
                            component: resolve => require(['@/pages/nav_05/indexmsg'], resolve),
                            meta: { keepAlive: true, title: '编辑' },
                            children: [
                                { path: '/AddOrderMsg', name: 'AddOrder2', component: resolve => require(['@/pages/nav_05/Addindexmsg'], resolve), meta: { keepAlive: true, title: '添加设备' }, },

                            ]
                        },
                    ]
                },
                // ! 采购管理
                // 采购单列表
                {
                    path: '/ListOfPurchaseOrders',
                    name: 'ListOfPurchaseOrders',
                    component: resolve => require(['@/pages/nav_06_CG/ListOfPurchaseOrders/index'], resolve),
                    meta: { keepAlive: true, title: '采购单列表' },
                    children: [
                        // 创建采购
                        { path: '/AddPurchase', name: 'AddPurchase1', component: resolve => require(['@/pages/nav_06_CG/ListOfPurchaseOrders/add'], resolve), meta: { keepAlive: true, title: '创建采购' }, },
                        // 编辑采购
                        { path: '/DitPurchase', name: 'DitPurchase1', component: resolve => require(['@/pages/nav_06_CG/ListOfPurchaseOrders/ditindex'], resolve), meta: { keepAlive: true, title: '编辑采购' }, },
                        // 查看
                        { path: '/LookPurchase', name: 'LookPurchase', component: resolve => require(['@/pages/nav_06_CG/ListOfPurchaseOrders/Look'], resolve), meta: { keepAlive: true, title: '查看采购' }, },

                    ]
                },
                {
                    path: '/GetPOPays',
                    name: 'GetPOPays',
                    component: resolve => require(['@/pages/nav_06_CG/ListOfPurchaseOrders/index'], resolve),
                    meta: { keepAlive: true, title: '财务付款' },
                    children: [
                        // 创建采购
                        { path: '/AddPurchase', name: 'AddPurchase2', component: resolve => require(['@/pages/nav_06_CG/ListOfPurchaseOrders/add'], resolve), meta: { keepAlive: true, title: '创建采购' }, },
                        // 编辑采购
                        { path: '/DitPurchase', name: 'DitPurchase2', component: resolve => require(['@/pages/nav_06_CG/ListOfPurchaseOrders/ditindex'], resolve), meta: { keepAlive: true, title: '编辑采购' }, },
                    ]
                },
                {
                    path: '/GetPOZhuis',
                    name: 'GetPOZhuis',
                    component: resolve => require(['@/pages/nav_06_CG/ListOfPurchaseOrders/index'], resolve),
                    meta: { keepAlive: true, title: '追货列表' },
                    children: [
                        // 创建采购
                        { path: '/AddPurchase', name: 'AddPurchase3', component: resolve => require(['@/pages/nav_06_CG/ListOfPurchaseOrders/add'], resolve), meta: { keepAlive: true, title: '创建采购' }, },
                        // 编辑采购
                        { path: '/DitPurchase', name: 'DitPurchase3', component: resolve => require(['@/pages/nav_06_CG/ListOfPurchaseOrders/ditindex'], resolve), meta: { keepAlive: true, title: '编辑采购' }, },

                    ]
                },
                // ! 工单管理
                // 我要报修
                {
                    path: '/IWantRepair',
                    name: 'IWantRepair',
                    component: resolve => require(['@/pages/nav_04/IWantRepair/index'], resolve),
                    meta: { keepAlive: true, title: '我要报修' },
                },
                // 报修管理
                {
                    path: '/RepairManagement',
                    name: 'RepairManagement',
                    component: resolve => require(['@/pages/nav_04/RepairManagement/index'], resolve),
                    meta: { keepAlive: true, title: '报修管理' },
                    children: [
                        { path: '/RepairDetails', name: 'RepairDetails', component: resolve => require(['@/pages/nav_04/RepairManagement/BJindex'], resolve), meta: { keepAlive: true, title: '报修详情' }, },
                    ]
                },
                // 工单任务
                {
                    path: '/WorkOrderTask',
                    name: 'WorkOrderTask',
                    component: resolve => require(['@/pages/nav_04/WorkOrderTask/index'], resolve),
                    meta: { keepAlive: true, title: '工单任务' },
                    children: [
                        // 现场维修
                        { path: '/OnSiteMaintenance', name: 'OnSiteMaintenance', component: resolve => require(['@/pages/nav_04/WorkOrderTask/XianChang'], resolve), meta: { keepAlive: true, title: '现场维修' }, },
                        // 小件维修
                        { path: '/MinorMaintenance', name: 'MinorMaintenance', component: resolve => require(['@/pages/nav_04/WorkOrderTask/XiaoJian'], resolve), meta: { keepAlive: true, title: '小件维修' }, },
                        // DBL
                        { path: '/DBLMaintenance', name: 'DBLMaintenance', component: resolve => require(['@/pages/nav_04/WorkOrderTask/DBL'], resolve), meta: { keepAlive: true, title: 'DBL维修' }, },



                    ]
                },
                // 安装任务
                {
                    path: '/Installationtask',
                    name: 'Installationtask ',
                    component: resolve => require(['@/pages/nav_04/InstallationTasks/installation/installation'], resolve),
                    meta: { keepAlive: true, title: '安装任务' },
                    children: [
                        { path: '/Installationtasklook', name: 'Installationtasklook1', component: resolve => require(['@/pages/nav_04/InstallationTasks/installation/look'], resolve), meta: { keepAlive: true, title: '查看安装任务' }, },
                        {
                            path: '/AddOrderindex',
                            name: 'Installationtasklook2',
                            component: resolve => require(['@/pages/nav_04/InstallationTasks/addOrder/index'], resolve),
                            meta: { keepAlive: true, title: '创建安装任务' },
                            children: [
                                { path: '/Addindexequipment', name: 'Installationtasklook3', component: resolve => require(['@/pages/nav_04/InstallationTasks/addOrder/Addindexmsg'], resolve), meta: { keepAlive: true, title: '添加设备' }, },
                            ]
                        },
                    ]
                },



                // "旧件寄回"
                {
                    path: '/GetRecoverys',
                    name: 'GetRecoverys',
                    component: resolve => require(['@/pages/nav_04/GetRecoverys/index'], resolve),
                    meta: { keepAlive: true, title: '旧件寄回' },
                    children: [
                        { path: '/SendBackDetails', name: 'SendBackDetails', component: resolve => require(['@/pages/nav_04/GetRecoverys/Edit'], resolve), meta: { keepAlive: true, title: '旧件寄回详情' }, },
                    ]
                },


                // ! 保养管理
                {
                    path: '/MaintenanceManagement',
                    name: 'MaintenanceManagement',
                    component: resolve => require(['@/pages/nav_06/index'], resolve),
                    meta: { keepAlive: true, title: '保养合同' },
                    children: [
                        { path: '/ViewContract', name: 'ViewContract', component: resolve => require(['@/pages/nav_06/lookindex'], resolve), meta: { keepAlive: true, title: '查看合同' }, },
                        { path: '/EditContract', name: 'EditContract', component: resolve => require(['@/pages/nav_06/addindex'], resolve), meta: { keepAlive: true, title: '创建合同' }, },
                        { path: '/ModificationOfCntract', name: 'ModificationOfCntract', component: resolve => require(['@/pages/nav_06/BJindex'], resolve), meta: { keepAlive: true, title: '编辑合同' }, },

                    ]
                },
                // ! 财务收款

                {
                    path: '/FinancialReceipts',
                    name: 'FinancialReceipts',
                    component: resolve => require(['@/pages/nav_06/FinancialReceipts/Home'], resolve),
                    meta: { keepAlive: true, title: '财务收款' },
                    children: [
                        { path: '/CollectionDetails', name: 'CollectionDetails', component: resolve => require(['@/pages/nav_06/FinancialReceipts/BJ'], resolve), meta: { keepAlive: true, title: '查看详情' }, },
                    ]
                },




                // ! 发货
                {
                    path: '/DeliveryOfConsumables',
                    name: 'DeliveryOfConsumables',
                    component: resolve => require(['@/pages/nav_06_Delivery/DeliveryOfConsumables'], resolve),
                    meta: { keepAlive: true, title: '耗材发货' },
                    children: [
                        { path: '/Delivery', name: 'Delivery', component: resolve => require(['@/pages/nav_06_Delivery/Delivery/Delivery'], resolve), meta: { keepAlive: true, title: '编辑' }, },
                    ]
                },
                // !设备评定
                {
                    path: '/EquipmentEvaluation',
                    name: 'EquipmentEvaluation',
                    component: resolve => require(['@/pages/Customer/Equipment/EquipmentEvaluation'], resolve),
                    meta: { keepAlive: true, title: '设备评定' },
                    children: [
                        { path: '/EquipmentEvaluationDetails', name: 'EquipmentEvaluationDetails ', component: resolve => require(['@/pages/Customer/Equipment/lookindex'], resolve), meta: { keepAlive: true, title: '设备评定详情' }, },
                    ]
                },

                // !客户列表

                {
                    path: '/CustomerMsg',
                    name: 'CustomerMsg',
                    component: resolve => require(['@/pages/Customer/CustomerMsg/index'], resolve),
                    meta: { keepAlive: true, title: '客户信息' },
                    children: [
                        { path: '/AddCustomerMsg', name: 'AddCustomerMsg ', component: resolve => require(['@/pages/Customer/CustomerMsg/Addindex'], resolve), meta: { keepAlive: true, title: '新增客户信息' }, },
                        {
                            path: '/BJCustomerMsg',
                            name: 'BJCustomerMsg ',
                            component: resolve => require(['@/pages/Customer/CustomerMsg/BJindex'], resolve),
                            meta: { keepAlive: true, title: '编辑客户信息' },
                            children: [
                                { path: '/EquipmentStatus', name: 'EquipmentStatus ', component: resolve => require(['@/pages/Customer/CustomerMsg/EquipmentStatus/EquipmentStatus'], resolve), meta: { keepAlive: true, title: '客户设备状态' }, },

                            ]
                        },

                    ]
                },


                // 客户回访
                {
                    path: '/Customer_Returnvisit',
                    name: 'Returnvisit',
                    component: resolve => require(['@/pages/Customer/Returnvisit/Returnvisit'], resolve),
                    meta: { keepAlive: true, title: '客户回访' },
                    children: [
                        { path: '/Customer_Returnvisitdetails', name: 'Returnvisitdetails ', component: resolve => require(['@/pages/Customer/Returnvisitdetails/Returnvisitdetails'], resolve), meta: { keepAlive: true, title: '回访详情' }, },
                        { path: '/Customer_score', name: 'score ', component: resolve => require(['@/pages/Customer/score/score'], resolve), meta: { keepAlive: true, title: '评分' }, },
                    ]
                },
                // 客户拜访
                {
                    path: '/GetCusVisits',
                    name: 'GetCusVisits',
                    component: resolve => require(['@/pages/Customer/visit/index'], resolve),
                    meta: { keepAlive: true, title: '客户拜访' },
                    children: [
                        { path: '/GetCusVisitsLook', name: 'GetCusVisitsLook', component: resolve => require(['@/pages/Customer/visit/lookindex'], resolve), meta: { keepAlive: true, title: '查看' }, },

                    ]
                },


                // ! 工具资料库
                {
                    path: '/Tool_database',
                    name: 'Tool_database ',
                    component: resolve => require(['@/pages/Tool/Tool_database'], resolve),
                    meta: { keepAlive: true, title: '工具资料库' },
                    children: [
                        // 批量添加
                        { path: '/List_tool', name: 'listTool ', component: resolve => require(['@/pages/Tool/list_tool/index'], resolve), meta: { keepAlive: true, title: '批量添加' }, },
                    ]
                },
                // 本店工具
                { path: '/Shop_tools', name: 'Shop_tools ', component: resolve => require(['@/pages/Tool/Shop_tools'], resolve), meta: { keepAlive: true, title: '本店工具' }, },
                // 借用清单
                {
                    path: '/Borrowlist',
                    name: 'Borrowlist ',
                    component: resolve => require(['@/pages/Tool/Borrowlist'], resolve),
                    meta: { keepAlive: true, title: '借用清单' },
                    children: [
                        // 添加清单
                        { path: '/Addlist', name: 'Addlist ', component: resolve => require(['@/pages/Tool/Addlist/Addlist'], resolve), meta: { keepAlive: true, title: '添加清单' }, },
                    ]
                },
                // 员工列表
                { path: '/Customerstaff', name: 'Customerstaff ', component: resolve => require(['@/pages/nav_07/Customerstaff'], resolve), meta: { keepAlive: true, title: '员工列表' }, },
                // 英之杰联系人
                { path: '/inchwell_man', name: 'inchwell_man ', component: resolve => require(['@/pages/inchwell_man/index'], resolve), meta: { keepAlive: true, title: '英之杰联系人' }, },
                // 统计分析
                { path: '/Statistical', name: 'Statistical ', component: resolve => require(['@/pages/nav_03/StatisticalAnalysis'], resolve), meta: { keepAlive: true, title: '统计分析' }, },
                // 制度流程
                { path: '/Doc_system', name: 'Doc_system ', component: resolve => require(['@/pages/nav_09/system'], resolve), meta: { keepAlive: true, title: '制度流程' }, },

                // 新闻列表
                {
                    path: '/NewsListings',
                    name: 'NewsListings ',
                    component: resolve => require(['@/pages/nav_09/NewsListings/NewsListings'], resolve),
                    meta: { keepAlive: true, title: '新闻列表' },
                    children: [
                        { path: '/add_News', name: 'add_News ', component: resolve => require(['@/pages/nav_09/NewsListings/Addindex'], resolve), meta: { keepAlive: true, title: '添加新闻' }, },

                    ]
                },


                // 系统维护
                { path: '/system_Maintenance', name: 'systemMaintenance ', component: resolve => require(['@/pages/System/systemMaintenance/systemMaintenance'], resolve), meta: { keepAlive: true, title: '系统维护' }, },
                // 系统日志
                { path: '/Systemlog', name: 'Systemlog ', component: resolve => require(['@/pages/System/Systemlog/Systemlog'], resolve), meta: { keepAlive: true, title: '系统日志' }, },
                // 回访预警
                { path: '/CustomerST', name: 'CustomerST ', component: resolve => require(['@/pages/System/CustomerST/CustomerST'], resolve), meta: { keepAlive: true, title: '回访预警' }, },
                // 基础数据
                // ··································零配件
                {
                    path: '/Spareparts_page',
                    name: 'Spareparts  ',
                    component: resolve => require(['@/pages/Basic_data/Spareparts/Homepage'], resolve),
                    meta: { keepAlive: true, title: '零配件' },
                    children: [
                        // 添加零配件
                        { path: '/add_Homepage', name: 'add_Homepage ', component: resolve => require(['@/pages/Basic_data/Spareparts/add_Homepage'], resolve), meta: { keepAlive: true, title: '添加零配件' }, },
                        { path: '/akk_Homepage', name: 'akk_Homepage ', component: resolve => require(['@/pages/Basic_data/Spareparts/akk_Homepage'], resolve), meta: { keepAlive: true, title: '编辑零配件' }, },
                        { path: '/look', name: 'look ', component: resolve => require(['@/pages/Basic_data/Spareparts/look'], resolve), meta: { keepAlive: true, title: '查看详情' }, },
                    ]
                },
                // ··································整机资料
                {
                    path: '/Machine_page',
                    name: 'Sparepartsxx  ',
                    component: resolve => require(['@/pages/Basic_data/Machine/Homepage'], resolve),
                    meta: { keepAlive: true, title: '整机资料' },
                    children: [
                        // 添加整机
                        { path: '/Machine_add_Homepage', name: 'add_Homepagess ', component: resolve => require(['@/pages/Basic_data/Machine/add_Homepage'], resolve), meta: { keepAlive: true, title: '添加整机资料' }, },
                        { path: '/Machine_akk_Homepage', name: 'akk_Homepagess ', component: resolve => require(['@/pages/Basic_data/Machine/akk_Homepage'], resolve), meta: { keepAlive: true, title: '编辑整机资料' }, },
                        { path: '/Machine_look', name: 'looks ', component: resolve => require(['@/pages/Basic_data/Machine/look'], resolve), meta: { keepAlive: true, title: '查看详情' }, },
                    ]
                },
                // ··································耗材资料
                {
                    path: '/HC_Supplies',
                    name: 'Sparepartsxa  ',
                    component: resolve => require(['@/pages/Basic_data/HC_Supplies/Homepage'], resolve),
                    meta: { keepAlive: true, title: '耗材' },
                    children: [
                        // 添加耗材
                        { path: '/Supplies_add_Homepage', name: 'add_Homepagesa ', component: resolve => require(['@/pages/Basic_data/HC_Supplies/add_Homepage'], resolve), meta: { keepAlive: true, title: '添加耗材资料' }, },
                        { path: '/Supplies_akk_Homepage', name: 'akk_Homepagesa ', component: resolve => require(['@/pages/Basic_data/HC_Supplies/akk_Homepage'], resolve), meta: { keepAlive: true, title: '编辑耗材资料' }, },
                        { path: '/Supplies_look', name: 'looka ', component: resolve => require(['@/pages/Basic_data/HC_Supplies/look'], resolve), meta: { keepAlive: true, title: '查看详情' }, },
                    ]
                },
                // ··································通用资料
                {
                    path: '/TY_Universal',
                    name: 'Sparepartsxb  ',
                    component: resolve => require(['@/pages/Basic_data/TY_Universal/Homepage'], resolve),
                    meta: { keepAlive: true, title: '通用' },
                    children: [
                        // 添加通用
                        { path: '/Universal_add_Homepage', name: 'add_Homepagesb ', component: resolve => require(['@/pages/Basic_data/TY_Universal/add_Homepage'], resolve), meta: { keepAlive: true, title: '添加通用资料' }, },
                        { path: '/Universal_akk_Homepage', name: 'akk_Homepagesb ', component: resolve => require(['@/pages/Basic_data/TY_Universal/akk_Homepage'], resolve), meta: { keepAlive: true, title: '编辑通用资料' }, },
                        { path: '/Universal_look', name: 'lookb ', component: resolve => require(['@/pages/Basic_data/TY_Universal/look'], resolve), meta: { keepAlive: true, title: '查看详情' }, },
                    ]
                },
                // ··································设备分类
                {
                    path: '/EquipmentList',
                    name: 'EquipmentList',
                    component: resolve => require(['@/pages/Basic_data/Equipment/index'], resolve),
                    meta: { keepAlive: true, title: '设备分类' },
                },
                // ··································Swiper轮播图
                {
                    path: '/Home_Swiper',
                    name: 'Home_Swiper',
                    component: resolve => require(['@/pages/Swiper/index'], resolve),
                    meta: { keepAlive: true, title: '首页Banner' },
                },


                // 备件库
                {
                    path: '/SparePartsStorehouse',
                    name: 'SparePartsStorehouse',
                    component: resolve => require(['@/pages/CangChu/SparePartsStorehouse/index'], resolve),
                    meta: { keepAlive: true, title: '备件库' },
                    children: [
                        // 添加通用
                        { path: '/AddSpareParts', name: 'AddSpareParts', component: resolve => require(['@/pages/CangChu/SparePartsStorehouse/Addindex'], resolve), meta: { keepAlive: true, title: '申请借用' }, },
                        // 添加备件
                        { path: '/AddSpare', name: 'AddSpare', component: resolve => require(['@/pages/CangChu/SparePartsStorehouse/AddSpare'], resolve), meta: { keepAlive: true, title: '添加备件' }, },
                        // 修改备件
                        { path: '/BJAppSpare', name: 'BJAppSpare', component: resolve => require(['@/pages/CangChu/SparePartsStorehouse/BJAppSpare'], resolve), meta: { keepAlive: true, title: '修改备件' }, },

                    ]
                },


                // 备件申请列表
                {
                    path: '/ApplicatioPparts',
                    name: 'ApplicatioPparts',
                    component: resolve => require(['@/pages/CangChu/ApplicatioPparts/index'], resolve),
                    meta: { keepAlive: true, title: '备用借用申请' },
                    children: [
                        // 添加通用
                        { path: '/ApplicatioPpartsMsg', name: 'ApplicatioPpartsMsg ', component: resolve => require(['@/pages/CangChu/ApplicatioPparts/indexmsg'], resolve), meta: { keepAlive: true, title: '借用详情' }, },
                    ]
                },








                // 待开发
                {
                    path: '/IP',
                    name: 'ip ',
                    component: resolve => require(['@/pages/IP/ip'], resolve),
                    meta: { keepAlive: true, title: '工程师实时定位' },
                    children: [
                        // 添加通用
                        // { path: '/IPGJT', name: 'IPGJT ', component: resolve => require(['@/pages/IP/IPGJT'], resolve), meta: { keepAlive: true, title: '个人轨迹图' }, },
                    ]
                },
                // 保养延迟
                { path: '/statistics', name: 'statistics ', component: resolve => require(['@/pages/nav_11/statistics'], resolve), meta: { keepAlive: true, title: '保养延迟' }, },
                // 零配件销售额
                { path: '/SOSalesVolume', name: 'SOSalesVolume ', component: resolve => require(['@/pages/nav_11/SOSalesVolume'], resolve), meta: { keepAlive: true, title: '客服部销售额' }, },
                // 保养销售额
                { path: '/MCSalesVolume', name: 'MCSalesVolume ', component: resolve => require(['@/pages/nav_11/MCSalesVolume'], resolve), meta: { keepAlive: true, title: '保养销售额' }, },
                //  马哈保养
                { path: '/MahaMCSalesVolume', name: 'MahaMCSalesVolume ', component: resolve => require(['@/pages/nav_11/MahaMCSalesVolume'], resolve), meta: { keepAlive: true, title: 'Maha保养销售额' }, },
                // 马哈零配件
                { path: '/MahaSOSalesVolume', name: 'MahaSOSalesVolume ', component: resolve => require(['@/pages/nav_11/MahaSOSalesVolume'], resolve), meta: { keepAlive: true, title: 'Maha售后销售额' }, },
                // 综合统计
                { path: '/ZongHeTongJi', name: 'ZongHeTongJi ', component: resolve => require(['@/pages/nav_11/ZongHeTongJi'], resolve), meta: { keepAlive: true, title: '综合统计' }, },

                { path: '/dev', name: 'dev ', component: resolve => require(['@/pages/nav_dev/dev'], resolve), meta: { keepAlive: true, title: '此页面尚未开发完成！！！' }, },
            ]
        },
        //配置404
        {
            path: "*",
            name: '404',
            component: resolve => require(['@/components/404/404'], resolve),
        }
    ]
})