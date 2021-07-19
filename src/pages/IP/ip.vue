<template>
  <div class="box">
    <router-view></router-view>

    <baidu-map class="map" v-show="ShowIP" :center="center" :scroll-wheel-zoom="true" @zoomend="syncCenterAndZoom" @rightclick="rightclickClick()" :zoom="zoom">
      <!-- 城市切换控件 -->
      <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT" @changeAfter="changeAfterclick()"></bm-city-list>
      <!-- 比例尺 -->
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT" title="比例尺"></bm-scale>
      <!-- gcs标记点 -->
      <bm-marker v-for="(item,index) in gcsdata" :key="index" :position="{lng: item.Longitude , lat: item.Latitude}" :dragging="false" @click="clickGcsIcon(item,index)"
        :icon="{url: item.Roles , size: {width: 30, height: 70}}">
        <bm-label :content="item.Enginner" :labelStyle="item.color" :offset="{width: 30, height: 30}" />
      </bm-marker>
      <!-- 海量点 -->
      <bm-point-collection :points="points" shape="BMAP_POINT_SHAPE_STAR" color="red" size="BMAP_POINT_SIZE_SMALL" @click="clickHandler"></bm-point-collection>
      <!-- 工程师视图 -->

      <!-- 引入插件 -->
    </baidu-map>

    <div class="gcs">
      <div class="head">工程师视图</div>
      <div class="search">
        <el-input v-model="searchsd" size="mini" @input="searchChage" placeholder="请输入姓名"></el-input>
        <el-select size="mini" style="width:198px" @change="SwitchArea(0)" v-model="area" clearable placeholder="请选择区域">
          <el-option v-for="item in areaS" :key="item.Value" :label="item.Value" :value="item.Value"></el-option>
        </el-select>
      </div>
      <div class="center">
        <div class="gcsli" v-for="(item,index) in gcsdata" :key="index" @click="gcsClick(item)">{{item.Enginner + ' - ' + item.Message}}
          <el-button style="float:right" type="primary" icon="el-icon-map-location" size="mini" circle @click="IPgjt($event,item)"></el-button>

        </div>
      </div>
    </div>

    <baidu-map class="map" v-show="!ShowIP" :center="centerObj" :zoom="9" :scroll-wheel-zoom="true">
      <bm-polyline :path="polylinePath" strokeStyle='dashed' :strokeWeight='3' stroke-color="blue" :stroke-opacity="0.5" :stroke-weight="2" :editing="true"></bm-polyline>
    </baidu-map>

  </div>
