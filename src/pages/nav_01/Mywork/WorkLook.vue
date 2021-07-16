<template>
  <div class="box_s">
    <div class="head">日报基础信息</div>

    <div class="inp">
      <p class="baiop">客户：</p>
      <span>{{WorkDailyDetailDto.CustomerName}}</span>
    </div>

    <div class="inp">
      <p class="baiop">服务日期：</p>
      <span>{{WorkDailyDetailDto.ServiceDate}}</span>
    </div>

    <div class="inp">
      <p class="baiop">创建时间：</p>
      <span v-if="WorkDailyDetailDto.CreateDate">{{WorkDailyDetailDto.CreateDate.split('T')[0]}}</span>
    </div>

    <div class="inp">
      <p class="baiop">工程师：</p>
      <span>{{WorkDailyDetailDto.Engineer}}</span>
    </div>

    <div class="head">联系人</div>

    <div class="inp">
      <p class="baiop">联系人：</p>
      <span>{{WorkDailyDetailDto.LinkMan}}</span>
    </div>

    <div class="inp">
      <p class="baiop">电话：</p>
      <span>{{WorkDailyDetailDto.LinkTel}}</span>
    </div>

    <div class="inp">
      <p class="baiop">邮箱：</p>
      <span>{{WorkDailyDetailDto.LinkEmail}}</span>
    </div>

    <div class="head">是否完结</div>

    <div class="inp">
      <span>{{WorkDailyDetailDto.IsOver}}</span>
    </div>

    <div class="head">工作描述/预计工作安排</div>
    <!-- 描述 -->
    <div class="ForTextHead">工作描述 &nbsp;</div>
    <div class="text" v-for="(item,index) in Descriptions" :key='index'>
      <span>{{index + 1}}</span>:
      {{item.Content}}
    </div>
    <!-- 安排 -->
    <div class="ForTextHead">工作安排 &nbsp;</div>
    <div class="text" v-for="(items,indexe) in Plans" :key='indexe + "01" '>
      <span>{{indexe + 1}}</span>:
      {{items.Content}}
    </div>
    <div class="head">图片</div>
    <!-- <div style="float:left" v-if="Photos[0]"> -->
    <el-image style="width: 100px; height: 100px;margin:5px" v-for="(itemw,indexw) in Photos" :key='indexw + "56" ' :src="itemw.Url" :preview-src-list="srcList">
    </el-image>
    <!-- </div> -->

  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
export default {
  // 定义属性
  data() {
    return {
      // 基础信息
      WorkDailyDetailDto: {},
      Descriptions: [], //描述
      Plans: [], // 计划
      Photos: [], // 图片
      srcList: [],
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  created() {
    console.log(this.$store.state.Vuex.Id);
    this.getRBData();
  },
  // 方法集合
  methods: {
    // 初始化
    getRBData: function () {
      var obj = {
        api: "get",
        url: this.$store.state.http + "PCenter/GetWorlDaily",
        data: {
          workdailyId: this.$store.state.Vuex.Id,
        },
      };
      this.$https(obj).then((res) => {
        console.log(res.Data);
        this.WorkDailyDetailDto = res.Data.WorkDailyDetailDto;
        this.Descriptions = res.Data.Descriptions;
        this.Plans = res.Data.Plans;
        this.Photos = res.Data.Photos;

        for (let index = 0; index < this.Photos.length; index++) {
          const element = this.Photos[index].Url;
          this.srcList.push(element);
        }
      });
    },

    // 生命周期 - 创建完成（可以访问当前this实例）
  },
};
</script>

<style lang='scss' scoped>
.box_s {
  padding: 0 2.5%;
  box-sizing: border-box;
}

.inp {
  width: 400px;
  height: 30px;
  margin: 5px 0;
  padding-left: 40px;
  box-sizing: border-box;
  float: left;
  display: block;
  span {
    font-size: 12px;
  }
}
.head {
  width: 100%;
  border-bottom: 2px solid #ccc;
  color: #000;
  font-weight: bold;
  line-height: 30px;
  margin: 10px 0;
  box-sizing: border-box;
  float: left;
  font-size: 10px;
}
.baiop {
  width: 120px;
  height: 30px;
  display: block;
  float: left;
  line-height: 28px;
  font-size: 12px;
}
.zhu {
  margin: auto;
  background: #000;
  border: 1px solid #ccc;
  position: absolute;
  border-radius: 10px;
  box-shadow: 3px 3px 3px 3px #ccc;
  bottom: 50px;
  right: 80px;
  padding: 20px;
}
.el-cascader {
  width: 50%;
  font-size: 10px;
  line-height: 20px;
  height: 20px;
}

.ForTextHead {
  float: left;
  font-size: 12px;
  padding-left: 20px;
  margin-top: 10px;
  box-sizing: border-box;
  color: #09c;
}
.text {
  width: 100%;
  float: left;
  padding-left: 70px;
  font-size: 12px;
  margin-top: 5px;
}
</style>