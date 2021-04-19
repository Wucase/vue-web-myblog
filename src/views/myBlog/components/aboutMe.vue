<template>
  <el-card class="box-card animated aboutme" :class="{zoomIn:articalBI}">
    <div slot="header" class="clearfix">
      <h2 style="font-size: 20px; color: rgb(153,153,153)">
        <span class="iconfont icon-guanyuwomen title"></span>
        关于我
      </h2>
    </div>
    <el-row style="margin-top: 15px;">
      <el-col :span="10">
        <img src="@/assets/img/myLogo2.jpg" alt="" style="width:75px;height: 75px;border-radius: 50%;">
      </el-col>
      <el-col :span="14">
        <h2 style="font-size: 18px;color: #6bc30d;">wMing Blog</h2>
        <p>望天地之悠悠</p>
        <p style="padding-left: 20px;">独怆然而涕下</p>
      </el-col>
    </el-row>
    <el-row class="lol">
      <el-col :span="8"><img src="@/assets/img/dashi.jpg" alt=""></el-col>
      <el-col :span="8"><img src="@/assets/img/lol.jpg" alt=""></el-col>
      <el-col :span="8"><img src="@/assets/img/wangz.jpg" alt=""></el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: '',
  components: {

  },
  data () {
    return {
      articalBI: false,
    }
  },
  created() {
    this.articalBI = true
  },
  methods: {

  }
}
</script>

<style lang='scss' scoped>
.aboutme {
    height: 250px;
    padding: 10px;
    box-sizing: border-box;
  }

  /deep/ .el-card__header {
    padding: 10px 0;
  }

  .lol {
    margin-top: 20px;
    text-align: center;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      cursor: pointer;
    }
  }
  .title{
    font-size: 20px;
    color: #6bc30d;
  }
</style>