</template>
<script>
export default {
  data() {
    return {
      polylinePath: [],
      centerObj: {},
      ShowIP: true,
      areaS: [],
      area: "",
      points: [], //海亮点，存放
      center: "中国",
      // 当前城市
      icon: require("../../assets/img-icon/Home/BJ.png"),
      zoom: 5,
      PI: 3.14159265358979324,
      x_pI: (3.14159265358979324 * 3000.0) / 180.0,
      a: 6378245.0,
      ee: 0.00669342162296594323,
      // 进行中   绿色
      styleone: {
        color: "#000",
        fontSize: "12px",
        marginTop: "-20px",
        border: "0.1px solid #ccc",
        borderRadius: "5px",
        background: "#90f698",
      },
      // 正在前往  黄色
      styletwe: {
        color: "#000",
        fontSize: "12px",
        marginTop: "-20px",
        border: "0.1px solid #ccc",
        borderRadius: "5px",
        background: "#f2f48b",
      },
      // 空闲   红色
      stylethe: {
        color: "#000",
        fontSize: "12px",
        marginTop: "-20px",
        border: "0.1px solid #ccc",
        borderRadius: "5px",
        background: "#ff9393",
      },
      data: [], // 工程师总数据
      datagcsShowMapIndex: [], // 工程师实时显示数据
      gcsdata: [], //gcs定位  按照任务进行排序
      gcsdataB: [], //gcs定位  按照任务进行排序  备用
      // 0.012181     0.007292
      // data: [{Longitude:116.5449090994412,Latitude:39.80053361460006,Enginner:'00',types:'11'}],
      timer: null,
      searchsd: "", // 攻城狮检索项
      gcsimg: require("../../assets/img-icon/gcs_mini.png"),
      qyjlimg: require("../../assets/img-icon/qyjl.png"),
      searchsd_s: [], //当前工程师检索组
      gcsShowTrueFasle: true,
    };
  },
  created() {
    // 获取区域
    this.initGetArea();
    // 修改版 工程师定位
    this.initmapsGCS();
  },
  //   进入当前页面
  beforeRouteEnter(to, form, next) {
    next((vm) => {
      console.log("我已经进来了！");
      vm.time();
    });
  },
  //   跳出当前页面
  destroyed: function () {
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    IPgjt: function (event, item) {
      event.stopPropagation();
      console.log(item);

      this.init(item.EnginnerId);
      return false;
      this.$store.state.Vuex.Id = item.EnginnerId;

      this.$router.push({
        path: "IPGJT",
      });
    },
    // 获取区域
    initGetArea: function () {
      var obj = {
        url: this.$store.state.http + "System/GetArea",
        api: "get",
      };
      this.$https(obj).then((res) => {
        this.areaS = res.Data;
      });
    },
    updatePolygonPath(e) {
      this.polygonPath = e.target.getPath();
    },
    init: function (Id) {
      var obj = {
        api: "get",
        url: this.$store.state.http + "System/SelectTrajectory",
        data: {
          employeeId: Id,
        },
      };
      this.$https(obj).then((res) => {
        var that = this;
        var List = res.Data.StatDtos;
        if (List == null) {
          this.$look("warning", "暂无此工程师定位信息！");
          return false;
        }
        this.ShowIP = false;
        var IpList = [];
        for (let index = 0; index < List.length; index++) {
          const lip = List[index].Describe;
          const gip = List[index].Key;
          IpList.push({
            lng: that.wgs84togcj02(lip, gip)[0],
            lat: that.wgs84togcj02(lip, gip)[1],
          });
        }
        that.polylinePath = IpList;
        console.log(that.polylinePath);
        this.centerObj = { lng: IpList[0].lng, lat: IpList[0].lat };
      });
    },

    // 点击左侧工程师
    gcsClick: function (item) {
      this.ShowIP = true;
      this.gcsShowTrueFasle = false;
      this.center = { lng: item.Longitude, lat: item.Latitude };
      this.zoom = 16;
    },
    // 单击海量点
    clickHandler(e) {
      alert(`单击点的坐标为：${e.point.lng}, ${e.point.lat}`);
    },
    // 生成海量点
    addPoints() {
      const points = [];
      for (var i = 0; i < 1000; i++) {
        const position = {
          lng: Math.random() * 40 + 85,
          lat: Math.random() * 30 + 21,
        };
        points.push(position);
      }
      this.points = points;
    },
    //地图右击事件
    rightclickClick: function () {
      // console.log("单击右键！");
      // console.log(this.zoom);
    },
    //监听地图缩放
    syncCenterAndZoom: function (e) {
      // console.log(e.target.bh); // 输出中文地理位置
      if (this.zoom == 16) {
      } else {
        this.zoom = 5.1;
      }
    },

    bd_encrypt: function (gg_lng, gg_lat) {
      var X_PI = (Math.PI * 3000.0) / 180.0;
      var x = gg_lng,
        y = gg_lat;
      var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
      var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
      var bd_lng = z * Math.cos(theta) + 0.0065;
      var bd_lat = z * Math.sin(theta) + 0.006;
      return [bd_lng, bd_lat];
    },
    // 获取工程师的定位  修改版    (只拿数据，将区域经理放在上边)
    initmapsGCS: function () {
      var obj = {
        url: this.$store.state.http + "System/SelectMapCoordinate",
        api: "get",
      };
      this.$https(obj).then((res) => {
        let EngineerPositioning = res.Data.Dtos;
        // this.gcsdata = [];
        //  添加 展示小人图标
        for (let index = 0; index < EngineerPositioning.length; index++) {
          if (EngineerPositioning[index].Role == 1) {
            // 区域经理
            EngineerPositioning[index]["Roles"] = this.qyjlimg;
          } else {
            // gcs
            EngineerPositioning[index]["Roles"] = this.gcsimg;
          }
          // 设置点击标注得可用性
          EngineerPositioning[index]["title"] = true;
          // 将GWs84 转为 火星坐标系  然后转为 百度坐标系
          // EngineerPositioning[index].Longitude = this.BD_WGS(
          //   EngineerPositioning[index].Longitude,
          //   EngineerPositioning[index].Latitude
          // )[0];
          // EngineerPositioning[index].Latitude = this.BD_WGS(
          //   EngineerPositioning[index].Longitude,
          //   EngineerPositioning[index].Latitude
          // )[1];

          // 测试
          // bd_encrypt
          EngineerPositioning[index].Longitude = this.bd_encrypt(
            EngineerPositioning[index].Longitude,
            EngineerPositioning[index].Latitude
          )[0];
          EngineerPositioning[index].Latitude = this.bd_encrypt(
            EngineerPositioning[index].Longitude,
            EngineerPositioning[index].Latitude
          )[1];

          // 以下是将标志状态转为中文便于展示
          var GCSOT = EngineerPositioning[index].ServingOrderType;
          if (GCSOT == 0) {
            EngineerPositioning[index]["types"] = "空闲";
            EngineerPositioning[index]["color"] = this.stylethe;
          }
          if (GCSOT == 1) {
            EngineerPositioning[index]["types"] = "保养途中";
            EngineerPositioning[index]["color"] = this.styletwe;
          }
          if (GCSOT == 2) {
            EngineerPositioning[index]["types"] = "维修途中";
            EngineerPositioning[index]["color"] = this.styletwe;
          }
          if (GCSOT == 3) {
            EngineerPositioning[index]["types"] = "正在保养";
            EngineerPositioning[index]["color"] = this.styleone;
          }
          if (GCSOT == 4) {
            EngineerPositioning[index]["types"] = "正在维修";
            EngineerPositioning[index]["color"] = this.styleone;
          }
          if (GCSOT == 5) {
            EngineerPositioning[index]["types"] = "打卡";
            EngineerPositioning[index]["color"] = this.stylethe;
          }
          if (GCSOT == 6) {
            EngineerPositioning[index]["types"] = "安装在途";
            EngineerPositioning[index]["color"] = this.styletwe;
          }
          if (GCSOT == 7) {
            EngineerPositioning[index]["types"] = "正在安装";
            EngineerPositioning[index]["color"] = this.styleone;
          }
        }
        this.gcsdata = this.SortGcs(EngineerPositioning);
        this.gcsdataB = this.SortGcs(EngineerPositioning);
        console.log(this.gcsdata);
        this.SwitchArea();
      });
    },
    // !  区域经理在上(有人在上)，工程师在下(有任务在上)
    SortGcs: function (list) {
      let qyjlList = [];
      let gcslist = [];
      for (let index = 0; index < list.length; index++) {
        const gcsli = list[index];
        // 区分经理和工程师
        if (gcsli.Role == 1) {
          qyjlList.push(gcsli);
        } else {
          gcslist.push(gcsli);
        }
      }

      var Kx = [[], [], [], [], [], [], [], []];
      for (let index = 0; index < qyjlList.length; index++) {
        const element = qyjlList[index];
        if (element.Message == "正在安装") {
          Kx[0].push(element);
        }
        if (element.Message == "保养在途") {
          Kx[1].push(element);
        }
        if (element.Message == "维修在途") {
          Kx[2].push(element);
        }
        if (element.Message == "正在保养") {
          Kx[3].push(element);
        }
        if (element.Message == "正在维修") {
          Kx[4].push(element);
        }
        if (element.Message == "打卡") {
          Kx[5].push(element);
        }
        if (element.Message == "安装在途") {
          Kx[6].push(element);
        }
        if (element.Message == "空闲") {
          Kx[7].push(element);
        }
      }
      var KKx = [];
      for (let index = 0; index < Kx.length; index++) {
        const element = Kx[index];
        if (element.length != 0) {
          for (let index = 0; index < element.length; index++) {
            const elementx = element[index];
            KKx.push(elementx);
          }
        }
      }

      var Kxs = [[], [], [], [], [], [], [], []];
      for (let index = 0; index < gcslist.length; index++) {
        const element = gcslist[index];
        if (element.Message == "正在安装") {
          Kxs[0].push(element);
        }
        if (element.Message == "保养在途") {
          Kxs[1].push(element);
        }
        if (element.Message == "维修在途") {
          Kxs[2].push(element);
        }
        if (element.Message == "正在保养") {
          Kxs[3].push(element);
        }
        if (element.Message == "正在维修") {
          Kxs[4].push(element);
        }
        if (element.Message == "打卡") {
          Kxs[5].push(element);
        }
        if (element.Message == "安装在途") {
          Kxs[6].push(element);
        }
        if (element.Message == "空闲") {
          Kxs[7].push(element);
        }
      }
      var KKxs = [];
      for (let index = 0; index < Kxs.length; index++) {
        const element = Kxs[index];
        if (element.length != 0) {
          for (let index = 0; index < element.length; index++) {
            const elementx = element[index];
            KKxs.push(elementx);
          }
        }
      }
      // 将两个数组合并
      var list01 = KKx;
      for (let index = 0; index < KKxs.length; index++) {
        const gcslis = KKxs[index];
        list01.push(gcslis);
      }
      this.data = list01;
      // 返回排序数组
      return list01;
    },
    // ! 切换 区域
    SwitchArea: function (res) {
      if (res == undefined) {
        // 刷新时不进行地图缩放
      } else {
        this.zoom = 5;
      }
      console.log(this.area, this.area == "");
      if (this.area == "") {
        this.gcsdata = this.data;
        return false;
      }
      let Areas = [];
      for (let index = 0; index < this.data.length; index++) {
        const element = this.data[index];
        if (element.Area == this.area) {
          Areas.push(element);
        }
      }
      this.gcsdata = Areas;
    },
    //  切换城市时触发
    changeAfterclick: function () {
      // console.log(this.center);
    },
    // 前端右侧工程师检索        --------------------------------
    searchChage: function (e) {
      console.log(this.gcsdata);
      if (e == "") {
        this.gcsdata = this.gcsdataB;
        return false;
      }
      var GcsListEch = [];
      for (let index = 0; index < this.gcsdataB.length; index++) {
        const element = this.gcsdataB[index];
        if (element.Enginner.indexOf(e) != -1) {
          GcsListEch.push(element);
        }
      }
      console.log(GcsListEch);
      this.gcsdata = GcsListEch;
    },
    //启动定时器
    time: function () {
      var that = this;
      this.timer = setInterval(function () {
        console.log("已启动定时器！");
        // that.initmap();
        that.initmapsGCS();
      }, 10000);
    },
    // 点击图标
    clickGcsIcon: function (item, index) {
      console.log(this.gcsdata);

      var text =
        '<p style="font-size: 12px;font-weight: bold;" >' +
        this.gcsdata[index].Detail +
        "<p/>";
      for (
        let indexsa = 0;
        indexsa < this.gcsdata[index].Orders.length;
        indexsa++
      ) {
        const te = this.gcsdata[index].Orders[indexsa];
        var text2 = "";
        if (te.WorkType == 1) {
          text2 = "保养";
        }
        if (te.WorkType == 2) {
          text2 = "维修";
        }
        if (te.WorkType == 3) {
          text2 = "安装";
        }
        text +=
          '<p  style="font-size: 12px;" >' +
          te.CusFullName +
          " - " +
          text2 +
          " - " +
          te.OrderState +
          "<p/>";
      }
      this.$notify({
        title: this.gcsdata[index].Enginner,
        dangerouslyUseHTMLString: true,
        message: text,
        duration: 30000,
      });
      let geocoder = new BMap.Geocoder(); //创建地址解析器的实例
    },

    // 重写  坐标系转换
    BD_WGS: function (lng, lat) {
      var x_PI = (3.14159265358979324 * 3000.0) / 180.0;
      var PI = 3.1415926535897932384626;
      var a = 6378245.0;
      var ee = 0.00669342162296594323;
      var lat = +lat;
      var lng = +lng;

      // 此处为国内写法
      console.log(this.out_of_china2(lng, lat));
      if (this.out_of_china2(lng, lat)) {
      } else {
        var dlat = this.transformlat2(lng - 105.0, lat - 35.0);
        var dlng = this.transformlng2(lng - 105.0, lat - 35.0);
        var radlat = (lat / 180.0) * PI;
        var magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        var sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * PI);
        dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * PI);
        var lat = lat + dlat;
        var lng = lng + dlng;
      }
      console.log(lat, lng);

      var lat = +lat;
      var lng = +lng;
      var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
      var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
      var bd_lng = z * Math.cos(theta) + 0.0065;
      var bd_lat = z * Math.sin(theta) + 0.006;
      return [bd_lng, bd_lat];
    },
    out_of_china2: function (lng, lat) {
      var lat = +lat;
      var lng = +lng;
      // 纬度3.86~53.55,经度73.66~135.05
      return !(lng > 73.66 && lng < 135.05 && lat > 3.86 && lat < 53.55);
    },
    transformlat2: function (lng, lat) {
      var PI = 3.1415926535897932384626;
      var lat = +lat;
      var lng = +lng;
      var ret =
        -100.0 +
        2.0 * lng +
        3.0 * lat +
        0.2 * lat * lat +
        0.1 * lng * lat +
        0.2 * Math.sqrt(Math.abs(lng));
      ret +=
        ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) *
          2.0) /
        3.0;
      ret +=
        ((20.0 * Math.sin(lat * PI) + 40.0 * Math.sin((lat / 3.0) * PI)) *
          2.0) /
        3.0;
      ret +=
        ((160.0 * Math.sin((lat / 12.0) * PI) +
          320 * Math.sin((lat * PI) / 30.0)) *
          2.0) /
        3.0;
      return ret;
    },

    transformlng2: function (lng, lat) {
      var PI = 3.1415926535897932384626;
      var lat = +lat;
      var lng = +lng;
      var ret =
        300.0 +
        lng +
        2.0 * lat +
        0.1 * lng * lng +
        0.1 * lng * lat +
        0.1 * Math.sqrt(Math.abs(lng));
      ret +=
        ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) *
          2.0) /
        3.0;
      ret +=
        ((20.0 * Math.sin(lng * PI) + 40.0 * Math.sin((lng / 3.0) * PI)) *
          2.0) /
        3.0;
      ret +=
        ((150.0 * Math.sin((lng / 12.0) * PI) +
          300.0 * Math.sin((lng / 30.0) * PI)) *
          2.0) /
        3.0;
      return ret;
    },

    // WGS84 转换  GCJ 02
    wgs84togcj02: function (lngs, lats) {
      // console.log(lngs, lats);
      var lng = Number(lngs);
      var lat = Number(lats);
      var x_PI = (3.14159265358979324 * 3000.0) / 180.0;
      var a = 6378245.0;
      var ee = 0.00669342162296594323;
      var PI = 3.1415926535897932384626;
      if (this.out_of_china(lng, lat)) {
        return [lng, lat];
      } else {
        var dlat = this.transformlat(lng - 105.0, lat - 35.0);
        var dlng = this.transformlng(lng - 105.0, lat - 35.0);
        var radlat = (lat / 180.0) * PI;
        var magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        var sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * PI);
        dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * PI);
        var mglat = lat + dlat;
        var mglng = lng + dlng;
        this.gcj02tobd09(mglng, mglat);

        // console.log(mglng, mglat);
        // ----------------------------------------------------
        var lngee = mglng;
        var latee = mglat;
        var z =
          Math.sqrt(lngee * lngee + latee * latee) +
          0.00002 * Math.sin(latee * x_PI);
        var theta =
          Math.atan2(latee, lngee) + 0.000003 * Math.cos(lngee * x_PI);
        var bd_lng = z * Math.cos(theta) + 0.0065;
        var bd_lat = z * Math.sin(theta) + 0.006;
        // console.log(bd_lng,bd_lat)
        return [bd_lng, bd_lat];
        // return [mglng, mglat];
      }
    },
    //  GCJ 02  转换   BD 09
    gcj02tobd09: function (lngs, lats) {
      console.log(lngs, lats);
      lngs = String(lngs);
      lats = String(lats);
      var x_PI = (3.14159265358979324 * 3000.0) / 180.0;
      var PI = 3.1415926535897932384626;
      var lng = lngs.split(".")[0] + "." + lngs.split(".")[1];
      var lat = lats.split(".")[0] + "." + lats.split(".")[1];
      var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
      var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
      var bd_lng = z * Math.cos(theta) + 0.0065;
      var bd_lat = z * Math.sin(theta) + 0.006;
      // console.log(bd_lng, bd_lat);
      return [bd_lng, bd_lat];
    },
    //  转换辅助算法 (以下三个，不可删除)
    out_of_china: function (lng, lat) {
      return (
        lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271 || false
      );
    },
    transformlat: function (lngs, lats) {
      var lng = Number(lngs);
      var lat = Number(lats);
      var PI = 3.1415926535897932384626;
      var ret =
        -100.0 +
        2.0 * lng +
        3.0 * lat +
        0.2 * lat * lat +
        0.1 * lng * lat +
        0.2 * Math.sqrt(Math.abs(lng));
      ret +=
        ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) *
          2.0) /
        3.0;
      ret +=
        ((20.0 * Math.sin(lat * PI) + 40.0 * Math.sin((lat / 3.0) * PI)) *
          2.0) /
        3.0;
      ret +=
        ((160.0 * Math.sin((lat / 12.0) * PI) +
          320 * Math.sin((lat * PI) / 30.0)) *
          2.0) /
        3.0;
      return ret;
    },
    transformlng: function (lngs, lats) {
      var lng = Number(lngs);
      var lat = Number(lats);
      var PI = 3.1415926535897932384626;
      var ret =
        300.0 +
        lng +
        2.0 * lat +
        0.1 * lng * lng +
        0.1 * lng * lat +
        0.1 * Math.sqrt(Math.abs(lng));
      ret +=
        ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) *
          2.0) /
        3.0;
      ret +=
        ((20.0 * Math.sin(lng * PI) + 40.0 * Math.sin((lng / 3.0) * PI)) *
          2.0) /
        3.0;
      ret +=
        ((150.0 * Math.sin((lng / 12.0) * PI) +
          300.0 * Math.sin((lng / 30.0) * PI)) *
          2.0) /
        3.0;
      return ret;
    },
  },
};
</script>
<style lang="scss" scoped>
.map {
  width: 100%;
  height: 100%;
  position: relative;
}
.gcs {
  width: 200px;
  height: 400px;
  background: #fff;
  border: 1.5px solid #409eff;
  z-index: 99;
  position: absolute;
  overflow: hidden;
  top: 100px;
  right: 10px;
  border-radius: 10px;
  box-sizing: border-box;

  .head {
    width: 100%;
    height: 25px;
    margin: auto;
    background: #409eff;
    color: #fff;
    text-align: center;
    line-height: 25px;
    font-weight: bold;
  }
  .search {
    height: 60px;
    width: 100%;
    background: #fff;
  }
  .center {
    width: 100%;
    height: 310px;
    overflow: auto;

    .gcsli {
      width: 90%;
      height: 31px;
      border: 1px solid #ccc;
      font-size: 12px;
      line-height: 30px;

      padding-left: 10px;
      border-radius: 5px;
      margin: 5px auto;
      box-sizing: border-box;
      cursor: pointer;
      box-sizing: border-box;
      -webkit-box-shadow: 0px 1px 1px #c8c8c8;
      -moz-box-shadow: 0px 1px 1px #c8c8c8;
      box-shadow: 0px 1px 1px #c8c8c8;
    }
  }
  .center::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  .center::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #535353;
  }
  .center::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 1px;
    background: #ededed;
  }
}
</style>