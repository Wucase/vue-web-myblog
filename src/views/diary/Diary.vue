<template>
  <div class="myd">
    <div class="title"></div>
      <div class="diary">
        <el-card class="animated zoomIn left">
        <div class="shiLeft">
          <div class="shi1">
            人面不知何处去
          </div>
          <div class="shi2">
            桃花依旧笑春风。
          </div>
          <div class="shi3">
            ^^题都城南庄
          </div>
        </div>
      </el-card>
      <el-card class="animated zoomIn center">
      <div>
        <div class="titleCenter">
          
        </div>
        <div class="mdList">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item :title="item.title" :name="index" v-for="(item, index) in activities" :key="index">
              <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
              <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </el-card>
      <el-card class="animated zoomIn right">
      <div class="shiRight">
        <div class="shi3">
          ^^题都城南庄
        </div>
        <div class="shi2">
          桃花依旧笑春风。
        </div>
        
        <div class="shi1">
          人面不知何处去
        </div>
      </div>
    </el-card>
      </div>
  </div>
  
</template>

<script>
export default {
  name: 'Diary',
  components: {

  },
  data () {
    return {
      isShowPage: false,
      activeNames:'',
      activities: [{
          content: '活动按期开始',
          title: '2018-04-15'
        }, {
          content: '通过审核',
          title: '2018-04-13'
        }, {
          content: '创建成功',
          title: '2018-04-11'
        }]
    }
  },
  created() {
    this.isShowPage = true
  },
  methods: {
    handleChange(val){}
  }
}
</script>

<style lang='scss' scoped>
  .myd{
    width: 100%;
    height: 100%;
  }

.diary{
  display: flex;
  justify-content: space-between;
  height: 100%;
  .left{
      flex: 0 0 150px;
      animation-delay: 0.5s;
      .shi1{
        width: 15px;
        height: auto;
        float: left;
        margin-left: 40px;
      }
      .shi2{
        width: 15px;
        height: auto;
        float: left;
        margin: 80px 0 0 20px;
      }
      .shi3{
        width: 15px;
        height: auto;
        float: left;
        margin: 180px 0 0 30px;
      }
    }
    .right{
      flex: 0 0 150px;
      animation-delay: 0.5s;
      .shi1{
        width: 15px;
        height: auto;
        float: left;
        margin-left: 25px;
      }
      .shi2{
        width: 15px;
        height: auto;
        float: left;
        margin: 80px 0 0 20px;
      }
      .shi3{
        width: 15px;
        height: auto;
        float: left;
        margin: 180px 0 0 10px;
      }
    }
    .center{
      flex: 1;
      margin: 0 20px;
      height: 800px;
      padding: 20px 35px;
    }
}
.shiLeft{
  position: fixed;
  top: 50%;
  left: 50px;
  transform: translate(0, -50%);
  
}
.shiRight{
  position: fixed;
  top: 50%;
  right: 95px;
  transform: translate(0, -50%);
}
</style>
