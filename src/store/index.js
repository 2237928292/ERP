import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        CusId: '',

        // http: 'http://39.101.201.199:6004/api/api/',
        // httpData: 'http://39.101.201.199:6001/',
        http: 'http://erp.inchwell.com.cn/api/api/',
        httpData: 'http://erp.inchwell.com.cn/api/',
        Filehttp: 'http://icms.inchwell.com.cn/File/',

        HomepageData: {}, // 零配件 and 整机资料 的 资料
        InstallationtasklookID: '',
        InstallationtasklookIDState: '',
        docuwidth: '', // 当前屏幕分辨率 
        X99: [], // 主页展示数据
        IPTopShow: false, // 是否展示工程师地图
        router_Returnvisitdetails_ID: '',
        Tool_data_imageBase64: '',
        imgArr: [],

        Vuex: {
            SOId: '', //零配件订单查看详情 id
            Id: '', //此Id 通用与所有向往下一页面传输Id
            AddindexequipmentList: [], // 添加安装任务时 向安装任务中添加设备 
            MaintenanceContractDetailsID: '', //查看合同
            lookEQUindex: '',
            loading: false, // 全局检索按钮状态
            // 订单复制创建
            HFCusId: '',
            CustomerTypes: [ //客户类型
                "宝马",
                "保时捷",
                "奥迪",
                "奔驰",
                "劳斯莱斯",
                "路虎",
                "自由市场",
                "其它",
            ],
            Delivery: '', // 耗材发货
            GetFCollections: {}, // 财务确认收款详细信息
            // 区域    系统初始加载会去获取
            Area: [],
            // 品牌  同上
            Brand: [],
            // 表格分页的选择每页多少项
            pageSNumber: [10, 15, 20, 25, 30],
            // 资源服务器
            TencentServer: 'http://39.101.201.199:8005',
            TableOptimumHeight: '600',
            AddSparePartsID: '',
        },

    },
    mutations: {},
    actions: {},

    // strict: true, // 开发
    // strict: process.env.NODE_ENV !== 'production' // 发布

})
export default store